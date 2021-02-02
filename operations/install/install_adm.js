//Install - Admin User
//Author - Eric Salle

const global_transaction = require('../global_transactions')();
var sha512 = require('js-sha512').sha512;

module.exports = {

		create : { 
			name : "insert_admin_in_users",
			query : `INSERT INTO users (username, email, pwd) VALUES ('${global_transaction.DB_USER}', '${global_transaction.DB_MAIL}', '${sha512(global_transaction.DB_PWD)}')`, 
			message : "Inserting admin in users table",

			},
		give_privileges : {
			name : "insert_admin_privileges",
			query : `INSERT INTO users_privileges (administrator, contributor, user, user_id) VALUES (true, true, true, (SELECT id FROM users WHERE username='${global_transaction.DB_USER}'))`,
			message : "Inserting admin privileges in users_privileges table",
		},

}
