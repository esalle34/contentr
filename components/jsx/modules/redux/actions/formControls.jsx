const INVOKE_UPLOADER_W_SELECT = "INVOKE_UPLOADER_W_SELECT";
const INVOKE_CKEDITOR = "INVOKE_CKEDITOR";
const TOGGLE_INPUT_VISIBILITY = "TOGGLE_INPUT_VISIBILITY";
const INPUT_STATE_CHANGED = "INPUT_STATE_CHANGED";
const GET_DEFAULT_COUNTRY = "GET_DEFAULT_COUNTRY";
const IS_MUTATOR_CHECKBOX = "IS_MUTATOR_CHECKBOX";
const CHECKBOX_CREATOR = "CHECKBOX_CREATOR";
const INPUT_CREATOR = "INPUT_CREATOR";
const CHANGE_LABEL_TEXT = "CHANGE_LABEL_TEXT";

import ReactDOM from "react-dom";
import React from "react";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index.js";
import { invokables } from "~/components/jsx/modules/invokables/invokables.registry.jsx";

export { INVOKE_UPLOADER_W_SELECT, INVOKE_CKEDITOR, TOGGLE_INPUT_VISIBILITY, INPUT_STATE_CHANGED, GET_DEFAULT_COUNTRY, IS_MUTATOR_CHECKBOX, CHECKBOX_CREATOR, INPUT_CREATOR, CHANGE_LABEL_TEXT };

const invokeUploaderWithSelectValue = (input)=>{



	return { type : INVOKE_UPLOADER_W_SELECT };

}

const invokeCkEditor = (input)=>{

	let CkEditor = invokables["InvokeCkEditor"];
	
	ReactDOM.render(
		<CkEditor />,
		input.previousSibling
	)

	return { type : INVOKE_CKEDITOR };

}

const toggleInputVisibility = (input) => {

	let newInput_type;
	let input_type = input.getAttribute("type");
	newInput_type = input_type == "password" ? "text" : "password";


	return { type: TOGGLE_INPUT_VISIBILITY, input_type: newInput_type };

}

const inputStateChanged = (input) => {

	if(input.value.length > 0){

		if(input.parentNode.previousSibling != null && input.parentNode.previousSibling.tagName == "LABEL"){

			input.parentNode.previousSibling.classList.remove("invisible");

		}else if(input.parentNode.nextSibling != null && input.parentNode.nextSibling.tagName == "LABEL"){
			
			input.parentNode.nextSibling.classList.remove("invisible");

		}
	}else{
		if(input.parentNode.previousSibling.tagName == "LABEL"){

			input.parentNode.previousSibling.classList.add("invisible");

		}else if(input.parentNode.nextSibling.tagName == "LABEL"){

			input.parentNode.nextSibling.classList.add("invisible");

		}
	}

}

const getDefaultCountry = (select) => {

	const selectedDefaultCountry = Array.from(select.children).find(child => (child.value == i18n.getDocLang().substring(3)));
	selectedDefaultCountry.selected = "selected";

	return { type: GET_DEFAULT_COUNTRY };

}

const changeLabelText = (input)=>{

	let form_group = input.closest(".form-group")

	if(form_group.firstChild.tagName == "LABEL"){

		form_group.firstChild.innerText = input.value.split(/(\\|\/)/g).pop();

	}

	return { type: CHANGE_LABEL_TEXT };

}


const isMutatorCheckbox = (checkbox) => {

	//Récupération de la classe du/des partenaire(s) de la checkbox et changement effectué à partir de la deuxième classe restante:
	//La classe commence donc par check_ + classe cible, doit toujours être le dernier élément commençant par check et doit être suivi par la nouvelle classe à rajouter sur la cible !
	let interactive_classes = checkbox.classList.value.substring(checkbox.classList.value.lastIndexOf("check") + 6).split(' ');
	let partner_el_class = interactive_classes[0];
	let mutator_class = interactive_classes[1];
	let current_class;

	//Changement de la classe sur les cible, récupération de l'ancienne classe sur la checkbox (sensée être la même partout...)
	Array.from(document.getElementsByClassName(checkbox.classList.value.substring(checkbox.classList.value.lastIndexOf("check") + 6).split(' ')[0])).map(el => {

		let key = el.classList.value.split(' ').findIndex((className) => className == partner_el_class) + 1;
		current_class = el.classList[key];
		el.classList.replace(el.classList[key], mutator_class);

	});
	checkbox.classList.replace(mutator_class, current_class)

	return { type: IS_MUTATOR_CHECKBOX }
}

