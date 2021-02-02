import React from "react";

const Dropdown = (args)=>{

	const InnerTag = (typeof args.innerTagName != "undefined" && args.innerTagName != null ) ? args.innerTagName : "button";
	const innerTagClassName = (typeof args.className != "undefined" && args.className != null) ? `btn ${args.className} dropdown-toggle` : "btn btn-secondary dropdown-toggle"; 
	const menuClassName = (typeof args.menuClassName != "undefined" && args.menuClassName != null) ? `dropdown-menu ${args.menuClassName}` : "dropdown-menu"; 

	return <div key={args.key} className={`${(typeof args.dropDownClassName != "undefined" && args.dropDownClassName != null) ? args.dropDownClassName : "dropdown"}`}>
		<InnerTag className={innerTagClassName} id={`${args.id}${InnerTag.charAt(0).toUpperCase() + InnerTag.slice(1)}`} type={args.type} href={args.href} data-toggle = "dropdown" aria-haspopup={args.ariaHasPopUp} aria-expanded={args.ariaExpanded}>{args.value}</InnerTag>
		<div className={menuClassName} aria-labelledby={`${args.id}${InnerTag.charAt(0).toUpperCase() + InnerTag.slice(1)}`}>
			{args.els}
		</div>
	</div>
	
}

export default Dropdown;