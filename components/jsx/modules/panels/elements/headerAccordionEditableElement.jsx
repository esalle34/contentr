import React from "react";
import HeaderElementForm from "./form/headerElementForm";

const HeaderAccordionEditableElement = (args) =>{

    let header_el = args.header_el;
    let index = args.index;
    let children = args.children;
    let dragStart = args.dragStart;
    let dragOver = args.dragOver;

    return <li id={`item-${header_el.id}`}  onDragOver={(e)=>dragOver(e)} key={`row-${header_el.id}`} order={index} className={`draggable grabbable accordion-item ${typeof header_el.isOpened != "undefined" ? header_el.isOpened == true ? "opened" : "" : "" }`} draggable="true">
                {typeof header_el.elem != "undefined" ? <HeaderElementForm  header_el={header_el} submitItem={args.submitItem}/> : undefined}
                {header_el.children.length > 0 ? <ul key={`list-${header_el.id}`} className="col">{children}</ul> : undefined}
            </li>;

}

export default HeaderAccordionEditableElement;