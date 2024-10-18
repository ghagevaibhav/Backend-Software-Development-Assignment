// imports 
const cors = require('cors');
const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const comicBookRoutes = require('./routes/comicBookRoute');

dotenv.config();
const app = express();

// connection function to mongodb instance
function connectWithRetry(){
    connectDB()
    .then(() => {
        console.log('Database Connected Successfully')
        startServer(); // start server if connection is successful
    })
    .catch((err) => {
        console.error('Database connection error:', err);
        console.log('Retrying in 5 seconds...');
        setTimeout(connectWithRetry, 5000); // 5 seconds timeout before retry
    });
}

// start server function after database connection is established
function startServer() { 

    // middlewares
    app.use(express.json());
    app.use(cors());

    // route middlewares
    app.use('/api/v1', comicBookRoutes);

    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({
            message: 'An unexpected error occurred'
        });
    });

    // running the server on port 3000
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

connectWithRetry();