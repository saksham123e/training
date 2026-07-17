import Link from "next/link";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";

const footerLinks = [
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Admin", href: "/admin" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0B0C]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-[#FF6B00]">
              <Sparkles aria-hidden="true" size={20} />
            </span>
            <div>
              <p className="font-serif text-2xl text-white">Maison</p>
              <p className="text-sm text-[#B5B5B5]">Fast fine dining</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#B5B5B5]">
            Premium meals, chef-led menus, and delivery timing tuned for the
            rhythm of modern city life.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <p className="mb-4 text-sm font-semibold uppercase text-white">
            Explore
          </p>
          <div className="grid gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group inline-flex w-fit items-center gap-2 text-sm text-[#B5B5B5] transition hover:text-white"
              >
                {link.label}
                <ArrowUpRight
                  aria-hidden="true"
                  size={14}
                  className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            ))}
          </div>
        </nav>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase text-white">
            Concierge
          </p>
          <a
            href="mailto:hello@maison.example"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#B5B5B5] transition hover:border-[#FF6B00]/40 hover:text-white"
          >
            <Mail aria-hidden="true" size={16} />
            hello@maison.example
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-[#B5B5B5]">
        © 2026 Maison Menu. Built with Next.js.
      </div>
    </footer>
  );
}
