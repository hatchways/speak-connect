const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({

    secretAccessKey: " UTl2VDCIZLV6wQYlPSL6eZ10DTYHg1zph/N5IpoB ",
    accessKeyId: "AKIA6H2ODDFGI4QIYI46",
    region: "us-east-2 "
})

const s3 = new aws.S3()

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'twitter-audio',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: "testing metadata" });
        },
        key: function (req, file, cb) {
            console.log(file);
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;