"use client";

import { useEffect, useState } from "react";
import FoodCard from "@/components/FoodCard";

type Food = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
};

export default function MenuPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function fetchFoods() {
      const response = await fetch("/api/foods");
      const data = await response.json();
      setFoods(data);
    }

    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || food.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-center text-5xl font-bold">
        🍽 Our Menu
      </h1>

      <div className="mb-10 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border p-3 outline-none focus:ring-2 focus:ring-orange-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border p-3 outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="All">All Categories</option>
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
          <option value="Pasta">Pasta</option>
          <option value="Salad">Salad</option>
        </select>
      </div>

      {filteredFoods.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredFoods.map((food) => (
            <FoodCard
              key={food.id}
              id={food.id}
              name={food.name}
              price={food.price}
              rating={food.rating}
              image={food.image}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-gray-100 p-10 text-center">
          <h2 className="text-2xl font-bold">😔 No Food Found</h2>
          <p className="mt-2 text-gray-600">
            Try searching with another name or category.
          </p>
        </div>
      )}
    </main>
  );
}