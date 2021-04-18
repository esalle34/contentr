//ContentType Factory
//Author - Eric Salle

import { resolve } from "path";

const path = require("path");
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const db_transaction = require(path.resolve(root_path + "/db_transaction"))();
const ContentType = require(path.resolve(global.MODULE_CONTENT_TYPES + "/content_types")).ContentType;

export class ContentTypeFactory extends Object {

    constructor(args) {

        super();

    }

    fetchContentType(machine_name) {

        return new Promise((resolve, reject) => {

            let q = `SELECT id from content_types where machine_name= ?`;

            db_transaction.db_quick_query(q, [machine_name]).then((res) => {

                resolve(res);

            })

        })

    }

    createContentType(args) {

        return new Promise((resolve, reject) => {

            this.fetchContentType(args.machine_name).then((res) => {

                if (typeof res == "object" && typeof res.id != "undefined") {

                    return resolve("Already exists");

                } else {

                    let q = `INSERT INTO content_types (machine_name, template_name) VALUES(?, ?)`;

                    db_transaction.db_quick_query(q, [args.machine_name, args.template_name]).then(() => {
                        this.fetchContentType(args.machine_name).then((res) => {
                            return resolve(res);
                        })
                    })

                }

            })

        })


    }

    createOrUpdateForm(form_name, inputsArray, form = null) {

        return new Promise((resolve, reject) => {

            db_transaction.db_quick_query(`SELECT id from forms where name=?`, [form_name]).then(res => {
                if (Object.keys(res).length != 0) {
                    //Update
                    return resolve();
                } else {
                    //Insert
                    let default_form = JSON.stringify({ method: "post", async: true, id: `${form_name}`, key: `${form_name}`, className: `${form_name} backoffice-panel has-popin col-12 row justify-content-center`, enctype: "multipart/form-data", els: [] });

                    let form_q = `INSERT INTO forms (name, element, uri_id, number, isSystem) VALUES(?, ?, (SELECT id FROM uri WHERE root_id = "create-content"), ?, ?)`;
                    db_transaction.db_quick_query(form_q, [form_name, form == null ? default_form : form, 0, false]).then(res => {
                        db_transaction.db_quick_query(`SELECT id from forms where name=?`, [form_name]).then(res => {
                            if (Object.keys(res).length != 0) {

                                let values = Object.values(inputsArray);
                                let keys = Object.keys(inputsArray);
                                let input_queries = [];


                                values.map((input, index) => {

                                    input_queries.push(db_transaction.db_quick_query(`INSERT INTO forms_elements (name, element, args, form_number, weight, form_id) VALUES (?, ?, ?, ?, ?, ?)`,
                                        [input.mname, input.element, JSON.stringify(input.args), 0, index, res.id]))

                                })

                                input_queries.reduce((input_q, next) => {
                                    return input_q.then(next);
                                })

                                let revision_table_query = `CREATE table IF NOT EXISTS revision_${form_name} (`;
                                let data_table_query = `CREATE table IF NOT EXISTS data_${form_name} (revision_id INT NOT NULL, FOREIGN KEY(revision_id) REFERENCES revision_${form_name}(id), id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id))`

                                values.map((input, index) => {

                                    let default_q_next = keys.length == index + 1 ? ", revisionCreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, revisionLastModifiedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id))" : ", ";
                                    let default_q_submit = keys.length == index + 1 ? "revisionCreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, revisionLastModifiedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id))" : "";

                                    if (input.element == "input") {

                                        if (input.args.type == "text") {

                                            revision_table_query = revision_table_query + `${input.args.name} VARCHAR(${input.args.maxlength}) ${default_q_next}`;

                                        } else if (input.args.type == "email" || input.args.type == "password") {

                                            revision_table_query = revision_table_query + `${input.args.name} VARCHAR(255) ${default_q_next}`;

                                        } else if (input.args.type == "number") {

                                            revision_table_query = revision_table_query + `${input.args.name} INT ${default_q_next}`;

                                        } else if (input.args.type == "checkbox") {

                                            revision_table_query = revision_table_query + `${input.args.name} BOOL DEFAULT false ${default_q_next}`;

                                        } else {

                                            revision_table_query = revision_table_query + default_q_submit;

                                        }

                                    } else if (input.element == "select") {

                                        revision_table_query = revision_table_query + `${input.args.name} VARCHAR(255) ${default_q_next}`;

                                    } else if (input.element == "fileSelect") {

                                        revision_table_query = revision_table_query + `${input.args.name} TEXT ${default_q_next}`;

                                    } else if (input.element == "textarea" || input.element == "ckEditor") {

                                        revision_table_query = revision_table_query + `${input.args.name} LONGTEXT ${default_q_next}`;

                                    }

                                })

                                db_transaction.db_quick_query(revision_table_query).then(() => {
                                    db_transaction.db_quick_query(data_table_query).then(() => {
                                        return resolve();
                                    })
                                })



                            } else {
                                return resolve();
                            }
                        })
                        return resolve();
                    })
                }
            })



            return resolve();
        })

    }

    getContentTypes(sentence = null) {

        const resolveContentType = (res, resolve) => {
            if (typeof res == "object" && Object.keys(res).length === 0) {

                return resolve("Nothing found");

            } else {

                let contentTypeArray = [];

                res.map(content_type => {

                    let contentType = new ContentType();
                    contentType.setMachineName(content_type.machine_name);
                    contentType.setTemplateName(content_type.template_name);
                    contentType.setId(content_type.id);
                    contentTypeArray.push(contentType);

                })

                return resolve(contentTypeArray);

            }
        }

        return new Promise((resolve, reject) => {

            if (sentence == null) {

                db_transaction.db_quick_query(`SELECT * from content_types`, null, null, false).then(res => {

                    resolveContentType(res, resolve);

                })

            } else {

                db_transaction.db_quick_query(`SELECT * FROM content_types WHERE machine_name LIKE ? OR id LIKE ? OR template_name LIKE ?`, [`%${sentence}%`, `%${sentence}%`, `%${sentence}%`], null, false).then(res => {

                    resolveContentType(res, resolve);

                })

            }


        })

    }

    getContentTypeName(content_type_id = null, content_id = null) {

        return new Promise((resolve, reject) => {

            if (content_type_id != null) {

                db_transaction.db_quick_query(`SELECT machine_name from content_types where id = ?`, [content_type_id]).then(res => {

                    return resolve(res.machine_name);
                })

            }else if(content_id != null){

                db_transaction.db_quick_query(`SELECT machine_name FROM content AS c INNER JOIN content_types as ct ON ct.id = c.content_type_id WHERE c.id=?`, [content_id]).then(res=>{

                    return resolve(res.machine_name);

                })

            }


        })

    }

}