//Administrate - Content - Module
//Author - Eric Salle

const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));
const Content = require(path.resolve(global.MODULE_CONTENT + "/content")).Content;
const ContentFactory = require(path.resolve(global.MODULE_CONTENT + "/content_factory")).ContentFactory;

module.exports = {

    create_content : (route, req, res, prefix, next)=>{

        let body = view_service.checkAccessRights(route, req, res, null, false);

        if (body != null && body.hasError) {
            if (typeof body.redirectUri != "undefined") {
                return res.status(403).send(Object.assign({}, { redirect: body.redirectUri }));
            }
        }

        let params = req.body;
        let newParams = {};
        for(let key in params){
            if(key != "ms" && key != "form_id" && key != "content_name" && key != "id"){
                if(key.includes("boolean_")){
                    if(params[key] == "on"){
                        params[key] = true;
                    }else{
                        params[key] = false;
                    }
                }
                newParams = Object.assign({}, newParams, { [key] : params[key] })
            }
        }
        let contentFactory = new ContentFactory();

        if(typeof params.id !="undefined"){

            contentFactory.updateContent(parseInt(params.id), newParams).then(()=>{
                return res.status(200).send({validPopin : route.i18n.translate("Content updated", route.lang), validPopinLink : "reload"});
            })
            
        }else{

            contentFactory.createContent(parseInt(params.form_id), params.content_name, newParams).then((result)=>{
                if(result == "Already exists"){
                    return res.status(409).send({errorLabel : route.i18n.translate("Content name already exists", route.lang)})
                }
                return res.status(200).send({validPopin : route.i18n.translate("New content added", route.lang), validPopinLink : "reload"});
            })

        }
        
    },

    getContent(content_id){

        return new Promise((resolve, reject)=>{

            let contentFactory = new ContentFactory();
            contentFactory.getContent(content_id).then((res)=>{

                return resolve(res);

            })

        })

    },

    getContentValues : (route, req, res)=>{

        let params = req.body;
        let contentFactory = new ContentFactory();

        contentFactory.getContentValues(params.id).then(fieldValues=>{

            return res.status(200).send(fieldValues);

        })
        
    },

    search_content : (route, req, res, prefix, next)=>{

        return new Promise((resolve, reject)=>{

            let params = req.body;
            let contentFactory = new ContentFactory();
            let page = (params.page - 1) * global.DEFAULT_SEARCH_ITEMS;
            try{
    
                contentFactory.getContents(contentFactory.getQueryPrefix("search"), params.value, page, global.DEFAULT_SEARCH_ITEMS).then((result)=>{
                    return resolve(res.status(200).send(result));
                })
    
            }catch(error){
                console.log("Error while fetching Contents in search_content : " + error);
            }

        })
    }


}