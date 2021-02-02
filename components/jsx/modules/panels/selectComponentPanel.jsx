import React from "react";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index.js";


const SelectComponentPanel = (args) => {

    let view = [];
    let view_thead = [];
    let finalcontainer = [];

    if (args.datas != null && args.datas.length > 0) {

        let parent = document.querySelector("#search-results:first-child:not(.responsive-table)");
        if (parent != null) {
            parent.classList.remove("row");
            parent.classList.add("responsive-table");
        }
        
        view.push(<tr key={`table-titles`}>
            {args.keys.map((key) => {
                return <td key={`${key}-label`} >{i18n.translate(key)}</td>
            })
            }
        </tr>)

        args.datas.map(data => {
            

            if (typeof data.title != "undefined" && data.title == null) {
                if (Boolean(data.isExternal)) {
                    data.title = <span className="info">{i18n.translate("<External link />")}</span>
                } else {
                    data.title = <span className="info">{i18n.translate("<No title />")}</span>
                }
            }
            view.push(<tr key={`table-values-${data.id}`}>
                {args.keys.map((key) => {
                    
                    if(typeof args.split != "undefined"){
                        let split = Object.keys(args.split).find(k=> (k == key));
                        if(typeof split != "undefined"){
                            data[key] = data[key].split(args.split[split])[1];
                        }
                    }
                    if(typeof args.translate != "undefined"){
                        if(args.translate.includes(key)){
                            data[key] = typeof i18n.translate(data[key]) != "undefined" ? i18n.translate(data[key]) : data[key];
                        }
                    }
                    if(key == "uri"){
                        return <td key={`${key}-value`}><a className="table-link " href={data[key]} target="_blank">{data[key]}</a></td>
                    }else if(key=="lastModifiedAt"){
                        return <td key={`${key}-value`} >{new Date(data[key]).toLocaleDateString(i18n.getLang())}, {new Date(data[key]).toLocaleTimeString(i18n.getLang())}</td>
                    }else{
                        return <td key={`${key}-value`} >{data[key]}</td>
                    }
                })
                }
                <td className="table-flex-btn row-reverse"><a key={`submit-${data.id}`} id={`submit-${data.id}`} name={`submit-${data.id}`} className="btn btn-secondary r-bold" href="#" onClick={() => args.select(args, data.id)}>{i18n.translate("Select")}</a></td>
            </tr>)
        }

        )

        let view_pages = [];
        if (args.count > 10) {
            let count = Math.ceil(args.count / 10);
            for (let i = 1; i <= count; i++) {
                view_pages.push(<a href="#" key={`page-${i}`} onClick={() => args.searchEngine(Object.assign({}, { page: i }))} className={`btn btn-secondary page-btn ${(typeof args.current != "undefined" && args.current == i) ? "current" : ""}`}>{i}</a>)
            }
        }
        finalcontainer.push(<div key="submit-container" className="col-12">

        </div>)

        view_pages = <div className="col row justify-content-center">{view_pages}</div>
        //Insertion des head & body dans les thead et tbody du tableau
        view_thead = <thead>{view_thead}</thead>
        view = <tbody>{view}</tbody>
        //Insertion des thead, tbody et du conteneur de soumission
        view = <React.Fragment><div className="col-10 responsive-table"><table className="col">{view}</table></div>{finalcontainer}{view_pages}</React.Fragment>
    } else {

        let parent = document.querySelector("#search-results:first-child.responsive-table");
        if (parent != null) {
            parent.classList.add("row");
            parent.classList.remove("responsive-table");
        }
        view = <div key="container-nothing-found" className="center"><h3>{i18n.translate("Nothing was found")}</h3></div>
    }

    return view;

}

export default SelectComponentPanel;