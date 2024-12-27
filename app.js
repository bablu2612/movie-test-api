
const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');

const path = require('path');
const isAuthenticated = require('./middlewares/authMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', userRoutes);

// Routes
app.use('/api/movies', isAuthenticated,movieRoutes);

// Database connection
mongoose.connect('mongodb+srv://bk147411:ZJ8CZaPA9vdy3v4G@movies-demo.ken32.mongodb.net/?retryWrites=true&w=majority&appName=movies-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Database connection error:', err));

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        