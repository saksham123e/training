type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FoodDetails({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">🍽️ Food Details</h1>

      <p className="mt-4 text-2xl">Food ID: {id}</p>
    </main>
  );
}