"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMutatorCheckbox = exports.getDefaultCountry = exports.toggleInputVisibility = exports.IS_MUTATOR_CHECKBOX = exports.GET_DEFAULT_COUNTRY = exports.TOGGLE_INPUT_VISIBILITY = void 0;

var _index = require("../../../../../operations/modules/mandatory/i18n/services/index.js");

var TOGGLE_INPUT_VISIBILITY = "TOGGLE_INPUT_VISIBILITY";
exports.TOGGLE_INPUT_VISIBILITY = TOGGLE_INPUT_VISIBILITY;
var GET_DEFAULT_COUNTRY = "GET_DEFAULT_COUNTRY";
exports.GET_DEFAULT_COUNTRY = GET_DEFAULT_COUNTRY;
var IS_MUTATOR_CHECKBOX = "IS_MUTATOR_CHECKBOX";
exports.IS_MUTATOR_CHECKBOX = IS_MUTATOR_CHECKBOX;

var toggleInputVisibility = input => {
  var newInput_type;
  var input_type = input.getAttribute("type");
  newInput_type = input_type == "password" ? "text" : "password";
  return {
    type: TOGGLE_INPUT_VISIBILITY,
    input_type: newInput_type
  };
};

exports.toggleInputVisibility = toggleInputVisibility;

var getDefaultCountry = select => {
  var selectedDefaultCountry = Array.from(select.children).find(child => child.value == _index.i18n.getDocLang().substring(3));
  selectedDefaultCountry.selected = "selected";
  return {
    type: GET_DEFAULT_COUNTRY
  };
};

exports.getDefaultCountry = getDefaultCountry;

var isMutatorCheckbox = checkbox => {
  console.log(checkbox.name + " was just checked !"); //Récupération de la classe du/des partenaire(s) de la checkbox et changement effectué à partir de la deuxième classe restante:
  //La classe commence donc par check_ + classe cible, doit toujours être le dernier élément commençant par check et doit être suivi par la nouvelle classe à rajouter sur la cible !

  var interactive_classes = checkbox.classList.value.substring(checkbox.classList.value.lastIndexOf("check") + 6).split(' ');
  var partner_el_class = interactive_classes[0];
  var mutator_class = interactive_classes[1];
  var current_class; //Changement de la classe sur les cible, récupération de l'ancienne classe sur la checkbox (sensée être la même partout...)

  Array.from(document.getElementsByClassName(checkbox.classList.value.substring(checkbox.classList.value.lastIndexOf("check") + 6).split(' ')[0])).map(el => {
    console.log(partner_el_class);
    var key = el.classList.value.split(' ').findIndex(className => className == partner_el_class) + 1;
    current_class = el.classList[key];
    el.classList.replace(el.classList[key], mutator_class);
  });
  checkbox.classList.replace(mutator_class, current_class);
  return {
    type: IS_MUTATOR_CHECKBOX
  };
};

exports.isMutatorCheckbox = isMutatorCheckbox;