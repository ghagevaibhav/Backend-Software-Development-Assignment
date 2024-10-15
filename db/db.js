require('dotenv').config();

const mongoose = require('mongoose');
const {Schema, model} = mongoose;

try{
    mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
}
catch(e){
    console.error('Error connecting to MongoDB:', e);
}

const comicSchema = new Schema({
    bookName: {type: String, trim: true, unique: true},
    authorName: {type: String, trim: true},
    yearOfPublication: {type: Number},
    price: {type: Number},
    discount: {type: Number, default: 0, max: 100, min: 0},
    numberOfPages: {type: Number},
    condition: {type: String, enum: ['new', 'used'], default: 'new'},
    description: {type: String},
})

const Comic = model('comics', comicSchema);

module.exports = Comic;