//Administrate Module
//Author - Eric Salle

const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "\\global"))();
const view_service = require(path.resolve(global.MODULE_VIEW + "\\view_service"));

module.exports = {

	administrate : function(route, req, res){

		let body = view_service.addLogoAsH1(global.CMS_TITLE);

		return view_service.getBuildView(route, req, res, body);

	}


}

