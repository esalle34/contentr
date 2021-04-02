import React, { useState } from "react";
import ReactDOM from "react-dom";
import SelectComponentPanel from "./selectComponentPanel";
import Request from "superagent";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index.js";

const CreateContent = (args)=>{

    let [formView, setFormView] = useState(null);
    let view = null;

    const formURI = "/administrate/form/request/post?fragment";

    const select = (args, id)=>{
        Request.post(formURI)
        .send({content_type_id : id})
        .then((res)=>{
            setFormView(<div dangerouslySetInnerHTML={{__html: res.text}}/>);
        }, (rej)=>{})
    }

    if(formView == null){

        view = <SelectComponentPanel datas={args.datas} count={args.count} searchEngine={args.searchEngine} select={select} keys={["machine_name", "template_name"]} current={args.current} />;

    }else{
        view = formView;
    }

    return view;
}

export default CreateContent;