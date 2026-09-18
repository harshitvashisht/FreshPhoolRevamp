import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { catalogSkus } from "./skuCatalog.js";

const prisma = new PrismaClient();

const stems = [
  { slug: "fresh-roses", name: "Fresh Roses", unit: "stem", priceRupee: 15, sortOrder: 1 },
  { slug: "gerbera", name: "Gerbera", unit: "stem", priceRupee: 20, sortOrder: 2 },
  { slug: "carnations", name: "Carnations", unit: "stem", priceRupee: 20, sortOrder: 3 },
  { slug: "chrysanthemums", name: "Chrysanthemums", unit: "stem", priceRupee: 30, sortOrder: 4 },
  { slug: "dahlias", name: "Dahlias", unit: "stem", priceRupee: 30, sortOrder: 5 },
  { slug: "gladiolus", name: "Gladiolus", unit: "stem", priceRupee: 30, sortOrder: 6 },
  { slug: "asiatic-lily", name: "Asiatic Lily", unit: "stem", priceRupee: 40, sortOrder: 7 },
  { slug: "orchids-10", name: "Orchids (set of 10)", unit: "set of 10", priceRupee: 450, sortOrder: 8 },
  { slug: "oriental-lilies", name: "Oriental Lilies", unit: "stem", priceRupee: 80, sortOrder: 9 },
  { slug: "sunflower", name: "Sunflower", unit: "stem", priceRupee: 120, sortOrder: 10 },
  { slug: "babys-breath", name: "Baby's Breath", unit: "bunch", priceRupee: 50, sortOrder: 11 },
];

const puja = [
  { slug: "marigold-pack", name: "Marigold Pack", unit: "pack", priceRupee: null, sortOrder: 1 },
  { slug: "lotus", name: "Lotus", unit: "pair", priceRupee: null, sortOrder: 2 },
  { slug: "bilva-leaves", name: "Bilva Leaves", unit: "pack", priceRupee: null, sortOrder: 3 },
  { slug: "betel-leaf-supari", name: "Betel Leaf + Supari", unit: "set", priceRupee: null, sortOrder: 4 },
];

const garlands = [
  { slug: "jasmine-garland", name: "Jasmine Garland", unit: "garland", priceRupee: null, sortOrder: 1 },
  { slug: "marigold-garland", name: "Marigold Garland", unit: "garland", priceRupee: null, sortOrder: 2 },
  { slug: "tulsi-garland", name: "Tulsi Garland", unit: "garland", priceRupee: null, sortOrder: 3 },
  { slug: "chrysanthemum-garland", name: "Chrysanthemum Garland", unit: "garland", priceRupee: null, sortOrder: 4 },
  { slug: "betel-leaf-garland", name: "Betel Leaf Garland", unit: "garland", priceRupee: null, sortOrder: 5 },
];

const pujaPackPrices: Record<string, Record<number, number>> = {
  Small: { 7: 149, 30: 699, 90: 1899 },
  Medium: { 7: 199, 30: 899, 90: 2499 },
  Large: { 7: 249, 30: 1099, 90: 2999 },
};

const zones = [
  { pincode: "560064", locality: "Yelahanka" },
  { pincode: "560097", locality: "Vidyaranyapura" },
  { pincode: "560092", locality: "Sahakara Nagar" },
  { pincode: "560094", locality: "RMV 2nd Stage" },
  { pincode: "560024", locality: "Hebbal" },
  { pincode: "560054", locality: "Mathikere" },
  { pincode: "560022", locality: "Yeshwanthpur" },
];

const pricedSkuProducts = catalogSkus.flatMap((sku, index) => {
  const priceByName: Record<string, number> = {
    "Rose": 15,
    "Gerbera": 20,
    "Carnation": 20,
    "Chrysanthemum": 30,
    "Dahlias": 30,
    "Gladiolus": 30,
    "Asiatic Lily": 40,
    "Oriental Lily": 80,
    "Sunflower": 120,
    "Baby's Breath": 50,
  };
  const priceRupee = sku.sourceCategory === "Decorative Flowers" ? priceByName[sku.name] : undefined;
  if (priceRupee === undefined) return [];
  return [{
    sku: sku.sku,
    slug: sku.sku.toLowerCase(),
    name: `${sku.name} — ${sku.color}`,
    category: "STEM" as const,
    unit: sku.unit === "Small/Medium/Large Bunch" ? "bunch" : sku.unit.toLowerCase(),
    priceRupee,
    active: true,
    sortOrder: 100 + index,
  }];
});

async function main() {
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@freshphool.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "freshPhool@Vivek";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: "ADMIN", name: "FreshPhool Ops" },
    create: {
      email: adminEmail,
      passwordHash,
      name: "FreshPhool Ops",
      role: "ADMIN",
    },
  });

  for (const p of stems) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: { ...p, category: "STEM" },
    });
  }

  for (const p of puja) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: { ...p, category: "PUJA" },
    });
  }

  for (const p of garlands) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: { ...p, category: "GARLAND" },
    });
  }

  const pack = await prisma.product.upsert({
    where: { slug: "daily-puja-pack" },
    update: { name: "Daily Puja Pack", unit: "pack", priceRupee: null, sortOrder: 0 },
    create: {
      slug: "daily-puja-pack",
      name: "Daily Puja Pack",
      category: "PACK",
      unit: "pack",
      priceRupee: null,
      sortOrder: 0,
    },
  });

  await prisma.productVariant.deleteMany({ where: { productId: pack.id } });
  await prisma.productVariant.createMany({
    data: Object.entries(pujaPackPrices).flatMap(([size, days]) =>
      Object.entries(days).map(([duration, priceRupee]) => ({
        productId: pack.id,
        size,
        durationDays: Number(duration),
        cadence: "daily" as const,
        priceRupee,
        label: `${size} · ${duration} days`,
      })),
    ),
  });

  for (const z of zones) {
    await prisma.deliveryZone.upsert({
      where: { pincode: z.pincode },
      update: z,
      create: z,
    });
  }

  for (const sku of catalogSkus) {
    await prisma.catalogSku.upsert({
      where: { sku: sku.sku },
      update: sku,
      create: sku,
    });
  }

  for (const product of pricedSkuProducts) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: product,
      create: product,
    });
  }

  console.log(`Seed complete (${catalogSkus.length} unique SKUs imported, ${pricedSkuProducts.length} priced SKU products added)`);
  console.log(`Admin login: ${adminEmail}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
