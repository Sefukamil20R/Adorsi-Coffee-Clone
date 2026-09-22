import path from "node:path";

/**
 * Prisma CLI resolves `file:./dev.db` relative to `prisma/schema.prisma`
 * (→ `prisma/dev.db`). Next.js runs with cwd at the repo root, so the same
 * env value would target `./dev.db` at the root unless we normalize it.
 */
export function resolveDatabaseUrl(): string {
  const configured = process.env.DATABASE_URL;
  if (!configured?.startsWith("file:")) {
    return configured ?? "file:./dev.db";
  }

  const filePart = configured.slice("file:".length);
  if (path.isAbsolute(filePart)) {
    return configured;
  }

  const fileName = path.basename(filePart);
  const absolute = path.join(process.cwd(), "prisma", fileName);
  return `file:${absolute}`;
}
