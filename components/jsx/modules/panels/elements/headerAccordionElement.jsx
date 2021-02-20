import React from "react";

const HeaderAccordionElement = (args) =>{

    let header_el = args.header_el;
    let index = args.index;
    let children = args.children;
    let dragStart = args.dragStart;
    let dragOver = args.dragOver;

    return <li id={`item-${header_el.id}`} onDragOver={(e)=>dragOver(e)} key={`row-${header_el.id}`} order={index} className={`draggable grabbable accordion-item ${typeof header_el.isOpened != "undefined" ? header_el.isOpened == true ? "opened" : "" : "" }`} draggable="true">
                {(typeof header_el.elem != "undefined" && header_el.elem != null) ? <div key={`element-${index}`} className="col">Element : {header_el.elem}</div> : undefined}
                {(typeof header_el.classes != "undefined" && header_el.classes != null) ? <div key={`classes-${index}`} className="col">Classes : {header_el.classes}</div> : undefined}
                {(typeof header_el.uri != "undefined" && header_el.uri != null) ? <div key={`uri-${index}`} className="col">Link : {header_el.uri}</div> : undefined}
                {header_el.children.length > 0 ? <ul key={`list-${header_el.id}`} className="col">{children}</ul> : undefined}
            </li>;

}

export default HeaderAccordionElement;