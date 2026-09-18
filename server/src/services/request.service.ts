import { prisma } from "../lib/prisma.js";
import { HttpError } from "../lib/httpError.js";

function cleanName(name: string) {
  return name.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

export async function createProductRequest(input: { memberId: string; productName: string; qty: number; variant?: string }) {
  const product = await prisma.product.findFirst({
    where: { name: cleanName(input.productName), active: true, priceRupee: null },
  });
  if (!product) throw new HttpError(400, "This item is not currently available for a price request");
  return prisma.productRequest.create({
    data: {
      memberId: input.memberId,
      productId: product.id,
      qty: input.qty,
      variant: input.variant?.trim() || null,
    },
    include: { product: true },
  });
}
