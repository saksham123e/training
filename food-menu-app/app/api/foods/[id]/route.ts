import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.food.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.error(error);

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