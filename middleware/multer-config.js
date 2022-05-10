
const multer = require('multer');// Import the multer middleware for upload the files "images"

const MIME_TYPE = { // Object containing the MIME type of the files that can be uploaded
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
};

const storage = multer.diskStorage({ // Create the storage for the files

    destination: (req, file, cb) => { // Create the destination for the files

        cb(null, 'images'); // The files are saved in the "images" folder
    },

    filename: (req, file, cb) => { // Create the filename for the files
        const name = file.originalname;
        const extension = MIME_TYPE[file.mimetype];
        cb(null, name + '_' + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage, limits: { fileSize: 2097152 } }).single('image');// limits 2mb






