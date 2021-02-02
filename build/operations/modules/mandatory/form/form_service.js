"use strict";

//Author - Eric Salle
var {
  link
} = require('fs');

var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));

var content_service = require(path.resolve(global.MODULE_ADMIN + "/content/content_service"));

var form_validators = require(path.resolve(global.MODULE_FORM + "/form_validators"))();

var FormFactory = require(path.resolve(global.MODULE_FORM + "/form_factory")).FormFactory;

var services = {
  "view_service": view_service,
  "content_service": content_service
};
module.exports = {
  getForm: (route, req, res) => {
    var formFactory = new FormFactory(route.form_name);
    var q_form = formFactory.fetchForm(formFactory.getQueryPrefix("form"));
    var q_decorate;

    if (route.feature != null && (req._parsedUrl.query == null || !req._parsedUrl.query.includes("fragment"))) {
      q_decorate = content_service.decorateContainer(route);
    }

    Promise.all([q_form, q_decorate]).then(resolve => {
      var form = resolve.find(res => typeof res != "undefined" && typeof res.getFormData != "undefined");
      var decorator = resolve.find(res => typeof res != "undefined" && typeof res.getFormData == "undefined");

      try {
        var formComponent = form.setFormComponent();
        formComponent = form.resolveFormElements(route, formComponent, form.felemsData);
        var body = formComponent;

        if (req._parsedUrl.query == null || req._parsedUrl.query != null && !req._parsedUrl.query.includes("fragment")) {
          if (route.feature == null) {
            body = view_service.addLogoAsH1(global.CMS_TITLE, body);
          } else if (route.feature != null) {
            var feature = route.feature.split("_")[0];
            body = content_service.containerDecorator(feature, formComponent, decorator);
          }
        }

        return view_service.buildView(route, req, res, body);
      } catch (error) {
        console.error("Error in form_service@getForm (form_name : ".concat(route.form_name, ") : ") + error.stack);
        return view_service.buildErrorView(route, req, res, error);
      }
    });
  },
  //Récupération à partir de l'input ms en hidden des données liés au service (file, callback, prefix)
  //exemple : content_service/create_content::uri => file/service::prefix
  validateForm: (route, req, res) => {
    var isValid = true;
    var newResponse = Object.assign({}, {
      errorLabel: route.i18n.translate("There was an error while validating this form", route.lang)
    });
    var redirectToService = req.body.ms;
    Object.keys(req.body).slice(0).reverse().map(name => {
      var split_name = name.split("_");
      var pre_name = split_name[0];
      var options = split_name[1];

      if (typeof form_validators[pre_name] != "undefined") {
        var validation = form_validators[pre_name](req.body[name], options);
        console.log(validation);

        if (validation.isValid == false) {
          isValid = false;
          newResponse = Object.assign({}, {
            errorLabel: route.i18n.translate(validation.errorLabel, route.lang)
          });
        }
      }
    });
    redirectToService = redirectToService.split('/');
    redirectToService = Object.assign({}, {
      file: redirectToService[0],
      callback: redirectToService[1].split("::")[0],
      prefix: redirectToService[1].split("::")[1]
    });

    if (!isValid) {
      return res.status(422).send(newResponse);
    }
  }
};