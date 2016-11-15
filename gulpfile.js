"use strict"

process.env.NODE_ENV || "development";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")({ lazy: false });
var eslint = require("gulp-eslint");

gulp.task("lint", function () {
	return gulp.src(["**/**/*.js",
			"!node_modules/**",
			"!server/public/javascripts/handlebars-v4.0.5.js",
			"!server/public/javascripts/jquery-3.1.1.js",
			"!server/public/javascripts/xmlhttprequest.js"])
		.pipe(eslint())
		.pipe(eslint.format())
});

gulp.task("watch", function() {
  gulp.watch(["**/**/*.js", "!node_modules/**"], ["lint"]);
});

gulp.task("default", [/*"watch", "lint"*/], function() {
	$.nodemon({
		script: "server/app.js",
		ext: "js html css"
	});
});