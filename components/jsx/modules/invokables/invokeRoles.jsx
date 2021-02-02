import React from "react";
import Request from "superagent";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index.js";

class InvokeRoles extends React.Component{

    constructor(props){
        super(props);
        this.state = { view : null };
    }

    componentDidMount(){

        let inputContainer = [];

        Request.post("/administrate/users/roles")
        .send(`roles=${this.props.roles}`)
        .then(result=>{
            
            result = JSON.parse(result.text);
            result.roles.map((r)=>{
            r = r.charAt(0).toUpperCase() + r.slice(1);
            inputContainer.push(
            <div key ={`input-container-${r}`} className="form-group form-check col-12 col-sm-4">
                <div key ={`input-group-${r}`} className="input-group">
                    <input key ={`input-check-${r}`} id={`id-${r}`} className="form-check-input checkbox" type="checkbox" name={`is${r}`}>
                    </input>
                    <label key ={`input-label-${r}`} htmlFor={`id-${r}`} className="form-check-label">{i18n.translate(r)}
                    </label>
                </div>
            </div>)
            
            })

            this.setState({view : inputContainer});

        })
    
    }

    render(){

        return this.state.view;
    }
    
} 

export default InvokeRoles;