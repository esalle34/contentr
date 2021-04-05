import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import SelectComponentPanel from "./selectComponentPanel";
import Request from "superagent";
import { officeRegistry } from "~/components/jsx/modules/office-app.registry";
import { store } from "~/components/jsx/modules/redux/stores/store";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index.js";

const EditContent = (args)=>{

    let [view, setView] = useState(null);
    let [formValidators, setFormValidators] = useState(null);
    let [formView, setFormView] = useState(null);

    const formURI = "/administrate/form/request/post?fragment";
    const getContentValuesURI = "/administrate/content/get";
    const formId = "edit_content_form";

    const select = (args, id)=>{
        let el = args.datas.find(el=>(el.id == id));
        Request.post(formURI)
        .send({form_name : el.machine_name})
        .then((res)=>{


            let view_promise = new Promise((resolve, reject)=>{

                setFormView(<React.Fragment><div className="row col-12" dangerouslySetInnerHTML={{__html: res.text}}/></React.Fragment>);
                resolve(view);
            });

            let values_promise = Request.post(getContentValuesURI).send({id : el.id});

            Promise.all([values_promise, view_promise]).then((values)=>{
                console.log(values);
            })

            /*.then(()=>{

                

                let form = document.getElementById(formId).getElementsByTagName("FORM")[0];
                let Form = officeRegistry["form"];
                setFormValidators(<Form key={`form-control`} form={form} store={store} />);

            })*/
        }, (rej)=>{})
    }

    if (formView == null) {

        view = <SelectComponentPanel datas={args.datas} count={args.count} keys={["content_name", "id", "lastModifiedAt"]} searchEngine={args.searchEngine} select={select} current={args.current} />

    }else{
        view = <React.Fragment>{formView}{formValidators}</React.Fragment>;
    }

    return view;

}

export default EditContent;