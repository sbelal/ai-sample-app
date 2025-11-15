import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // Await the promise
    const book = await prisma.book.findUnique({
      where: { id },
    });
    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json({ message: 'Failed to fetch book' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // Await the promise
    const { title, author, genre, isbn, published } = await request.json();
    const updatedBook = await prisma.book.update({
      where: { id },
      data: { title, author, genre, isbn, published },
    });
    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json({ message: 'Failed to update book' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // Await the promise
    await prisma.book.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Book deleted successfully' }, { status: 204 });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json({ message: 'Failed to delete book' }, { status: 500 });
  }
}
