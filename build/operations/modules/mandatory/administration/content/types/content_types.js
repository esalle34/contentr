"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentType = void 0;

//ContentType Object
//Author - Eric Salle
class ContentType extends Object {
  constructor(args) {
    super();
  }

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
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

exports.ContentType = ContentType;