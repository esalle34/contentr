const path = require('path');
const global = require(path.resolve(`./${process.env.NODE_SRC}global`))();

module.exports = {

    init: () => {

        const AWS = require("aws-sdk");

        let autoScaling;
        if (process.env.AWS_ENV != "true") {
            AWS.config.loadFromPath(`${process.env.NODE_SRC}credentials.json`);
            autoScaling = new AWS.AutoScaling();
        } else {
            AWS.config.update({ region: global.AWS_REGION, "accessKeyId": process.env.AWSAccessKeyId, "secretAccessKey": process.env.AWSSecretKey })
            autoScaling = new AWS.AutoScaling();
        }

        return autoScaling;

    },

    refreshAllInstances: (autoScaling) => {

        return new Promise((resolve, reject) => {


            let params = {
                AutoScalingGroupName: global.AUTO_SCALING_GROUP_NAME
            }

            let describeInstanceRefreshes = autoScaling.describeInstanceRefreshes(params).promise();

            try {

                describeInstanceRefreshes.then(res => {
                    
                    let lastInstance = res.InstanceRefreshes[0];

                    if (lastInstance.Status == "Successful" || lastInstance.Status == "Cancelled" || lastInstance.Status == "Failed") {
                        autoScaling.startInstanceRefresh(params, (err, data) => {

                            if (err) {
                                console.log(err);
                                return reject(err);
                            }

                            return resolve();

                        })
                    }

                }).catch(error=>{
                    console.log("Warning : Instance Refresh already running.")
                })

            } catch (error) {
                console.log(error);
            }


        })

    },

}

const refreshAllInstances = module.exports.refreshAllInstances;