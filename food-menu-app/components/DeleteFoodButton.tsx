"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function DeleteFoodButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/foods/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      alert("✅ Food Deleted Successfully!");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete food.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
    >
      Delete
    </button>
  );
}