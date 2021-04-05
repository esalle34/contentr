"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templates = void 0;

var _getUploadView = _interopRequireDefault(require("./getUploadView"));

var _fileSelect = _interopRequireDefault(require("./fileSelect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templates = {
  getUploadView: _getUploadView.default,
  fileSelect: _fileSelect.default
};
exports.templates = templates;