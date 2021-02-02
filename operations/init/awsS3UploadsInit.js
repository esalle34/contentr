const path = require('path');
const global = require(path.resolve(`./${process.env.NODE_SRC}global`))();
const rootFolders = require(path.resolve(`./${process.env.NODE_SRC}theme`)).root_folder_list();
const defaultRootFolders = require(path.resolve(`./${process.env.NODE_SRC}theme`)).default_root_folder_list();
var S3FS = require('s3fs');
var fs = require ("fs");
var mime = require('mime-types')

module.exports = {

    init : () => {

        var AWS = require("aws-sdk");
        let s3
        if (process.env.AWS_ENV != "true") {
            AWS.config.loadFromPath(`${process.env.NODE_SRC}credentials.json`);
            s3 = new AWS.S3();
        } else {
            AWS.config.update({ region: global.AWS_REGION, "accessKeyId": process.env.AWSAccessKeyId, "secretAccessKey": process.env.AWSSecretKey })
            s3 = new AWS.S3({apiVersion: "2006-03-01"});
        }    

        return s3;
    },

    initS3FS : () =>{

        let s3fsImpl;
        if (process.env.AWS_ENV != "true") {
            s3fsImpl = new S3FS(`${global.S3_BUCKET}/${global.CMS_TITLE}/${global.UPLOAD_FOLDER}`,{
                accessKeyId: require(path.resolve(`${process.env.NODE_SRC}credentials.json`)).accessKeyId,
                secretAccessKey: require(path.resolve(`${process.env.NODE_SRC}credentials.json`)).secretAccessKey,
                signatureVersion: 'v4'
            })
        }else if(process.env.AWS_ENV == "true"){
            s3fsImpl = new S3FS(`${global.S3_BUCKET}/${global.CMS_TITLE}/${global.UPLOAD_FOLDER}`,{
                accessKeyId: process.env.AWSAccessKeyId,
                secretAccessKey: process.env.AWSSecretKey,
                signatureVersion: 'v4'
            })
        }


        return s3fsImpl;

    },
    

    createRootUploadFolder : function(s3){

        var bucketParams = {
            Bucket: global.S3_BUCKET,
            Prefix: `${global.CMS_TITLE}/${global.UPLOAD_FOLDER}`
        };

        // Call S3 to obtain a list of the objects in the bucket
        s3.listObjectsV2(bucketParams, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                if (data.Contents.length == 0) {
                    let params = { Bucket: global.S3_BUCKET, Key: `${global.CMS_TITLE}/${global.UPLOAD_FOLDER}/`, ACL: "public-read-write", Body: "" }
                    s3.upload(params, function (err, data) {
                        if (err) {
                            console.log("Error creating the folder: ", err);
                        } else {
                            console.log("Successfully created a uploaded-files folder on S3");

                        }
                        
                    });
                    let folderUploadQuery = new Promise((resolve, reject)=>{
                        for(let folder in rootFolders){
                        params = Object.assign({}, params, { Key : `${global.CMS_TITLE}/${global.UPLOAD_FOLDER}${rootFolders[folder].uri}/` })
                        s3.upload(params, function (err, data) {
                            if (err) {
                                console.log("Error creating the folder: ", err);
                            } else {
                                console.log(`Successfully created ${global.CMS_TITLE}/${global.UPLOAD_FOLDER}${rootFolders[folder].uri}/ on S3`);
    
                            }
                        });
                        resolve();
                    }
                })

                try{

                    folderUploadQuery.then(res=>{uploadDefaults(s3)});

                }catch(error){
                    console.log(error);
                }

                    
                }
                console.log("Success", data);
            }
        });

    },
    uploadDefaults : (s3) => {

        defaultRootFolders.map(def=>{

            fs.readdir(path.resolve(process.env.NODE_SRC == "build/" ? `${process.env.NODE_SRC}../${def}` : `${process.env.NODE_SRC}${def}`), (err, filenames)=>{
            
                filenames.map(file=>{

                    let filemime = mime.lookup(file);
    
                    var stream = fs.createReadStream(process.env.NODE_SRC == "build/" ? `${process.env.NODE_SRC}../${def}${file}` : `${process.env.NODE_SRC}${def}${file}`);
                    let params = { Bucket: global.S3_BUCKET, Key: `${global.CMS_TITLE}/${global.UPLOAD_FOLDER}${def}${file}`, ACL: "public-read-write", Body: stream, ContentType : filemime }
                    s3.upload(params, function (err, data) {
                        if (err) {
                            console.log("Error creating the folder: ", err);
                        } else {
                            console.log(`Successfully created ${global.CMS_TITLE}/${global.UPLOAD_FOLDER}${def}${file} on S3`);
    
                        }
                    });
    
                })
    
            })

        })


    }


}

const uploadDefaults = module.exports.uploadDefaults;