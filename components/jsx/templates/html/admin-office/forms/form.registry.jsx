import React from "react";
import Input from "./input";
import Form from "./form";
import Select from "./select";
import Option from "./option";
import InputGroupAddOns from "./inputGroupAddOns";
import CkEditor from "./ckEditor";
import Textarea from "./textarea";

export const forms = {

		form : Form,
		input : Input,
		select : Select,
		option : Option,
		ckEditor : CkEditor,
		textarea : Textarea

}

export const getAppendFromRegistry = (args)=>{

	if(typeof args != "undefined"){

		let newArgs;

		if(typeof args != "object"){

			newArgs = Object.assign({}, {key : args + "-" + (typeof args.key != "undefined" ? args.key : 0)});

			return InputGroupAddOns.append[args](newArgs);

		}else{
			
			newArgs = Object.assign({}, args, {key : "_" + args.libelle + "_" + (typeof args.key != "undefined" ? args.key : 0)});
			return InputGroupAddOns.append[args.libelle](newArgs);

		}

	}


}

export const getPrependFromRegistry = (args)=>{

	if(typeof args != "undefined"){

		let newArgs;

		if(typeof args != "object"){

			newArgs = Object.assign({}, {key : args + "-" + (typeof args.key != "undefined" ? args.key : 0)});

			return InputGroupAddOns.prepend[args](newArgs);

		}else{

			newArgs = Object.assign({}, args, {key : "_" + args.libelle + "_" + (typeof args.key != "undefined" ? args.key : 0)});
			return InputGroupAddOns.prepend[args.libelle](newArgs);

		}

	}


}
