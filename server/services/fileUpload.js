const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey:
        "1pu4+1iTbeOVODJKHkTi9wyeqmQYAce7QM9RRBra",
    accessKeyId: "AKIAIVSW3VQEYJH3LNDA",
    region: "us-east-2",
})

const s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid type. jpeg or png files only!'), false);
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