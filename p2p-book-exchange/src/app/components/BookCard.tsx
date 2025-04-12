interface Book {
  title: string;
  author: string;
  genre?: string;
  location?: string;
  contact?: string;
  imageBase64: string | null | undefined;
}

interface BookCardProps {
  book: Book;
  onContactClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onContactClick, onEditClick, onDeleteClick }) => {
  const imageSource = book.imageBase64
    ? `data:image/jpeg;base64,${book.imageBase64}`
    : "/default-book.jpg";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <img
        src={imageSource}
        alt={book.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="text-xl font-bold text-gray-800">{book.title}</h3>
        <p className="text-sm text-gray-600">By {book.author}</p>

        {book.genre && (
          <p className="text-sm text-blue-500 font-medium">Genre: {book.genre}</p>
        )}

        {book.location && (
          <p className="text-sm text-gray-500">📍 Location: {book.location}</p>
        )}

        {book.contact && (
          <p className="text-sm text-gray-500">📞 Contact: {book.contact}</p>
        )}

        <div className="pt-3 flex justify-between items-center">
          {onContactClick && (
            <button
              onClick={onContactClick}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-full"
            >
              Contact Owner
            </button>
          )}

          <div className="flex gap-2">
            {onEditClick && (
              <button
                onClick={onEditClick}
                className="text-yellow-600 hover:text-yellow-800 text-sm"
              >
                ✏️ Edit
              </button>
            )}

            {onDeleteClick && (
              <button
                onClick={onDeleteClick}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                🗑️ Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
