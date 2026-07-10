import Counter from "@/components/Counter";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">
        🍕 Food Menu App
      </h1>

      <Counter />
    </main>
  );
}