//Start
//Author - Eric Salle

var path = require("path");
var nodemon_conf = require(path.resolve(`./${process.env.NODE_SRC}reload-conf.js`));

if(typeof instance == 'undefined'){

	var instance = nodemon_conf();

	if(!instance.isInit()){

		instance.init();
		instance.startlisteners();

	}


}









