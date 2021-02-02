"use strict";

//Install - Tables
//Author - Eric Salle
var global_transaction = require('../global_transactions')();

module.exports = {
  uri: {
    name: "create_table_uri",
    query: "CREATE TABLE IF NOT EXISTS uri (uri VARCHAR(512) NOT NULL UNIQUE, feature VARCHAR(128), root_id VARCHAR(255) UNIQUE, external BOOL DEFAULT FALSE, id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id), createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
    message: "Creating table uri"
  },
  callback: {
    name: "create_table_callback",
    query: "CREATE TABLE IF NOT EXISTS callback (filepath VARCHAR(256), filename VARCHAR(32), callback VARCHAR(32), form_name VARCHAR(128), id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id))",
    message: "Creating table pages_permissions"
  },
  headers: {
    name: "create_table_headers",
    query: "CREATE TABLE IF NOT EXISTS headers (name VARCHAR(32), element LONGTEXT, id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id), createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, lastModifiedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
    message: "CREATING table headers"
  },
  headers_elements: {
    name: "create_table_headers_elements",
    query: "CREATE TABLE IF NOT EXISTS headers_elements (name VARCHAR(128) NOT NULL UNIQUE,  element VARCHAR(16), args LONGTEXT, value VARCHAR(16) NOT NULL, weight INT NOT NULL, header_id INT, FOREIGN KEY (header_id) REFERENCES headers (id), header_element_id INT, FOREIGN KEY(header_element_id) REFERENCES headers_elements(id), uri_id INT, FOREIGN KEY (uri_id) references uri (id), id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id), createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, lastModifiedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
    message: "CREATING table headers_elements"
  },
  pages: {
    name: "create_table_pages",
    query: "CREATE TABLE IF NOT EXISTS pages (title VARCHAR (255), root_id VARCHAR(255) NOT NULL UNIQUE, method VARCHAR(7) NOT NULL, theme VARCHAR(12), id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id), uri_id INT UNIQUE NOT NULL, FOREIGN KEY (uri_id) REFERENCES uri (id), callback_id INT, FOREIGN KEY (callback_id) REFERENCES callback (id), createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, lastModifiedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
    message: "Creating table pages"
  },
  pages_permissions: {
    name: "create_table_pages_permissions",
    query: "CREATE TABLE IF NOT EXISTS pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout BOOL, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login BOOL, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor BOOL, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator BOOL, id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id), page_id INT UNIQUE NOT NULL, FOREIGN KEY (page_id) REFERENCES pages (id))"),
    message: "Creating table pages_permissions"
  },
  forms: {
    name: "create_table_forms",
    query: "CREATE TABLE IF NOT EXISTS forms (name VARCHAR(255) NOT NULL, element LONGTEXT, number INT NOT NULL, uri_id INT NOT NULL, FOREIGN KEY(uri_id) REFERENCES uri(id), id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id), createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, lastModifiedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
    message: "creating table forms"
  },
  forms_elements: {
    name: "create_table_forms_elements",
    query: "CREATE TABLE IF NOT EXISTS forms_elements (name VARCHAR(255) NOT NULL, element VARCHAR(16), args LONGTEXT, form_number INT, weight INT NOT NULL, form_id INT, FOREIGN KEY (form_id) REFERENCES forms(id), form_element_id INT, FOREIGN KEY(form_element_id) REFERENCES forms_elements(id), id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id), createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, lastModifiedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
    message: "creating table forms elements"
  },
  users: {
    name: "create_table_users",
    query: "CREATE TABLE IF NOT EXISTS users (username VARCHAR (64) unique NOT NULL, email VARCHAR (64) unique NOT NULL, pwd VARCHAR (128) NOT NULL, id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id), createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, lastModifiedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
    message: "Creating table users"
  },
  users_data: {
    name: "create_table_users_data",
    query: "CREATE TABLE IF NOT EXISTS users_data (firstname VARCHAR (255), lastname VARCHAR (255), civility VARCHAR (5), phonenumber VARCHAR (32), id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id), user_id INT UNIQUE NOT NULL, FOREIGN KEY (user_id) REFERENCES users (id))",
    message: "Creating table users_data"
  },
  users_location: {
    name: "create_table_users_location",
    query: "CREATE TABLE IF NOT EXISTS users_location (code VARCHAR (2), country VARCHAR(50), postalcode VARCHAR (10), city VARCHAR (64), address VARCHAR(255), id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id), user_id INT UNIQUE, FOREIGN KEY (user_id) REFERENCES users (id))",
    message: "Creating table users_location"
  },
  users_privileges: {
    name: "create_table_users_privileges",
    query: "CREATE TABLE IF NOT EXISTS users_privileges (administrator BOOL DEFAULT false, contributor BOOL DEFAULT false, user BOOL DEFAULT true, user_id INT UNIQUE NOT NULL, id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users (id))",
    message: "Creating table users_privileges"
  }
};