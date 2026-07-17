"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, Search } from "lucide-react";
import DeleteFoodButton from "@/components/DeleteFoodButton";
import type { FoodListItem } from "@/lib/foods";

type AdminFoodTableProps = {
  foods: FoodListItem[];
  categories: string[];
};

export default function AdminFoodTable({
  foods,
  categories,
}: AdminFoodTableProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredFoods = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return foods.filter((food) => {
      const matchesQuery = food.name.toLowerCase().includes(normalizedQuery);
      const matchesCategory =
        category === "All" || food.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [category, foods, query]);

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#141416] shadow-[0_34px_100px_rgba(0,0,0,0.28)]">
      <div className="grid gap-4 border-b border-white/10 p-5 lg:grid-cols-[1fr_240px]">
        <label className="relative block">
          <span className="sr-only">Search foods</span>
          <Search
            aria-hidden="true"
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B5B5B5]"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search inventory..."
            className="min-h-13 w-full rounded-full border border-white/10 bg-white/[0.05] pl-12 pr-5 text-white outline-none transition placeholder:text-[#B5B5B5] focus:border-[#FF6B00]/60"
          />
        </label>

        <label className="relative block">
          <span className="sr-only">Filter category</span>
          <ArrowDownUp
            aria-hidden="true"
            size={17}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B5B5B5]"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="min-h-13 w-full appearance-none rounded-full border border-white/10 bg-white/[0.05] px-12 text-white outline-none transition focus:border-[#FF6B00]/60"
          >
            <option value="All">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-[#B5B5B5]">
              <th className="px-6 py-4 font-semibold">Item</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Rating</th>
              <th className="px-6 py-4 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFoods.map((food) => (
              <tr
                key={food.id}
                className="border-b border-white/10 transition hover:bg-white/[0.035]"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl bg-[#FF6B00]/15 text-sm font-bold text-[#FFA94D]">
                      #{food.id}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{food.name}</p>
                      <p className="text-sm text-[#B5B5B5]">Published menu item</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white">
                    {food.category}
                  </span>
                </td>
                <td className="px-6 py-5 font-semibold text-white">
                  ₹{food.price}
                </td>
                <td className="px-6 py-5 text-[#FFA94D]">⭐ {food.rating}</td>
                <td className="px-6 py-5 text-right">
                  <DeleteFoodButton id={food.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredFoods.length === 0 ? (
        <div className="p-10 text-center text-[#B5B5B5]">
          No foods match this filter.
        </div>
      ) : null}
    </section>
  );
}
