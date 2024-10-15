require('dotenv').config();

import {rootRouter} from './routes/main.js'
const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors)

app.use('/api/v1' ,rootRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${port}`);
})