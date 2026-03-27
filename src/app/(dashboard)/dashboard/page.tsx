import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Dashboard",
};

export default async function CustomerDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  // Fetch bookings
  const { data: bookings, count: totalBookings } = await supabase
    .from("bookings")
    .select("*, vehicles(name, slug, images)", { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Count active rentals (status = confirmed or active)
  const { count: activeRentals } = await supabase
    .from("bookings")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .in("status", ["confirmed", "active"]);

  const firstName = profile?.full_name?.split(" ")[0] || "there";

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-white">
          Welcome back, <span className="text-gold">{firstName}</span>
        </h1>
        <p className="mt-1 text-white/50">
          Manage your bookings and account details.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Total Bookings</p>
          <p className="mt-1 text-3xl font-bold text-white">
            {totalBookings || 0}
          </p>
        </Card>
        <Card className="border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Active Rentals</p>
          <p className="mt-1 text-3xl font-bold text-gold">
            {activeRentals || 0}
          </p>
        </Card>
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Bookings</h2>
          {(totalBookings || 0) > 0 && (
            <Link
              href="/dashboard/bookings"
              className="text-sm text-gold hover:underline"
            >
              View All
            </Link>
          )}
        </div>

        {bookings && bookings.length > 0 ? (
          <div className="mt-4 space-y-3">
            {bookings.map((booking: any) => (
              <Card
                key={booking.id}
                className="flex items-center justify-between border-white/10 bg-white/5 p-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white truncate">
                    {booking.vehicles?.name || "Vehicle"}
                  </p>
                  <p className="mt-0.5 text-sm text-white/40">
                    {new Date(booking.start_date).toLocaleDateString()} -{" "}
                    {new Date(booking.end_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {booking.total_price && (
                    <span className="text-sm font-medium text-white/60">
                      ${Number(booking.total_price).toLocaleString()}
                    </span>
                  )}
                  <BookingStatusBadge status={booking.status} />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mt-4 border-white/10 bg-white/5 p-8 text-center">
            <p className="text-white/50">No bookings yet.</p>
            <p className="mt-1 text-sm text-white/30">
              Ready to experience something extraordinary?
            </p>
            <Link href="/fleet">
              <Button className="mt-4 bg-gold text-black hover:bg-gold/90">Browse Our Fleet</Button>
            </Link>
          </Card>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/fleet">
          <Card className="border-white/10 bg-white/5 p-5 transition-colors hover:border-gold/30">
            <p className="font-medium text-white">Browse Fleet</p>
            <p className="mt-1 text-sm text-white/40">
              Explore our collection of exotic vehicles.
            </p>
          </Card>
        </Link>
        <Link href="/dashboard/profile">
          <Card className="border-white/10 bg-white/5 p-5 transition-colors hover:border-gold/30">
            <p className="font-medium text-white">Update Profile</p>
            <p className="mt-1 text-sm text-white/40">
              Keep your account details current.
            </p>
          </Card>
        </Link>
      </div>
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
