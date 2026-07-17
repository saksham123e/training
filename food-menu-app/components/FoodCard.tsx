import Image from "next/image";
import Link from "next/link";
import { Clock3, Plus, Star } from "lucide-react";

type FoodCardProps = {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  category?: string;
};

export default function FoodCard({
  id,
  name,
  price,
  rating,
  image,
  category = "Signature",
}: FoodCardProps) {
  const deliveryTime = 14 + (id % 4) * 3;

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#1B1B1F]/82 shadow-[0_28px_80px_rgba(0,0,0,0.26)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#FF6B00]/45 hover:shadow-[0_34px_100px_rgba(255,107,0,0.16)]">
      <Link href={`/menu/${id}`} className="block focus:outline-none">
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={640}
            height={430}
            className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">
            {category}
          </div>
          <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">
            <Star
              aria-hidden="true"
              size={13}
              className="fill-[#FFA94D] text-[#FFA94D]"
            />
            {rating}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#B5B5B5]">
              <Clock3 aria-hidden="true" size={15} />
              {deliveryTime}-{deliveryTime + 4} min delivery
            </p>
          </div>
          <p className="rounded-full bg-[#FF6B00]/15 px-3 py-1 text-lg font-bold text-[#FFA94D]">
            ₹{price}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/menu/${id}`}
            className="flex-1 rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 text-center text-sm font-semibold text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.09]"
          >
            View details
          </Link>
          <button
            type="button"
            aria-label={`Add ${name} to cart`}
            className="grid size-12 place-items-center rounded-full bg-[#FF6B00] text-white shadow-[0_18px_40px_rgba(255,107,0,0.3)] transition duration-300 hover:scale-110 active:scale-95"
          >
            <Plus aria-hidden="true" size={19} />
          </button>
        </div>
      </div>
    </article>
  );
}
