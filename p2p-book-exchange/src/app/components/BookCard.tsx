import { Book } from "../types/Index";
export default function BookCard({ book }: { book: Book }) {
  const url = process.env.NEXT_PUBLIC_NEXT_URL 
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      {book.imagePath && (
        <img
          src={`${url}/${book.imagePath}`} 
          alt={book.title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      )}
      <h2 className="text-xl font-semibold">{book.title}</h2>
      <p className="text-gray-600">By {book.author}</p>
      <p className="text-gray-600">Genre: {book.genre || "N/A"}</p>
      <p className="text-gray-600">Location: {book.location}</p>
      <p className="text-gray-600">Contact: {book.contact}</p>
    </div>
  );
}
