//Author - Eric Salle
const path = require("path");
const root_path = path.dirname(require.main.filename);
const routeBuilder = require(path.resolve(`./${process.env.NODE_SRC}/operations/init/routeBuilder`));
const global = require(path.resolve(root_path + "/global"))();
const db_transaction = require(path.resolve(root_path + "/db_transaction"))();
const Route = require('./route').Route;
const awsAutoScaling = require(path.resolve(`./${process.env.NODE_SRC}` + "/operations/init/awsAutoScaling"));

export class RouteFactory extends Object {

    constructor(args) {
        super();
        this.fetchCreatedId = this.fetchCreatedId.bind(this);
    }

    getQueryPrefix(q_name, options = null) {

        let _query = {

            feature: "uri, feature",
            search_engine: "u.id, u.uri, u.isExternal, u.root_id, u.lastModifiedAt, p.title",
            search_engine_w_edit: "*",
        }

        return _query[q_name];

    }

    checkUriData(route) {

        return new Promise((resolve, reject) => {

            let q_n = `SELECT id, root_id from uri where root_id = ?`;
            let q_u = `SELECT id, uri from uri as u where u.uri = ?`;

            try {

                let q_name = db_transaction.db_quick_query(q_n, [route.getRootId()]);
                let q_uri = db_transaction.db_quick_query(q_u, [route.getUri()]);

                Promise.all([q_name, q_uri]).then(results => {
                    let res = {};
                    results.map(r => {
                        if (typeof r == "object") {
                            if (typeof r.root_id != "undefined") {
                                res = Object.assign({}, res, { root_id: { message: "name exists", id: r.id } })
                            }

                            if (typeof r.uri != "undefined") {
                                res = Object.assign({}, res, { uri: { message: "uri exists", id: r.id } })
                            }
                        }

                    })

                    return resolve(res);

                })

            } catch (e) {

                console.log(e);

            }

        });

    }

    fetchCreatedId(route, fetchUri = false) {

        return new Promise((resolve, reject) => {

            let q;
            let q_args;
            if (typeof route.getRootId() != "undefined") {
                if (!fetchUri) {
                    q = `SELECT id, root_id from uri where root_id = ?`;
                } else {
                    q = `SELECT id, root_id, uri from uri where root_id = ?`;
                }
                q_args = [route.getRootId()];
            } else {
                if (!fetchUri) {
                    q = `SELECT id, root_id from uri where id = ?`;
                } else {
                    q = `SELECT id, root_id, uri from uri where id = ?`;
                }
                q_args = [route.getId()];
            }


            db_transaction.db_quick_query(q, q_args).then((res) => {

                if (typeof res == "object" && Object.keys(res).length === 0) {
                    return resolve("Nothing found");
                }

                return resolve(Object.assign({}, res));

            })

        })

    }


    createOrUpdateUri(req, route) {

        if (typeof route.getId() != "undefined") {

            this.removeRouteFromRuntime(req, [route]);

        }

        return new Promise((resolve, reject) => {

            let q;
            let q_args;
            if (typeof route.getId() != "undefined") {
                if (typeof route.getUri() != "undefined") {

                    q = `UPDATE uri SET root_id = ?, feature = ?, uri = ?, isExternal = ?, lastModifiedAt = CURRENT_TIMESTAMP WHERE id = ?`;
                    q_args = [route.getRootId(), route.getFeature(), route.getUri(), route.isIsExternal(), route.getId()];

                } else {

                    q = `UPDATE uri SET root_id = ?, feature = ?, isExternal = ?, lastModifiedAt = CURRENT_TIMESTAMP WHERE id = ?`;
                    q_args = [route.getRootId(), route.getFeature(), route.isIsExternal(), route.getId()];

                }

            } else {
                q = `INSERT INTO uri (root_id, feature, uri, isExternal) VALUES (?, ?, ?, ?)`;
                q_args = [route.getRootId(), route.getFeature(), route.getUri(), route.isIsExternal()];
            }

            db_transaction.db_quick_query(q, q_args).then(res => {

                this.fetchCreatedId(route).then((res) => {
                    return resolve(res);
                })

            });


        });

    }

