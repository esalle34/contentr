'use strict'; //Author - Eric Salle
//Bootstrap 3.3.5

require("./vendors/bootstrap.min.js");

var _lazyloadMin = _interopRequireDefault(require("./vendors/lazyload.min.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Lazyload 16.1.0
document.addEventListener("DOMContentLoaded", function () {
  var lazyLoadInstance = new _lazyloadMin.default({
    elements_selector: ".lazy" // ... more custom settings?

  });
});