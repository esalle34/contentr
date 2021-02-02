import {TOGGLE_INPUT_VISIBILITY , toggleInputVisibility} from "../actions/formControls";
import {GET_DEFAULT_COUNTRY, getDefaultCountry} from "../actions/formControls";
import {IS_MUTATOR_CHECKBOX, isMutatorCheckbox} from "../actions/formControls";
import {CHECKBOX_CREATOR, checkboxCreator} from "../actions/formControls";
import {INPUT_CREATOR, inputCreator} from "../actions/formControls";
import {CHANGE_LABEL_TEXT, changeLabelText} from "../actions/formControls";

const initialState = {};


export function formControls(state = initialState, action){

	switch(action.type){

		case TOGGLE_INPUT_VISIBILITY:
			return Object.assign({}, state, toggleInputVisibility(action.input));
		case GET_DEFAULT_COUNTRY:
			return Object.assign({}, state, getDefaultCountry(action.input));
		case IS_MUTATOR_CHECKBOX:
			return Object.assign({}, state, isMutatorCheckbox(action.input));
		case CHECKBOX_CREATOR:
			return Object.assign({}, state, checkboxCreator(action.input));
		case INPUT_CREATOR:
			return Object.assign({}, state, inputCreator(action.input));
		case CHANGE_LABEL_TEXT:
			return Object.assign({}, state, changeLabelText(action.input));
		default:
			return state;

	}


}

