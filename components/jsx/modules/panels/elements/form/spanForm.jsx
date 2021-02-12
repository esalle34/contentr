import React from "react";

const SpanForm = (args)=>{

    let header_el = args.header_el;

    return <form id={`span-form-${header_el.id}`} key={`span-form-${header_el.id}`}>

        <input type="submit" className="btn btn-primary"></input>
    </form>;

}

export default SpanForm;