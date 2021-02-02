"use strict";

//Install - Forms
//Author - Eric Salle
var global_transaction = require('../global_transactions')();

var login_form = JSON.stringify({
  method: "post",
  async: true,
  className: "login-form has-popin row justify-content-center shadow-panel",
  enctype: "multipart/form-data",
  els: []
});
var create_content_form = JSON.stringify({
  method: "post",
  async: true,
  id: "create-content-form",
  key: "create-content-form",
  className: "create-content-form has-popin row justify-content-center backoffice-panel",
  enctype: "multipart/form-data",
  els: []
});
var register_form = JSON.stringify({
  id: "register-form",
  key: "register-form",
  method: "post",
  async: true,
  className: "register-form has-popin row justify-content-center shadow-panel",
  enctype: "multipart/form-data",
  els: []
});
module.exports = {
  login: {
    form: {
      name: "INSERT_login_form",
      query: "INSERT into forms (name, element, uri_id, number) VALUES ('login_form', '".concat(login_form, "', (SELECT id FROM uri WHERE root_id='login'), 0)"),
      message: "INSERTing login form"
    },
    container: {
      name: "INSERT_login_form_container",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('login_form_col', 'div', '{\"className\" : \"col-10 col-sm-8 col-lg-4 row\"}', 0, 0, (SELECT id FROM forms WHERE name=\"login_form\"))",
      message: "INSERTing login form container"
    },
    username: {
      name: "INSERT_login_username_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('login_username_email', 'input', '{ \"className\" : \"form-control form-input-text validate_username_email\", \"key\" : \"username_email\", \"id\" : \"username_email\", \"name\" : \"username_email\", \"type\" : \"text\", \"placeholder\": \"Username or email\", \"groupClassName\" : \"col-12\" }', 0, 0, (SELECT id FROM forms WHERE name=\"login_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='login_form_col'))",
      message: "INSERTing username input in login form"
    },
    password: {
      name: "INSERT_login_password_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('login_password', 'input', '{ \"className\" : \"form-control form-input-text validate_password\", \"key\" : \"password\", \"id\" : \"password\", \"name\" : \"password\", \"type\" : \"password\", \"placeholder\" : \"Password\", \"append\" : { \"element\" : \"button\", \"subelement\" : \"icon\", \"icon\" : \"fa-regular fa-eye\", \"buttonClassName\" : \"action toggle-visibility\"}, \"groupClassName\" : \"col-12\" }', 0, 1, (SELECT id FROM forms WHERE name=\"login_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='login_form_col'))",
      message: "INSERTing password input in login form"
    },
    submit: {
      name: "INSERT_login_submit_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('login_submit', 'input', '{ \"id\" : \"submit\", \"name\" : \"submit\", \"className\" : \"submit form-input-submit next btn btn-primary\", \"key\" : \"submit\", \"type\" : \"submit\", \"value\": \"Sign in\", \"groupClassName\" : \"col-12\" }', 0, 2, (SELECT id FROM forms WHERE name=\"login_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='login_form_col'))",
      message: "INSERTing submit input in login form"
    }
  },
  register: {
    form: {
      name: "INSERT_register_form",
      query: "INSERT into forms (name, element, uri_id, number) VALUES ('register_form', '".concat(register_form, "', (SELECT id FROM uri WHERE root_id='register'), 2)"),
      message: "INSERTing register form"
    },
    basic_info_container: {
      name: "INSERT_register_form_basic_info_container",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('register_basic_info_container', 'div', '{\"className\" : \"col-10 col-sm-8 col-lg-4 row\"}', 0, 0, (SELECT id FROM forms WHERE name=\"register_form\"))",
      message: "INSERTing register form basic info container"
    },
    username: {
      name: "INSERT_register_username_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_username', 'input', '{ \"className\" : \"form-control form-input-text validate_username\", \"key\" : \"username\", \"id\" : \"username\", \"name\" : \"username\", \"type\" : \"text\", \"placeholder\" : \"Username\", \"append\" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-regular fa-user\"}, \"groupClassName\" : \"col-12 col-sm-6\" }', 0, 1, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_basic_info_container'))",
      message: "INSERTing username input in register form"
    },
    password: {
      name: "INSERT_register_password_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_password', 'input', '{ \"className\" : \"form-control form-input-text validate_password_signup\", \"key\" : \"password_signup\", \"id\" : \"password_signup\", \"name\" : \"password_signup\", \"type\" : \"password\", \"placeholder\" : \"Password\", \"append\" : { \"element\" : \"button\", \"subelement\" : \"icon\", \"icon\" : \"fa-regular fa-eye\", \"buttonClassName\" : \"action toggle-visibility\"}, \"groupClassName\" : \"col-12 col-sm-6\" }', 0, 2, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_basic_info_container'))",
      message: "INSERTing password input in register form"
    },
    email: {
      name: "INSERT_register_email_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_email', 'input', '{ \"className\" : \"form-control form-input-text validate_email\", \"key\" : \"email\", \"id\" : \"email\", \"name\" : \"email\", \"type\" : \"email\", \"placeholder\" : \"Email\", \"append\" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-regular fa-envelope\"}, \"groupClassName\" : \"col-12\" }', 0, 3, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_basic_info_container'))",
      message: "INSERTing email input in register form"
    },
    basic_info_next: {
      name: "INSERT_register_basic_info_next_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_basic_info_next', 'input', '{ \"key\" : \"basic_info_next\", \"id\" : \"basic_info_next\", \"name\" : \"next\", \"type\" : \"hidden\", \"value\" : \".register-form.step-2\" }', 0, 4, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_basic_info_container'))",
      message: "INSERTing next input in register form (basic info part)"
    },
    basic_info_submit: {
      name: "INSERT_register_basic_info_submit_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_basic_info_submit', 'input', '{ \"id\" : \"basic_info_submit\", \"name\" : \"submit\", \"className\" : \"submit form-input-submit next btn btn-primary\", \"key\" : \"basic_info_submit\", \"type\" : \"submit\", \"value\": \"Next\", \"groupClassName\" : \"col-12\" }', 0, 5, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_basic_info_container'))",
      message: "INSERTing submit input in register form (basic info part)"
    },
    personal_data_container: {
      name: "INSERT_register_form_basic_info_container",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('register_personal_data_container', 'div', '{\"className\" : \"col-10 col-sm-8 col-lg-4 row\"}', 1, 0, (SELECT id FROM forms WHERE name=\"register_form\"))",
      message: "INSERTing register form basic info container"
    },
    personal_data_progress: {
      name: "INSERT_register_personal_data_progress",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_personal_data_progress_bar', 'input', '{ \"className\" : \"progress-bar isProgressBar progress-bar-striped progress-bar-animated\", \"key\" : \"basic_info_progress\", \"id\" : \"basic_info_progress\", \"name\" : \"back\", \"type\" : \"hidden\", \"groupClassName\" : \"col-12\", \"value\" : 50 }', 1, 0, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_personal_data_container'))",
      message: "INSERTing personal data progress in register form"
    },
    personal_data_civility: {
      name: "INSERT_register_personal_data_civility",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_personal_data_civility', 'select', '{ \"className\" : \"form-control col-12 col-sm-3\", \"key\" : \"civility\", \"id\" : \"civility\", \"name\" : \"civility\", \"groupClassName\" : \"form-group col-12\", \"options\" : { \"values\" : [\"Mrs|Mrs\", \"Mr|Mr\"], \"translate\" : true } }', 1, 1, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_personal_data_container'))",
      message: "Inserting personal data civility in register form"
    },
    lastname: {
      name: "INSERT_register_lastname_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_lastname', 'input', '{ \"className\" : \"form-control form-input-text validate_name\", \"key\" : \"lastname\", \"id\" : \"lastname\", \"name\" : \"lastname\", \"type\" : \"text\", \"placeholder\" : \"Last Name\", \"groupClassName\" : \"col-12 col-sm-6\" }', 1, 2, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_personal_data_container'))",
      message: "INSERTing lastname input in register form"
    },
    firstname: {
      name: "INSERT_register_firstname_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_firstname', 'input', '{ \"className\" : \"form-control form-input-text validate_name\", \"key\" : \"firstname\", \"id\" : \"firstname\", \"name\" : \"firstname\", \"type\" : \"text\", \"placeholder\" : \"First Name\", \"groupClassName\" : \"col-12 col-sm-6\" }', 1, 3, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_personal_data_container'))",
      message: "INSERTing firstname input in register form"
    },
    phonenumber: {
      name: "INSERT_register_phonenumber_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_phonenumber', 'input', '{ \"className\" : \"form-control form-input-text phonenumber\", \"key\" : \"phonenumber\", \"id\" : \"phonenumber\", \"name\" : \"phonenumber\", \"type\" : \"text\", \"placeholder\" : \"Phone Number\", \"append\" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-solid fa-phone\"}, \"groupClassName\" : \"col-12\" }', 1, 4, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_personal_data_container'))",
      message: "INSERTing phonenumber input in register form"
    },
    personal_data_next: {
      name: "INSERT_register_personal_data_next_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_personal_data_next', 'input', '{ \"key\" : \"personal_data_next\", \"id\" : \"personal_data_next\", \"name\" : \"next\", \"type\" : \"hidden\", \"value\" : \".register-form.step-3\" }', 1, 5, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_personal_data_container'))",
      message: "INSERTing next input in register form (personal data part)"
    },
    personal_data_submit: {
      name: "INSERT_register_personal_data_submit_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_personal_data_submit', 'input', '{ \"id\" : \"personal_data_submit\", \"name\" : \"submit\", \"className\" : \"submit form-input-submit next btn btn-primary\", \"key\" : \"personal_data_submit\", \"type\" : \"submit\", \"value\": \"Next\", \"groupClassName\" : \"col-12\" }', 1, 6, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_personal_data_container'))",
      message: "INSERTing submit input in register form (personal data part)"
    },
    location_container: {
      name: "INSERT_register_form_basic_info_container",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('register_location_container', 'div', '{\"className\" : \"col-10 col-sm-8 col-lg-4 row\"}', 2, 0, (SELECT id FROM forms WHERE name=\"register_form\"))",
      message: "INSERTing register form basic info container"
    },
    location_progress: {
      name: "INSERT_register_personal_data_progress",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_location_progress_bar', 'input', '{ \"className\" : \"progress-bar isProgressBar progress-bar-striped progress-bar-animated\", \"key\" : \"location_progress\", \"id\" : \"location_progress\", \"name\" : \"back\", \"type\" : \"hidden\", \"groupClassName\" : \"col-12\", \"value\" : 100 }', 2, 0, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_location_container'))",
      message: "INSERTing personal data progress in register form"
    },
    location_country: {
      name: "INSERT_register_location_country",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_location_country', 'select', '{ \"className\" : \"form-control col-12 countrycode\", \"key\" : \"country\", \"id\" : \"country\", \"name\" : \"code\", \"groupClassName\" : \"form-group col-12 col-sm-6\", \"options\" : { \"path\" : \"JSON_DATA_STORAGE\", \"file\" : \"/location/countries.json\", \"translate\" : false } }', 2, 1, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_location_container'))",
      message: "Inserting location country in register form"
    },
    location_postalcode: {
      name: "INSERT_register_postalcode_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_location_postalcode', 'input', '{ \"className\" : \"form-control form-input-text postalcode\", \"key\" : \"postalcode\", \"id\" : \"postalcode\", \"name\" : \"postalcode\", \"type\" : \"text\", \"placeholder\" : \"Postal Code\", \"append\" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-solid fa-map-pin\"}, \"groupClassName\" : \"col-12 col-sm-6\" }', 2, 2, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_location_container'))",
      message: "INSERTing postalcode input in register form"
    },
    location_city: {
      name: "INSERT_register_city_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_location_city', 'input', '{ \"className\" : \"form-control form-input-text city\", \"key\" : \"city\", \"id\" : \"city\", \"name\" : \"city\", \"type\" : \"text\", \"placeholder\" : \"City\", \"append\" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-solid fa-building\"}, \"groupClassName\" : \"col-12 offset-sm-6 col-sm-6\" }', 2, 3, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_location_container'))",
      message: "INSERTing city input in register form"
    },
    location_address: {
      name: "INSERT_register_city_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_location_address', 'input', '{ \"className\" : \"form-control form-input-text address\", \"key\" : \"address\", \"id\" : \"address\", \"name\" : \"address\", \"type\" : \"text\", \"placeholder\" : \"Address\", \"append\" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-solid fa-address-card\"}, \"groupClassName\" : \"col-12\" }', 2, 4, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_location_container'))",
      message: "INSERTing address input in register form"
    },
    location_submit: {
      name: "INSERT_register_location_submit_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_location_submit', 'input', '{ \"id\" : \"location_submit\", \"name\" : \"submit\", \"className\" : \"submit form-input-submit next btn btn-primary\", \"key\" : \"location_submit\", \"type\" : \"submit\", \"value\": \"Submit\", \"groupClassName\" : \"col-12\" }', 2, 5, (SELECT id FROM forms WHERE name=\"register_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_location_container'))",
      message: "INSERTing location submit input in register form (location part)"
    }
  },
  create_content: {
    form: {
      name: "INSERT_create_content_form",
      query: "INSERT into forms (name, element, uri_id, number) VALUES ('create_content_form', '".concat(create_content_form, "', (SELECT id FROM uri WHERE root_id='create-content'), 1)"),
      message: "INSERTing create_content form"
    },
    uri_container: {
      name: "INSERT_create_content_form_uri_container",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('create_content_form_uri_container', 'div', '{\"className\" : \"col-10 col-sm-11 row\"}', 0, 0, (SELECT id FROM forms WHERE name=\"create_content_form\"))",
      message: "INSERTing create_content form uri container"
    },
    uri_container_ms: {
      name: "INSERT_register_content_form_uri_container_ms",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_content_ms', 'input', '{ \"className\" : \"form-control\", \"key\" : \"ms\", \"id\" : \"ms\", \"name\" : \"ms\", \"type\": \"hidden\", \"value\": \"content_service/create_content::uri\", \"groupClassName\" : \"form-group ms\" }', 0, 0, (SELECT id FROM forms WHERE name=\"create_content_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_content_form_uri_container'))",
      message: "Inserting create_content uri_container_ms input in create content form"
    },
    rootId: {
      name: "INSERT_create_content_rootid_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_content_rootid', 'input', '{ \"className\" : \"form-control form-input-text validate_name length-3\", \"key\" : \"name\", \"id\" : \"name\", \"name\" : \"name_length-3\", \"type\" : \"text\", \"placeholder\": \"Name\", \"groupClassName\" : \"col-12 col-lg-6\" }', 0, 1, (SELECT id FROM forms WHERE name=\"create_content_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_content_form_uri_container'))",
      message: "INSERTing create_content rootid input in create content form"
    },
    feature: {
      name: "INSERT_create_content_feature_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_content_feature', 'input', '{ \"className\" : \"form-control form-input-text validate_name length-3\", \"key\" : \"feature\", \"id\" : \"feature\", \"name\" : \"feature_length-3\", \"type\" : \"text\", \"placeholder\": \"Feature\", \"groupClassName\" : \"col-12 col-lg-6\" }', 0, 2, (SELECT id FROM forms WHERE name=\"create_content_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_content_form_uri_container'))",
      message: "INSERTing create_content feature input in create content form"
    },
    external: {
      name: "INSERT_create_content_external_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_content_external', 'input', '{ \"className\" : \"form-check-input checkbox default_unchecked is-mutator-checkbox check_validate_uri uri_external\", \"key\" : \"is-external-uri-check\", \"id\" : \"is-external-uri-check\", \"name\" : \"is_external_uri_check\", \"type\" : \"checkbox\", \"groupClassName\" : \"form-check col-6\", \"aplabel\" : \"External Link ?\" }', 0, 3, (SELECT id FROM forms WHERE name=\"create_content_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_content_form_uri_container'))",
      message: "INSERTing create_content external input in create content form"
    },
    uri: {
      name: "INSERT_create_content_uri_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_content_uri', 'input', '{ \"className\" : \"form-control form-input-text validate_uri uri_internal\", \"key\" : \"uri\", \"id\" : \"uri\", \"name\" : \"uri\", \"type\" : \"text\", \"placeholder\": \"Link\", \"append\" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-solid fa-link\"}, \"groupClassName\" : \"col-12\" }', 0, 4, (SELECT id FROM forms WHERE name=\"create_content_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_content_form_uri_container'))",
      message: "INSERTing create_content uri input in create content form"
    },
    submit: {
      name: "INSERT_create_content_submit_input",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('login_submit', 'input', '{ \"id\" : \"submit\", \"name\" : \"submit\", \"className\" : \"submit form-input-submit next btn btn-primary\", \"key\" : \"submit\", \"type\" : \"submit\", \"value\": \"Submit\", \"groupClassName\" : \"col-12\" }', 0, 5, (SELECT id FROM forms WHERE name=\"create_content_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_content_form_uri_container'))",
      message: "INSERTing submit input in create_content form"
    },
    content_container: {
      name: "INSERT_create_content_form_content_container",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('create_content_form_content_container', 'div', '{\"className\" : \"col-10 col-sm-11 row\"}', 1, 0, (SELECT id FROM forms WHERE name=\"create_content_form\"))",
      message: "INSERTing create_content form content container"
    },
    content_container_ms: {
      name: "INSERT_register_content_form_content_container_ms",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_content_ms', 'input', '{ \"className\" : \"form-control\", \"key\" : \"ms\", \"id\" : \"ms\", \"name\" : \"ms\", \"type\": \"hidden\", \"value\": \"content_service/create_content::content\", \"groupClassName\" : \"form-group ms\" }', 1, 0, (SELECT id FROM forms WHERE name=\"create_content_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_content_form_uri_container'))",
      message: "Inserting create_content content_container_ms input in create content form"
    },
    method: {
      name: "INSERT_register_content_form_content_container_method",
      query: "INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_content_method', 'select', '{ \"className\" : \"form-control col-12 col-sm-6\", \"key\" : \"method\", \"id\" : \"method\", \"name\" : \"method\", \"groupClassName\" : \"form-group col-12\", \"options\" : { \"values\" : [\"get|Page\", \"get&post|Form\"], \"translate\" : false } }', 1, 1, (SELECT id FROM forms WHERE name=\"create_content_form\"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_content_form_content_container'))",
      message: "Inserting create_content method input in create content form"
    }
  }
};