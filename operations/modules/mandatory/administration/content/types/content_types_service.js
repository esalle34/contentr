//Administrate - Content types- Module
//Author - Eric Salle

const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));
const ContentTypeFactory = require(path.resolve(global.MODULE_CONTENT_TYPES + "/content_types_factory")).ContentTypeFactory;
const ContentType = require(path.resolve(global.MODULE_CONTENT_TYPES + "/content_types")).ContentType;

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
		
		let params = req.body;
		let contentTypeFactory = new ContentTypeFactory();
		let pKeys = Object.keys(params);
		let pVals = Object.values(params);

		switch(prefix){
			case "machine_name":
				return new Promise((resolve, reject)=>{

					contentTypeFactory.createContentType({
						machine_name : pVals[pKeys.findIndex(p => (p.includes('name')))].replace(/\s/g, "_"),
						template_name : pVals[pKeys.findIndex(p => (p.includes('template')))].replace(/\s/g, "-"),
					}).then((result)=>{
						if(result == "Already exists"){
							resolve(res.status(409).send(Object.assign({}, { errorLabel: route.i18n.translate("Content type already exists", route.lang) })));
						}else{
							resolve(res.status(200).send(Object.assign({}, { current: next, fetchedData : {addInput : { id : result.id, mname : pVals[pKeys.findIndex(p => (p.includes('name')))].replace(/\s/g, "_") } }})));
						}
					})
					
				})
			case "inputs":
				let count = pKeys.reverse().find(el=>(el.includes("name") && el != "mname")).split("-")[1];
				let inputsArray = {};
				for(let i=1; i<=count; i++){
					inputsArray[i] = [];
					inputsArray[i].args = {};
					for(let key in params){
						if(key.includes(`-${i}`)){

							if(key.includes("className")){

								if(typeof params[`maxlength-${i}`] != "undefined"){

									inputsArray[`${i}`].args = Object.assign({}, inputsArray[`${i}`].args, {className : params[key] + " validate_string" + ` maxlength-${params[`maxlength-${i}`]}`});

								}
								
								if(typeof params[`minlength-${i}`] != "undefined"){

									inputsArray[`${i}`].args = Object.assign({},  inputsArray[`${i}`].args, {className : (typeof inputsArray[`${i}`].args.className != "undefined" && typeof inputsArray[`${i}`].args.className.includes("validate_string")) ? `${inputsArray[`${i}`].args.className} minlength-${params[`minlength-${i}`]}` : `${params[key]} validate_string minlength-${params[`minlength-${i}`]}`})

								}

								if(typeof params[`max-${i}`] != "undefined"){

									inputsArray[`${i}`].args = Object.assign({}, inputsArray[`${i}`].args, {className : params[key] + " validate_number" + ` max-${params[` max-${i}`]}`});

								}
								
								if(typeof params[`min-${i}`] != "undefined"){

									inputsArray[`${i}`].args = Object.assign({}, inputsArray[`${i}`].args, {className : (typeof inputsArray[`${i}`].args.className != "undefined" && typeof inputsArray[`${i}`].args.className.includes("validate_number")) ? `${inputsArray[`${i}`].args.className} min-${params[`min-${i}`]}` : `${params[key]} validate_string min-${params[`min-${i}`]}`})

								}
								
							}else{

								if(key.includes("id")){

									let tmpArray = Object.keys(params).filter(el=>(el.includes("id-")));
									let idExists = false;
									if(tmpArray.length > 1){
										tmpArray.map(k=>{
											if(k!=key && params[k] == params[key]){
												idExists = true;
											}
										})
									}
									if(idExists){
										inputsArray[`${i}`].args = Object.assign({}, inputsArray[`${i}`].args, ({"key" : params[key]+`_${i}`}, {"id" : params[key]+`_${i}`}));
									}else{
										inputsArray[`${i}`].args = Object.assign({}, inputsArray[`${i}`].args, ({"key" : params[key]}, {"id" : params[key]}));
									}

								}else if(key.includes('name') && !key.includes('mname')){

									//check if name already exists, add int value if exists
									let tmpArray = Object.keys(params).filter(el=>(el.includes("name") && !el.includes("mname")));
									let nameExists = false;
									if(tmpArray.length > 1){
										tmpArray.map(k=>{
											if(k!=key && params[k] == params[key]){
												nameExists = true;
											}
										})
									}
									if(nameExists){
										inputsArray[`${i}`].args = Object.assign({}, inputsArray[`${i}`].args, ({"name" : params[key] + `_${i}`}));
									}else{
										inputsArray[`${i}`].args = Object.assign({}, inputsArray[`${i}`].args, ({"name" : params[key]}));
									}

								}else if(key.includes("values")){
									let tmpArray = params[key].split(",");
									let newValues = [];
									tmpArray.map(val=>{
										newValues.push(val.replace(/\s/g, ""));
									})

									inputsArray[`${i}`].args = Object.assign({}, inputsArray[`${i}`].args, ({options : {values : newValues, translate : true}}));

								}else if(key.includes("label") && !key.includes("pre")){

									if(typeof params[`prelabel-${i}`] != "undefined" && Boolean(params[`prelabel-${i}`])){

										inputsArray[`${i}`].args = Object.assign({}, inputsArray[`${i}`].args, ({"prelabel" : params[key]}));

									}else{
										inputsArray[`${i}`].args = Object.assign({}, inputsArray[`${i}`].args, ({"aplabel" : params[key]}));
									}

								}else if(!key.includes('element') && !key.includes('mname') && !key.includes("label")){

									inputsArray[`${i}`].args = Object.assign({}, inputsArray[`${i}`].args, ({[key.split("-")[0]] : params[key]}));

								}else{

									inputsArray[`${i}`][key.split("-")[0]] = params[key];

								}

							}
						}else{

							if(key != "ms"){

								if(key.includes('mname')){
									inputsArray[`${i}`][key.split("-")[0]] = params[key] + "_" + params[`name-${i}`];
								}

							}

						}
					}
				}

				contentTypeFactory.createOrUpdateForm(params["mname"], inputsArray).then(()=>{

					return res.status(200).send(Object.assign({}, { current: next}));


				})
				
		}

	},
	search_content_types : (route, req, res, prefix, next)=>{

		switch(prefix){
			case "search":
				searchContentTypes(route, req, res);
			break;
			default: return res.status(500).send({ errorLabel: route.i18n.translate("Internal Server Error", route.lang) });
		}

	},
	searchContentTypes : (route, req, res)=>{
		let contentTypeFactory = new ContentTypeFactory();
		let params = req.body;
		let sentence = (typeof params.value != "undefined" && params.value.length > 0) ? params.value : null;
		contentTypeFactory.getContentTypes(sentence).then(result=>{

			if(result == "Nothing found"){

				return res.status(404).send({errorLabel : route.i18n.translate(result, route.lang)})

			}

			return res.status(200).send([result]);
			
		})
	},
	getContentTypeName : (content_type_id)=>{
		let contentTypeFactory = new ContentTypeFactory();
		return new Promise((resolve, reject)=>{

			contentTypeFactory.getContentTypeName(content_type_id).then(result=>{
				return resolve(result);
			})

		})
	}

}

let searchContentTypes = module.exports.searchContentTypes;