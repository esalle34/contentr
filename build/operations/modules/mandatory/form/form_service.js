"use strict";

//Author - Eric Salle
var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));

var header_service = require(path.resolve(global.MODULE_VIEW + "/headers/header_service"));

var route_service = require(path.resolve(global.MODULE_ROUTES + "/route_service"));

var content_types_service = require(path.resolve(global.MODULE_CONTENT_TYPES + "/content_types_service"));

var form_validators = require(path.resolve(global.MODULE_FORM + "/form_validators"))();

var FormFactory = require(path.resolve(global.MODULE_FORM + "/form_factory")).FormFactory;

var services = {
  "view_service": view_service,
  "route_service": route_service,
  "header_service": header_service,
  "content_types_service": content_types_service
};
module.exports = {
  getForm: (route, req, res) => {
    var formFactory;

    if (typeof req.body != "undefined" && req.body.form_name != "undefined" && req.body.form_name != null) {
      formFactory = new FormFactory(req.body.form_name);
    } else {
      formFactory = new FormFactory(route.form_name);
    }

    var q_form = formFactory.fetchForm(formFactory.getQueryPrefix("form"));
    var q_decorate;

    if (route.feature != null && (req._parsedUrl.query == null || !req._parsedUrl.query.includes("fragment"))) {
      q_decorate = route_service.decorateContainer(route);
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
            body = route_service.containerDecorator(feature, formComponent, decorator);
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
    var isValid = false;
    var newResponse = Object.assign({}, {
      errorLabel: route.i18n.translate("There was an error while validating this form", route.lang)
    });
    var redirectToService = req.body.ms;
    var validMap = [];

    if (Object.keys(req.body).length == 0) {
      return res.status(422).send(newResponse);
    }

    Object.keys(req.body).slice(0).reverse().map(name => {
      var split_name = name.split("_");
      var pre_name = typeof split_name != "undefined" && split_name.length > 2 ? split_name.slice(0, -1).join("_") : split_name[0];
      var options = typeof split_name != "undefined" && split_name.length > 2 ? split_name[split_name.length - 1] : split_name[1];

      if (typeof form_validators[pre_name] != "undefined") {
        var validation = form_validators[pre_name](req.body[name], options);

        if (validation.isValid == false) {
          validMap.push(false);
          newResponse = Object.assign({}, {
            errorLabel: route.i18n.translate(validation.errorLabel, route.lang)
          });
        } else {
          validMap.push(true);
        }
      }
    });

    if (!validMap.includes(false)) {
      isValid = true;
    }

    redirectToService = redirectToService.split('/');
    redirectToService = Object.assign({}, {
      file: redirectToService[0],
      callback: redirectToService[1].split("::")[0],
      prefix: redirectToService[1].split("::")[1],
      next: redirectToService[1].split("::")[2]
    });

    if (!isValid) {
      return res.status(422).send(newResponse);
    } else {
      return services[redirectToService.file][redirectToService.callback](route, req, res, redirectToService.prefix, redirectToService.next);
    }
  }
};