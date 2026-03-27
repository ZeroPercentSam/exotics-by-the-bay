"use client";

import { useRouter } from "next/navigation";

export function AdminBookingsFilter({
  statuses,
  activeStatus,
}: {
  statuses: string[];
  activeStatus: string;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => {
            const params = status === "all" ? "" : `?status=${status}`;
            router.push(`/admin/bookings${params}`);
          }}
          className={`rounded-lg border px-3 py-1.5 text-sm capitalize transition-all ${
            activeStatus === status
              ? "border-gold/30 bg-gold/10 text-gold"
              : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
