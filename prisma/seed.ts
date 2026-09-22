import { PrismaClient } from "@prisma/client";
import seedData from "../app/data/menu/seed-data.json";

const prisma = new PrismaClient();

async function main() {
  await prisma.menuItem.deleteMany();

  await prisma.menuItem.createMany({
    data: seedData.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      tag: item.tag,
      description: item.description,
    })),
  });

  const count = await prisma.menuItem.count();
  if (count !== 126) {
    throw new Error(`Expected 126 menu items after seed, got ${count}`);
  }
  console.log(`Seeded ${count} menu items.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
