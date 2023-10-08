const multer = require('multer')
const path = require('path')
function validateImage(file, cb){
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    )
    const mimetype = allowedTypes.test(file.mimetype)
    console.log(mimetype)
    if(extname && mimetype){
        return cb(null, true)
    }else{
        return cb('Error: Inconvenient format only Images are allowed')
    }
}

module.exports = {validateImage}