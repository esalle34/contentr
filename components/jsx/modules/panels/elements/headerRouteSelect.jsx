import React from "react";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index.js";

const HeaderRouteSelect = (args)=>{

    let view = <div className="col row"><p className="center">{i18n.translate("Nothing was found")}</p></div>
    let options = [];

    if(args.datas.length > 0){

        args.datas.map((data, index)=>{

            options.push(<option key={`option-${index}`} value={data.uri}>{data.title} - {data.uri}</option>)

        })

        view = <div className="input-group"><select className="form-control" name="uri">{options}</select></div>;

    }


    return view;

}

export default HeaderRouteSelect;