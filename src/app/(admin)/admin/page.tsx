import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch counts in parallel
  const [vehiclesRes, bookingsRes, customersRes, leadsRes] = await Promise.all([
    supabase.from("vehicles").select("id", { count: "exact", head: true }),
    supabase.from("bookings").select("id", { count: "exact", head: true }),
    supabase
      .from("user_profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "customer"),
    supabase.from("leads").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      label: "Total Vehicles",
      value: vehiclesRes.count || 0,
      color: "text-gold",
    },
    {
      label: "Total Bookings",
      value: bookingsRes.count || 0,
      color: "text-green-400",
    },
    {
      label: "Total Customers",
      value: customersRes.count || 0,
      color: "text-blue-400",
    },
    {
      label: "Total Leads",
      value: leadsRes.count || 0,
      color: "text-purple-400",
    },
  ];

  // Recent leads
  const { data: recentLeads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  // Recent bookings
  const { data: recentBookings } = await supabase
    .from("bookings")
    .select("*, vehicles(name), user_profiles(full_name, email)")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-white">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-white/50">Overview of your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="border-white/10 bg-white/5 p-6"
          >
            <p className="text-sm text-white/50">{stat.label}</p>
            <p className={`mt-1 text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Bookings */}
        <Card className="border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Recent Bookings</h2>
          {recentBookings && recentBookings.length > 0 ? (
            <div className="mt-4 space-y-3">
              {recentBookings.map((booking: any) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {booking.user_profiles?.full_name ||
                        booking.user_profiles?.email ||
                        "Customer"}
                    </p>
                    <p className="text-xs text-white/40">
                      {booking.vehicles?.name || "Vehicle"} &middot;{" "}
                      {new Date(booking.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      booking.status === "confirmed"
                        ? "border-green-500/20 bg-green-500/10 text-green-400"
                        : booking.status === "active"
                          ? "border-gold/20 bg-gold/10 text-gold"
                          : "border-white/10 bg-white/5 text-white/50"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-white/40">No recent bookings.</p>
          )}
        </Card>

        {/* Recent Leads */}
        <Card className="border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Recent Leads</h2>
          {recentLeads && recentLeads.length > 0 ? (
            <div className="mt-4 space-y-3">
              {recentLeads.map((lead: any) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {lead.name || lead.email}
                    </p>
                    <p className="text-xs text-white/40">
                      {lead.phone || lead.email} &middot;{" "}
                      {new Date(lead.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {lead.vehicle_interest && (
                    <span className="text-xs text-white/30 truncate ml-2 max-w-[120px]">
                      {lead.vehicle_interest}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-white/40">No recent leads.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
