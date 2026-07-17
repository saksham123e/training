"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogIn,
  Menu,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0C]/72 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-[#FF6B00] shadow-[0_14px_40px_rgba(255,107,0,0.18)] transition duration-300 group-hover:scale-105">
            <Sparkles aria-hidden="true" size={20} />
          </span>
          <span>
            <span className="block font-serif text-2xl text-white">
              Maison
            </span>
            <span className="block text-xs font-medium uppercase text-[#B5B5B5]">
              Fast fine dining
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1 md:flex"
        >
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                  active
                    ? "bg-white text-[#0B0B0C]"
                    : "text-[#B5B5B5] hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/menu"
            aria-label="Open cart"
            className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition duration-300 hover:scale-105 hover:border-[#FF6B00]/40 hover:bg-[#FF6B00]/15"
          >
            <ShoppingBag aria-hidden="true" size={19} />
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0B0B0C] shadow-[0_18px_40px_rgba(255,255,255,0.12)] transition duration-300 hover:scale-105"
          >
            <LogIn aria-hidden="true" size={17} />
            Login
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:bg-white/[0.12] md:hidden"
        >
          {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-white/10 bg-[#0B0B0C]/95 px-4 py-4 backdrop-blur-2xl md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive(pathname, link.href)
                    ? "bg-white text-[#0B0B0C]"
                    : "bg-white/[0.04] text-[#B5B5B5]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/menu"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white"
              >
                <ShoppingBag aria-hidden="true" size={17} />
                Cart
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FF6B00] px-4 py-3 text-sm font-semibold text-white"
              >
                <LogIn aria-hidden="true" size={17} />
                Login
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
