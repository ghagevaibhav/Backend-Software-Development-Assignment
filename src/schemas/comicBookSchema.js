const { z } = require('zod');

const currentYear = new Date().getFullYear();

const comicBookSchema = z.object({
bookName: z.string().min(1, 'Book name is required').max(100, 'Book name cannot be more than 100 characters'),
authorName: z.string().min(1, 'Author name is required').max(100, 'Author name cannot be more than 100 characters'),
yearOfPublication: z.number().int().min(1800, 'Year must be 1800 or later').max(currentYear, 'Year cannot be in the future'),
price: z.number().positive('Price must be a positive number').max(10000, 'Price cannot exceed 10000'),
discount: z.number().int().min(0, 'Discount must be a positive number').max(100, 'Discount cannot exceed 100%').default(0),
numberOfPages: z.number().int().positive('Number of pages must be at least 1').max(10000, 'Number of pages cannot exceed 10000'),
condition: z.enum(['new', 'used'], 'Condition must be either "new" or "used"'),
description: z.string().max(1000, 'Description cannot be more than 1000 characters').optional(),
});

module.exports = { comicBookSchema };