    fetchCallbackId(contentType, args) {

        return new Promise((resolve, reject) => {

            let q;
            let q_args;
            switch (contentType) {

                case "file":
                    q = `SELECT id from callback where filepath = ? AND filename = ?`;
                    q_args = [args.filepath, args.filename];
                    break;
                case "page":
                    q = `SELECT id from callback where content_id = ?`;
                    q_args = [args.content_id];
                    break;
                case "form":
                    q = `SELECT id from callback as c where c.callback= ? AND c.form_name = ?`
                    q_args = [args.callback, args.content_id];
                case "callback":
                    q = `SELECT id from callback as c where c.callback= ? AND c.form_name = ?`
                    q_args = [args.callback, args.content_id];
            }

            db_transaction.db_quick_query(q, q_args).then(res => {
                return resolve(res.id);
            })

        })

    }

    addOrUpdateUriContent(route) {

        return new Promise((resolve, reject) => {

            let q_c = `INSERT INTO callback (filepath, filename, callback, form_name, content_id, isFile) values (?, ?, ?, ?, ?, ?)`;
            let q_p = `INSERT INTO pages (title, method, theme, uri_id, root_id, callback_id) values (?, ?, ?, ?, ?, ?)`;
            let q_u_c = `UPDATE callback SET filepath = ?, filename = ?, callback = ?, form_name = ?, content_id = ?, isFile = ? WHERE id = ?`;
            let q_u_p = `UPDATE pages SET title = ?, method = ?, theme = ?, callback_id = ?, root_id = ?, lastModifiedAt = CURRENT_TIMESTAMP WHERE uri_id = ?`;
            let select_page = `Select id from pages where uri_id = ?`;
            let select_page_args = [route.getId()];

            let filepath;
            let filename;
            let callback;
            let isFile = false;
            let q_check;
            let q_check_args;
            let q_c_args;
            let q_p_args;
            let fetchId;
            switch (route.getContentType()) {
                case "file":
                    isFile = true;
                    filepath = route.getFilepath();
                    filename = route.getFilename();
                    callback = null;
                    q_check = `SELECT id from callback as c where c.filepath = ? AND c.filename = ?`;
                    q_check_args = [filepath, filename];
                    q_c_args = [filepath, filename, callback, null, null, isFile];
                    q_p_args = [route.getTitle(), route.getMethod(), route.getTheme(), route.getId(), route.getRootId()];
                    fetchId = () => { return new Promise((resolve, reject) => { this.fetchCallbackId(route.getContentType(), Object.assign({}, { filepath: filepath, filename: filename })).then(res => { resolve(res) }) }) }
                    break;
                case "page":
                    filepath = global.BACKEND_MODULE_DIR + "/views/content/";
                    filename = "content"
                    callback = "getContent"
                    q_check = `SELECT id from callback where content_id = ?`;
                    q_check_args = [route.getContentId()];
                    q_c_args = [filepath, filename, callback, null, route.getContentId(), isFile];
                    q_p_args = [route.getTitle(), route.getMethod(), route.getTheme(), route.getId(), route.getRootId()];
                    fetchId = () => { return new Promise((resolve, reject) => { this.fetchCallbackId(route.getContentType(), Object.assign({}, { content_id: route.getContentId() })).then(res => { resolve(res) }) }) }
                    break;
                case "form":
                    filepath = global.BACKEND_MODULE_DIR + "/form/";
                    filename = "form_service"
                    callback = "get_form"
                    q_check = `SELECT id from callback as c where c.callback= ? AND c.form_name = ?`;
                    q_check_args = [callback, route.getContentId()];
                    q_c_args = [filepath, filename, callback, route.getContentId(), null, isFile];
                    q_p_args = [route.getTitle(), route.getMethod(), route.getTheme(), route.getId(), route.getRootId()];
                    fetchId = () => { return new Promise((resolve, reject) => { this.fetchCallbackId(route.getContentType(), Object.assign({}, { callback: callback, content_id: route.getContentId() })).then(res => { resolve(res) }) }) }
                    break;
                case "callback":
                    filepath = global.BACKEND_MODULE_DIR + "/form/";
                    filename = "form_service"
                    callback = "validate_form"
                    q_check = `SELECT id from callback as c where c.callback= ? AND c.form_name = ?`;
                    q_check_args = [callback, route.getContentId()];
                    q_c_args = [filepath, filename, callback, route.getContentId(), null, isFile];
                    q_p_args = [route.getTitle(), route.getMethod(), route.getTheme(), route.getId(), route.getRootId()];
                    fetchId = () => { return new Promise((resolve, reject) => { this.fetchCallbackId(route.getContentType(), Object.assign({}, { callback: callback, content_id: route.getContentId() })).then(res => resolve(res)) }) }
                    break;

            }

            if (route.getContentType() != "file" && route.getContentId() == null) {

                q_p_args = [route.getTitle(), route.getMethod(), route.getTheme(), route.getId(), route.getRootId(), null];

                db_transaction.db_quick_query(select_page, select_page_args).then(res_check => {

                    if (typeof res_check == "object" && Object.keys(res_check).length === 0) {
                        q_p = q_p;
                    } else {
                        q_p = q_u_p;
                        q_p_args.splice(-1, 1);
                        q_p_args.splice(3, 1, null);
                        q_p_args.push(res_check.id);

                    }

                    db_transaction.db_quick_query(q_p, q_p_args).then(res => {

                        return resolve(Object.assign({}, { id: route.getId(), root_id: route.getRootId() }));

                    })

                })


            } else {

                db_transaction.db_quick_query(q_check, q_check_args).then(res_check => {

                    if (typeof res_check == "object" && Object.keys(res_check).length === 0) {
                        db_transaction.db_quick_query(q_c, q_c_args).then(c_res => {

                            db_transaction.db_quick_query(select_page, select_page_args).then(res_check => {

                                fetchId().then(f_res => {

                                    if (typeof f_res == "object" && Object.keys(f_res).length === 0) {
                                        q_p = q_p;
                                        q_p_args.push(parseInt(f_res));
                                    } else {
                                        q_p = q_u_p;
                                        q_p_args.splice(3, 1, f_res);
                                        q_p_args.push(res_check.id);


                                    }

                                    db_transaction.db_quick_query(q_p, q_p_args).then(res => {

                                        return resolve(Object.assign({}, { id: route.getId(), root_id: route.getRootId() }));

                                    })
                                })

                            })

                        })

                    } else {

                        db_transaction.db_quick_query(select_page, select_page_args).then(res_check => {

                            fetchId().then(f_res => {

                                if (typeof f_res == "object" && Object.keys(f_res).length === 0) {
                                    q_p = q_p;
                                    q_p_args.push(f_res);
                                } else {
                                    q_p = q_u_p;
                                    q_p_args.splice(3, 1, f_res);
                                    q_p_args.push(res_check.id);


                                }

                                db_transaction.db_quick_query(q_p, q_p_args).then(res => {

                                    return resolve(Object.assign({}, { id: route.getId(), root_id: route.getRootId() }));

                                })
                            })

                        })

                    }
                })

            }

        })

    }

