import React from "react";

const Header = (args)=>{
	

	return <header key={args.key != null ? args.key : undefined} className={typeof args.className != "undefined" ? args.className : undefined}>
			{args.els}</header>

}

export default Header;