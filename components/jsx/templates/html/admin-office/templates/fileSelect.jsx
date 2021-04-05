import React from "react";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index";

const FileSelect = (args)=>{

    return <div className={args.groupClassName}>
        {typeof args.prelabel != "undefined" ? <label htmlFor={args.id}>{i18n.translate(args.prelabel)}</label> : ""}
        <input type="button" className={`fileSelect ${args.className}`}></input>
        <input type="hidden" name={args.name} id={args.id}></input>
        {typeof args.aplabel != "undefined" ? <label htmlFor={args.id}>{i18n.translate(args.aplabel)}</label> : ""}
    </div>
        
}

export default FileSelect;