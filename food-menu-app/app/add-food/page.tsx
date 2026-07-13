"use client";

import { useState } from "react";

export default function AddFoodPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
      }),
    });

    const data = await res.json();

    console.log(data);
    alert("Food Added Successfully!");

    setName("");
    setPrice("");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-96 flex-col gap-4 rounded-lg border p-6 shadow"
      >
        <h1 className="text-3xl font-bold">Add Food</h1>

        <input
          type="text"
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border p-2"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="rounded border p-2"
        />

        <button
          type="submit"
          className="rounded bg-orange-600 py-2 text-white"
        >
          Add Food
        </button>
      </form>
    </main>
  );
}