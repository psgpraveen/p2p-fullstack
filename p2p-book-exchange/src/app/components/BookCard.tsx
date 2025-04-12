import { Book } from "@/app/types/Index";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const url = process.env.NEXT_PUBLIC_NEXT_URL;

  if (!url) {
    console.error("NEXT_PUBLIC_NEXT_URL is not defined.");
    return null;
  }

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
