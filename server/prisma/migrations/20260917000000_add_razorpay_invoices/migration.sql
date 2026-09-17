ALTER TABLE "payments"
  ADD COLUMN "razorpayOrderId" TEXT,
  ADD COLUMN "razorpayPaymentId" TEXT,
  ADD COLUMN "razorpaySignature" TEXT;

CREATE UNIQUE INDEX "payments_razorpayOrderId_key" ON "payments"("razorpayOrderId");
CREATE UNIQUE INDEX "payments_razorpayPaymentId_key" ON "payments"("razorpayPaymentId");

CREATE TABLE "invoices" (
  "id" TEXT NOT NULL,
  "invoiceNumber" TEXT NOT NULL,
  "orderId" TEXT NOT NULL,
  "paymentId" TEXT,
  "amountRupee" INTEGER NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'INR',
  "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "invoices_invoiceNumber_key" ON "invoices"("invoiceNumber");
CREATE UNIQUE INDEX "invoices_orderId_key" ON "invoices"("orderId");
CREATE UNIQUE INDEX "invoices_paymentId_key" ON "invoices"("paymentId");

ALTER TABLE "invoices" ADD CONSTRAINT "invoices_orderId_fkey"
  FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_paymentId_fkey"
  FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
