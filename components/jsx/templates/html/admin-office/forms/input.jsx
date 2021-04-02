import React from "react";
import { getAppendFromRegistry, getPrependFromRegistry } from "./form.registry";

const Input = (args) => {


	if (typeof args.append == "object" && !React.isValidElement(args.append)) {
		if (typeof args.append.subelement == "undefined") {
			args.append.subelement = "icon";
		}
		args.append = getAppendFromRegistry({ libelle: args.append.element, className: args.append.buttonClassName, els: getAppendFromRegistry({ libelle: args.append.subelement, className: args.append.icon }) });

	}
	if (typeof args.prepend == "object" && !React.isValidElement(args.prepend)) {
		if (typeof args.prepend.subelement == "undefined") {
			args.prepend.subelement = "icon";
		}
		args.prepend = getPrependFromRegistry({ libelle: args.prepend.element, className: args.prepend.buttonClassName, els: getPrependFromRegistry({ libelle: args.prepend.subelement, className: args.prepend.icon }) });

	}
	


	return <div key={`${args.groupClassName}` + "-" + `${args.key}`} className={(typeof args.groupClassName != "undefined" || args.groupClassName != null) ? `${args.groupClassName}` : "form-group"}>
		{(typeof args.prelabel != "undefined" && args.prelabel != null) &&
			<label key={`prelabel-${args.id}`} htmlFor={args.id} className={(typeof args.type != "undefined") ? args.type == "checkbox" ? "form-check-label" : (args.type == "text" || args.type == "password" || args.type == "email" || args.type == "number") ? (args.value != null && args.length > 0) ? undefined : "invisible" : args.type == "file" ? "file-label col" : undefined : undefined}>{args.prelabel}</label>}
		<div className={typeof args.type != "undefined" ? args.type == "checkbox" ? undefined : "input-group" : undefined}>
			{(typeof args.prepend != "undefined" && args.prepend != null) &&
				<div className="input-group-prepend">
					{args.prepend}
				</div>}
			<input id={args.id} key={args.key} name={args.name} type={args.type} className={args.className} placeholder={args.placeholder} value={args.value} dataset={(typeof args.dataSet != "undefined" && args.dataSet != null) ? JSON.stringify(args.dataSet) : undefined}></input>
			{(typeof args.append != "undefined" && args.append != null) &&
			<div className="input-group-append">
				{args.append}
			</div>}
		</div>
		{(typeof args.aplabel != "undefined" && args.aplabel != null) &&
			<label key={`prelabel-${args.id}`} htmlFor={args.id} className={(typeof args.type != "undefined") ? args.type == "checkbox" ? "form-check-label" : args.type == "text" ? (args.value != null && args.length > 0) ? undefined : "invisible" : undefined : undefined}>{args.aplabel}</label>}
	</div>;
}


export default Input;