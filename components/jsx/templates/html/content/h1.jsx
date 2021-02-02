import React from "react";

const H1 = (args)=>{

	if(typeof args.value != "undefined" && args.els.length == 0){

		args.els = args.value;

	}
	
	return <h1 key={args.key} className={(typeof args.className != "undefined" || args.className != null) ? args.className : undefined}>{args.els}</h1>;

}

export default H1;