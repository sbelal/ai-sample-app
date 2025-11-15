"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string; // Added email
  age: number;
  grade: string;
}

export default function StudentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "", // Added email
    age: "",
    grade: "",
  });

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/students/${id}`);
        if (res.ok) {
          const data = await res.json();
          setStudent(data);
          setFormData({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email, // Added email
            age: data.age?.toString() || "",
            grade: data.grade,
          });
        } else {
          alert("Failed to fetch student");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
        alert("Error fetching student");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, age: parseInt(formData.age) }),
      });

      if (res.ok) {
        const updatedStudent = await res.json();
        setStudent(updatedStudent);
        setIsEditing(false);
        alert("Student updated successfully!");
      } else {
        alert("Failed to update student");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Error updating student");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/students/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Student deleted successfully!");
          router.push("/students");
        } else {
          alert("Failed to delete student");
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Error deleting student");
      }
    }
  };

  if (loading) {
    return <main className="flex min-h-screen flex-col items-center p-24">Loading...</main>;
  }

  if (!student) {
    return <main className="flex min-h-screen flex-col items-center p-24">Student not found.</main>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">{isEditing ? "Edit Student" : "Student Details"}</h1>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="age">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="grade">
                Grade
              </label>
              <input
                type="text"
                id="grade"
                name="grade"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                value={formData.grade}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update Student
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
              <span className="font-bold">First Name:</span> {student.firstName}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-bold">Last Name:</span> {student.lastName}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-bold">Email:</span> {student.email}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-bold">Age:</span> {student.age}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <span className="font-bold">Grade:</span> {student.grade}
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
              <Link href="/students" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Back to Students
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}