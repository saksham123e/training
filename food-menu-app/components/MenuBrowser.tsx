"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownUp, Search, SlidersHorizontal, Utensils } from "lucide-react";
import FoodCard from "@/components/FoodCard";

type Food = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
};

type MenuBrowserProps = {
  categories: string[];
  initialCategory: string;
};

type SortMode = "featured" | "rating" | "price-low" | "price-high";

export default function MenuBrowser({
  categories,
  initialCategory,
}: MenuBrowserProps) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sortMode, setSortMode] = useState<SortMode>("featured");
  const [priceLimit, setPriceLimit] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchFoods() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/foods", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load menu");
        }

        const data = (await response.json()) as Food[];
        setFoods(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error ? error.message : "Failed to load menu"
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchFoods();

    return () => controller.abort();
  }, []);

  const maxPrice = useMemo(() => {
    if (foods.length === 0) {
      return 500;
    }

    return Math.max(...foods.map((food) => food.price));
  }, [foods]);

  const activePriceLimit = priceLimit ?? maxPrice;

  const filteredFoods = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = foods.filter((food) => {
      const matchesSearch = food.name.toLowerCase().includes(query);
      const matchesCategory =
        category === "All" || food.category === category;
      const matchesPrice = food.price <= activePriceLimit;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    return [...filtered].sort((first, second) => {
      if (sortMode === "rating") {
        return second.rating - first.rating;
      }

      if (sortMode === "price-low") {
        return first.price - second.price;
      }

      if (sortMode === "price-high") {
        return second.price - first.price;
      }

      return second.id - first.id;
    });
  }, [activePriceLimit, category, foods, search, sortMode]);

  return (
    <div className="space-y-10">
      <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#141416] p-8 shadow-[0_34px_100px_rgba(0,0,0,0.3)] md:p-10">
        <div className="luxury-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative">
          <p className="mb-3 text-sm font-semibold uppercase text-[#FFA94D]">
            Maison menu
          </p>
          <h1 className="font-serif text-5xl leading-tight text-white sm:text-6xl">
            Order like it matters.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#B5B5B5]">
            Search, filter, and sort a focused menu of chef-led delivery
            staples.
          </p>
        </div>
      </header>

      <section className="glass-panel rounded-[2rem] p-4 md:p-5">
        <div className="grid min-w-0 gap-4 lg:grid-cols-[1fr_220px_260px]">
          <label className="relative block min-w-0">
            <span className="sr-only">Search food</span>
            <Search
              aria-hidden="true"
              size={19}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B5B5B5]"
            />
            <input
              type="text"
              placeholder="Search pizza, salad, pasta..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="min-h-14 w-full rounded-full border border-white/10 bg-white/[0.06] pl-13 pr-5 text-white outline-none transition placeholder:text-[#B5B5B5] focus:border-[#FF6B00]/60"
            />
          </label>

          <label className="relative block min-w-0">
            <span className="sr-only">Sort menu</span>
            <ArrowDownUp
              aria-hidden="true"
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B5B5B5]"
            />
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="min-h-14 w-full appearance-none rounded-full border border-white/10 bg-white/[0.06] px-13 text-white outline-none transition focus:border-[#FF6B00]/60"
            >
              <option value="featured">Featured</option>
              <option value="rating">Top rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>

          <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-3">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-2 text-[#B5B5B5]">
                <SlidersHorizontal aria-hidden="true" size={16} />
                Max price
              </span>
              <span className="font-semibold text-white">
                ₹{activePriceLimit}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={activePriceLimit}
              onChange={(event) => setPriceLimit(Number(event.target.value))}
              className="w-full accent-[#FF6B00]"
              aria-label="Maximum price"
            />
          </div>
        </div>

        <div className="mt-5 flex max-w-full gap-2 overflow-x-auto pb-1">
          {["All", ...categories].map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ${
                  active
                    ? "bg-[#FF6B00] text-white shadow-[0_18px_40px_rgba(255,107,0,0.24)]"
                    : "border border-white/10 bg-white/[0.04] text-[#B5B5B5] hover:border-white/20 hover:text-white"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[1.75rem] border border-white/10 bg-[#1B1B1F]/80 p-4"
            >
              <div className="skeleton h-56 rounded-[1.25rem]" />
              <div className="skeleton mt-5 h-6 w-2/3 rounded-full" />
              <div className="skeleton mt-3 h-4 w-1/2 rounded-full" />
              <div className="skeleton mt-6 h-12 rounded-full" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-[2rem] border border-[#FF4D4F]/25 bg-[#FF4D4F]/10 p-10 text-center text-white">
          <h2 className="text-2xl font-bold">{error}</h2>
        </div>
      ) : filteredFoods.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFoods.map((food) => (
            <FoodCard
              key={food.id}
              id={food.id}
              name={food.name}
              price={food.price}
              rating={food.rating}
              image={food.image}
              category={food.category}
            />
          ))}
        </div>
      ) : (
        <div className="grid place-items-center rounded-[2rem] border border-white/10 bg-[#1B1B1F]/76 p-12 text-center">
          <div className="mb-6 grid size-20 place-items-center rounded-full bg-[#FF6B00]/15 text-[#FFA94D]">
            <Utensils aria-hidden="true" size={34} />
          </div>
          <h2 className="text-3xl font-bold text-white">No food found</h2>
          <p className="mt-3 max-w-md text-[#B5B5B5]">
            Try a broader search, a different category, or a higher price
            ceiling.
          </p>
        </div>
      )}
    </div>
  );
}
