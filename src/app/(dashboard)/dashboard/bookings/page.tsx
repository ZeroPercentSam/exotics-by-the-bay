import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = {
  title: "My Bookings",
};

export default async function CustomerBookingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, vehicles(name, slug, images)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">
          My Bookings
        </h1>
        <p className="mt-1 text-sm text-white/50">
          View and manage all your reservations.
        </p>
      </div>

      {bookings && bookings.length > 0 ? (
        <>
          {/* Desktop Table */}
          <Card className="hidden border-white/10 bg-white/5 md:block">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
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
                    <TableCell className="font-medium text-white">
                      {booking.vehicles?.name || "Vehicle"}
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

          {/* Mobile Cards */}
          <div className="space-y-3 md:hidden">
            {bookings.map((booking: any) => (
              <Card
                key={booking.id}
                className="border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-white">
                      {booking.vehicles?.name || "Vehicle"}
                    </p>
                    <p className="mt-1 text-sm text-white/40">
                      {new Date(booking.start_date).toLocaleDateString()} -{" "}
                      {new Date(booking.end_date).toLocaleDateString()}
                    </p>
                  </div>
                  <BookingStatusBadge status={booking.status} />
                </div>
                {booking.total_price && (
                  <p className="mt-3 text-right text-sm font-medium text-white/60">
                    Total: ${Number(booking.total_price).toLocaleString()}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Card className="border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/50">No bookings yet.</p>
          <p className="mt-1 text-sm text-white/30">
            Browse our fleet and book your dream ride today.
          </p>
          <Link href="/fleet">
            <Button className="mt-4 bg-gold text-black hover:bg-gold/90">Browse Our Fleet</Button>
          </Link>
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
