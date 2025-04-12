// components/AddBookForm.tsx

"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface FormDataType {
  title: string;
  author: string;
  genre: string;
  location: string;
  contact: string;
  image: File | null;
}

export default function AddBookForm() {
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    author: "",
    genre: "",
    location: "",
    contact: "",
    image: null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const url = process.env.NEXT_PUBLIC_NEXT_URL;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let base64Image = "";

      if (formData.image) {
        const reader = new FileReader();
        const imageToBase64 = () =>
          new Promise<string>((resolve, reject) => {
            reader.onloadend = () => {
              if (typeof reader.result === "string") {
                resolve(reader.result);
              } else {
                reject("Image conversion failed");
              }
            };
            reader.readAsDataURL(formData.image as Blob);
          });

        base64Image = await imageToBase64();
      }

      const payload = {
        title: formData.title,
        author: formData.author,
        genre: formData.genre,
        location: formData.location,
        contact: formData.contact,
        ownerId: "60b8c8d8b5b2b5d9b9c9b9b9", // make dynamic if needed
        image: base64Image,
      };

      await axios.post(`${url}/api/books/add`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("📚 Book added successfully!");

      setFormData({
        title: "",
        author: "",
        genre: "",
        location: "",
        contact: "",
        image: null,
      });
      setPreview(null);
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-100 to-indigo-200 rounded-xl shadow-xl">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white rounded-xl p-8 shadow-lg"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 mb-6 border-b-2 pb-3">
          📖 Add a New Book
        </h2>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block font-semibold mb-2 text-sm sm:text-base">
              Title<span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-4 text-sm sm:text-base border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Book title"
            />
          </div>
          <div>
            <label htmlFor="author" className="block font-semibold mb-2 text-sm sm:text-base">
              Author<span className="text-red-500">*</span>
            </label>
            <input
              id="author"
              type="text"
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full p-4 text-sm sm:text-base border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Author name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="genre" className="block font-semibold mb-2 text-sm sm:text-base">
              Genre
            </label>
            <input
              id="genre"
              type="text"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="w-full p-4 text-sm sm:text-base border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Thriller, Romance"
            />
          </div>
          <div>
            <label htmlFor="location" className="block font-semibold mb-2 text-sm sm:text-base">
              Location<span className="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-4 text-sm sm:text-base border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your location"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact" className="block font-semibold mb-2 text-sm sm:text-base">
            Contact Email / Phone<span className="text-red-500">*</span>
          </label>
          <input
            id="contact"
            type="text"
            required
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="w-full p-4 text-sm sm:text-base border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="you@example.com or +123456789"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-sm sm:text-base">Upload Book Cover</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {preview && (
            <div className="mt-6 text-center">
              <p className="text-sm sm:text-base text-gray-500">Image Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="mt-4 rounded-lg shadow-md border max-h-72 mx-auto"
              />
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-sm sm:text-base bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition ease-in-out duration-300 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
}
