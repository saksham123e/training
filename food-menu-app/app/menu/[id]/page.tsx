type Food = {
  id: number;
  title: string;
};

async function getFoods() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );

  return res.json();
}

export default async function MenuPage() {
  const foods = await getFoods();

  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-6 text-4xl font-bold">🍽️ Food Menu</h1>

      <div className="space-y-4">
        {foods.map((food) => (
          <div key={food.id} className="rounded-lg border p-4">
            <h2 className="text-xl font-bold">{food.title}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}