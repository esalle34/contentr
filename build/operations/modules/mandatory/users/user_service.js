"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//Office Session Module
//Author - Eric Salle
var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));

var UserFactory = require("./user_factory").UserFactory;

var User = require("./user").User;

var FormFactory = require(path.resolve(global.MODULE_FORM + "/form_factory")).FormFactory;

var countries = require(path.resolve(global.JSON_DATA_STORAGE + "/location/countries.json"));

var qs = require('querystring');

module.exports = {
  login: function login(route, req, res) {
    var params = req.body;

    if (typeof params.username_email == "undefined" || typeof params.password == "undefined") {
      return res.status(400).send({
        errorLabel: route.i18n.translate("An error occured while processing data", route.lang)
      });
    } else if (params.username_email == "" || params.password == "") {
      return res.status(400).send({
        errorLabel: route.i18n.translate("Error : Some fields are empty", route.lang)
      });
    }

    var args = {
      username: params.username_email,
      password: params.password
    };
    var userFactory = new UserFactory(args);
    userFactory.fetchRolesColumns().then(resolve => {
      userFactory.fetchUser(userFactory.getQueryPrefix("login", resolve), true, true).then(user => {
        if (typeof user.id == "undefined") {
          return res.status(401).send({
            errorLabel: route.i18n.translate("Wrong username/email or password", route.lang)
          });
        } else {
          userFactory.fetchUserDatas("lastname, firstname", user.id).then(datas => {
            user.setUserDatas(datas);
            Object.assign(req.session, {
              user: user
            });

            if (typeof req.session.previousUrl != "undefined") {
              return res.send({
                redirect: req.session.previousUrl
              });
            }

            return res.status(200).send({
              redirect: global.HOME_PATH
            });
          });
        }
      });
    });
  },
  register_form: function register_form(route, req, res) {
    var formFactory = new FormFactory("register_form");
    formFactory.fetchForm(formFactory.getQueryPrefix("form")).then(form => {
      try {
        var formComponent = form.setFormComponent();
        formComponent = form.resolveFormElements(route, formComponent, form.felemsData);
        var step;

        if (typeof req.session.user != "undefined" && (typeof req.session.user.lastname != "undefined" || req.session.user.next == ".register-form.step-3")) {
          step = "step-3";
        } else if (typeof req.session.user != "undefined" && typeof req.session.user.lastname == "undefined" && req.session.user.next != ".register-form.step-3") {
          step = "step-2";
        }

        if (typeof req.session.user == "undefined" || typeof step == "undefined") {
          step = "step-1";
        }

        var cform = formComponent.react_nested.find(form => form.args.className.includes("current"));
        cform.args.className = cform.args.className.replace("current", "");
        var currentForm = formComponent.react_nested.find(form => form.args.className.includes(step));
        var newCurrentForm = Object.assign(currentForm, {
          args: _objectSpread(_objectSpread({}, currentForm.args), {}, {
            className: currentForm.args.className + " current"
          })
        });
        formComponent = Object.assign(formComponent, _objectSpread({}, formComponent.react_nested), {
          [newCurrentForm.number]: newCurrentForm
        });
        var body = view_service.addLogoAsH1(global.CMS_TITLE, formComponent);
        view_service.buildView(route, req, res, body);
      } catch (error) {
        console.error("Error in user_service@register_form : " + error.stack);
      }
    });
  },
  register: function register(route, req, res) {
    var params = req.body;
    var moveToNext = {
      current: params.next
    };

    if (typeof req.session.user == "undefined") {
      var args = {
        username: params.username,
        password: params.password_signup,
        email: params.email
      };

      if (params.username.replace(/\s/g, '').length < 2) {
        return Object.assign({}, {
          errorLabel: route.i18n.translate("Error : username length is not valid", route.lang)
        });
      }

      var userFactory = new UserFactory(args);

      if (!params.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        var newResponse = Object.assign({}, {
          errorLabel: route.i18n.translate("Error : email not valid", route.lang)
        });
        return res.status(401).send(newResponse);
      } else if (!params.password_signup.match(/(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)) {
        var _newResponse = Object.assign({}, {
          errorLabel: route.i18n.translate("Error : password not valid", route.lang)
        });

        return res.status(401).send(_newResponse);
      }

      userFactory.checkUserInfo("username").then(resolve => {
        if (typeof resolve == "object" && Object.keys(resolve).length > 0) {
          var _newResponse2 = Object.assign({}, {
            errorLabel: route.i18n.translate("User already exists, please try logging in or contact support", route.lang)
          });

          return res.status(409).send(_newResponse2);
        } else {
          userFactory.checkUserInfo("email").then(resolve => {
            if (typeof resolve == "object" && Object.keys(resolve).length > 0) {
              var _newResponse3 = Object.assign({}, {
                errorLabel: route.i18n.translate("This email is already used", route.lang)
              });

              return res.status(409).send(_newResponse3);
            }

            userFactory.createUser().then(resolve => {
              userFactory.fetchUser(userFactory.getQueryPrefix("createUser"), false, false).then(user => {
                Object.assign(req.session, {
                  user: user
                });
                userFactory.createUserPrivileges(user.id).then(resolve => {
                  Object.assign(req.session, {
                    user: user
                  });
                  var newResponse = Object.assign({}, moveToNext);
                  return res.status(200).send(newResponse);
                });
              });
            });
          });
        }
      });
    } else if (typeof req.session.user != "undefined" && params.next == ".register-form.step-3") {
      var _args = {
        id: req.session.user.id,
        username: req.session.user.username
      };

      var _userFactory = new UserFactory(_args);

      _userFactory.createUserDatas(params.civility, params.lastname, params.firstname, params.phonenumber, _args.id).then(resolve => {
        var user = Object.assign(req.session.user, params);
        Object.assign(req.session, {
          user: user
        });
        var newResponse = Object.assign({}, moveToNext);
        return res.status(200).send(newResponse);
      });
    } else {
      var _args2 = {
        id: req.session.user.id,
        username: req.session.user.username
      };

      var _userFactory2 = new UserFactory(_args2);

      var country = countries.filter(newCountry => newCountry.value == params.code);
      country = country[0].innerText;

      _userFactory2.createUserLocation(params.code, country, params.postalcode, params.city, params.address, _args2.id).then(resolve => {
        var user = new User(req.session.user.id, req.session.user.username, true);
        user.setUserDatas(req.session.user);
        user.setUserPrivileges({
          User: 1
        });
        user.setIsAuthenticated(!user.isIsAuthenticated());
        Object.assign(req.session, {
          user: user
        });

        if (typeof req.session.previousUrl != "undefined") {
          return res.send({
            redirect: req.session.previousUrl
          });
        }

        return res.status(200).send({
          redirect: global.HOME_PATH
        });
      });
    }
  },
  getRoles: function getRoles(route, req, res) {
    var params = req.body;
    var response;
    var userFactory = new UserFactory();
    userFactory.fetchRolesColumns(params.roles).then(result => {
      response = Object.assign({}, {
        roles: result
      });
      return res.status(200).send(response);
    });
  },
  logout: function logout(route, req, res) {
    if (typeof req.session.user != "undefined") {
      delete req.session.user;
    }

    if (typeof req.session.previousUrl != "undefined") {
      return res.status(200).redirect(req.session.previousUrl);
    }

    return res.status(200).redirect(global.HOME_PATH);
  }
};