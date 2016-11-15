"use strict"

var express = require("express"),
bodyParser = require("body-parser"),
methodOverride = require("method-override"),
path = require("path"),
config = require("./index"),
morgan = require("morgan"),
cookieParser = require("cookie-parser");

module.exports = function (app) {
    //var env = app.get("env");
    app.engine("ejs", require("ejs-locals"));
    /* global APP_DIR:true */
    app.set("views", path.join(APP_DIR +"/"+config.appView));
	app.set("view engine", config.appEngine);

    app.use(bodyParser.urlencoded({limit: "5mb", extended: false }));
    app.use(bodyParser.json({limit: "5mb"}));
    app.use(methodOverride());
    app.set("appPath", config.root);
    app.use(express.static(app.get("appPath")));
    app.use(morgan("dev"));
    app.use(cookieParser());
 };