    removeRoutes(routes, req, ro) {

        let unmount_route_q = `SELECT u.uri from uri as u where u.id = ?`;

        let unmounte_page_q = `SELECT id from pages where uri_id = ?`;

        let pp_q = `DELETE from pages_permissions where page_id = ?`;

        let p_q = `DELETE p from uri as u INNER JOIN pages as p ON p.uri_id = u.id where u.id = ?`;

        let q = `DELETE u from uri as u where u.id = ?`;


        return new Promise((resolve, reject) => {

            routes.map((route, i) => {

                let dismount_routes = [];


                dismount_routes.push(db_transaction.db_quick_query(unmount_route_q, [route]));

                Promise.all(dismount_routes).then(uris => {

                    this.removeRouteFromRuntime(req, uris);

                    db_transaction.db_quick_query(unmounte_page_q, [route]).then(p_id => {

                        let deletes = [];
                        if (typeof p_id.id != "undefined") {
                            deletes.push(db_transaction.db_quick_query(pp_q, [p_id.id]));
                        }

                        Promise.all(deletes).then(res => {
                            deletes = [];
                            deletes.push(db_transaction.db_quick_query(p_q, [route]));
                            Promise.all(deletes).then(p_res => {
                                deletes = [];
                                deletes.push(db_transaction.db_quick_query(q, [route]));
                                Promise.all(deletes).then(p_res => {

                                    return resolve();
                                })
                            })
                        })


                    })


                })

            })

        })

    }

