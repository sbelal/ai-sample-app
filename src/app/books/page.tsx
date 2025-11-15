import Link from "next/link";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  published: boolean;
}

async function getBooks(): Promise<Book[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }
  return res.json();
}

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Books</h1>
      <Link href="/books/create" className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors">
        Add New Book
      </Link>
      <Link href="/" className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-colors">
        Back to Home
      </Link>
      <div className="w-full max-w-4xl">
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Title</th><th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Author</th><th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Genre</th><th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200 font-semibold">ISBN</th><th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Published</th><th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-300">{book.title}</td><td className="py-3 px-4 text-gray-800 dark:text-gray-300">{book.author}</td><td className="py-3 px-4 text-gray-800 dark:text-gray-300">{book.genre}</td><td className="py-3 px-4 text-gray-800 dark:text-gray-300">{book.isbn}</td><td className="py-3 px-4 text-gray-800 dark:text-gray-300">{book.published ? "Yes" : "No"}</td><td className="py-3 px-4">
                    <Link href={`/books/${book.id}`} className="text-blue-500 hover:underline mr-2">
                      View/Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}