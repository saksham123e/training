"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="mt-6 text-center">
      <h2 className="text-2xl font-bold">
        Count: {count}
      </h2>

      <button
        onClick={() => setCount(count + 1)}
        className="mt-4 rounded bg-orange-600 px-4 py-2 text-white"
      >
        Increase
      </button>
    </div>
  );
}