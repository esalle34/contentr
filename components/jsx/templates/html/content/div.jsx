import React from "react";

const Div = (args)=>{

		return <div key={args.key} dataset={(typeof args.dataSet != "undefined") ? JSON.stringify(args.dataSet) : undefined}
					className={args.className != null ? args.className : undefined}
					id={args.id != null ? args.id : undefined}
					style={args.style != null ? args.style : undefined}>
					{args.els}
				</div>

}

export default Div;