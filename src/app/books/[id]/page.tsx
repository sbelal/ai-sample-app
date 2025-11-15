"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string; // Added genre
  isbn: string;
  published: boolean; // Changed from publishedDate: string;
}

export default function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "", // Added genre
    isbn: "",
    published: false, // Changed from publishedDate: "",
  });

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBook(data);
          setFormData({
            title: data.title,
            author: data.author,
            genre: data.genre, // Added genre
            isbn: data.isbn,
            published: data.published, // Changed from publishedDate
          });
        } else {
          alert("Failed to fetch book");
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        alert("Error fetching book");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updatedBook = await res.json();
        setBook(updatedBook);
        setIsEditing(false);
        alert("Book updated successfully!");
      } else {
        alert("Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Error updating book");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this book?")) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Book deleted successfully!");
          router.push("/books");
        } else {
          alert("Failed to delete book");
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Error deleting book");
      }
    }
  };

  if (loading) {
    return <main className="flex min-h-screen flex-col items-center p-24">Loading...</main>;
  }

  if (!book) {
    return <main className="flex min-h-screen flex-col items-center p-24">Book not found.</main>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">{isEditing ? "Edit Book" : "Book Details"}</h1>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="author">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="genre">
                Genre
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                value={formData.genre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="isbn">
                ISBN
              </label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="published">
                Published
              </label>
              <input
                type="checkbox"
                id="published"
                name="published"
                className="shadow leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600"
                checked={formData.published}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Book
              </button>
              <button
                type="button"
                onClick={handleEditToggle}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-bold">Title:</span> {book.title}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-bold">Author:</span> {book.author}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-bold">Genre:</span> {book.genre}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-bold">ISBN:</span> {book.isbn}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <span className="font-bold">Published:</span> {book.published ? "Yes" : "No"}
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
              <Link href="/books" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Back to Books
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}