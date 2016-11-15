"use strict"

function validationError(res, err) {
	for (var i = 0; i < err.errors.length; i++) {
		if (err.errors[i].type === "notNull Violation" || err.errors[i].type === "Validation error") {
			res.status(422).json({
				"field": err.errors[i].path,
				"message": err.errors[i].message
			})
		}
	}
}

module.exports.validationError = validationError;