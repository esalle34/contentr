import React from "react";

const Li = (args)=>{
	
	return <li key={(typeof args.key == "undefined" || args.key == null) ? args.id : args.key} 
				id={args.id != null ? args.id : undefined} 
				className={(typeof args.className != "undefined" || args.className != null) ? args.className : undefined} 
				style={(typeof args.style != "undefined" || args.style != null) ? args.style : undefined} >
				{args.els}
			</li>

}

export default Li;