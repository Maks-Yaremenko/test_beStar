"use strict"
 
module.exports = {
	up: function (queryInterface, Sequelize) {

	return queryInterface.createTable("users", { 
		id: {
			allowNull:      false,
			autoIncrement:  true,
			primaryKey:     true,
			type:           Sequelize.INTEGER
		},
		password: {
			type: 			Sequelize.STRING,
			allowNull: 		false
		},
		email: {
			type:           Sequelize.STRING,
			allowNull:      false
		},
		login: {
			type:			Sequelize.STRING,
			allowNull:		false
		},
		name:               Sequelize.STRING,
		lastName: 			Sequelize.STRING,
		birthDate: 			Sequelize.DATE,
		country: 			Sequelize.STRING,
		salt:               Sequelize.STRING
		});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable("users");
  }
};
