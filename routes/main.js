
const express = require('express');
const router = express.Router();

router.use('/comic', comicRouter);

module.exports = router;

