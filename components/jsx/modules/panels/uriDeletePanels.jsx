import React from "react";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index.js";

 const UriDeletePanels = (args) => {

    const selectAllClick=(e)=>{
        let checkboxes;
        if(e.target.checked){
            checkboxes = e.target.closest("#search-results").querySelectorAll("input[type=checkbox]:not(:checked)")
            Array.from(checkboxes).map(c=>{
                c.checked = true;
            })
        }else{
            checkboxes = e.target.closest("#search-results").querySelectorAll("input[type=checkbox]:checked")
            Array.from(checkboxes).map(c=>{
                c.checked = false;
            })
        }

    };

    const check = (e) =>{

        if(!e.target.checked){

            let selectAll = e.target.closest("#search-results").querySelector("#select-all-bellow");
            if(selectAll.checked){
                selectAll.checked = false;
            }

        }else if(e.target.checked){

            let checkboxes = e.target.closest("#search-results").querySelectorAll("input[type=checkbox]:not(:checked):not(#select-all-bellow)");
            if(checkboxes.length == 0){
                let selectAll = e.target.closest("#search-results").querySelector("#select-all-bellow");
                if(!selectAll.checked){
                    selectAll.checked = true;
                }

            }

        }

    }

    let view = [];
    let view_thead = [];
    let view_submit = [];
    if(args.datas != null && args.datas.length > 0){

        let parent = document.querySelector("#search-results:first-child:not(.responsive-table)");
        if(parent != null){
            parent.classList.remove("row");
            parent.classList.add("responsive-table");
        }

        view.push(<tr key="route-check-select-all">
                    <td key="title-label">{i18n.translate("Title")}</td>
                    <td key="link-label">{i18n.translate("Link")}</td>
                    <td key="date-label">{i18n.translate("Last update")}</td>
                    <td><input key={`check-all-bellow`} id="select-all-bellow" key="select-all-bellow" type="checkbox" className="flex-checkbox onclick-select-all-bellow" onClick={selectAllClick} /></td>
                </tr>)
        args.datas.map(m=>
            {if(m.title == null){
                if(Boolean(m.isExternal)){
                    m.title = <span className="info">{i18n.translate("<External link />")}</span>
                }else{
                    m.title = <span className="info">{i18n.translate("<No title />")}</span>
                }
            }
            view.push(<tr key={`route-key-${m.id}`}>
                            <td key={`title-value-` + m.id}>{m.title}</td>
                            <td key={`link-value-` + m.id}><a href={m.uri} target="_blank">{m.uri}</a></td>
                            <td key={`date-value-` + m.id}>{new Date(m.lastModifiedAt).toLocaleDateString(i18n.getLang())}, {new Date(m.lastModifiedAt).toLocaleTimeString(i18n.getLang())}</td>
                            <td><input key={`delete-route-${m.id}`} id={`delete-route-${m.id}`} name={`delete-route-${m.id}`} type="checkbox" className="flex-checkbox col-1" onClick={check}></input></td>
                    </tr>)
            }
            
        )
        
        let view_pages = [];
        if(args.count > 10){
            let count = Math.ceil(args.count/10);
            for(let i = 1; i <= count; i++){
                view_pages.push(<a href ="#" key={`page-${i}`} onClick={()=> args.searchEngine(Object.assign({}, {page : i}))} className={`btn btn-secondary page-btn ${(typeof args.current != "undefined" && args.current == i ) ? "current" : "" }`}>{i}</a>)
            }
        }
        view_submit.push(<div key="submit-container" className="form-group col-12">
                            <div className="input-group">
                                <input type="submit" className="next btn btn-primary submit" value={i18n.translate("Submit")}/>
                            </div>
        </div>)

        view_pages = <div className="col row justify-content-center">{view_pages}</div>
        //Insertion des head & body dans les thead et tbody du tableau
        view_thead = <thead>{view_thead}</thead>
        view = <tbody>{view}</tbody>
        //Insertion des thead, tbody et du conteneur de soumission
        view = <React.Fragment><div className="col-10 responsive-table"><table className="col">{view}</table></div>{view_submit}{view_pages}</React.Fragment>
    }else{

        let parent = document.querySelector("#search-results:first-child.responsive-table");
        if(parent != null){
            parent.classList.add("row");
            parent.classList.remove("responsive-table");
        }
        view = <div key="container-nothing-found" className = "center"><h3>{i18n.translate("Nothing was found")}</h3></div>
    }

    return view;


}

export default UriDeletePanels;