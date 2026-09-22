import "dotenv/config";
import { menuRepository } from "../app/data/menu/menu-repository.ts";

async function run(label, query) {
  const result = await menuRepository.list(query);
  console.log(`\n--- ${label}`);
  console.log("total:", result.total);
  if (result.items[0]) {
    console.log("first:", result.items[0].name, result.items[0].category);
  }
}

await run("all", { sort: "category" });
await run("Signature", { category: "Signature", sort: "name-asc" });
await run("Milk Coffee", { category: "Milk Coffee", sort: "name-asc" });
await run("search latte", { search: "latte", sort: "name-asc" });
