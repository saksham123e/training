import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-orange-50">
      <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-between gap-10 px-6 py-16 md:flex-row">
        
        {/* Left Content */}
        <div className="max-w-xl">
          <h1 className="mb-6 text-5xl font-bold leading-tight">
            Delicious Food
            <span className="block text-orange-600">
              Delivered Fast
            </span>
          </h1>

          <p className="mb-8 text-lg text-gray-600">
            Fresh meals prepared with love.
            Discover delicious dishes made by our expert chefs.
          </p>

          <div className="flex gap-4">
            <Link
              href="/menu"
              className="rounded-lg bg-orange-600 px-6 py-3 text-white transition hover:bg-orange-700"
            >
              Explore Menu
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-orange-600 px-6 py-3 text-orange-600 transition hover:bg-orange-100"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div>
          <Image
            src="/hero-food.png"
            alt="Delicious Food"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
    </section>
  );
}