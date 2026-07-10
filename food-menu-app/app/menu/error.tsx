"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-red-600">
        ❌ Something went wrong!
      </h1>

      <p className="text-gray-600">
        {error.message}
      </p>

      <button
        onClick={reset}
        className="rounded bg-orange-600 px-4 py-2 text-white"
      >
        Try Again
      </button>
    </main>
  );
}