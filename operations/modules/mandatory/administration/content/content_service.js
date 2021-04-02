//Administrate - Content - Module
//Author - Eric Salle

const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));

module.exports = {

    content_create : (route, req, res)=>{
        return res.status(200).send("ok");
    }

}