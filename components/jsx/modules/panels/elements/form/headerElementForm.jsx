import React, { useState } from "react";
import { officeRegistry } from "~/components/jsx/modules/office-app.registry";
import { store } from "~/components/jsx/modules/redux/stores/store";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index.js";

const HeaderElementForm = (args) => {

    let header_el = args.header_el;
    let [view, setView] = useState([]);

    let Form = officeRegistry["form"];
    let [formControls, setForm] = useState(undefined);

    const loadForm = () => {

        if (typeof formControls == "undefined") {

            let timer = setTimeout(
                function () {
                    let form = document.getElementById(`list-form-${header_el.id}`);
                    if (form != null && typeof formControls == "undefined") {
                        formControls = <Form form={form} store={store} />;
                        setForm(formControls);
                    } else {

                        clearTimeout(timer);
                    }
                }, 500)
        }
    }

    const inputStateChanged = (e)=>{
        if(e.target.value.length > 0){
            e.target.parentNode.previousSibling.classList.remove("invisible");
        }else{
            e.target.parentNode.previousSibling.classList.add("invisible");
        }
    }

    const changeTitle = (e)=>{
        e.target.closest(".accordion-item").previousSibling.firstChild.firstChild.innerText = e.target.value;
        inputStateChanged(e);
    }

    view = <form id={`list-form-${header_el.id}`} className="col-12 row justify-content-center" onSubmit={(e)=>args.submitItem(e, header_el)} onLoad={(typeof header_el.elem != "undefined" && header_el.elem == "a") ? loadForm() : undefined} key={`list-form-${header_el.id}`}>

        <div className="col-10 row flex-row-reverse">
            <input type="hidden" name="ms" id="ms" value="route_service/search_route::search::none"></input>
            <div className="col-4 form-group">
                <label key={`prelabel-${header_el.id}`} className={(typeof header_el.name != "undefined" && header_el.name != null && header_el.name.length > 0) ? undefined: "invisible"} htmlFor={`input-name-${header_el.id}`}>{i18n.translate("Name")}</label>
                <div className="input-group">
                    <input type="text" name="name" id={`input-name-${header_el.id}`} className="form-control form-input-text" onChange={(e)=>inputStateChanged(e)} placeholder={i18n.translate("Name")} defaultValue={(typeof header_el.name != "undefined" && header_el.name != null) ? header_el.name : undefined}></input>
                </div>
            </div>
            <div className="col-4 form-group">
                <label key={`prelabel-${header_el.id}`}  className={(typeof header_el.value != "undefined" && header_el.value != null && header_el.value.length > 0) ? undefined: "invisible"} htmlFor={`input-title-${header_el.id}`}>{i18n.translate("Title")}</label>
                <div className="input-group">
                    <input type="text" name="value" id={`input-title-${header_el.id}`} onChange={(e)=>changeTitle(e)} className="form-control form-input-text" placeholder={i18n.translate("Title")} defaultValue={(typeof header_el.value != "undefined" && header_el.value != null) ? header_el.value : undefined}></input>
                </div>
            </div>
            <div className="col-4 form-group">
                <label key={`prelabel-${header_el.id}`} className={(typeof header_el.elem != "undefined" && header_el.elem != null && header_el.elem.length > 0) ? undefined: "invisible"} htmlFor={`input-element-${header_el.id}`}>{i18n.translate("Element")}</label>
                <div className="input-group">
                    <input type="text" name="elem" id={`input-element-${header_el.id}`} onChange={(e)=>inputStateChanged(e)} className="form-control form-input-text" placeholder={i18n.translate("Element")} defaultValue={(typeof header_el.elem != "undefined" && header_el.elem != null) ? header_el.elem : undefined} readOnly disabled></input>
                </div>
            </div>
            {(typeof header_el.elem != "undefined" && header_el.elem == "a") ? 
            <React.Fragment><div className="col-12 form-group">
                <label key={`prelabel-${header_el.id}`} className={(typeof header_el.uri != "undefined" && header_el.uri != null && header_el.uri.length > 0) ? undefined: "invisible"} htmlFor={`input-uri-search-engine-${header_el.id}`}>{i18n.translate("Uri search engine")}</label>
                <div className="input-group">
                    <input type="text" id={`input-uri-search-engine-${header_el.id}`} className="form-control form-input-text has-dataset search-engine" onChange={(e)=>inputStateChanged(e)} placeholder={i18n.translate("Name, url, or feature...")} defaultValue={(typeof header_el.uri != "undefined" && header_el.uri != null) ? header_el.uri : undefined} dataset={'{"search-engine": {"on" : ["keyup"], "method" : "post", "url" : "/administrate/route/remove/post", "renderOnLoad" : "true", "renderingTpl" : "headerRouteSelect",  "renderToId" : "selectLink"}}'}></input>
                </div>
            </div>
            <div className="col-12 form-group">
                <label key={`prelabel-${header_el.id}`} htmlFor="selectLink">{i18n.translate("Select Uri")}</label>
                <div id="selectLink" className="col row justify-content-center" />
            </div></React.Fragment> : undefined}
            <div className="col-12 form-group">
                <label key={`prelabel-${header_el.id}`} htmlFor={`input-args-${header_el.id}`}>{i18n.translate("JSON Arguments")}</label>
                <div className="input-group">
                    <textarea className="form-control" id={`input-args-${header_el.id}`} name="args" defaultValue={(typeof header_el.args != "undefined" && header_el.args != null) ? header_el.args : undefined}></textarea>
                </div>
            </div>
            <div className="col-12 form-group">
                <div className="input-group">
                    <input type="submit" className="btn btn-primary next"></input>
                </div>
            </div>

        </div>
    </form>;

    return <React.Fragment>{view}{formControls}</React.Fragment>;

}

export default HeaderElementForm;