//Upload Service Module
//Author - Eric Salle

const path = require('path');
const root_path = path.dirname(require.main.filename);
const global = require(path.resolve(root_path + "/global"))();
const awsS3Uploads = require(path.resolve(root_path + "/operations/init/awsS3UploadsInit"));
const view_service = require(path.resolve(global.MODULE_VIEW + "/view_service"));
var rimraf = require("rimraf");
var multer = require("multer");
const fs = require("fs");
const mime = require("mime-types");
const imagemin = require("imagemin");
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminOptipng = require('imagemin-optipng');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

module.exports = {

    initDirectories: (route, req, res) => {

        let s3 = awsS3Uploads.init();
        let uploadQuery = new Promise((resolve, reject) => {
            try {
                awsS3Uploads.createRootUploadFolder(s3);
                resolve();
            } catch (error) {
                reject();
                console.log(error);
            }
        })
        uploadQuery.then(resolve => {

            return res.status(200).send("Directories created successfully !")

        })

    },

    uploadFileToS3: (req, res) => {

        let s3 = awsS3Uploads.init();
        let filemime = mime.lookup(req.file.filename);
        if(filemime.includes("video")){
            filemime = "audio/mpeg";
        }else if(filemime.includes("svg")){
            filemime = "image/svg+xml";
        }

        var stream = fs.createReadStream(req.file.path);
        let uri = req._parsedOriginalUrl.path.split("/files/add")[1];
        if (uri.endsWith("/")) {
            uri = uri.slice(0, -1)
        }
        let params = Object.assign({}, { Bucket: `${global.S3_BUCKET}`, Key: `${global.CMS_TITLE}/${global.UPLOAD_FOLDER}${uri}/${req.file.filename}`, Body: stream, ContentType: filemime })
        let s3upload = s3.upload(params, function (err, data) {
            if (err) {
                console.log("Error creating the folder: ", err);
            } else {
                console.log(`Successfully created ${global.CMS_TITLE}/${global.UPLOAD_FOLDER}${req._parsedOriginalUrl.path.split("/files/add")[1]}/ on S3`);

            }
        }).promise();

        try {

            s3upload.then(s3resolve => {

                return res.status(200).send(Object.assign({}, { message: "reload-file-browser", path: req._parsedOriginalUrl.path.split("/files/add")[1] }))


            })

        } catch (error) {
            console.log(error);
        }

    },

    createMulterLocalStorage: (req, res) => {

        var storage = multer.diskStorage({
            destination: function (req, file, cb) {


                let uri;

                uri = "." + req._parsedOriginalUrl.path.split("/files/add")[1];

                if (!fs.existsSync(uri)) {
                    fs.mkdirSync(uri, { recursive: true })
                }

                cb(null, uri)


            },
            filename: function (req, file, cb) {

                file = Object.assign({}, file, { originalname: file.originalname.replace(/\s/g, '_') })

                cb(null, path.basename(file.originalname, path.extname(file.originalname)) + path.extname(file.originalname));
            }
        })

        return storage;

    },

    getUploadView: (route, req, res) => {

        let body = { react_element: "getUploadView", args: { tr_title: route.i18n.translate("Files", route.lang) } };

        return view_service.getBuildView(route, req, res, body);

    },

    getFiles: (route, req, res) => {

        let body = view_service.checkAccessRights(route, req, res, null, false);

        if (body != null && body.hasError) {
            if (typeof body.redirectUri != "undefined") {
                return res.status(403).send(Object.assign({}, { redirect: body.redirectUri }));
            }
        }

        let params = req.body;

        let files = [];

        let fileSystem = process.env.AWS_ENV == "true" ? awsS3Uploads.initS3FS() : fs;

        let p = path.resolve(process.env.AWS_ENV == "true" ? params.root_path : root_path + params.root_path)


        if (params.root_path.length > 0) {

            fileSystem.readdir(p, (err, filenames) => {


                if (err) {

                    console.log(err)
                    return res.status(404).send(Object.assign({}, { message: "Folder not found", path: "../" + process.env.NODE_SRC + "/" + params.root_path }))

                }
                filenames.map(f => {
                    files.push(Object.assign({}, { filename: f.endsWith('/') ? f.slice(0, -1) : f, path: params.root_path, extension: path.extname(f).toLowerCase() }))
                })

                if (files.length > 0) {
                    return res.status(200).send(files);
                } else {
                    return res.status(404).send(Object.assign({}, { message: "Nothing found" }))
                }

            })

        } else {
            return res.status(404).send(Object.assign({}, { message: "Nothing found" }))
        }

    },

    addFolder(route, req, res) {

        let body = view_service.checkAccessRights(route, req, res, null, false);

        if (body != null && body.hasError) {
            if (typeof body.redirectUri != "undefined") {
                return res.status(403).send(Object.assign({}, { redirect: body.redirectUri }));
            }
        }

        let params = req.body;
        if (params[Object.keys(req.body).find(k => (k.includes("folder")))].match(/[^\w]/gi)) {

            return res.status(409).send(Object.assign({}, { isValid: false, errorLabel: route.i18n.translate("Accentuated and special characters are forbidden", route.lang) }));

        }


        if (process.env.AWS_ENV != "true") {


            let name = params[Object.keys(req.body).find(k => (k.includes("folder")))];
            if (!fs.existsSync("." + params.folderpath + "/" + name)) {
                fs.mkdirSync("." + params.folderpath + "/" + name)
            }
            res.status(200).send(Object.assign({}, { message: "reload-file-browser", path: params.folderpath }));


        } else {

            let s3 = awsS3Uploads.init();
            let s3Params = Object.assign({}, { Bucket: `${global.S3_BUCKET}`, Key: `${global.CMS_TITLE}/${global.UPLOAD_FOLDER}${params.folderpath}/${params[Object.keys(req.body).find(k => (k.includes("folder")))]}/`, Body: "" })
            let s3upload = s3.upload(s3Params, function (err, data) {
                if (err) {
                    console.log("Error creating the folder: ", err);
                } else {
                    console.log(`Successfully created ${global.CMS_TITLE}/${global.UPLOAD_FOLDER}${params.folderpath}/${params[Object.keys(req.body).find(k => (k.includes("folder")))]}/ on S3`);

                }
            }).promise();

            try {

                s3upload.then(resolve => {

                    res.status(200).send(Object.assign({}, { message: "reload-file-browser", path: params.folderpath }));


                })

            } catch (error) {
                console.log(error);
            }

        }


    },

    removeFile(route, req, res) {

        let body = view_service.checkAccessRights(route, req, res, null, false);

        if (body != null && body.hasError) {
            if (typeof body.redirectUri != "undefined") {
                return res.status(403).send(Object.assign({}, { redirect: body.redirectUri }));
            }
        }

        let params = req.body;

        if (process.env.AWS_ENV != "true") {

            rimraf.sync("." + params.file);

            res.status(200).send("File was successfully removed");

        } else {

            let s3 = awsS3Uploads.init();
            let file = params.file;
            let s3Params;
            let fileRemoveQuery;
            let removeCurrent = ()=>{

                s3Params = { Bucket: `${global.S3_BUCKET}`, Key: `${global.CMS_TITLE}/${global.UPLOAD_FOLDER}${file}` };

                fileRemoveQuery = s3.deleteObject(s3Params, function (err, data) {
                    if (err) console.log(err, err.stack);
                    else console.log();
                }).promise();
                fileRemoveQuery.then(resolve => {
                    res.status(200).send("File was successfully removed");
                })

            }
            if (path.extname(params.file).length == 0) {
                file = file + "/"
                let s3FS = awsS3Uploads.initS3FS();
                let deleteArray = [];
                s3FS.readdir(file, (err, files) => {

                    if (files.length > 0) {

                        files.map((f, index) => {

                            deleteArray.push({ Key: `${global.CMS_TITLE}/${global.UPLOAD_FOLDER}${file}${f}` })

                        })

                    }

                    if (deleteArray.length > 0) {
                        s3Params = { Bucket: `${global.S3_BUCKET}`, Delete: { Objects: deleteArray } };
                        fileRemoveQuery = s3.deleteObjects(s3Params, function (err, data) {
                            if (err) console.log(err, err.stack);
                            else console.log();
                        }).promise();
                        fileRemoveQuery.then(result => {
    
                            removeCurrent();
    
                        })
                    }else{
    
                        removeCurrent();
    
                    }

                })

            } else {

                removeCurrent();
                
            }


        }


    },
    compressFiles: (req, res, resolve) => {

        try {

            fs.readFile(process.env.AWS_ENV == "true" ? path.resolve(root_path + '/../' + req.file.path) : path.resolve(root_path + '/' + req.file.path), async (err, data) => {

                const buf = await imagemin.buffer(data, {
                    plugins: [
                        imageminMozjpeg({ quality: 60 }),
                        imageminOptipng({ optimizationLevel: 3 }),
                        imageminSvgo(),
                        imageminGifsicle({ optimizationLevel: 3 }),
                    ]
                });

                try {
                    fs.writeFile(process.env.AWS_ENV == "true" ? path.resolve(root_path + '/../' + req.file.path) : path.resolve(root_path + '/' + req.file.path), buf, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        if (resolve != null) {
                            resolve();
                        }

                    })

                } catch (error) {
                    console.log(error)
                }

            })

        } catch (error) {

            console.log(error);

        }

    }

}