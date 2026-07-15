"use client";

import { useState } from "react";

export default function AddFoodPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Pizza",
    image: "",
    rating: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log(data);

    alert("Food Added Successfully!");

    setFormData({
      name: "",
      price: "",
      category: "Pizza",
      image: "",
      rating: "",
    });
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        ➕ Add New Food
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl bg-white p-6 shadow"
      >
        <input
          name="name"
          type="text"
          placeholder="Food Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option>Pizza</option>
          <option>Burger</option>
          <option>Pasta</option>
          <option>Salad</option>
        </select>

        <input
          name="image"
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <input
          name="rating"
          type="number"
          step="0.1"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <button
          type="submit"
          className="w-full rounded bg-orange-600 py-3 text-white hover:bg-orange-700"
        >
          Add Food
        </button>
      </form>
    </main>
  );
}