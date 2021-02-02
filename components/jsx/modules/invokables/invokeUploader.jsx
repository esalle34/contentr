import React, { useState } from "react";
import ReactDOM from "react-dom";
import { root_folder_list } from "~/theme.js";
import { i18n } from "~/operations/modules/mandatory/i18n/services/index.js";
import Request from "superagent";
import { officeRegistry } from "~/components/jsx/modules/office-app.registry";
import { store } from "~/components/jsx/modules/redux/stores/store";
import Dropdown from "~/components/jsx/templates/html/content/dropdown";

const InvokeUploader = (args) => {

    const list = root_folder_list();

    let root_folders = [];

    //Elements that will trigger ReactDOM.render
    let filelist = document.getElementById("file-list");
    let fileaction = document.getElementById("file-action-container");

    //Constants
    const addFileServiceURI = "/administrate/form/request/post?fragment";
    const removeFileURI = "/administrate/uploads/files/remove";
    const browseFilesURI = "/administrate/uploads/search";
    const imagesExtensions = [".svg", ".png", ".webp", ".jp2", ".jdr", ".hdp", ".wdp", ".jpg", ".jpeg", ".gif"];
    const videosExtensions = [".mp4", ".avi", ".mpeg", ".mov"];
    const fileCodeExtensions = [".html", ".html", ".js", ".jsx", ".css", ".sass"];
    const fileExtensions = [".pdf", ".odt", ".csv", ".txt"];

    let lastFolder;
    let [form_view, setFormView] = useState([])

    const add = (type, folder = null) => {

        Request.post(addFileServiceURI)
            .send({ form_name: "add_" + type + "_form" })
            .then(res => {

                let form_container = document.getElementById("form-container");
                let f_input = document.getElementById("files");

                ReactDOM.unmountComponentAtNode(form_container);

                ReactDOM.render(
                    <React.Fragment><div dangerouslySetInnerHTML={{ __html: res.text }}></div><div id="init-upload-form"></div></React.Fragment>,
                    form_container
                )

                let form = form_container.firstChild.firstChild;

                if (type == "file") {

                    form.setAttribute("action", form.getAttribute("action").replace("/add*", folder == null ? "/add" + f_input.value : "/add" + folder));

                }

                let Form = officeRegistry["form"];
                ReactDOM.render(
                    <Form key={`form-control-uploads`} form={form_container.querySelector("form")} store={store} displayFiles={(folder) => displayFiles(folder)} />,
                    form_container.querySelector("#init-upload-form")
                )

                if (type == "folder") {

                    let temp_input = document.createElement("input");
                    temp_input.type = "hidden";
                    temp_input.value = folder == null ? f_input.value : folder;
                    temp_input.name = "folderpath";
                    form.append(temp_input);

                }


            })

    }

    const enterFolder = (path) => {

        displayFiles(path)

    }

    const removeFile = (file) => {

        Request.post(removeFileURI)
            .send({ file: file })
            .then(res => {

                displayFiles(lastFolder);
                let f_input = document.getElementById("files");
                if (lastFolder != f_input.value) {
                    lastFolder = undefined;
                }

            })
    }


    const onChange = () => {

        displayFiles();

    }

    const renderNothingFound = (folder) => {

        let f_input = document.getElementById("files");

        //If nothing to render, file browser will display this
        ReactDOM.unmountComponentAtNode(filelist);
        ReactDOM.render(
            <React.Fragment><div key="title-container-file-list" className="col-12 title"><h3 key="title-file-list" className="title p-border">{i18n.translate("File list")}{f_input.value.length > 0 ? <React.Fragment><br /><small className="center w-small">{i18n.translate("Path")} : {folder != null ? folder : f_input.value}</small></React.Fragment> : ""}</h3></div>
                {(lastFolder != folder && folder != null) ?
                    <div key="container-back" className="col-12"><a href="#" key="back-btn" className="btn btn-secondary upload-back" key="upload-go-to-upper-folder" onClick={() => enterFolder(lastFolder)} >{i18n.translate("Back")}</a></div> : undefined}
                <h3 key="nothing-found" className="center info">{i18n.translate("No file was found")}</h3>
            </React.Fragment>,
            filelist
        )


    }

    const displayFiles = (folder = null) => {

        if (folder == null) {
            lastFolder = undefined;
        }

        let f_input = document.getElementById("files");

        let file_actions = [];
        let file_actions_els = <React.Fragment>
            <a key="add-file-item" className="dropdown-item" href="#" onClick={() => add("folder", folder)}>{i18n.translate('Folder')}</a>
            <a key="add-folder-item" className="dropdown-item" href="#" onClick={() => add("file", folder)}>{i18n.translate('File')}</a>
        </React.Fragment>
        file_actions = <div className="file-action center">
            <Dropdown value={<i className="fa-solid fa-plus" aria-hidden="true">{i18n.translate("Add")}</i>} innerTagElement="a" id={`action-menu`} dropDownClassName="submenu" classes="dropdown-item" els={file_actions_els}></Dropdown>
            <div id="form-container" className="form-container" dangerouslySetInnerHTML={{ __html: form_view }}></div>
        </div>

        Request.post(browseFilesURI)
            .send({ root_path: folder == null ? f_input.value : folder })
            .then(res => {
                let file_container = [];
                //Browser title and currentfilepath
                if (typeof res.body.message == "undefined") {
                    file_container.push(<div key="title-container-file-list" className="col-12 title">
                        <h3 key="title-file-list" className="title p-border">{i18n.translate("File list")}{f_input.value.length > 0 ?
                            <React.Fragment>
                                <br />
                                <small className="center w-small">{i18n.translate("Path")} : {folder != null ? folder : f_input.value}</small>
                            </React.Fragment> : ""}
                        </h3>
                    </div>)
                    if (typeof res.body != "undefined" && typeof res.body[0] != "undefined") {
                        lastFolder = res.body[0].path;
                    }
                    if (typeof lastFolder != "undefined" && lastFolder != f_input.value) {
                        file_container.push(<div key="container-back" className="col-12">
                            <a href="#" key="back-btn" className="btn btn-secondary upload-back" key="upload-go-to-upper-folder" onClick={() => enterFolder(lastFolder.substring(0, lastFolder.lastIndexOf("/" + lastFolder.split("/").pop())))} >{i18n.translate("Back")}
                            </a>
                        </div>)
                    }
                    
                    let hasFiles = false;
                    //Browser elements
                    res.body.map((file, index) => {
                        //Each element may trigger different render styles and options
                        //Folders
                        if (file.extension.length == 0) {
                            //Element Options and callback
                            let link_tags = [];
                            hasFiles = true;
                            link_tags.push(<a className="dropdown-item" href="#" key={`upload-go-to-folder-${index}`} onClick={() => enterFolder(file.path + "/" + file.filename)} path={file.path + "/" + file.filename}>{i18n.translate("Enter")}</a>)
                            link_tags.push(<a className="dropdown-item" href="#" key={`upload-remove-${index}`} onClick={() => removeFile(file.path + "/" + file.filename)}>{i18n.translate("Remove")}</a>)

                            file_container.push(<div className={f_input.value.indexOf("video") > -1 ? "col-8 col-sm-4 center f-col" : "col center f-col"} key={`folder-container-${index}`}>
                                <a key={`folder-link-${index}`} className={f_input.value.indexOf("video") > -1 ? "upload-video-icon folder clickable" : "upload-icon clickable"} onDoubleClick={() => enterFolder(file.path + "/" + file.filename)}>
                                    <i key={`folder-icon-${index}`} className="fa-solid fa-folder-open upload-folder" aria-hidden="true"></i>
                                </a>
                                <p key={`folder-title-${index}`} className="center b-word">{file.filename}</p>
                                <div key={`folder-dropdown-${index}`} className="end-content">
                                    <Dropdown value={i18n.translate("Options")} innerTagElement="a" id={`link-menu-${index}`} dropDownClassName="submenu" classes="dropdown-item" els={link_tags}></Dropdown>
                                </div>
                            </div>)
                        }
                        //Images
                        if (imagesExtensions.includes(file.extension)) {
                            //Element Options and callback
                            let link_tags = [];
                            hasFiles = true;
                            link_tags.push(<a className="dropdown-item" key={`upload-check-${index}`} href={file.path + "/" + file.filename} target="_blank">{i18n.translate("Overview")}</a>)
                            link_tags.push(<a className="dropdown-item" key={`upload-dl-${index}`} href={file.path + "/" + file.filename} download={file.filename}>{i18n.translate("Download")}</a>)
                            link_tags.push(<a className="dropdown-item" href="#" key={`upload-remove-${index}`} onClick={() => removeFile(file.path + "/" + file.filename)}>{i18n.translate("Remove")}</a>)

                            file_container.push(<div className="col center f-col" key={`img-container-${index}`}>
                                <a key={`image-link-${index}`} className="clickable" href={file.path + "/" + file.filename} target="_blank">
                                    <img key={`image-image-${index}`} className="upload-icon" src={file.path + "/" + file.filename} key={`upload-img-${index}`}></img>
                                </a>
                                <p key={`image-title-${index}`} className="center b-word">{file.filename}</p>
                                <div key={`image-dropdown-${index}`} className="end-content">
                                    <Dropdown value={i18n.translate("Options")} innerTagElement="a" id={`link-menu-${index}`} dropDownClassName="submenu" classes="dropdown-item" els={link_tags}></Dropdown>
                                </div>
                            </div>)
                        }
                        //Videos
                        if (videosExtensions.includes(file.extension)) {
                            //Element Options and callback
                            let link_tags = [];
                            hasFiles = true;
                            link_tags.push(<a className="dropdown-item" key={`upload-check-${index}`} href={file.path + "/" + file.filename} target="_blank">{i18n.translate("Overview")}</a>)
                            link_tags.push(<a className="dropdown-item" key={`upload-dl-${index}`} href={file.path + "/" + file.filename} download={file.filename}>{i18n.translate("Download")}</a>)
                            link_tags.push(<a className="dropdown-item" href="#" key={`upload-remove-${index}`} onClick={() => removeFile(file.path + "/" + file.filename)}>{i18n.translate("Remove")}</a>)

                            file_container.push(<div className="col-8 col-sm-4 center f-col" key={`img-container-${index}`}>
                                <video key={`video-video-${index}`} className="upload-video-icon" controls>
                                    <source key={`video-src-${index}`} src={file.path + "/" + file.filename} type={`video/${file.extension.substring(1, file.extension.length)}`} />
                                    {i18n.translate('Your browser does not support the video tag')}
                                </video>
                                <p key={`video-title-${index}`} className="center b-word">{file.filename}</p>
                                <div key={`video-dropdown-${index}`} className="end-content">
                                    <Dropdown value={i18n.translate("Options")} innerTagElement="a" id={`link-menu-${index}`} dropDownClassName="submenu" classes="dropdown-item" els={link_tags}></Dropdown>
                                </div>
                            </div>)

                        }
                        //File Code
                        if (fileCodeExtensions.includes(file.extension)) {

                            let link_tags = [];
                            hasFiles = true;
                            link_tags.push(<a className="dropdown-item" key={`upload-check-${index}`} href={file.path + "/" + file.filename} target="_blank">{i18n.translate("Overview")}</a>)
                            link_tags.push(<a className="dropdown-item" key={`upload-dl-${index}`} href={file.path + "/" + file.filename} download={file.filename}>{i18n.translate("Download")}</a>)
                            link_tags.push(<a className="dropdown-item" href="#" key={`upload-remove-${index}`} onClick={() => removeFile(file.path + "/" + file.filename)}>{i18n.translate("Remove")}</a>)

                            file_container.push(<div className="col-8 col-sm-4 center f-col" key={`img-container-${index}`}>
                                <a key={`file-link-${index}`} className={f_input.value.indexOf("video") > -1 ? "upload-video-icon file-code clickable" : "upload-icon file-code clickable"} href={file.path + "/" + file.filename} target="_blank"><i key={`file-icon-${index}`} className="fa-regular fa-file-code file-code" aria-hidden="true"></i></a>
                                <p key={`file-title-${index}`} className="center b-word">{file.filename}</p>
                                <div key={`file-dropdown-${index}`} className="end-content">
                                    <Dropdown value={i18n.translate("Options")} innerTagElement="a" id={`link-menu-${index}`} dropDownClassName="submenu" classes="dropdown-item" els={link_tags}></Dropdown>
                                </div>
                            </div>)

                        }
                        if (fileExtensions.includes(file.extension)) {

                            let link_tags = [];
                            hasFiles = true;
                            link_tags.push(<a className="dropdown-item" key={`upload-check-${index}`} href={file.path + "/" + file.filename} target="_blank">{i18n.translate("Overview")}</a>)
                            link_tags.push(<a className="dropdown-item" key={`upload-dl-${index}`} href={file.path + "/" + file.filename} download={file.filename}>{i18n.translate("Download")}</a>)
                            link_tags.push(<a className="dropdown-item" href="#" key={`upload-remove-${index}`} onClick={() => removeFile(file.path + "/" + file.filename)}>{i18n.translate("Remove")}</a>)

                            file_container.push(<div className="col-8 col-sm-4 center f-col" key={`img-container-${index}`}>
                                <a key={`file-link-${index}`} className={f_input.value.indexOf("video") > -1 ? "upload-video-icon file clickable" : "upload-icon file clickable"} href={file.path + "/" + file.filename} target="_blank"><i key={`file-icon-${index}`} className="fa-regular fa-file file-code" aria-hidden="true"></i></a>
                                <p key={`file-title-${index}`} className="center b-word">{file.filename}</p>
                                <div key={`file-dropdown-${index}`} className="end-content">
                                    <Dropdown value={i18n.translate("Options")} innerTagElement="a" id={`link-menu-${index}`} dropDownClassName="submenu" classes="dropdown-item" els={link_tags}></Dropdown>
                                </div>
                            </div>)

                        }
                    })
                    if (f_input.value.indexOf("video") > -1) {
                        file_container.push(<div key="video-bg" className="video-bg"></div>)
                    } else if (f_input.value.indexOf("image") > -1) {
                        file_container.push(<div key="img-bg" className="img-bg"></div>)
                    }
                    if(hasFiles){

                        ReactDOM.unmountComponentAtNode(filelist);
                        ReactDOM.render(
                            file_container,
                            filelist
                        )

                    }else{

                        renderNothingFound(folder);

                    }


                }

            }).catch(err => {

                renderNothingFound(folder);

            })

        if (f_input.value.length > 0) {

            ReactDOM.unmountComponentAtNode(fileaction);
            ReactDOM.render(
                file_actions,
                fileaction
            )

        } else {
            ReactDOM.unmountComponentAtNode(fileaction);
        }


    }
    root_folders.push(<option key={`key-default-value`} id={`key-default-value`} value="">{i18n.translate('Files')}</option>)
    Object.values(list).map((folders) => {
        root_folders.push(<option key={`key-${folders.title}`} id={`key-${folders.title}`} value={folders.uri}>{folders.title.charAt(0).toUpperCase() + folders.title.slice(1)}</option>)
    })

    return <React.Fragment><label className="sr-only" htmlFor="files">{i18n.translate('Files')}</label><div className="choose-folder"><select id="files" name="files" className="form-control col-12" onChange={() => { onChange() }}>{root_folders}</select></div></React.Fragment>;

}

export default InvokeUploader;