    addOrUpdateUriPermissions(route, req, ro) {

        return new Promise((resolve, reject) => {

            let q;

            db_transaction.db_quick_query(`SELECT id from pages where uri_id = ?`, [route.getId()]).then(p_res => {


                if (typeof p_res == "object" && Object.keys(p_res).length === 0) {

                    return resolve("Nothing was found");

                } else {


                    db_transaction.db_quick_query(`SELECT id from pages_permissions where page_id = ?`, [p_res.id]).then(f_res => {

                        if (typeof f_res == "object" && Object.keys(f_res).length === 0) {

                            q = `INSERT into pages_permissions (${typeof route.permissions != "undefined" ? Object.keys(route.permissions).join(", ") + ", " : ""} page_id) VALUES (${typeof route.permissions != "undefined" ? Object.values(route.permissions).join(", ") + ", " : ""} ?)`;

                        } else if (typeof route.permissions != "undefined") {

                            q = `UPDATE pages_permissions SET ${typeof route.permissions != "undefined" ? Object.entries(route.permissions).map((v) => { return `${v[0]} = ${v[1]}` }).join() : ""} WHERE page_id = ?`;
                        }

                        if (typeof q != "undefined") {

                            let q_u = `UPDATE uri SET isPublished = ? WHERE id = ?`;
                            db_transaction.db_quick_query(q, [p_res.id]).then(res => {

                                db_transaction.db_quick_query(q_u, [route.isIsPublished(), route.getId()]).then(u_res => {

                                    if (route.isIsPublished()) {
                                        this.addLatestRouteToRuntime(req, ro);
                                    }
                                    return resolve();

                                })

                            })

                        } else {
                            let q_u = `UPDATE uri SET isPublished = ? WHERE id = ?`;

                            db_transaction.db_quick_query(q_u, [route.isIsPublished(), route.getId()]).then(u_res => {

                                if (route.isIsPublished()) {
                                    this.addLatestRouteToRuntime(req, ro);
                                }
                                return resolve();

                            })
                        }

                    })

                }

            })



        })

    }

    removeRouteFromRuntime(req, uris) {
        uris.map(uri => {

            if (typeof uri.id != "undefined") {

                db_transaction.db_quick_query('SELECT u.uri from uri as u where id = ?', [uri.id]).then(result => {

                    if (typeof result.uri != "undefined" && !result.uri.match("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})")) {
                        let index = req.app._router.stack.findIndex(r => (typeof r.route != "undefined" ? r.route.path == result.uri ? true : false : false));
                        if (index != -1) {
                            req.app._router.stack.splice(index, 1);
                            if(process.env.AWS_ENV){
                                let autoScaling = awsAutoScaling.init();
                                awsAutoScaling.refreshAllInstances(autoScaling);
                            }
                        }
                        
                    }
                })

            } else if (typeof uri.uri != "undefined") {

                if (!uri.uri.match("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})")) {
                    let index = req.app._router.stack.findIndex(r => (typeof r.route != "undefined" ? r.route.path == uri.uri ? true : false : false));
                    if (index != -1) {
                        req.app._router.stack.splice(index, 1);
                        if(process.env.AWS_ENV){
                            let autoScaling = awsAutoScaling.init();
                            awsAutoScaling.refreshAllInstances(autoScaling);
                        }
                    }
                }

            }

        })
    }

