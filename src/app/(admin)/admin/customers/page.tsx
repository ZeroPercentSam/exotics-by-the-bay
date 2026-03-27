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

export const metadata = {
  title: "Customers",
};

export default async function AdminCustomersPage() {
  const supabase = await createClient();

  const { data: customers } = await supabase
    .from("user_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">
          Customers
        </h1>
        <p className="mt-1 text-sm text-white/50">
          All registered users and their roles.
        </p>
      </div>

      {customers && customers.length > 0 ? (
        <Card className="border-white/10 bg-white/5 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/50">Name</TableHead>
                <TableHead className="text-white/50">Email</TableHead>
                <TableHead className="text-white/50">Phone</TableHead>
                <TableHead className="text-white/50">Role</TableHead>
                <TableHead className="text-white/50">Signed Up</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer: any) => (
                <TableRow
                  key={customer.id}
                  className="border-white/5 hover:bg-white/5"
                >
                  <TableCell className="font-medium text-white">
                    {customer.full_name || "---"}
                  </TableCell>
                  <TableCell className="text-white/60">
                    {customer.email}
                  </TableCell>
                  <TableCell className="text-white/60">
                    {customer.phone || "---"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        customer.role === "admin"
                          ? "border-gold/30 bg-gold/10 text-gold"
                          : "border-white/10 bg-white/5 text-white/50"
                      }
                    >
                      {customer.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white/40">
                    {customer.created_at
                      ? new Date(customer.created_at).toLocaleDateString()
                      : "---"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/50">No customers found.</p>
        </Card>
      )}
    </div>
  );
}
