interface BookCardProps {
  book: any;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {

  const imageSource = book.imageBase64
  ? `data:image/jpeg;base64,${book.imageBase64}`
  : "/path/to/default-image.jpg";  

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        src={imageSource}
        alt={book.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold">{book.title}</h3>
      <p className="text-gray-600">{book.author}</p>
    </div>
  );
};

export default BookCard;
