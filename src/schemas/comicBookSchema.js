
const zod = require('zod')

const currentYear = new Date().getFullYear();

const comicBookSchema = zod.object({
    bookName: zod.string().min(1, 'Book name required').max(100, 'Book name cannot be more than 100 characters'),
    authorName: zod.string().min(1, 'Author name required').max(100, 'Author name cannot be more than 100 characters'),
    yearOfPublication: zod.number().int().min(1800, 'Year must be 1800 or later').max(currentYear, 'Year cannot be in future'),
    price: zod.number().positive('price must be positive').multipleOf(0.01, 'price must have at least 2 decimal places'),
    discount: zod.number().min(0, 'Discount must be a positive number').max(100, 'Discount cannot be more than 100%').default(0),
    numberOfPages: zod.number().int().positive('Number of pages must be at least 1').max(10000, 'Number of pages must be less than 10000'),
    condition: zod.enum(['new', 'used'], 'Condition must be new or used').default('new'),
    description: zod.string().max(1000, 'Description must be less than 1000 characters').optional(true),
})

module.exports = comicBookSchema;