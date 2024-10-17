const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const comicSchema = new Schema({
    bookName: {type: String, trim: true, unique: true, required: true, maxlength: 100},
    authorName: {type: String, trim: true, required: true, maxlength: 100},
    yearOfPublication: {type: Number, required: true},
    price: {type: Number, required: true},
    discount: {type: Number, default: 0, max: 100, min: 0},
    numberOfPages: {type: Number, required: true},
    condition: {type: String, enum: ['new', 'used'], required: true},
    description: {type: String, trim: true, maxlength: 1000},
})

const Comic = model('ComicBook', comicSchema);

module.exports = Comic;