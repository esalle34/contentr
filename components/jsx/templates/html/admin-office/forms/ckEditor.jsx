import React from "react";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index";

const CkEditor = (args)=>{

    return <div key={args.id} className={args.groupClassName}>
        {typeof args.prelabel != "undefined" ? <label htmlFor={args.id}>{i18n.translate(args.prelabel)}</label> : ""}
        <div className={`ckEditor ${args.className}`}></div>
        <input type="hidden" id={args.id} name={args.name}></input>
        {typeof args.aplabel != "undefined" ? <label htmlFor={args.id}>{i18n.translate(args.aplabel)}</label> : ""}
    </div>
        
}

export default CkEditor;