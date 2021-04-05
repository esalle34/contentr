"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invokables = void 0;

var _invokeTheme = _interopRequireDefault(require("./invokeTheme"));

var _invokeRoles = _interopRequireDefault(require("./invokeRoles"));

var _invokeUploader = _interopRequireDefault(require("./invokeUploader"));

var _invokeFormBuilder = _interopRequireDefault(require("./invokeFormBuilder"));

var _invokeCkEditor = _interopRequireDefault(require("./invokeCkEditor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invokables = {
  invokeTheme: _invokeTheme.default,
  invokeRoles: _invokeRoles.default,
  invokeUploader: _invokeUploader.default,
  invokeFormBuilder: _invokeFormBuilder.default,
  InvokeCkEditor: _invokeCkEditor.default
};
exports.invokables = invokables;