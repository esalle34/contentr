import React from "react";

const H2 = (args)=>{

	if(typeof args.value != "undefined"  && args.els.length == 0){

		args.els = args.value;

	}
	
	return <h2 key={args.key} className={(typeof args.className != "undefined" || args.className != null) ? args.className : undefined}>{args.els}</h2>;

}

export default H2;