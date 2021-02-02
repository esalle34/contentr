// Installation des tables de données 
// Author : Eric Salle 

/* Au besoin, rajouter des requêtes dans l'objet dédié, côté db_transaction.js */

const path = require('path');
const db_transaction = require(path.resolve("./db_transaction"))();

if (process.env.NODE_ENV != "cloudbuild") {
	var connection = db_transaction.init(install = true);
} else {
	var connection = db_transaction.init(install = true, aws = true);
}
db_transaction.db_install(connection).then(function () {

	db_transaction.db_switchUser(connection).then((connection) => {

		db_transaction.db_use(connection).then(() => {

			db_transaction.tables_install(connection).then(() => {

				db_transaction.queries_install(connection).then(() => {

					db_transaction.end(connection);
					console.log("L'installation des tables s'est terminée avec succès !");

				})

			});

		});

	});



});

