import React from "react";
import { i18n } from "~/operations/modules/mandatory/i18n/services";

const Input = (args)=>{

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
                <div className="col-3 form-group">
                    <label key={`type-select-label-${args.properties.id}`} htmlFor={`type-select-${args.properties.id}`} >{i18n.translate("Type")}</label>
                    <select key={`type-select-${args.properties.id}`} id={`type-select-${args.properties.id}`} name={`type-${args.properties.id}`} className="form-control" defaultValue={args.properties.type} onChange={(e)=>args.inputStateChanged(e, "type", newInput)}>
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="email">Email</option>
                        <option value="password">Password</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="submit">Submit</option>
                    </select>
                </div>
                {typeof args.properties.type != "undefined" ?
                args.properties.type == "text" ? 
                <div className="col-12 row">
                    <div className="form-group col-6" key={`form-group-minlength-${args.properties.id}`}>
                        <label key={`prelabel-${args.properties.id}`} htmlFor={`input-minlength-${args.properties.id}`} className="invisible">{i18n.translate("Min length")}</label>
                        <div className="input-group" key={`input-group-minlength-${args.properties.id}`}>
                            <input key={`input-minlength-${args.properties.id}`} id={`input-minlength-${args.properties.id}`} name={`minlength-${args.properties.id}`} type="text" placeholder={i18n.translate("Min length")} onChange={(e)=>args.inputStateChanged(e, "minlength", newInput)} className="form-control validate_number min-3 max-255" defaultValue={newInput.minlength}></input>
                        </div>
                    </div>
                    <div className="form-group col-6" key={`form-group-maxlength-${args.properties.id}`}>
                        <label key={`prelabel-${args.properties.id}`} htmlFor={`input-maxlength-${args.properties.id}`} className="invisible">{i18n.translate("Max length")}</label>
                        <div className="input-group" key={`input-group-maxlength-${args.properties.id}`}>
                            <input key={`input-maxlength-${args.properties.id}`} id={`input-maxlength-${args.properties.id}`} name={`maxlength-${args.properties.id}`} type="text" placeholder={i18n.translate("Max length")} onChange={(e)=>args.inputStateChanged(e, "maxlength", newInput)} className="form-control validate_number min-3 max-255" defaultValue={newInput.maxlength}></input>
                        </div>
                    </div>
                    <div className="form-group form-check col-3 checkbox-container" key={`form-group-label-before-${args.properties.id}`}>
                        <div key={`input-group-label-before-${args.properties.id}`}>
                            <input key={`input-label-before-${args.properties.id}`} id={`input-label-before-${args.properties.id}`} name={`prelabel-${args.properties.id}`} type="checkbox" defaultChecked={newInput.labelbefore} placeholder={i18n.translate("Is label before input ?")} onChange={(e)=>args.inputStateChanged(e, "labelbefore", newInput, "checkbox")} className="form-check-input checkbox" defaultValue={newInput.labelbefore}></input>
                        </div>
                        <label key={`prelabel-${args.properties.id}`} htmlFor={`input-label-before-${args.properties.id}`} className="form-check-label" >{i18n.translate("Is label before input ?")}</label>
                    </div>
                    <div className="form-group col-9" key={`form-group-label-${args.properties.id}`}>
                        <label key={`prelabel-${args.properties.id}`} htmlFor={`input-label-${args.properties.id}`} className="invisible">{i18n.translate("Label")}</label>
                        <div className="input-group" key={`input-group-label-${args.properties.id}`}>
                            <input key={`input-label-${args.properties.id}`} id={`input-label-${args.properties.id}`} name={`label-${args.properties.id}`} type="text" placeholder={i18n.translate("Label")} onChange={(e)=>args.inputStateChanged(e, "label", newInput)} className="form-control validate_string minlength-3" defaultValue={newInput.label}></input>
                        </div>
                    </div>
                </div>
                : args.properties.type == "number" ?
                <div className="col-12 row">
                    <div className="form-group col-6" key={`form-group-min-${args.properties.id}`}>
                        <label key={`prelabel-${args.properties.id}`} htmlFor={`input-min-${args.properties.id}`} className="invisible">{i18n.translate("Min")}</label>
                        <div className="input-group" key={`input-group-min-${args.properties.id}`}>
                            <input key={`input-min-${args.properties.id}`} id={`input-min-${args.properties.id}`} name={`min-${args.properties.id}`} type="text" placeholder={i18n.translate("Min")} onChange={(e)=>args.inputStateChanged(e, "min", newInput)} className="form-control validate_number min-3" defaultValue={newInput.min}></input>
                        </div>
                    </div>
                    <div className="form-group col-6" key={`form-group-max-${args.properties.id}`}>
                        <label key={`prelabel-${args.properties.id}`} htmlFor={`input-max-${args.properties.id}`} className="invisible">{i18n.translate("Max")}</label>
                        <div className="input-group" key={`input-group-max-${args.properties.id}`}>
                            <input key={`input-max-${args.properties.id}`} id={`input-max-${args.properties.id}`} name={`max-${args.properties.id}`} type="text" placeholder={i18n.translate("Max")} onChange={(e)=>args.inputStateChanged(e, "max", newInput)} className="form-control validate_number min-3" defaultValue={newInput.max}></input>
                        </div>
                    </div>
                    <div className="form-group form-check col-3 checkbox-container" key={`form-group-label-before-${args.properties.id}`}>
                        <div key={`input-group-label-before-${args.properties.id}`}>
                            <input key={`input-label-before-${args.properties.id}`} id={`input-label-before-${args.properties.id}`} name={`prelabel-${args.properties.id}`} type="checkbox" placeholder={i18n.translate("Is label before input ?")} onChange={(e)=>args.inputStateChanged(e, "labelbefore", newInput, "checkbox")} className="form-check-input checkbox" defaultValue={newInput.labelbefore}></input>
                        </div>
                        <label key={`prelabel-${args.properties.id}`} htmlFor={`input-label-before-${args.properties.id}`} className="form-check-label">{i18n.translate("Is label before input ?")}</label>
                    </div>
                    <div className="form-group col-9" key={`form-group-label-${args.properties.id}`}>
                        <label key={`prelabel-${args.properties.id}`} htmlFor={`input-label-${args.properties.id}`} className="invisible">{i18n.translate("Label")}</label>
                        <div className="input-group" key={`input-group-label-${args.properties.id}`}>
                            <input key={`input-label-${args.properties.id}`} id={`input-label-${args.properties.id}`} name={`label-${args.properties.id}`} type="text" placeholder={i18n.translate("Label")} onChange={(e)=>args.inputStateChanged(e, "label", newInput)} className="form-control validate_string minlength-3" defaultValue={newInput.label}></input>
                        </div>
                    </div>
                </div>
                : args.properties.type == "checkbox" ?
                <div className="col-12 row">
                    <div className="form-group col-6" key={`form-group-checkbox-on-value-${args.properties.id}`}>
                        <label key={`prelabel-${args.properties.id}`} htmlFor={`label-on-value-${args.properties.id}`} className="invisible">{i18n.translate("Label if true")}</label>
                        <div className="input-group" key={`label-on-value-${args.properties.id}`}>
                            <input key={`label-on-value-${args.properties.id}`} id={`label-on-value-${args.properties.id}`} name={`onvalue-${args.properties.id}`} type="text" placeholder={i18n.translate("Label if true")} onChange={(e)=>args.inputStateChanged(e, "ontrue", newInput)} className="form-control validate_string minlength-3" defaultValue={newInput.ontrue}></input>
                        </div>
                    </div>
                    <div className="form-group col-6" key={`form-group-checkbox-off-value-${args.properties.id}`}>
                        <label key={`prelabel-${args.properties.id}`} htmlFor={`label-off-value-${args.properties.id}`} className="invisible">{i18n.translate("Label if false")}</label>
                        <div className="input-group" key={`label-off-value-${args.properties.id}`}>
                            <input key={`label-off-value-${args.properties.id}`} id={`label-off-value-${args.properties.id}`} name={`offvalue-${args.properties.id}`} type="text" placeholder={i18n.translate("Label if false")} onChange={(e)=>args.inputStateChanged(e, "onfalse", newInput)} className="form-control validate_string minlength-3" defaultValue={newInput.onfalse}></input>
                        </div>
                    </div>
                </div>
                : args.properties.type == "submit" ? 
                <div className="form-group col-9" key={`form-group-els-${args.properties.id}`}>
                    <label key={`prelabel-${args.properties.id}`} htmlFor={`els-${args.properties.id}`} className="invisible">{i18n.translate("Value")}</label>
                    <div className="input-group" key={`els-${args.properties.id}`}>
                        <input key={`els-${args.properties.id}`} id={`els-${args.properties.id}`} name={`els-${args.properties.id}`} type="text" placeholder={i18n.translate("Value")} onChange={(e)=>args.inputStateChanged(e, "value", newInput)} className="form-control validate_string minlength-3" defaultValue={newInput.value}></input>
                    </div>
                </div>
                : undefined : undefined}
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

export default Input;