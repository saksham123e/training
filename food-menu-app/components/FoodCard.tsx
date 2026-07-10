type FoodCardProps = {
  name: string;
  price: number;
  emoji: string;
};

export default function FoodCard({ name, price, emoji }: FoodCardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-md">
      <div className="text-4xl">{emoji}</div>
      <h2 className="mt-3 text-xl font-bold text-gray-900">{name}</h2>
      <p className="mt-1 text-orange-600 font-semibold">₹{price}</p>
    </div>
  );
}