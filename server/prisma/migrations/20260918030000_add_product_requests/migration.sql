CREATE TYPE "ProductRequestStatus" AS ENUM ('pending', 'contacted', 'closed');

CREATE TABLE "product_requests" (
  "id" TEXT NOT NULL,
  "memberId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "qty" INTEGER NOT NULL,
  "variant" TEXT,
  "status" "ProductRequestStatus" NOT NULL DEFAULT 'pending',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "product_requests_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "product_requests_memberId_createdAt_idx" ON "product_requests"("memberId", "createdAt");
CREATE INDEX "product_requests_status_createdAt_idx" ON "product_requests"("status", "createdAt");
ALTER TABLE "product_requests" ADD CONSTRAINT "product_requests_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "product_requests" ADD CONSTRAINT "product_requests_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
