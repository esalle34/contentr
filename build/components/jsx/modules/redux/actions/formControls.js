"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeLabelText = exports.inputCreator = exports.checkboxCreator = exports.isMutatorCheckbox = exports.getDefaultCountry = exports.toggleInputVisibility = exports.CHANGE_LABEL_TEXT = exports.INPUT_CREATOR = exports.CHECKBOX_CREATOR = exports.IS_MUTATOR_CHECKBOX = exports.GET_DEFAULT_COUNTRY = exports.TOGGLE_INPUT_VISIBILITY = void 0;

var _index = require("../../../../../operations/modules/mandatory/i18n/services/index.js");

var TOGGLE_INPUT_VISIBILITY = "TOGGLE_INPUT_VISIBILITY";
exports.TOGGLE_INPUT_VISIBILITY = TOGGLE_INPUT_VISIBILITY;
var GET_DEFAULT_COUNTRY = "GET_DEFAULT_COUNTRY";
exports.GET_DEFAULT_COUNTRY = GET_DEFAULT_COUNTRY;
var IS_MUTATOR_CHECKBOX = "IS_MUTATOR_CHECKBOX";
exports.IS_MUTATOR_CHECKBOX = IS_MUTATOR_CHECKBOX;
var CHECKBOX_CREATOR = "CHECKBOX_CREATOR";
exports.CHECKBOX_CREATOR = CHECKBOX_CREATOR;
var INPUT_CREATOR = "INPUT_CREATOR";
exports.INPUT_CREATOR = INPUT_CREATOR;
var CHANGE_LABEL_TEXT = "CHANGE_LABEL_TEXT";
exports.CHANGE_LABEL_TEXT = CHANGE_LABEL_TEXT;

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

var changeLabelText = input => {
  var form_group = input.closest(".form-group");

  if (form_group.firstChild.tagName == "LABEL") {
    form_group.firstChild.innerText = input.value.split(/(\\|\/)/g).pop();
  }

  return {
    type: CHANGE_LABEL_TEXT
  };
};

exports.changeLabelText = changeLabelText;

var isMutatorCheckbox = checkbox => {
  //Récupération de la classe du/des partenaire(s) de la checkbox et changement effectué à partir de la deuxième classe restante:
  //La classe commence donc par check_ + classe cible, doit toujours être le dernier élément commençant par check et doit être suivi par la nouvelle classe à rajouter sur la cible !
  var interactive_classes = checkbox.classList.value.substring(checkbox.classList.value.lastIndexOf("check") + 6).split(' ');
  var partner_el_class = interactive_classes[0];
  var mutator_class = interactive_classes[1];
  var current_class; //Changement de la classe sur les cible, récupération de l'ancienne classe sur la checkbox (sensée être la même partout...)

  Array.from(document.getElementsByClassName(checkbox.classList.value.substring(checkbox.classList.value.lastIndexOf("check") + 6).split(' ')[0])).map(el => {
    var key = el.classList.value.split(' ').findIndex(className => className == partner_el_class) + 1;
    current_class = el.classList[key];
    el.classList.replace(el.classList[key], mutator_class);
  });
  checkbox.classList.replace(mutator_class, current_class);
  return {
    type: IS_MUTATOR_CHECKBOX
  };
}; //Création d'une checkbox à partir d'un select dans le template (cf. select.jsx)


exports.isMutatorCheckbox = isMutatorCheckbox;

var checkboxCreator = select => {
  var preInputRoot = select.parentNode.parentNode;
  var inputRoot = preInputRoot.parentNode;

  if (typeof inputRoot != "undefined") {
    var createdInputs = Array.from(inputRoot.children).filter(e => e.classList.contains("input-created") || e.classList.contains("checkbox-created"));

    if (typeof createdInputs != "undefined" && createdInputs.length > 0) {
      createdInputs.map(cInput => {
        if (cInput == preInputRoot.nextSibling) {
          cInput.remove();
        }
      });
    }
  }

  var dataset = JSON.parse(select.getAttribute("dataset"));
  var onChangeValues = dataset["checkbox-creator"]["on-values"].split("|");
  var checkbox = null; //Ici on choisit, si la checkbox existe, on la supprimme, sinon on la crée

  if (preInputRoot.nextSibling.firstChild.firstChild != null && preInputRoot.nextSibling.firstChild.firstChild.name != dataset["checkbox-creator"].name && onChangeValues.includes(select.value.toLowerCase().split("-")[1])) {
    var container = document.createElement('div');
    var subcontainer = document.createElement('div');
    container.id = "container-" + dataset["checkbox-creator"].id;
    container.classList = typeof dataset["checkbox-creator"]["groupClassName"] != "undefined" ? dataset["checkbox-creator"]["groupClassName"] : "form-group form-check col-12";
    var label;

    if (typeof dataset["checkbox-creator"].aplabel != "undefined" || typeof dataset["checkbox-creator"].prelabel != "undefined") {
      label = document.createElement("label");
      label.innerHTML = _index.i18n.translate(dataset["checkbox-creator"].aplabel) || _index.i18n.translate(dataset["checkbox-creator"].prelabel);
    }

    checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = dataset["checkbox-creator"].id;
    checkbox.name = dataset["checkbox-creator"].name;
    checkbox.classList = typeof dataset["checkbox-creator"].className != "undefined" ? dataset["checkbox-creator"].className : undefined;
    subcontainer.append(checkbox);
    container.append(subcontainer);

    if (typeof label != "undefined" && typeof dataset["checkbox-creator"].prelabel != "undefined") {
      subcontainer.prepend(label);
    } else if (typeof label != "undefined" && typeof dataset["checkbox-creator"].aplabel != "undefined") {
      subcontainer.append(label);
    }

    if (typeof select.parentNode.parentNode != "undefined") {
      preInputRoot.parentNode.insertBefore(container, preInputRoot.nextSibling);
    }
  }

  return {
    type: CHECKBOX_CREATOR,
    input: checkbox != null ? {
      el: checkbox,
      elgroup: checkbox.parentNode
    } : undefined
  };
}; //Création d'un champ à partir d'un autre champ (en général checkbox)


