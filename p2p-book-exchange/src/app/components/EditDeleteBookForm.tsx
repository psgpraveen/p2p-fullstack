"use client";

import { useState } from "react";
import axios from "axios";

export default function EditDeleteBookForm({
  book,
  onUpdate,
  onDelete,
}: {
  book: any;
  onUpdate: () => void;
  onDelete: () => void;
}) {
  const [formData, setFormData] = useState({
    title: book.title || "",
    author: book.author || "",
    genre: book.genre || "",
    location: book.location || "",
    contact: book.contact || "",
  });

  const url = process.env.NEXT_PUBLIC_NEXT_URL;

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${url}/api/books/${book.id}`, formData);
      alert("Book updated successfully!");
      onUpdate(); 
    } catch (error) {
      console.error(error);
      alert("Failed to update book.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/api/books/${book.id}`);
      alert("Book deleted successfully!");
      onDelete(); 
    } catch (error) {
      console.error(error);
      alert("Failed to delete book.");
    }
  };

  return (
    <form onSubmit={handleEdit} className="space-y-4 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold">Edit Book</h2>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Author"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Genre (optional)"
        value={formData.genre}
        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Contact Email/Phone"
        value={formData.contact}
        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />
      <div className="flex space-x-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update Book
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Book
        </button>
      </div>
    </form>
  );
}
