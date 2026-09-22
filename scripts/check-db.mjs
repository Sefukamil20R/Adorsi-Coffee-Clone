import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { resolveDatabaseUrl } from "../app/data/menu/resolve-database-url.ts";

const url = process.env.DATABASE_URL ?? "(unset)";
console.log("DATABASE_URL (env):", url);
console.log("DATABASE_URL (Next/runtime):", resolveDatabaseUrl());
console.log("cwd:", process.cwd());

const rootDb = path.join(process.cwd(), "dev.db");
const prismaDb = path.join(process.cwd(), "prisma", "dev.db");
console.log("exists root dev.db:", fs.existsSync(rootDb), rootDb);
console.log("exists prisma/dev.db:", fs.existsSync(prismaDb), prismaDb);

const prisma = new PrismaClient({
  datasources: { db: { url: resolveDatabaseUrl() } },
});
try {
  const count = await prisma.menuItem.count();
  const first = await prisma.menuItem.findMany({ take: 3, orderBy: { id: "asc" } });
  console.log("menu row count:", count);
  console.log("first 3:", JSON.stringify(first, null, 2));
} finally {
  await prisma.$disconnect();
}
