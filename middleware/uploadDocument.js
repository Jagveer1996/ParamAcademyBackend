const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Change folder name if needed
const uploadPath = path.join(__dirname, "..", "uploads", "courseDocs");

if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

// 🎯 Updated MIME types to allow only PDF
const filterFile = (req, file, cb) => {
    const allowedTypes = ['application/pdf'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only .pdf format is allowed"), false);
    }
};

const uploadDoc = multer({
    storage,
    filterFile, // ✅ Note this key should be `fileFilter`, not `filterFile`
    limits: {
        fileSize: 5 * 1024 * 1024 // bumped limit to 5MB, adjust as needed
    }
});

module.exports = uploadDoc;