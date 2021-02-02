import React, {useState} from "react";
import ReactDOM from "react-dom";
import SelectComponentPanel from "./selectComponentPanel";
import Request from "superagent";

const HeaderEditPanels = (args)=>{

    let [view, setView] = useState([]);
    let [selectedHeader, isSelectedHeader] = useState(false);

    const listenDrag = ()=>{
        console.log(event);
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
                let dragzone = [];
                let parents=res.body.filter(parent=>(parent.header_element_id == null));
                console.log(parents)
                res.body.map((header_el, index)=>{
                    dragzone.push(<div onDrag={()=>listenDrag()} key={`row-${index}`} order={`${index}`} className="col-12 row draggable" draggable="true">
                        {(typeof header_el.elem != "undefined" && header_el.elem != null) ? <div key={`element-${index}`} className="col">Element : {header_el.elem}</div> : undefined}
                        {(typeof header_el.classes != "undefined" && header_el.classes != null) ? <div key={`classes-${index}`} className="col">Classes : {header_el.classes}</div> : undefined}
                        {(typeof header_el.uri != "undefined" && header_el.uri != null) ? <div key={`uri-${index}`} className="col">Link : {header_el.uri}</div> : undefined}
                        </div>)
                })
                ReactDOM.render(
                    <div >{res.text}</div>,
                    currentFormInputs.querySelector("#dragndrop-results")
                )
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