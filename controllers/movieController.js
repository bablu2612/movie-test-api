
const Movie = require('../models/movieModel');
const fs = require('fs');
const PAGE_SIZE = 10; 
// Get all movies
exports.getMovies = async (req, res) => {
    try {
        const { page = 1, limit = PAGE_SIZE } = req.query;
    
    const skip = (page - 1) * limit; 

    
        const totalMovies = await Movie.countDocuments();

        const movies = await Movie.find()
            .skip(skip) 
            .limit(parseInt(limit)) 

        return res.status(200).json({
            movies,
            totalMovies,
            page: parseInt(page),
            totalPages: Math.ceil(totalMovies / limit),
        });
    
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching movies' });
    }
};

// Add a movie
exports.addMovie = async (req, res) => {
    const { title, year } = req.body;
    const file = req.file;

    if (!title || !year || !file) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const movie = new Movie({
            title,
            year,
            poster: file.path,
        });
        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json({ message: 'Error saving movie' });
    }
};

// Edit a movie
exports.editMovie = async (req, res) => {
    const { id } = req.params;
    const { title, year } = req.body;
    const file = req.file;

    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        if (title) movie.title = title;
        if (year) movie.year = year;
        if (file) {
            fs.unlinkSync(movie.poster); // Delete old poster
            movie.poster = file.path;
        }

        await movie.save();
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ message: 'Error editing movie' });
    }
};
            