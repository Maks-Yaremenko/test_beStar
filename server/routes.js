"use strict";

/* global APP_DIR:true */
var auth = require(APP_DIR + "/api/authenticate/auth");

module.exports = function (app) {
	app.get("/", auth.index);
	app.post("/login", auth.login);
	app.get("/login", auth.loginForm);
	app.post("/register", auth.register);
	app.get("/register", auth.registerForm);
	app.use("/me", auth.isAuthenticated(), require(APP_DIR + "/api/user"));
}