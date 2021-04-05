"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ckeditor5React = require("@ckeditor/ckeditor5-react");

var _ckEditorClassic = _interopRequireDefault(require("./elements/ckEditorClassic"));

var _index = require("../../../../operations/modules/mandatory/i18n/services/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvokeCkEditor = args => {
  return /*#__PURE__*/_react.default.createElement(_ckeditor5React.CKEditor, {
    editor: _ckEditorClassic.default,
    data: typeof args.data != "undefined" ? args.data : undefined,
    onChange: (event, editor) => {
      var data = editor.getData();
      editor.sourceElement.closest(".ckEditor").nextSibling.value = data;
    }
  });
};

var _default = InvokeCkEditor;
exports.default = _default;