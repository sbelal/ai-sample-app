import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // Await the promise
    const student = await prisma.student.findUnique({
      where: { id },
    });
    if (!student) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }
    return NextResponse.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json({ message: 'Failed to fetch student' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // Await the promise
    const { firstName, lastName, email, age } = await request.json();
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: { firstName, lastName, email, age },
    });
    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ message: 'Failed to update student' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // Await the promise
    await prisma.student.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Student deleted successfully' }, { status: 204 });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json({ message: 'Failed to delete student' }, { status: 500 });
  }
}
