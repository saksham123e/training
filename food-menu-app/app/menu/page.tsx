"use client";

import { useState } from "react";
import FoodCard from "@/components/FoodCard";
import { foods } from "@/data/foods";

export default function MenuPage() {
  const [search, setSearch] = useState("");

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-center text-5xl font-bold">
        🍽 Our Menu
      </h1>

      {/* Search + Filter */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border p-3 outline-none focus:ring-2 focus:ring-orange-500"
        />

        <select className="rounded-lg border p-3 outline-none focus:ring-2 focus:ring-orange-500">
          <option>All Categories</option>
          <option>Pizza</option>
          <option>Burger</option>
          <option>Pasta</option>
          <option>Salad</option>
        </select>
      </div>

      {/* Food Grid */}
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
    </main>
  );
}