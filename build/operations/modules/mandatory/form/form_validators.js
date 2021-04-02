"use strict";

module.exports = () => {
  var _validators = {
    name: function name(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var minlength;

      if (options != null) {
        minlength = options.substring(options.indexOf("length") + 7);
      }

      var noBlankValue = value.replace(/\s/g, '');

      if (noBlankValue.length == 0) {
        return Object.assign({}, {
          isValid: false,
          errorLabel: "Name field is empty"
        });
      } else if (typeof minlength != "undefined" && noBlankValue.length < minlength) {
        return Object.assign({}, {
          isValid: false,
          errorLabel: "Number of characters doesn't match in name field"
        });
      }

      return Object.assign({}, {
        isValid: true
      });
    },
    theme: function theme(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var noBlankValue = value.replace(/\s/g, '');

      if (noBlankValue.length == 0) {
        return Object.assign({}, {
          isValid: false,
          errorLabel: "A theme must be selected"
        });
      }

      return Object.assign({}, {
        isValid: true
      });
    },
    method: function method(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var noBlankValue = value.replace(/\s/g, '');

      if (noBlankValue.length == 0) {
        return Object.assign({}, {
          isValid: false,
          errorLabel: "A content type must be selected"
        });
      }

      return Object.assign({}, {
        isValid: true
      });
    },
    feature: function feature(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var minlength;

      if (options != null) {
        minlength = options.substring(options.indexOf("length") + 7);
      }

      var noBlankValue = value.replace(/\s/g, '');

      if (noBlankValue.length == 0) {
        return Object.assign({}, {
          isValid: false,
          errorLabel: "Feature field is empty"
        });
      } else if (typeof minlength != "undefined" && noBlankValue.length < minlength) {
        return Object.assign({}, {
          isValid: false,
          errorLabel: "Number of characters doesn't match in feature field"
        });
      }

      return Object.assign({}, {
        isValid: true
      });
    },
    template: function template(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return _validators.feature(value, options);
    },
    title: function title(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var minlength;

      if (options != null) {
        minlength = options.substring(options.indexOf("length") + 7);
      }

      var noBlankValue = value.replace(/\s/g, '');

      if (noBlankValue.length == 0) {
        return Object.assign({}, {
          isValid: false,
          errorLabel: "Title field is empty"
        });
      } else if (typeof minlength != "undefined" && noBlankValue.length < minlength) {
        return Object.assign({}, {
          isValid: false,
          errorLabel: "Number of characters doesn't match in feature field"
        });
      }

      return Object.assign({}, {
        isValid: true
      });
    },
    contentid: function contentid(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var noBlankValue = value.replace(/\s/g, '');

      if (noBlankValue.length == 0) {
        return Object.assign({}, {
          isValid: false,
          errorLabel: "Id field is empty"
        });
      }

      return Object.assign({}, {
        isValid: true
      });
    },
    uri: function uri(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var noBlankValue = value.replace(/\s/g, '');

      if (noBlankValue.length == 0) {
        return Object.assign({}, {
          isValid: false,
          errorLabel: "Link field is empty"
        });
      }

      if (!value.match(/^\/(?=[a-zA-Z0-9~@#$^*()/_+=[\]{}|\\,.?:-]*$)(?!.*[<>'";`%])?/i) && !value.match("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})")) {
        return Object.assign({}, {
          isValid: false,
          errorLabel: "Link is not standard"
        });
      }

      return Object.assign({}, {
        isValid: true
      });
    }
  };
  return _validators;
};