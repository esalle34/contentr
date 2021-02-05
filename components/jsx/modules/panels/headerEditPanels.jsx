import React, {useState} from "react";
import ReactDOM from "react-dom";
import SelectComponentPanel from "./selectComponentPanel";
import Request from "superagent";

const HeaderEditPanels = (args)=>{

    let [view, setView] = useState([]);
    let [selectedHeader, isSelectedHeader] = useState(false);
    let headerElsList;
    let targetEl = null;
    let draggedEl = null;

    const dragOver = (e)=>{

        targetEl = e.target;

        if(targetEl.getAttribute("order")!= null && draggedEl != null){
            let newList = [];
            let splicedEl;
                headerElsList.body.map((el, index)=>{
                    if(index != document.getElementById(draggedEl.id).getAttribute("order")){

                        newList.push(el);

                    }else{
                        splicedEl = el;
                    }


                })

                newList.splice(targetEl.getAttribute("order"), 0, splicedEl);

                
                let tempList = headerElsList;
                let tempTargetEl = targetEl;
                
                let timer = setTimeout(function(){
                    if(tempList!=headerElsList || tempTargetEl == targetEl || tempTargetEl == draggedEl){
                        clearTimeout(timer);
                    }else{
                        headerElsList = Object.assign({}, headerElsList, {body : newList});
                        setItemsList();
                    }
                }, 100);

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

                return tempHtml.push(<li onDragOver={(e)=>dragOver(e)} id={`item-${header_el.id}`} onDragStart={(e)=>dragStart(e)} key={`row-${index}`} order={`${index}`} className="row draggable grabbable" draggable="true">
                {(typeof header_el.elem != "undefined" && header_el.elem != null) ? <div key={`element-${index}`} className="col">Element : {header_el.elem}</div> : undefined}
                {(typeof header_el.classes != "undefined" && header_el.classes != null) ? <div key={`classes-${index}`} className="col">Classes : {header_el.classes}</div> : undefined}
                {(typeof header_el.uri != "undefined" && header_el.uri != null) ? <div key={`uri-${index}`} className="col">Link : {header_el.uri}</div> : undefined}
                {header_el.children.length > 0 ? <ul>{children}</ul> : undefined}</li>)



            })

            return tempHtml;



        })
        headerElsList = Object.assign({}, headerElsList, { body : buildNestedList(parents)});
        dragzone = buildHtml(headerElsList.body);
        ReactDOM.unmountComponentAtNode(currentFormInputs.querySelector("#dragndrop-results"));
        ReactDOM.render(
            <div className="col-12 row"><ul className="col-12">{dragzone}</ul></div>,
            currentFormInputs.querySelector("#dragndrop-results")
        )

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