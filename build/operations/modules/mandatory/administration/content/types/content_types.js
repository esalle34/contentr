"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

//ContentType Object
//Author - Eric Salle
class ContentType extends Object {
  constructor(args) {
    super();
  }

  setMachineName(machine_name) {
    this.machine_name = machine_name;
  }

  getMachineName() {
    return this.machine_name;
  }

  setTemplateName(template_name) {
    this.template_name = template_name;
  }

  getTemplateName() {
    return this.template_name;
  }

}

var _default = ContentType;
exports.default = _default;