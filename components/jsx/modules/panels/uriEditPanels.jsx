import React, { useState } from "react";
import ReactDOM from "react-dom";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index.js";
import { officeRegistry } from "~/components/jsx/modules/office-app.registry";
import { store } from "~/components/jsx/modules/redux/stores/store";
import Request from "superagent";
import SelectComponentPanel from "./selectComponentPanel";


const UriEditPanels = (args) => {

    const formURI = "/administrate/form/request/post?fragment";
    const formName = "edit_route_form_form";

    let [view, setView] = useState([]);
    let [selectedUri, changeSelectedUri] = useState(false);
    let [formValidators, setFormValidators] = useState([]);

    let timer = (callback) => { setTimeout(callback, 200) };

    let select = (args, id) => {

        Request.post(formURI)
            .send({ form_name: formName })
            .then(res => {

                changeSelectedUri(true);
                return new Promise((resolve, reject) => {

                    setView(<React.Fragment>
                        <div className="col-12 form-group justify-content-start">
                            <hr className="separator" ></hr>
                            <a href="#" className="btn btn-secondary" onClick={() => args.searchEngine(Object.assign({}, { page: args.current }))}>{i18n.translate("Back")}</a>
                        </div>
                        <div id="edit-uri-form" className="col-12 row" dangerouslySetInnerHTML={{ __html: res.text }}></div>
                    </React.Fragment>);

                    resolve(view);
                }).then(res => {

                    let forms = Array.from(document.getElementById("edit-uri-form").getElementsByTagName("FORM"));
                    let Form = officeRegistry["form"];
                    let formData = args.datas.find(data => (data.id == id));

                    //Création d'un champ input avec l'id du formulaire à éditer
                    let idInput = document.createElement("input");
                    idInput.type = "hidden";
                    idInput.name = "id";

                    //Récupération des valeurs et injection dans le formulaire
                    forms.map((form, i) => {

                        let elementToClick = [];

                        Array.from(form.querySelectorAll("input, select")).map(input => {
                            let foundData;

                            foundData = formData[Object.keys(formData).find(f => {
                                if (f != "id" && (input.name == f || input.name.indexOf(f) > -1)) {
                                    return true;
                                } else if (input.name == f) {
                                    return true;
                                }
                                return false;
                            })];
                            if (typeof foundData != "undefined" && typeof foundData != "object" && foundData != null) {

                                //Récupération en fonction du nom du champ
                                if (input.type == "text") {
                                    input.value = foundData;
                                    if (input.value == "/") {
                                        input.disabled = true;
                                        form.querySelector("input[name='isExternal']").parentNode.parentNode.classList.add("hidden");
                                    }
                                    let theme;
                                    timer(function () {

                                        theme = form.querySelector("select[name='theme']");
                                        if (theme != null) {
                                            theme.value = formData.theme;
                                        } else {
                                            clearTimeout(timer);
                                        }

                                    })
                                } else if (input.type == "checkbox" && Boolean(foundData)) {

                                    //Click après l'initialisation du formulaire
                                    elementToClick.push(input);
                                } else {

                                    if (typeof formData.callback != "undefined") {

                                        let method = form.querySelector("#method");

                                        if (method != null) {

                                            //Récupération au chargement

                                            if (typeof formData.callback.callback != "undefined" && formData.callback.callback == "getContent") {

                                                method.value = "get-page";

                                                if (typeof formData.callback.content_id != "undefined" && formData.callback.content_id != null) {

                                                    let content_id;
                                                    let existing_data;
                                                    //Chargement des données au chargement de l'input
                                                    timer(function () {

                                                        existing_data = form.querySelector("input[name='is-existing-data']");
                                                        if (existing_data != null) {
                                                            existing_data.click();
                                                        } else {
                                                            clearTimeout(timer);
                                                        }

                                                    })

                                                    timer(function () {

                                                        content_id = form.querySelector("input[name='contentid']");
                                                        if (content_id != null) {
                                                            content_id.value = formData.callback.content_id;
                                                        } else {
                                                            clearTimeout(timer);
                                                        }

                                                    })

                                                }

                                            } else if (typeof formData.callback.callback != "undefined" && (formData.callback.callback == "get_form" || formData.callback.callback == "validate_form")) {

                                                if (formData.callback.callback == "get_form") {

                                                    method.value = "get-form";

                                                } else if (formData.callback.callback == "validate_form") {

                                                    method.value = "post-callback";

                                                }

                                                if (typeof formData.callback.form_name != "undefined" && formData.callback.form_name != null) {

                                                    let form_name;
                                                    let existing_data;

                                                    timer(function () {

                                                        existing_data = form.querySelector("input[name='is-existing-data']");
                                                        if (existing_data != null) {
                                                            existing_data.click();
                                                        } else {
                                                            clearTimeout(timer);
                                                        }

                                                    })
                                                    //Chargement des données au chargement de l'input
                                                    timer(function () {

                                                        form_name = form.querySelector("input[name='contentid']");
                                                        if (form_name != null) {
                                                            form_name.value = formData.callback.form_name;
                                                        } else {
                                                            clearTimeout(timer);
                                                        }

                                                    })
                                                }

                                            } else if (typeof formData.callback.isFile != "undefined" && Boolean(formData.callback.isFile)) {

                                                method.value = "get-file";
                                                let filepath;

                                                //Chargement des données au chargement de l'input
                                                timer(function () {

                                                    filepath = form.querySelector("input[name='path-to-file-and-filename']");
                                                    if (filepath != null) {
                                                        filepath.value = (typeof formData.callback.filepath != "undefined" ? formData.callback.filepath : "") + (typeof formData.callback.filename != "undefined" ? formData.callback.filename : "");
                                                    } else {
                                                        clearTimeout(timer);
                                                    }

                                                })


                                            }

                                        }

                                    }

                                }

                            }
                        })

                        setFormValidators(<Form key={`form-control-${i}`} form={form} store={store} />)
                        if (elementToClick.length > 0) {
                            elementToClick.map(el => {
                                el.click();
                            })
                        }
                        
                        idInput.value = formData[Object.keys(formData).find(el => (el == "id"))]
                    })
                    forms[0].appendChild(idInput);


                })

            })

    }

    if (!selectedUri) {

        view = <SelectComponentPanel datas={args.datas} count={args.count} keys={["title", "uri", "lastModifiedAt"]} searchEngine={args.searchEngine} select={select} current={args.current} />

    }

    return <React.Fragment>{view}{formValidators}</React.Fragment>;


}

export default UriEditPanels;