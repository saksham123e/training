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

  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
      const response = await fetch("/api/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          price: Number(formData.price),
          category: formData.category,
          image: formData.image,
          rating: Number(formData.rating),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add food");
      }

      alert("✅ Food Added Successfully!");

      setFormData({
        name: "",
        price: "",
        category: "Pizza",
        image: "",
        rating: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        ➕ Add Food
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl bg-white p-6 shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
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
          type="text"
          name="image"
          placeholder="/foods/pizza.jpg"
          value={formData.image}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-orange-500 py-3 text-white hover:bg-orange-600 disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </main>
  );
}