exports.checkboxCreator = checkboxCreator;

var inputCreator = input => {
  var newInput;
  var newInputClassList;
  var newInputObj;
  var preInputRoot;
  var inputRoot;
  var removed = false;

  if (input.type == "checkbox") {
    preInputRoot = input.parentNode.parentNode;
    newInputClassList = input.classList.value.substring(input.classList.value.indexOf("input-creator") + 14);
    newInputClassList = newInputClassList.split(" ");
    newInputClassList.map(kval => {
      kval = kval.split("::");
      newInputObj = Object.assign({}, newInputObj, {
        [kval[0]]: kval[1]
      });
    });
  } else if (input.tagName == "SELECT") {
    preInputRoot = input.parentNode.parentNode;
    newInputClassList = input.classList.value.substring(input.classList.value.indexOf("input-creator"), input.classList.value.indexOf("input-creator") + 13);
    newInputObj = JSON.parse(input.getAttribute("dataset"))[newInputClassList];
  }

  inputRoot = preInputRoot.parentNode;

  if (typeof inputRoot != "undefined") {
    var createdInputs = Array.from(inputRoot.children).filter(e => e.classList.contains("input-created") || e.classList.contains("checkbox-created"));

    if (typeof createdInputs != "undefined" && createdInputs.length > 0) {
      createdInputs.map(cInput => {
        if (cInput == preInputRoot.nextSibling) {
          cInput.remove();
          removed = !removed;
        }
      });
    }
  }

  var inputContainer = document.createElement("div");
  var inputGroup = document.createElement("div"); //Création d'un objet JSON à partir des différents token sur la classList du 1er input, les classes de la futur cible sont divisées par un |
  //Alors que les paires clé-valeur sont divisées par un ::

  inputContainer.classList = typeof newInputObj.groupClassName != "undefined" ? newInputObj.groupClassName.split("|").join(" ") : undefined;
  inputGroup.classList = "input-group";
  newInput = document.createElement("input");
  newInput.name = newInputObj.name;
  newInput.className = typeof newInputObj.className != "undefined" ? newInputObj.className.split("|").join(" ") : undefined;
  newInput.placeholder = typeof newInputObj.placeholder != "undefined" ? _index.i18n.translate(newInputObj.placeholder.split("-").join(" ")) : undefined;
  inputGroup.append(newInput);
  inputContainer.append(inputGroup); //On génère ou on supprimme la cible au niveau du prochain noeud, on détermine avec le pre/ap si la cible va se retrouver avant ou après

  if (typeof input.parentNode.parentNode != "undefined") {
    if (input.type == "checkbox") {
      if (newInputObj.mode == "ap" && preInputRoot.nextSibling.firstChild.firstChild.name != newInputObj.name && !removed) {
        inputRoot.insertBefore(inputContainer, preInputRoot.nextSibling);
      } else if (newInputObj.mode == "pre" && preInputRoot.previousSibling.firstChild.firstChild.name != newInputObj.name && !removed) {
        inputRoot.insertBefore(inputContainer, preInputRoot);
      }
    } else if (input.tagName == "SELECT") {
      if (newInputObj.mode == "ap" && preInputRoot.nextSibling.firstChild.firstChild.name != newInputObj.name) {
        inputRoot.insertBefore(inputContainer, preInputRoot.nextSibling);
      } else if (newInputObj.mode == "pre" && preInputRoot.previousSibling.firstChild.firstChild.name != newInputObj.name) {
        inputRoot.insertBefore(inputContainer, preInputRoot);
      }
    }
  }

  return {
    type: "INPUT_CREATOR"
  };
};

exports.inputCreator = inputCreator;