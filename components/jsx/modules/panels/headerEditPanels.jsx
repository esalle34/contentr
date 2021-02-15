import React, {useState} from "react";
import ReactDOM from "react-dom";
import SelectComponentPanel from "./selectComponentPanel";
import Request from "superagent";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index.js";
import HeaderAccordionElement from "./elements/headerAccordionElement";
import HeaderAccordionEditableElement from "./elements/headerAccordionEditableElement";

const HeaderEditPanels = (args)=>{

    let [view, setView] = useState([]);
    let [selectedHeader, isSelectedHeader] = useState(false);
    let headerElsList;
    let structuredHeaderElsList;
    let originalHeaderElsList;
    let targetEl = null;
    let draggedEl = null;

    const dragOver = (e)=>{

        targetEl = e.target;

        if(draggedEl != null  && targetEl.getAttribute("id") != null && (targetEl.getAttribute("id").includes("item") || targetEl.getAttribute("id").includes("hr"))){
            let newList = [];
            let splicedEl;
            let targetElId = targetEl.getAttribute("id").split("-")[1];
            let draggedElId = draggedEl.getAttribute("id").split("-")[1];

                headerElsList.body.map((el, index)=>{
                    if(typeof el != "undefined"){

                        if(el.id == draggedElId){                            
                            if(typeof targetEl.dataset.header_element_id != "undefined" && targetEl.dataset.header_element_id != null){
                                el.header_element_id = targetEl.dataset.header_element_id;
                            }else if(targetEl.id.includes("item") && draggedElId != targetElId){
                                el.header_element_id = targetElId;
                            }else{
                                el.header_element_id = null;
                            }
                            
                            splicedEl = el;

                        }else{
                            newList.push(el);
                            
                        }

                    }



                })

                targetElId = targetEl.id.includes("item") ? parseInt(targetElId) -  originalHeaderElsList.body[0].id  : targetEl.id.includes("before") ? parseInt(targetElId) - originalHeaderElsList.body[0].id: parseInt(targetElId) -  originalHeaderElsList.body[0].id + 1;
                targetElId = targetElId == -1 ? 0 : targetElId;
                newList.splice(targetElId, 0, splicedEl)
                if(newList.length == headerElsList.body.length){

                    headerElsList = Object.assign({}, headerElsList, {body : newList});
                    let timer = setTimeout(function(){
                        let tempList = headerElsList.body;
                        if(tempList!=newList){
                            clearTimeout(timer);
                        }else{
                            
                            setItemsList();
                            
                        }
    
                    }, 200);

                }


        }

    }

    const dragStart = (e)=>{


            if(e.target.getAttribute("order") != null){
                draggedEl = e.target;
            }else if(e.target.closest("[draggable]") != null){
                draggedEl = e.target.closest("[draggable]");
            }else{
                draggedEl = e.target.firstChild;
            }

    }

    const toggleVisibility = (e, header_el)=>{
        e.preventDefault();
        if(e.target.tagName != "BUTTON"){

            let classList = Array.from(e.target.classList);
            classList.includes("opened") ? e.target.classList.remove("opened") : e.target.classList.add("opened");
            classList.includes("opened") ? e.target.closest(".accordion-control").nextSibling.classList.remove("opened") : e.target.closest(".accordion-control").nextSibling.classList.add("opened");
            classList = Array.from(e.target.classList);
            header_el = Object.assign({}, header_el, {isOpened : classList.includes("opened") ? true : false});
            if(typeof headerElsList != "undefined"){
                headerElsList.body.splice(headerElsList.body.findIndex(el=>(el.id == header_el.id)), 1, header_el);
            }

        }

    }

    const createElement = async (e)=>{

        if(e.target.tagName == "BUTTON" || e.target.tagName == "I"){

            let plus;
            if(e.target.classList.contains("add-element")){
                plus = e.target;
            }else{
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
                <div id="add-new" className="btn btn-secondary" onClick={(e)=>createElement(e)}>{i18n.translate("Add New")}</div>
            </div>
            <div id="new-elements"></div>
            </React.Fragment>;

            if(plus.parentNode.nextSibling.firstChild.id.includes("add-element")){

                ReactDOM.render(
                    createElementHTML,
                    plus.parentNode.nextSibling.firstChild
                )

            }

        }else{
            let newList = headerElsList.body;
            newList.push({id: newList.length + originalHeaderElsList.body[0].id, header_element_id: null, name: null, value: null, args:null, elem: e.target.parentNode.previousSibling.firstChild.value, isOpened: true, isEditable: true})
            await setItemsList();
        }

    }
    

    const changePosition= async (e, direction)=>{

        e.preventDefault();
        e.stopPropagation();

        let touchedEl = e.target.closest(".accordion-control").nextSibling;
        let touchedElId = parseInt(touchedEl.id.split("-")[1]);
        let els = Array.from(touchedEl.closest("ul").children).filter(e=>(e.id.includes("item")));
        let targetEl;
        if(direction == "up"){
            let targetIndex = els.findIndex(targetEl=>(parseInt(targetEl.id.split("-")[1])==touchedElId && targetEl.header_element_id == touchedEl.header_element_id))-1;
            if(targetIndex >=0){
                targetEl = els[targetIndex];
            }
        }else{
            let targetIndex = els.findIndex(targetEl=>(parseInt(targetEl.id.split("-")[1])==touchedElId && targetEl.header_element_id == touchedEl.header_element_id))+1;
            if(targetIndex >=0){
                targetEl = els[targetIndex];
            }
        }

        let newList = [];
        let splicedEl;

        if(typeof targetEl != "undefined"){

            let targetElId = parseInt(targetEl.id.split("-")[1]);

            await headerElsList.body.map((el, index)=>{

                if(el.id == touchedElId){

                    splicedEl = Object.assign({}, el, {id: targetElId});
    
                }else if(el.id == targetElId) {
    
                    targetEl = Object.assign({}, el, {id: touchedElId});
    
                }else if(el.header_element_id == touchedElId){
                    el.header_element_id = targetElId;
                    newList.push(el);
                }else if(el.header_element_id == targetElId){
                    el.header_element_id = touchedElId;
                    newList.push(el);
                }else{
                    newList.push(el);
                }
    
            })

            
            newList.splice(touchedElId - originalHeaderElsList.body[0].id, 0, targetEl);
            newList.splice(targetElId - originalHeaderElsList.body[0].id, 0, splicedEl);
            if(splicedEl != targetEl){
                headerElsList = Object.assign({}, headerElsList, {body : newList});
                await setItemsList();
            }


        }

    }

    const changeLevel = async (e, level)=>{
        
        e.preventDefault();
        e.stopPropagation();

        let touchedEl = e.target.closest(".accordion-control").nextSibling;
        let touchedElId = parseInt(touchedEl.id.split("-")[1]);
        let newList = [];
        await headerElsList.body.map((el, index)=>{

            if(el.id == touchedElId){
                let newHeaderElementId = null;
                if(level == "parent"){
                    if(touchedEl.parentNode.closest(".accordion-item") != null){
                        newHeaderElementId = touchedEl.parentNode.closest(".accordion-item").parentNode.closest(".accordion-item") != null ? parseInt(touchedEl.parentNode.closest(".accordion-item").parentNode.closest(".accordion-item").id.split("-")[1]) : null;
                    }
                }else{
                    if(touchedEl.nextSibling != null && touchedEl.nextSibling.nextSibling != null){
                        newHeaderElementId = touchedEl.nextSibling.nextSibling.nextSibling != null ? parseInt(touchedEl.nextSibling.nextSibling.nextSibling.id.split("-")[1]) : el.header_element_id;
                    }
                }
                el = Object.assign({}, el, {header_element_id: newHeaderElementId});
                newList.push(el);

            }else{
                newList.push(el);
            }

        })

        if(newList.length == headerElsList.body.length){
            headerElsList = Object.assign({}, headerElsList, {body: newList});
            await setItemsList();
        }

    }

    const editItem = async (e)=>{

        e.preventDefault();
        e.stopPropagation();
        let touchedEl = e.target.closest(".accordion-control").nextSibling;
        let touchedElId = parseInt(touchedEl.id.split("-")[1]);
        let newList = headerElsList.body;
        let editableEl = newList.find(el=>(el.id == touchedElId));
        
        editableEl = typeof editableEl.isEditable =="undefined" ? Object.assign({}, editableEl, {isEditable : true}) : editableEl.isEditable == true ? Object.assign({}, editableEl, {isEditable : false}) : Object.assign({}, editableEl, {isEditable : true});
        newList.splice(touchedElId-originalHeaderElsList.body[0].id, 1, editableEl);
        headerElsList = Object.assign({}, headerElsList, { body : newList });
        await setItemsList();
        
    }

    const submitItem = async(e, header_el)=>{
        e.preventDefault();
        let newEl = Object.assign({}, header_el);
        Array.from(e.target.elements).map(input=>{
            let key = input.name;
            if(key != null && key.length>0){
                newEl = Object.assign({}, newEl, {[key] : input.value});
            }
        });
        newEl = Object.assign({}, newEl, {isEditable : false});
        let newList = headerElsList.body;
        newList[parseInt(newEl.id) - parseInt(originalHeaderElsList.body[0].id)] = newEl;
        headerElsList = Object.assign({}, headerElsList, { body : newList})
        await setItemsList();
    }

    const setItemsList = ()=>{

        let dragzone = [];
        let currentFormInputs = document.querySelector("#edit_header_form_form").firstChild;
        let parents=headerElsList.body.filter(el=>(el.header_element_id == null));
        const buildNestedList = (parents)=>{

            return parents.map((parent)=>{
                let newParents = headerElsList.body.filter(el=>(el.header_element_id == parent.id));
                parent = Object.assign({}, parent, { children : newParents});
                if(newParents.length > 0){
                    return Object.assign({}, parent, { children : buildNestedList(newParents)});
                }else{
                    return parent;
                }
            });

        }
        const buildHtml = ((nestedArray)=>{

            let tempHtml = [];

            nestedArray.map((header_el, index)=>{

                let children = header_el.children.length > 0 ? buildHtml(header_el.children) : undefined;

                return tempHtml.push(<React.Fragment key={`fragment-${header_el.id}`}>
                    {index == 0 ? <hr data-header_element_id={header_el.header_element_id} onDragOver={(e)=>dragOver(e)} key={`hrbefore-${header_el.id}`} className="dropzone"  id={`hrbefore-${header_el.id}`} /> : undefined}
                                    <a href="#" className="clickable accordion-control" key={`toggle-${header_el.id}`} onClick={(e)=>{toggleVisibility(e, header_el)}}><h3 key={`h3-${header_el.id}`} className={`title-accordion ${typeof header_el.isOpened != "undefined" ? header_el.isOpened == true ? "opened" : "" : "" }`}>
                                        <span>{header_el.value}</span>
                                        <div className="next">
                                            <div className="actions-edit">
                                                <button type="button" onClick={(e)=>{editItem(e)}} className="btn btn-secondary-revert edit-item">
                                                    <i className="fa-solid fa-edit" onClick={(e)=>{editItem(e)}}></i>
                                                </button>
                                            </div>
                                            <div className="actions-level">
                                                <button type="button" onClick={(e)=>{changeLevel(e, "parent")}} className="btn btn-secondary-revert parent-level">
                                                    <i className="fa-solid fa-level-up-alt flip-horizontal" onClick={(e)=>{changeLevel(e, "parent")}}></i>
                                                    </button>
                                                <button type="button" onClick={(e)=>{changeLevel(e, "children")}} className="btn btn-secondary-revert children-level">
                                                    <i className="fa-solid fa-level-down-alt flip-horizontal" onClick={(e)=>{changeLevel(e, "children")}}></i>
                                                </button>
                                            </div>
                                            <div className="actions-position">
                                                <button type="button" onClick={(e)=>{changePosition(e, "up")}} className="btn btn-secondary-revert upper-level">
                                                    <i className="fa-solid fa-angle-up" onClick={(e)=>{changePosition(e, "up")}}></i>
                                                    </button>
                                                <button type="button" onClick={(e)=>{changePosition(e, "down")}} className="btn btn-secondary-revert next-level">
                                                    <i className="fa-solid fa-angle-down" onClick={(e)=>{changePosition(e, "down")}}></i>
                                                </button>
                                            </div>
                                            <div className="actions-delete">
                                                <button type="button" onClick={(e)=>{removeItem(e)}} className="btn btn-secondary-revert edit-item">
                                                    <i className="fa-solid fa-trash-alt" onClick={(e)=>{removeItem(e)}}></i>
                                                </button>
                                            </div>
                                        </div>
                                        </h3>
                                    </a>
                                    {(typeof header_el.isEditable == "undefined" || header_el.isEditable == false) ? <HeaderAccordionElement header_el={header_el} index={index} children={children} dragStart={dragStart} dragOver={dragOver}/> : <HeaderAccordionEditableElement header_el={header_el} index={index} children={children} submitItem={submitItem} dragStart={dragStart} dragOver={dragOver}/>}
                                    {index == nestedArray.length ? undefined : <hr onDragOver={(e)=>dragOver(e)} className="dropzone"  data-header_element_id={header_el.header_element_id} key={`hrafter-${header_el.id}`} id={`hrafter-${header_el.id}`}/>}
                                    </React.Fragment>)



            })

            return tempHtml;



        })
        structuredHeaderElsList = Object.assign({}, headerElsList, { body : buildNestedList(parents)});
        dragzone = buildHtml(structuredHeaderElsList.body);
        if(dragzone.length > 0){
            ReactDOM.unmountComponentAtNode(currentFormInputs.querySelector("#dragndrop-results"));
            ReactDOM.render(
                <React.Fragment>
                    <div className="col-12 row">
                        <div className="col">
                            <button type="button" className="btn btn-secondary round add-element" onClick={(e)=>createElement(e)}><i className="fa-solid fa-plus"></i></button>
                        </div>
                        <div className="col-10">
                            <div  id="add-element"></div>
                        </div>
                    </div>
                    <div className="col-12 row responsive-table">
                        <ul key="header-table" className="col nested-list">{dragzone}</ul>
                    </div>
                </React.Fragment>,
                currentFormInputs.querySelector("#dragndrop-results")
            )
        }
    }

    
    const select = (args, id)=>{
        isSelectedHeader(true);
        setView(null);
        Request.post("/administrate/form/request/post?fragment")
        .send({ form_name: "edit_header_form_form" })
        .then((res)=>{

            setView(<div className="col-12" dangerouslySetInnerHTML={{__html : res.text}}></div>)
            let currentFormInputs = document.querySelector("#edit_header_form_form").firstChild;
            Request.post("/administrate/header/edit/post")
            .send({ms : currentFormInputs.querySelector("#ms").value, id : id })
            .then((res)=>{
                headerElsList = res;
                originalHeaderElsList = res;
                setItemsList();
            })

        }).catch(err=>{
            console.log(err);
        })
    }
    if(!selectedHeader){

        view = <SelectComponentPanel datas={args.datas} count={args.count} searchEngine={args.searchEngine} select={select} keys={["name", "lastModifiedAt"]} split={{"name" : "header_"}} current={args.current} />
        
    }

    return view;
}

export default HeaderEditPanels;