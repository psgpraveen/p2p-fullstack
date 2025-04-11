const fs = require('fs');
const path = require('path');
const multer = require('multer');

const booksFilePath = path.join(__dirname, '../data/books.json');
let books = JSON.parse(fs.readFileSync(booksFilePath, 'utf-8'));

const uploadFolder = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });


exports.addBook = [
  upload.single('image'),
  (req, res) => {
    const { title, author, genre, location, contact } = req.body;
    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      genre,
      location,
      contact,
      imagePath: req.file ? `/uploads/${req.file.filename}` : null, 
    };
    books.push(newBook);
    fs.writeFileSync(booksFilePath, JSON.stringify(books));
    res.status(201).json({ message: 'Book added successfully!', book: newBook });
  },
];


exports.getBooks = (req, res) => {
  const { genre, location } = req.query;
  let filteredBooks = books;

  if (genre) {
    filteredBooks = filteredBooks.filter((book) =>
      book.genre?.toLowerCase().includes(genre.toLowerCase())
    );
  }

  if (location) {
    filteredBooks = filteredBooks.filter((book) =>
      book.location?.toLowerCase().includes(location.toLowerCase())
    );
  }

  res.status(200).json(filteredBooks);
};

exports.editBook = (req, res) => {
  const { id } = req.params;
  const { title, author, genre, location, contact } = req.body;
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], title, author, genre, location, contact };
    fs.writeFileSync(booksFilePath, JSON.stringify(books));
    res.status(200).json({ message: 'Book updated successfully!', book: books[bookIndex] });
  } else {
    res.status(404).json({ message: 'Book not found!' });
  }
};

exports.deleteBook = (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    fs.writeFileSync(booksFilePath, JSON.stringify(books));
    res.status(200).json({ message: 'Book deleted successfully!' });
  } else {
    res.status(404).json({ message: 'Book not found!' });
  }
};

exports.markBookAsRented = (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    books[bookIndex].status = 'rented';
    fs.writeFileSync(booksFilePath, JSON.stringify(books));
    res.status(200).json({ message: 'Book marked as rented!', book: books[bookIndex] });
  } else {
    res.status(404).json({ message: 'Book not found!' });
  }
};
