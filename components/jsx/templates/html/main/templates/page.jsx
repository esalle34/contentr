import React from "react";


const Page = (args)=>{

    return <div className="container first-content">
        <div className="row">
            <h1>{args.title}</h1>
            <div className="col-12">
                <image data-src={args.image} className="lazy" width="350px"></image>
            </div>
            <div className="col-12 description" dangerouslySetInnerHTML={{__html : args.ckEditor_description}}/>
            <div className="col-12 body" dangerouslySetInnerHTML={{__html : args.ckEditor_body}}/>
        </div>
    </div>;
    
}


export default Page;