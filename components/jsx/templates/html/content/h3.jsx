import React from "react";

const H3 = (args)=>{

    if(typeof args.value != "undefined" && args.els.length == 0){

		args.els = args.value;

	}
	
	return <h3 key={args.key} className={(typeof args.className != "undefined" || args.className != null) ? args.className : undefined}>{args.els}</h3>;

}

export default H3;