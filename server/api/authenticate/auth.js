"use strict"

var jwt = require("jsonwebtoken"),
/* global APP_DIR:true */
config = require(APP_DIR + "/config"),
compose = require("composable-middleware"),
models = require(APP_DIR + "/models"),
e = require(APP_DIR + "/public/javascripts/err_validations");

function login(req, res, err) {
	
	models.user.findOne({
		where: {
			$or: [{ "email": req.body.login} , {"login": req.body.login}]
		}	
	}).then(function (user) {

		if(!user || !user.authenticate(req.body.password)) {
			
			return res.end(JSON.stringify({
				response: "error",
				message: "Не верный пароль"
			}));
		}

		res.cookie("auth", signToken(user.id));
		return res.end(JSON.stringify({response: "done"}));

	}).catch(function (err) {
		return e.validationError(res, err);
	});
}

function register(req, res, err) {

	if (req.body.password.length <= 4) {
		return res.end(JSON.stringify({
				response: "error",
				message: "Пароль не короче 5 символов!"
			}));
	}else{
		if (req.body.confirm_pass) delete req.body.confirm_pass;

		models.user.create(req.body)
			.then(function (user) {
				res.cookie("auth", signToken(user.id));
				res.redirect("/me");
			})
			.catch(function (err) { 
				return e.validationError(res, err); 
			});
		}
}

function signToken(id) {
	return jwt.sign(
	{id: id},
	config.secrets,
	{expiresIn: "365d"}
	);
}

function isAuthenticated() {
	return compose()
		.use(function (req, res, next) {
			var token = req.cookies.auth;
			if (token) {
				jwt.verify(token, config.secrets, function (err, data) {
					if (err) return res.redirect("/login");
					req.user = data;
					next();
				})
			} else {
				return res.redirect("/login");
			}
		})
		.use(function (req, res, next) {
			
			models.user.findById(req.user.id)
				.then(function (user) {
					if(!user) return res.redirect("/login");
					req.user = user;
					next();
				})
		})
}

function registerForm(req, res) {
	res.render("register", {title: "Регистрация"});
}

function index(req, res) {
	if (req.cookies.auth) return res.redirect("/me");
	res.redirect("/login");
}

function loginForm(req, res) {
	if (req.cookies.auth) return res.redirect("/me");
	res.render("login", {title: "Войти"});
}

exports.index = index;
exports.login = login;
exports.loginForm = loginForm;
exports.register = register;
exports.registerForm = registerForm;
exports.isAuthenticated = isAuthenticated;