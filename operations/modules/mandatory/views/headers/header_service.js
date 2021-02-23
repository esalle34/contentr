const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));
const HeaderFactory = require("./header_factory").HeaderFactory;
const Header = require("./header").Header;

module.exports = {

    manage_header: (route, req, res, prefix, next) => {

        let body = view_service.checkAccessRights(route, req, res, null, false);

        if (body != null && body.hasError) {
            if (typeof body.redirectUri != "undefined") {
                return res.status(403).send(Object.assign({}, { redirect: body.redirectUri }));
            }
        }

        let headerFactory = new HeaderFactory();
        let params = req.body;
        let data;
        switch (prefix) {
            case "search":
                data = headerFactory.fetchAllHeadersContainer(params.value);
                data.then(resolve => {
                    return res.status(200).send([resolve])
                })
                break;
            case "headerdata":
                data = headerFactory.fetchHeaderById(headerFactory.getQueryPrefix("header"), params.id).then((header) => {
                    return res.status(200).send(header.getHelemsData());
                })
                break;
            case "submit":
                headerFactory.createOrUpdateHeader(params.headerElsList, params.header_id, null, params.originalHeaderElsList).then(() => {
                    return res.status(200).send("Ok !");
                })
                break;
            default:
                return res.status(404).send("Not found");
        }



    }

}