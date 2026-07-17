import Hero from "@/components/Hero";
import FoodCard from "@/components/FoodCard";
import CategoryCard from "@/components/CategoryCard";
import { connection } from "next/server";
import {
  ArrowRight,
  ChefHat,
  Clock3,
  Quote,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { categories } from "@/lib/categories";
import { getFeaturedFoods } from "@/lib/foods";

export const runtime = "nodejs";

const testimonials = [
  {
    name: "Aarav M.",
    role: "Product designer",
    quote:
      "The food feels restaurant-grade, but the ordering experience is cleaner than most SaaS dashboards I use.",
  },
  {
    name: "Mira S.",
    role: "Founder",
    quote:
      "Maison is my default for late working dinners. Fast, polished, and consistently beautiful.",
  },
  {
    name: "Dev R.",
    role: "Engineering lead",
    quote:
      "The menu is compact, premium, and predictable. It feels like a serious product.",
  },
];

const stats = [
  { label: "Meals delivered", value: "48K+" },
  { label: "Avg. delivery", value: "18m" },
  { label: "Curated chefs", value: "32" },
  { label: "Customer rating", value: "4.9" },
];

export default async function Home() {
  await connection();

  const foods = await getFeaturedFoods(6);
  const bestSellers = foods.slice(0, 3);
  const chefPick = foods[0];
  const todaysSpecials = foods.slice(1, 4);

  return (
    <main className="bg-[#0B0B0C]">
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Browse by mood"
          title="Curated categories"
          description="Move from crisp salads to weekend burgers with one polished, fast path."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              emoji={category.emoji}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Featured"
          title="Food people reorder"
          description="High-signal dishes from today’s kitchen queue, selected for freshness and speed."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
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
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="glass-panel rounded-[2rem] p-8">
          <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-[#FF6B00]/15 text-[#FFA94D]">
            <TrendingUp aria-hidden="true" size={24} />
          </div>
          <p className="mb-3 text-sm font-semibold uppercase text-[#FFA94D]">
            Best sellers
          </p>
          <h2 className="font-serif text-5xl leading-tight text-white">
            The plates that disappear first.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#B5B5B5]">
            A short list of high-velocity dishes, tuned for repeat orders and
            quick delivery windows.
          </p>
        </div>

        <div className="grid gap-4">
          {bestSellers.map((food, index) => (
            <a
              key={food.id}
              href={`/menu/${food.id}`}
              className="group flex items-center justify-between gap-5 rounded-[1.5rem] border border-white/10 bg-[#1B1B1F]/76 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#FF6B00]/40"
            >
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-white text-sm font-bold text-[#0B0B0C]">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {food.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#B5B5B5]">
                    {food.category} · ₹{food.price}
                  </p>
                </div>
              </div>
              <ArrowRight
                aria-hidden="true"
                className="text-[#B5B5B5] transition group-hover:translate-x-1 group-hover:text-[#FFA94D]"
                size={20}
              />
            </a>
          ))}
        </div>
      </section>

      {chefPick ? (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#141416] shadow-[0_34px_100px_rgba(0,0,0,0.32)] lg:grid-cols-[1fr_1.1fr]">
            <div className="p-8 md:p-12">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#FF6B00]/15 px-4 py-2 text-sm font-semibold text-[#FFA94D]">
                <ChefHat aria-hidden="true" size={17} />
                Chef recommendation
              </div>
              <h2 className="font-serif text-5xl leading-tight text-white">
                {chefPick.name}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#B5B5B5]">
                Our kitchen’s current signature: layered flavor, balanced
                texture, and a delivery window that keeps it at its best.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white">
                  {chefPick.category}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white">
                  ⭐ {chefPick.rating}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white">
                  ₹{chefPick.price}
                </span>
              </div>
              <a
                href={`/menu/${chefPick.id}`}
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold text-[#0B0B0C] transition hover:scale-[1.03]"
              >
                See details
                <ArrowRight aria-hidden="true" size={18} />
              </a>
            </div>
            <div className="luxury-grid min-h-80 bg-[#1B1B1F] p-8 md:p-12">
              <div className="grid h-full place-items-center rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 text-center">
                <Sparkles
                  aria-hidden="true"
                  size={48}
                  className="mb-5 text-[#FFA94D]"
                />
                <p className="max-w-sm text-2xl font-semibold leading-9 text-white">
                  “A clean, premium plate for people who care about timing as
                  much as taste.”
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Today"
          title="Limited specials"
          description="A small set of dishes built for tonight’s peak window."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {todaysSpecials.map((food) => (
            <a
              key={food.id}
              href={`/menu/${food.id}`}
              className="rounded-[1.5rem] border border-white/10 bg-[#1B1B1F]/76 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#FF6B00]/40"
            >
              <Clock3 aria-hidden="true" className="mb-5 text-[#FFA94D]" />
              <h3 className="text-2xl font-bold text-white">{food.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[#B5B5B5]">
                Available while today’s prep holds. Best enjoyed fresh from the
                kitchen route.
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="p-4 text-center">
              <p className="font-serif text-5xl text-white">{item.value}</p>
              <p className="mt-2 text-sm text-[#B5B5B5]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Reviews"
          title="Loved by busy people"
          description="Premium delivery is a product experience, not just a meal."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="rounded-[1.5rem] border border-white/10 bg-[#1B1B1F]/76 p-6"
            >
              <Quote aria-hidden="true" className="mb-6 text-[#FFA94D]" />
              <blockquote className="text-base leading-7 text-white">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-[#B5B5B5]">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#1B1B1F] to-[#141416] p-8 text-center shadow-[0_34px_100px_rgba(0,0,0,0.35)] md:p-12">
          <p className="text-sm font-semibold uppercase text-[#FFA94D]">
            Newsletter
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-5xl leading-tight text-white">
            Get the Friday chef drop before everyone else.
          </h2>
          <form className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              className="min-h-14 flex-1 rounded-full border border-white/10 bg-white/[0.06] px-5 text-white outline-none transition placeholder:text-[#B5B5B5] focus:border-[#FF6B00]/60"
            />
            <button
              type="submit"
              className="min-h-14 rounded-full bg-[#FF6B00] px-7 text-sm font-bold text-white transition hover:scale-[1.03]"
            >
              Join list
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 text-sm font-semibold uppercase text-[#FFA94D]">
        {eyebrow}
      </p>
      <h2 className="font-serif text-5xl leading-tight text-white md:text-6xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-[#B5B5B5]">{description}</p>
    </div>
  );
}
