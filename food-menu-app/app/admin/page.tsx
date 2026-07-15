import Link from "next/link";
import { foods } from "@/data/foods";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          👨‍🍳 Admin Dashboard
        </h1>

        <Link
          href="/admin/add-food"
          className="rounded-lg bg-orange-600 px-5 py-3 text-white hover:bg-orange-700"
        >
          + Add Food
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full">
          <thead className="bg-orange-100">
            <tr>
              <th className="p-4 text-left">Food</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Rating</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {foods.map((food) => (
              <tr key={food.id} className="border-t">
                <td className="p-4">{food.name}</td>
                <td className="p-4">{food.category}</td>
                <td className="p-4">₹{food.price}</td>
                <td className="p-4">⭐ {food.rating}</td>

                <td className="p-4 text-center">
                  <button className="mr-3 rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600">
                    Edit
                  </button>

                  <button className="rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}