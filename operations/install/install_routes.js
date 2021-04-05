//Install - Main Routes
//Author - Eric Salle

const global_transaction = require('../global_transactions')();

module.exports = {

		home : {

			uri : {

				name : `INSERT_uri_home`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/', 'home', true, true)`,
				message : `INSERTing home uri`
			},
			callback : {
				name : `INSERT_callback_home`,
				query : `INSERT INTO callback (filepath, filename, isFile) VALUES ('/views/html/public/', 'homepage.html', TRUE)`,
				message : `INSERTing homepage callback`
			},
			pages : {
				name : `INSERT_pages_home`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("${global_transaction.DEFAULT_SITE_TITLE}", "get", "main", (SELECT id from callback WHERE filepath="/views/html/public/" AND filename = "homepage.html"), (SELECT id FROM uri WHERE root_id = "home") , "home")`,
				message : `INSERTing homepage section`,
			},
			pages_permissions : {
				name : `INSERT_pages_home_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, false, false, false, (SELECT id FROM pages where root_id='home'))`,
				message : `INSERTing homepage permissions`,
			},

		},

		administration : {

			uri : {
				name : `INSERT_uri_administration`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate', 'administrate', true, true)`,
				message : `INSERTing administration uri`
			},
			callback : {
				name : `INSERT_administration_callback`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/administration/', 'administrate', 'administrate')`,
				message : `INSERTing administration callback`
			},
			pages : {
				name : `INSERT_administration`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = "administrate" AND callback = "administrate" ),(SELECT id FROM uri WHERE root_id = "administrate"), "administrate")`,
				message : `INSERTing administration section`,
			},
			pages_permissions : {
				name : `INSERT_administration_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='administrate'))`,
				message : `INSERTing /administrate permissions`,
			},

		},

		administration_pages : {

			uri : {
				name : `INSERT_uri_administration_pages`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/pages', 'administrate_pages', true, true)`,
				message : `INSERTing pages administration uri`
			},
			callback : {
				name : `INSERT_administration_callback`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/administration/', 'pages', 'createPage')`,
				message : `INSERTing pages administration callback`
			},
			pages : {
				name : `INSERT_administration`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = "pages" AND callback = "createPage" ),(SELECT id FROM uri WHERE root_id = "administrate_pages"), "administrate_pages")`,
				message : `INSERTing pages administration section`,
			},
			pages_permissions : {
				name : `INSERT_administration_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='administrate_pages'))`,
				message : `INSERTing /administrate/pages permissions`,
			},

		},

		administration_pages_form : {

			uri : {
				name : `INSERT_uri_administration_pages`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/pages/post', 'administrate_pages_form', true, true)`,
				message : `INSERTing pages form administration uri`
			},
			callback : {
				name : `INSERT_administration_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm', 'pages_form')`,
				message : `INSERTing pages form administration callback`
			},
			pages : {
				name : `INSERT_administration`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = "form_service" AND callback = "getForm" AND form_name = "pages_form" ),(SELECT id FROM uri WHERE root_id = "administrate_pages_form"), "administrate_pages_form")`,
				message : `INSERTing pages form administration section`,
			},
			pages_permissions : {
				name : `INSERT_administration_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='administrate_pages_form'))`,
				message : `INSERTing /administrate/pages/post permissions`,
			},

		},

		users_login_form : {

			uri : {
				name : `INSERT_uri_login_form`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/login', 'login-form', true, true)`,
				message : `INSERTing /administrate/login uri`
			},
			callback : {
				name : `INSERT_login_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm', 'login_form'  )`,
				message : `INSERTing login form callback`
			},
			pages : {
				name : `INSERT_login_form`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration login | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id from callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name="login_form"), (SELECT id FROM uri WHERE root_id = "login-form"), "login-form")`,
				message : `INSERTing /administrate/login section` 
			},
			pages_permissions : {
				name : `INSERT_login_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (true, false, false, false, (SELECT id FROM pages where root_id='login-form'))`,
				message : `INSERTing /administrate/login permissions`,
			},

		},

		users_login : {

			uri : {
				name : `INSERT_uri_login`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/login/post', 'login', true, true)`,
				message : `INSERTing /administrate/login/post form uri`
			},
			callback : {
				name : `INSERT_login_callback`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/users/', 'user_service', 'login' )`,
				message : `INSERTing /administrate/login/post form callback`
			},
			pages : {
				name : `INSERT_login`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'user_service' AND callback = 'login' ), (SELECT id FROM uri WHERE root_id = "login"), "login")`,
				message : `INSERTing /administrate/login/post section`
			},
			pages_permissions : {
				name : `INSERT_login_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (true, false, false, false, (SELECT id FROM pages where root_id='login'))`,
				message : `INSERTing /administrate/login/post permissions`,
			},

		},

		users_register_form : {

			uri : {
				name : `INSERT_uri_register_form`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/register', 'register-form', true, true)`,
				message : `INSERTing /administrate/register uri`
			},
			callback : {
				name : `INSERT_register_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/users/', 'user_service', 'register_form' )`,
				message : `INSERTing register form callback`
			},
			pages : {
				name : `INSERT_register_form`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Register | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id from callback WHERE filename = 'user_service' AND callback = 'register_form'), (SELECT id FROM uri WHERE root_id = "register-form"), "register-form")`,
				message : `INSERTing /administrate/register section` 
			},
			pages_permissions : {
				name : `INSERT_register_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (true, false, false, false, (SELECT id FROM pages where root_id='register-form'))`,
				message : `INSERTing /administrate/register permissions`,
			},

		},

		users_register : {

			uri : {
				name : `INSERT_uri_register`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/register/post', 'register', true, true)`,
				message : `INSERTing /administrate/register/post form uri`
			},
			callback : {
				name : `INSERT_register_callback`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/users/', 'user_service', 'register' )`,
				message : `INSERTing /administrate/register/post form callback`
			},
			pages : {
				name : `INSERT_register`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'user_service' AND callback = 'register' ), (SELECT id FROM uri WHERE root_id = "register"), "register")`,
				message : `INSERTing /administrate/register/post section` 
			},
			pages_permissions : {
				name : `INSERT_register_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (true, false, false, false, (SELECT id FROM pages where root_id='register'))`,
				message : `INSERTing /administrate/register/post permissions`,
			},

		},

		users_get_roles : {

			uri : {
				name : `INSERT_uri_users_roles`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/users/roles', 'get-roles', true, true)`,
				message : `INSERTing /administrate/users/roles uri`
			},
			callback : {
				name : `INSERT_users_roles_callback`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/users/', 'user_service', 'getRoles' )`,
				message : `INSERTing users roles callback`
			},
			pages : {
				name : `INSERT_users_roles`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'user_service' AND callback = 'getRoles' ), (SELECT id FROM uri WHERE root_id = "get-roles"), "get-roles")`,
				message : `INSERTing /administrate/users/roles section` 
			},
			pages_permissions : {
				name : `INSERT_users_roles_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, false, true, true, (SELECT id FROM pages where root_id='get-roles'))`,
				message : `INSERTing /administrate/users/roles permissions`,
			},

		},

		users_logout : {

			uri : {
				name : `INSERT_uri_logout`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/logout', 'logout', true, true)`,
				message : `INSERTing /administrate/logout uri`
			},
			callback : {
				name : `INSERT_logout_callback`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/users/', 'user_service', 'logout' )`,
				message : `INSERTing logout callback`
			},
			pages : {
				name : `INSERT_logout`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration logout | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'user_service' AND callback = 'logout' ), (SELECT id FROM uri WHERE root_id = "logout"), "logout")`,
				message : `INSERTing /administrate/logout section` 
			},
			pages_permissions : {
				name : `INSERT_logout_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, false, false, (SELECT id FROM pages where root_id='logout'))`,
				message : `INSERTing /administrate/logout permissions`,
			},

		},

		administration_route : {

			uri : {
				name : `INSERT_uri_administration_route`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/route', 'administration-route', true, true)`,
				message : `INSERTing /administrate/route uri`
			},
			callback : {
				name : `INSERT_administration_route_callback`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/administration/route/', 'route_service', 'administration_route' )`,
				message : `INSERTing create-route-form callback`
			},
			pages : {
				name : `INSERT_administration_route`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'route_service' AND callback = 'administration_route'), (SELECT id FROM uri WHERE root_id = "administration-route"), "administration-route")`,
				message : `INSERTing /administrate/route section`
			},
			pages_permissions : {
				name : `INSERT_route_create_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='administration-route'))`,
				message : `INSERTing /administrate/route permissions`,
			},

		},

		administration_create_route_form : {

			uri : {
				name : `INSERT_uri_route_create_form`,
				query : `INSERT INTO uri (uri, feature, root_id, isSystem, isPublished) VALUES ('/administrate/route/create', 'route_Create', 'create-route-form', true, true)`,
				message : `INSERTing /administrate/route/create uri`
			},
			callback : {
				name : `INSERT_route_create_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm', 'create_route_form' )`,
				message : `INSERTing create-route-form callback`
			},
			pages : {
				name : `INSERT_route_create_form_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'create_route_form' ), (SELECT id FROM uri WHERE root_id = "create-route-form"), "create-route-form")`,
				message : `INSERTing /administrate/route/create section` 
			},
			pages_permissions : {
				name : `INSERT_route_create_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='create-route-form'))`,
				message : `INSERTing /administrate/route/create permissions`,
			},

		},

		administration_create_route : {

			uri : {
				name : `INSERT_uri_route_create`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/route/create/post', 'create-route', true, true)`,
				message : `INSERTing /administrate/route/create/post uri`
			},
			callback : {
				name : `INSERT_route_create_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'create_route_form' )`,
				message : `INSERTing create-route callback`
			},
			pages : {
				name : `INSERT_route_create_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'create_route_form' ), (SELECT id FROM uri WHERE root_id = "create-route"), "create-route")`,
				message : `INSERTing /administrate/route/create/post section` 
			},
			pages_permissions : {
				name : `INSERT_route_create_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='create-route'))`,
				message : `INSERTing /administrate/route/create/post permissions`,
			},

		},

		administration_edit_route_form : {

			uri : {
				name : `INSERT_uri_route_edit_form`,
				query : `INSERT INTO uri (uri, feature, root_id, isSystem, isPublished) VALUES ('/administrate/route/edit', 'route_Edit', 'edit-route-form', true, true)`,
				message : `INSERTing /administrate/route/edit uri`
			},
			callback : {
				name : `INSERT_route_edit_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm', 'edit_route_form' )`,
				message : `INSERTing edit-route-form callback`
			},
			pages : {
				name : `INSERT_route_edit_form_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'edit_route_form' ), (SELECT id FROM uri WHERE root_id = "edit-route-form"), "edit-route-form")`,
				message : `INSERTing /administrate/route/edit section` 
			},
			pages_permissions : {
				name : `INSERT_route_edit_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-route-form'))`,
				message : `INSERTing /administrate/route/edit permissions`,
			},

		},


		administration_edit_route : {

			uri : {
				name : `INSERT_uri_route_edit`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/route/edit/post', 'edit-route', true, true)`,
				message : `INSERTing /administrate/route/edit/post uri`
			},
			callback : {
				name : `INSERT_route_edit_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'edit_route_form' )`,
				message : `INSERTing edit-route callback`
			},
			pages : {
				name : `INSERT_route_edit_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'edit_route_form' ), (SELECT id FROM uri WHERE root_id = "edit-route"), "edit-route")`,
				message : `INSERTing /administrate/route/edit/post section` 
			},
			pages_permissions : {
				name : `INSERT_route_edit_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-route'))`,
				message : `INSERTing /administrate/route/edit/post permissions`,
			},

		},

		administration_remove_route_form : {

			uri : {
				name : `INSERT_uri_route_remove_form`,
				query : `INSERT INTO uri (uri, feature, root_id, isSystem, isPublished) VALUES ('/administrate/route/remove', 'route_Remove','remove-route-form', true, true)`,
				message : `INSERTing /administrate/route/remove uri`
			},
			callback : {
				name : `INSERT_route_remove_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm',  'remove_route_form' )`,
				message : `INSERTing remove-route-form callback`
			},
			pages : {
				name : `INSERT_route_remove_form_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'remove_route_form' ), (SELECT id FROM uri WHERE root_id = "remove-route-form"), "remove-route-form")`,
				message : `INSERTing /administrate/route/remove section` 
			},
			pages_permissions : {
				name : `INSERT_route_remove_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='remove-route-form'))`,
				message : `INSERTing /administrate/route/remove permissions`,
			},

		},

		administration_remove_route : {

			uri : {
				name : `INSERT_uri_route_remove`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/route/remove/post', 'remove-route', true, true)`,
				message : `INSERTing /administrate/route/remove/post uri`
			},
			callback : {
				name : `INSERT_route_remove_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'remove_route_form' )`,
				message : `INSERTing remove-route callback`
			},
			pages : {
				name : `INSERT_route_remove_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'remove_route_form' ), (SELECT id FROM uri WHERE root_id = "remove-route"), "remove-route")`,
				message : `INSERTing /administrate/route/remove/post section` 
			},
			pages_permissions : {
				name : `INSERT_route_remove_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='remove-route'))`,
				message : `INSERTing /administrate/route/remove/post permissions`,
			},

		},

		administration_search_route : {

			uri : {
				name : `INSERT_uri_route_search`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/route/search', 'search-route', true, true)`,
				message : `INSERTing /administrate/route/search uri`
			},
			callback : {
				name : `INSERT_route_search_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'search_route' )`,
				message : `INSERTing search-route callback`
			},
			pages : {
				name : `INSERT_route_search_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'search_route' ), (SELECT id FROM uri WHERE root_id = "search-route"), "search-route")`,
				message : `INSERTing /administrate/route/search section` 
			},
			pages_permissions : {
				name : `INSERT_route_search_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='search-route'))`,
				message : `INSERTing /administrate/route/search permissions`,
			},

		},

		administration_manage_header_form : {

			uri : {
				name : `INSERT_uri_header_manage_form`,
				query : `INSERT INTO uri (uri, feature, root_id, isSystem, isPublished) VALUES ('/administrate/header/manage', 'headers_Manage', 'manage-header-form', true, true)`,
				message : `INSERTing /administrate/header/manage uri`
			},
			callback : {
				name : `INSERT_header_manage_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm', 'manage_header_form' )`,
				message : `INSERTing manage-header-form callback`
			},
			pages : {
				name : `INSERT_logout`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'manage_header_form' ), (SELECT id FROM uri WHERE root_id = "manage-header-form"), "manage-header-form")`,
				message : `INSERTing /administrate/header/manage section` 
			},
			pages_permissions : {
				name : `INSERT_header_manage_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='manage-header-form'))`,
				message : `INSERTing /administrate/header/manage permissions`,
			},

		},

		administration_manage_header : {

			uri : {
				name : `INSERT_uri_header_manage`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/header/manage/post', 'manage-header-form-form', true, true)`,
				message : `INSERTing /administrate/header/manage/post uri`
			},
			callback : {
				name : `INSERT_header_manage_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'manage_header_form_form' )`,
				message : `INSERTing edit-header callback`
			},
			pages : {
				name : `INSERT_logout`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'manage_header_form_form'), (SELECT id FROM uri WHERE root_id = "manage-header-form-form"), "manage-header-form-form")`,
				message : `INSERTing /administrate/header/manage/post section` 
			},
			pages_permissions : {
				name : `INSERT_header_manage_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='manage-header-form-form'))`,
				message : `INSERTing /administrate/header/manage/post permissions`,
			},

		},

		administration_search_header : {

			uri : {
				name : `INSERT_uri_header_search`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/header/search', 'search-header', true, true)`,
				message : `INSERTing /administrate/header/search uri`
			},
			callback : {
				name : `INSERT_header_search_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'search_header' )`,
				message : `INSERTing search-header callback`
			},
			pages : {
				name : `INSERT_header_search_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'search_header' ), (SELECT id FROM uri WHERE root_id = "search-header"), "search-header")`,
				message : `INSERTing /administrate/header/search section` 
			},
			pages_permissions : {
				name : `INSERT_header_search_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='search-header'))`,
				message : `INSERTing /administrate/header/search permissions`,
			},

		},

		administration_forms : {

			uri : {
				name : `INSERT_uri_administration_forms`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/forms', 'administration-forms', true, true)`,
				message : `INSERTing /administrate/forms uri`
			},
			callback : {
				name : `INSERT_administration_forms_callback`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/administration/', 'forms', 'administration_forms' )`,
				message : `INSERTing create-forms-form callback`
			},
			pages : {
				name : `INSERT_administration_forms`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'forms' AND callback = 'administration_forms'), (SELECT id FROM uri WHERE root_id = "administration-forms"),"administration-forms")`,
				message : `INSERTing /administrate/forms section` 
			},
			pages_permissions : {
				name : `INSERT_forms_create_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='administration-forms'))`,
				message : `INSERTing /administrate/forms permissions`,
			},

		},

		administration_create_form_form : {

			uri : {
				name : `INSERT_uri_form_create_form`,
				query : `INSERT INTO uri (uri, feature, root_id, isSystem, isPublished) VALUES ('/administrate/form/create', 'forms_Create', 'create-form-form', true, true)`,
				message : `INSERTing /administrate/form/create uri`
			},
			callback : {
				name : `INSERT_form_create_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm', 'create_form_form' )`,
				message : `INSERTing create-form-form callback`
			},
			pages : {
				name : `INSERT_create_form_callback`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'create_form_form' ), (SELECT id FROM uri WHERE root_id = "create-form-form"), "create-form-form")`,
				message : `INSERTing /administrate/form/create section` 
			},
			pages_permissions : {
				name : `INSERT_form_create_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='create-form-form'))`,
				message : `INSERTing /administrate/form/create permissions`,
			},

		},

		administration_create_form : {

			uri : {
				name : `INSERT_uri_form_create`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/form/create/post', 'create-form', true, true)`,
				message : `INSERTing /administrate/form/create/post uri`
			},
			callback : {
				name : `INSERT_form_create_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'create_form_form' )`,
				message : `INSERTing create-form callback`
			},
			pages : {
				name : `INSERT_form_create_callback`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm'  AND form_name = 'create_form_form' ), (SELECT id FROM uri WHERE root_id = "create-form"), "create-form")`,
				message : `INSERTing /administrate/form/create/post section` 
			},
			pages_permissions : {
				name : `INSERT_form_create_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='create-form'))`,
				message : `INSERTing /administrate/form/create/post permissions`,
			},

		},

		administration_edit_form_form : {

			uri : {
				name : `INSERT_uri_form_edit_form`,
				query : `INSERT INTO uri (uri, feature, root_id, isSystem, isPublished) VALUES ('/administrate/form/edit', 'forms_Edit', 'edit-form-form', true, true)`,
				message : `INSERTing /administrate/form/edit uri`
			},
			callback : {
				name : `INSERT_form_edit_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm', 'edit_form_form' )`,
				message : `INSERTing edit-form-form callback`
			},
			pages : {
				name : `INSERT_edit_form_callback`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'edit_form_form' ), (SELECT id FROM uri WHERE root_id = "edit-form-form"), "edit-form-form")`,
				message : `INSERTing /administrate/form/edit section` 
			},
			pages_permissions : {
				name : `INSERT_form_edit_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-form-form'))`,
				message : `INSERTing /administrate/form/edit permissions`,
			},

		},

		administration_edit_form : {

			uri : {
				name : `INSERT_uri_form_edit`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/form/edit/post', 'edit-form', true, true)`,
				message : `INSERTing /administrate/form/edit/post uri`
			},
			callback : {
				name : `INSERT_form_edit_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'edit_form_form' )`,
				message : `INSERTing edit-form callback`
			},
			pages : {
				name : `INSERT_form_edit_callback`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm'  AND form_name = 'edit_form_form' ), (SELECT id FROM uri WHERE root_id = "edit-form"), "edit-form")`,
				message : `INSERTing /administrate/form/edit/post section` 
			},
			pages_permissions : {
				name : `INSERT_form_edit_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-form'))`,
				message : `INSERTing /administrate/form/edit/post permissions`,
			},

		},

		administration_remove_form_form : {

			uri : {
				name : `INSERT_uri_form_remove_form`,
				query : `INSERT INTO uri (uri, feature, root_id, isSystem, isPublished) VALUES ('/administrate/form/remove', 'forms_Remove', 'remove-form-form', true, true)`,
				message : `INSERTing /administrate/form/remove uri`
			},
			callback : {
				name : `INSERT_form_remove_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm', 'remove_form_form' )`,
				message : `INSERTing remove-form-form callback`
			},
			pages : {
				name : `INSERT_remove_form_callback`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'remove_form_form' ), (SELECT id FROM uri WHERE root_id = "remove-form-form"), "remove-form-form")`,
				message : `INSERTing /administrate/form/remove section` 
			},
			pages_permissions : {
				name : `INSERT_form_remove_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='remove-form-form'))`,
				message : `INSERTing /administrate/form/remove permissions`,
			},

		},

		administration_remove_form : {

			uri : {
				name : `INSERT_uri_form_remove`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/form/remove/post', 'remove-form', true, true)`,
				message : `INSERTing /administrate/form/remove/post uri`
			},
			callback : {
				name : `INSERT_form_remove_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'remove-form-form' )`,
				message : `INSERTing remove-form callback`
			},
			pages : {
				name : `INSERT_form_remove_callback`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'remove_form_form' ), (SELECT id FROM uri WHERE root_id = "remove-form"), "remove-form")`,
				message : `INSERTing /administrate/form/remove/post section` 
			},
			pages_permissions : {
				name : `INSERT_form_remove_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='remove-form'))`,
				message : `INSERTing /administrate/form/remove/post permissions`,
			},

		},

		administration_request_form_post : {

			uri : {
				name : `INSERT_uri_form_request_post`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/form/request/post', 'request-form-post', true, true)`,
				message : `INSERTing /administrate/form/request/post uri`
			},
			callback : {
				name : `INSERT_form_request_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm', "request-form-post" )`,
				message : `INSERTing request-form callback`
			},
			pages : {
				name : `INSERT_form_request_callback`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = "request-form-post" ), (SELECT id FROM uri WHERE root_id = "request-form-post"), "request-form-post")`,
				message : `INSERTing /administrate/form/request/post section` 
			},
			pages_permissions : {
				name : `INSERT_form_request_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, false, false, false, (SELECT id FROM pages where root_id='request-form-post'))`,
				message : `INSERTing /administrate/form/request/post permissions`,
			},

		},

		uploads: {

			uri : {
				name : `INSERT_uri_uploads`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/uploads', 'uploads', true, true)`,
				message : `INSERTing /administrate/uploads uri`
			},
			callback : {
				name : `INSERT_uploads_callback`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/content/', 'upload_service', 'getUploadView')`,
				message : `INSERTing uploads callback`
			},
			pages : {
				name : `INSERT_uploads_page`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'upload_service' AND callback = 'getUploadView'), (SELECT id FROM uri WHERE root_id = "uploads"), "uploads")`,
				message : `INSERTing /administrate/uploads section` 
			},
			pages_permissions : {
				name : `INSERT_uploads_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, true, (SELECT id FROM pages where root_id='uploads'))`,
				message : `INSERTing /administrate/uploads permissions`,
			},

		},

		uploads_search: {

			uri : {
				name : `INSERT_uri_uploads_search`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/uploads/search', 'uploads_search', true, true)`,
				message : `INSERTing /administrate/uploads uri`
			},
			callback : {
				name : `INSERT_uploads_search_callback`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/content/', 'upload_service', 'getFiles')`,
				message : `INSERTing uploads callback`
			},
			pages : {
				name : `INSERT_uploads_search_page`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'upload_service' AND callback = 'getFiles'), (SELECT id FROM uri WHERE root_id = "uploads_search"), "uploads_search")`,
				message : `INSERTing /administrate/uploads/search section` 
			},
			pages_permissions : {
				name : `INSERT_uploads_search_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, true, (SELECT id FROM pages where root_id='uploads_search'))`,
				message : `INSERTing /administrate/uploads/search permissions`,
			},

		},

		uploads_add_file: {

			uri : {
				name : `INSERT_uri_uploads_add_file`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/uploads/files/add*', 'uploads-add-file', true, true)`,
				message : `INSERTing /administrate/uploads/files/add uri`
			},
			callback : {
				name : `INSERT_uploads_callback_add_file`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/content/', 'upload_service', 'addFile')`,
				message : `INSERTing uploads callback`
			},
			pages : {
				name : `INSERT_uploads_page_add_file`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'upload_service' AND callback = 'addFile'), (SELECT id FROM uri WHERE root_id = "uploads-add-file"), "uploads-add-file")`,
				message : `INSERTing /administrate/files/add section` 
			},
			pages_permissions : {
				name : `INSERT_uploads_permissions_add_file`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, true, (SELECT id FROM pages where root_id='uploads-add-file'))`,
				message : `INSERTing /administrate/files/add permissions`,
			},

		},

		
		uploads_add_folder: {

			uri : {
				name : `INSERT_uri_uploads_add_folder`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/uploads/folders/add', 'uploads-add-folder', true, true)`,
				message : `INSERTing /administrate/uploads/folders/add uri`
			},
			callback : {
				name : `INSERT_uploads_callback_add_folder`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/content/', 'upload_service', 'addFolder')`,
				message : `INSERTing uploads callback`
			},
			pages : {
				name : `INSERT_uploads_page_add_folder`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'upload_service' AND callback = 'addFolder' ), (SELECT id FROM uri WHERE root_id = "uploads-add-folder"), "uploads-add-folder")`,
				message : `INSERTing /administrate/folders/add section` 
			},
			pages_permissions : {
				name : `INSERT_uploads_permissions_add_folder`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, true, (SELECT id FROM pages where root_id='uploads-add-folder'))`,
				message : `INSERTing /administrate/folders/add permissions`,
			},

		},

		uploads_remove_file: {

			uri : {
				name : `INSERT_uri_uploads_remove_file`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/uploads/files/remove', 'uploads-remove-file', true, true)`,
				message : `INSERTing /administrate/uploads/files/remove uri`
			},
			callback : {
				name : `INSERT_uploads_callback_remove_file`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/content/', 'upload_service', 'removeFile')`,
				message : `INSERTing uploads callback`
			},
			pages : {
				name : `INSERT_uploads_page_remove_file`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'upload_service' AND callback = 'removeFile'), (SELECT id FROM uri WHERE root_id = "uploads-remove-file"), "uploads-remove-file")`,
				message : `INSERTing /administrate/files/remove section` 
			},
			pages_permissions : {
				name : `INSERT_uploads_permissions_remove_file`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, true, (SELECT id FROM pages where root_id='uploads-remove-file'))`,
				message : `INSERTing /administrate/files/remove permissions`,
			},

		},

		uploads_init_directories: {

			uri : {
				name : `INSERT_uri_init_directories`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/uploads/init', 'uploads-init-dir', true, true)`,
				message : `INSERTing /administrate/uploads/init uri`
			},
			callback : {
				name : `INSERT_uploads_init_directories`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/content/types/', 'upload_service', 'initDirectories')`,
				message : `INSERTing uploads callback`
			},
			pages : {
				name : `INSERT_uploads_init_directories`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'upload_service' AND callback = 'initDirectories'), (SELECT id FROM uri WHERE root_id = "uploads-init-dir"), "uploads-init-dir")`,
				message : `INSERTing /administrate/uploads/init section` 
			},
			pages_permissions : {
				name : `INSERT_uploads_init_directories`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, true, (SELECT id FROM pages where root_id='uploads-init-dir'))`,
				message : `INSERTing /administrate/uploads/init permissions`,
			},

		},
		administration_create_content_types_form : {

			uri : {
				name : `INSERT_uri_content_types_create_form`,
				query : `INSERT INTO uri (uri, feature, root_id, isSystem, isPublished) VALUES ('/administrate/content/types/create', 'ctypes_Create', 'create-content-types-form', true, true)`,
				message : `INSERTing /administrate/content/types/create uri`
			},
			callback : {
				name : `INSERT_content_types_create_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm', 'create_content_types_form' )`,
				message : `INSERTing create-content-types-form callback`
			},
			pages : {
				name : `INSERT_content_types_create_form_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'create_content_types_form' ), (SELECT id FROM uri WHERE root_id = "create-content-types-form"), "create-content-types-form")`,
				message : `INSERTing /administrate/content/types/create section` 
			},
			pages_permissions : {
				name : `INSERT_content_types_create_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='create-content-types-form'))`,
				message : `INSERTing /administrate/content/types/create permissions`,
			},

		},

		administration_create_content_types : {

			uri : {
				name : `INSERT_uri_content_types_create`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/content/types/create/post', 'create-content-types', true, true)`,
				message : `INSERTing /administrate/content/types/create/post uri`
			},
			callback : {
				name : `INSERT_content_types_create_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'create_content_types_form' )`,
				message : `INSERTing create-content-types callback`
			},
			pages : {
				name : `INSERT_content_types_create_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'create_content_types_form' ), (SELECT id FROM uri WHERE root_id = "create-content-types"), "create-content-types")`,
				message : `INSERTing /administrate/content/types/create/post section` 
			},
			pages_permissions : {
				name : `INSERT_content_types_create_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='create-content-types'))`,
				message : `INSERTing /administrate/content/types/create/post permissions`,
			},

		},

		administration_edit_content_types_form : {

			uri : {
				name : `INSERT_uri_content_types_edit_form`,
				query : `INSERT INTO uri (uri, feature, root_id, isSystem, isPublished) VALUES ('/administrate/content/types/edit', 'ctypes_Edit', 'edit-content-types-form', true, true)`,
				message : `INSERTing /administrate/content/types/edit uri`
			},
			callback : {
				name : `INSERT_content_types_edit_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm', 'edit_content_types_form' )`,
				message : `INSERTing edit-content-types-form callback`
			},
			pages : {
				name : `INSERT_content_types_edit_form_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'edit_content_types_form' ), (SELECT id FROM uri WHERE root_id = "edit-content-types-form"), "edit-content-types-form")`,
				message : `INSERTing /administrate/content/types/edit section` 
			},
			pages_permissions : {
				name : `INSERT_content_types_edit_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-content-types-form'))`,
				message : `INSERTing /administrate/content/types/edit permissions`,
			},

		},


		administration_edit_content_types : {

			uri : {
				name : `INSERT_uri_content_types_edit`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/content/types/edit/post', 'edit-content-types', true, true)`,
				message : `INSERTing /administrate/content/types/edit/post uri`
			},
			callback : {
				name : `INSERT_content_types_edit_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'edit_content_types_form' )`,
				message : `INSERTing edit-content-types callback`
			},
			pages : {
				name : `INSERT_content_types_edit_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'edit_content_types_form' ), (SELECT id FROM uri WHERE root_id = "edit-content-types"), "edit-content-types")`,
				message : `INSERTing /administrate/content/types/edit/post section` 
			},
			pages_permissions : {
				name : `INSERT_content_types_edit_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-content-types'))`,
				message : `INSERTing /administrate/content/types/edit/post permissions`,
			},

		},

		administration_remove_content_types_form : {

			uri : {
				name : `INSERT_uri_content_types_remove_form`,
				query : `INSERT INTO uri (uri, feature, root_id, isSystem, isPublished) VALUES ('/administrate/content/types/remove', 'ctypes_Remove','remove-content-types-form', true, true)`,
				message : `INSERTing /administrate/content/types/remove uri`
			},
			callback : {
				name : `INSERT_content_types_remove_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm',  'remove_content_types_form' )`,
				message : `INSERTing remove-content-types-form callback`
			},
			pages : {
				name : `INSERT_content_types_remove_form_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'remove_content_types_form' ), (SELECT id FROM uri WHERE root_id = "remove-content-types-form"), "remove-content-types-form")`,
				message : `INSERTing /administrate/content/types/remove section` 
			},
			pages_permissions : {
				name : `INSERT_content_types_remove_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='remove-content-types-form'))`,
				message : `INSERTing /administrate/content/types/remove permissions`,
			},

		},

		administration_remove_content_types : {

			uri : {
				name : `INSERT_uri_content_types_remove`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/content/types/remove/post', 'remove-content-types', true, true)`,
				message : `INSERTing /administrate/content/types/remove/post uri`
			},
			callback : {
				name : `INSERT_content_types_remove_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'remove_content_types_form' )`,
				message : `INSERTing remove-content-types callback`
			},
			pages : {
				name : `INSERT_content_types_remove_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'remove_content_types_form' ), (SELECT id FROM uri WHERE root_id = "remove-content-types"), "remove-content-types")`,
				message : `INSERTing /administrate/content/types/remove/post section` 
			},
			pages_permissions : {
				name : `INSERT_content_types_remove_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='remove-content-types'))`,
				message : `INSERTing /administrate/content/types/remove/post permissions`,
			},

		},
		administration_create_content_form : {

			uri : {
				name : `INSERT_uri_content_create_form`,
				query : `INSERT INTO uri (uri, feature, root_id, isSystem, isPublished) VALUES ('/administrate/content/create', 'content_Create', 'create-content-form', true, true)`,
				message : `INSERTing /administrate/content/create uri`
			},
			callback : {
				name : `INSERT_content_create_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm', 'create_content_form' )`,
				message : `INSERTing create-content-form callback`
			},
			pages : {
				name : `INSERT_content_create_form_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'create_content_form' ), (SELECT id FROM uri WHERE root_id = "create-content-form"), "create-content-form")`,
				message : `INSERTing /administrate/content/create section` 
			},
			pages_permissions : {
				name : `INSERT_content_create_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='create-content-form'))`,
				message : `INSERTing /administrate/content/create permissions`,
			},

		},

		administration_create_content : {

			uri : {
				name : `INSERT_uri_content_create`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/content/create/post', 'create-content', true, true)`,
				message : `INSERTing /administrate/content/create/post uri`
			},
			callback : {
				name : `INSERT_content_create_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'create_content_form' )`,
				message : `INSERTing create-content callback`
			},
			pages : {
				name : `INSERT_content_create_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'create_content_form' ), (SELECT id FROM uri WHERE root_id = "create-content"), "create-content")`,
				message : `INSERTing /administrate/content/create/post section` 
			},
			pages_permissions : {
				name : `INSERT_content_create_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='create-content'))`,
				message : `INSERTing /administrate/content/create/post permissions`,
			},

		},
		
		administration_edit_content_form : {

			uri : {
				name : `INSERT_uri_content_edit_form`,
				query : `INSERT INTO uri (uri, feature, root_id, isSystem, isPublished) VALUES ('/administrate/content/edit', 'content_Edit', 'edit-content-form', true, true)`,
				message : `INSERTing /administrate/content/edit uri`
			},
			callback : {
				name : `INSERT_content_edit_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm', 'edit_content_form' )`,
				message : `INSERTing edit-content-form callback`
			},
			pages : {
				name : `INSERT_content_edit_form_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'edit_content_form' ), (SELECT id FROM uri WHERE root_id = "edit-content-form"), "edit-content-form")`,
				message : `INSERTing /administrate/content/edit section` 
			},
			pages_permissions : {
				name : `INSERT_content_edit_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-content-form'))`,
				message : `INSERTing /administrate/content/edit permissions`,
			},

		},

		administration_edit_content : {

			uri : {
				name : `INSERT_uri_content_edit`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/content/edit/post', 'edit-content', true, true)`,
				message : `INSERTing /administrate/content/edit/post uri`
			},
			callback : {
				name : `INSERT_content_edit_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'edit_content_form' )`,
				message : `INSERTing edit-content callback`
			},
			pages : {
				name : `INSERT_content_edit_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'edit_content_form' ), (SELECT id FROM uri WHERE root_id = "edit-content"), "edit-content")`,
				message : `INSERTing /administrate/content/edit/post section` 
			},
			pages_permissions : {
				name : `INSERT_content_edit_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-content'))`,
				message : `INSERTing /administrate/content/edit/post permissions`,
			},

		},

		administration_remove_content_form : {

			uri : {
				name : `INSERT_uri_content_remove_form`,
				query : `INSERT INTO uri (uri, feature, root_id, isSystem, isPublished) VALUES ('/administrate/content/remove', 'content_Remove', 'remove-content-form', true, true)`,
				message : `INSERTing /administrate/content/remove uri`
			},
			callback : {
				name : `INSERT_content_remove_form_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'getForm', 'remove_content_form' )`,
				message : `INSERTing remove-content-form callback`
			},
			pages : {
				name : `INSERT_content_remove_form_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "get", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'remove_content_form' ), (SELECT id FROM uri WHERE root_id = "remove-content-form"), "remove-content-form")`,
				message : `INSERTing /administrate/content/remove section` 
			},
			pages_permissions : {
				name : `INSERT_content_remove_form_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='remove-content-form'))`,
				message : `INSERTing /administrate/content/remove permissions`,
			},

		},

		administration_remove_content : {

			uri : {
				name : `INSERT_uri_content_remove`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/content/remove/post', 'remove-content', true, true)`,
				message : `INSERTing /administrate/content/remove/post uri`
			},
			callback : {
				name : `INSERT_content_remove_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'remove_content_form' )`,
				message : `INSERTing remove-content callback`
			},
			pages : {
				name : `INSERT_content_remove_pages`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("Administration | ${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'remove_content_form' ), (SELECT id FROM uri WHERE root_id = "remove-content"), "remove-content")`,
				message : `INSERTing /administrate/content/remove/post section` 
			},
			pages_permissions : {
				name : `INSERT_content_remove_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='remove-content'))`,
				message : `INSERTing /administrate/content/remove/post permissions`,
			},

		},

		content_types_search: {

			uri : {
				name : `INSERT_uri_content_types_search`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/content/types/search', 'content-types-search', true, true)`,
				message : `INSERTing /administrate/uploads uri`
			},
			callback : {
				name : `INSERT_content_types_search_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'content_types_search')`,
				message : `INSERTing uploads callback`
			},
			pages : {
				name : `INSERT_content_types_search_page`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name='content_types_search'), (SELECT id FROM uri WHERE root_id = "content-types-search"), "content-types-search")`,
				message : `INSERTing /administrate/content/types/search section` 
			},
			pages_permissions : {
				name : `INSERT_content_types_search_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, true, (SELECT id FROM pages where root_id='content-types-search'))`,
				message : `INSERTing /administrate/content/types/search permissions`,
			},

		},

		content_search: {

			uri : {
				name : `INSERT_uri_content_search`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/content/search', 'content-search', true, true)`,
				message : `INSERTing /administrate/uploads uri`
			},
			callback : {
				name : `INSERT_content_search_callback`,
				query : `INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/form/', 'form_service', 'validateForm', 'content_search')`,
				message : `INSERTing uploads callback`
			},
			pages : {
				name : `INSERT_content_search_page`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name='content_search'), (SELECT id FROM uri WHERE root_id = "content-search"), "content-search")`,
				message : `INSERTing /administrate/content/types/search section` 
			},
			pages_permissions : {
				name : `INSERT_content_search_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, true, (SELECT id FROM pages where root_id='content-search'))`,
				message : `INSERTing /administrate/content/types/search permissions`,
			},

		},

		content_get: {

			uri : {
				name : `INSERT_uri_content_get`,
				query : `INSERT INTO uri (uri, root_id, isSystem, isPublished) VALUES ('/administrate/content/get', 'content-get', true, true)`,
				message : `INSERTing /administrate/uploads uri`
			},
			callback : {
				name : `INSERT_content_get_callback`,
				query : `INSERT INTO callback (filepath, filename, callback) VALUES ('${global_transaction.BACKEND_MODULE_DIR_SQL}/administration/content/', 'content_service', 'getContentValues')`,
				message : `INSERTing uploads callback`
			},
			pages : {
				name : `INSERT_content_get_page`,
				query : `INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES ("${global_transaction.DEFAULT_SITE_TITLE}", "post", "office", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name='content_get'), (SELECT id FROM uri WHERE root_id = "content-get"), "content-get")`,
				message : `INSERTing /administrate/content/types/search section` 
			},
			pages_permissions : {
				name : `INSERT_content_get_permissions`,
				query : `INSERT INTO pages_permissions (${global_transaction.ROUTE_PERMISSIONS_PREFIX}Logout, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Login, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Contributor, ${global_transaction.ROUTE_PERMISSIONS_PREFIX}Administrator, page_id) VALUES (false, true, true, true, (SELECT id FROM pages where root_id='content-get'))`,
				message : `INSERTing /administrate/content/types/search permissions`,
			},

		},


}