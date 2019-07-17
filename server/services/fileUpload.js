const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({

    secretAccessKey: "kmPq97HFQFGnzC7nk/a+eQDvm4WlAij/36ApuQ/n",
    accessKeyId: "AKIA6H2ODDFGEKLUAGOA",
    region: "us-east-2"
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
            console.log('this is the file', file);
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;