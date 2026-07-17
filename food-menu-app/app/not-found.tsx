import Link from "next/link";

export default function NotFound() {
  return (
    <main className="luxury-shell flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
      <h1 className="font-serif text-8xl text-white">404</h1>

      <p className="text-xl text-[#B5B5B5]">Page not found</p>

      <Link
        href="/"
        className="rounded-full bg-[#FF6B00] px-6 py-3 text-sm font-bold text-white transition hover:scale-105"
      >
        Go Home
      </Link>
    </main>
  );
}
