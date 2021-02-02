"use strict";

//Install - Main Routes
//Author - Eric Salle
var global_transaction = require('../global_transactions')();

module.exports = {
  home: {
    uri: {
      name: "INSERT_uri_home",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/', 'home')",
      message: "INSERTing home uri"
    },
    pages: {
      name: "INSERT_pages_home",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"main\", null, (SELECT id FROM uri WHERE root_id = \"home\") , \"home\")"),
      message: "INSERTing homepage section"
    },
    pages_permissions: {
      name: "INSERT_pages_home_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, false, false, false, (SELECT id FROM pages where root_id='home'))"),
      message: "INSERTing homepage permissions"
    }
  },
  administration: {
    uri: {
      name: "INSERT_uri_administration",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate', 'administrate')",
      message: "INSERTing administration uri"
    },
    callback: {
      name: "INSERT_administration_callback",
      query: "INSERT INTO callback (filepath, filename, callback) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/administration/', 'administrate', 'administrate')"),
      message: "INSERTing administration callback"
    },
    pages: {
      name: "INSERT_administration",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = \"administrate\" AND callback = \"administrate\" ),(SELECT id FROM uri WHERE root_id = \"administrate\"), \"administrate\")"),
      message: "INSERTing administration section"
    },
    pages_permissions: {
      name: "INSERT_administration_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='administrate'))"),
      message: "INSERTing /administrate permissions"
    }
  },
  administration_pages: {
    uri: {
      name: "INSERT_uri_administration_pages",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/pages', 'administrate_pages')",
      message: "INSERTing pages administration uri"
    },
    callback: {
      name: "INSERT_administration_callback",
      query: "INSERT INTO callback (filepath, filename, callback) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/administration/', 'pages', 'createPage')"),
      message: "INSERTing pages administration callback"
    },
    pages: {
      name: "INSERT_administration",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = \"pages\" AND callback = \"createPage\" ),(SELECT id FROM uri WHERE root_id = \"administrate_pages\"), \"administrate_pages\")"),
      message: "INSERTing pages administration section"
    },
    pages_permissions: {
      name: "INSERT_administration_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='administrate_pages'))"),
      message: "INSERTing /administrate/pages permissions"
    }
  },
  administration_pages_form: {
    uri: {
      name: "INSERT_uri_administration_pages",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/pages/post', 'administrate_pages_form')",
      message: "INSERTing pages form administration uri"
    },
    callback: {
      name: "INSERT_administration_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'getForm', 'pages_form')"),
      message: "INSERTing pages form administration callback"
    },
    pages: {
      name: "INSERT_administration",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"post\", \"office\", (SELECT id FROM callback WHERE filename = \"form_service\" AND callback = \"getForm\" AND form_name = \"pages_form\" ),(SELECT id FROM uri WHERE root_id = \"administrate_pages_form\"), \"administrate_pages_form\")"),
      message: "INSERTing pages form administration section"
    },
    pages_permissions: {
      name: "INSERT_administration_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='administrate_pages_form'))"),
      message: "INSERTing /administrate/pages/post permissions"
    }
  },
  users_login_form: {
    uri: {
      name: "INSERT_uri_login_form",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/login', 'login-form')",
      message: "INSERTing /administrate/login uri"
    },
    callback: {
      name: "INSERT_login_form_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'getForm', 'login_form'  )"),
      message: "INSERTing login form callback"
    },
    pages: {
      name: "INSERT_login_form",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration login | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id from callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name=\"login_form\"), (SELECT id FROM uri WHERE root_id = \"login-form\"), \"login-form\")"),
      message: "INSERTing /administrate/login section"
    },
    pages_permissions: {
      name: "INSERT_login_form_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (true, false, false, false, (SELECT id FROM pages where root_id='login-form'))"),
      message: "INSERTing /administrate/login permissions"
    }
  },
  users_login: {
    uri: {
      name: "INSERT_uri_login",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/login/post', 'login')",
      message: "INSERTing /administrate/login/post form uri"
    },
    callback: {
      name: "INSERT_login_callback",
      query: "INSERT INTO callback (filepath, filename, callback) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/users/', 'user_service', 'login' )"),
      message: "INSERTing /administrate/login/post form callback"
    },
    pages: {
      name: "INSERT_login",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"post\", \"office\", (SELECT id FROM callback WHERE filename = 'user_service' AND callback = 'login' ), (SELECT id FROM uri WHERE root_id = \"login\"), \"login\")"),
      message: "INSERTing /administrate/login/post section"
    },
    pages_permissions: {
      name: "INSERT_login_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (true, false, false, false, (SELECT id FROM pages where root_id='login'))"),
      message: "INSERTing /administrate/login/post permissions"
    }
  },
  users_register_form: {
    uri: {
      name: "INSERT_uri_register_form",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/register', 'register-form')",
      message: "INSERTing /administrate/register uri"
    },
    callback: {
      name: "INSERT_register_form_callback",
      query: "INSERT INTO callback (filepath, filename, callback) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/users/', 'user_service', 'register_form' )"),
      message: "INSERTing register form callback"
    },
    pages: {
      name: "INSERT_register_form",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Register | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id from callback WHERE filename = 'user_service' AND callback = 'register_form'), (SELECT id FROM uri WHERE root_id = \"register-form\"), \"register-form\")"),
      message: "INSERTing /administrate/register section"
    },
    pages_permissions: {
      name: "INSERT_register_form_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (true, false, false, false, (SELECT id FROM pages where root_id='register-form'))"),
      message: "INSERTing /administrate/register permissions"
    }
  },
  users_register: {
    uri: {
      name: "INSERT_uri_register",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/register/post', 'register')",
      message: "INSERTing /administrate/register/post form uri"
    },
    callback: {
      name: "INSERT_register_callback",
      query: "INSERT INTO callback (filepath, filename, callback) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/users/', 'user_service', 'register' )"),
      message: "INSERTing /administrate/register/post form callback"
    },
    pages: {
      name: "INSERT_register",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"post\", \"office\", (SELECT id FROM callback WHERE filename = 'user_service' AND callback = 'register' ), (SELECT id FROM uri WHERE root_id = \"register\"), \"register\")"),
      message: "INSERTing /administrate/register/post section"
    },
    pages_permissions: {
      name: "INSERT_register_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (true, false, false, false, (SELECT id FROM pages where root_id='register'))"),
      message: "INSERTing /administrate/register/post permissions"
    }
  },
  users_logout: {
    uri: {
      name: "INSERT_uri_logout",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/logout', 'logout')",
      message: "INSERTing /administrate/logout uri"
    },
    callback: {
      name: "INSERT_logout_callback",
      query: "INSERT INTO callback (filepath, filename, callback) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/users/', 'user_service', 'logout' )"),
      message: "INSERTing logout callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration logout | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'user_service' AND callback = 'logout' ), (SELECT id FROM uri WHERE root_id = \"logout\"), \"logout\")"),
      message: "INSERTing /administrate/logout section"
    },
    pages_permissions: {
      name: "INSERT_logout_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, false, false, (SELECT id FROM pages where root_id='logout'))"),
      message: "INSERTing /administrate/logout permissions"
    }
  },
  administration_content: {
    uri: {
      name: "INSERT_uri_administration_content",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/content', 'administration-content')",
      message: "INSERTing /administrate/content uri"
    },
    callback: {
      name: "INSERT_administration_content_callback",
      query: "INSERT INTO callback (filepath, filename, callback) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/administration/content/', 'content_service', 'administration_content' )"),
      message: "INSERTing create-content-form callback"
    },
    pages: {
      name: "INSERT_administration_content",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'content_service' AND callback = 'administration_content'), (SELECT id FROM uri WHERE root_id = \"administration-content\"), \"administration-content\")"),
      message: "INSERTing /administrate/content section"
    },
    pages_permissions: {
      name: "INSERT_content_create_form_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='administration-content'))"),
      message: "INSERTing /administrate/content permissions"
    }
  },
  administration_create_content_form: {
    uri: {
      name: "INSERT_uri_content_create_form",
      query: "INSERT INTO uri (uri, feature, root_id) VALUES ('/administrate/content/create', 'content_Create', 'create-content-form')",
      message: "INSERTing /administrate/content/create uri"
    },
    callback: {
      name: "INSERT_content_create_form_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'getForm', 'create_content_form' )"),
      message: "INSERTing create-content-form callback"
    },
    pages: {
      name: "INSERT_content_create_form_pages",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'create_content_form' ), (SELECT id FROM uri WHERE root_id = \"create-content-form\"), \"create-content-form\")"),
      message: "INSERTing /administrate/content/create section"
    },
    pages_permissions: {
      name: "INSERT_content_create_form_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='create-content-form'))"),
      message: "INSERTing /administrate/content/create permissions"
    }
  },
  administration_create_content: {
    uri: {
      name: "INSERT_uri_content_create",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/content/create/post', 'create-content')",
      message: "INSERTing /administrate/content/create/post uri"
    },
    callback: {
      name: "INSERT_content_create_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'validateForm', 'create_content_form' )"),
      message: "INSERTing create-content callback"
    },
    pages: {
      name: "INSERT_content_create_pages",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"post\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'create_content_form' ), (SELECT id FROM uri WHERE root_id = \"create-content\"), \"create-content\")"),
      message: "INSERTing /administrate/content/create/post section"
    },
    pages_permissions: {
      name: "INSERT_content_create_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='create-content'))"),
      message: "INSERTing /administrate/content/create/post permissions"
    }
  },
  administration_edit_content_form: {
    uri: {
      name: "INSERT_uri_content_edit_form",
      query: "INSERT INTO uri (uri, feature, root_id) VALUES ('/administrate/content/edit', 'content_Edit', 'edit-content-form')",
      message: "INSERTing /administrate/content/edit uri"
    },
    callback: {
      name: "INSERT_content_edit_form_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'getForm', 'edit_content_form' )"),
      message: "INSERTing edit-content-form callback"
    },
    pages: {
      name: "INSERT_content_edit_form_pages",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'edit_content_form' ), (SELECT id FROM uri WHERE root_id = \"edit-content-form\"), \"edit-content-form\")"),
      message: "INSERTing /administrate/content/edit section"
    },
    pages_permissions: {
      name: "INSERT_content_edit_form_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-content-form'))"),
      message: "INSERTing /administrate/content/edit permissions"
    }
  },
  administration_edit_content_select: {
    uri: {
      name: "INSERT_uri_content_select_form",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/content/edit/select', 'edit-content-select')",
      message: "INSERTing /administrate/content/edit/select uri"
    },
    callback: {
      name: "INSERT_content_edit_select_callback",
      query: "INSERT INTO callback (filepath, filename, callback) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/administration/content/', 'content_service', 'edit_content_select' )"),
      message: "INSERTing edit-content-select callback"
    },
    pages: {
      name: "INSERT_content_edit_select_pages",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'content_service' AND callback = 'edit_content_select' ), (SELECT id FROM uri WHERE root_id = \"edit-content-select\"), \"edit-content-select\")"),
      message: "INSERTing /administrate/content/edit/select section"
    },
    pages_permissions: {
      name: "INSERT_content_edit_select_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-content-select'))"),
      message: "INSERTing /administrate/content/edit/select permissions"
    }
  },
  administration_edit_content: {
    uri: {
      name: "INSERT_uri_content_edit",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/content/edit/post', 'edit-content')",
      message: "INSERTing /administrate/content/edit/post uri"
    },
    callback: {
      name: "INSERT_content_edit_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/administration/content/', 'form_service', 'validateForm', 'edit_content_form' )"),
      message: "INSERTing edit-content callback"
    },
    pages: {
      name: "INSERT_content_edit_pages",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"post\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'edit_content_form' ), (SELECT id FROM uri WHERE root_id = \"edit-content\"), \"edit-content\")"),
      message: "INSERTing /administrate/content/edit/post section"
    },
    pages_permissions: {
      name: "INSERT_content_edit_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-content'))"),
      message: "INSERTing /administrate/content/edit/post permissions"
    }
  },
  administration_remove_content_form: {
    uri: {
      name: "INSERT_uri_content_remove_form",
      query: "INSERT INTO uri (uri, feature, root_id) VALUES ('/administrate/content/remove', 'content_Remove','remove-content-form')",
      message: "INSERTing /administrate/content/remove uri"
    },
    callback: {
      name: "INSERT_content_remove_form_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'getForm',  'remove_content_form' )"),
      message: "INSERTing remove-content-form callback"
    },
    pages: {
      name: "INSERT_content_remove_form_pages",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'remove_content_form' ), (SELECT id FROM uri WHERE root_id = \"remove-content-form\"), \"remove-content-form\")"),
      message: "INSERTing /administrate/content/remove section"
    },
    pages_permissions: {
      name: "INSERT_content_remove_form_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='remove-content-form'))"),
      message: "INSERTing /administrate/content/remove permissions"
    }
  },
  administration_remove_content: {
    uri: {
      name: "INSERT_uri_content_remove",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/content/remove/post', 'remove-content')",
      message: "INSERTing /administrate/content/remove/post uri"
    },
    callback: {
      name: "INSERT_content_remove_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'validateForm', 'remove_content_form' )"),
      message: "INSERTing remove-content callback"
    },
    pages: {
      name: "INSERT_content_remove_pages",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"post\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'remove_content_form' ), (SELECT id FROM uri WHERE root_id = \"remove-content\"), \"remove-content\")"),
      message: "INSERTing /administrate/content/remove/post section"
    },
    pages_permissions: {
      name: "INSERT_content_remove_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='remove-content'))"),
      message: "INSERTing /administrate/content/remove/post permissions"
    }
  },
  administration_headers: {
    uri: {
      name: "INSERT_uri_administration_headers",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/headers', 'administration-headers')",
      message: "INSERTing /administrate/headers uri"
    },
    callback: {
      name: "INSERT_administration_headers_callback",
      query: "INSERT INTO callback (filepath, filename, callback) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/administration/', 'headers', 'administration_headers' )"),
      message: "INSERTing create-headers-form callback"
    },
    pages: {
      name: "INSERT_administration_headers",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'headers' AND callback = 'administration_headers'), (SELECT id FROM uri WHERE root_id = \"administration-headers\"),\"administration-headers\")"),
      message: "INSERTing /administrate/headers section"
    },
    pages_permissions: {
      name: "INSERT_headers_create_form_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='administration-headers'))"),
      message: "INSERTing /administrate/headers permissions"
    }
  },
  administration_create_header_form: {
    uri: {
      name: "INSERT_uri_header_create_form",
      query: "INSERT INTO uri (uri, feature, root_id) VALUES ('/administrate/header/create', 'headers_Create', 'create-header-form')",
      message: "INSERTing /administrate/header/create uri"
    },
    callback: {
      name: "INSERT_header_create_form_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'getForm', 'create_header_form' )"),
      message: "INSERTing create-header-form callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'create_header_form' ), (SELECT id FROM uri WHERE root_id = \"create-header-form\"), \"create-header-form\")"),
      message: "INSERTing /administrate/header/create section"
    },
    pages_permissions: {
      name: "INSERT_header_create_form_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='create-header-form'))"),
      message: "INSERTing /administrate/header/create permissions"
    }
  },
  administration_create_header: {
    uri: {
      name: "INSERT_uri_header_create",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/header/create/post', 'create-header')",
      message: "INSERTing /administrate/header/create/post uri"
    },
    callback: {
      name: "INSERT_header_create_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'validateForm', 'create_header_form' )"),
      message: "INSERTing create-header callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"post\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'create_header_form' ), (SELECT id FROM uri WHERE root_id = \"create-header\"), \"create-header\")"),
      message: "INSERTing /administrate/header/create/post section"
    },
    pages_permissions: {
      name: "INSERT_header_create_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='create-header'))"),
      message: "INSERTing /administrate/header/create/post permissions"
    }
  },
  administration_edit_header_form: {
    uri: {
      name: "INSERT_uri_header_edit_form",
      query: "INSERT INTO uri (uri, feature, root_id) VALUES ('/administrate/header/edit', 'headers_Edit', 'edit-header-form')",
      message: "INSERTing /administrate/header/edit uri"
    },
    callback: {
      name: "INSERT_header_edit_form_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'getForm', 'edit_header_form' )"),
      message: "INSERTing edit-header-form callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'edit_header_form' ), (SELECT id FROM uri WHERE root_id = \"edit-header-form\"), \"edit-header-form\")"),
      message: "INSERTing /administrate/header/edit section"
    },
    pages_permissions: {
      name: "INSERT_header_edit_form_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-header-form'))"),
      message: "INSERTing /administrate/header/edit permissions"
    }
  },
  administration_edit_header_select: {
    uri: {
      name: "INSERT_uri_header_select_form",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/header/edit/select', 'edit-header-select')",
      message: "INSERTing /administrate/header/edit/select uri"
    },
    callback: {
      name: "INSERT_header_edit_select_callback",
      query: "INSERT INTO callback (filepath, filename, callback) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/administration/', 'headers', 'edit_header_select' )"),
      message: "INSERTing edit-header-select callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'headers' AND callback = 'edit_header_select' ), (SELECT id FROM uri WHERE root_id = \"edit-header-select\"), \"edit-header-select\")"),
      message: "INSERTing /administrate/header/edit/select section"
    },
    pages_permissions: {
      name: "INSERT_header_edit_select_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-header-select'))"),
      message: "INSERTing /administrate/header/edit/select permissions"
    }
  },
  administration_edit_header: {
    uri: {
      name: "INSERT_uri_header_edit",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/header/edit/post', 'edit-header')",
      message: "INSERTing /administrate/header/edit/post uri"
    },
    callback: {
      name: "INSERT_header_edit_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'validateForm', 'edit_header_form' )"),
      message: "INSERTing edit-header callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"post\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'edit_header_form'), (SELECT id FROM uri WHERE root_id = \"edit-header\"), \"edit-header\")"),
      message: "INSERTing /administrate/header/edit/post section"
    },
    pages_permissions: {
      name: "INSERT_header_edit_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-header'))"),
      message: "INSERTing /administrate/header/edit/post permissions"
    }
  },
  administration_remove_header_form: {
    uri: {
      name: "INSERT_uri_header_remove_form",
      query: "INSERT INTO uri (uri, feature, root_id) VALUES ('/administrate/header/remove', 'headers_Remove', 'remove-header-form')",
      message: "INSERTing /administrate/header/remove uri"
    },
    callback: {
      name: "INSERT_header_remove_form_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'getForm', 'remove_header_form' )"),
      message: "INSERTing remove-header-form callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'remove_header_form' ), (SELECT id FROM uri WHERE root_id = \"remove-header-form\"), \"remove-header-form\")"),
      message: "INSERTing /administrate/header/remove section"
    },
    pages_permissions: {
      name: "INSERT_header_remove_form_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='remove-header-form'))"),
      message: "INSERTing /administrate/header/remove permissions"
    }
  },
  administration_remove_header: {
    uri: {
      name: "INSERT_uri_header_remove",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/header/remove/post', 'remove-header')",
      message: "INSERTing /administrate/header/remove/post uri"
    },
    callback: {
      name: "INSERT_header_remove_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'validateForm', 'remove_header_form' )"),
      message: "INSERTing remove-header callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"post\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'remove_header_form' ), (SELECT id FROM uri WHERE root_id = \"remove-header\"), \"remove-header\")"),
      message: "INSERTing /administrate/header/remove/post section"
    },
    pages_permissions: {
      name: "INSERT_header_remove_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='remove-header'))"),
      message: "INSERTing /administrate/header/remove/post permissions"
    }
  },
  administration_forms: {
    uri: {
      name: "INSERT_uri_administration_forms",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/forms', 'administration-forms')",
      message: "INSERTing /administrate/forms uri"
    },
    callback: {
      name: "INSERT_administration_forms_callback",
      query: "INSERT INTO callback (filepath, filename, callback) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/administration/', 'forms', 'administration_forms' )"),
      message: "INSERTing create-forms-form callback"
    },
    pages: {
      name: "INSERT_administration_forms",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'forms' AND callback = 'administration_forms'), (SELECT id FROM uri WHERE root_id = \"administration-forms\"),\"administration-forms\")"),
      message: "INSERTing /administrate/forms section"
    },
    pages_permissions: {
      name: "INSERT_forms_create_form_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='administration-forms'))"),
      message: "INSERTing /administrate/forms permissions"
    }
  },
  administration_create_form_form: {
    uri: {
      name: "INSERT_uri_form_create_form",
      query: "INSERT INTO uri (uri, feature, root_id) VALUES ('/administrate/form/create', 'forms_Create', 'create-form-form')",
      message: "INSERTing /administrate/form/create uri"
    },
    callback: {
      name: "INSERT_form_create_form_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'getForm', 'create_form_form' )"),
      message: "INSERTing create-form-form callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'create_form_form' ), (SELECT id FROM uri WHERE root_id = \"create-form-form\"), \"create-form-form\")"),
      message: "INSERTing /administrate/form/create section"
    },
    pages_permissions: {
      name: "INSERT_form_create_form_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='create-form-form'))"),
      message: "INSERTing /administrate/form/create permissions"
    }
  },
  administration_create_form: {
    uri: {
      name: "INSERT_uri_form_create",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/form/create/post', 'create-form')",
      message: "INSERTing /administrate/form/create/post uri"
    },
    callback: {
      name: "INSERT_form_create_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'validateForm', 'create_form_form' )"),
      message: "INSERTing create-form callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"post\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm'  AND form_name = 'create_form_form' ), (SELECT id FROM uri WHERE root_id = \"create-form\"), \"create-form\")"),
      message: "INSERTing /administrate/form/create/post section"
    },
    pages_permissions: {
      name: "INSERT_form_create_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='create-form'))"),
      message: "INSERTing /administrate/form/create/post permissions"
    }
  },
  administration_edit_form_form: {
    uri: {
      name: "INSERT_uri_form_edit_form",
      query: "INSERT INTO uri (uri, feature, root_id) VALUES ('/administrate/form/edit', 'forms_Edit', 'edit-form-form')",
      message: "INSERTing /administrate/form/edit uri"
    },
    callback: {
      name: "INSERT_form_edit_form_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'getForm', 'edit_form_form' )"),
      message: "INSERTing edit-form-form callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'edit_form_form' ), (SELECT id FROM uri WHERE root_id = \"edit-form-form\"), \"edit-form-form\")"),
      message: "INSERTing /administrate/form/edit section"
    },
    pages_permissions: {
      name: "INSERT_form_edit_form_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-form-form'))"),
      message: "INSERTing /administrate/form/edit permissions"
    }
  },
  administration_edit_form_select: {
    uri: {
      name: "INSERT_uri_form_select_form",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/form/edit/select', 'edit-form-select')",
      message: "INSERTing /administrate/form/edit/select uri"
    },
    callback: {
      name: "INSERT_form_edit_select_callback",
      query: "INSERT INTO callback (filepath, filename, callback) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/administration/', 'forms', 'edit_form_select' )"),
      message: "INSERTing edit-form-select callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'forms' AND callback = 'edit_form_select' ), (SELECT id FROM uri WHERE root_id = \"edit-form-select\"), \"edit-form-select\")"),
      message: "INSERTing /administrate/form/edit/select section"
    },
    pages_permissions: {
      name: "INSERT_form_edit_select_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-form-select'))"),
      message: "INSERTing /administrate/form/edit/select permissions"
    }
  },
  administration_edit_form: {
    uri: {
      name: "INSERT_uri_form_edit",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/form/edit/post', 'edit-form')",
      message: "INSERTing /administrate/form/edit/post uri"
    },
    callback: {
      name: "INSERT_form_edit_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'validateForm', 'edit_form_form' )"),
      message: "INSERTing edit-form callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"post\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm'  AND form_name = 'edit_form_form' ), (SELECT id FROM uri WHERE root_id = \"edit-form\"), \"edit-form\")"),
      message: "INSERTing /administrate/form/edit/post section"
    },
    pages_permissions: {
      name: "INSERT_form_edit_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='edit-form'))"),
      message: "INSERTing /administrate/form/edit/post permissions"
    }
  },
  administration_remove_form_form: {
    uri: {
      name: "INSERT_uri_form_remove_form",
      query: "INSERT INTO uri (uri, feature, root_id) VALUES ('/administrate/form/remove', 'forms_Remove', 'remove-form-form')",
      message: "INSERTing /administrate/form/remove uri"
    },
    callback: {
      name: "INSERT_form_remove_form_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'getForm', 'remove_form_form' )"),
      message: "INSERTing remove-form-form callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"get\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'getForm' AND form_name = 'remove_form_form' ), (SELECT id FROM uri WHERE root_id = \"remove-form-form\"), \"remove-form-form\")"),
      message: "INSERTing /administrate/form/remove section"
    },
    pages_permissions: {
      name: "INSERT_form_remove_form_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='remove-form-form'))"),
      message: "INSERTing /administrate/form/remove permissions"
    }
  },
  administration_remove_form: {
    uri: {
      name: "INSERT_uri_form_remove",
      query: "INSERT INTO uri (uri, root_id) VALUES ('/administrate/form/remove/post', 'remove-form')",
      message: "INSERTing /administrate/form/remove/post uri"
    },
    callback: {
      name: "INSERT_form_remove_callback",
      query: "INSERT INTO callback (filepath, filename, callback, form_name) VALUES ('".concat(global_transaction.BACKEND_MODULE_DIR_SQL, "/form/', 'form_service', 'validateForm', 'remove-form-form' )"),
      message: "INSERTing remove-form callback"
    },
    pages: {
      name: "INSERT_logout",
      query: "INSERT INTO pages (title, method, theme, callback_id, uri_id, root_id) VALUES (\"Administration | ".concat(global_transaction.DEFAULT_SITE_TITLE, "\", \"post\", \"office\", (SELECT id FROM callback WHERE filename = 'form_service' AND callback = 'validateForm' AND form_name = 'remove_form_form' ), (SELECT id FROM uri WHERE root_id = \"remove-form\"), \"remove-form\")"),
      message: "INSERTing /administrate/form/remove/post section"
    },
    pages_permissions: {
      name: "INSERT_form_remove_permissions",
      query: "INSERT INTO pages_permissions (".concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Logout, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Login, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Contributor, ").concat(global_transaction.ROUTE_PERMISSIONS_PREFIX, "Administrator, page_id) VALUES (false, true, true, false, (SELECT id FROM pages where root_id='remove-form'))"),
      message: "INSERTing /administrate/form/remove/post permissions"
    }
  }
};