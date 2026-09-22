import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

function run(command) {
  execSync(command, { stdio: "inherit" });
}

const root = process.cwd();
const sqliteSchemaPath = path.join(root, "prisma", "schema.prisma");
const postgresSchemaPath = path.join(root, "prisma", "schema.postgresql.prisma");

const databaseUrl = process.env.DATABASE_URL ?? "";
if (
  !databaseUrl.startsWith("postgresql://") &&
  !databaseUrl.startsWith("postgres://")
) {
  console.error(
    "\n[Vercel] Set DATABASE_URL to a PostgreSQL URL (Neon free tier works).\n" +
      "SQLite does not persist on Vercel; local dev still uses SQLite.\n",
  );
  process.exit(1);
}

if (!existsSync(sqliteSchemaPath)) {
  console.error("\n[Vercel] Missing prisma/schema.prisma\n");
  process.exit(1);
}

if (!existsSync(postgresSchemaPath)) {
  console.error("\n[Vercel] Missing prisma/schema.postgresql.prisma\n");
  process.exit(1);
}

const sqliteSchemaBackup = readFileSync(sqliteSchemaPath, "utf8");
const postgresSchema = readFileSync(postgresSchemaPath, "utf8");

writeFileSync(sqliteSchemaPath, postgresSchema, "utf8");

try {
  run("prisma generate");
  run("prisma db push --skip-generate");
  run("tsx prisma/seed.ts");
  run("next build");
} finally {
  writeFileSync(sqliteSchemaPath, sqliteSchemaBackup, "utf8");
}
