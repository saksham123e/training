import Link from "next/link";
import { notFound } from "next/navigation";
import { foods } from "@/data/foods";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FoodDetailsPage({ params }: Props) {
  const { id } = await params;

  const food = foods.find((item) => item.id === Number(id));

  if (!food) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <img
          src={food.image}
          alt={food.name}
          className="mb-6 h-80 w-full rounded-lg object-cover"
        />

        <h1 className="text-4xl font-bold">
          {food.name}
        </h1>

        <p className="mt-4 text-2xl font-semibold text-orange-600">
          ₹{food.price}
        </p>

        <p className="mt-2">
          ⭐ {food.rating}
        </p>

        <p className="mt-2">
          Category: {food.category}
        </p>

        <p className="mt-6 text-gray-600">
          Freshly prepared with premium ingredients.
          Perfect for lunch and dinner.
        </p>

        <Link
          href="/menu"
          className="mt-8 inline-block rounded-lg bg-orange-600 px-6 py-3 text-white"
        >
          ← Back to Menu
        </Link>
      </div>
    </main>
  );
}