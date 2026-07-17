"use client";

import type {
  ChangeEvent,
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Image as ImageIcon,
  IndianRupee,
  ListFilter,
  Plus,
  Sparkles,
  Star,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { categories } from "@/lib/categories";

export default function AddFoodPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Pizza",
    image: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

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
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message ?? "Failed to add food");
      }

      alert("Food added successfully.");

      setFormData({
        name: "",
        price: "",
        category: "Pizza",
        image: "",
        rating: "",
      });

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="luxury-shell min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.09]"
        >
          <ArrowLeft aria-hidden="true" size={17} />
          Back to dashboard
        </Link>

        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="glass-panel rounded-[2rem] p-8">
            <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-[#FF6B00]/15 text-[#FFA94D]">
              <Sparkles aria-hidden="true" size={24} />
            </div>
            <p className="mb-3 text-sm font-semibold uppercase text-[#FFA94D]">
              New menu item
            </p>
            <h1 className="font-serif text-6xl leading-tight text-white">
              Add a premium plate.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#B5B5B5]">
              Keep naming clear, pricing simple, and imagery sharp. This form
              writes through the existing food API.
            </p>

            <div className="mt-8 grid gap-3">
              {["Valid image URL", "Rating from 0 to 5", "Supported category"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#B5B5B5]"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </section>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-[#141416] p-5 shadow-[0_34px_100px_rgba(0,0,0,0.3)] md:p-8"
          >
            <div className="grid gap-5">
              <FloatingInput
                icon={<Utensils aria-hidden="true" size={18} />}
                type="text"
                name="name"
                label="Food name"
                value={formData.name}
                onChange={handleChange}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <FloatingInput
                  icon={<IndianRupee aria-hidden="true" size={18} />}
                  type="number"
                  name="price"
                  label="Price"
                  value={formData.price}
                  onChange={handleChange}
                />

                <FloatingInput
                  icon={<Star aria-hidden="true" size={18} />}
                  type="number"
                  step="0.1"
                  name="rating"
                  label="Rating"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </div>

              <label className="relative block">
                <ListFilter
                  aria-hidden="true"
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B5B5B5]"
                />
                <span className="absolute left-13 top-2 text-xs font-semibold uppercase text-[#B5B5B5]">
                  Category
                </span>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="min-h-16 w-full appearance-none rounded-[1.25rem] border border-white/10 bg-white/[0.05] px-13 pb-2 pt-6 text-white outline-none transition focus:border-[#FF6B00]/60"
                >
                  {categories.map((category) => (
                    <option key={category.name}>{category.name}</option>
                  ))}
                </select>
              </label>

              <FloatingInput
                icon={<ImageIcon aria-hidden="true" size={18} />}
                type="url"
                name="image"
                label="Image URL"
                value={formData.image}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#FF6B00] px-7 text-sm font-bold text-white shadow-[0_22px_60px_rgba(255,107,0,0.28)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-[#B5B5B5]"
              >
                <Plus aria-hidden="true" size={18} />
                {loading ? "Adding..." : "Add food"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function FloatingInput({
  icon,
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  icon: ReactNode;
  label: string;
}) {
  return (
    <label className="relative block">
      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#B5B5B5]">
        {icon}
      </span>
      <span className="absolute left-13 top-2 text-xs font-semibold uppercase text-[#B5B5B5]">
        {label}
      </span>
      <input
        {...props}
        required
        placeholder=" "
        className="min-h-16 w-full rounded-[1.25rem] border border-white/10 bg-white/[0.05] px-13 pb-2 pt-6 text-white outline-none transition placeholder:text-transparent focus:border-[#FF6B00]/60"
      />
    </label>
  );
}
