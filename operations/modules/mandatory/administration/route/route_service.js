//Route Service Module
//Author - Eric Salle

const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));
const RouteFactory = require(path.resolve(global.MODULE_ADMIN + "/route/route_factory")).RouteFactory;
const Route = require(path.resolve(global.MODULE_ADMIN + "/route/route")).Route;

module.exports = {

	administration_route: (route, req, res) => {

		let body = {

			react_element: "div",
			args: {

				key: "administration-route-container",
				className: "container first-content",

			},
			react_nested: {

				react_element: "p",
				args: {

					els: "test",

				}

			},

		}

		return view_service.getBuildView(route, req, res, body);

	},

	create_route: (route, req, res, prefix, next) => {

		let body = view_service.checkAccessRights(route, req, res, null, false);

		if (body != null && body.hasError) {
			if (typeof body.redirectUri != "undefined") {
				return res.status(403).send(Object.assign({}, { redirect: body.redirectUri }));
			}
		}


		let params = req.body;
		if (typeof params.ms == "undefined" || params.ms.indexOf("::") < 0) {
			return res.status(500).send(route.i18n.translate("Error 500") + " : " + route.i18n.translate("Internal Server Error"), ", ms param is malformed. ");
		}
		let component = params.ms.split("::")[1];
		let pKeys = Object.keys(params);
		let pVals = Object.values(params);
		let uri = new Route();
		let routeFactory = new RouteFactory();
		switch (component) {
			case "uri":

				let setUri = ()=>{
					uri.setUriComponent(Object.assign({}, {
						root_id: pVals[pKeys.findIndex(p => (p.includes('root_id')))].replace(/\s/g, "-"),
						feature: pVals[pKeys.findIndex(p => (p.includes('feature')))].replace(/\s/g, "_"),
						uri: pVals[pKeys.findIndex(p => (p == 'uri'))],
						isExternal: typeof params.isExternal != "undefined" ? true : false
					}))
					typeof params.id != "undefined" ? uri.setId(params.id) : null;
					if (uri.isIsExternal()) {
						next = ".step-4";
					}
					if (typeof uri.getId() == "undefined") {
	
						routeFactory.checkUriData(uri).then((results) => {
	
							if (typeof results != "undefined") {
								if (typeof results.root_id != "undefined" && results.root_id.message == "name exists" && results.root_id.id != uri.getId()) {
									return res.status(409).send(Object.assign({}, { errorLabel: route.i18n.translate("Name already exists", route.lang) }));
								}
								if (typeof results.uri != "undefined" && results.uri.message == "uri exists" && results.uri.id != uri.getId()) {
									return res.status(409).send(Object.assign({}, { errorLabel: route.i18n.translate("Link already exists", route.lang) }));
								}
							}
							routeFactory.createOrUpdateUri(req, uri).then(newUri => {
	
								uri.setId(newUri.id);
	
								uri.setUriContent(Object.assign({}, {
									id: uri.getId(),
									title: null,
									method: "get",
									contentType: null,
									theme: null,
									content_id: null,
									filepath: typeof filepath != "undefined" ? filepath.slice(0, filepath.length - 1).join("/") + "/" : null,
									filename: typeof filepath != "undefined" ? filepath[filepath.length - 1] : null,
									root_id: uri.getRootId()
								}))
								routeFactory.addOrUpdateUriContent(uri).then(c_res => {
	
									uri.setIsPublished(false);
									uri.setUriPermissions({});
									routeFactory.addOrUpdateUriPermissions(uri, req, route).then(p_res => {
										return res.status(200).send(Object.assign({}, { fetchedData: { addInput: c_res } }, { current: next }))
									})
								})
	
							})
	
	
						});
	
	
					} else {
	
						routeFactory.checkUriData(uri).then((results) => {
							if (typeof results != "undefined") {
								if (typeof results.root_id != "undefined" && results.root_id.message == "name exists" && results.root_id.id != uri.getId()) {
									return res.status(409).send(Object.assign({}, { errorLabel: route.i18n.translate("Name already exists", route.lang) }));
								}
								if (typeof results.uri != "undefined" && results.uri.message == "uri exists" && results.uri.id != uri.getId()) {
									return res.status(409).send(Object.assign({}, { errorLabel: route.i18n.translate("Link already exists", route.lang) }));
								}
							}
							routeFactory.createOrUpdateUri(req, uri).then(newUri => {
								return res.status(200).send(Object.assign({}, { fetchedData: { addInput: newUri } }, { current: next }))
							})
						})
	
					}
				}

				if(typeof params.id != "undefined"){

					if (Array.isArray(params.id)) {
						uri.setId(params.id[params.id.length - 1]);
					} else {
						uri.setId(params.id);
					}

					routeFactory.fetchCreatedId(uri, true).then((c_res) => {
						if (c_res == "Nothing found") {

							return res.status(404).send(Object.assign({}, { errorLabel: route.i18n.translate("Error 404", route.lang) + " : " + route.i18n.translate("Route doesn't exist", route.lang) }))
	
						}else{

							if(typeof params.uri == "undefined"){
								params.uri = c_res.uri;
								pKeys = Object.keys(params);
								pVals = Object.values(params);
							}
							
							setUri();
						}
					})

				}else{

					setUri();

				}


				break;

			case "content":

				if (Array.isArray(params.id)) {
					uri.setId(params.id[params.id.length - 1]);
				} else {
					uri.setId(params.id);
				}
				if (Array.isArray(params.root_id)) {
					uri.setRootId(params.root_id[params.root_id.length - 1])
				} else {
					uri.setRootId(params.root_id);
				}
				routeFactory.fetchCreatedId(uri).then(c_res => {

					if (c_res == "Nothing found") {

						return res.status(404).send(Object.assign({}, { errorLabel: route.i18n.translate("Error 404", route.lang) + " : " + route.i18n.translate("Route doesn't exist", route.lang) }))

					}

					let filepath = typeof pVals[pKeys.findIndex(p => (p == 'path-to-file-and-filename'))] != "undefined" ? pVals[pKeys.findIndex(p => (p == 'path-to-file-and-filename'))].split("/") : undefined;
					if (pVals[pKeys.findIndex(p => (p == 'method'))].split("-")[1] == "page" && typeof pVals[pKeys.findIndex(p => (p == 'contentid'))] != "undefined" && isNaN(pVals[pKeys.findIndex(p => (p == 'contentid'))])) {
						return res.status(409).send(Object.assign({}, { errorLabel: route.i18n.translate("Content id must be numerical", route.lang) }));
					} else if (pVals[pKeys.findIndex(p => (p == 'method'))].split("-")[1] == "form" && !isNaN(pVals[pKeys.findIndex(p => (p == 'contentid'))])) {
						return res.status(409).send(Object.assign({}, { errorLabel: route.i18n.translate("Form name must be a string", route.lang) }));
					}
					uri.setUriContent(Object.assign({}, {
						id: Array.isArray(pVals[pKeys.findIndex(p => (p == 'id'))]) ? pVals[pKeys.findIndex(p => (p == 'id'))].slice(-1).pop() : pVals[pKeys.findIndex(p => (p == 'id'))],
						title: pVals[pKeys.findIndex(p => (p.includes('title')))],
						method: pVals[pKeys.findIndex(p => (p == 'method'))].split("-")[0],
						contentType: pVals[pKeys.findIndex(p => (p == 'method'))].split("-")[1],
						theme: pVals[pKeys.findIndex(p => (p == 'theme'))],
						content_id: typeof pVals[pKeys.findIndex(p => (p == 'contentid'))] != "undefined" ? pVals[pKeys.findIndex(p => (p == 'contentid'))] : null,
						filepath: typeof filepath != "undefined" ? filepath.slice(0, filepath.length - 1).join("/") + "/" : null,
						filename: typeof filepath != "undefined" ? filepath[filepath.length - 1] : null,
						root_id: Array.isArray(pVals[pKeys.findIndex(p => (p == 'root_id'))]) ? pVals[pKeys.findIndex(p => (p == 'root_id'))].slice(-1).pop() : pVals[pKeys.findIndex(p => (p == 'root_id'))]
					}))
					routeFactory.addOrUpdateUriContent(uri).then(results => {
						return res.status(200).send(Object.assign({}, { fetchedData: { addInput: results } }, { current: next }))
					})

				})

				break;

			case "permissions":
				if (Array.isArray(params.id)) {
					uri.setId(params.id[params.id.length - 1]);
				} else {
					uri.setId(params.id);
				}
				routeFactory.fetchCreatedId(uri).then(c_res => {

					if (c_res == "Nothing found") {

						return res.status(404).send(Object.assign({}, { errorLabel: route.i18n.translate("Error 404", route.lang) + " : " + route.i18n.translate("Route doesn't exist", route.lang) }))

					}

					uri.setIsPublished(typeof params.is_publish != "undefined" ? true : false);
					uri.setUriPermissions(params);
					routeFactory.addOrUpdateUriPermissions(uri, req, route).then(results => {
						if (results == "error while fetching page") {
							return res.status(500).send(Object.assign({}, { errorLabel: route.i18n.translate("Error 404", route.lang) + " : " + route.i18n.translate("Page doesn't exist", route.lang) }))
						}
						return res.status(200).send(Object.assign({}, { current: next }))
					})
				})
				break;
			default:
				return res.status(500).send({ errorLabel: route.i18n.translate("Error 500", route.lang) + " : " + route.i18n.translate("Internal Server Error", route.lang) });
				break;

		}



	},

	remove_route: (route, req, res, prefix, next) => {

		let body = view_service.checkAccessRights(route, req, res, null, false);

		if (body != null && body.hasError) {
			if (typeof body.redirectUri != "undefined") {
				return res.status(403).send(Object.assign({}, { redirect: body.redirectUri }));
			}
		}

		let params = req.body;
		let routeFactory = new RouteFactory();


		switch (prefix) {
			case "search":
				searchRoutes(params, res);
				break;
			case "remove":
				let newParams = [];
				for (let [key, value] of Object.entries(params)) {
					if (key.includes("delete-route")) {
						newParams.push(key.substr(key.lastIndexOf("-") + 1));
					}
				}
				if (newParams.length == 0) {
					return res.status(404).send({ errorLabel: route.i18n.translate("Nothing was selected", route.lang) });
				} else {
					routeFactory.removeRoutes(newParams, req, route).then(results => {
						return res.status(200).send({ redirect: "/administrate/route/remove" });
					})
				}
				break;
			default:
				return res.status(500).send(Object.assign({}, { errorLabel: route.i18n.translate("Error 500", route.lang) + " : " + route.i18n.translate("Internal Server Error", route.lang) }));
				break;


		}


	},

	edit_route: (route, req, res, prefix, next) => {

		let body = view_service.checkAccessRights(route, req, res, null, false);

		if (body != null && body.hasError) {
			if (typeof body.redirectUri != "undefined") {
				return res.status(403).send(Object.assign({}, { redirect: body.redirectUri }));
			}
		}

		let params = req.body;

		switch (prefix) {
			case "search":
				return searchRoutes(params, res, true);
				break;
			default:
				return create_route(route, req, res, prefix, next);
				break;
				break;

		}


	},

	search_route: (route, req, res, prefix, next) => {

		let body = view_service.checkAccessRights(route, req, res, null, false);

		if (body != null && body.hasError) {
			if (typeof body.redirectUri != "undefined") {
				return res.status(403).send(Object.assign({}, { redirect: body.redirectUri }));
			}
		}

		let params = req.body;

		switch (prefix) {
			case "search":
				return searchRoutes(params, res, false, true);
				break;

		}

	},

	searchRoutes(params, res, edit = false, system = false) {

		let routeFactory = new RouteFactory();

		if(system){

			routeFactory.fetchRoutes(routeFactory.getQueryPrefix("search_engine"), params.value, null, null, edit, system).then((results) => {
	
				return res.status(200).send(results);

			})

		}else{

			if (typeof params.page == "undefined" || params.page == null) {

				if (typeof params.value != "undefined" && params.value != null) {
	
					routeFactory.fetchRoutes(edit ? routeFactory.getQueryPrefix("search_engine_w_edit") : routeFactory.getQueryPrefix("search_engine"), params.value, global.DEFAULT_SEARCH_ITEMS, 1, edit).then((results) => {
	
						return res.status(200).send(results);
	
					})
	
				} else {
	
					routeFactory.fetchRoutes(edit ? routeFactory.getQueryPrefix("search_engine_w_edit") : routeFactory.getQueryPrefix("search_engine"), params.value, global.DEFAULT_SEARCH_ITEMS, 1, edit).then((results) => {
	
						return res.status(200).send(results);
	
					})
	
				}
	
			} else {
				let page = (params.page - 1) * global.DEFAULT_SEARCH_ITEMS;
				routeFactory.fetchRoutes(edit ? routeFactory.getQueryPrefix("search_engine_w_edit") : routeFactory.getQueryPrefix("search_engine"), params.value, global.DEFAULT_SEARCH_ITEMS, page, edit).then((results) => {
	
					return res.status(200).send(results);
	
				})
			}

		}

	},

	decorateContainer: (route, dMethod = "tabsDecorator", formComponent = null, container = false) => {

		let feature = route.feature.split("_")[0];
		let routeFactory = new RouteFactory();

		try {

			return new Promise((resolve) => {

				routeFactory.fetchAllUriByFeature(routeFactory.getQueryPrefix("feature"), feature).then((Routes) => {
					let decorator = module.exports[dMethod]();
					Routes.map((routeObj) => {
						decorator.react_nested.react_nested.push({
							react_element: "li",
							args: {
								key: `tabs-${routeObj.getFeature()}`,
								className: `nav-item`,
							},
							react_nested: {
								react_element: "a",
								args: {
									key: `link-${routeObj.getFeature()}`,
									className: `nav-link ${Routes.length == 1 ? "one-item-only" : ""} ${(route.uri == routeObj.getUri() ? 'active' : "")}`,
									href: routeObj.getUri(),
									els: route.i18n.translate(routeObj.getValue(), route.lang)
								}
							}
						})
					})
					let containerD = decorator;
					if (container) {
						containerD = containerDecorator(feature, formComponent, decorator);
					}

					return resolve(containerD);

				})

			})

		} catch (error) {
			throw new Error("Error in form_service@decorateForm : " + error);
		}

	},

	tabsDecorator: () => {

		let tabs = {
			react_element: "div",
			args: {
				key: "tabs-decorator",
				className: "col-12 col-sm-11 col-lg-10",
			},
			react_nested: {
				react_element: "ul",
				args: {
					key: "tabs-decorator-list",
					className: "nav nav-tabs justify-content-end"
				},
				react_nested: []
			}
		}

		return tabs;


	},

	containerDecorator: (key, formComponent = null, els = null) => {


		if (formComponent != null) {
			els = [els, formComponent];
		}

		return {
			react_element: "div",
			args: {

				key: `${key}-container`,
				className: "container first-content",

			},
			react_nested: {

				react_element: "div",
				args: {
					key: `${key}-row`,
					className: "row justify-content-center",

				},
				react_nested: els,
			}
		}

	}


}

const containerDecorator = module.exports.containerDecorator;
const searchRoutes = module.exports.searchRoutes;
const create_route = module.exports.create_route;