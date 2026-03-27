import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  title: "Fleet Management",
};

export default async function AdminFleetPage() {
  const supabase = await createClient();

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*, brands(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Fleet Management
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Manage your vehicle inventory.
          </p>
        </div>
        <Link href="/admin/fleet/new">
          <Button className="bg-gold text-black font-semibold hover:bg-gold/90">Add Vehicle</Button>
        </Link>
      </div>

      {vehicles && vehicles.length > 0 ? (
        <Card className="border-white/10 bg-white/5 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/50">Vehicle</TableHead>
                <TableHead className="text-white/50">Category</TableHead>
                <TableHead className="text-white/50">Daily Rate</TableHead>
                <TableHead className="text-white/50">Status</TableHead>
                <TableHead className="text-right text-white/50">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle: any) => (
                <TableRow
                  key={vehicle.id}
                  className="border-white/5 hover:bg-white/5"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-16 overflow-hidden rounded bg-white/5">
                        {vehicle.images?.[0] ? (
                          <Image
                            src={vehicle.images[0]}
                            alt={vehicle.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-white/20">
                            No img
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{vehicle.name}</p>
                        <p className="text-xs text-white/40">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-white/60 capitalize">
                    {vehicle.category}
                  </TableCell>
                  <TableCell className="text-gold font-medium">
                    ${Number(vehicle.daily_rate).toLocaleString()}/day
                  </TableCell>
                  <TableCell>
                    <VehicleStatusBadge status={vehicle.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/fleet/${vehicle.id}/edit`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/10 text-white/60 hover:border-gold/30 hover:text-gold"
                        >
                          Edit
                        </Button>
                      </Link>
                      <DeleteVehicleButton vehicleId={vehicle.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/50">No vehicles in fleet.</p>
          <Link href="/admin/fleet/new">
            <Button className="mt-4 bg-gold text-black hover:bg-gold/90">Add Your First Vehicle</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}

function VehicleStatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    active: "bg-green-500/10 text-green-400 border-green-500/20",
    inactive: "bg-white/10 text-white/40 border-white/10",
    maintenance: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  };

  return (
    <Badge
      variant="outline"
      className={variants[status] || variants.inactive}
    >
      {status}
    </Badge>
  );
}

function DeleteVehicleButton({ vehicleId }: { vehicleId: string }) {
  return (
    <form
      action={async () => {
        "use server";
        const supabase = await createClient();
        await supabase.from("vehicles").delete().eq("id", vehicleId);
      }}
    >
      <Button
        variant="outline"
        size="sm"
        type="submit"
        className="border-red-500/20 text-red-400 hover:border-red-500/40 hover:bg-red-500/10"
      >
        Delete
      </Button>
    </form>
  );
}
