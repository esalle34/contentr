"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.panels = void 0;

var _uriDeletePanels = _interopRequireDefault(require("./uriDeletePanels"));

var _uriEditPanels = _interopRequireDefault(require("./uriEditPanels"));

var _headerEditPanels = _interopRequireDefault(require("./headerEditPanels"));

var _headerRouteSelect = _interopRequireDefault(require("./elements/headerRouteSelect"));

var _contentCreatePanel = _interopRequireDefault(require("./contentCreatePanel"));

var _contentEditPanel = _interopRequireDefault(require("./contentEditPanel"));

var _contentRemovePanel = _interopRequireDefault(require("./contentRemovePanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var panels = {
  uriDeletePanels: _uriDeletePanels.default,
  uriEditPanels: _uriEditPanels.default,
  headerEditPanels: _headerEditPanels.default,
  headerRouteSelect: _headerRouteSelect.default,
  createContent: _contentCreatePanel.default,
  editContent: _contentEditPanel.default,
  removeContent: _contentRemovePanel.default
};
exports.panels = panels;