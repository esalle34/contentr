"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Content = void 0;

//Author - Eric Salle
class Content extends Object {
  constructor(args) {
    super();
  }

  setUri(uri) {
    this.uri = uri;
  }

  getUri() {
    return this.uri;
  }

  setRootId(root_id) {
    this.root_id = root_id;
  }

  getRootId() {
    return this.root_id;
  }

  setValue(feature) {
    this.value = feature.split("_")[1];
  }

  getValue() {
    return this.value;
  }

  setFeature(feature) {
    this.feature = feature;
  }

  getFeature() {
    return this.feature;
  }

}

exports.Content = Content;