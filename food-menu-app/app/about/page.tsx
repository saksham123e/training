import { ChefHat, Clock3, Leaf, ShieldCheck } from "lucide-react";

const principles = [
  {
    icon: <ChefHat aria-hidden="true" size={22} />,
    title: "Chef-led menus",
    description: "Focused dishes built for flavor, consistency, and delivery.",
  },
  {
    icon: <Leaf aria-hidden="true" size={22} />,
    title: "Fresh sourcing",
    description: "Market-forward ingredients and compact prep windows.",
  },
  {
    icon: <Clock3 aria-hidden="true" size={22} />,
    title: "Timing obsessed",
    description: "Routes designed around heat, texture, and arrival quality.",
  },
  {
    icon: <ShieldCheck aria-hidden="true" size={22} />,
    title: "Premium handling",
    description: "Packaging and workflows that protect the plate.",
  },
];

export default function AboutPage() {
  return (
    <main className="luxury-shell min-h-screen px-6 py-20">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase text-[#FFA94D]">
            About Maison
          </p>
          <h1 className="font-serif text-6xl leading-tight text-white md:text-7xl">
            Delivery designed like a premium product.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#B5B5B5]">
            Maison Menu is a compact food delivery experience focused on
            beautiful menus, fast routing, and meals that still feel composed
            when they reach the table.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {principles.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.75rem] border border-white/10 bg-[#1B1B1F]/76 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]"
            >
              <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-[#FF6B00]/15 text-[#FFA94D]">
                {item.icon}
              </div>
              <h2 className="text-xl font-bold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#B5B5B5]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
