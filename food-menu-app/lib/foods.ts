import "server-only";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/lib/generated/prisma/client";

export const foodSelect = {
  id: true,
  name: true,
  price: true,
  category: true,
  image: true,
  rating: true,
} satisfies Prisma.FoodSelect;

export type FoodListItem = Prisma.FoodGetPayload<{
  select: typeof foodSelect;
}>;

export type FoodCreateData = Pick<
  FoodListItem,
  "name" | "price" | "category" | "image" | "rating"
>;

const newestFirst = [{ createdAt: "desc" }, { id: "desc" }] satisfies
  Prisma.FoodOrderByWithRelationInput[];

export function toFoodId(value: string) {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

export function getFeaturedFoods(limit = 6) {
  return prisma.food.findMany({
    take: limit,
    orderBy: newestFirst,
    select: foodSelect,
  });
}

export function getFoods() {
  return prisma.food.findMany({
    orderBy: newestFirst,
    select: foodSelect,
  });
}

export function getFoodById(id: number) {
  return prisma.food.findUnique({
    where: { id },
    select: foodSelect,
  });
}

export function createFood(data: FoodCreateData) {
  return prisma.food.create({
    data,
    select: foodSelect,
  });
}

export function updateFood(id: number, data: Partial<FoodCreateData>) {
  return prisma.food.update({
    where: { id },
    data,
    select: foodSelect,
  });
}

export function deleteFood(id: number) {
  return prisma.food.delete({
    where: { id },
    select: {
      id: true,
    },
  });
}
