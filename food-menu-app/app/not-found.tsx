import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-6xl font-bold text-red-600">404</h1>

      <p className="text-xl">Page Not Found</p>

      <Link
        href="/"
        className="rounded bg-orange-600 px-5 py-2 text-white"
      >
        Go Home
      </Link>
    </main>
  );
}