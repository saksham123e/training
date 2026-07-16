import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL FOODS
export async function GET() {
  try {
    const foods = await prisma.food.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(foods);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch foods",
      },
      {
        status: 500,
      }
    );
  }
}

// ADD NEW FOOD
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const food = await prisma.food.create({
      data: {
        name: body.name,
        price: Number(body.price),
        category: body.category,
        image: body.image,
        rating: Number(body.rating),
      },
    });

    return NextResponse.json(food, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create food",
      },
      {
        status: 500,
      }
    );
  }
}