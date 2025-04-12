import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        {/* Hero Section */}
        <section className="text-center py-16 bg-gray-100 rounded-lg shadow-md">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
            Welcome to P2P Book Exchange!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover, exchange, and share your favorite books with fellow book lovers.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/auth/login"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Login
            </a>
            <a
              href="/auth/signup"
              className="bg-green-600 text-white font-semibold px-6 py-3 rounded hover:bg-green-700 transition"
            >
              Sign Up
            </a>
          </div>
        </section>

        {/* Feature Section */}
        <section className="mt-12 grid gap-8 md:grid-cols-2 items-center">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-3">Why Choose Us?</h2>
            <p className="text-gray-700">
              Our platform connects you with a vibrant community of book enthusiasts. Exchange books, discover new stories, and join local events—all in one place. We provide a user-friendly experience with secure transactions and plenty of recommendations.
            </p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>✅ Wide selection of books</li>
              <li>✅ Easy and secure transactions</li>
              <li>✅ Community-driven reviews</li>
              <li>✅ Responsive support team</li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/image.png"
              alt="Bookshelf Illustration"
              className="w-full max-w-md rounded shadow-md"
            />
          </div>
        </section>

        <section className="mt-12 bg-blue-50 p-8 rounded-lg text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Get Started Today!</h2>
          <p className="text-gray-700 mb-6">
            Join our community and find your next great read. It's easy, fast, and fun!
          </p>
          <a
            href="/explore"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Explore Books
          </a>
        </section>
      </main>
      <Footer/>
    </>
  );
}
