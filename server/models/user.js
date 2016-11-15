"use strict"

var crypto = require("crypto");

module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define("user", {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey : true,
			autoIncrement: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			set: function (password) {
				this.salt = this.makeSalt();
				this.setDataValue("password", this.getHash(password));
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {msg: "Email field is empty"},
				isUnique: function (value, next) {
                    return this.checker(value, next, "email");
                }
			}
		},
		login: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {msg: "login field is empty"},
				isUnique: function (value, next) {
                    return this.checker(value, next, "login");
                }
			}
		},
		name: DataTypes.STRING,
		lastName: DataTypes.STRING,
		birthDate: DataTypes.DATE,
		country: DataTypes.STRING,
		salt: DataTypes.STRING
	},{
		instanceMethods: {
			authenticate: function (data) {
				return this.getHash(data) === this.password;
			},
			makeSalt: function () {
				return crypto.randomBytes(16).toString("base64");
			},
			getHash: function (password) {
				if(!password || !this.salt) return "";
				var salt = new Buffer(this.salt, "base64");
				return crypto.pbkdf2Sync(password, salt, 500, 64).toString("base64");
			},
			checker: function (value, next, param) {
					var where;
					if (param == "email") where = {email : value};
					if (param == "login") where = {login : value};
					if (this.id && this.param === value) return next();

					User.find({
						where: where,
						attributes: ["id"]
					}).then(function (user) {
						user ? next({msg: param + " is already registered"}) : next();
					}, next);
			}
		},
		timestamps: false
	});
	return User;
};