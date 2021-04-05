import React from "react";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index";

const Textarea = (args)=>{

    return <div className={args.groupClassName}>
        {typeof args.prelabel != "undefined" ? <label htmlFor={args.id}>{i18n.translate(args.prelabel)}</label> : ""}
        <textarea type="hidden" id={args.id} name={args.name} placeholder={typeof args.prelabel != "undefined" ? args.prelabel : typeof args.aplabel != "undefined" ? args.aplabel : undefined}></textarea>
        {typeof args.aplabel != "undefined" ? <label htmlFor={args.id}>{i18n.translate(args.aplabel)}</label> : ""}
    </div>
        
}

export default Textarea;