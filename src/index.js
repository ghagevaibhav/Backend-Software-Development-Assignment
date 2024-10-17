
const cors = require('cors');
const dotenv = require('dotenv')
const express = require('express');
const {connectDB} = require('./config/db');
const comicBookRoutes = require('./routes/comicBookRoute');

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use(cors)


app.use('/api/v1' , comicBookRoutes);
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: 'An unexpected error occured'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${port}`);
})