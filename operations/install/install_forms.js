//Install - Forms
//Author - Eric Salle

const global_transaction = require('../global_transactions')();

//User
const login_form = JSON.stringify({ method : "post", async : true, className : "login-form has-popin row justify-content-center shadow-panel", enctype : "multipart/form-data", els : [] });
const register_form = JSON.stringify({ id: "register-form", key: "register-form", method: "post", async: true, className: "register-form has-popin row justify-content-center shadow-panel", enctype: "multipart/form-data", els: [] } )

//Routes
const create_route_form = JSON.stringify({ method : "post", async : true, id: "create-route-form", key: "create-route-form", className : "create-route-form has-popin col-12 row justify-content-center backoffice-panel", enctype : "multipart/form-data", els : [] });
const remove_route_form = JSON.stringify({ method : "post", async : true, id: "remove-route-form", key: "remove-route-form", className : "remove-route-form has-popin col-12 row justify-content-center backoffice-panel", enctype : "multipart/form-data", els : [] });
const edit_route_form = JSON.stringify({ method : "post", async : true, id: "edit-route-form", key: "edit-route-form", className : "edit-route-form has-popin col-12 row justify-content-center backoffice-panel", enctype : "multipart/form-data", els : [] });
const edit_route_form_form = JSON.stringify({ method : "post", async : true, id: "edit-route-form-form", key: "edit-route-form-form", className : "edit-route-form has-popin col-12 row justify-content-center", enctype : "multipart/form-data", els : [] });

//Uploader
const add_file_form = JSON.stringify({ method : "post", async : true, id: "add-file-form", key: "add-file-form", className : "add-file-form has-popin col-12 row justify-content-center", enctype : "multipart/form-data", els : [] });
const add_folder_form = JSON.stringify({ method : "post", async : true, id: "add-folder-form", key: "add-folder-form", className : "add-folder-form has-popin col-12 row justify-content-center", enctype : "multipart/form-data", els : [] });

//Header
const manage_header_form = JSON.stringify({ method : "post", async : true, id: "manage-header-form", key: "manage-header-form", className : "manage-header-form backoffice-panel has-popin col-12 row justify-content-center", enctype : "multipart/form-data", els : [] });
const manage_header_form_form = JSON.stringify({ method : "post", async : true, id: "manage-header-form-form", key: "manage-header-form-form", className : "manage-header-form-form has-popin col-12 row justify-content-center", enctype : "multipart/form-data", els : [] });

//Content
//Content types
const create_content_types_form = JSON.stringify({ method : "post", async : true, id: "create-content-types-form", key: "create-content-types-form", className : "create-content-types-form backoffice-panel has-popin col-12 row justify-content-center", enctype : "multipart/form-data", els : [] });

