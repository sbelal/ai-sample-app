# ⚙️ Project Coding Conventions

This document outlines a set of coding conventions and best practices to be followed throughout this project. The goal is to ensure code quality, consistency, and maintainability, making the codebase easier to read, understand, and contribute to for all team members.

---

### Convention: Minimize Whitespace in Table Elements for Next.js Hydration
*   **Reason:** Next.js's hydration process is sensitive to whitespace text nodes, especially within `<tr>` elements. Extra whitespace between `<td>` or `<th>` tags can lead to hydration errors.
*   **Implications:**
    *   When rendering table structures (`<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`), ensure there are no extra newlines or spaces between opening and closing tags of `<th>` and `<td>` elements on the same line.
    *   Format JSX for table cells concisely to avoid introducing whitespace text nodes.
    *   Example:
        ```jsx
        // Good
        <tr><td>Cell 1</td><td>Cell 2</td></tr>

        // Bad (can cause hydration errors)
        <tr>
          <td>Cell 1</td>
          <td>Cell 2</td>
        </tr>
        ```

---

### Convention: Modularity and Decomposition

* Functions or methods should ideally be atomic. Break complex code into smaller parts.
* **Reason:** Smaller, atomic functions make your code significantly easier to read, test, and maintain.

---

### Convention: TypeScript Usage

* **Reason:** To leverage static typing for improved code quality, readability, and maintainability, especially in larger codebases.
* **Implications:**
    * All new code should be written in TypeScript (`.ts` or `.tsx` files).
    * Explicitly define types for function parameters, return values, and complex objects.
    * Avoid `any` type unless absolutely necessary and justified.

---

### Convention: Asynchronous Operations

* **Reason:** To handle I/O-bound operations (like database calls or network requests) efficiently without blocking the main thread.
* **Implications:**
    * Use `async/await` for all asynchronous operations.
    * Handle potential errors in asynchronous code using `try...catch` blocks.

---

### Convention: Next.js App Router Dynamic Route Parameter Typing

*   **Reason:** To ensure type compatibility with Next.js's internal type validators for dynamic API routes, which may expect route parameters (`params`) to be wrapped in a Promise.
*   **Implications:**
    *   For dynamic API routes (e.g., `src/app/api/resource/[id]/route.ts`), the `context` parameter in `GET`, `POST`, `PUT`, `DELETE` functions should explicitly type `params` as a Promise.
    *   Access the `id` (or other dynamic segments) by awaiting `context.params`.
    *   Example:
        ```typescript
        export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
          const { id } = await context.params;
          // ...
        }
        ```

---

### Convention: Automating Next.js Project Creation

*   **Reason:** To ensure unattended execution of `create-next-app` when initializing new Next.js projects, avoiding interactive prompts.
*   **Implications:**
    *   When using `npx create-next-app`, include `npx --yes` to auto-confirm `npx`'s package installation prompt.
    *   Also include `create-next-app --yes` to auto-confirm project creation prompts.
    *   Example: `npx --yes create-next-app@latest my-app --ts --eslint --app --src-dir --use-pnpm --yes`

---