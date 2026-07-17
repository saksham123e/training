import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Leaf,
  ShieldCheck,
  Star,
} from "lucide-react";

const heroStats = [
  { label: "Avg. delivery", value: "18 min" },
  { label: "Chef rating", value: "4.9/5" },
  { label: "Repeat orders", value: "72%" },
];

export default function Hero() {
  return (
    <section className="luxury-shell relative overflow-hidden">
      <div className="luxury-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/70 to-transparent" />

      <div className="relative mx-auto grid min-h-[calc(100svh-180px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-[#B5B5B5] backdrop-blur-xl">
            <ShieldCheck aria-hidden="true" size={16} className="text-[#00C853]" />
            Curated meals. Delivered with precision.
          </div>

          <h1 className="max-w-4xl font-serif text-4xl leading-[1.02] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Fine dining,
            <span className="block text-[#FFA94D]">without the wait.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-[#B5B5B5] sm:text-lg md:text-xl md:leading-8">
            Chef-built comfort plates, market-fresh bowls, and iconic weekend
            cravings delivered in a polished, restaurant-grade experience.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/menu"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#FF6B00] px-7 py-4 text-sm font-bold text-white shadow-[0_22px_60px_rgba(255,107,0,0.32)] transition duration-300 hover:scale-[1.03] hover:bg-[#ff7a1f] sm:w-auto"
            >
              Explore menu
              <ArrowRight
                aria-hidden="true"
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/about"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-7 py-4 text-sm font-bold text-white backdrop-blur-xl transition duration-300 hover:scale-[1.03] hover:border-white/20 hover:bg-white/[0.09] sm:w-auto"
            >
              Our kitchen
            </Link>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {heroStats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl"
              >
                <dt className="text-xs text-[#B5B5B5]">{item.label}</dt>
                <dd className="mt-2 text-xl font-bold text-white">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -left-5 top-10 z-10 hidden rounded-3xl border border-white/10 bg-[#141416]/85 p-4 shadow-2xl backdrop-blur-xl sm:block">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-[#00C853]/15 text-[#00C853]">
                <Leaf aria-hidden="true" size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  Fresh ingredients
                </p>
                <p className="text-xs text-[#B5B5B5]">Market sourced daily</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-16 right-3 z-10 rounded-3xl border border-white/10 bg-[#141416]/85 p-4 shadow-2xl backdrop-blur-xl sm:-right-3">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-[#FF6B00]/15 text-[#FFA94D]">
                <Clock3 aria-hidden="true" size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  18 minute drop
                </p>
                <p className="text-xs text-[#B5B5B5]">Live kitchen routing</p>
              </div>
            </div>
          </div>

          <div className="animate-float-soft relative rounded-[2rem] border border-white/10 bg-white/[0.055] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.42)] backdrop-blur-xl">
            <Image
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85"
              alt="Premium plated meal"
              width={780}
              height={900}
              priority
              className="aspect-[0.9] w-full rounded-[1.5rem] object-cover"
            />
            <div className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-full bg-black/45 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl">
              <Star
                aria-hidden="true"
                size={16}
                className="fill-[#FFA94D] text-[#FFA94D]"
              />
              4.9 kitchen rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
