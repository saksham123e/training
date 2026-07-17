"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="luxury-shell flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-serif text-5xl text-white">
        Something went wrong
      </h1>

      <p className="max-w-md text-[#B5B5B5]">
        {error.message}
      </p>

      <button
        onClick={reset}
        className="rounded-full bg-[#FF6B00] px-6 py-3 text-sm font-bold text-white transition hover:scale-105"
      >
        Try Again
      </button>
    </main>
  );
}
