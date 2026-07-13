"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm({ origins, destinations }) {
  const router = useRouter();
  const [originId, setOriginId] = useState("");
  const [destinationId, setDestinationId] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (originId) params.set("originId", originId);
    if (destinationId) params.set("destinationId", destinationId);
    router.push(`/?${params.toString()}`);
  }
  return (
    <div className="mx-auto -mt-6 flex max-w-3xl flex-col gap-3 rounded-xl bg-white p-4 shadow-md sm:flex-row">
      <select
        value={originId}
        onChange={(e) => setOriginId(e.target.value)}
        className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-right text-sm outline-none focus:border-green-500"
      >
        <option value="">مبدا</option>
        {origins.map((origin) => (
          <option key={origin.id} value={origin.id}>
            {origin.name}
          </option>
        ))}
      </select>

      <select
        value={destinationId}
        onChange={(e) => setDestinationId(e.target.value)}
        className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-right text-sm outline-none focus:border-green-500"
      >
        <option value="">مقصد</option>
        {destinations.map((destination) => (
          <option key={destination.id} value={destination.id}>
            {destination.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="تاریخ"
        className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-right text-sm outline-none focus:border-green-500"
      />

      <button
        onClick={handleSearch}
        className="rounded-lg bg-green-600 px-6 py-2 text-sm text-white hover:bg-green-700"
      >
        جستجو
      </button>
    </div>
  );
}