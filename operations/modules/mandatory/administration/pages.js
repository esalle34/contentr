//Pages Module
//Author - Eric Salle

const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "\\global"))();
const view_service = require(path.resolve(global.MODULE_VIEW + "\\view_service"));

module.exports = {

	createPage(route, req, res){

		let body = { react_element : "p", 
					 args : {
					 	els : "hello world"
					 }}

		return view_service.buildView(route, req, res, body);

	},

	createPageForm(route, req, res){

		return null;

	}

}