"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Content = void 0;

//Content Object
//Author - Eric Salle
class Content extends Object {
  constructor(args) {
    super();
  }

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setArgs(args) {
    this.args = args;
  }

  getArgs() {
    return this.args;
  }

  setElement(template_name) {
    this.react_element = template_name;
  }

  getElement() {
    return this.react_element;
  }

  setMachineName(machine_name) {
    this.machine_name = machine_name;
  }

  getMachineName() {
    return this.machine_name;
  }

  setLastModifiedAt(lastModifiedAt) {
    this.lastModifiedAt = lastModifiedAt;
  }

  getLastModifiedAt() {
    return this.lastModifiedAt;
  }

  setCreatedAt(createdAt) {
    this.createdAt = createdAt;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  setReactNested(react_nested) {
    this.react_nested = react_nested;
  }

  getReactNested() {
    return this.react_nested;
  }

}

exports.Content = Content;