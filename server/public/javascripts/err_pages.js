"use strict"

module.exports = function (app) {

	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	if ('development' == app.get('env')) {

		app.use(function(err, req, res, next) {
			res.render("404", {
				status: err.status || 500,
				message: err.message
			})
		});
	}

	app.use(function(err, req, res, next) {
		res.render("404", {
			status: err.status || 500,
			message: "Что то пошло не так!"
		})
	});
};
