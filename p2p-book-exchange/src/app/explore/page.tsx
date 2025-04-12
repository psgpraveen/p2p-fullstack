"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import BookCard from "../components/BookCard";

export default function ExplorePage() {
  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [filters, setFilters] = useState({ genre: "", location: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const url = process.env.NEXT_PUBLIC_NEXT_URL;

  useEffect(() => {
    axios
      .get(`${url}/api/books`)
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books. Please try again later.");
        setLoading(false);
      });
  }, [url]);

  useEffect(() => {
    const newFilteredBooks = books.filter((book) => {
      const genreMatch =
        !filters.genre ||
        (book.genre &&
          book.genre.toLowerCase().includes(filters.genre.toLowerCase()));
      const locationMatch =
        !filters.location ||
        (book.location &&
          book.location.toLowerCase().includes(filters.location.toLowerCase()));
      return genreMatch && locationMatch;
    });
    setFilteredBooks(newFilteredBooks);
  }, [filters, books]);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-center mb-8">Explore Books</h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Filter by Genre"
            value={filters.genre}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, genre: e.target.value }))
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Filter by Location"
            value={filters.location}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, location: e.target.value }))
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Books Display Section */}
        {loading ? (
          <p className="text-center text-gray-500">Loading books...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredBooks.length === 0 ? (
          <p className="text-center text-gray-500">
            No books found matching your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
