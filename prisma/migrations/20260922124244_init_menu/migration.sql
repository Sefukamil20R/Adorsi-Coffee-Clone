-- CreateTable
CREATE TABLE "MenuItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "tag" TEXT,
    "description" TEXT
);

-- CreateIndex
CREATE INDEX "MenuItem_category_idx" ON "MenuItem"("category");

-- CreateIndex
CREATE INDEX "MenuItem_tag_idx" ON "MenuItem"("tag");

-- CreateIndex
CREATE INDEX "MenuItem_price_idx" ON "MenuItem"("price");

-- CreateIndex
CREATE INDEX "MenuItem_name_idx" ON "MenuItem"("name");
