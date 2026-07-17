import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const foods = [
  {
    name: "Margherita Pizza",
    price: 299,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
  },
  {
    name: "Veg Burger",
    price: 199,
    category: "Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    rating: 4.5,
  },
  {
    name: "White Pasta",
    price: 249,
    category: "Pasta",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
    rating: 4.6,
  },
  {
    name: "Greek Salad",
    price: 149,
    category: "Salad",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    rating: 4.4,
  },
];

async function main() {
  await prisma.food.deleteMany({
    where: {
      name: {
        in: foods.map((food) => food.name),
      },
    },
  });

  await prisma.food.createMany({
    data: foods,
  });

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
