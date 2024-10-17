const { Comic } = require('/models/ComicBook');
const { comicBookSchema } = require('./schemas/comicBookSchema');

const handleError = (error, res) => {
    if(error.name == 'ZodError'){
        const errors = error.errors.map(err => `${err.path.join('.')} : ${err.message}`);
        return res.status(400).json({
            message: 'Validation Error',
            errors: errors
        });
    }

    if(error.name == 'CastError'){
        return res.status(400).json({
            message: 'Invalid ID Error',
        });
    }

    console.log(error);

    return res.status(500).json({
        message: 'An Unexpected Error Occured',
    });
}

// creates a comic in the db with provided information
exports.createComicBook =  async (req, res) => {
    try{
        const {success} = comicBookSchema.safeParse(req.body);
        if(!success) {
            return res.status(400).json({message: 'Incorrect Inputs Provided'});
        }
        
        const existingBook = Comic.findOne({bookName: req.body.bookName})
        
        if(existingBook){
            return res.status(400).json({message: 'Book with this name already exists'});
        }
        
        await Comic.create(req.body);
        
        res.status(201).json({message: 'Comic Created'});
    }
    catch(error){
        handleError(error, res);
    }
};

// updates the comic data whatever data is provided in the req body
exports.updateComicBook = async (req, res) => {
    try{
        
        const validData = comicBookSchema.partial().parse(req.body);
        
        if(!success){
            return res.status(400).json({message: 'Incorrect Inputs Provided'});
        }
        
        const comic = await Comic.findByIdAndUpdate({_id: req.params.id}, validData, {
            new: true,
            runValidators: true,
        });
        if(!comic){
            return res.status(404).json({message: 'Comic Not in Database'});
        }
        
        return res.status(201).json({
            message: 'Comic Updated',
            updatedComic: Comic.findOne({_id: req.params.id}),
        })
    }
    catch(error){
        handleError(error, res);
    }
}


//deletes a comic from the database based on its id
exports.deleteComicBook = async (req, res) => {
    try{
        const comicBook = await Comic.findByIdAndDelete(req.params.id);    
        if(!comicBook){
            return res.status(404).json({message: 'Comic Not in Database'});
        }
        
        return res.status(200).json({message: 'Comic Deleted'});
    }
    catch(error) {
        handleError(error, res);
    }
}

// fetch inventory list and provide pagination and sorting options 
exports.getAllComicBooks = async (req, res) => {
    try{
        const queryObj = { ...req.query};
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        let query = Comic.find(JSON.parse(queryStr));

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
          } else {
            query = query.sort('-createdAt');
          }
      
          if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
          } else {
            query = query.select('-__v');
          }
      
          const page = parseInt(req.query.page, 10) || 1;
          const limit = parseInt(req.query.limit, 10) || 10;
          const skip = (page - 1) * limit;
      
          query = query.skip(skip).limit(limit);
      
          const comicBooks = await query;
      
          const total = await ComicBook.countDocuments(JSON.parse(queryStr));
      
          res.status(200).json({
            status: 'success',
            results: comicBooks.length,
            total,
            page,
            limit,
            data: {
              comicBooks,
            },
          });
        } 
    catch (error) {
        handleError(error, res);
    }
    
}

//returns individual comic details based on it's id
exports.getComicBook = async (req, res) => {
    try{
        const comic = await Comic.findById({_id: req.params.id});
        
        if(!comic){
            return res.status(404).json({message: 'Comic Not Found'});
        }
        
        return res.status(200).json(comic);
    }
    catch(error){
        handleError(error, res);
    }
}