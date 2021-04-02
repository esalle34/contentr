"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GetUploadView = args => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "container first-content backoffice-panel",
    key: "upload-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "row justify-content-center",
    key: "upload-row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12",
    key: "title"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "title p-border"
  }, args.tr_title)), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-6",
    key: "upload-col"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "uploader",
    id: "uploader",
    key: "uploader"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "file-action-container",
    className: "col-12 col-sm-4 file-action-container"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-12 col-sm-8 file-list-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "file-list",
    className: "row justify-content-center file-list"
  })))));
};

var _default = GetUploadView;
exports.default = _default;