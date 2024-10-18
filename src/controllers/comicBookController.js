const Comic = require('../models/ComicBook');
const { comicBookSchema } = require('../schemas/comicBookSchema');

// Construct a function to handle errors and return appropriate responses
const handleError = (error, res) => {
    if(error.name === 'ZodError'){ // ZodError
        const errors = error.errors.map(err => `${err.path.join('.')} : ${err.message}`);
        return res.status(400).json({
            message: 'Validation Error',
            errors: errors
        });
    }

    if(error.name === 'CastError'){ // CastError
        return res.status(400).json({
            message: 'Invalid ID Error',
        });
    }

    console.error(error); // Error

    return res.status(500).json({ // return a generic error message
        message: 'An Unexpected Error Occurred',
    });
}

// to create a new comic book in the database
exports.createComicBook = async (req, res) => {
    try{
        console.log('Received request body:', req.body);
        const validatedData = comicBookSchema.parse(req.body); // validate the data
        const newComicBook = await Comic.create(validatedData); // create a new comic book in the database
        console.log('Created new comic book:', newComicBook);
        return res.status(201).json({  // return a success response
          status: 'success',
          data: {
            comicBook: newComicBook
          }
        });
    }
    catch(error){
        handleError(error, res); // handle any errors that occur during the process
    }
};

// updates the comic data whatever data is provided in the req body
exports.updateComicBook = async (req, res) => {
    try{
        const validData = comicBookSchema.partial().parse(req.body); // validate the data
        
        const comic = await Comic.findByIdAndUpdate({_id: req.params.id}, validData); // find and update the comic book
        if(!comic){
            return res.status(404).json({message: 'Comic Not in Database'}); // return if comic not in db
        }
        
        return res.status(201).json({ // return success response
            status: 'success',
            message: 'Comic Updated'
        })
    }
    catch(error){
        handleError(error, res);  // handle error that occurrs during update
    }
}


//deletes a comic from the database based on its id
exports.deleteComicBook = async (req, res) => {
    try{
        const comicBook = await Comic.findByIdAndDelete(req.params.id);    // find and delete comic book 
        if(!comicBook){
            return res.status(404).json({message: 'Comic Not in Database'});  // return if comic not in db
        }
        
        return res.status(200).json({message: 'Comic Deleted'}); // return if comic deleted successfully
    }
    catch(error) { 
        handleError(error, res); // handle error that occurrs during deletion
    }
}

// fetch inventory list and provide pagination and sorting options 
exports.getAllComicBooks = async (req, res) => {
    try{
        // get query obj
        const queryObj = { ...req.query}; 
        // exclude fields from query obj  (not allowed fields for pagination and sorting) ex. page,sort,limit,fields
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);

        // stringify query and convert to equivalent mongo operation
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        //  query db based on queryStr
        let query = Comic.find(JSON.parse(queryStr));

        // sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
          } else {
            query = query.sort('-createdAt');
          }
      
          // fields selection
          if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
          } else {
            query = query.select('-__v');
          }
      
          // pagination
          const page = parseInt(req.query.page, 10) || 1;
          const limit = parseInt(req.query.limit, 10) || 10;
          const skip = (page - 1) * limit;
      
          // skip and limit
          query = query.skip(skip).limit(limit);
       
          const comicBooks = await query;
      
          // count total documents that match the queryStr
          const total = await Comic.countDocuments(JSON.parse(queryStr));
      
          // return success response with pagination and sorting options
          return res.status(200).json({
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
        handleError(error, res); // handle error that occurrs during fetching
    }
    
}

//returns individual comic details based on it's id
exports.getComicBook = async (req, res) => {
    try{
        const comic = await Comic.findById({_id: req.params.id}); // find specific comic book based on id
        
        if(!comic){  // if not found return 404 response
            return res.status(404).json({message: 'Comic Not Found'});
        }
        
        return res.status(200).json(comic); // if found return comic book details
    }
    catch(error){
        handleError(error, res); // handle error that occurrs during fetching
    }
}