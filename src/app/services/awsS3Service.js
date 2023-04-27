const aws = require('aws-sdk')

// config AWS
aws.config.update({
    accessKeyId: process.env.AWS_KEYID,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION
});

const s3 = new aws.S3({ apiVersion: process.env.AWS_API_VERSION });

exports.upload = async (file, folderName, fileName) => {
    try {
        const uploadParams = {
            "ACL": "public-read",
            "ContentType": file.mimetype,
            Bucket: process.env.AWS_BUCKET,
            Key: folderName + fileName + Date.now(),
            Body: file.buffer
        };
        return new Promise(function (resolve, reject) {
            s3.upload(uploadParams, function (err, data) {
                if (err) {
                    reject(err);
                } else resolve(data);
            });
        })
    } catch(error) {
        throw new Error(`error in uploadToS3: ${error.message}`)
    }

}

