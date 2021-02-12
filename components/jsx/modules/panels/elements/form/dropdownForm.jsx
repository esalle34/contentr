import React from "react";

const DropdownForm = (args)=>{

    let header_el = args.header_el;

    return <form id={`dropdown-form-${header_el.id}`} key={`dropdown-form-${header_el.id}`}>

        <input type="submit" className="btn btn-primary"></input>
    </form>;

}

export default DropdownForm;