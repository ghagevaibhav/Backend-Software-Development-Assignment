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
    description: zod.string().isOptional(true),
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

const comicUpdateBody = zod.object({
    bookName: zod.string().optional(),
    authorName: zod.string().optional(),
    yearOfPublication: zod.number().optional(),
    price: zod.number().optional(),
    discount: zod.number().min(0).max(100).optional(),
    numberOfPages: zod.number().optional(),
    condition: zod.string().optional(),
    description: zod.string().optional(),
})


router.put('/updateComic/:id', async (req, res) => {
        const { success } = comicUpdateBody.safeParse(req.body);

        if(!success){
            return res.status(400).json({message: 'Incorrect Inputs Provided'});
        }

        const comic = await Comic.findOne({_id: req.params.id});

        if(!comic){
            return res.status(404).json({message: 'Comic Not in Database'});
        }

        await comic.updateOne({
            $set: {
                bookName: req.body.bookName || comic.bookName,
                authorName: req.body.authorName || comic.authorName,
                yearOfPublication: req.body.yearOfPublication || comic.yearOfPublication,
                price: req.body.price || comic.price,
                discount: req.body.discount || comic.discount,
                numberOfPages: req.body.numberOfPages || comic.numberOfPages,
                condition: req.body.condition || comic.condition,
                description: req.body.description || comic.description,
            }
        })

        return res.status(201).json({
            message: 'Comic Updated',
            updatedComic: Comic.findOne({_id: req.params.id}),
        })
})