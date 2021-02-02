import React from "react";


const GetUploadView = (args)=>{

    return <div className="container first-content backoffice-panel" key="upload-container">
        <div className="row justify-content-center" key="upload-row">
            <div className="col-12" key="title">
                <h3 className="title p-border">{args.tr_title}</h3>
            </div>
            <div className="col-6" key="upload-col">
                <div className="uploader" id="uploader" key="uploader"></div>
            </div>
            <div className="col-12 row">
                <div id="file-action-container" className="col-12 col-sm-4 file-action-container">
                </div>
                <div className="col-12 col-sm-8 file-list-container">
                    <div id="file-list" className="row justify-content-center file-list"></div>
                </div>
            </div>
        </div>
    </div>
    
}


export default GetUploadView;