import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ message: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, author, genre, isbn, published } = await request.json();
    const newBook = await prisma.book.create({
      data: { title, author, genre, isbn, published },
    });
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json({ message: 'Failed to create book' }, { status: 500 });
  }
}
