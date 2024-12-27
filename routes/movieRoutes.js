
const express = require('express');
const multer = require('multer');
const { getMovies, addMovie, editMovie } = require('../controllers/movieController');

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });
router.get('/',getMovies);
router.post('/', upload.single('poster'), addMovie);
router.put('/:id', upload.single('poster'), editMovie);

module.exports = router;
            