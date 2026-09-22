-- CreateTable
CREATE TABLE "ChapaPayment" (
    "txRef" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'ETB',
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "chapaRefId" TEXT,
    "verifiedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "ChapaPayment_status_idx" ON "ChapaPayment"("status");
