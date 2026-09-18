CREATE TABLE "catalog_skus" (
  "id" TEXT NOT NULL,
  "sku" TEXT NOT NULL,
  "sourceCategory" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "color" TEXT NOT NULL,
  "unit" TEXT NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "catalog_skus_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "catalog_skus_sku_key" ON "catalog_skus"("sku");
CREATE INDEX "catalog_skus_sourceCategory_name_idx" ON "catalog_skus"("sourceCategory", "name");
