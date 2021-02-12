import React from "react";

const LinkForm = (args)=>{

    let header_el = args.header_el;

    return <form id={`list-form-${header_el.id}`} key={`list-form-${header_el.id}`}>

        <input type="submit" className="btn btn-primary"></input>
    </form>;

}

export default LinkForm;