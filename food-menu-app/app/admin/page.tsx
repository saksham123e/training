import Link from "next/link";
import type { ReactNode } from "react";
import { connection } from "next/server";
import { CircleDollarSign, Plus, Star, Utensils } from "lucide-react";
import AdminFoodTable from "@/components/AdminFoodTable";
import { categories } from "@/lib/categories";
import { getFoods } from "@/lib/foods";

export const runtime = "nodejs";

export default async function AdminPage() {
  await connection();

  const foods = await getFoods();
  const averageRating =
    foods.length > 0
      ? foods.reduce((total, food) => total + food.rating, 0) / foods.length
      : 0;
  const averagePrice =
    foods.length > 0
      ? foods.reduce((total, food) => total + food.price, 0) / foods.length
      : 0;

  return (
    <main className="bg-[#0B0B0C] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-[#FFA94D]">
              Operations
            </p>
            <h1 className="font-serif text-6xl leading-tight text-white">
              Admin dashboard
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#B5B5B5]">
              Manage the live menu inventory with fast scanning, clear status,
              and low-friction actions.
            </p>
          </div>

          <Link
            href="/admin/add-food"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B00] px-6 py-4 text-sm font-bold text-white shadow-[0_22px_60px_rgba(255,107,0,0.28)] transition hover:scale-[1.03]"
          >
            <Plus aria-hidden="true" size={18} />
            Add Food
          </Link>
        </div>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <MetricCard
            icon={<Utensils aria-hidden="true" size={22} />}
            label="Menu items"
            value={foods.length.toString()}
            helper="Live catalog"
          />
          <MetricCard
            icon={<Star aria-hidden="true" size={22} />}
            label="Average rating"
            value={averageRating.toFixed(1)}
            helper="Customer quality"
          />
          <MetricCard
            icon={<CircleDollarSign aria-hidden="true" size={22} />}
            label="Average price"
            value={`₹${Math.round(averagePrice)}`}
            helper="Current menu"
          />
        </section>

        <AdminFoodTable
          foods={foods}
          categories={categories.map((category) => category.name)}
        />
      </div>
    </main>
  );
}

function MetricCard({
  icon,
  label,
  value,
  helper,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-[#141416] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
      <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-[#FF6B00]/15 text-[#FFA94D]">
        {icon}
      </div>
      <p className="text-sm text-[#B5B5B5]">{label}</p>
      <p className="mt-2 text-4xl font-bold text-white">{value}</p>
      <p className="mt-2 text-sm text-[#B5B5B5]">{helper}</p>
    </article>
  );
}
