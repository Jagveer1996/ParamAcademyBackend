const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, "..", "uploads", "courseImage");

if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath, {recursive:true})
}

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, uploadPath);
    },
    filename : (req, file, cb)=>{
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const filterFile = (req, file, cb)=>{
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(new Error("Only .jpeg .jpg .png .webp formats are allowed"), false)
    }
}

const upload = multer({
    storage,
    filterFile,
    limits :{
        fileSize : 3 * 1024 *1024
    }
})

module.exports = upload;