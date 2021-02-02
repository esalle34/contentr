import React from "react";

const Nav = (args)=>{
	

		return <nav key={args.key}
					className={args.className != null ? args.className : undefined}
					id={args.id != null ? args.id : undefined}
					style={args.style != null ? args.style : undefined}>
					{args.els}
				</nav>

}

export default Nav;