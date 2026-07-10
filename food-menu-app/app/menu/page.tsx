import Link from "next/link";

export default function MenuPage() {
  const foods = [
    { id: 1, name: "Paneer Pizza", price: 250 },
    { id: 2, name: "Veg Burger", price: 120 },
    { id: 3, name: "Masala Dosa", price: 100 },
  ];

  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-6 text-4xl font-bold">🍽️ Our Menu</h1>

      <div className="space-y-4">
        {foods.map((food) => (
          <div
            key={food.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <h2 className="text-xl font-semibold">{food.name}</h2>
              <p>₹{food.price}</p>
            </div>

            <Link
              href={`/menu/${food.id}`}
              className="rounded bg-orange-600 px-4 py-2 text-white"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}