const multer = require('multer');

const MIME_TYPES = {
    'application/pdf': 'pdf'
};

const storage = multer.diskStorage({
    destination: (req, files, callback) => {
        callback(null, 'docs');
    },
    filename: (req, files, callback) => {
        const name = files.originalname.split(' ').join('_');
        const extension = MIME_TYPES[files.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).any();
