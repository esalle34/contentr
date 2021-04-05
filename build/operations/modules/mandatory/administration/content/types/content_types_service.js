"use strict";

//Administrate - Content types- Module
//Author - Eric Salle
var path = require('path');

var root_path = path.dirname(require.main.filename);

var global = require(path.resolve(root_path + "/global"))();

var view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));

var ContentTypeFactory = require(path.resolve(global.MODULE_CONTENT_TYPES + "/content_types_factory")).ContentTypeFactory;

var ContentType = require(path.resolve(global.MODULE_CONTENT_TYPES + "/content_types")).ContentType;

module.exports = {
  administration_content_types: (route, req, res) => {
    var body = view_service.checkAccessRights(route, req, res, null, false);

    if (body != null && body.hasError) {
      if (typeof body.redirectUri != "undefined") {
        return res.status(403).send(Object.assign({}, {
          redirect: body.redirectUri
        }));
      }
    }

    return view_service.getBuildView(route, req, res, body);
  },
  create_content_types: (route, req, res, prefix, next) => {
    var body = view_service.checkAccessRights(route, req, res, null, false);

    if (body != null && body.hasError) {
      if (typeof body.redirectUri != "undefined") {
        return res.status(403).send(Object.assign({}, {
          redirect: body.redirectUri
        }));
      }
    }

    var params = req.body;
    var contentTypeFactory = new ContentTypeFactory();
    var pKeys = Object.keys(params);
    var pVals = Object.values(params);

    switch (prefix) {
      case "machine_name":
        return new Promise((resolve, reject) => {
          contentTypeFactory.createContentType({
            machine_name: pVals[pKeys.findIndex(p => p.includes('name'))].replace(/\s/g, "_"),
            template_name: pVals[pKeys.findIndex(p => p.includes('template'))].replace(/\s/g, "-")
          }).then(result => {
            if (result == "Already exists") {
              resolve(res.status(409).send(Object.assign({}, {
                errorLabel: route.i18n.translate("Content type already exists", route.lang)
              })));
            } else {
              resolve(res.status(200).send(Object.assign({}, {
                current: next,
                fetchedData: {
                  addInput: {
                    id: result.id,
                    mname: pVals[pKeys.findIndex(p => p.includes('name'))].replace(/\s/g, "_")
                  }
                }
              })));
            }
          });
        });

      case "inputs":
        var count = pKeys.reverse().find(el => el.includes("name") && el != "mname").split("-")[1];
        var inputsArray = {};
        params = Object.assign({}, params, {
          'element-0': 'input',
          "type-0": "hidden",
          "name-0": "ms",
          "value-0": "content_service/create_content::create::.create-content-form.end",
          "groupClassName-0": "form-group hidden"
        });

        var _loop = function _loop(i) {
          inputsArray[i] = [];
          inputsArray[i].args = {};

          var _loop2 = function _loop2(key) {
            if (key.includes("-".concat(i))) {
              if (key.includes("className")) {
                if (!key.includes("groupClassName") && params[key].length == 0) {
                  if (params["element-".concat(i)] == "input") {
                    if (params["type-".concat(i)] == "submit") {
                      params[key] = "btn btn-primary submit next";
                    } else if (params["type-".concat(i)] == "checkbox") {
                      params[key] = "form-check-input checkbox";
                    } else {
                      params[key] = "form-control";
                    }
                  } else if (params["element-".concat(i)] == "select") {
                    params[key] = "form-control";
                  }
                }

                if (typeof params["maxlength-".concat(i)] != "undefined") {
                  inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                    className: params[key] + " validate_string" + " maxlength-".concat(params["maxlength-".concat(i)])
                  });
                }

                if (typeof params["minlength-".concat(i)] != "undefined") {
                  inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                    className: typeof inputsArray["".concat(i)].args.className != "undefined" && typeof inputsArray["".concat(i)].args.className.includes("validate_string") ? "".concat(inputsArray["".concat(i)].args.className, " minlength-").concat(params["minlength-".concat(i)]) : "".concat(params[key], " validate_string minlength-").concat(params["minlength-".concat(i)])
                  });
                }

                if (typeof params["max-".concat(i)] != "undefined") {
                  inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                    className: params[key] + " validate_number" + " max-".concat(params[" max-".concat(i)])
                  });
                }

                if (typeof params["min-".concat(i)] != "undefined") {
                  inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                    className: typeof inputsArray["".concat(i)].args.className != "undefined" && typeof inputsArray["".concat(i)].args.className.includes("validate_number") ? "".concat(inputsArray["".concat(i)].args.className, " min-").concat(params["min-".concat(i)]) : "".concat(params[key], " validate_string min-").concat(params["min-".concat(i)])
                  });
                }

                if (typeof params["maxlength-".concat(i)] == "undefined" && typeof params["minlength-".concat(i)] == "undefined" && typeof params["max-".concat(i)] == "undefined" && typeof params["min-".concat(i)] == "undefined") {
                  inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                    className: params[key]
                  });
                }
              } else {
                if (key.includes("groupClassName") && params[key].length == 0) {
                  if (typeof params["type-".concat(i)] != "undefined") {
                    if (params["type-".concat(i)] != "checkbox") {
                      params[key] = "form-group col-12";
                    } else {
                      params[key] = "form-group form-check col-12 checkbox-container";
                    }
                  } else {
                    params[key] = "form-group col-12";
                  }
                }

                if (key.includes("id")) {
                  var tmpArray = Object.keys(params).filter(el => el.includes("id-"));
                  var idExists = false;

                  if (tmpArray.length > 1) {
                    tmpArray.map(k => {
                      if (k != key && params[k] == params[key]) {
                        idExists = true;
                      }
                    });
                  }

                  if (idExists) {
                    inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, ({
                      "key": params[key] + "_".concat(i)
                    }, {
                      "id": params[key] + "_".concat(i)
                    }));
                  } else {
                    inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, ({
                      "key": params[key]
                    }, {
                      "id": params[key]
                    }));
                  }
                } else if (key.includes('name') && !key.includes('mname')) {
                  //check if name already exists, add int value if exists
                  var _tmpArray = Object.keys(params).filter(el => el.includes("name") && !el.includes("mname"));

                  var nameExists = false;

                  if (_tmpArray.length > 1) {
                    _tmpArray.map(k => {
                      if (k != key && params[k] == params[key]) {
                        nameExists = true;
                      }
                    });
                  }

                  if (nameExists) {
                    if (params["element-".concat(i)] == "ckEditor") {
                      inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                        "name": "ckEditor_" + params[key] + "_".concat(i)
                      });
                    } else if (params["element-".concat(i)] == "input" && params["type-".concat(i)] == "checkbox") {
                      inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                        "name": "boolean_" + params[key] + "_".concat(i)
                      });
                    } else {
                      inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                        "name": params[key] + "_".concat(i)
                      });
                    }
                  } else {
                    if (params["element-".concat(i)] == "ckEditor") {
                      inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                        "name": "ckEditor_" + params[key]
                      });
                    } else if (params["element-".concat(i)] == "input" && params["type-".concat(i)] == "checkbox") {
                      inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                        "name": "boolean_" + params[key]
                      });
                    } else {
                      inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                        "name": params[key]
                      });
                    }
                  }
                } else if (key.includes("values")) {
                  var _tmpArray2 = params[key].split(",");

                  var newValues = [];

                  _tmpArray2.map(val => {
                    newValues.push(val.replace(/\s/g, ""));
                  });

                  inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                    options: {
                      values: newValues,
                      translate: true
                    }
                  });
                } else if (key.includes("label") && !key.includes("pre")) {
                  if (typeof params["prelabel-".concat(i)] != "undefined" && Boolean(params["prelabel-".concat(i)])) {
                    inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                      "prelabel": params[key]
                    });
                    inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                      "placeholder": params[key]
                    });
                  } else {
                    inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                      "aplabel": params[key]
                    });
                    inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                      "placeholder": params[key]
                    });
                  }
                } else if (key.includes("onvalue")) {
                  inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                    "aplabel": params[key]
                  });
                } else if (!key.includes('element') && !key.includes('mname') && !key.includes("label")) {
                  inputsArray["".concat(i)].args = Object.assign({}, inputsArray["".concat(i)].args, {
                    [key.split("-")[0]]: params[key]
                  });
                } else {
                  inputsArray["".concat(i)][key.split("-")[0]] = params[key];
                }
              }
            } else {
              if (key != "ms") {
                if (key.includes('mname')) {
                  var _tmpArray3 = Object.keys(params).filter(el => el.includes("name") && !el.includes('mname'));

                  var _nameExists = false;

                  if (_tmpArray3.length > 1) {
                    _tmpArray3.map(k => {
                      if (k != "name-".concat(i) && params[k] == params["name-".concat(i)]) {
                        _nameExists = true;
                      }
                    });
                  }

                  if (_nameExists) {
                    inputsArray["".concat(i)][key.split("-")[0]] = params[key] + "_" + params["name-".concat(i)] + "_".concat(i);
                  } else {
                    inputsArray["".concat(i)][key.split("-")[0]] = params[key] + "_" + params["name-".concat(i)];
                  }
                }
              }
            }
          };

          for (var key in params) {
            _loop2(key);
          }
        };

        for (var i = 0; i <= count; i++) {
          _loop(i);
        }

        contentTypeFactory.createOrUpdateForm(params["mname"], inputsArray).then(() => {
          return res.status(200).send(Object.assign({}, {
            current: next
          }));
        });
    }
  },
  search_content_types: (route, req, res, prefix, next) => {
    var body = view_service.checkAccessRights(route, req, res, null, false);

    if (body != null && body.hasError) {
      if (typeof body.redirectUri != "undefined") {
        return res.status(403).send(Object.assign({}, {
          redirect: body.redirectUri
        }));
      }
    }

    switch (prefix) {
      case "search":
        searchContentTypes(route, req, res);
        break;

      default:
        return res.status(500).send({
          errorLabel: route.i18n.translate("Internal Server Error", route.lang)
        });
    }
  },
  searchContentTypes: (route, req, res) => {
    var contentTypeFactory = new ContentTypeFactory();
    var params = req.body;
    var sentence = typeof params.value != "undefined" && params.value.length > 0 ? params.value : null;
    contentTypeFactory.getContentTypes(sentence).then(result => {
      if (result == "Nothing found") {
        return res.status(404).send({
          errorLabel: route.i18n.translate(result, route.lang)
        });
      }

      return res.status(200).send([result]);
    });
  },
  getContentTypeName: content_type_id => {
    var contentTypeFactory = new ContentTypeFactory();
    return new Promise((resolve, reject) => {
      contentTypeFactory.getContentTypeName(content_type_id).then(result => {
        return resolve(result);
      });
    });
  }
};
var searchContentTypes = module.exports.searchContentTypes;