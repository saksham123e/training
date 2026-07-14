import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-orange-600">
          🍔 Food Menu
        </Link>

        {/* Navigation */}
        <nav className="flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium text-gray-700 transition hover:text-orange-600"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}