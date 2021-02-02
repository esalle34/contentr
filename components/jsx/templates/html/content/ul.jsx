import React from "react";

const Ul = (args)=>{
	
	return <ul key={args.key} 
				id={args.id != null ? args.id : undefined} 
				className={(typeof args.className != "undefined" || args.className != null) ? args.className : undefined} 
				style={(typeof args.style != "undefined" || args.style != null) ? args.style : undefined} >
				{args.els}
			</ul>

}

export default Ul;