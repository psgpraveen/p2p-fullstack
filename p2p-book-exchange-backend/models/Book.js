const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  location: { type: String, required: true },
  contact: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['available', 'rented'], default: 'available' },
  imageBase64: { type: String }, 
});

module.exports = mongoose.model('Book', bookSchema);
