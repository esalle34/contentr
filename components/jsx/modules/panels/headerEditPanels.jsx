import React, { useState } from "react";
import ReactDOM from "react-dom";
import SelectComponentPanel from "./selectComponentPanel";
import Request from "superagent";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index.js";
import HeaderAccordionElement from "./elements/headerAccordionElement";
import HeaderAccordionEditableElement from "./elements/headerAccordionEditableElement";
import { array } from "js-sha512";

const HeaderEditPanels = (args) => {

    const formURI = "/administrate/form/request/post?fragment";
    const formName = "edit_header_form_form";
    const headerURI = "/administrate/header/edit/post";
    const submitHeaderMS = "header_service/edit_header::submit::none";

    let [view, setView] = useState([]);
    let [selectedHeader, isSelectedHeader] = useState(false);
    let headerElsList;
    let header_id;
    let structuredHeaderElsList;
    let originalHeaderElsList;
    let lowestId;
    let targetEl = null;
    let draggedEl = null;

    const dragOver = async (e) => {

        targetEl = e.target;

        if (draggedEl != null && targetEl.getAttribute("id") != null && (targetEl.getAttribute("id").includes("item") || targetEl.getAttribute("id").includes("hr"))) {
            let newList = [];
            let splicedEl;
            let targetElId = targetEl.getAttribute("id").split("-")[1];
            let draggedElId = draggedEl.getAttribute("id").split("-")[1];

            headerElsList.body.map((el, index) => {
                if (typeof el != "undefined") {

                    if (el.id == draggedElId) {
                        if (typeof targetEl.dataset.header_element_id != "undefined" && targetEl.dataset.header_element_id != null) {
                            el.header_element_id = targetEl.dataset.header_element_id;
                            el.header_element_name = typeof headerElsList.body.find(subel=>(el.header_element_id == subel.id)) != "undefined" ? headerElsList.body.find(subel=>(el.header_element_id == subel.id)).name : null;
                        } else if (targetEl.id.includes("item") && draggedElId != targetElId) {
                            el.header_element_id = targetElId;
                            el.header_element_name = typeof headerElsList.body.find(subel=>(el.header_element_id == subel.id)) != "undefined" ? headerElsList.body.find(subel=>(el.header_element_id == subel.id)).name : null;
                        } else {
                            el.header_element_id = null;
                            el.header_element_name = null;
                        }

                        splicedEl = el;

                    } else {
                        newList.push(el);

                    }

                }



            })

            targetElId = targetEl.id.includes("item") ? parseInt(targetElId) : targetEl.id.includes("before") ? parseInt(targetElId) : parseInt(targetElId)+1;
            newList.splice(headerElsList.body.findIndex(el => (el.id == targetElId)), 0, splicedEl)
            headerElsList = Object.assign({}, headerElsList, { body: newList });
            await setItemsList();

        }

    }

    const dragStart = (e) => {


        if (e.target.closest(".accordion-control").nextSibling.getAttribute("order") != null) {
            draggedEl = e.target.closest(".accordion-control").nextSibling;
        } else if (e.target.closest(".accordion-control").nextSibling.closest("[draggable]") != null) {
            draggedEl = e.target.closest(".accordion-control").nextSibling.closest("[draggable]");
        } else {
            draggedEl = e.target.closest(".accordion-control").nextSibling.firstChild;
        }

    }

    const toggleVisibility = (e, header_el) => {
        e.preventDefault();
        if (e.target.tagName != "BUTTON") {

            let classList = Array.from(e.target.classList);
            classList.includes("opened") ? e.target.classList.remove("opened") : e.target.classList.add("opened");
            classList.includes("opened") ? e.target.closest(".accordion-control").nextSibling.classList.remove("opened") : e.target.closest(".accordion-control").nextSibling.classList.add("opened");
            classList = Array.from(e.target.classList);
            header_el = Object.assign({}, header_el, { isOpened: classList.includes("opened") ? true : false });
            if (typeof headerElsList != "undefined") {
                headerElsList.body.splice(headerElsList.body.findIndex(el => (el.id == header_el.id)), 1, header_el);
            }

        }

    }

    const createElement = async (e) => {

        if (e.target.tagName == "BUTTON" || e.target.tagName == "I") {

            let plus;
            if (e.target.classList.contains("add-element")) {
                plus = e.target;
            } else {
                plus = e.target.parentNode;
            }
            let createElementHTML = <React.Fragment><div className="form-group">
                <select id="elem-select" className="form-control" defaultValue="a" >
                    <option value="dropdown">{i18n.translate("Dropdown")}</option>
                    <option value="a">{i18n.translate("Route")}</option>
                    <option value="ul">{i18n.translate("List")}</option>
                    <option value="span">{i18n.translate("Span")}</option>
                </select>
            </div>
                <div className="input-group">
                    <div id="add-new" className="btn btn-secondary" onClick={(e) => createElement(e)}>{i18n.translate("Add New")}</div>
                </div>
                <div id="new-elements"></div>
            </React.Fragment>;

            if (plus.parentNode.nextSibling.firstChild.id.includes("add-element")) {

                ReactDOM.render(
                    createElementHTML,
                    plus.parentNode.nextSibling.firstChild
                )

            }

        } else {

            let newList = headerElsList.body;
            if(newList.length>0){
                newList.unshift({ id: Math.max.apply(Math, newList.map(function(subel) { return subel.id; }))+1, header_element_id: null, header_element_name: null, name: null, value: null, args: null, elem: e.target.parentNode.previousSibling.firstChild.value, isOpened: true, isEditable: true })
            }else{
                newList.push({ id: 0, header_element_id: null, header_element_name: null, name: null, value: null, args: null, elem: e.target.parentNode.previousSibling.firstChild.value, isOpened: true, isEditable: true })
            }
            await setItemsList();
        }

    }


    const changePosition = async (e, direction) => {

        e.preventDefault();
        e.stopPropagation();

        let touchedEl = e.target.closest(".accordion-control").nextSibling;
        let touchedElId = parseInt(touchedEl.id.split("-")[1]);
        let els = Array.from(touchedEl.closest("ul").children).filter(e => (e.id.includes("item")));
        let targetEl;
        if (direction == "up") {
            let targetIndex = els.findIndex(targetEl => (parseInt(targetEl.id.split("-")[1]) == touchedElId && targetEl.header_element_id == touchedEl.header_element_id)) - 1;
            if (targetIndex >= 0) {
                targetEl = els[targetIndex];
            }
        } else {
            let targetIndex = els.findIndex(targetEl => (parseInt(targetEl.id.split("-")[1]) == touchedElId && targetEl.header_element_id == touchedEl.header_element_id)) + 1;
            if (targetIndex >= 0) {
                targetEl = els[targetIndex];
            }
        }

        let newList = [];
        let splicedEl;

        if (typeof targetEl != "undefined") {

            let targetElId = parseInt(targetEl.id.split("-")[1]);

            await headerElsList.body.map((el, index) => {

                if (el.id == touchedElId) {

                    splicedEl = Object.assign({}, el, { id: targetElId });

                } else if (el.id == targetElId) {

                    targetEl = Object.assign({}, el, { id: touchedElId });

                } else if (el.header_element_id == touchedElId) {
                    el.header_element_id = targetElId;
                    newList.push(el);
                } else if (el.header_element_id == targetElId) {
                    el.header_element_id = touchedElId;
                    newList.push(el);
                } else {
                    newList.push(el);
                }

            })


            newList.splice(touchedElId - lowestId, 0, targetEl);
            newList.splice(targetElId - lowestId, 0, splicedEl);
            if (splicedEl != targetEl) {
                headerElsList = Object.assign({}, headerElsList, { body: newList });
                await setItemsList();
            }


        }

    }

    const changeLevel = async (e, level) => {

        e.preventDefault();
        e.stopPropagation();

        let touchedEl = e.target.closest(".accordion-control").nextSibling;
        let touchedElId = parseInt(touchedEl.id.split("-")[1]);
        let newList = [];
        await headerElsList.body.map((el, index) => {

            if (el.id == touchedElId) {
                let newHeaderElementId = null;
                let newHeaderElementName = null;
                if (level == "parent") {
                    if (touchedEl.parentNode.closest(".accordion-item") != null) {
                        newHeaderElementId = touchedEl.parentNode.closest(".accordion-item").parentNode.closest(".accordion-item") != null ? parseInt(touchedEl.parentNode.closest(".accordion-item").parentNode.closest(".accordion-item").id.split("-")[1]) : null;
                        newHeaderElementName = typeof headerElsList.body.find(el=>(el.id == newHeaderElementId)) != "undefined" ? headerElsList.body.find(el=>(el.id == newHeaderElementId)).name : null;
                    }
                } else {
                    if (touchedEl.nextSibling != null && touchedEl.nextSibling.nextSibling != null) {
                        newHeaderElementId = touchedEl.nextSibling.nextSibling.nextSibling != null ? parseInt(touchedEl.nextSibling.nextSibling.nextSibling.id.split("-")[1]) : el.header_element_id;
                        newHeaderElementName =  typeof headerElsList.body.find(el=>(el.id == newHeaderElementId)) != "undefined" ? headerElsList.body.find(el=>(el.id == newHeaderElementId)).name : null;
                    }
                }
                el = Object.assign({}, el, { header_element_id: newHeaderElementId, header_element_name : newHeaderElementName });
                newList.push(el);

            } else {
                newList.push(el);
            }

        })

        if (newList.length == headerElsList.body.length) {
            headerElsList = Object.assign({}, headerElsList, { body: newList });
            await setItemsList();
        }

    }

    const editItem = async (e) => {

        e.preventDefault();
        e.stopPropagation();
        let touchedEl = e.target.closest(".accordion-control").nextSibling;
        let touchedElId = parseInt(touchedEl.id.split("-")[1]);
        let newList = headerElsList.body;
        let editableEl = newList.find(el => (el.id == touchedElId));

        editableEl = typeof editableEl.isEditable == "undefined" ? Object.assign({}, editableEl, { isEditable: true, isOpened : true }) : editableEl.isEditable == true ? Object.assign({}, editableEl, { isEditable: false }) : Object.assign({}, editableEl, { isEditable: true, isOpened : true });
        newList.splice(newList.findIndex(subel=>(subel.id == touchedElId)), 1, editableEl);
        headerElsList = Object.assign({}, headerElsList, { body: newList });
        await setItemsList();

    }

    const removeItem = async (e) => {
        let newList = headerElsList.body;
        let index = newList.findIndex(el => (el.id == parseInt(e.target.id.split("-")[1])));

        const removeSubItems = (list, index) => {

            let subList;

            subList = list.filter(el => (el.header_element_id == index));
            if (subList.length > 0) {

                subList.map((el, index) => {
                    list.splice(list.findIndex(subel=>(subel.id == el.id)), 1);
                    removeSubItems(list, el.id);
                })
            }


            return list;




        }


        newList = await removeSubItems(newList, parseInt(e.target.id.split("-")[1]));

        if (index > -1) {

            newList.splice(index, 1);
            await setItemsList();

        }



    }

    const submitItem = async (e, header_el) => {
        e.preventDefault();
        let newEl = Object.assign({}, header_el);
        Array.from(e.target.elements).map(input => {
            let key = input.name;
            if (key != null && key.length > 0) {
                newEl = Object.assign({}, newEl, { [key]: input.value });
            }
        });
        newEl = Object.assign({}, newEl, { isEditable: false });
        let newList = headerElsList.body;
        newList[headerElsList.body.findIndex(el => (el.id == newEl.id))] = newEl;
        headerElsList = Object.assign({}, headerElsList, { body: newList })
        await setItemsList();
    }

    const sendHeader= ()=>{

        Request.post(headerURI)
        .send({ ms : submitHeaderMS, originalHeaderElsList : typeof headerElsList.text != "undefined" ? JSON.parse(headerElsList.text) : originalHeaderElsList.body, headerElsList : headerElsList.body, header_id : header_id})
        .then(res=>{

            console.log(res);

        }).catch((error)=>{
            console.log("Error while submitting new Header : " + error)
        })

    }

    const setItemsList = () => {

        let dragzone = [];
        let currentFormInputs = document.querySelector(`#${formName}`).firstChild;
        let parents = headerElsList.body.filter(el => (el.header_element_id == null));
        const buildNestedList = (parents) => {

            return parents.map((parent) => {
                let newParents = headerElsList.body.filter(el => (el.header_element_id == parent.id));
                parent = Object.assign({}, parent, { children: newParents });
                if (newParents.length > 0) {
                    return Object.assign({}, parent, { children: buildNestedList(newParents) });
                } else {
                    return parent;
                }
            });

        }
        const buildHtml = ((nestedArray) => {

            let tempHtml = [];

            nestedArray.map((header_el, index) => {

                let children = header_el.children.length > 0 ? buildHtml(header_el.children) : undefined;

                return tempHtml.push(<React.Fragment key={`fragment-${header_el.id}`}>
                    {index == 0 ? <hr data-header_element_id={header_el.header_element_id} onDragOver={(e) => dragOver(e)} key={`hrbefore-${header_el.id}`} className="dropzone" id={`hrbefore-${header_el.id}`} /> : undefined}
                    <a href="#" className="clickable accordion-control" key={`toggle-${header_el.id}`} onTouchStart={(e)=>dragStart(e)} onDragStart={(e)=>dragStart(e)}  onDragOver={(e)=>dragOver(e)} onClick={(e) => { toggleVisibility(e, header_el) }}><h3 key={`h3-${header_el.id}`} className={`title-accordion ${typeof header_el.isOpened != "undefined" ? header_el.isOpened == true ? "opened" : "" : ""}`}>
                        <span>{header_el.value}</span>
                        <div className="next">
                            <div className="actions-edit">
                                <button type="button" onClick={(e) => { editItem(e) }} className="btn btn-secondary-revert edit-item">
                                    <i className="fa-solid fa-edit" onClick={(e) => { editItem(e) }}></i>
                                </button>
                            </div>
                            <div className="actions-level">
                                <button type="button" onClick={(e) => { changeLevel(e, "parent") }} className="btn btn-secondary-revert parent-level">
                                    <i className="fa-solid fa-level-up-alt flip-horizontal" onClick={(e) => { changeLevel(e, "parent") }}></i>
                                </button>
                                <button type="button" onClick={(e) => { changeLevel(e, "children") }} className="btn btn-secondary-revert children-level">
                                    <i className="fa-solid fa-level-down-alt flip-horizontal" onClick={(e) => { changeLevel(e, "children") }}></i>
                                </button>
                            </div>
                            <div className="actions-position">
                                <button type="button" onClick={(e) => { changePosition(e, "up") }} className="btn btn-secondary-revert upper-level">
                                    <i className="fa-solid fa-angle-up" onClick={(e) => { changePosition(e, "up") }}></i>
                                </button>
                                <button type="button" onClick={(e) => { changePosition(e, "down") }} className="btn btn-secondary-revert next-level">
                                    <i className="fa-solid fa-angle-down" onClick={(e) => { changePosition(e, "down") }}></i>
                                </button>
                            </div>
                            <div className="actions-delete">
                                <button type="button" id={`delete-${header_el.id}`} onClick={(e) => { removeItem(e) }} className="btn btn-secondary-revert edit-item">
                                    <i className="fa-solid fa-trash-alt" id={`delete-${header_el.id}`} onClick={(e) => { removeItem(e) }}></i>
                                </button>
                            </div>
                        </div>
                    </h3>
                    </a>
                    {(typeof header_el.isEditable == "undefined" || header_el.isEditable == false) ? <HeaderAccordionElement header_el={header_el} index={index} children={children} dragOver={dragOver}/> : <HeaderAccordionEditableElement header_el={header_el} index={index} children={children} submitItem={submitItem} dragOver={dragOver} />}
                    {index == nestedArray.length ? undefined : <hr onDragOver={(e) => dragOver(e)} className="dropzone" data-header_element_id={header_el.header_element_id} key={`hrafter-${header_el.id}`} id={`hrafter-${header_el.id}`} />}
                </React.Fragment>)



            })

            return tempHtml;



        })
        structuredHeaderElsList = Object.assign({}, headerElsList, { body: buildNestedList(parents) });
        dragzone = buildHtml(structuredHeaderElsList.body);
        dragzone.push(<div onClick={()=>sendHeader()} key="header-submit-button-container" className="form-group col row flex-row-reverse">
        <input type="button" key="header-submit-button" className="btn btn-primary" value={i18n.translate("Submit")}></input>
    </div>)
        ReactDOM.unmountComponentAtNode(currentFormInputs.querySelector("#dragndrop-results"));
        ReactDOM.render(
            <React.Fragment>
                <div className="col-12 row">
                    <div className="col">
                        <button type="button" className="btn btn-secondary round add-element" onClick={(e) => createElement(e)}><i className="fa-solid fa-plus"></i></button>
                    </div>
                    <div className="col-10">
                        <div id="add-element"></div>
                    </div>
                </div>
                <div className="col-12 row responsive-table">
                    <ul key="header-table" className="col nested-list">{dragzone}</ul>
                </div>
            </React.Fragment>,
            currentFormInputs.querySelector("#dragndrop-results")
        )
        
    }


    const select = (args, id) => {
        isSelectedHeader(true);
        setView(null);
        header_id = id;
        Request.post(formURI)
            .send({ form_name: formName })
            .then((res) => {

                setView(<div className="col-12" dangerouslySetInnerHTML={{ __html: res.text }}></div>)
                let currentFormInputs = document.querySelector(`#${formName}`).firstChild;
                Request.post(headerURI)
                    .send({ ms: currentFormInputs.querySelector("#ms").value, id: id })
                    .then((res) => {

                        if(res.body != null){

                            headerElsList = Object.assign({}, res, {body : res.body.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight))});
                            originalHeaderElsList = Object.assign({}, res);
                            lowestId = originalHeaderElsList.body[0].id;
                            originalHeaderElsList = Object.assign({}, res, {body : res.body.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight))});

                        }else{
                            headerElsList = Object.assign({}, { body : []});
                            lowestId = 0;
                            originalHeaderElsList = Object.assign({}, { body : []});
                        }

                        setItemsList();
                    })

            }).catch(err => {
                console.log(err);
            })
    }
    if (!selectedHeader) {

        view = <SelectComponentPanel datas={args.datas} count={args.count} searchEngine={args.searchEngine} select={select} keys={["name", "lastModifiedAt"]} split={{ "name": "header_" }} current={args.current} />

    }

    return view;
}

export default HeaderEditPanels;