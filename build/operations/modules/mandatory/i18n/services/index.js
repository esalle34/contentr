"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18n = void 0;

var _i18n = require("../i18n.registry");

var _global = _interopRequireDefault(require("../../../../../global"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Author - Eric Salle
var i18n = {
  getLang: function getLang() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (typeof lang == "undefined") {
      return (0, _global.default)().DEFAULT_SITE_LANGUAGE;
    } else if (lang == null || lang == "*") {
      var search = Object.keys(_i18n.i18nRegistry).find(l => l == lang);

      if (typeof search == "undefined" || search == -1) {
        return search = (0, _global.default)().DEFAULT_SITE_LANGUAGE;
      }

      if (typeof i18n.getDocLang() != "undefined") {
        return i18n.getDocLang();
      } else {
        return (0, _global.default)().DEFAULT_SITE_LANGUAGE;
      }
    } else {
      var _search = Object.keys(_i18n.i18nRegistry).find(l => l == lang);

      if (typeof _search == "undefined" || _search == -1) {
        _search = (0, _global.default)().DEFAULT_SITE_LANGUAGE;
      }

      return _search;
    }
  },
  getDocLang: () => {
    var lang = typeof document != "undefined" ? document.getElementsByTagName("HTML")[0].getAttribute("lang") : undefined;
    return lang;
  },
  translate: function translate(string) {
    var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    try {
      var tr_string = _i18n.i18nRegistry[i18n.getLang(lang)][string];

      if (typeof tr_string == "undefined") {
        return string;
      }

      return tr_string;
    } catch (error) {
      console.log(error);
    }
  },
  translateN: function translateN(string, int) {
    var lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var tr_string;

    try {
      if (int > 0) {
        tr_string = _i18n.i18nRegistry[i18n.getLang(lang)][string]['other'].replace("%s", int);
      } else {
        tr_string = _i18n.i18nRegistry[i18n.getLang(lang)][string]['one'].replace("%s", int);
      }

      if (typeof tr_string == "undefined") {
        return string;
      }

      return tr_string;
    } catch (error) {
      console.log(error);
    }
  }
};
exports.i18n = i18n;