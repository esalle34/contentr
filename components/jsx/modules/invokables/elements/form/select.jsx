import React from "react";
import { i18n } from "~/operations/modules/mandatory/i18n/services";

const Select = (args) =>{

    if(typeof args.properties != "undefined" && args.properties.isEditable == true){

        let newInput = Object.assign({}, args.properties);

        return <React.Fragment key={`input-frag-${args.properties.id}`}>
            
            <div className="row" key={`row-${args.properties.id}`}>
                <input type="hidden" name={`element-${args.properties.id}`} value={args.el}></input>
                <div className="form-group col-6" key={`form-group-name-${args.properties.id}`}>
                    <label key={`prelabel-${args.properties.id}`} htmlFor={`input-name-${args.properties.id}`} className="invisible">{i18n.translate("Name")}</label>
                    <div className="input-group" key={`input-group-name-${args.properties.id}`}>
                        <input key={`input-name-${args.properties.id}`} type="text" placeholder={i18n.translate("Name")} name={`name-${args.properties.id}`} onChange={(e)=>args.inputStateChanged(e, "name", newInput)} className="form-control validate_string minlength-3" defaultValue={newInput.name}></input>
                    </div>
                </div>
                <div className="form-group col-6" key={`form-group-id-${args.properties.id}`}>
                    <label key={`prelabel-${args.properties.id}`} htmlFor={`input-id-${args.properties.id}`} className="invisible">{i18n.translate("Id")}</label>
                    <div className="input-group" key={`input-group-id-${args.properties.id}`}>
                        <input key={`input-id-${args.properties.id}`} type="text" placeholder={i18n.translate("Id")} name={`id-${args.properties.id}`} onChange={(e)=>args.inputStateChanged(e, "text-id", newInput)} className="form-control validate_string minlength-3" defaultValue={newInput["text-id"]}></input>
                    </div>
                </div>
                <div className="form-group col-12" key={`form-group-values-${args.properties.id}`}>
                    <label key={`prelabel-${args.properties.id}`} className="invisible" htmlFor={`input-group-values-${args.properties.id}`}>{i18n.translate("Values, separate label and values with '|', next value with ','")}</label>
                        <div className="input-group" key={`input-group-values-${args.properties.id}`}>
                            <textarea key={`input-group-values-${args.properties.id}`} id={`input-group-values-${args.properties.id}`} name={`values-${args.properties.id}`} placeholder={i18n.translate("Values, separate label and values with '|', next value with ','")+"..."} onChange={(e)=>args.inputStateChanged(e, "values", newInput)} className="form-control" defaultValue={newInput.values}></textarea>
                        </div>
                </div>
                <div className="form-group form-check col-3 checkbox-container" key={`form-group-label-before-${args.properties.id}`}>
                    <div key={`input-group-label-before-${args.properties.id}`}>
                        <input key={`input-label-before-${args.properties.id}`} id={`input-label-before-${args.properties.id}`} defaultChecked={newInput.labelbefore} name={`prelabel-${args.properties.id}`} type="checkbox" placeholder={i18n.translate("Is label before input ?")} onChange={(e)=>args.inputStateChanged(e, "labelbefore", newInput, "checkbox")} className="form-check-input checkbox" defaultValue={newInput.labelbefore}></input>
                    </div>
                    <label key={`prelabel-${args.properties.id}`} htmlFor={`input-label-before-${args.properties.id}`}  className="form-check-label">{i18n.translate("Is label before input ?")}</label>
                </div>
                <div className="form-group col-9" key={`form-group-label-${args.properties.id}`}>
                    <label key={`prelabel-${args.properties.id}`} htmlFor={`input-label-${args.properties.id}`} className="invisible">{i18n.translate("Label")}</label>
                    <div className="input-group" key={`input-group-label-${args.properties.id}`}>
                        <input key={`input-label-${args.properties.id}`} id={`input-label-${args.properties.id}`} name={`label-${args.properties.id}`} type="text" placeholder={i18n.translate("Label")} onChange={(e)=>args.inputStateChanged(e, "label", newInput)} className="form-control validate_string minlength-3" defaultValue={newInput.label}></input>
                    </div>
                </div>
                <div className="form-group col-12" key={`form-group-groupclassName-${args.properties.id}`}>
                    <label key={`prelabel-${args.properties.id}`} htmlFor={`input-groupclassName-${args.properties.id}`} className="invisible">{i18n.translate("Group Classes")}</label>
                        <div className="input-group" key={`input-group-groupclassName-${args.properties.id}`}>
                            <input key={`input-groupclassName-${args.properties.id}`} id={`input-groupclassName-${args.properties.id}`} name={`groupClassName-${args.properties.id}`} type="text" placeholder={i18n.translate("Group Classes")} onChange={(e)=>args.inputStateChanged(e, "groupClassName", newInput)} className="form-control" defaultValue={newInput.groupClassName}></input>
                        </div>
                </div>
                <div className="form-group col-12" key={`form-group-className-${args.properties.id}`}>
                    <label key={`prelabel-${args.properties.id}`} htmlFor={`input-className-${args.properties.id}`} className="invisible">{i18n.translate("Classes")}</label>
                        <div className="input-group" key={`input-group-className-${args.properties.id}`}>
                            <input key={`input-className-${args.properties.id}`} id={`input-className-${args.properties.id}`} name={`className-${args.properties.id}`} type="text" placeholder={i18n.translate("Classes")} onChange={(e)=>args.inputStateChanged(e, "className", newInput)} className="form-control" defaultValue={newInput.className}></input>
                        </div>
                </div>
            </div>
        </React.Fragment>

    }

}

export default Select;