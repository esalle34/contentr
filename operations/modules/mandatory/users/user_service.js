//Office Session Module
//Author - Eric Salle

const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));
const UserFactory = require("./user_factory").UserFactory;
const User = require("./user").User;
const FormFactory = require(path.resolve(global.MODULE_FORM + "/form_factory")).FormFactory;
const countries = require(path.resolve(global.JSON_DATA_STORAGE + "/location/countries.json"));

var qs = require('querystring');

module.exports = {

	login: function (route, req, res) {

		let params = req.body;

		if (typeof params.username_email == "undefined" || typeof params.password == "undefined") {

			return res.status(400)
				.send({ errorLabel: route.i18n.translate("An error occured while processing data", route.lang) });


		} else if (params.username_email == "" || params.password == "") {

			return res.status(400)
				.send({ errorLabel: route.i18n.translate("Error : Some fields are empty", route.lang) });

		}

		let args = { username: params.username_email, password: params.password };
		let userFactory = new UserFactory(args);
		userFactory.fetchRolesColumns().then((resolve) => {

			userFactory.fetchUser(userFactory.getQueryPrefix("login", resolve), true, true).then((user) => {



				if (typeof user.id == "undefined") {

					return res.status(401)
						.send({ errorLabel: route.i18n.translate("Wrong username/email or password", route.lang) });

				} else {

					userFactory.fetchUserDatas("lastname, firstname", user.id).then((datas) => {

						user.setUserDatas(datas);
						Object.assign(req.session, { user: user });

						if (typeof req.session.previousUrl != "undefined") {

							return res.send({ redirect: req.session.previousUrl });

						}

						return res.status(200).send({ redirect: global.HOME_PATH });

					});

				}


			})

		})


	},

	register_form: function (route, req, res) {

		let formFactory = new FormFactory("register_form");
		formFactory.fetchForm(formFactory.getQueryPrefix("form")).then((form) => {

			try {
				let formComponent = form.setFormComponent();
				formComponent = form.resolveFormElements(route, formComponent, form.felemsData);

				let step;
				if (typeof req.session.user != "undefined" && (typeof req.session.user.lastname != "undefined" || req.session.user.next == ".register-form.step-3")) {
					step = "step-3"
				}
				else if (typeof req.session.user != "undefined" && typeof req.session.user.lastname == "undefined" && req.session.user.next != ".register-form.step-3") {
					step = "step-2"
				}
				if (typeof req.session.user == "undefined" || typeof step == "undefined") {
					step = "step-1"
				}
				let cform = formComponent.react_nested.find(form => (form.args.className.includes("current")));
				cform.args.className = cform.args.className.replace("current", "");
				let currentForm = formComponent.react_nested.find(form => (form.args.className.includes(step)));
				let newCurrentForm = Object.assign(currentForm, { args: { ...currentForm.args, className: currentForm.args.className + " current" } })
				formComponent = Object.assign(formComponent, { ...formComponent.react_nested }, { [newCurrentForm.number]: newCurrentForm });

				let body = view_service.addLogoAsH1(global.CMS_TITLE, formComponent);
				view_service.buildView(route, req, res, body);
			} catch (error) {
				console.error("Error in user_service@register_form : " + error.stack);
			}

		})

	},

	register: function (route, req, res) {


		let params = req.body;
		let moveToNext = {

			current: params.next

		};

		if (typeof req.session.user == "undefined") {

			let args = { username: params.username, password: params.password_signup, email: params.email };
			if (params.username.replace(/\s/g, '').length < 2) {
				return Object.assign({}, { errorLabel: route.i18n.translate("Error : username length is not valid", route.lang) });
			}
			let userFactory = new UserFactory(args);

			if (!params.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {

				let newResponse = Object.assign({}, { errorLabel: route.i18n.translate("Error : email not valid", route.lang) });

				return res.status(401).send(newResponse);

			} else if (!params.password_signup.match(/(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)) {

				let newResponse = Object.assign({}, { errorLabel: route.i18n.translate("Error : password not valid", route.lang) });

				return res.status(401).send(newResponse);

			}

			userFactory.checkUserInfo("username").then((resolve) => {

				if (typeof resolve == "object" && Object.keys(resolve).length > 0) {

					let newResponse = Object.assign({}, { errorLabel: route.i18n.translate("User already exists, please try logging in or contact support", route.lang) });

					return res.status(409).send(newResponse);

				} else {

					userFactory.checkUserInfo("email").then((resolve) => {

						if (typeof resolve == "object" && Object.keys(resolve).length > 0) {

							let newResponse = Object.assign({}, { errorLabel: route.i18n.translate("This email is already used", route.lang) });

							return res.status(409).send(newResponse);

						}

						userFactory.createUser().then((resolve) => {

							userFactory.fetchUser(userFactory.getQueryPrefix("createUser"), false, false).then((user) => {

								Object.assign(req.session, { user: user });

								userFactory.createUserPrivileges(user.id).then((resolve) => {

									Object.assign(req.session, { user: user });

									let newResponse = Object.assign({}, moveToNext);

									return res.status(200).send(newResponse);

								})

							})

						})

					})

				}



			});

		} else if (typeof req.session.user != "undefined" && params.next == ".register-form.step-3") {

			let args = { id: req.session.user.id, username: req.session.user.username };
			let userFactory = new UserFactory(args);
			userFactory.createUserDatas(params.civility, params.lastname, params.firstname, params.phonenumber, args.id).then((resolve) => {
				let user = Object.assign(req.session.user, params);
				Object.assign(req.session, { user: user });
				let newResponse = Object.assign({}, moveToNext);
				return res.status(200).send(newResponse);

			})


		} else {

			let args = { id: req.session.user.id, username: req.session.user.username };
			let userFactory = new UserFactory(args);
			let country = countries.filter(newCountry => newCountry.value == params.code);
			country = country[0].innerText;
			userFactory.createUserLocation(params.code, country, params.postalcode, params.city, params.address, args.id).then((resolve) => {
				let user = new User(req.session.user.id, req.session.user.username, true);
				user.setUserDatas(req.session.user);
				user.setUserPrivileges({ User: 1 });
				user.setIsAuthenticated(!user.isIsAuthenticated());
				Object.assign(req.session, { user: user });
				if (typeof req.session.previousUrl != "undefined") {
					return res.send({ redirect: req.session.previousUrl });
				}
				return res.status(200).send({ redirect: global.HOME_PATH });

			})

		}

	},

	getRoles: function (route, req, res) {

		let params = req.body;

		let response;

		let userFactory = new UserFactory();
		userFactory.fetchRolesColumns(params.roles).then(result => {

			response = Object.assign({}, { roles: result });
			return res.status(200).send(response);

		})

	},

	logout: function (route, req, res) {

		if (typeof req.session.user != "undefined") {
			delete req.session.user;
		}
		if (typeof req.session.previousUrl != "undefined") {
			return res.status(200).redirect(req.session.previousUrl);
		}

		return res.status(200).redirect(global.HOME_PATH);

	},


}