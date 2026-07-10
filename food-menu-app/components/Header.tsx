import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-orange-600 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-5">
        <h1 className="text-2xl font-bold">🍽️ Food Menu</h1>

        <nav className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}