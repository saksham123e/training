import Image from "next/image";
import Link from "next/link";

type FoodCardProps = {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
};

export default function FoodCard({
  id,
  name,
  price,
  rating,
  image,
}: FoodCardProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg transition hover:scale-105 hover:shadow-xl">
      <Image
        src={image}
        alt={name}
        width={400}
        height={250}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold">{name}</h2>

        <p className="mt-2 text-orange-600 font-semibold">
          ₹{price}
        </p>

        <p className="mt-1">
          ⭐ {rating}
        </p>

        <Link
          href={`/menu/${id}`}
          className="mt-5 inline-block rounded-lg bg-orange-600 px-5 py-2 text-white transition hover:bg-orange-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}