//Création d'une checkbox à partir d'un select dans le template (cf. select.jsx)
const checkboxCreator = (select) => {

	let preInputRoot = select.parentNode.parentNode;
	let inputRoot = preInputRoot.parentNode;
	if(typeof inputRoot != "undefined"){
		
		let createdInputs = Array.from(inputRoot.children).filter(e=>(e.classList.contains("input-created") || e.classList.contains("checkbox-created")));
		
		if(typeof createdInputs != "undefined" && createdInputs.length > 0){
			createdInputs.map(cInput=>{
				if(cInput == preInputRoot.nextSibling){
					cInput.remove();
				}
			})
		}
	}

	let dataset = JSON.parse(select.getAttribute("dataset"));
	let onChangeValues = dataset["checkbox-creator"]["on-values"].split("|");
	let checkbox = null;
	//Ici on choisit, si la checkbox existe, on la supprimme, sinon on la crée
	if (preInputRoot.nextSibling.firstChild.firstChild != null && preInputRoot.nextSibling.firstChild.firstChild.name != dataset["checkbox-creator"].name && onChangeValues.includes(select.value.toLowerCase().split("-")[1])) {

		let container = document.createElement('div');
		let subcontainer = document.createElement('div');
		container.id = "container-" + dataset["checkbox-creator"].id;
		container.classList = typeof dataset["checkbox-creator"]["groupClassName"] != "undefined" ? dataset["checkbox-creator"]["groupClassName"] : "form-group form-check col-12";

		let label;
		if (typeof dataset["checkbox-creator"].aplabel != "undefined" || typeof dataset["checkbox-creator"].prelabel != "undefined") {
			label = document.createElement("label");
			label.innerHTML = i18n.translate(dataset["checkbox-creator"].aplabel) || i18n.translate(dataset["checkbox-creator"].prelabel);
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

	return { type: CHECKBOX_CREATOR, input: checkbox != null ? { el: checkbox, elgroup: checkbox.parentNode } : undefined }
}

//Création d'un champ à partir d'un autre champ (en général checkbox)
const inputCreator = (input) => {

	let newInput;
	let newInputClassList;
	let newInputObj;
	let preInputRoot;
	let inputRoot;
	let removed = false;
	if (input.type == "checkbox") {
		preInputRoot = input.parentNode.parentNode;
		newInputClassList = input.classList.value.substring(input.classList.value.indexOf("input-creator") + 14);
		newInputClassList = newInputClassList.split(" ");
		newInputClassList.map(kval => {
			kval = kval.split("::");
			newInputObj = Object.assign({}, newInputObj, { [kval[0]]: kval[1] });
		})
	} else if (input.tagName == "SELECT") {
		preInputRoot = input.parentNode.parentNode;
		newInputClassList = input.classList.value.substring(input.classList.value.indexOf("input-creator"), input.classList.value.indexOf("input-creator") + 13);
		newInputObj = JSON.parse(input.getAttribute("dataset"))[newInputClassList]
	}

	inputRoot = preInputRoot.parentNode;
	if(typeof inputRoot != "undefined"){
		
		let createdInputs = Array.from(inputRoot.children).filter(e=>(e.classList.contains("input-created") || e.classList.contains("checkbox-created")));
		
		if(typeof createdInputs != "undefined" && createdInputs.length > 0){
			createdInputs.map(cInput=>{
				if(cInput == preInputRoot.nextSibling){
					
					cInput.remove();
					removed = !removed;

				}
			})
		}
	}

	let inputContainer = document.createElement("div");
	let inputGroup = document.createElement("div");
	//Création d'un objet JSON à partir des différents token sur la classList du 1er input, les classes de la futur cible sont divisées par un |
	//Alors que les paires clé-valeur sont divisées par un ::
	inputContainer.classList = typeof newInputObj.groupClassName != "undefined" ? newInputObj.groupClassName.split("|").join(" ") : undefined;
	inputGroup.classList = "input-group";
	newInput = document.createElement("input");
	newInput.name = newInputObj.name;
	newInput.className = typeof newInputObj.className != "undefined" ? newInputObj.className.split("|").join(" ") : undefined;
	newInput.placeholder = typeof newInputObj.placeholder != "undefined" ? i18n.translate(newInputObj.placeholder.split("-").join(" ")) : undefined;
	inputGroup.append(newInput);
	inputContainer.append(inputGroup);

	//On génère ou on supprimme la cible au niveau du prochain noeud, on détermine avec le pre/ap si la cible va se retrouver avant ou après
	if (typeof input.parentNode.parentNode != "undefined") {
		if (input.type == "checkbox") {

			if (newInputObj.mode == "ap" && preInputRoot.nextSibling.firstChild.firstChild.name != newInputObj.name && !removed) {
				inputRoot.insertBefore(inputContainer, preInputRoot.nextSibling);
			} else if (newInputObj.mode == "pre" && preInputRoot.previousSibling.firstChild.firstChild.name != newInputObj.name && !removed) {
				inputRoot.insertBefore(inputContainer, preInputRoot);
			}

		}else if(input.tagName == "SELECT"){

			if (newInputObj.mode == "ap" && preInputRoot.nextSibling.firstChild.firstChild.name != newInputObj.name) {
				inputRoot.insertBefore(inputContainer, preInputRoot.nextSibling);
			} else if (newInputObj.mode == "pre" && preInputRoot.previousSibling.firstChild.firstChild.name != newInputObj.name) {
				inputRoot.insertBefore(inputContainer, preInputRoot);
			}
		}
	}


	return { type: "INPUT_CREATOR" };

}

export { invokeUploaderWithSelectValue, invokeCkEditor,  toggleInputVisibility, inputStateChanged, getDefaultCountry, isMutatorCheckbox, checkboxCreator, inputCreator, changeLabelText };