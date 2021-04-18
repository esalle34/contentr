//Content Factory 
//Author - Eric Salle

const path = require("path");
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const db_transaction = require(path.resolve(root_path + "/db_transaction"))();
const Content = require(path.resolve(global.MODULE_CONTENT + "/content")).Content;
const ContentTypesService = require(path.resolve(global.MODULE_CONTENT_TYPES + "/content_types_service"));

export class ContentFactory extends Object {

    constructor(args) {

        super();

    }

    getQueryPrefix(name){

        let queries = {
            "search" : "content.content_name, content.id, content.lastModifiedAt, content_types.machine_name",
        }

        return queries[name];

    }

    createContent(content_type_id, content_name, values) {

        return new Promise((resolve, reject) => {

            this.getContent(null, content_name).then((res)=>{
                if (res != "Nothing found") {
                    return resolve("Already exists");
                }else{

                    ContentTypesService.getContentTypeName(content_type_id).then((machine_name) => {
                        let q = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=? AND TABLE_NAME=? AND COLUMN_NAME NOT LIKE "%id" AND COLUMN_NAME NOT LIKE "%createdAt" AND COLUMN_NAME NOT LIKE "%lastModifiedAt" ORDER BY ordinal_position`;
                        db_transaction.db_quick_query(q, [db_transaction.db_get_infos().DB_NAME, `revision_${machine_name}`], null, false).then((columns) => {
        
                            let insert_array = [];
        
                            q = `INSERT INTO revision_${machine_name} (`;
        
                            columns.map((col, index) => {
                                q = q + col.COLUMN_NAME;
                                if (columns.length == index + 1) {
                                    q = q + ") VALUES (";
                                } else {
                                    q = q + ", ";
                                }
                            })
                            let j = 0;
                            for (let key in values) {
                                insert_array.push(values[key]);
                                j++;
                                if (j < Object.keys(values).length) {
                                    q = q + "?, ";
                                } else {
                                    q = q + "?);";
                                }
                            }
        
        
        
                            db_transaction.db_quick_query(q, insert_array).then(() => {
        
                                q = `INSERT INTO data_${machine_name} (revision_id) VALUES ((SELECT Max(id) from revision_${machine_name}));`;
        
                                db_transaction.db_quick_query(q).then(() => {
        
                                    q = `INSERT INTO content (data_id, content_name, content_type_id) VALUES ((SELECT Max(id) from data_${machine_name}), ?, ?);`;
        
                                    db_transaction.db_quick_query(q, [content_name, content_type_id]).then(() => {
                                        return resolve();
                                    })
        
                                })
        
                            })
        
                        })
                    })

                }

            })



        })

    }

    getContent(content_id = null, content_name = null) {

        let q = `SELECT * FROM content AS content INNER JOIN content_types AS content_types ON content_types.id = content.content_type_id WHERE content.${content_id != null ? "id" : "content_name"} = ?`;

        return new Promise((resolve, reject) => {

            db_transaction.db_quick_query(q, [content_id != null ? content_id : content_name]).then((content_data) => {

                if (Object.keys(content_data).length === 0) {
                    return resolve("Nothing found");
                }

                q = `SELECT * FROM content AS content INNER JOIN content_types AS content_types ON content_types.id = content.content_type_id INNER JOIN data_${content_data.machine_name} AS data ON data.id = content.data_id INNER JOIN revision_${content_data.machine_name} AS revision ON revision.id = data.revision_id WHERE content.${content_id != null ? "id" : "content_name"} = ?`;
                db_transaction.db_quick_query(q, [content_id != null ? content_id : content_name]).then((content_data) => {

                    let content = new Content();
                    let args = {};
                    for (let key in content_data) {
                        if (key != "machine_name" && key != "template_name" && key != "id" && key != "content_type_id" && key != "createdAt") {
                            args = Object.assign({}, args, { [key]: content_data[key] });
                        }
                    }
                    content.setId(content_data.id);
                    content.setContentName(content_data.content_name);
                    content.setMachineName(content_data.machine_name);
                    content.setCreatedAt(content_data.createdAt);
                    content.setLastModifiedAt(content_data.lastModifiedAt);
                    content.setRevisionLastModifiedAt(content_data.revisionlastModifiedAt);
                    content.setRevisionCreatedAt(content_data.revisionCreatedAt);
                    content.setElement(content_data.template_name);
                    content.setArgs(args);
                    content.setReactNested([]);
                    return resolve(content);

                })

            })

        })

    }

    getContents(datas = "*", sentence, pageNumber = null, itemsNumber = null) {

        return new Promise((resolve, reject) => {

            let main_q = db_transaction.db_quick_query(`SELECT ${datas} FROM content AS content INNER JOIN content_types AS content_types ON content_types.id = content.content_type_id WHERE content.content_name LIKE ? ORDER BY content.lastModifiedAt DESC ${itemsNumber != null ? "LIMIT" : ""}  ${pageNumber != null ? pageNumber + ', ' : ""} ${itemsNumber != null ? itemsNumber : ""}`, 
            [`%${sentence}%`], null, false);
            let count_q = db_transaction.db_quick_query(`SELECT COUNT(id) as count FROM content where content_name LIKE ?`, [`%${sentence}%`], null, false);

            Promise.all([main_q, count_q]).then((results)=>{

                results = [[...results[0]], ...results[1]];
                return resolve(results);

            })

        })

    }

    getContentValues(content_id){

        return new Promise((resolve, reject)=>{

            ContentTypesService.getContentTypeName(null, content_id).then((machine_name) => {

                db_transaction.db_quick_query(`SELECT r.*, c.id FROM content AS c INNER JOIN data_${machine_name} AS d ON d.id = c.data_id INNER JOIN revision_${machine_name} AS r ON r.id = d.revision_id WHERE c.id = ?`, [content_id])
                .then(fieldValues=>{
    
                    return resolve(fieldValues);
    
                })
    
            })

        })

    }

    updateContent(content_id, values){

        return new Promise((resolve, reject)=>{

            ContentTypesService.getContentTypeName(null, content_id).then((machine_name) => {

                let q = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=? AND TABLE_NAME=? AND COLUMN_NAME NOT LIKE "%id" AND COLUMN_NAME NOT LIKE "%createdAt" AND COLUMN_NAME NOT LIKE "%lastModifiedAt" ORDER BY ordinal_position`;
                db_transaction.db_quick_query(q, [db_transaction.db_get_infos().DB_NAME, `revision_${machine_name}`], null, false).then((columns) => {

                    let insert_array = [];

                    q = `INSERT INTO revision_${machine_name} (`;

                    columns.map((col, index) => {
                        q = q + col.COLUMN_NAME;
                        if (columns.length == index + 1) {
                            q = q + ") VALUES (";
                        } else {
                            q = q + ", ";
                        }
                    })
                    let j = 0;
                    for (let key in values) {
                        insert_array.push(values[key]);
                        j++;
                        if (j < Object.keys(values).length) {
                            q = q + "?, ";
                        } else {
                            q = q + "?);";
                        }
                    }

                    db_transaction.db_quick_query(q, insert_array).then(() => {

                        q = `UPDATE data_${machine_name} SET revision_id = (SELECT Max(id) from revision_${machine_name}) WHERE id = ?`;

                        db_transaction.db_quick_query(q, [content_id]).then(() => {
                            return resolve();
                        })

                    })

                })

            })

        })

    }

}