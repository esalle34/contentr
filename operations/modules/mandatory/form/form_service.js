//Author - Eric Salle
const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));
const header_service = require(path.resolve(global.MODULE_VIEW + "/headers/header_service"));
const route_service = require(path.resolve(global.MODULE_ROUTES + "/route_service"));
const content_types_service = require(path.resolve(global.MODULE_CONTENT_TYPES + "/content_types_service"));
const form_validators = require(path.resolve(global.MODULE_FORM + "/form_validators"))();
const FormFactory = require(path.resolve(global.MODULE_FORM + "/form_factory")).FormFactory;

const services = {
	"view_service" : view_service,
	"route_service" : route_service,
	"header_service" : header_service,
	"content_types_service" : content_types_service
}

module.exports = {

	getForm: (route, req, res) => {

		let formFactory;

		const fetchForm = (formFactory)=>{

			let q_form = formFactory.fetchForm(formFactory.getQueryPrefix("form"));
			let q_decorate;
	
			if(route.feature != null && (req._parsedUrl.query == null || !req._parsedUrl.query.includes("fragment"))){
	
				q_decorate = route_service.decorateContainer(route);
	
			}
	
			Promise.all([q_form, q_decorate]).then((resolve)=>{
				let form = resolve.find(res=>(typeof res !="undefined" && typeof res.getFormData != "undefined"));
				let decorator = resolve.find(res=>(typeof res !="undefined" && typeof res.getFormData == "undefined"));
	
				try {
					let formComponent = form.setFormComponent();
					formComponent = form.resolveFormElements(route, formComponent, form.felemsData);
					let body = formComponent;
					if(req._parsedUrl.query == null || (req._parsedUrl.query != null && !req._parsedUrl.query.includes("fragment"))){
						if(route.feature == null){
							body = view_service.addLogoAsH1(global.CMS_TITLE, body);
						}else if(route.feature != null){
							let feature = route.feature.split("_")[0];
							body = route_service.containerDecorator(feature, formComponent, decorator);
						}
					}
					return	view_service.buildView(route, req, res, body);
					
				} catch (error) {
	
					console.error(`Error in form_service@getForm (form_name : ${route.form_name}) : ` + error.stack);
					return view_service.buildErrorView(route, req, res, error);
				}
			})

		}

		if(typeof req.body != "undefined" && typeof req.body.form_name != "undefined" && req.body.form_name != null){

			formFactory = new FormFactory(req.body.form_name);
			fetchForm(formFactory);

		}else if(typeof req.body != "undefined" && typeof req.body.content_type_id != "undefined" && req.body.content_type_id != null){

			content_types_service.getContentTypeName(req.body.content_type_id).then(form_name=>{
				formFactory = new FormFactory(form_name);
				fetchForm(formFactory);
			});
			
			

		}else{
			formFactory = new FormFactory(route.form_name);
			fetchForm(formFactory);
		}

	},

	//Récupération à partir de l'input ms en hidden des données liés au service (file, callback, prefix)
	//exemple : content_service/create_content::uri => file/service::prefix
	validateForm : (route, req, res) =>{

		let isValid = false;
		let newResponse = Object.assign({}, { errorLabel: route.i18n.translate("There was an error while validating this form", route.lang) });
		let redirectToService = req.body.ms;
		let validMap = [];
		if(Object.keys(req.body).length == 0){
			return res.status(422).send(newResponse);
		}
		Object.keys(req.body).slice(0).reverse().map((name)=>{
			let split_name = name.split("_");
			let pre_name = (typeof split_name != "undefined" && split_name.length > 2) ? split_name.slice(0, -1).join("_") : split_name[0];
			let options = (typeof split_name != "undefined" && split_name.length > 2) ? split_name[split_name.length - 1] : split_name[1];
			if(typeof form_validators[pre_name] != "undefined"){
				let validation = form_validators[pre_name](req.body[name], options);
				if(validation.isValid == false){
					validMap.push(false);
					newResponse = Object.assign({}, { errorLabel: route.i18n.translate(validation.errorLabel, route.lang) });
				}else{
					validMap.push(true);
				}
			}
		})
		if(!validMap.includes(false)){
			isValid = true;
		}
		redirectToService = redirectToService.split('/');
		redirectToService = Object.assign({}, {file : redirectToService[0], callback : redirectToService[1].split("::")[0], prefix : redirectToService[1].split("::")[1], next : redirectToService[1].split("::")[2]})
		if(!isValid){
			return res.status(422).send(newResponse)
		}else{
			return services[redirectToService.file][redirectToService.callback](route, req, res, redirectToService.prefix, redirectToService.next);
		}

	} 


}

