const multer = require('multer')
const path = require('path')
const {validateImage} = require('./validationMiddleware')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images')
    },
    filename: function (req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        validateImage(file, cb)
    }
})

module.exports = upload