const express = require('express');
const router = express.Router();
const { Comic } = require('/db/db.js');
const zod = require('zod');

const comicBody = zod.object({
    bookName: zod.string(),
    authorName: zod.string(),
    yearOfPublication: zod.number(),
    price: zod.number(),
    discount: zod.number().min(0).max(100),
    numberOfPages: zod.number(),
    condition: zod.string(),
    description: zod.string().isOptional(),
})

router.post('/createComic', async (req, res) => {
    const {success} = comicBody.safeParse(req.body);
    if(!success) {
        return res.status(400).json({message: 'Incorrect Inputs Provided'});
    }

    const existingBook = Comic.findOne({bookName: req.body.bookName})

    if(existingBook){
        return res.status(400).json({message: 'Book with this name already exists'});
    }

    await Comic.create({
        bookName: req.body.bookName,
        authorName: req.body.authorName,
        yearOfPublication: req.body.yearOfPublication,
        price: req.body.price,
        discount: req.body.discount,
        numberOfPages: req.body.numberOfPages,
        condition: req.body.condition,
        description: req.body.description,
    });

    res.status(201).json({message: 'Comic Created'});
})

router.put('/updateComic', (req, res) => {
    
})

