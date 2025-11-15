# ⚙️ Project-Specific Decisions

This document lists the concrete, actionable rules and conventions for this project. The goal is to provide a single source of truth for implementation details, ensuring consistency across the codebase.

---

### Decision: Robust API Interaction with Data Model Alignment
*   **Reason:** To prevent runtime errors and ensure data integrity when interacting with API endpoints, especially when the frontend data model might not perfectly align with the backend schema (e.g., missing required fields).
*   **Implications:**
    *   Always verify the backend data model (e.g., `prisma/schema.prisma`) for required fields before implementing frontend forms or data submission logic.
    *   Ensure all required fields are included in frontend forms and the JSON payload sent to API endpoints.
    *   Implement client-side validation to catch missing required fields before API calls.

---

### Decision: API URL Structure

*   **Reason:** To maintain a consistent, predictable, and versioned API endpoint structure across the project.
*   **Example:** All API URLs must be prefixed with `/api/v1/`. The URL should use plural nouns for resource names.
    ```typescript
    // Example: src/app/api/v1/products/route.ts
    // Handles /api/v1/products
    ```

---

### Decision: ORM Choice - Prisma

*   **Reason:** Prisma provides a type-safe, modern ORM for Node.js and TypeScript, offering excellent developer experience with its schema definition, migrations, and client generation. It aligns well with the Next.js ecosystem.
*   **Implications:**
    *   All database interactions will be performed using the Prisma Client.
    *   Database schema changes will be managed via Prisma Migrate.
    *   The `prisma/schema.prisma` file will be the single source of truth for the database schema.

---

### Decision: Error Handling in API Routes

*   **Reason:** To provide consistent and informative error responses from API endpoints.
*   **Implications:**
    *   API routes should catch errors and return appropriate HTTP status codes and a JSON error object.
    *   Custom error classes can be defined for specific application errors.
    *   Example:
        ```typescript
        // src/app/api/v1/some-resource/route.ts
        import { NextResponse } from 'next/server';

        export async function GET() {
          try {
            // ... logic
            return NextResponse.json({ data: '...' });
          } catch (error) {
            console.error(error);
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
          }
        }
        ```

---

### Decision: Prisma Environment Variable Loading

*   **Reason:** Prisma CLI commands (e.g., `prisma migrate dev`) do not automatically load environment variables from `.env` files. Explicit handling is required to ensure database connection strings are available.
*   **Implications:**
    *   Ensure `dotenv` is installed (`pnpm add dotenv`).
    *   If `prisma.config.ts` is generated, add `import "dotenv/config";` to it.
    *   Alternatively, ensure the `.env` file is loaded by the application's entry point if `prisma.config.ts` is not used or removed.
    *   The `DATABASE_URL` must be correctly set in the `.env` file.

---

### Decision: Tailwind CSS Inclusion in Next.js Projects

*   **Reason:** To clarify the behavior of `create-next-app` regarding Tailwind CSS installation, as it may include Tailwind-related packages even when the `--tailwind` flag is omitted.
*   **Implications:**
    *   Be aware that `create-next-app` might install `@tailwindcss/postcss` and `tailwindcss` by default or as part of a template, even without explicitly requesting it.
    *   If Tailwind CSS is not desired, these packages may need to be manually uninstalled after project creation.

---

### Decision: Prisma Client Generation

*   **Reason:** To ensure the Prisma client is always up-to-date with the `schema.prisma` file, providing type-safe database access and preventing runtime errors. This is crucial after dependency installation or schema changes.
*   **Implications:**
    *   Always run `npx prisma generate` after `npm install` (or equivalent package manager install command) and after any modifications to `prisma/schema.prisma`.
    *   Integrate `prisma generate` into the build process or pre-build scripts to automate this step.