    addLatestRouteToRuntime(req, ro) {

        let index = req.app._router.stack.findIndex(r => (typeof r.route != "undefined" ? r.route.path == "*" ? true : false : false));
        if (index != -1) {
            req.app._router.stack.splice(index, 1);
        }

        let q = "SELECT * from uri AS u INNER JOIN pages AS p ON p.uri_id = u.id INNER JOIN pages_permissions AS pp ON pp.page_id = p.id LEFT JOIN callback AS c ON c.id = p.callback_id where u.isPublished = true ORDER BY u.lastModifiedAt DESC LIMIT 1";
        db_transaction.db_quick_query(q).then(route => {

            routeBuilder.buildRoute(route, req.app, ro.i18n);
            routeBuilder.build404Routes(req.app, ro.i18n);
            if(process.env.AWS_ENV){
                let autoScaling = awsAutoScaling.init();
                awsAutoScaling.refreshAllInstances(autoScaling);
            }


        })

    }

    fetchRoutes(data = "*", value, itemsNumber, pageNumber = null, addHomepage = false, isSystem = false) {

        return new Promise((resolve, reject) => {

            let main_q;
            let count_q;
            let callback_q;
            if (addHomepage) {
                main_q = db_transaction.db_quick_query(`SELECT ${data} FROM uri AS u INNER JOIN pages as p ON p.uri_id = u.id WHERE ((u.uri LIKE ? OR u.root_id LIKE ? OR p.title LIKE ?) ${isSystem == false ? "AND u.isSystem = false" : "" }) OR u.uri = '/' ORDER BY u.lastModifiedAt DESC ${itemsNumber!=null ? "LIMIT" : ""}  ${pageNumber != null ? pageNumber + ', ' : ""} ${itemsNumber != null ? itemsNumber : ""}`, [`%${value}%`, `%${value}%`, `%${value}%`], null, false);
                count_q = `SELECT COUNT(u.id) as count FROM uri AS u INNER JOIN pages as p ON p.uri_id = u.id WHERE ((u.uri LIKE ? OR u.root_id LIKE ? OR p.title LIKE ?) ${isSystem == false ? "AND u.isSystem = false" : "" }) OR u.uri = '/'`;
            } else {
                main_q = db_transaction.db_quick_query(`SELECT ${data} FROM uri AS u INNER JOIN pages as p ON p.uri_id = u.id WHERE (u.uri LIKE ? OR u.root_id LIKE ? OR p.title LIKE ?) ${isSystem == false ? "AND u.isSystem = false" : "" } ORDER BY u.lastModifiedAt DESC ${itemsNumber!=null ? "LIMIT" : ""} ${pageNumber != null ? pageNumber + ', ' : ""} ${itemsNumber != null ? itemsNumber : ""}`, [`%${value}%`, `%${value}%`, `%${value}%`], null, false);
                count_q = `SELECT COUNT(u.id) as count FROM uri AS u INNER JOIN pages as p ON p.uri_id = u.id WHERE (u.uri LIKE ? OR u.root_id LIKE ? OR p.title LIKE ?) ${isSystem == false ? "AND u.isSystem = false" : "" }`;
            }


            count_q = db_transaction.db_quick_query(count_q, [`%${value}%`, `%${value}%`, `%${value}%`], null);
            Promise.all([main_q, count_q]).then(res => {

                let callback = [];

                res[0].map((r, index) => {
                    if (r.callback_id != null) {
                        callback.push(db_transaction.db_quick_query(`SELECT * from callback where id = ?`, [r.callback_id]))
                    }
                });

                Promise.all(callback).then(r=>{

                if(callback.length > 0){
                    
                        r.map((c=>{
                            let index = res[0].findIndex(result=>(result.callback_id == c.id));
                            res[0][index] = Object.assign({}, res[0][index], { callback : c });
                        }))
                        
                        resolve(res);
                    

                }else{

                    resolve(res);

                }

            })

            })

        })

    }

    fetchAllUriByFeature(data = "*", feature) {
        return new Promise((resolve) => {
            let q = `SELECT ${data} FROM uri where feature LIKE ?`;
            db_transaction.db_quick_query(q, [`${feature + '%'}`], null, false).then((res) => {
                let results = [];
                res.map((routeData) => {
                    let route = new Route();
                    route.setUri(routeData.uri);
                    route.setFeature(routeData.feature);
                    route.setValue(routeData.feature);
                    results.push(route);
                })

                resolve(results);

            })

        }).catch((error) => {

            throw new Error("Error while fetching uri by feature (RouteFactory@fetchAllUriByFeature) : " + error)

        })
    }

}