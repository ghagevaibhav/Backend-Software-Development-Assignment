const cors = require('cors');
const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const comicBookRoutes = require('./routes/comicBookRoute');

dotenv.config();
const app = express();

function connectWithRetry(){
    connectDB()
    .then(() => {
        console.log('Database Connected Successfully')
        startServer();
    })
    .catch((err) => {
        console.error('Database connection error:', err);
        console.log('Retrying in 5 seconds...');
        setTimeout(connectWithRetry, 5000);
    });
}

function startServer() {
    app.use(express.json());
    app.use(cors());

    app.use('/api/v1', comicBookRoutes);

    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({
            message: 'An unexpected error occurred'
        });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

connectWithRetry();