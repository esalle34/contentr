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

    if (lang == null || lang == "*") {
      if (typeof i18n.getDocLang() != "undefined") {
        return i18n.getDocLang();
      } else {
        return _global.default.DEFAULT_SITE_LANGUAGE;
      }
    } else {
      return lang;
    }
  },
  getDocLang: () => {
    var lang = typeof document != "undefined" ? document.getElementsByTagName("HTML")[0].getAttribute("lang") : undefined;
    return lang;
  },
  translate: function translate(string) {
    var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var tr_string = _i18n.i18nRegistry[i18n.getLang(lang)][string];

    if (typeof tr_string == "undefined") {
      console.error("This message : '" + string + "' has no translation yet, please add it.");
      return undefined;
    }

    return tr_string;
  },
  translateN: function translateN(string, int) {
    var lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var tr_string = undefined;

    if (int > 0) {
      tr_string = _i18n.i18nRegistry[i18n.getLang(lang)][string]['other'].replace("%s", int);
    } else {
      tr_string = _i18n.i18nRegistry[i18n.getLang(lang)][string]['one'].replace("%s", int);
    }

    if (typeof tr_string == "undefined") {
      console.error("This message has no translation yet, please add it.");
      return undefined;
    }

    return tr_string;
  }
};
exports.i18n = i18n;