import { NextResponse } from "next/server";
import { parseFoodInput } from "@/lib/food-input";
import { createFood, getFoods } from "@/lib/foods";

export const runtime = "nodejs";

export async function GET() {
  try {
    const foods = await getFoods();

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parseFoodInput(body);

    if (!parsed.ok) {
      return NextResponse.json(
        {
          message: parsed.error,
        },
        {
          status: 400,
        }
      );
    }

    const food = await createFood(parsed.data);

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
