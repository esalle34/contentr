import React from "react";
import Input from "./form/input";
import Select from "./form/select";
import Default from "./form/default";

const InputContainerElement = (args)=>{

    let template;
    switch(args.el){
        case "input":
            template = <Input el={args.el} properties={args.properties} inputStateChanged={args.inputStateChanged}/>;
            break;
        case "select":
            template = <Select el={args.el} properties={args.properties} inputStateChanged={args.inputStateChanged}/>;
            break;
        default:
            template = <Default el={args.el} properties={args.properties} inputStateChanged={args.inputStateChanged}/>;
            break;

    }

    return <React.Fragment key={`input-container-frag-${args.properties.id}`}>
            <li key={`item-${args.properties.id}`} className={`draggable grabbable accordion-item ${args.properties.isOpened ? "opened" : ""}`} draggable="true">
                {template}
            </li></React.Fragment>;

}

export default InputContainerElement;