const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      location,
      contact,
      ownerId,
      image, // base64 string from client
    } = req.body;

    const base64Data = image?.includes(',') ? image.split(',')[1] : image;

    const newBook = await Book.create({
      title,
      author,
      genre,
      location,
      contact,
      ownerId,
      imageBase64: base64Data,
    });

    res.status(201).json({ message: 'Book added successfully!', book: newBook });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('ownerId', 'name email');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Book updated successfully!', book: updatedBook });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
