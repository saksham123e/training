import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CategoryCardProps = {
  name: string;
  emoji: string;
};

export default function CategoryCard({ name, emoji }: CategoryCardProps) {
  return (
    <Link
      href={`/menu?category=${name.toLowerCase()}`}
      className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#1B1B1F]/78 p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#FF6B00]/45"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/60 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="mb-8 grid size-16 place-items-center rounded-3xl border border-white/10 bg-white/[0.06] text-4xl transition duration-500 group-hover:scale-110">
        {emoji}
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-[#B5B5B5]">
            Curated category
          </p>
          <h3 className="mt-2 text-2xl font-bold text-white">{name}</h3>
        </div>
        <span className="grid size-10 place-items-center rounded-full bg-white text-[#0B0B0C] transition duration-300 group-hover:translate-x-1">
          <ArrowRight aria-hidden="true" size={17} />
        </span>
      </div>
    </Link>
  );
}
