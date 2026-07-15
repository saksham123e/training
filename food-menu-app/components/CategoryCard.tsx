import Link from "next/link";

type CategoryCardProps = {
  name: string;
  emoji: string;
};

export default function CategoryCard({
  name,
  emoji,
}: CategoryCardProps) {
  return (
    <Link
      href={`/menu?category=${name.toLowerCase()}`}
      className="rounded-xl border bg-white p-6 text-center shadow transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="text-5xl">{emoji}</div>

      <h3 className="mt-4 text-xl font-semibold">
        {name}
      </h3>
    </Link>
  );
}