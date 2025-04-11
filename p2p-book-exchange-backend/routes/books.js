const express = require('express');
const router = express.Router();
const {
  addBook,
  getBooks,
  editBook,
  deleteBook,
  markBookAsRented,
} = require('../controllers/bookController');

router.post('/add', addBook);
router.get('/', getBooks);
router.put('/:id', editBook);
router.delete('/:id', deleteBook);
router.patch('/:id/rented', markBookAsRented);

module.exports = router;
