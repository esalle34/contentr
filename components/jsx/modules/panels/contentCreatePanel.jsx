import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import SelectComponentPanel from "./selectComponentPanel";
import Request from "superagent";
import { officeRegistry } from "~/components/jsx/modules/office-app.registry";
import { store } from "~/components/jsx/modules/redux/stores/store";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index.js";

const CreateContent = (args)=>{

    let [formView, setFormView] = useState(null);
    let [formValidators, setFormValidators] = useState(undefined);
    let view = null;

    const formURI = "/administrate/form/request/post?fragment";
    const formId = "create_content_form";

    const select = (args, id)=>{
        Request.post(formURI)
        .send({content_type_id : id})
        .then((res)=>{


            return new Promise((resolve, reject)=>{

                setFormView(<React.Fragment><div className="row col-12" dangerouslySetInnerHTML={{__html: res.text}}/></React.Fragment>);
                resolve(view);
            }).then(()=>{

                let form = document.getElementById(formId).getElementsByTagName("FORM")[0];
                let content_name_container = document.createElement("div");
                content_name_container.classList = "form-group col-12";
                let content_name_div = document.createElement("div");
                content_name_div.classList = "input-group";
                let content_name = document.createElement("input");
                let content_name_label = document.createElement("label");
                content_name_label.for = "content_name";
                content_name_label.innerHTML = i18n.translate("Content name");
                content_name.classList = "form-control validate_string minlength-3";
                content_name.type= "text";
                content_name.name = "content_name";
                content_name.id = "content_name";
                content_name.placeholder = i18n.translate("Content name");
                content_name_div.append(content_name);
                content_name_container.append(content_name_label);
                content_name_container.append(content_name_div);
                let form_id = document.createElement("input");
                form_id.value = id;
                form_id.name = "form_id";
                form_id.type = "hidden";
                form.prepend(content_name_container);
                form.firstChild.firstChild.appendChild(form_id);
                let Form = officeRegistry["form"];
                setFormValidators(<Form key={`form-control`} form={form} store={store} />);

            })
        }, (rej)=>{})
    }

    if(formView == null){

        view = <SelectComponentPanel datas={args.datas} count={args.count} searchEngine={args.searchEngine} select={select} keys={["machine_name", "template_name"]} current={args.current} />;

    }else{
        view = <React.Fragment>{formView}{formValidators}</React.Fragment>;

    }

    return view;
}

export default CreateContent;