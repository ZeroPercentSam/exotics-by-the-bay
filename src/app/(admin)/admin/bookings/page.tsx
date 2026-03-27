import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminBookingsFilter } from "./BookingsFilter";

export const metadata = {
  title: "Bookings Management",
};

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("bookings")
    .select("*, vehicles(name), user_profiles(full_name, email)")
    .order("created_at", { ascending: false });

  if (params.status && params.status !== "all") {
    query = query.eq("status", params.status);
  }

  const { data: bookings } = await query;

  const statuses = ["all", "pending", "confirmed", "active", "completed", "cancelled"];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">
          Bookings
        </h1>
        <p className="mt-1 text-sm text-white/50">
          View and manage all reservations.
        </p>
      </div>

      {/* Status Filter Tabs */}
      <AdminBookingsFilter
        statuses={statuses}
        activeStatus={params.status || "all"}
      />

      {bookings && bookings.length > 0 ? (
        <Card className="border-white/10 bg-white/5 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/50">Customer</TableHead>
                <TableHead className="text-white/50">Vehicle</TableHead>
                <TableHead className="text-white/50">Start Date</TableHead>
                <TableHead className="text-white/50">End Date</TableHead>
                <TableHead className="text-white/50">Status</TableHead>
                <TableHead className="text-right text-white/50">
                  Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking: any) => (
                <TableRow
                  key={booking.id}
                  className="border-white/5 hover:bg-white/5"
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">
                        {booking.user_profiles?.full_name || "Customer"}
                      </p>
                      <p className="text-xs text-white/40">
                        {booking.user_profiles?.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/60">
                    {booking.vehicles?.name || "---"}
                  </TableCell>
                  <TableCell className="text-white/60">
                    {new Date(booking.start_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-white/60">
                    {new Date(booking.end_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <BookingStatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell className="text-right text-white/60">
                    {booking.total_price
                      ? `$${Number(booking.total_price).toLocaleString()}`
                      : "---"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/50">
            No bookings found
            {params.status && params.status !== "all"
              ? ` with status "${params.status}".`
              : "."}
          </p>
        </Card>
      )}
    </div>
  );
}

function BookingStatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
    active: "bg-gold/10 text-gold border-gold/20",
    completed: "bg-white/10 text-white/60 border-white/10",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <Badge
      variant="outline"
      className={variants[status] || variants.pending}
    >
      {status}
    </Badge>
  );
}
