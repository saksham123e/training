import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteFoodButton from "@/components/DeleteFoodButton";

export default async function AdminPage() {
  const foods = await prisma.food.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          🍔 Admin Dashboard
        </h1>

        <Link
          href="/admin/add-food"
          className="rounded bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
        >
          + Add Food
        </Link>
      </div>

      <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Category</th>
            <th className="p-4">Rating</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {foods.map((food) => (
            <tr
              key={food.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-4">{food.name}</td>

              <td className="text-center">
                ₹{food.price}
              </td>

              <td className="text-center">
                {food.category}
              </td>

              <td className="text-center">
                ⭐ {food.rating}
              </td>

              <td className="text-center space-x-3">
                <Link
                  href={`/admin/edit/${food.id}`}
                  className="rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
                >
                  Edit
                </Link>

                <DeleteFoodButton id={food.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}