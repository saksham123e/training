"use client";

import { Trash2 } from "lucide-react";
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

      alert("Food deleted successfully.");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete food.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FF4D4F]/30 bg-[#FF4D4F]/10 px-4 py-2 text-sm font-semibold text-[#ff8587] transition duration-300 hover:scale-105 hover:border-[#FF4D4F]/50 hover:bg-[#FF4D4F]/18 active:scale-95"
    >
      <Trash2 aria-hidden="true" size={15} />
      Delete
    </button>
  );
}
