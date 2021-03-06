"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserFactory = void 0;

//Author - Eric Salle
var path = require("path");

var root_path = path.dirname(require.main.filename);

var db_transaction = require(path.resolve(root_path + "/db_transaction"))();

var User = require("./user").User;

var sha512 = require('js-sha512').sha512;

class UserFactory {
  constructor() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (args != null) {
      if (typeof args.password != "undefined") {
        args.email = typeof args.email != "undefined" ? args.email : null;
        this.userFactory = Object.assign({}, {
          username: args.username,
          password: this.encryptPassword(args.password),
          email: args.email
        });
      } else {
        this.userFactory = Object.assign({}, {
          id: args.id,
          username: args.username
        });
      }
    }

    this.getQueryPrefix = this.getQueryPrefix.bind(this);
  }

  getQueryPrefix(q_name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var queries = {
      createUser: "JSON_OBJECT('id' , users.id, 'username', users.username) as user",
      roles: "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='".concat(db_transaction.db_get_infos().DB_NAME, "' AND TABLE_NAME='users_privileges' AND COLUMN_NAME NOT LIKE \"%id\""),
      login: "JSON_OBJECT('id' , users.id, 'username', users.username) as user, ".concat(options)
    };
    return queries[q_name];
  }

  encryptPassword(password) {
    return sha512(password);
  }

  fetchRolesColumns() {
    var ext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return new Promise(resolve => {
      db_transaction.db_quick_query(this.getQueryPrefix("roles"), null, null, false).then(res => {
        if (ext == null) {
          var role_q_part = "JSON_OBJECT(";
          res.map(role => {
            role_q_part += "'" + role.COLUMN_NAME[0].toUpperCase() + role.COLUMN_NAME.substring(1) + "', privileges." + role.COLUMN_NAME + ",";
          });
          role_q_part = role_q_part.slice(0, -1);
          role_q_part += ") as privileges";
          return resolve(role_q_part);
        } else if (ext == "all") {
          var roles = [];
          res.map(role => {
            role = Object.values(role);
            roles.push(role);
          });
          roles = roles.flat();
          return resolve(roles);
        }
      });
    }).catch(err => {
      console.error("Error while fetching ROLE COLUMNS (UserFactory@fetchRolesColumns : " + err);
    });
  }

  fetchUser() {
    var datas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
    var isAuthenticated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var withPrivileges = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var username_email = this.userFactory.username.includes("@") ? "email" : "username";
    var q;

    if (!withPrivileges) {
      q = "SELECT ".concat(datas, " from users as users WHERE users.").concat(username_email, " = ? AND users.pwd = ?");
    } else {
      q = "SELECT ".concat(datas, " from users as users INNER JOIN users_privileges as privileges on privileges.user_id = users.id WHERE users.").concat(username_email, " = ? AND users.pwd = ?");
    }

    return new Promise(res => {
      db_transaction.db_quick_query(q, [this.userFactory.username, this.userFactory.password]).then(resolve => {
        if (Object.keys(resolve).length !== 0) {
          var newResolve = Object.assign({}, resolve.user, {
            isAuthenticated: isAuthenticated
          });
          var user = new User();
          user.setId(newResolve.id);
          user.setUsername(newResolve.username);
          user.setIsAuthenticated(newResolve.isAuthenticated);

          if (typeof resolve.privileges != "undefined") {
            user.setUserPrivileges(resolve.privileges);
          }

          res(user);
        } else {
          res({
            user: {
              id: undefined
            }
          });
        }
      }).catch(err => {
        console.error("Error fetching user : " + this.userFactory.username + " : " + err);
      });
    });
  }

  fetchUserDatas() {
    var datas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
    var user_id = arguments.length > 1 ? arguments[1] : undefined;
    var q = "SELECT ".concat(datas, " from users_data WHERE user_id = '").concat(user_id, "'");
    return db_transaction.db_quick_query(q);
  }

  checkUserInfo(infoToCheck) {
    var infoValue = this.userFactory[infoToCheck];
    var q = "SELECT * from users WHERE ".concat(infoToCheck, " = '").concat(infoValue, "'");
    return db_transaction.db_quick_query(q);
  }

  createUser() {
    var q = "INSERT INTO users (username, pwd, email) VALUES (?, ?, ?)";
    return db_transaction.db_quick_query(q, [this.userFactory.username, this.userFactory.password, this.userFactory.email]);
  }

  createUserPrivileges(user_id) {
    var q = "INSERT INTO users_privileges (user_id) VALUES (?)";
    return db_transaction.db_quick_query(q, [user_id]);
  }

  createUserDatas(civility, lastname, firstname, phonenumber, user_id) {
    var q = "INSERT INTO users_data (civility, lastname, firstname, phonenumber, user_id) VALUES(?, ?, ?, ?, ?)";
    return db_transaction.db_quick_query(q, [civility, lastname, firstname, phonenumber, user_id]);
  }

  createUserLocation(code, country, postalcode, city, address, user_id) {
    var q = "INSERT INTO users_location (code, country, postalcode, city, address, user_id) VALUES(?, ?, ?, ?, ?, ?)";
    return db_transaction.db_quick_query(q, [code, country, postalcode, city, address, user_id]);
  }

}

exports.UserFactory = UserFactory;