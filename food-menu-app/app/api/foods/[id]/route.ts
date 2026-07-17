import { NextResponse } from "next/server";
import { Prisma } from "@/lib/generated/prisma/client";
import { parseFoodInput, parseFoodPatchInput } from "@/lib/food-input";
import { deleteFood, getFoodById, toFoodId, updateFood } from "@/lib/foods";

export const runtime = "nodejs";

type FoodRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: FoodRouteContext) {
  try {
    const { id } = await params;
    const foodId = toFoodId(id);

    if (!foodId) {
      return NextResponse.json(
        {
          message: "Invalid food id",
        },
        {
          status: 400,
        }
      );
    }

    const food = await getFoodById(foodId);

    if (!food) {
      return NextResponse.json(
        {
          message: "Food not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(food);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch food",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: Request, { params }: FoodRouteContext) {
  try {
    const { id } = await params;
    const foodId = toFoodId(id);

    if (!foodId) {
      return NextResponse.json(
        {
          message: "Invalid food id",
        },
        {
          status: 400,
        }
      );
    }

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

    const food = await updateFood(foodId, parsed.data);

    return NextResponse.json(food);
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        {
          message: "Food not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Failed to update food",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(request: Request, { params }: FoodRouteContext) {
  try {
    const { id } = await params;
    const foodId = toFoodId(id);

    if (!foodId) {
      return NextResponse.json(
        {
          message: "Invalid food id",
        },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();
    const parsed = parseFoodPatchInput(body);

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

    const food = await updateFood(foodId, parsed.data);

    return NextResponse.json(food);
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        {
          message: "Food not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Failed to update food",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: FoodRouteContext
) {
  try {
    const { id } = await params;
    const foodId = toFoodId(id);

    if (!foodId) {
      return NextResponse.json(
        {
          message: "Invalid food id",
        },
        {
          status: 400,
        }
      );
    }

    await deleteFood(foodId);

    return NextResponse.json({
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        {
          message: "Food not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Failed to delete food",
      },
      {
        status: 500,
      }
    );
  }
}
