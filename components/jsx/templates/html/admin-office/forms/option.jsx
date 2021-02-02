import React from "react";

const Option = (args)=>{
	
	return <option id={(typeof args.id != "undefined" && args.id != null) ? args.id : undefined}
				   className={(typeof args.className != "undefined" && args.className != null) ? args.className : undefined}
				   value={(typeof args.value != "undefined" && args.value != null) ? args.value : undefined}
				   selected={args.selected}>
				   {args.els}</option>

}

export default Option;