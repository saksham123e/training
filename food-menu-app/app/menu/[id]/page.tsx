import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock3,
  Flame,
  Leaf,
  Minus,
  Plus,
  ShieldCheck,
  Star,
} from "lucide-react";
import FoodCard from "@/components/FoodCard";
import { getFeaturedFoods, getFoodById, toFoodId } from "@/lib/foods";

export const runtime = "nodejs";

type FoodDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ingredients = [
  "Market vegetables",
  "Cold-pressed olive oil",
  "House spice blend",
  "Fresh herbs",
];

const nutrition = [
  { label: "Calories", value: "520" },
  { label: "Protein", value: "24g" },
  { label: "Carbs", value: "48g" },
  { label: "Fat", value: "21g" },
];

const reviews = [
  {
    name: "Nisha",
    text: "Arrived beautifully packed and tasted like it came straight from a great restaurant.",
  },
  {
    name: "Kabir",
    text: "Balanced, fresh, and fast. The kind of delivery meal you actually remember.",
  },
];

export default async function FoodDetailsPage({
  params,
}: FoodDetailsPageProps) {
  const { id } = await params;
  const foodId = toFoodId(id);

  if (!foodId) {
    notFound();
  }

  const [food, featuredFoods] = await Promise.all([
    getFoodById(foodId),
    getFeaturedFoods(6),
  ]);

  if (!food) {
    notFound();
  }

  const recommendedFoods = featuredFoods
    .filter((item) => item.id !== food.id)
    .slice(0, 3);

  return (
    <main className="bg-[#0B0B0C]">
      <section className="luxury-shell relative overflow-hidden px-6 py-10">
        <div className="luxury-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/menu"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.09]"
          >
            <ArrowLeft aria-hidden="true" size={17} />
            Back to menu
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#1B1B1F] shadow-[0_34px_100px_rgba(0,0,0,0.32)]">
                <Image
                  src={food.image}
                  alt={food.name}
                  width={1100}
                  height={780}
                  priority
                  className="aspect-[1.14] w-full object-cover"
                />
                <div className="absolute left-5 top-5 rounded-full bg-black/45 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl">
                  {food.category}
                </div>
                <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-black/45 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl">
                  <Star
                    aria-hidden="true"
                    size={16}
                    className="fill-[#FFA94D] text-[#FFA94D]"
                  />
                  {food.rating} from 1.2K reviews
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[food.category, "Fresh prep", "Hot route"].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-white/[0.05] p-4 text-center text-sm font-semibold text-white"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <aside className="glass-panel sticky top-28 rounded-[2rem] p-6 lg:p-8">
              <p className="mb-3 text-sm font-semibold uppercase text-[#FFA94D]">
                Signature dish
              </p>
              <h1 className="font-serif text-6xl leading-tight text-white">
                {food.name}
              </h1>
              <p className="mt-5 text-lg leading-8 text-[#B5B5B5]">
                Freshly prepared and routed quickly so texture, heat, and aroma
                arrive intact.
              </p>

              <div className="mt-7 grid grid-cols-3 gap-3">
                <Metric
                  icon={<Clock3 aria-hidden="true" size={18} />}
                  label="Time"
                  value="18-22m"
                />
                <Metric
                  icon={<Flame aria-hidden="true" size={18} />}
                  label="Energy"
                  value="Warm"
                />
                <Metric
                  icon={<Leaf aria-hidden="true" size={18} />}
                  label="Fresh"
                  value="Daily"
                />
              </div>

              <div className="mt-8 flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4">
                <div>
                  <p className="text-sm text-[#B5B5B5]">Price</p>
                  <p className="text-3xl font-bold text-white">₹{food.price}</p>
                </div>
                <div className="flex items-center rounded-full border border-white/10 bg-[#0B0B0C] p-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    className="grid size-10 place-items-center rounded-full text-[#B5B5B5] transition hover:bg-white/[0.08] hover:text-white"
                  >
                    <Minus aria-hidden="true" size={16} />
                  </button>
                  <span className="grid size-10 place-items-center text-sm font-bold text-white">
                    1
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    className="grid size-10 place-items-center rounded-full bg-white text-[#0B0B0C] transition hover:scale-105"
                  >
                    <Plus aria-hidden="true" size={16} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-full bg-[#FF6B00] px-6 py-4 text-sm font-bold text-white shadow-[0_22px_60px_rgba(255,107,0,0.28)] transition hover:scale-[1.02] active:scale-[0.99]"
              >
                Add to cart
              </button>

              <p className="mt-4 inline-flex items-center gap-2 text-sm text-[#B5B5B5]">
                <ShieldCheck
                  aria-hidden="true"
                  size={16}
                  className="text-[#00C853]"
                />
                Packed fresh with live kitchen timing
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-3">
        <Panel title="Ingredients">
          <ul className="grid gap-3">
            {ingredients.map((ingredient) => (
              <li
                key={ingredient}
                className="flex items-center gap-3 text-[#B5B5B5]"
              >
                <span className="size-2 rounded-full bg-[#00C853]" />
                {ingredient}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Nutrition">
          <div className="grid grid-cols-2 gap-3">
            {nutrition.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-xs text-[#B5B5B5]">{item.label}</p>
                <p className="mt-1 text-2xl font-bold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Reviews">
          <div className="grid gap-4">
            {reviews.map((review) => (
              <blockquote key={review.name}>
                <p className="text-sm leading-6 text-[#B5B5B5]">
                  “{review.text}”
                </p>
                <footer className="mt-2 text-sm font-semibold text-white">
                  {review.name}
                </footer>
              </blockquote>
            ))}
          </div>
        </Panel>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase text-[#FFA94D]">
            Recommended
          </p>
          <h2 className="font-serif text-5xl text-white">
            Complete the table
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendedFoods.map((item) => (
            <FoodCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              rating={item.rating}
              image={item.image}
              category={item.category}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4">
      <div className="mb-3 text-[#FFA94D]">{icon}</div>
      <p className="text-xs text-[#B5B5B5]">{label}</p>
      <p className="mt-1 text-sm font-bold text-white">{value}</p>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-[#1B1B1F]/76 p-6">
      <h2 className="mb-5 text-2xl font-bold text-white">{title}</h2>
      {children}
    </section>
  );
}
