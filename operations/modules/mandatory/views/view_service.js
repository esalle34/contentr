//Author - Eric Salle
import React from "react";
import ReactDOMServer from "react-dom/server";
import Html from "~/components/jsx/templates/html";
import { getContentFromRegistry, getContentsFromRegistry } from '~/components/jsx/templates/html/content/content.registry';

const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const routeBuilder = require(path.resolve(`./${process.env.NODE_SRC}operations/init/routeBuilder`));
const HeaderFactory = require(path.resolve(`${global.MODULE_VIEW}/headers/header_factory`)).HeaderFactory;
const awsS3Uploads = require(path.resolve(`./${process.env.NODE_SRC}` + "/operations/init/awsS3UploadsInit"));
const fs = require('fs');

module.exports = {

	addRegistryType: (registryMap, els) => {

		let registry = {
			react_registry: registryMap,
			react_nested: els,
			args: {
				els: []
			}
		}

		return registry;

	},

	getElementFromRegistry: (args) => {

		return getContentFromRegistry(args);

	},

	getElementsFromRegistry: (args) => {

		return getContentsFromRegistry(args);

	},

	addNodeSibling: (els, siblings, before = true) => {

		let content = Object.assign(getElementFromRegistry("void"), { react_nested: [] })

		if (Array.isArray(siblings)) {

			if (before) {

				content.react_nested.push(els);

			};


			siblings.map(function (siblingsEl) {

				if (typeof siblingsEl.react_nested != "undefined") {

					content.react_nested.push({
						react_element: siblingsEl.react_element,
						args: siblingsEl.args,
						react_nested: siblingsEl.react_nested
					});

				} else {

					content.react_nested.push({
						react_element: siblingsEl.react_element,
						args: siblingsEl.args
					});

				}

			})

			if (!before) {

				content.react_nested.push(els);

			}

			return content;

		}

		if (before) {

			content.react_nested.push(els)

		}

		if (typeof siblings.react_nested != "undefined") {

			content.react_nested.push({
				react_element: siblings.react_element,
				args: siblings.args,
				react_nested: siblings.react_nested
			});

		} else {

			content.react_nested.push({
				react_element: siblings.react_element,
				args: siblings.args
			});

		}

		if (!before) {

			content.react_nested.push(els)

		}

		return content;

	},

	addNodeParent: (els, containers) => {

		if (Array.isArray(containers)) {

			let container = els;

			containers.map(function (containerEl) {

				container = {

					react_element: containerEl.react_element,
					react_nested: container,
					args: containerEl.args

				}

				container.args.els = [];

			})

			return container;
		}

		let container = {

			react_element: containers.react_element,
			react_nested: els,
			args: containers.args
		}

		container.args.els = [];

		return container;

	},

	addLogoAsH1: (title, body) => {

		let els;
		let el = getElementFromRegistry({ libelle: "a", key: "logo-link", els: title, className: "main-logo", id: title, href: "https://github.com/esalle34/cms_project", target: "_blank" });

		els = addNodeParent(el, getElementFromRegistry("h1"));
		els = addNodeParent(els, getElementsFromRegistry([{ key: "logo-col", libelle: "column", className: "col-xs-12 col-sm-4" }, { key: "logo-row", libelle: "row", className: "row justify-content-center" }, { key: "logo-container", libelle: "container" }]))
		els = addNodeSibling(els, body);
		return els;

	},

	addHeader: (route, req, body) => {

		return new Promise((resolve) => {

			if (req._parsedUrl.query != null && req._parsedUrl.query.includes("fragment")) {
				return resolve(body);
			}

			let els;
			let headerFactory = typeof req.session.user != "undefined" ? new HeaderFactory({ loggedIn: true, userRoles: req.session.user.roles }) : new HeaderFactory({ loggedIn: false });

			headerFactory.fetchHeader(headerFactory.getQueryPrefix("header")).then((header) => {
				els = header.resolveSubElements(route, header.getHelemsData(), req.session.user);
				if(els != null){
					header.setHeaderElements(header.getHeader(), els);
				}
				if (body == null) {
					

					return resolve(addReactRoot(header.getHeader(), route.theme));

				} else {

					return resolve(addNodeSibling(header.getHeader(), addReactRoot(body, route.theme)));

				}

			})

		}).catch((error) => {

			console.error("Error while rendering Header (view_service@addHeader) : " + error);

		})


	},

	addReactRoot: (els, theme) => {

		let el = getElementFromRegistry({ libelle: "customContainer", react_element: "container", id: theme, className: null });
		let newEls = els;
		newEls = addNodeSibling(el, newEls, true);
		return newEls;

	},

	checkAccessRights: (route, req, res, body = null, redirect = true) => {

		let logoutAccess = Boolean(route.mandatoryLogout);
		let loginAccess = Boolean(route.mandatoryLogin);

		if (logoutAccess && typeof req.session.user != "undefined" && req.session.user.isAuthenticated) {

			if (typeof req.session.previousUrl != "undefined") {

				return body = { hasError: true, redirectUri: req.session.previousUrl, httpStatusCode: "409" };

			}

			return body = { hasError: true, redirectUri: global.HOME_PATH, httpStatusCode: "409" };

		}
		if ((loginAccess && typeof req.session.user == "undefined") || (loginAccess && typeof req.session.user != "undefined" && !req.session.user.isAuthenticated)) {

			if (redirect) {
				req.session.previousUrl = route.uri;
			}

			return body = { hasError: true, redirectUri: global.LOGIN_PATH, httpStatusCode: "403" };

		}
		let accessGranted = false;
		let routePermissions = {};

		for (const prop in route) {

			if (prop.indexOf(`${global.ROUTE_PERMISSIONS_PREFIX}Log`) <= -1 && prop.indexOf(`${global.ROUTE_PERMISSIONS_PREFIX}`) > -1) {
				if (Boolean(route[prop])) {
					if (typeof req.session.user != "undefined" && Boolean(req.session.user.roles[prop.slice(global.ROUTE_PERMISSIONS_PREFIX.length)])) {
						accessGranted = true;
					}
					routePermissions = Object.assign(routePermissions, { [prop.slice(global.ROUTE_PERMISSIONS_PREFIX.length)]: route[prop] });

				}

			}

		}

		if (Object.keys(routePermissions).length === 0 && routePermissions.constructor === Object) {
			accessGranted = true;
		}
		if (!accessGranted) {
			return body = Object.assign({}, body, { hasError: true, template: "unauthorized", httpStatusCode: "403", errorMessage: "You do not have permission to access this page" })
		}

		return body;

	},

	getBuildView: (route, req, res, body) => {

		if (typeof req.session.user != "undefined") {

			return buildView(route, req, res, body);

		} else {

			return buildView(route, req, res);
		}

	},

	buildErrorView: (route, req, res, error) => {

		let body;

		if (!route.isMs) {

			body = {
				react_element: "div",
				args: {
					key: "error-container",
					className: "container",
				},
				react_nested: {
					react_element: "div",
					args: {
						key: "error-row",
						className: "row",
					},
					react_nested: {
						react_element: "div",
						args: {
							key: "error-stack",
							className: "col error-stack",
							els: route.i18n.translate("Error 500", route.lang) + " : " + error.stack,
						},

					}
				}

			}

		} else {
			body = {
				httpStatusCode: 500,
				hasError: true,
				errorMessage: error.stack
			}

		}


		return buildView(route, req, res, body);

	},

	build404View: (route, req, res, body = null) => {

		addHeader(route, req, body).then((body) => {

			if (body == null) {

				body = getElementFromRegistry("void");

			};

			let header;
			if (!route.isMs) {

				if (Array.isArray(body.react_nested)) {
					header = body.react_nested.find(b => (b.react_element == "header"));
				} else {
					header = body.react_nested[0];
				}
				body = addRegistryType(route.theme, body);

			}

			//404 URI
			if (typeof route.uri == "undefined") {

				let htmlFile = path.resolve(global.HTML_DIR + "/notFound.html");

				header = addRegistryType(route.theme, header);
				header = ReactDOMServer.renderToString(<Html data={route} body={header} fragment />);
				let head = ReactDOMServer.renderToString(<Html data={route} />);

				fs.readFile(htmlFile, "utf-8", (err, data) => {

					data = data.replace("<Header />", `${header}`)
					data = data.replace("<Theme />", `<div id=${route.theme} class="container"></div>`)
					data = data.replace("<Homepage />", route.i18n.translate("Homepage", route.lang))
					return res.send(data.replace("<Head />", `${head}`));

				})

			}
		})

	},

	buildView: (route, req, res, body = null) => {

		addHeader(route, req, body).then((body) => {

			if (body == null) {

				body = getElementFromRegistry("void");

			};

			let fileSystem = process.env.AWS_ENV ? awsS3Uploads.initS3FS() : fs;
			let header;
			if (!route.isMs) {

				if (Array.isArray(body.react_nested)) {
					header = body.react_nested.find(b => (b.react_element == "header"));
				} else {
					header = body.react_nested[0];
				}
				body = addRegistryType(route.theme, body);

			}


			body = checkAccessRights(route, req, res, body);

			if (body.hasError && !route.isMs) {
				fileSystem = fs;
				const head = ReactDOMServer.renderToString(<Html data={route} />);
				header = addRegistryType(route.theme, header);
				header = ReactDOMServer.renderToString(<Html data={route} body={header} />);

				const htmlFile = path.resolve(global.HTML_DIR + "/" + body.template + ".html");

				if (typeof body.redirectUri != "undefined") {

					return res.status(body.httpStatusCode).redirect(body.redirectUri);

				} else {

					if (!route.isMs) {

						fs.readFile(htmlFile, "utf-8", (err, data) => {

							data = data.replace("<h1></h1>", `<h1><a id=${global.DEFAULT_SITE_TITLE} class='main-logo' href='/'></a></h1>`);
							data = data.replace("<h2></h2>", "<h2>" + route.i18n.translate(body.errorMessage, route.lang) + "</h2>");
							data = data.replace("<a></a>", "<a href='/' class='btn btn-primary next'>" + route.i18n.translate("Back to homepage", route.lang) + "</a>")
							data = data.replace("<header></header>", `${header}`);

							return res.status(body.httpStatusCode).send(data.replace("<head></head>", `${head}`));

						});

					}

				}

			} else if (body.hasError && route.isMs) {

				return res.status(body.httpStatusCode).send({
					httpStatusCode: body.httpStatusCode,
					message: typeof body.errorMessage != "undefined" ? body.errorMessage : "Undefined error"
				})

			} else {

				try {

					if (!route.isMs) {

						let tpl;
						let htmlFile;
						let head;

						if (!route.isFile) {

							fileSystem = fs;
							if (req._parsedUrl.query != null && req._parsedUrl.query.includes("fragment")) {
								htmlFile = path.resolve(global.HTML_DIR + "/fragment.html");
								tpl = ReactDOMServer.renderToString(<Html data={route} body={body} fragment />)
							} else {

								if(req._parsedUrl.query != null && req._parsedUrl.query.includes("print")){
									htmlFile = path.resolve(global.HTML_DIR + "/print.html");
									body = addRegistryType(route.theme, body.react_nested.react_nested[1]);
									tpl = ReactDOMServer.renderToString(<Html data={route} body={body} fragment />)
								}else{
									htmlFile = path.resolve(global.HTML_DIR + "/index.html");
									tpl = ReactDOMServer.renderToString(<Html data={route} body={body} />)
								}
															
							}

						} else if (route.isFile && route.filename.includes(".htm")) {

							header = addRegistryType(route.theme, header);
							header = ReactDOMServer.renderToString(<Html data={route} body={header} fragment />);
							head = ReactDOMServer.renderToString(<Html data={route} />);

							if (process.env.AWS_ENV) {

								fileSystem.headObject(route.filepath + route.filename, function (err, data) {

									if (err && err.code === 'NotFound') {
										fileSystem = fs;
										htmlFile = path.resolve(global.HTML_DIR + "/notFound.html");
									} else {
										htmlFile = route.filepath + route.filename;
									}

									fileSystem.readFile(htmlFile, "utf-8", (err, data) => {

										if (err) {

											console.error('Error-log Debug:', err);
											return res.status(500).send(route.i18n.translate("Error 500", route.lang) + " : " + route.i18n.translate("Internal Server Error", route.lang));

										}

										if (route.isFile && route.filename.includes(".htm")) {
											if (req._parsedUrl.query != null && req._parsedUrl.query.includes("print")) {
												data = data.replace("<Header />", ``)
		
											} else {
												data = data.replace("<Header />", `${header}`)
		
											}
											data = data.replace("<Theme />", `<div id=${route.theme} class="container"></div>`)
											data = data.replace("<Homepage />", route.i18n.translate("Homepage", route.lang))
											return res.send(data.replace("<Head />", `${head}`));
										}
									})


								})

							} else {


								if (fileSystem.existsSync(global.PROJECT_DIR + route.filepath + route.filename)) {
									htmlFile = path.resolve(global.PROJECT_DIR + route.filepath + route.filename);
								} else {
									fileSystem = fs;
									htmlFile = path.resolve(global.HTML_DIR + "/notFound.html");
								}

							}




						}

						if (typeof htmlFile != "undefined") {

							fileSystem.readFile(htmlFile, "utf-8", (err, data) => {

								if (err) {

									console.error('Error-log Debug:', err);
									return res.status(500).send(route.i18n.translate("Error 500", route.lang) + " : " + route.i18n.translate("Internal Server Error", route.lang));

								}

								if (route.isFile && route.filename.includes(".htm") && process.env.AWS_ENV != "true") {
									if (req._parsedUrl.query != null && req._parsedUrl.query.includes("print")) {
										data = data.replace("<Header />", ``)

									} else {
										data = data.replace("<Header />", `${header}`)

									}
									data = data.replace("<Theme />", `<div id=${route.theme} class="container"></div>`)
									data = data.replace("<Homepage />", route.i18n.translate("Homepage", route.lang))
									return res.send(data.replace("<Head />", `${head}`));
								} else if (req._parsedUrl.query != null && req._parsedUrl.query.includes("fragment")) {
									return res.send(data.replace("<Body />", `${tpl}`));
								} else {

									head = ReactDOMServer.renderToString(<Html data={route} />);
									
									if (req._parsedUrl.query != null && req._parsedUrl.query.includes("print")) {

										data = data.replace("<Head />", `${head}`);
										data = data.replace("<Theme />", `<div id=${route.theme} class="container"></div>`)
										return res.send(data.replace("<Body />", `${tpl}`));
									} 


									return res.send(data.replace("<Html />", `${tpl}`));
								}
							})

						} else {

							if (!route.filename.includes(".htm")) {

								let file = process.env.AWS_ENV ? route.filepath + route.filename : path.resolve("." + route.filepath + route.filename);

								if(process.env.AWS_ENV){

									fileSystem = awsS3Uploads.initS3FS();
									fileSystem.readFile(file, (err, data) => {

										return res.send(data);
	
									})

								}else{

									fileSystem.readFile(file, (err, data) => {

										return res.sendFile(file);
	
									})

								}

							}

						}



					} else {
						return res.send(body);
					}

				} catch (error) {
					console.error("Error while building view @view_service/buildView : " + error.stack)
				}

			}

		});



	},


}

const buildView = module.exports.buildView;
const getBuildView = module.exports.getBuildView;
const addHeader = module.exports.addHeader;
const addRegistryType = module.exports.addRegistryType;
const getElementFromRegistry = module.exports.getElementFromRegistry;
const getElementsFromRegistry = module.exports.getElementsFromRegistry;
const addNodeSibling = module.exports.addNodeSibling;
const addNodeParent = module.exports.addNodeParent;
const addReactRoot = module.exports.addReactRoot;
const addLogoAsH1 = module.exports.addLogoAsH1;
const checkAccessRights = module.exports.checkAccessRights;
