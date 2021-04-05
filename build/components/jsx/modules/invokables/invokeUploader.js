"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _theme = require("../../../../theme.js");

var _index = require("../../../../operations/modules/mandatory/i18n/services/index.js");

var _superagent = _interopRequireDefault(require("superagent"));

var _officeApp = require("../office-app.registry");

var _store = require("../redux/stores/store");

var _dropdown = _interopRequireDefault(require("../../templates/html/content/dropdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var InvokeUploader = args => {
  var list = (0, _theme.root_folder_list)();
  var root_folders = []; //Elements that will trigger ReactDOM.render

  var filelist = document.getElementById("file-list");
  var fileaction = document.getElementById("file-action-container"); //Constants

  var addFileServiceURI = "/administrate/form/request/post?fragment";
  var removeFileURI = "/administrate/uploads/files/remove";
  var browseFilesURI = "/administrate/uploads/search";
  var imagesExtensions = [".svg", ".png", ".webp", ".jp2", ".jdr", ".hdp", ".wdp", ".jpg", ".jpeg", ".gif"];
  var videosExtensions = [".mp4", ".avi", ".mpeg", ".mov"];
  var fileCodeExtensions = [".html", ".html", ".js", ".jsx", ".css", ".sass"];
  var fileExtensions = [".pdf", ".odt", ".csv", ".txt"];
  var lastFolder;
  var [form_view, setFormView] = (0, _react.useState)([]);

  var add = function add(type) {
    var folder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _superagent.default.post(addFileServiceURI).send({
      form_name: "add_" + type + "_form"
    }).then(res => {
      var form_container = document.getElementById("form-container");
      var f_input = document.getElementById("files");

      _reactDom.default.unmountComponentAtNode(form_container);

      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: res.text
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        id: "init-upload-form"
      })), form_container);

      var form = form_container.firstChild.firstChild;

      if (type == "file") {
        form.setAttribute("action", form.getAttribute("action").replace("/add*", folder == null ? "/add" + f_input.value : "/add" + folder));
      }

      var Form = _officeApp.officeRegistry["form"];

      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(Form, {
        key: "form-control-uploads",
        form: form_container.querySelector("form"),
        store: _store.store,
        displayFiles: folder => _displayFiles(folder)
      }), form_container.querySelector("#init-upload-form"));

      if (type == "folder") {
        var temp_input = document.createElement("input");
        temp_input.type = "hidden";
        temp_input.value = folder == null ? f_input.value : folder;
        temp_input.name = "folderpath";
        form.append(temp_input);
      }
    });
  };

  var enterFolder = path => {
    _displayFiles(path);
  };

  var removeFile = file => {
    _superagent.default.post(removeFileURI).send({
      file: file
    }).then(res => {
      _displayFiles(lastFolder);

      var f_input = document.getElementById("files");

      if (lastFolder != f_input.value) {
        lastFolder = undefined;
      }
    });
  };

  var _onChange = () => {
    _displayFiles();
  };

  var renderNothingFound = folder => {
    var f_input = document.getElementById("files"); //If nothing to render, file browser will display this

    _reactDom.default.unmountComponentAtNode(filelist);

    _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      key: "title-container-file-list",
      className: "col-12 title"
    }, /*#__PURE__*/_react.default.createElement("h3", {
      key: "title-file-list",
      className: "title p-border"
    }, _index.i18n.translate("File list"), f_input.value.length > 0 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("small", {
      className: "center w-small"
    }, _index.i18n.translate("Path"), " : ", folder != null ? folder : f_input.value)) : "")), lastFolder != folder && folder != null ? /*#__PURE__*/_react.default.createElement("div", {
      key: "container-back",
      className: "col-12"
    }, /*#__PURE__*/_react.default.createElement("a", {
      href: "#",
      key: "back-btn",
      className: "btn btn-secondary upload-back",
      key: "upload-go-to-upper-folder",
      onClick: () => enterFolder(lastFolder)
    }, _index.i18n.translate("Back"))) : undefined, /*#__PURE__*/_react.default.createElement("h3", {
      key: "nothing-found",
      className: "center info"
    }, _index.i18n.translate("No file was found"))), filelist);
  };

  var _displayFiles = function _displayFiles() {
    var folder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (folder == null) {
      lastFolder = undefined;
    }

    var f_input = document.getElementById("files");
    var file_actions = [];

    var file_actions_els = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("a", {
      key: "add-file-item",
      className: "dropdown-item",
      href: "#",
      onClick: () => add("folder", folder)
    }, _index.i18n.translate('Folder')), /*#__PURE__*/_react.default.createElement("a", {
      key: "add-folder-item",
      className: "dropdown-item",
      href: "#",
      onClick: () => add("file", folder)
    }, _index.i18n.translate('File')));

    file_actions = /*#__PURE__*/_react.default.createElement("div", {
      className: "file-action center"
    }, /*#__PURE__*/_react.default.createElement(_dropdown.default, {
      value: /*#__PURE__*/_react.default.createElement("i", {
        className: "fa-solid fa-plus",
        "aria-hidden": "true"
      }, _index.i18n.translate("Add")),
      innerTagElement: "a",
      id: "action-menu",
      dropDownClassName: "submenu",
      classes: "dropdown-item",
      els: file_actions_els
    }), /*#__PURE__*/_react.default.createElement("div", {
      id: "form-container",
      className: "form-container",
      dangerouslySetInnerHTML: {
        __html: form_view
      }
    }));

    _superagent.default.post(browseFilesURI).send({
      root_path: folder == null ? f_input.value : folder
    }).then(res => {
      var file_container = []; //Browser title and currentfilepath

      if (typeof res.body.message == "undefined") {
        file_container.push( /*#__PURE__*/_react.default.createElement("div", {
          key: "title-container-file-list",
          className: "col-12 title"
        }, /*#__PURE__*/_react.default.createElement("h3", {
          key: "title-file-list",
          className: "title p-border"
        }, _index.i18n.translate("File list"), f_input.value.length > 0 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("small", {
          className: "center w-small"
        }, _index.i18n.translate("Path"), " : ", folder != null ? folder : f_input.value)) : "")));

        if (typeof res.body != "undefined" && typeof res.body[0] != "undefined") {
          lastFolder = res.body[0].path;
        }

        if (typeof lastFolder != "undefined" && lastFolder != f_input.value) {
          file_container.push( /*#__PURE__*/_react.default.createElement("div", {
            key: "container-back",
            className: "col-12"
          }, /*#__PURE__*/_react.default.createElement("a", {
            href: "#",
            key: "back-btn",
            className: "btn btn-secondary upload-back",
            key: "upload-go-to-upper-folder",
            onClick: () => enterFolder(lastFolder.substring(0, lastFolder.lastIndexOf("/" + lastFolder.split("/").pop())))
          }, _index.i18n.translate("Back"))));
        }

        var hasFiles = false; //Browser elements

        res.body.map((file, index) => {
          //Each element may trigger different render styles and options
          //Folders
          if (file.extension.length == 0) {
            //Element Options and callback
            var link_tags = [];
            hasFiles = true;
            link_tags.push( /*#__PURE__*/_react.default.createElement("a", {
              className: "dropdown-item",
              href: "#",
              key: "upload-go-to-folder-".concat(index),
              onClick: () => enterFolder(file.path + "/" + file.filename),
              path: file.path + "/" + file.filename
            }, _index.i18n.translate("Enter")));
            link_tags.push( /*#__PURE__*/_react.default.createElement("a", {
              className: "dropdown-item",
              href: "#",
              key: "upload-remove-".concat(index),
              onClick: () => removeFile(file.path + "/" + file.filename)
            }, _index.i18n.translate("Remove")));
            file_container.push( /*#__PURE__*/_react.default.createElement("div", {
              className: f_input.value.indexOf("video") > -1 ? "col-8 col-sm-4 center f-col" : "col center f-col",
              key: "folder-container-".concat(index)
            }, /*#__PURE__*/_react.default.createElement("a", {
              key: "folder-link-".concat(index),
              className: f_input.value.indexOf("video") > -1 ? "upload-video-icon folder clickable" : "upload-icon clickable",
              onDoubleClick: () => enterFolder(file.path + "/" + file.filename)
            }, /*#__PURE__*/_react.default.createElement("i", {
              key: "folder-icon-".concat(index),
              className: "fa-solid fa-folder-open upload-folder",
              "aria-hidden": "true"
            })), /*#__PURE__*/_react.default.createElement("p", {
              key: "folder-title-".concat(index),
              className: "center b-word"
            }, file.filename), /*#__PURE__*/_react.default.createElement("div", {
              key: "folder-dropdown-".concat(index),
              className: "end-content"
            }, /*#__PURE__*/_react.default.createElement(_dropdown.default, {
              value: _index.i18n.translate("Options"),
              innerTagElement: "a",
              id: "link-menu-".concat(index),
              dropDownClassName: "submenu",
              classes: "dropdown-item",
              els: link_tags
            }))));
          } //Images


          if (imagesExtensions.includes(file.extension)) {
            //Element Options and callback
            var _link_tags = [];
            hasFiles = true;

            _link_tags.push( /*#__PURE__*/_react.default.createElement("a", {
              className: "dropdown-item",
              key: "upload-check-".concat(index),
              href: file.path + "/" + file.filename,
              target: "_blank"
            }, _index.i18n.translate("Overview")));

            _link_tags.push( /*#__PURE__*/_react.default.createElement("a", {
              className: "dropdown-item",
              key: "upload-dl-".concat(index),
              href: file.path + "/" + file.filename,
              download: file.filename
            }, _index.i18n.translate("Download")));

            _link_tags.push( /*#__PURE__*/_react.default.createElement("a", {
              className: "dropdown-item",
              href: "#",
              key: "upload-remove-".concat(index),
              onClick: () => removeFile(file.path + "/" + file.filename)
            }, _index.i18n.translate("Remove")));

            file_container.push( /*#__PURE__*/_react.default.createElement("div", {
              className: "col center f-col",
              key: "img-container-".concat(index)
            }, /*#__PURE__*/_react.default.createElement("a", {
              key: "image-link-".concat(index),
              className: "clickable",
              href: file.path + "/" + file.filename,
              target: "_blank"
            }, /*#__PURE__*/_react.default.createElement("img", {
              key: "image-image-".concat(index),
              className: "upload-icon",
              src: file.path + "/" + file.filename,
              key: "upload-img-".concat(index)
            })), /*#__PURE__*/_react.default.createElement("p", {
              key: "image-title-".concat(index),
              className: "center b-word"
            }, file.filename), /*#__PURE__*/_react.default.createElement("div", {
              key: "image-dropdown-".concat(index),
              className: "end-content"
            }, /*#__PURE__*/_react.default.createElement(_dropdown.default, {
              value: _index.i18n.translate("Options"),
              innerTagElement: "a",
              id: "link-menu-".concat(index),
              dropDownClassName: "submenu",
              classes: "dropdown-item",
              els: _link_tags
            }))));
          } //Videos


          if (videosExtensions.includes(file.extension)) {
            //Element Options and callback
            var _link_tags2 = [];
            hasFiles = true;

            _link_tags2.push( /*#__PURE__*/_react.default.createElement("a", {
              className: "dropdown-item",
              key: "upload-check-".concat(index),
              href: file.path + "/" + file.filename,
              target: "_blank"
            }, _index.i18n.translate("Overview")));

            _link_tags2.push( /*#__PURE__*/_react.default.createElement("a", {
              className: "dropdown-item",
              key: "upload-dl-".concat(index),
              href: file.path + "/" + file.filename,
              download: file.filename
            }, _index.i18n.translate("Download")));

            _link_tags2.push( /*#__PURE__*/_react.default.createElement("a", {
              className: "dropdown-item",
              href: "#",
              key: "upload-remove-".concat(index),
              onClick: () => removeFile(file.path + "/" + file.filename)
            }, _index.i18n.translate("Remove")));

            file_container.push( /*#__PURE__*/_react.default.createElement("div", {
              className: "col-8 col-sm-4 center f-col",
              key: "img-container-".concat(index)
            }, /*#__PURE__*/_react.default.createElement("video", {
              key: "video-video-".concat(index),
              className: "upload-video-icon",
              controls: true
            }, /*#__PURE__*/_react.default.createElement("source", {
              key: "video-src-".concat(index),
              src: file.path + "/" + file.filename,
              type: "video/".concat(file.extension.substring(1, file.extension.length))
            }), _index.i18n.translate('Your browser does not support the video tag')), /*#__PURE__*/_react.default.createElement("p", {
              key: "video-title-".concat(index),
              className: "center b-word"
            }, file.filename), /*#__PURE__*/_react.default.createElement("div", {
              key: "video-dropdown-".concat(index),
              className: "end-content"
            }, /*#__PURE__*/_react.default.createElement(_dropdown.default, {
              value: _index.i18n.translate("Options"),
              innerTagElement: "a",
              id: "link-menu-".concat(index),
              dropDownClassName: "submenu",
              classes: "dropdown-item",
              els: _link_tags2
            }))));
          } //File Code


          if (fileCodeExtensions.includes(file.extension)) {
            var _link_tags3 = [];
            hasFiles = true;

            _link_tags3.push( /*#__PURE__*/_react.default.createElement("a", {
              className: "dropdown-item",
              key: "upload-check-".concat(index),
              href: file.path + "/" + file.filename,
              target: "_blank"
            }, _index.i18n.translate("Overview")));

            _link_tags3.push( /*#__PURE__*/_react.default.createElement("a", {
              className: "dropdown-item",
              key: "upload-dl-".concat(index),
              href: file.path + "/" + file.filename,
              download: file.filename
            }, _index.i18n.translate("Download")));

            _link_tags3.push( /*#__PURE__*/_react.default.createElement("a", {
              className: "dropdown-item",
              href: "#",
              key: "upload-remove-".concat(index),
              onClick: () => removeFile(file.path + "/" + file.filename)
            }, _index.i18n.translate("Remove")));

            file_container.push( /*#__PURE__*/_react.default.createElement("div", {
              className: "col-8 col-sm-4 center f-col",
              key: "img-container-".concat(index)
            }, /*#__PURE__*/_react.default.createElement("a", {
              key: "file-link-".concat(index),
              className: f_input.value.indexOf("video") > -1 ? "upload-video-icon file-code clickable" : "upload-icon file-code clickable",
              href: file.path + "/" + file.filename,
              target: "_blank"
            }, /*#__PURE__*/_react.default.createElement("i", {
              key: "file-icon-".concat(index),
              className: "fa-regular fa-file-code file-code",
              "aria-hidden": "true"
            })), /*#__PURE__*/_react.default.createElement("p", {
              key: "file-title-".concat(index),
              className: "center b-word"
            }, file.filename), /*#__PURE__*/_react.default.createElement("div", {
              key: "file-dropdown-".concat(index),
              className: "end-content"
            }, /*#__PURE__*/_react.default.createElement(_dropdown.default, {
              value: _index.i18n.translate("Options"),
              innerTagElement: "a",
              id: "link-menu-".concat(index),
              dropDownClassName: "submenu",
              classes: "dropdown-item",
              els: _link_tags3
            }))));
          }

          if (fileExtensions.includes(file.extension)) {
            var _link_tags4 = [];
            hasFiles = true;

            _link_tags4.push( /*#__PURE__*/_react.default.createElement("a", {
              className: "dropdown-item",
              key: "upload-check-".concat(index),
              href: file.path + "/" + file.filename,
              target: "_blank"
            }, _index.i18n.translate("Overview")));

            _link_tags4.push( /*#__PURE__*/_react.default.createElement("a", {
              className: "dropdown-item",
              key: "upload-dl-".concat(index),
              href: file.path + "/" + file.filename,
              download: file.filename
            }, _index.i18n.translate("Download")));

            _link_tags4.push( /*#__PURE__*/_react.default.createElement("a", {
              className: "dropdown-item",
              href: "#",
              key: "upload-remove-".concat(index),
              onClick: () => removeFile(file.path + "/" + file.filename)
            }, _index.i18n.translate("Remove")));

            file_container.push( /*#__PURE__*/_react.default.createElement("div", {
              className: "col-8 col-sm-4 center f-col",
              key: "img-container-".concat(index)
            }, /*#__PURE__*/_react.default.createElement("a", {
              key: "file-link-".concat(index),
              className: f_input.value.indexOf("video") > -1 ? "upload-video-icon file clickable" : "upload-icon file clickable",
              href: file.path + "/" + file.filename,
              target: "_blank"
            }, /*#__PURE__*/_react.default.createElement("i", {
              key: "file-icon-".concat(index),
              className: "fa-regular fa-file file-code",
              "aria-hidden": "true"
            })), /*#__PURE__*/_react.default.createElement("p", {
              key: "file-title-".concat(index),
              className: "center b-word"
            }, file.filename), /*#__PURE__*/_react.default.createElement("div", {
              key: "file-dropdown-".concat(index),
              className: "end-content"
            }, /*#__PURE__*/_react.default.createElement(_dropdown.default, {
              value: _index.i18n.translate("Options"),
              innerTagElement: "a",
              id: "link-menu-".concat(index),
              dropDownClassName: "submenu",
              classes: "dropdown-item",
              els: _link_tags4
            }))));
          }
        });

        if (f_input.value.indexOf("video") > -1) {
          file_container.push( /*#__PURE__*/_react.default.createElement("div", {
            key: "video-bg",
            className: "video-bg"
          }));
        } else if (f_input.value.indexOf("image") > -1) {
          file_container.push( /*#__PURE__*/_react.default.createElement("div", {
            key: "img-bg",
            className: "img-bg"
          }));
        }

        if (hasFiles) {
          _reactDom.default.unmountComponentAtNode(filelist);

          _reactDom.default.render(file_container, filelist);
        } else {
          renderNothingFound(folder);
        }
      }
    }).catch(err => {
      renderNothingFound(folder);
    });

    if (f_input.value.length > 0) {
      _reactDom.default.unmountComponentAtNode(fileaction);

      _reactDom.default.render(file_actions, fileaction);
    } else {
      _reactDom.default.unmountComponentAtNode(fileaction);
    }
  };

  root_folders.push( /*#__PURE__*/_react.default.createElement("option", {
    key: "key-default-value",
    id: "key-default-value",
    value: ""
  }, _index.i18n.translate('Files')));
  Object.values(list).map(folders => {
    root_folders.push( /*#__PURE__*/_react.default.createElement("option", {
      key: "key-".concat(folders.title),
      id: "key-".concat(folders.title),
      value: folders.uri
    }, folders.title.charAt(0).toUpperCase() + folders.title.slice(1)));
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "files"
  }, _index.i18n.translate('Files')), /*#__PURE__*/_react.default.createElement("div", {
    className: "choose-folder"
  }, /*#__PURE__*/_react.default.createElement("select", {
    id: "files",
    name: "files",
    className: "form-control col-12",
    onChange: () => {
      _onChange();
    }
  }, root_folders)));
};

var _default = InvokeUploader;
exports.default = _default;