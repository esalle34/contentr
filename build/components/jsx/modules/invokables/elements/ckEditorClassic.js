'use strict'; // The editor creator to use.

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classiceditor = _interopRequireDefault(require("@ckeditor/ckeditor5-editor-classic/src/classiceditor"));

var _essentials = _interopRequireDefault(require("@ckeditor/ckeditor5-essentials/src/essentials"));

var _autoformat = _interopRequireDefault(require("@ckeditor/ckeditor5-autoformat/src/autoformat"));

var _bold = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/bold"));

var _italic = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/italic"));

var _heading = _interopRequireDefault(require("@ckeditor/ckeditor5-heading/src/heading"));

var _link = _interopRequireDefault(require("@ckeditor/ckeditor5-link/src/link"));

var _list = _interopRequireDefault(require("@ckeditor/ckeditor5-list/src/list"));

var _paragraph = _interopRequireDefault(require("@ckeditor/ckeditor5-paragraph/src/paragraph"));

var _underline = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/underline"));

var _strikethrough = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/strikethrough"));

var _code = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/code"));

var _subscript = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/subscript"));

var _superscript = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/superscript"));

var _htmlembed = _interopRequireDefault(require("@ckeditor/ckeditor5-html-embed/src/htmlembed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClassicEditor extends _classiceditor.default {} // Plugins to include in the build.


exports.default = ClassicEditor;
ClassicEditor.builtinPlugins = [_htmlembed.default, _bold.default, _italic.default, _underline.default, _strikethrough.default, _code.default, _subscript.default, _superscript.default, _essentials.default, _autoformat.default, _bold.default, _italic.default, _heading.default, _link.default, _list.default, _paragraph.default];
ClassicEditor.defaultConfig = {
  toolbar: ['heading', '|', 'htmlEmbed', '|', 'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'fr'
};