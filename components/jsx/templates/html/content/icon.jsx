import React from "react";

const Icon = (args)=>{
	
	return <i key={args.key}
	className={args.className != null ? args.className : undefined}
	id={args.id != null ? args.id : undefined}
	style={args.style != null ? args.style : undefined}>
	{args.els}</i>


}

export default Icon;
