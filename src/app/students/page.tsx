import Link from "next/link";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string; // Added email
  age: number;
  grade: string;
}

async function getStudents(): Promise<Student[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/students`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch students");
  }
  return res.json();
}

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Students</h1>
      <Link href="/students/create" className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors">
        Add New Student
      </Link>
      <div className="w-full max-w-4xl">
        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200 font-semibold">First Name</th><th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Last Name</th><th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Email</th><th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Age</th><th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Grade</th><th className="py-3 px-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-300">{student.firstName}</td><td className="py-3 px-4 text-gray-800 dark:text-gray-300">{student.lastName}</td><td className="py-3 px-4 text-gray-800 dark:text-gray-300">{student.email}</td><td className="py-3 px-4 text-gray-800 dark:text-gray-300">{student.age}</td><td className="py-3 px-4 text-gray-800 dark:text-gray-300">{student.grade}</td><td className="py-3 px-4">
                    <Link href={`/students/${student.id}`} className="text-blue-500 hover:underline mr-2">
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