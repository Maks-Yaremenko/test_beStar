"use strict";

var fs = require("fs");

var config = {
	env: process.env.NODE_ENV || "development",
	/* global APP_DIR:true */
	root: APP_DIR,
	appView: "views",
	appEngine: "ejs",
	port: process.env.PORT || 8080,
	secrets: fs.readFileSync(APP_DIR + "/config/private.key")
};

module.exports = config;