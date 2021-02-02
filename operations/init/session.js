var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const global_transaction = require(global.TRANSACTION_DIR +'/global_transactions.js')();

module.exports = {

    init : (app)=>{

        var sessionStore = new MySQLStore(getOptions());
        app.use(session({
          genid: function(req) {
            return uuidv4()
          },
          store : sessionStore,
          secret: process.env.SECRET_SESSION || "DEVELOPMENT_SESSION@!!!34",
          resave : false,
          saveUninitialized : false
        }))
        

        let instance = { store : sessionStore };

        return instance;

    },

    getOptions : ()=>{

        const options = {
            host: (process.env.NODE_ENV != "development" && process.env.NODE_ENV != "production") ?  global_transaction.AWS_DB_HOST : global_transaction.LOCAL_DB_HOST,
            port: global_transaction.DB_PORT,
            user: global_transaction.DB_USER,
            password: global_transaction.DB_PWD,
            database: global_transaction.DB_NAME,
            connectionLimit: 1,
            endConnectionOnClose: true
        };

        return options;
    },

    close : (session)=>{

        session.store.close();

    }

}

const getOptions = module.exports.getOptions;