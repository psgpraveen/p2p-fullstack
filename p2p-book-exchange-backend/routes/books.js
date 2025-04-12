const express = require('express');
const router = express.Router();

const {
  addBook,
  getBooks,
  editBook,
  deleteBook,
} = require('../controllers/bookController');

// Routes
router.post('/add', addBook); // No multer middleware
router.get('/', getBooks);
router.put('/:id', editBook);
router.delete('/:id', deleteBook);

module.exports = router;
