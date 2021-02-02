//Install - Database
//Author - Eric Salle

const global_transaction = require('../global_transactions')();

module.exports = {

		db : {
			name : "db", 
			query : "CREATE DATABASE IF NOT EXISTS " + global_transaction.DB_NAME + " DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci",
			message : "Installing database : " + global_transaction.DB_NAME},
		create_admin : {
			name : "create_admin_user",
			query : "CREATE USER '" + global_transaction.DB_USER + "'@'%' IDENTIFIED WITH mysql_native_password BY '" + global_transaction.DB_PWD + "'",
			message : "Creating Admin : " + global_transaction.DB_USER,
		},
		grant_admin_privileges : {
			name : "give_admin_privileges_to_admin",
			query : "GRANT ALL Privileges on "+ global_transaction.DB_NAME +".* to '" + global_transaction.DB_USER + "'@'%' WITH GRANT OPTION",
			message : "Granting admin privileges to " + global_transaction.DB_USER + " on : " + global_transaction.DB_NAME


		} 


}