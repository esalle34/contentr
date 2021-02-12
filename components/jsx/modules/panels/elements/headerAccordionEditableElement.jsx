import React from "react";
import LinkForm from "./form/linkForm";
import DropdownForm from "./form/dropdownForm";
import ListForm from "./form/listForm";
import SpanForm from "./form/spanForm";

const HeaderAccordionEditableElement = (args) =>{

    let header_el = args.header_el;
    let index = args.index;
    let children = args.children;
    let dragStart = args.dragStart;
    let dragOver = args.dragOver;

    console.log(header_el)

    return <li id={`item-${header_el.id}`} onTouchStart={(e)=>dragStart(e)} onDragStart={(e)=>dragStart(e)}  onDragOver={(e)=>dragOver(e)} key={`row-${header_el.id}`} order={index} className={`draggable grabbable accordion-item ${typeof header_el.isOpened != "undefined" ? header_el.isOpened == true ? "opened" : "" : "" }`} draggable="true">
                {header_el.elem == "a" ? <LinkForm  header_el={header_el}/> : undefined}
                {header_el.elem == "dropdown" ? <DropdownForm  header_el={header_el}/> : undefined}
                {header_el.elem == "ul" ? <ListForm  header_el={header_el}/> : undefined}
                {header_el.elem == "span" ? <SpanForm  header_el={header_el}/> : undefined}
                {header_el.children.length > 0 ? <ul key={`list-${header_el.id}`} className="col">{children}</ul> : undefined}
            </li>;

}

export default HeaderAccordionEditableElement;