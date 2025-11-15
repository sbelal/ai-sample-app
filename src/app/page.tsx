import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to the CRUD App</h1>
      <div className="flex space-x-4">
        <Link href="/books" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors">
          Manage Books
        </Link>
        <Link href="/students" className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors">
          Manage Students
        </Link>
      </div>
    </main>
  );
}
