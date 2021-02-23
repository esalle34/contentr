//Administrate - Content types- Module
//Author - Eric Salle

const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));

module.exports= {

    administration_content_types : (route, req, res)=>{
        
		let body = view_service.checkAccessRights(route, req, res, null, false);

		if (body != null && body.hasError) {
			if (typeof body.redirectUri != "undefined") {
				return res.status(403).send(Object.assign({}, { redirect: body.redirectUri }));
			}
		}

        return view_service.getBuildView(route, req, res, body);

    },

	create_content_types : (route, req, res, prefix, next)=>{

		let body = view_service.checkAccessRights(route, req, res, null, false);

		if (body != null && body.hasError) {
			if (typeof body.redirectUri != "undefined") {
				return res.status(403).send(Object.assign({}, { redirect: body.redirectUri }));
			}
		}

		switch(prefix){
			case "create":
			return res.status(200).send("Ok !");
				
		}

        return view_service.getBuildView(route, req, res, body);

	}

}