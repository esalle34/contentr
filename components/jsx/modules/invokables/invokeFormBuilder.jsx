import React, { useState, useEffect } from "react";
import { i18n } from "~/operations/modules/mandatory/i18n/services";
import InputContainerElement from "./elements/inputContainerElement";

const InvokeFormBuilder = (args) => {

    let [view, setView] = useState([]);
    let selectedValue = "input";
    let [inputs, setInputs] = useState([]);
    let draggedEl;

    const createInput = (e)=>{

        let newInput;
        switch(selectedValue){
            
            case "input":
                newInput = Object.assign({}, { id : inputs.length+1, el: "input", type: "text", labelbefore: true, isOpened : true, isEditable : true });
                setInputs(inputs => [...inputs, newInput]);
                break;
            case "select":
                newInput = Object.assign({}, { id : inputs.length+1, el: "select", labelbefore: true, isOpened : true, isEditable : true });
                setInputs(inputs => [...inputs, newInput]);
                break;
            case "ckeditor":
                newInput = Object.assign({}, { id : inputs.length+1, el: "ckEditor", labelbefore: true, isOpened : true, isEditable : true });
                setInputs(inputs => [...inputs, newInput]);
                break;
            
        }
    }

    const toggleVisibility = (e)=>{

        let newInput;
        if(e.target.closest("[class^='actions']") == null){
            newInput = inputs.find(el=>(el.id == e.target.closest(".accordion-control").id.split("-")[1]));
        }
        if(typeof newInput != "undefined"){

            let index = inputs.findIndex(el=>(el.id == e.target.closest(".accordion-control").id.split("-")[1]));
            newInput = Object.assign({}, newInput, {isOpened : !newInput.isOpened});
            let newInputs = inputs;
            newInputs.splice(index, 1, newInput);
            setInputs(inputs=>[...newInputs]);

        }

    }

    const dragStart = (e)=>{

        draggedEl = e.target.closest("a.draggable");

    }

    //dragOver différent du header, pas de gestion des éléments nichés nécéssaire
    const dragOver= (e)=>{

        let currentEl = e.target;
        let currentElId = currentEl.id.split("-")[1];

        if(typeof draggedEl != "undefined" && currentElId != draggedEl.id.split("-")[1]){

            let currentElTag = currentEl.id.split("-")[0]; 
            let draggedElId = draggedEl.id.split("-")[1];
    
            let tempInputs = inputs;
            let currentIndex = tempInputs.findIndex(el=>(el.id==currentElId));
            let currentValue = tempInputs.find(el=>(el.id==currentElId));
            let draggedIndex = tempInputs.findIndex(el=>(el.id==draggedElId));
            let draggedValue = tempInputs.find(el=>(el.id==draggedElId));

            if(currentElTag.includes("before")){
                tempInputs.splice(draggedIndex, 1);
                tempInputs.splice(currentIndex, 1, currentValue);
                tempInputs.splice(currentIndex, 0, draggedValue);
            }else if(currentElTag.includes("after")){
                tempInputs.splice(draggedIndex, 1);
                tempInputs.splice(currentIndex+1, 0, draggedValue);
            }

            let newInputs = [];
            tempInputs.map((input, index)=>{
                newInputs.push(Object.assign({}, input, {id : index+1}));
            })
            e.target.closest("form").reset();
            setInputs(inputs=>[...newInputs]);

        }
        
    }

    const changePosition = (e, direction)=>{

        let tempInputs = inputs;
        let currentElId =  e.target.id.split("-")[1];
        let currentIndex = tempInputs.findIndex(el=>(el.id == parseInt(currentElId)));
        let currentValue = tempInputs[currentIndex];
        currentIndex = parseInt(currentIndex);
        if(direction == "up"){

            let upperIndex = tempInputs.findIndex(el=>(el.id == parseInt(currentElId)-1));

            if(upperIndex != -1){

                tempInputs.splice(currentIndex, 1);
                tempInputs.splice(currentIndex-1, 0, currentValue);

            }

        }else if(direction == "down"){

            let bottomIndex = tempInputs.findIndex(el=>(el.id == parseInt(currentElId)+1));

            if(bottomIndex != -1){

                tempInputs.splice(currentIndex, 1);
                tempInputs.splice(bottomIndex, 0, currentValue);
                
            }

        }
        let newInputs = [];
        tempInputs.map((input, index)=>{
            newInputs.push(Object.assign({}, input, {id : index+1}))
        })
        e.target.closest("form").reset();
        setInputs(inputs=>[...newInputs]);

    }

    const removeInput = (e)=>{

        let tempInputs = inputs;
        let currentElId = e.target.id.split("-")[1];
        let currentIndex = tempInputs.findIndex(el=>(el.id == currentElId));
        tempInputs.splice(parseInt(currentIndex), 1);
        let newInputs= [];
        tempInputs.map((input, index)=>{
            newInputs.push(Object.assign({}, input, {id : index+1}))
        })
        setInputs(inputs=>[...newInputs]);
        
    }

    const inputStateChanged = (e, inputName, newInput, type = null)=>{

        submitItem(e, newInput = Object.assign({}, newInput, {[inputName]: e.target.value}));

        if(type != "checkbox"){

            if(e.target.value.length > 0){
                e.target.parentNode.previousSibling.classList.remove("invisible");
            }else{
                e.target.parentNode.previousSibling.classList.add("invisible");
            }

        }

    }

    const submitItem = (e, input)=>{

        let tempInputs = inputs;
        
        let index = tempInputs.findIndex(el=>(el.id == input.id));
        tempInputs.splice(index, 1, input);
        setInputs(inputs=>[...tempInputs]);

    }

    const buildHtml = ()=>{

        if(inputs.length > 0){

            let newView = [];

            inputs.map(newInput=>{
                
                    newView.push(<React.Fragment key={`input-el-${newInput.id}`}>
                        {newInput.id == 1 ? <hr key={`hrbefore-${newInput.id}`} onDragOver={(e)=>dragOver(e)} id={`hrbefore-${newInput.id}`}/> : undefined}
                            <a key={`link-${newInput.id}`} id={`link-${newInput.id}`} onTouchStart={(e)=>dragStart(e)} onDragStart={(e)=>dragStart(e)}className="clickable draggable accordion-control" onClick={(e)=>toggleVisibility(e)} draggable="true" ><h3 key={`title-${newInput.id}`} className={`title-accordion ${newInput.isOpened ? "opened" : ""}`}>
                                <span key={`span-${newInput.id}`}>{typeof newInput.name != "undefined" ? newInput.name.includes("ckeditor-") ? newInput.name.substring(9) : newInput.name : i18n.translate(newInput.el.charAt(0).toUpperCase() + newInput.el.substring(1))}</span>
                                    <div key={`actions-${newInput.id}`} className="next">
                                        <div key={`position-${newInput.id}`} className="actions-position">
                                            <button key={`position-btn-up-${newInput.id}`} id={`btnup-${newInput.id}`} type="button" onClick={(e) => { changePosition(e, "up") }} className="btn btn-secondary-revert upper-level">
                                                <i key={`position-icon-up-${newInput.id}`} id={`iconup-${newInput.id}`} className="fa-solid fa-angle-up" onClick={(e) => { changePosition(e, "up") }}></i>
                                            </button>
                                            <button key={`position-icon-bottom-${newInput.id}`} id={`btndown-${newInput.id}`} type="button" onClick={(e) => { changePosition(e, "down") }} className="btn btn-secondary-revert next-level">
                                                <i key={`position-icon-bottom-${newInput.id}`} id={`icondown-${newInput.id}`} className="fa-solid fa-angle-down" onClick={(e) => { changePosition(e, "down") }}></i>
                                            </button>
                                        </div>
                                        <div key={`delete-${newInput.id}`} className="actions-delete">
                                            <button key={`delete-btn-${newInput.id}`} type="button" id={`delete-${newInput.id}`} onClick={(e) => { removeInput(e) }} className="btn btn-secondary-revert edit-item">
                                                <i key={`delete-icon-${newInput.id}`} className="fa-solid fa-trash-alt" id={`delete-${newInput.id}`} onClick={(e) => { removeInput(e) }}></i>
                                            </button>
                                        </div>
                                    </div>
                            </h3></a>
                                <InputContainerElement el={newInput.el} properties={newInput} inputStateChanged={inputStateChanged} />
                        <hr key={`hrafter-${newInput.id}`} onDragOver={(e)=>dragOver(e)} id={`hrafter-${newInput.id}`}/>
                    </React.Fragment>)
            })

            view = newView;

        }

    }

    const changeValue = (e)=>{
        selectedValue = e.target.value;
    }

    buildHtml();

    let createElement = <React.Fragment><div className="col-12 form-group">
        <select id="elem-select" className="form-control" defaultValue="input" onChange={(e)=>changeValue(e)}>
            <option value="input">{i18n.translate("Input")}</option>
            <option value="select">{i18n.translate("Select")}</option>
            <option value="ckeditor">{i18n.translate("Ckeditor")}</option>
        </select>
    </div>
    <div className="col-12 form-group">
        <div className="input-group">
            <div id="add-new" className="btn btn-secondary next" onClick={(e) => createInput(e)}>{i18n.translate("Add New")}</div>
        </div>
    </div>
        <div id="new-elements" className="col-12 row responsive-table"><ul className="col nested-list">{view}</ul></div>
    </React.Fragment>;

    return createElement;

}

export default InvokeFormBuilder;