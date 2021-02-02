import React from "react";
import {theme_list} from "~/theme.js";
import { i18n } from "~/operations/modules/mandatory/i18n/services";

const InvokeTheme = (args)=>{

    const list = theme_list();

    let themes = [];
    
    themes.push(<option key={`key-default-value`} id={`key-default-value`} value="">{i18n.translate('Theme')}</option>)
    Object.keys(list).map((th)=>{
        themes.push(<option key={`key-${th}`} id={`key-${th}`} value={th}>{th.charAt(0).toUpperCase() + th.slice(1)}</option>)
    })

return <React.Fragment><label className="sr-only" htmlFor="theme">{i18n.translate('Theme')}</label><div><select id="theme" name="theme" className="form-control col-12">{themes}</select></div></React.Fragment>;

}

export default InvokeTheme;