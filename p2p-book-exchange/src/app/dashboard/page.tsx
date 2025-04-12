"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AddBookForm from "../components/AddBookForm";
import BookCard from "../components/BookCard";
import Header from "../components/Header";
import EditDeleteBookForm from "../components/EditDeleteBookForm";
import { toast } from "react-toastify"; // For error notifications

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Redirect if no userRole is found
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role) {
      router.push("/auth/login");
    } else {
      setUserRole(role);
    }
  }, [router]);
const url = process.env.NEXT_PUBLIC_NEXT_URL;
  // Fetch books from API
  useEffect(() => {
    
    axios
      .get(`${url}/api/books`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        toast.error("Failed to load books. Please try again later.");
      });
  }, []);

  const refreshBooks = () => {
    axios
      .get(`${url}/api/books`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        toast.error("Failed to load books. Please try again later.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold mb-10 text-gray-900">📚 Dashboard</h1>
        {userRole === "owner" ? (
          <OwnerDashboard
            books={books}
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            refreshBooks={refreshBooks}
          />
        ) : userRole === "seeker" ? (
          <SeekerDashboard books={books} />
        ) : (
          <div className="text-center text-gray-500 text-lg">Loading...</div>
        )}
      </div>
    </div>
  );
}

function OwnerDashboard({
  books,
  selectedBook,
  setSelectedBook,
  isModalOpen,
  setIsModalOpen,
  refreshBooks,
}: {
  books: any[];
  selectedBook: any;
  setSelectedBook: (book: any) => void;
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
  refreshBooks: () => void;
}) {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">➕ Add a New Book</h2>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <AddBookForm />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">📖 Your Listings</h2>
        {books.length === 0 ? (
          <p className="text-gray-500 text-lg">No books listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div key={book.id} className="relative group">
                <BookCard book={book} />
                <button
                  onClick={() => {
                    setSelectedBook(book);
                    setIsModalOpen(true);
                  }}
                  className="absolute top-3 right-3 bg-white border border-gray-300 text-sm px-3 py-1 rounded-md text-gray-700 shadow hover:bg-gray-100 transition"
                >
                  ✏️ Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <EditDeleteBookForm
              book={selectedBook}
              onUpdate={() => {
                setIsModalOpen(false);
                refreshBooks();
              }}
              onDelete={() => {
                setIsModalOpen(false);
                refreshBooks();
              }}
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SeekerDashboard({ books }: { books: any[] }) {
  const [filters, setFilters] = useState({ genre: "", location: "" });

  const filteredBooks = books.filter((book) => {
    return (
      (!filters.genre || book.genre?.toLowerCase().includes(filters.genre.toLowerCase())) &&
      (!filters.location || book.location?.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by Genre"
          value={filters.genre}
          onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Filter by Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {filteredBooks.length === 0 ? (
        <p className="text-gray-500 text-lg">No books match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
