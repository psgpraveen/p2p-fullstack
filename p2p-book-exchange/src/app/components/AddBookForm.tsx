import { useState } from "react";
import axios from "axios";

export default function AddBookForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    location: "",
    contact: "",
    image: null,
  });
const url = process.env.NEXT_PUBLIC_NEXT_URL;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image" && formData.image) {
          formDataWithImage.append(key, formData.image);
        } else {
          formDataWithImage.append(key, formData[key]);
        }
      });

      const response = await axios.post(`${url}/api/books/add`, formDataWithImage, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Book added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to add book.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Add a New Book</h2>
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
      <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Book
      </button>
    </form>
  );
}
