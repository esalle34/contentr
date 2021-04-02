import React from "react";
import Option from "./option";
const path = require("path");
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path+"/global"))();

const Select = (args) => {

	if (typeof args.options != "undefined") {
		args.els = [];
		let i = 0;
		if (typeof args.options.values != "undefined") {
			args.options.values.map(function (option) {
				option = option.split("|");
				let value = option[0];
				let innerText = option[1];
				args.els.push(<Option id={`${args.id}-option-${i}`} key={`${args.key}-key-${i}`} value={value} els={innerText} selected={(typeof args.options.default != "undefined" && args.options.default == option[1]) ? true : undefined} />)
				i++;
			})
		}else if(typeof args.options.file != "undefined"){
			const data = require(path.resolve(global[args.options.path] + args.options.file));
			args.els = [];
			let i = 0;
			data.map(function (option) {
				let value = option.value;
				let innerText = option.innerText;
				args.els.push(<Option id={`${args.id}-option-${i}`} key={`${args.key}-key-${i}`} value={value} els={innerText} />)
				i++;
			})
		}
	}

	return <div key={`${args.key}-container`} className={(typeof args.groupClassName != "undefined" && args.groupClassName != null) ? args.groupClassName : "form-group"}>
				{(typeof args.prelabel != "undefined" && args.prelabel != null) &&
				<label key={`prelabel-${args.id}`} htmlFor={args.id}>{args.prelabel}</label>}
			<div>
				<select key={args.key}
				dataset = {(typeof args.options.dataSet != "undefined" && args.options.dataSet != null) ? JSON.stringify(args.options.dataSet) : undefined}
				id={(typeof args.id != "undefined" && args.id != null) ? args.id : undefined}
				name={(typeof args.name != "undefined" && args.name != null) ? args.name : undefined}
				className={(typeof args.className != "undefined" && args.className != null) ? args.className + " " + (typeof args.options.dataSet != "undefined" ? "has-dataset " + Object.keys(args.options.dataSet).join(" ") : "" ) : undefined}
				value={(args.value != "undefined" && args.value != null) ? args.value : undefined}
				placeholder={(typeof args.placeholder != "undefined" && args.placeholder != null) ? args.placeholder : undefined}>
				{args.els}
				</select>
			</div>
	</div>

}

export default Select;