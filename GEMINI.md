# Project Overview

This is a Next.js project bootstrapped with `create-next-app`. It is a full-stack application using:
- **Frontend:** Next.js (React) for server-side rendered and client-side interactive components.
- **Backend:** Next.js API Routes for handling API requests.
- **Database:** SQLite, managed with Prisma ORM.
- **Data Models:** The application includes `Book` and `Student` models, defined in `prisma/schema.prisma`.
- **Language:** TypeScript for type safety across the application.
- **Linting:** ESLint for code quality.

The project provides API endpoints for managing books and students, and a basic Next.js welcome page as the frontend entry point.

# Building and Running

## Development Server

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the files.

## Build

To build the application for production:

```bash
npm run build
```

## Start Production Server

To start the Next.js production server:

```bash
npm run start
```

## Linting

To run ESLint for code quality checks:

```bash
npm run lint
```

# Development Conventions

- **TypeScript:** The project is configured to use TypeScript for all source files, ensuring type safety.
- **ESLint:** ESLint is used to enforce code style and identify potential issues. The configuration is defined in `eslint.config.mjs`.
- **Prisma ORM:** Prisma is used for database interactions, providing a type-safe and efficient way to query and manipulate data. The schema is defined in `prisma/schema.prisma`.
- **Next.js App Router:** The project utilizes the Next.js App Router for routing and API routes.
