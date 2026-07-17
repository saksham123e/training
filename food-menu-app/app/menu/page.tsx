import MenuBrowser from "@/components/MenuBrowser";
import { categories } from "@/lib/categories";

type MenuPageProps = {
  searchParams: Promise<{
    category?: string | string[];
  }>;
};

function getInitialCategory(category: string | string[] | undefined) {
  const value = Array.isArray(category) ? category[0] : category;

  if (!value) {
    return "All";
  }

  return (
    categories.find(
      (item) => item.name.toLowerCase() === value.toLowerCase()
    )?.name ?? "All"
  );
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const { category } = await searchParams;
  const categoryNames = categories.map((item) => item.name);

  return (
    <main className="bg-[#0B0B0C] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <MenuBrowser
          categories={categoryNames}
          initialCategory={getInitialCategory(category)}
        />
      </div>
    </main>
  );
}