module.exports = {

    login : {
        form : {
            name : "INSERT_login_form",
            query : `INSERT into forms (name, element, uri_id, number, isSystem) VALUES ('login_form', '${login_form}', (SELECT id FROM uri WHERE root_id='login'), 0, true)`,
            message: "INSERTing login form"
        },
        container : {
            name : "INSERT_login_form_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('login_form_col', 'div', '{"className" : "col-10 col-sm-8 col-lg-4 row"}', 0, 0, (SELECT id FROM forms WHERE name="login_form"))`,
            message : "INSERTing login form container"
        },
        username : {
            name : "INSERT_login_username_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('login_username_email', 'input', '{ "className" : "form-control form-input-text validate_username_email", "key" : "username_email", "id" : "username_email", "name" : "username_email", "type" : "text", "prelabel" : "Username or email", "placeholder": "Username or email", "groupClassName" : "form-group col-12" }', 0, 0, (SELECT id FROM forms WHERE name="login_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='login_form_col'))`,
            message : "INSERTing username input in login form"
        },
        password : {
            name : "INSERT_login_password_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('login_password', 'input', '{ "className" : "form-control form-input-text validate_password", "key" : "password", "id" : "password", "name" : "password", "prelabel" : "Password", "type" : "password", "placeholder" : "Password", "append" : { \"element\" : \"button\", \"subelement\" : \"icon\", \"icon\" : \"fa-regular fa-eye\", \"buttonClassName\" : \"action toggle-visibility\"}, "groupClassName" : "form-group col-12" }', 0, 1, (SELECT id FROM forms WHERE name="login_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='login_form_col'))`,
            message : "INSERTing password input in login form"
        },
        submit : {
            name : "INSERT_login_submit_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('login_submit', 'input', '{ "id" : "submit", "name" : "submit", "className" : "submit form-input-submit next btn btn-primary", "key" : "submit", "type" : "submit", "value": "Sign in", "groupClassName" : "form-group col-12" }', 0, 2, (SELECT id FROM forms WHERE name="login_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='login_form_col'))`,
            message : "INSERTing submit input in login form"
        },

    },
    register : {
        form : {
            name : "INSERT_register_form",
            query : `INSERT into forms (name, element, uri_id, number, isSystem) VALUES ('register_form', '${register_form}', (SELECT id FROM uri WHERE root_id='register'), 2, true)`,
            message: "INSERTing register form"
        },
        basic_info_container : {
            name : "INSERT_register_form_basic_info_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('register_basic_info_container', 'div', '{"className" : "col-10 col-sm-8 col-lg-4 row"}', 0, 0, (SELECT id FROM forms WHERE name="register_form"))`,
            message : "INSERTing register form basic info container"
        },
        username : {
            name : "INSERT_register_username_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_username', 'input', '{ "className" : "form-control form-input-text validate_username", "key" : "username", "id" : "username", "name" : "username", "prelabel" : "Username","type" : "text", "placeholder" : "Username", "append" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-regular fa-user\"}, "groupClassName" : "form-group col-12 col-sm-6" }', 0, 1, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_basic_info_container'))`,
            message : "INSERTing username input in register form"
        },
        password : {
            name : "INSERT_register_password_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_password', 'input', '{ "className" : "form-control form-input-text validate_password_signup", "key" : "password_signup", "id" : "password_signup", "name" : "password_signup", "type" : "password", "prelabel": "Password", "placeholder" : "Password", "append" : { \"element\" : \"button\", \"subelement\" : \"icon\", \"icon\" : \"fa-regular fa-eye\", \"buttonClassName\" : \"action toggle-visibility\"}, "groupClassName" : "form-group col-12 col-sm-6" }', 0, 2, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_basic_info_container'))`,
            message : "INSERTing password input in register form"
        },
        email : {
            name : "INSERT_register_email_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_email', 'input', '{ "className" : "form-control form-input-text validate_email", "key" : "email", "id" : "email", "name" : "email", "type" : "email", "prelabel" : "Email", "placeholder" : "Email", "append" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-regular fa-envelope\"}, "groupClassName" : "form-group col-12" }', 0, 3, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_basic_info_container'))`,
            message : "INSERTing email input in register form"
        },
        basic_info_next : {
            name : "INSERT_register_basic_info_next_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_basic_info_next', 'input', '{ "key" : "basic_info_next", "id" : "basic_info_next", "name" : "next", "type" : "hidden", "value" : ".register-form.step-2" }', 0, 4, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_basic_info_container'))`,
            message : "INSERTing next input in register form (basic info part)"
        },
        basic_info_submit : {
            name : "INSERT_register_basic_info_submit_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_basic_info_submit', 'input', '{ "id" : "basic_info_submit", "name" : "submit", "className" : "submit form-input-submit next btn btn-primary", "key" : "basic_info_submit", "type" : "submit", "value": "Next", "groupClassName" : "form-group col-12" }', 0, 5, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_basic_info_container'))`,
            message : "INSERTing submit input in register form (basic info part)"
        },
        personal_data_container : {
            name : "INSERT_register_form_basic_info_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('register_personal_data_container', 'div', '{"className" : "col-10 col-sm-8 col-lg-4 row"}', 1, 0, (SELECT id FROM forms WHERE name="register_form"))`,
            message : "INSERTing register form basic info container"
        },
        personal_data_progress : {
            name : "INSERT_register_personal_data_progress",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_personal_data_progress_bar', 'input', '{ "className" : "progress-bar isProgressBar progress-bar-striped progress-bar-animated", "key" : "basic_info_progress", "id" : "basic_info_progress", "name" : "back", "type" : "hidden", "groupClassName" : "form-group col-12", "value" : 50 }', 1, 0, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_personal_data_container'))`,
            message : "INSERTing personal data progress in register form"
        },
        personal_data_civility : {
            name : "INSERT_register_personal_data_civility",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_personal_data_civility', 'select', '{ "className" : "form-control col-12 col-sm-3", "key" : "civility", "id" : "civility", "name" : "civility", "prelabel" : "Civility", "groupClassName" : "form-group col-12", "options" : { "values" : ["Mrs|Mrs", "Mr|Mr"], "translate" : true } }', 1, 1, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_personal_data_container'))`,
            message : "Inserting personal data civility in register form"
        },
        lastname : {
            name : "INSERT_register_lastname_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_lastname', 'input', '{ "className" : "form-control form-input-text validate_name", "key" : "lastname", "id" : "lastname", "name" : "lastname", "type" : "text", "prelabel" : "Last Name", "placeholder" : "Last Name", "groupClassName" : "form-group col-12 col-sm-6" }', 1, 2, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_personal_data_container'))`,
            message : "INSERTing lastname input in register form"
        },
        firstname : {
            name : "INSERT_register_firstname_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_firstname', 'input', '{ "className" : "form-control form-input-text validate_name", "key" : "firstname", "id" : "firstname", "name" : "firstname", "type" : "text", "prelabel" : "First Name", "placeholder" : "First Name", "groupClassName" : "form-group col-12 col-sm-6" }', 1, 3, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_personal_data_container'))`,
            message : "INSERTing firstname input in register form"
        },
        phonenumber : {
            name : "INSERT_register_phonenumber_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_phonenumber', 'input', '{ "className" : "form-control form-input-text phonenumber", "key" : "phonenumber", "id" : "phonenumber", "name" : "phonenumber", "type" : "text", "prelabel" : "Phone Number", "placeholder" : "Phone Number", "append" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-solid fa-phone\"}, "groupClassName" : "form-group col-12" }', 1, 4, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_personal_data_container'))`,
            message : "INSERTing phonenumber input in register form"
        },
        personal_data_next : {
            name : "INSERT_register_personal_data_next_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_personal_data_next', 'input', '{ "key" : "personal_data_next", "id" : "personal_data_next", "name" : "next", "type" : "hidden", "value" : ".register-form.step-3" }', 1, 5, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_personal_data_container'))`,
            message : "INSERTing next input in register form (personal data part)"
        },
        personal_data_submit : {
            name : "INSERT_register_personal_data_submit_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_personal_data_submit', 'input', '{ "id" : "personal_data_submit", "name" : "submit", "className" : "submit form-input-submit next btn btn-primary", "key" : "personal_data_submit", "type" : "submit", "value": "Next", "groupClassName" : "form-group col-12" }', 1, 6, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_personal_data_container'))`,
            message : "INSERTing submit input in register form (personal data part)"
        },
        location_container : {
            name : "INSERT_register_form_basic_info_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('register_location_container', 'div', '{"className" : "col-10 col-sm-8 col-lg-4 row"}', 2, 0, (SELECT id FROM forms WHERE name="register_form"))`,
            message : "INSERTing register form basic info container"
        },
        location_progress : {
            name : "INSERT_register_personal_data_progress",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_location_progress_bar', 'input', '{ "className" : "progress-bar isProgressBar progress-bar-striped progress-bar-animated", "key" : "location_progress", "id" : "location_progress", "name" : "back", "type" : "hidden", "groupClassName" : "form-group col-12", "value" : 100 }', 2, 0, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_location_container'))`,
            message : "INSERTing personal data progress in register form"
        },
        location_country : {
            name : "INSERT_register_location_country",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_location_country', 'select', '{ "className" : "form-control col-12 countrycode", "key" : "country", "prelabel" : "Country", "id" : "country", "name" : "code", "groupClassName" : "form-group col-12 col-sm-6", "options" : { "path" : "JSON_DATA_STORAGE", "file" : "/location/countries.json", "translate" : false } }', 2, 1, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_location_container'))`,
            message : "Inserting location country in register form"
        },
        location_postalcode : {
            name : "INSERT_register_postalcode_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_location_postalcode', 'input', '{ "className" : "form-control form-input-text postalcode", "key" : "postalcode", "id" : "postalcode", "name" : "postalcode", "type" : "text", "prelabel" : "Postal Code", "placeholder" : "Postal Code", "append" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-solid fa-map-pin\"}, "groupClassName" : "form-group col-12 col-sm-6" }', 2, 2, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_location_container'))`,
            message : "INSERTing postalcode input in register form"
        },
        location_city : {
            name : "INSERT_register_city_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_location_city', 'input', '{ "className" : "form-control form-input-text city", "key" : "city", "id" : "city", "name" : "city", "type" : "text", "prelabel" : "City", "placeholder" : "City", "append" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-solid fa-building\"}, "groupClassName" : "form-group col-12 offset-sm-6 col-sm-6" }', 2, 3, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_location_container'))`,
            message : "INSERTing city input in register form"
        },
        location_address : {
            name : "INSERT_register_city_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_location_address', 'input', '{ "className" : "form-control form-input-text address", "key" : "address", "id" : "address", "name" : "address", "type" : "text", "prelabel" : "Address", "placeholder" : "Address", "append" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-solid fa-address-card\"}, "groupClassName" : "form-group col-12" }', 2, 4, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_location_container'))`,
            message : "INSERTing address input in register form"
        },
        location_submit : {
            name : "INSERT_register_location_submit_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('register_location_submit', 'input', '{ "id" : "location_submit", "name" : "submit", "className" : "submit form-input-submit next btn btn-primary", "key" : "location_submit", "type" : "submit", "value": "Submit", "groupClassName" : "form-group col-12" }', 2, 5, (SELECT id FROM forms WHERE name="register_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='register_location_container'))`,
            message : "INSERTing location submit input in register form (location part)"
        },
    },
    create_route : {
        form : {
            name : "INSERT_create_route_form",
            query : `INSERT into forms (name, element, uri_id, number, isSystem) VALUES ('create_route_form', '${create_route_form}', (SELECT id FROM uri WHERE root_id='create-route'), 3, true)`,
            message: "INSERTing create_route form"
        },
        uri_container : {
            name : "INSERT_create_route_form_uri_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('create_route_form_uri_container', 'div', '{"className" : "col-10 row"}', 0, 0, (SELECT id FROM forms WHERE name="create_route_form"))`,
            message : "INSERTing create_route form uri container"
        },
        uri_container_ms : {
            name : "INSERT_register_route_form_uri_container_ms",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_ms', 'input', '{ "className" : "form-control", "key" : "ms", "id" : "ms", "name" : "ms", "type": "hidden", "value": "route_service/create_route::uri::.create-route-form.step-2", "groupClassName" : "ms" }', 0, 0, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_uri_container'))`,
            message : "Inserting create_route uri_container_ms input in create route form"
        },
        route_infos_h3 : {
            name : "INSERT_create_route_form_route_infos_h3",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_form_infos_h3', 'h3',  '{"key" : "route-infos-h3", "className" : "title fill b-border", "els" : "Route Informations"}', 0, 1, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_uri_container'))`,
            message : "INSERTing create_route form route infos h3"
        },
        rootId : {
            name : "INSERT_create_route_rootid_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_rootid', 'input', '{ "className" : "form-control form-input-text machine-name::- validate_name length-3", "prelabel" : "Name", "key" : "root_id", "id" : "root_id", "name" : "root_id_length-3", "type" : "text", "placeholder": "Name", "groupClassName" : "form-group col-12 col-lg-6" }', 0, 2, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_uri_container'))`,
            message : "INSERTing create_route rootid input in create route form"
        },
        feature : {
            name : "INSERT_create_route_feature_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_feature', 'input', '{ "className" : "form-control form-input-text machine-name::_ validate_name length-3", "prelabel" : "Feature", "key" : "feature", "id" : "feature", "name" : "feature_length-3", "type" : "text", "placeholder": "Feature", "groupClassName" : "form-group col-12 col-lg-6" }', 0, 3, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_uri_container'))`,
            message : "INSERTing create_route feature input in create route form"
        },
        external : {
            name : "INSERT_create_route_external_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_external', 'input', '{ "className" : "form-check-input checkbox default_unchecked is-mutator-checkbox check_validate_uri uri_external", "key" : "is-external-uri-check", "id" : "is-external-uri-check", "name" : "isExternal", "type" : "checkbox", "groupClassName" : "form-group form-check col-6 checkbox-container", "aplabel" : "External Link ?" }', 0, 4, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_uri_container'))`,
            message : "INSERTing create_route external input in create route form"
        },
        uri : {
            name : "INSERT_create_route_uri_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_uri', 'input', '{ "className" : "form-control form-input-text validate_uri uri_internal", "prelabel" : "Link", "key" : "uri", "id" : "uri", "name" : "uri", "type" : "text", "placeholder": "Link", "append" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-solid fa-link\"}, "groupClassName" : "form-group col-12" }', 0, 5, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_uri_container'))`,
            message : "INSERTing create_route uri input in create route form"
        },
        uri_submit : {
            name : "INSERT_create_route_uri_submit_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_uri_submit', 'input', '{ "id" : "submit", "name" : "submit", "className" : "submit form-input-submit next btn btn-primary", "key" : "submit", "type" : "submit", "value": "Next", "groupClassName" : "form-group col-12" }', 0, 6, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_uri_container'))`,
            message : "INSERTing submit input in create_route form"
        },
        route_container : {
            name : "INSERT_create_route_form_route_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('create_route_form_route_container', 'div', '{"className" : "col-10 row"}', 1, 0, (SELECT id FROM forms WHERE name="create_route_form"))`,
            message : "INSERTing create_route form route container"
        },
        route_container_ms : {
            name : "INSERT_register_route_form_route_container_ms",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_ms', 'input', '{ "className" : "form-control", "key" : "ms", "id" : "ms", "name" : "ms", "type": "hidden", "value": "route_service/create_route::content::.create-route-form.step-3", "groupClassName" : "ms" }', 1, 0, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_route_container'))`,
            message : "Inserting create_route route_container_ms input in create route form"
        },
        route_content_h3 : {
            name : "INSERT_create_route_form_route_h3",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_form_content_h3', 'h3',  '{"key" : "route-content-h3", "className" : "title fill b-border", "els" : "Content"}', 1, 0, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_route_container'))`,
            message : "INSERTing create_route form route h3"
        },
        route_container_route_progress : {
            name : "INSERT_route_container_route_progress",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_route_progress_bar', 'input', '{ "className" : "progress-bar isProgressBar progress-bar-striped progress-bar-animated", "key" : "route_container_progress", "id" : "route_container_progress", "name" : "progress", "type" : "hidden", "groupClassName" : "form-group col-12", "value" : 50 }', 1, 1, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_route_container'))`,
            message : "INSERTing route container route progress in register form"
        },
        title : {
            name : "INSERT_create_route_form_title_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_title', 'input', '{ "className" : "form-control form-input-text validate_name length-3", "prelabel" : "Title", "key" : "title", "id" : "title", "name" : "title_length-3", "type" : "text", "placeholder": "Title", "groupClassName" : "form-group col-12" }', 1, 2, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_route_container'))`,
            message : "INSERTing create_route title input in create route form"
        },
        invoke_theme : {
            name : "INSERT_create_route_form_invoke_theme",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_form_invoke_theme', 'div',  '{"className" : "form-group col-12 col-sm-6", "id" : "invoke-theme", "prelabel" : "Theme", "key" : "route_container_invoke_theme"}', 1, 3, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_route_container'))`,
            message : "INSERTing create_route form route invoke_theme"
        },
        method : {
            name : "INSERT_register_route_form_route_container_method",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_method', 'select', '{ "className" : "form-control col-12", "key" : "method", "id" : "method", "prelabel" : "Content type", "name" : "method", "groupClassName" : "form-group col-12 col-sm-6", "options" : { "values" : [ "|Content type", "get-page|Page", "get-form|Form", "get-file|File", "post-callback|Callback"], "dataSet" : { "input-creator" : { "on-values" : "file", "mode": "ap", "groupClassName" : "form-group input-created col-12", "className" : "form-control form-input-text validate_uri uri_internal", "placeholder" : "Path to file and filename", "name" : "path-to-file-and-filename", "key" : "path-to-file-and-filename" }, "checkbox-creator" : {"name" : "is-existing-data", "on-values" : "page|form|callback", "groupClassName" : "form-group form-check col-6 checkbox-created checkbox-container", "className": "has-dataset input-creator mode::ap name::contentid groupClassName::form-group|input-created|col-6 className::form-control|form-input-text|validate_name|length-1 placeholder::Content-id-or-form-name","aplabel" : "Link to existing content ?", "key" : "is-existing-data", "id" : "is-existing-data" } }, "translate" : true, "default" : "Content type"} }', 1, 4, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_route_container'))`,
            message : "Inserting create_route method input in create route form"
        },
        route_container_back_next : {
            name : "INSERT_create_route_form_route_container_back_next",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_form_route_container_back_next', 'div',  '{"className" : "col-12 row", "id" : "route-container-back-next", "key" : "route_container_back_next"}', 1, 5, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_route_container'))`,
            message : "INSERTing create_route form route container_back_next"
        },
        route_back : {
            name : "INSERT_create_route_route_back_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_route_back', 'input', '{ "className" : "form-input-submit form-back btn btn-secondary", "name":"back", "key" : "back", "type" : "button", "value": "Back", "groupClassName" : "container-back col-6" }', 1, 0, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_route_container_back_next'))`,
            message : "INSERTing back input in create_route form"
        },
        route_submit : {
            name : "INSERT_create_route_route_submit_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_route_submit', 'input', '{ "id" : "submit", "name" : "submit", "className" : "submit form-input-submit next btn btn-primary", "key" : "submit", "type" : "submit", "value": "Next", "groupClassName" : "container-next col-6" }', 1, 1, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_route_container_back_next'))`,
            message : "INSERTing submit input in create_route form"
        },
        permissions_container : {
            name : "INSERT_create_route_form_permissions_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('create_route_form_permissions_container', 'div', '{"className" : "col-10 row"}', 2, 0, (SELECT id FROM forms WHERE name="create_route_form"))`,
            message : "INSERTing create_route form permissions container"
        },
        permissions_h3 : {
            name : "INSERT_create_route_form_permissions_h3",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_form_permissions_h3', 'h3',  '{"key" : "route-permissions-h3", "className" : "title fill b-border", "els" : "Permissions"}', 2, 0, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_permissions_container'))`,
            message : "INSERTing create_route form permissions h3"
        },
        permissions_container_progress : {
            name : "INSERT_route_container_permissions_progress",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_permissions_progress_bar', 'input', '{ "className" : "progress-bar isProgressBar progress-bar-striped progress-bar-animated", "key" : "route_container_progress", "id" : "route_container_progress", "name" : "progress", "type" : "hidden", "groupClassName" : "form-group col-12", "value" : 100 }', 2, 1, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_permissions_container'))`,
            message : "INSERTing route container permissions in register form"
        },
        permissions_container_ms : {
            name : "INSERT_register_route_form_permissions_container_ms",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_ms', 'input', '{ "className" : "form-control", "key" : "ms", "id" : "ms", "name" : "ms", "type": "hidden", "value": "route_service/create_route::permissions::.create-route-form.step-4", "groupClassName" : "ms" }', 2, 2, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_permissions_container'))`,
            message : "Inserting create_route permissions_container_ms input in create route form"
        },
        invoke_roles : {
            name : "INSERT_create_route_form_invoke_roles",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_form_invoke_roles', 'div',  '{"className" : "form-group offset-2 col-8 row", "dataSet" : { "getRoles" : "all" }, "id" : "invoke-roles", "key" : "route_container_invoke_roles"}', 2, 3, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_permissions_container'))`,
            message : "INSERTing create_route form permissions invoke_roles"
        },
        publish : {
            name : "INSERT_create_route_publish_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_form_publish', 'input', '{ "className" : "form-check-input checkbox default_unchecked", "key" : "is-publish", "id" : "is-publish", "name" : "is_publish", "type" : "checkbox", "groupClassName" : "form-group form-check col-6 checkbox-container", "aplabel" : "Publish ?" }', 2, 4, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_permissions_container'))`,
            message : "INSERTing create_route publish input in create route form permissions"
        },
        permissions_container_back_next : {
            name : "INSERT_create_route_form_permissions_container_back_next",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_form_permissions_container_back_next', 'div',  '{"className" : "col-12 row", "id" : "route-container-back-next", "key" : "route_container_back_next"}', 2, 5, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_permissions_container'))`,
            message : "INSERTing create_route form permissions container_back_next"
        },
        permissions_back : {
            name : "INSERT_create_route_permissions_back_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_permissions_back', 'input', '{ "className" : "form-input-submit form-back btn btn-secondary", "name":"back", "key" : "back", "type" : "button", "value": "Back", "groupClassName" : "container-back col-6" }', 2, 0, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_permissions_container_back_next'))`,
            message : "INSERTing permissions back input in create_route form"
        },
        permissions_submit : {
            name : "INSERT_create_route_permissions_submit_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_permissions_submit', 'input', '{ "id" : "submit", "name" : "submit", "className" : "submit form-input-submit next btn btn-primary", "key" : "submit", "type" : "submit", "value": "Next", "groupClassName" : "container-next col-6" }', 2, 1, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_permissions_container_back_next'))`,
            message : "INSERTing permissions submit input in create_route form"
        },
        end_container : {
            name : "INSERT_create_route_form_end_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('create_route_form_end_container', 'div', '{"className" : "col-10 row"}', 3, 0, (SELECT id FROM forms WHERE name="create_route_form"))`,
            message : "INSERTing create_route form end container"
        },
        end_h3 : {
            name : "INSERT_create_route_form_end_h3",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_form_end_h3', 'h3',  '{"key" : "route-end-h3", "className" : "center fill info", "els" : "Route was successfully added"}', 3, 0, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_end_container'))`,
            message : "INSERTing create_route form end h3"
        },
        end_container_back_next : {
            name : "INSERT_create_route_form_end_container_back_next",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_form_end_container_back_next', 'div',  '{"className" : "col-12 row", "id" : "route-container-back-next", "key" : "route_container_back_next"}', 3, 1, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_end_container'))`,
            message : "INSERTing create_route form end container_back_next"
        },
        end_add_new : {
            name : "INSERT_create_route_end_add_new_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_route_end_submit', 'a', '{ "id" : "add_new", "href" : "/administrate/route/create", "className" : "next btn btn-primary", "key" : "add_new", "els": "Add new", "groupClassName" : "container-next col-12" }', 3, 0, (SELECT id FROM forms WHERE name="create_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_route_form_end_container_back_next'))`,
            message : "INSERTing end add new input in create_route form"
        },
    },
    remove_route : {
        form : {
            name : "INSERT_remove_route_form",
            query : `INSERT into forms (name, element, uri_id, number, isSystem) VALUES ('remove_route_form', '${remove_route_form}', (SELECT id FROM uri WHERE root_id='remove-route'), 0, true)`,
            message: "INSERTing remove_route form"
        },
        remove_container : {
            name : "INSERT_remove_route_form_remove_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('remove_route_form_container', 'div', '{"className" : "col-10 row justify-content-center"}', 0, 0, (SELECT id FROM forms WHERE name="remove_route_form"))`,
            message : "INSERTing remove_route form remove container"
        },
        remove_container_ms : {
            name : "INSERT_remove_route_form_remove_container_ms",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('remove_route_ms', 'input', '{ "className" : "form-control", "key" : "ms", "id" : "ms", "name" : "ms", "type": "hidden", "value": "route_service/remove_route::remove::.remove-route-form.end", "groupClassName" : "ms" }', 0, 0, (SELECT id FROM forms WHERE name="remove_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='remove_route_form_container'))`,
            message : "Inserting remove_route remove_container_ms input in create route form"
        },
        remove_infos_h3 : {
            name : "INSERT_remove_route_form_remove_infos_h3",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('remove_route_form_infos_h3', 'h3',  '{"key" : "route-infos-h3", "className" : "title fill b-border", "els" : "Delete routes"}', 0, 1, (SELECT id FROM forms WHERE name="remove_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='remove_route_form_container'))`,
            message : "INSERTing remove_route form remove infos h3"
        },
        search_input : {
            name : "INSERT_remove_route_search_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('remove_route_search', 'input', '{ "className" : "form-control form-input-text has-dataset search-engine", "key" : "search-engine", "id" : "search-engine", "name" : "search-engine", "type" : "text", "placeholder": "Name, url, or feature...", "groupClassName" : "form-group col-12", "dataSet" : { "search-engine" : { "url" : "/administrate/route/search", "method" : "post", "on" : ["keyup"], "renderingTpl" : "uriDeletePanels", "renderToId" : "search-results", "renderOnLoad" : true } } }', 0, 2, (SELECT id FROM forms WHERE name="remove_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='remove_route_form_container'))`,
            message : "INSERTing remove_route search input in remove route form"
        },
        remove_container_search_results : {
            name : "INSERT_remove_route_form_remove_container_search_results",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('remove_route_form_container_search_results', 'div', '{"id" : "search-results", "key" : "search-results", "className" : "col-12 row justify-content-center"}', 0, 3, (SELECT id FROM forms WHERE name="remove_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='remove_route_form_container'))`,
            message : "INSERTing remove_route form remove container search results"
        },
    },
    edit_route : {
        form : {
            name : "INSERT_edit_route_form",
            query : `INSERT into forms (name, element, uri_id, number, isSystem) VALUES ('edit_route_form', '${edit_route_form}', (SELECT id FROM uri WHERE root_id='edit-route'), 0, true)`,
            message: "INSERTing edit_route form"
        },
        edit_container : {
            name : "INSERT_edit_route_form_edit_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('edit_route_form_container', 'div', '{"className" : "col-10 row justify-content-center"}', 0, 0, (SELECT id FROM forms WHERE name="edit_route_form"))`,
            message : "INSERTing edit_route form edit container"
        },
        edit_container_ms : {
            name : "INSERT_edit_route_form_edit_container_ms",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_ms', 'input', '{ "className" : "form-control", "key" : "ms", "id" : "ms", "name" : "ms", "type": "hidden", "value": "route_service/edit_route::edit::.edit-route-form.end", "groupClassName" : "ms" }', 0, 0, (SELECT id FROM forms WHERE name="edit_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_container'))`,
            message : "Inserting edit_route edit_container_ms input in create route form"
        },
        edit_infos_h3 : {
            name : "INSERT_edit_route_form_edit_infos_h3",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_form_infos_h3', 'h3',  '{"key" : "route-infos-h3", "className" : "title fill b-border", "els" : "Edit routes"}', 0, 1, (SELECT id FROM forms WHERE name="edit_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_container'))`,
            message : "INSERTing edit_route form edit infos h3"
        },
        search_input : {
            name : "INSERT_edit_route_search_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_search', 'input', '{ "className" : "form-control form-input-text has-dataset search-engine", "key" : "search-engine", "id" : "search-engine", "name" : "search-engine", "type" : "text", "placeholder": "Name, url, or feature...", "groupClassName" : "form-group col-12", "dataSet" : { "search-engine" : { "url" : "/administrate/route/search", "method" : "post", "on" : ["keyup"], "renderingTpl" : "uriEditPanels", "renderToId" : "search-results", "renderOnLoad" : true } } }', 0, 2, (SELECT id FROM forms WHERE name="edit_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_container'))`,
            message : "INSERTing edit_route search input in edit route form"
        },
        edit_container_search_results : {
            name : "INSERT_edit_route_form_edit_container_search_results",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_form_container_search_results', 'div', '{"id" : "search-results", "key" : "search-results", "className" : "col-12 row justify-content-center"}', 0, 3, (SELECT id FROM forms WHERE name="edit_route_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_container'))`,
            message : "INSERTing edit_route form edit container search results"
        },
    },
    edit_route_form_form : {
        form : {
            name : "INSERT_edit_route_form_form",
            query : `INSERT into forms (name, element, uri_id, number, isSystem) VALUES ('edit_route_form_form', '${edit_route_form_form}', (SELECT id FROM uri WHERE root_id='edit-route'), 3, true)`,
            message: "INSERTing edit_route form"
        },
        uri_container : {
            name : "INSERT_edit_route_form_form_uri_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('edit_route_form_form_uri_container', 'div', '{"className" : "col-12 row"}', 0, 0, (SELECT id FROM forms WHERE name="edit_route_form_form"))`,
            message : "INSERTing edit_route form uri container"
        },
        uri_container_ms : {
            name : "INSERT_register_route_form_uri_container_ms",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_ms', 'input', '{ "className" : "form-control", "key" : "ms", "id" : "ms", "name" : "ms", "type": "hidden", "value": "route_service/edit_route::uri::.edit-route-form.step-2", "groupClassName" : "ms" }', 0, 0, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_uri_container'))`,
            message : "Inserting edit_route uri_container_ms input in create route form"
        },
        route_infos_h3 : {
            name : "INSERT_edit_route_form_form_route_infos_h3",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_form_form_infos_h3', 'h3',  '{"key" : "route-infos-h3", "className" : "title fill b-border", "els" : "Route Informations"}', 0, 1, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_uri_container'))`,
            message : "INSERTing edit_route form route infos h3"
        },
        rootId : {
            name : "INSERT_edit_route_rootid_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_rootid', 'input', '{ "className" : "form-control form-input-text machine-name::- validate_name length-3", "prelabel" : "Name", "key" : "root_id", "id" : "root_id", "name" : "root_id_length-3", "type" : "text", "placeholder": "Name", "groupClassName" : "form-group col-12 col-lg-6" }', 0, 2, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_uri_container'))`,
            message : "INSERTing edit_route rootid input in create route form"
        },
        feature : {
            name : "INSERT_edit_route_feature_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_feature', 'input', '{ "className" : "form-control form-input-text machine-name::_ validate_name length-3", "prelabel" : "Feature", "key" : "feature", "id" : "feature", "name" : "feature_length-3", "type" : "text", "placeholder": "Feature", "groupClassName" : "form-group col-12 col-lg-6" }', 0, 3, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_uri_container'))`,
            message : "INSERTing edit_route feature input in create route form"
        },
        external : {
            name : "INSERT_edit_route_external_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_external', 'input', '{ "className" : "form-check-input checkbox is-mutator-checkbox check_validate_uri uri_external", "key" : "is-external-uri-check", "id" : "is-external-uri-check", "name" : "isExternal", "type" : "checkbox", "groupClassName" : "form-group form-check col-6 checkbox-container", "aplabel" : "External Link ?" }', 0, 4, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_uri_container'))`,
            message : "INSERTing edit_route external input in create route form"
        },
        uri : {
            name : "INSERT_edit_route_uri_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_uri', 'input', '{ "className" : "form-control form-input-text validate_uri uri_internal", "prelabel" : "Link", "key" : "uri", "id" : "uri", "name" : "uri", "type" : "text", "placeholder": "Link", "append" : { \"element\" : \"button\", \"buttonClassName\" : \"fa-solid fa-link\"}, "groupClassName" : "form-group col-12" }', 0, 5, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_uri_container'))`,
            message : "INSERTing edit_route uri input in create route form"
        },
        uri_submit : {
            name : "INSERT_edit_route_uri_submit_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_uri_submit', 'input', '{ "id" : "submit", "name" : "submit", "className" : "submit form-input-submit next btn btn-primary", "key" : "submit", "type" : "submit", "value": "Next", "groupClassName" : "form-group col-12" }', 0, 6, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_uri_container'))`,
            message : "INSERTing submit input in edit_route form"
        },
        route_container : {
            name : "INSERT_edit_route_form_form_route_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('edit_route_form_form_route_container', 'div', '{"className" : "col-12 row"}', 1, 0, (SELECT id FROM forms WHERE name="edit_route_form_form"))`,
            message : "INSERTing edit_route form route container"
        },
        route_container_ms : {
            name : "INSERT_register_route_form_route_container_ms",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_ms', 'input', '{ "className" : "form-control", "key" : "ms", "id" : "ms", "name" : "ms", "type": "hidden", "value": "route_service/edit_route::content::.edit-route-form.step-3", "groupClassName" : "ms" }', 1, 0, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_route_container'))`,
            message : "Inserting edit_route route_container_ms input in create route form"
        },
        route_content_h3 : {
            name : "INSERT_edit_route_form_form_route_h3",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_form_form_content_h3', 'h3',  '{"key" : "route-content-h3", "className" : "title fill b-border", "els" : "Content"}', 1, 0, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_route_container'))`,
            message : "INSERTing edit_route form route h3"
        },
        route_container_route_progress : {
            name : "INSERT_route_container_route_progress",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_route_progress_bar', 'input', '{ "className" : "progress-bar isProgressBar progress-bar-striped progress-bar-animated", "key" : "route_container_progress", "id" : "route_container_progress", "name" : "progress", "type" : "hidden", "groupClassName" : "form-group col-12", "value" : 50 }', 1, 1, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_route_container'))`,
            message : "INSERTing route container route progress in register form"
        },
        title : {
            name : "INSERT_edit_route_form_form_title_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_title', 'input', '{ "className" : "form-control form-input-text validate_name length-3", "prelabel" : "Title", "key" : "title", "id" : "title", "name" : "title_length-3", "type" : "text", "placeholder": "Title", "groupClassName" : "form-group col-12" }', 1, 2, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_route_container'))`,
            message : "INSERTing edit_route title input in create route form"
        },
        invoke_theme : {
            name : "INSERT_edit_route_form_form_invoke_theme",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_form_form_invoke_theme', 'div',  '{"className" : "form-group col-12 col-sm-6", "id" : "invoke-theme", "prelabel" : "Theme", "key" : "route_container_invoke_theme"}', 1, 3, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_route_container'))`,
            message : "INSERTing edit_route form route invoke_theme"
        },
        method : {
            name : "INSERT_register_route_form_route_container_method",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_method', 'select', '{ "className" : "form-control col-12", "key" : "method", "id" : "method", "prelabel" : "Content type", "name" : "method", "groupClassName" : "form-group col-12 col-sm-6", "options" : { "values" : [ "|Content type", "get-page|Page", "get-form|Form", "get-file|File", "post-callback|Callback"], "dataSet" : { "input-creator" : { "on-values" : "file", "mode": "ap", "groupClassName" : "form-group input-created col-12", "className" : "form-control form-input-text validate_uri uri_internal", "placeholder" : "Path to file and filename", "name" : "path-to-file-and-filename", "key" : "path-to-file-and-filename" }, "checkbox-creator" : {"name" : "is-existing-data", "on-values" : "page|form|callback", "groupClassName" : "form-group form-check col-6 checkbox-created checkbox-container", "className": "has-dataset input-creator mode::ap name::contentid groupClassName::form-group|input-created|col-6 className::form-control|form-input-text|validate_name|length-1 placeholder::Content-id-or-form-name","aplabel" : "Link to existing content ?", "key" : "is-existing-data", "id" : "is-existing-data" } }, "translate" : true, "default" : "Content type"} }', 1, 4, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_route_container'))`,
            message : "Inserting edit_route method input in create route form"
        },
        route_container_back_next : {
            name : "INSERT_edit_route_form_form_route_container_back_next",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_form_form_route_container_back_next', 'div',  '{"className" : "col-12 row", "id" : "route-container-back-next", "key" : "route_container_back_next"}', 1, 5, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_route_container'))`,
            message : "INSERTing edit_route form route container_back_next"
        },
        route_back : {
            name : "INSERT_edit_route_route_back_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_route_back', 'input', '{ "className" : "form-input-submit form-back btn btn-secondary", "name":"back", "key" : "back", "type" : "button", "value": "Back", "groupClassName" : "container-back col-6" }', 1, 0, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_route_container_back_next'))`,
            message : "INSERTing back input in edit_route form"
        },
        route_submit : {
            name : "INSERT_edit_route_route_submit_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_route_submit', 'input', '{ "id" : "submit", "name" : "submit", "className" : "submit form-input-submit next btn btn-primary", "key" : "submit", "type" : "submit", "value": "Next", "groupClassName" : "container-next col-6" }', 1, 1, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_route_container_back_next'))`,
            message : "INSERTing submit input in edit_route form"
        },
        permissions_container : {
            name : "INSERT_edit_route_form_form_permissions_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('edit_route_form_form_permissions_container', 'div', '{"className" : "col-12 row"}', 2, 0, (SELECT id FROM forms WHERE name="edit_route_form_form"))`,
            message : "INSERTing edit_route form permissions container"
        },
        permissions_h3 : {
            name : "INSERT_edit_route_form_form_permissions_h3",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_form_form_permissions_h3', 'h3',  '{"key" : "route-permissions-h3", "className" : "title fill b-border", "els" : "Permissions"}', 2, 0, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_permissions_container'))`,
            message : "INSERTing edit_route form permissions h3"
        },
        permissions_container_progress : {
            name : "INSERT_route_container_permissions_progress",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_permissions_progress_bar', 'input', '{ "className" : "progress-bar isProgressBar progress-bar-striped progress-bar-animated", "key" : "route_container_progress", "id" : "route_container_progress", "name" : "progress", "type" : "hidden", "groupClassName" : "form-group col-12", "value" : 100 }', 2, 1, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_permissions_container'))`,
            message : "INSERTing route container permissions in register form"
        },
        permissions_container_ms : {
            name : "INSERT_register_route_form_permissions_container_ms",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_ms', 'input', '{ "className" : "form-control", "key" : "ms", "id" : "ms", "name" : "ms", "type": "hidden", "value": "route_service/edit_route::permissions::.edit-route-form.step-4", "groupClassName" : "ms" }', 2, 2, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_permissions_container'))`,
            message : "Inserting edit_route permissions_container_ms input in create route form"
        },
        invoke_roles : {
            name : "INSERT_edit_route_form_form_invoke_roles",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_form_form_invoke_roles', 'div',  '{"className" : "form-group offset-2 col-8 row", "dataSet" : { "getRoles" : "all" }, "id" : "invoke-roles", "key" : "route_container_invoke_roles"}', 2, 3, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_permissions_container'))`,
            message : "INSERTing edit_route form permissions invoke_roles"
        },
        publish : {
            name : "INSERT_edit_route_publish_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_form_form_publish', 'input', '{ "className" : "form-check-input checkbox default_unchecked", "key" : "is-publish", "id" : "is-publish", "name" : "is_publish", "type" : "checkbox", "groupClassName" : "form-group form-check col-6 checkbox-container", "aplabel" : "Publish ?" }', 2, 4, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_permissions_container'))`,
            message : "INSERTing edit_route publish input in create route form permissions"
        },
        permissions_container_back_next : {
            name : "INSERT_edit_route_form_form_permissions_container_back_next",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_form_form_permissions_container_back_next', 'div',  '{"className" : "col-12 row", "id" : "route-container-back-next", "key" : "route_container_back_next"}', 2, 5, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_permissions_container'))`,
            message : "INSERTing edit_route form permissions container_back_next"
        },
        permissions_back : {
            name : "INSERT_edit_route_permissions_back_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_permissions_back', 'input', '{ "className" : "form-input-submit form-back btn btn-secondary", "name":"back", "key" : "back", "type" : "button", "value": "Back", "groupClassName" : "container-back col-6" }', 2, 0, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_permissions_container_back_next'))`,
            message : "INSERTing permissions back input in edit_route form"
        },
        permissions_submit : {
            name : "INSERT_edit_route_permissions_submit_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_permissions_submit', 'input', '{ "id" : "submit", "name" : "submit", "className" : "submit form-input-submit next btn btn-primary", "key" : "submit", "type" : "submit", "value": "Next", "groupClassName" : "container-next col-6" }', 2, 1, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_permissions_container_back_next'))`,
            message : "INSERTing permissions submit input in edit_route form"
        },
        end_container : {
            name : "INSERT_edit_route_form_form_end_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('edit_route_form_form_end_container', 'div', '{"className" : "col-12 row"}', 3, 0, (SELECT id FROM forms WHERE name="edit_route_form_form"))`,
            message : "INSERTing edit_route form end container"
        },
        end_h3 : {
            name : "INSERT_edit_route_form_form_end_h3",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_form_form_end_h3', 'h3',  '{"key" : "route-end-h3", "className" : "center fill info", "els" : "Route was edited successfully"}', 3, 0, (SELECT id FROM forms WHERE name="edit_route_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='edit_route_form_form_end_container'))`,
            message : "INSERTing edit_route form end h3"
        }
    },
    add_file : {
        form : {
            name : "INSERT_add_file_form",
            query : `INSERT into forms (name, element, uri_id, number, isSystem) VALUES ('add_file_form', '${add_file_form}', (SELECT id FROM uri WHERE root_id='uploads-add-file'), 0, true)`,
            message: "INSERTing add_file form"
        },
        add_file_container : {
            name : "INSERT_add_file_form_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('add_file_form_container', 'div', '{"className" : "col-10 row justify-content-center"}', 0, 0, (SELECT id FROM forms WHERE name="add_file_form"))`,
            message : "INSERTing add_file form container"
        },
        add_file_input : {
            name : "INSERT_edit_route_search_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('add_file_input', 'input', '{ "className" : "form-control-file file validate_file", "key" : "add-file", "prelabel" : "Select your file...", "id" : "add-file", "name" : "file_uploaded", "type" : "file", "placeholder": "Select your file...", "groupClassName" : "form-group col-12"}', 0, 0, (SELECT id FROM forms WHERE name="add_file_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='add_file_form_container'))`,
            message : "INSERTing edit_route search input in edit route form"
        },
        add_file_container_back_next : {
            name : "INSERT_add_file_form_container_back_next",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('add_file_container_back_next', 'div',  '{"className" : "row col-12", "id" : "add-file-back-next", "key" : "add_file_back_next"}', 0, 1, (SELECT id FROM forms WHERE name="add_file_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='add_file_form_container'))`,
            message : "INSERTing add_file form permissions container_back_next"
        },
        add_file_submit : {
            name : "INSERT_add_file_submit_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_permissions_submit', 'input', '{ "id" : "submit", "name" : "submit", "className" : "submit form-input-submit next btn btn-primary", "key" : "submit", "type" : "submit", "value": "Next", "groupClassName" : "container-next col-12" }', 0, 0, (SELECT id FROM forms WHERE name="add_file_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='add_file_container_back_next'))`,
            message : "INSERTing add_file submit input in edit_route form"
        },
    },
    add_folder : {
        form : {
            name : "INSERT_add_folder_form",
            query : `INSERT into forms (name, element, uri_id, number, isSystem) VALUES ('add_folder_form', '${add_folder_form}', (SELECT id FROM uri WHERE root_id='uploads-add-folder'), 0, true)`,
            message: "INSERTing add_folder form"
        },
        add_folder_container : {
            name : "INSERT_add_folder_form_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('add_folder_form_container', 'div', '{"className" : "col-10 row justify-content-center"}', 0, 0, (SELECT id FROM forms WHERE name="add_folder_form"))`,
            message : "INSERTing add_folder form container"
        },
        add_folder_input : {
            name : "INSERT_edit_route_search_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('add_folder_input', 'input', '{ "className" : "form-control form-input-folder validate_name length-3", "key" : "add-folder", "id" : "add-folder", "name" : "folder_length-3", "type" : "text", "placeholder": "Name", "groupClassName" : "form-group col-12"}', 0, 0, (SELECT id FROM forms WHERE name="add_folder_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='add_folder_form_container'))`,
            message : "INSERTing edit_route search input in edit route form"
        },
        add_folder_container_back_next : {
            name : "INSERT_add_folder_form_container_back_next",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('add_folder_container_back_next', 'div',  '{"className" : "row col-12", "id" : "add-folder-back-next", "key" : "add_folder_back_next"}', 0, 1, (SELECT id FROM forms WHERE name="add_folder_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='add_folder_form_container'))`,
            message : "INSERTing add_folder form permissions container_back_next"
        },
        add_folder_submit : {
            name : "INSERT_add_folder_submit_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('edit_route_permissions_submit', 'input', '{ "id" : "submit", "name" : "submit", "className" : "submit form-input-submit next btn btn-primary", "key" : "submit", "type" : "submit", "value": "Next", "groupClassName" : "container-next col-12" }', 0, 0, (SELECT id FROM forms WHERE name="add_folder_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='add_folder_container_back_next'))`,
            message : "INSERTing add_folder submit input in edit_route form"
        },
    },
    manage_header : {
        form : {
            name : "INSERT_manage_header_form",
            query : `INSERT into forms (name, element, uri_id, number, isSystem) VALUES ('manage_header_form', '${manage_header_form}', (SELECT id FROM uri WHERE root_id='manage-header-form'), 0, true)`,
            message: "INSERTing manage_header form"
        },
        manage_container : {
            name : "INSERT_manage_header_form_manage_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('manage_header_form_container', 'div', '{"className" : "col-10 row justify-content-center"}', 0, 0, (SELECT id FROM forms WHERE name="manage_header_form"))`,
            message : "INSERTing manage_header form manage container"
        },
        manage_container_ms : {
            name : "INSERT_manage_header_form_manage_container_ms",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('manage_header_ms', 'input', '{ "className" : "form-control", "key" : "ms", "id" : "ms", "name" : "ms", "type": "hidden", "value": "header_service/manage_header::manage::.manage-header-form.end", "groupClassName" : "ms" }', 0, 0, (SELECT id FROM forms WHERE name="manage_header_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='manage_header_form_container'))`,
            message : "Inserting manage_header manage_container_ms input in create header form"
        },
        manage_infos_h3 : {
            name : "INSERT_manage_header_form_manage_infos_h3",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('manage_header_form_infos_h3', 'h3',  '{"key" : "header-infos-h3", "className" : "title fill b-border", "els" : "Manage headers"}', 0, 1, (SELECT id FROM forms WHERE name="manage_header_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='manage_header_form_container'))`,
            message : "INSERTing manage_header form manage infos h3"
        },
        search_input : {
            name : "INSERT_manage_header_search_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('manage_header_search', 'input', '{ "className" : "form-control form-input-text has-dataset search-engine", "key" : "search-engine", "id" : "search-engine", "name" : "search-engine", "type" : "text", "placeholder": "Name", "groupClassName" : "form-group col-12", "dataSet" : { "search-engine" : { "url" : "/administrate/header/search", "method" : "post", "on" : ["keyup"], "renderingTpl" : "headerEditPanels", "renderToId" : "search-results", "renderOnLoad" : true } } }', 0, 2, (SELECT id FROM forms WHERE name="manage_header_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='manage_header_form_container'))`,
            message : "INSERTing manage_header search input in manage header form"
        },
        manage_container_search_results : {
            name : "INSERT_manage_header_form_manage_container_search_results",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('manage_header_form_container_search_results', 'div', '{"id" : "search-results", "key" : "search-results", "className" : "col-12 row justify-content-center"}', 0, 3, (SELECT id FROM forms WHERE name="manage_header_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='manage_header_form_container'))`,
            message : "INSERTing manage_header form manage container search results"
        },
    },
    manage_header_form : {
        form : {
            name : "INSERT_manage_header_form_form",
            query : `INSERT into forms (name, element, uri_id, number, isSystem) VALUES ('manage_header_form_form', '${manage_header_form_form}', (SELECT id FROM uri WHERE root_id='manage-header-form-form'), 0, true)`,
            message: "INSERTing manage_header_form form"
        },
        manage_container : {
            name : "INSERT_manage_header_form_form_manage_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('manage_header_form_form_container', 'div', '{"className" : "col-10 row justify-content-center"}', 0, 0, (SELECT id FROM forms WHERE name="manage_header_form_form"))`,
            message : "INSERTing manage_header_form form manage container"
        },
        manage_container_ms : {
            name : "INSERT_manage_header_form_form_manage_container_ms",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('manage_header_form_ms', 'input', '{ "className" : "form-control", "key" : "ms", "id" : "ms", "name" : "ms", "type": "hidden", "value": "header_service/manage_header::headerdata::.manage-header-form.end", "groupClassName" : "ms" }', 0, 0, (SELECT id FROM forms WHERE name="manage_header_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='manage_header_form_form_container'))`,
            message : "Inserting manage_header_form manage_container_ms input in manage header_form form"
        },
        manage_container_dragndrop_results : {
            name : "INSERT_manage_header_form_manage_container_dragndrop_results",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('manage_header_form_container_dragndrop_results', 'div', '{"id" : "dragndrop-results", "key" : "dragndrop-results", "className" : "col-12 row justify-content-center"}', 0, 3, (SELECT id FROM forms WHERE name="manage_header_form_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='manage_header_form_form_container'))`,
            message : "INSERTing manage_header form manage container dragndrop results"
        },
    },
    create_content_type_form : {
        form : {
            name : "INSERT_create_content_types_form",
            query : `INSERT into forms (name, element, uri_id, number, isSystem) VALUES ('create_content_types_form', '${create_content_types_form}', (SELECT id FROM uri WHERE root_id='create-content-type-form'), 1, true)`,
            message: "INSERTing create_content_types form"
        },
        create_container : {
            name : "INSERT_create_content_types_create_container",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id) VALUES ('create_content_types_create_container', 'div', '{"className" : "col-10 row justify-content-center"}', 0, 0, (SELECT id FROM forms WHERE name="create_content_types_form"))`,
            message : "INSERTing create_content_types form edit container"
        },
        create_container_ms : {
            name : "INSERT_create_content_types_create_container_ms",
            query :  `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_content_types_create_ms', 'input', '{ "className" : "form-control", "key" : "ms", "id" : "ms", "name" : "ms", "type": "hidden", "value": "content_types_service/create_content_types::create::.create-content-types-form.end", "groupClassName" : "ms" }', 0, 0, (SELECT id FROM forms WHERE name="create_content_types_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_content_types_create_container'))`,
            message : "Inserting create_content_types_create_container_ms input in edit header_form form"
        },
        manage_infos_h3 : {
            name : "INSERT_create_content_types_create_container_infos_h3",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_content_types_create_container_infos_h3', 'h3',  '{"key" : "create-content-types-infos-h3", "className" : "title fill b-border", "els" : "Create content type"}', 0, 1, (SELECT id FROM forms WHERE name="create_content_types_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_content_types_create_container'))`,
            message : "INSERTing create_content_types_create_container infos h3"
        },
        machine_name : {
            name : "INSERT_create_content_types_input_name",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_content_types_machine_name', 'input', '{ "className" : "form-control form-input-text machine-name::_ validate_name length-3", "prelabel" : "Machine name", "key" : "machine-name", "id" : "machine-name", "name" : "feature_length-3", "type" : "text", "placeholder": "Machine name", "groupClassName" : "form-group col-12" }', 0, 2, (SELECT id FROM forms WHERE name="create_content_types_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_content_types_create_container'))`,
            message : "INSERTing create_content_types input in create route form"
        },
        machine_name_container_next : {
            name : "INSERT_machine_name_create_content_types_container_next",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_content_types_container_next', 'div',  '{"className" : "col-12 row", "id" : "create-content-types-next", "key" : "create_content_types_next"}', 0, 3, (SELECT id FROM forms WHERE name="create_content_types_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_content_types_create_container'))`,
            message : "INSERTing machine_name_create_content_types container_next"
        },
        machine_name_submit : {
            name : "INSERT_machine_name_create_content_types_submit_input",
            query : `INSERT into forms_elements (name, element, args, form_number, weight, form_id, form_element_id) VALUES ('create_content_types_container_submit', 'input', '{ "id" : "submit", "name" : "submit", "className" : "submit form-input-submit next btn btn-primary", "key" : "submit", "type" : "submit", "value": "Next", "groupClassName" : "container-next col-12" }', 0, 0, (SELECT id FROM forms WHERE name="create_content_types_form"), (SELECT id from (SELECT * FROM forms_elements) AS felems where felems.name='create_content_types_container_next'))`,
            message : "INSERTing machine_name_create_content_types submit input in create_route form"
        },
    }
}

