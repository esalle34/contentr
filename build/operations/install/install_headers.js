"use strict";

//Install - Headers
//Author - Eric Salle
var global_transaction = require('../global_transactions')();

var default_header = "{ \"react_element\" : \"header\", \"args\" : {\"key\" : \"main-header\" }, \"react_nested\" :{ \"react_element\" : \"div\", \"args\" : {\"key\" : \"fixed-header\", \"className\" : \"container fixed-header\" }, \"react_nested\" : [ {\"react_element\" : \"div\", \"args\" : {\"key\" : \"filler-header\", \"className\" : \"filler filler-header\"} },{\"react_element\" : \"nav\", \"args\" : {\"key\" : \"main-nav\", \"className\" : \"navbar navbar-expand-lg justify-content-between navbar-light bg-light\" }, \"react_nested\" : [{\"react_element\": \"button\", \"args\" : {\"className\" : \"navbar-toggler\", \"key\" : \"header-mobile-hamburger\", \"dataToggle\" : \"collapse\", \"dataTarget\" : \"#navbar-collapse\", \"ariaControls\" : \"navbar-collapse\"}, \"react_nested\" : {\"react_element\": \"span\", \"args\" : {\"key\" : \"header-mobile-hamburger-icon\", \"className\" : \"navbar-toggler-icon\"} } }, {\"react_element\" : \"a\", \"args\" : {\"key\" : \"navbar-brand\", \"className\" : \"navbar-brand\", \"href\" : \"/\", \"els\" : \"Bienvenue\"} }, {\"react_element\" : \"div\", \"args\" : {\"key\" : \"navbar-collapse\", \"className\" : \"navbar-collapse collapse\", \"id\" : \"navbar-collapse\"}, \"react_nested\" : [] }] }] } }";
module.exports = {
  administration_header_logout: {
    headers: {
      name: "INSERT_header_loggedout",
      query: "INSERT INTO headers (name, element) VALUES ('header_loggedout', '".concat(default_header, "')"),
      message: "INSERTing header_loggedout"
    },
    right_list: {
      name: "INSERT_right_list_element_loggedout",
      query: "INSERT INTO headers_elements (name, header_id, element, args, weight, value) VALUES (\"right_list_loggedout\",(SELECT id FROM headers WHERE name = 'header_loggedout'), 'ul', '{\"id\" : \"right-list-loggedout\",\"classes\" : \"navbar-nav mr-auto\"}', 0,'Right List')",
      message: "INSERTing right list element for loggedout header"
    },
    login_element: {
      name: "INSERT_login_uri",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"signin\",(SELECT id FROM headers WHERE name = 'header_loggedout'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='right_list_loggedout'), 'a', '{ \"classes\" : \"btn btn-menu nav-link\" }', 'Sign in', 0, (SELECT id FROM uri WHERE root_id = 'login-form'))",
      message: "INSERTing login element into loggedout header"
    },
    register_element: {
      name: "INSERT_register_uri",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"signup\",(SELECT id FROM headers WHERE name = 'header_loggedout'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='right_list_loggedout'), 'a', '{ \"classes\" : \"btn btn-menu nav-link\" }', 'Sign up', 1, (SELECT id FROM uri WHERE root_id = 'register-form'))",
      message: "INSERTing register element into loggedout header"
    }
  },
  administration_header_user: {
    headers: {
      name: "INSERT_header_user",
      query: "INSERT INTO headers (name, element) VALUES ('header_user',  '".concat(default_header, "')"),
      message: "INSERTing header_user"
    },
    right_list: {
      name: "INSERT_right_list_element_user",
      query: "INSERT INTO headers_elements (name, header_id, element, args, value, weight) VALUES (\"right_list_user\",(SELECT id FROM headers WHERE name = 'header_user'), 'ul', '{\"id\" : \"right-list-user\",\"classes\" : \"navbar-nav mr-auto\"}', 'Right List', 0)",
      message: "INSERTing right list element for user header"
    },
    welcome_element: {
      name: "INSERT_welcome_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, value, weight) VALUES (\"welcome_user\",(SELECT id FROM headers WHERE name = 'header_user'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='right_list_user'), 'span', 'Welcome', 0)",
      message: "INSERTing welcome element for user header"
    },
    logout_element: {
      name: "INSERT_logout_uri",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"logout_user\",(SELECT id FROM headers WHERE name = 'header_user'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='right_list_user'), 'a', '{ \"classes\" : \"btn btn-menu nav-link\" }', 'Logout', 1, (SELECT id FROM uri WHERE root_id = 'logout'))",
      message: "INSERTing register element into user header"
    }
  },
  administration_header_contributor: {
    headers: {
      name: "INSERT_header_contributor",
      query: "INSERT INTO headers (name, element) VALUES ('header_contributor',  '".concat(default_header, "')"),
      message: "INSERTing header_contributor"
    },
    right_list: {
      name: "INSERT_right_list_element_contributor",
      query: "INSERT INTO headers_elements (name, header_id, element, args, value, weight) VALUES (\"right_list_contributor\",(SELECT id FROM headers WHERE name = 'header_contributor'), 'ul', '{\"id\" : \"right-list-contributor\",\"classes\" : \"navbar-nav mr-auto\"}', 'Right List', 0)",
      message: "INSERTing right list element for contributor header"
    },
    welcome_element: {
      name: "INSERT_welcome_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, value, weight) VALUES (\"welcome_contributor\",(SELECT id FROM headers WHERE name = 'header_contributor'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='right_list_contributor'), 'span', 'Welcome', 0)",
      message: "INSERTing welcome element for contributor header"
    },
    logout_element: {
      name: "INSERT_logout_uri",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"logout_contributor\",(SELECT id FROM headers WHERE name = 'header_contributor'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='right_list_contributor'), 'a', '{ \"classes\" : \"btn btn-menu nav-link\" }', 'Logout', 1, (SELECT id FROM uri WHERE root_id = 'logout'))",
      message: "INSERTing register element into contributor header"
    }
  },
  administration_header_administrator: {
    headers: {
      name: "INSERT_header_administrator",
      query: "INSERT INTO headers (name, element) VALUES ('header_administrator',  '".concat(default_header, "')"),
      message: "INSERTing header_administrator"
    },
    left_list: {
      name: "INSERT_left_list_element_administration",
      query: "INSERT INTO headers_elements (name, header_id, element, args, value, weight) VALUES (\"left_list_administrator\",(SELECT id FROM headers WHERE name = 'header_administrator'), 'ul', '{\"id\" : \"left-list-admin\",\"classes\" : \"navbar-nav ml-auto no-margin-left\"}', 'Left List', 0)",
      message: "INSERTing left list element for administrator header"
    },
    administration_element: {
      name: "INSERT_administration_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight) VALUES (\"administration_dropdown_admin\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='left_list_administrator'), 'dropdown', '{ \"innerTagElement\" : \"button\", \"id\" : \"administrationMenu\", \"classes\" : \"btn btn-menu nav-link\", \"menuClassName\" : \"dropdown-menu first\" }', 'Administration', 0)",
      message: "INSERTing administration dropdown element into administrator header"
    },
    administration_element_content: {
      name: "INSERT_content_administration_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"administration_dropdown_admin_content\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='administration_dropdown_admin'), 'dropdown', '{ \"innerTagElement\" : \"a\", \"id\" : \"administrationMenucontent\", \"dropDownClassName\" : \"submenu dropright\", \"classes\" : \"dropdown-item\" }', 'Content', 0, (SELECT id FROM uri WHERE root_id = 'administration-content'))",
      message: "INSERTing administration dropdown content element into administrator header (administration_dropdown_admin)"
    },
    administration_element_content_search: {
      name: "INSERT_content_administration_element_search",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"administration_dropdown_admin_content_search\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='administration_dropdown_admin_content'), 'dropdown', '{ \"innerTagElement\" : \"a\", \"id\" : \"administrationMenucontent\", \"dropDownClassName\" : \"submenu dropright\", \"classes\" : \"dropdown-item\" }','Search', 0,(SELECT id FROM uri WHERE root_id = 'administration-content'))",
      message: "INSERTing administration dropdown content element search into administrator header (administration_dropdown_admin)"
    },
    administration_element_content_search_google: {
      name: "INSERT_content_create_administration_search_google",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, weight, value) VALUES (\"administration_dropdown_admin_content_search_google\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='administration_dropdown_admin_content_search'), 'a', '{ \"classes\" : \"dropdown-item\", \"target\" : \"blank\", \"href\" : \"https://www.google.fr\" }', 1, 'Google')",
      message: "INSERTing administration dropdown content search google element into administrator header (administration_dropdown_admin)"
    },
    administration_element_content_create: {
      name: "INSERT_content_create_administration_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"administration_dropdown_admin_content_create\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='administration_dropdown_admin_content'), 'a', '{ \"classes\" : \"dropdown-item\" }', 'Create', 1, (SELECT id FROM uri WHERE root_id = 'create-content-form'))",
      message: "INSERTing administration dropdown content create element into administrator header (administration_dropdown_admin)"
    },
    administration_element_content_edit: {
      name: "INSERT_content_edit_administration_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"administration_dropdown_admin_content_edit\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='administration_dropdown_admin_content'), 'a', '{ \"classes\" : \"dropdown-item\" }', 'Edit', 2, (SELECT id FROM uri WHERE root_id = 'edit-content-form'))",
      message: "INSERTing administration dropdown content edit element into administrator header (administration_dropdown_admin)"
    },
    administration_element_content_remove: {
      name: "INSERT_content_remove_administration_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"administration_dropdown_admin_content_remove\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='administration_dropdown_admin_content'), 'a', '{ \"classes\" : \"dropdown-item\" }', 'Remove', 3, (SELECT id FROM uri WHERE root_id = 'remove-content-form'))",
      message: "INSERTing administration dropdown content remove element into administrator header (administration_dropdown_admin)"
    },
    administration_element_headers: {
      name: "INSERT_headers_administration_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"administration_dropdown_admin_headers\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='administration_dropdown_admin'), 'dropdown', '{ \"innerTagElement\" : \"a\", \"id\" : \"administrationMenuHeaders\", \"dropDownClassName\" : \"submenu dropright\", \"classes\" : \"dropdown-item\" }', 'Headers', 1, (SELECT id FROM uri WHERE root_id = 'administration-headers'))",
      message: "INSERTing administration dropdown headers element into administrator header (administration_dropdown_admin)"
    },
    administration_element_create: {
      name: "INSERT_headers_create_administration_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"administration_dropdown_admin_headers_create\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='administration_dropdown_admin_headers'), 'a', '{ \"classes\" : \"dropdown-item\" }', 'Create', 1, (SELECT id FROM uri WHERE root_id = 'create-header-form'))",
      message: "INSERTing administration dropdown headers create element into administrator header (administration_dropdown_admin)"
    },
    administration_element_headers_edit: {
      name: "INSERT_headers_edit_administration_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"administration_dropdown_admin_headers_edit\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='administration_dropdown_admin_headers'), 'a', '{ \"classes\" : \"dropdown-item\" }', 'Edit', 2,(SELECT id FROM uri WHERE root_id = 'edit-header-form'))",
      message: "INSERTing administration dropdown headers edit element into administrator header (administration_dropdown_admin)"
    },
    administration_element_headers_remove: {
      name: "INSERT_headers_remove_administration_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"administration_dropdown_admin_headers_remove\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='administration_dropdown_admin_headers'), 'a', '{ \"classes\" : \"dropdown-item\" }', 'Remove', 3, (SELECT id FROM uri WHERE root_id = 'remove-header-form'))",
      message: "INSERTing administration dropdown headers remove element into administrator header (administration_dropdown_admin)"
    },
    administration_element_forms: {
      name: "INSERT_forms_administration_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"administration_dropdown_admin_forms\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='administration_dropdown_admin'), 'dropdown', '{ \"innerTagElement\" : \"a\", \"id\" : \"administrationMenuforms\", \"dropDownClassName\" : \"submenu dropright\", \"classes\" : \"dropdown-item\" }', 'Forms', 2, (SELECT id FROM uri WHERE root_id = 'administration-forms'))",
      message: "INSERTing administration dropdown forms element into administrator header (administration_dropdown_admin)"
    },
    administration_element_forms_create: {
      name: "INSERT_forms_create_administration_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"administration_dropdown_admin_forms_create\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='administration_dropdown_admin_forms'), 'a', '{ \"classes\" : \"dropdown-item\" }', 'Create', 1, (SELECT id FROM uri WHERE root_id = 'create-form-form'))",
      message: "INSERTing administration dropdown forms create element into administrator header (administration_dropdown_admin)"
    },
    administration_element_forms_edit: {
      name: "INSERT_forms_edit_administration_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"administration_dropdown_admin_forms_edit\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='administration_dropdown_admin_forms'), 'a', '{ \"classes\" : \"dropdown-item\" }', 'Edit', 2,(SELECT id FROM uri WHERE root_id = 'edit-form-form'))",
      message: "INSERTing administration dropdown forms edit element into administrator header (administration_dropdown_admin)"
    },
    administration_element_forms_remove: {
      name: "INSERT_forms_remove_administration_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"administration_dropdown_admin_forms_remove\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='administration_dropdown_admin_forms'), 'a', '{ \"classes\" : \"dropdown-item\" }', 'Remove', 3, (SELECT id FROM uri WHERE root_id = 'remove-form-form'))",
      message: "INSERTing administration dropdown forms remove element into administrator header (administration_dropdown_admin)"
    },
    right_list: {
      name: "INSERT_right_list_element_administration",
      query: "INSERT INTO headers_elements (name, header_id, element, args, value, weight) VALUES (\"right_list_administrator\",(SELECT id FROM headers WHERE name = 'header_administrator'), 'ul', '{\"id\" : \"right-list-admin\",\"classes\" : \"navbar-nav mr-auto\"}', 'Right List', 0)",
      message: "INSERTing right list element for administrator header"
    },
    welcome_element: {
      name: "INSERT_welcome_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, value, weight) VALUES (\"welcome_admin\",(SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='right_list_administrator'), 'span', 'Welcome', 0)",
      message: "INSERTing welcome element for administrator header"
    },
    logout_element: {
      name: "INSERT_logout_element",
      query: "INSERT INTO headers_elements (name, header_id, header_element_id, element, args, value, weight, uri_id) VALUES (\"logout_admin\", (SELECT id FROM headers WHERE name = 'header_administrator'), (SELECT id from (SELECT * FROM headers_elements) AS helems where helems.name='right_list_administrator'), 'a', '{\"classes\" : \"btn btn-menu nav-link\"}', 'Logout', 1,(SELECT id FROM uri WHERE root_id = 'logout'))",
      message: "INSERTing register element into administrator header"
    }
  }
};