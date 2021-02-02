"use strict";

module.exports = {
  getAllRoutes: function getAllRoutes() {
    var _routing = {
      name: "routing_transaction",
      query: "SELECT * from uri AS u INNER JOIN pages AS p ON p.uri_id = u.id INNER JOIN pages_permissions AS pp ON pp.page_id = p.id LEFT JOIN callback AS c ON c.id = p.callback_id",
      message: "Selecting every existing routes"
    };
    return _routing;
  }
};