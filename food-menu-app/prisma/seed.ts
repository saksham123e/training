import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.food.createMany({
    data: [
      {
        name: "Margherita Pizza",
        price: 299,
        category: "Pizza",
        image: "/foods/pizza.jpg",
        rating: 4.8,
      },
      {
        name: "Veg Burger",
        price: 199,
        category: "Burger",
        image: "/foods/burger.jpg",
        rating: 4.5,
      },
      {
        name: "White Pasta",
        price: 249,
        category: "Pasta",
        image: "/foods/pasta.jpg",
        rating: 4.6,
      },
      {
        name: "Greek Salad",
        price: 149,
        category: "Salad",
        image: "/foods/salad.jpg",
        rating: 4.4,
      },
    ],
  });

  console.log("✅ Seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });