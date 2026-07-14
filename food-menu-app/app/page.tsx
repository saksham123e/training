import Hero from "@/components/Hero";
import FoodCard from "@/components/FoodCard";
import { foods } from "@/data/foods";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-10 text-center text-4xl font-bold">
          🔥 Featured Foods
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
            <FoodCard
              key={food.id}
              id={food.id}
              name={food.name}
              price={food.price}
              rating={food.rating}
              image={food.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
}