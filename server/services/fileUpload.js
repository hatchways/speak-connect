const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require("config");

aws.config.update({
    secretAccessKey: config.get("secretAccessKey"),
    accessKeyId: config.get("accessKeyId"),
    region: "us-east-2",
})

const s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'audio/webm') {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid type. jpeg, png or audio files only!'), false);
    }
}

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket: 'twitter-audio',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            console.log('this is the file', file);
            cb(null, Date.now().toString())
        }
    })
})
module.exports = upload;