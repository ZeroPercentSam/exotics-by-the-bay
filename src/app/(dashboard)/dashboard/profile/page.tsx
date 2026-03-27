"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ProfileData {
  full_name: string;
  email: string;
  phone: string;
  drivers_license_number: string;
  drivers_license_state: string;
  drivers_license_expiry: string;
  insurance_provider: string;
  insurance_policy_number: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [form, setForm] = useState<ProfileData>({
    full_name: "",
    email: "",
    phone: "",
    drivers_license_number: "",
    drivers_license_state: "",
    drivers_license_expiry: "",
    insurance_provider: "",
    insurance_policy_number: "",
  });

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setForm({
          full_name: profile.full_name || "",
          email: profile.email || user.email || "",
          phone: profile.phone || "",
          drivers_license_number: profile.drivers_license_number || "",
          drivers_license_state: profile.drivers_license_state || "",
          drivers_license_expiry: profile.drivers_license_expiry || "",
          insurance_provider: profile.insurance_provider || "",
          insurance_policy_number: profile.insurance_policy_number || "",
        });
      }

      setLoading(false);
    }

    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("user_profiles")
      .update({
        full_name: form.full_name,
        phone: form.phone,
        drivers_license_number: form.drivers_license_number,
        drivers_license_state: form.drivers_license_state,
        drivers_license_expiry: form.drivers_license_expiry || null,
        insurance_provider: form.insurance_provider,
        insurance_policy_number: form.insurance_policy_number,
      })
      .eq("id", user.id);

    setSaving(false);

    if (error) {
      setMessage({ type: "error", text: "Failed to update profile. Please try again." });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully." });
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
        <Card className="border-white/10 bg-white/5 p-6">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded bg-white/10" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Profile</h1>
        <p className="mt-1 text-sm text-white/50">
          Update your account information.
        </p>
      </div>

      {message && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            message.type === "success"
              ? "border-green-500/20 bg-green-500/10 text-green-400"
              : "border-red-500/20 bg-red-500/10 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <Card className="border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">
            Personal Information
          </h2>
          <Separator className="my-4 bg-white/10" />

          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name" className="text-white/70">
                Full Name
              </Label>
              <Input
                id="full_name"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white/70">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={form.email}
                readOnly
                className="mt-1.5 border-white/10 bg-white/5 text-white/40 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-white/30">
                Email cannot be changed here.
              </p>
            </div>

            <div>
              <Label htmlFor="phone" className="text-white/70">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                placeholder="(813) 555-0123"
              />
            </div>
          </div>
        </Card>

        {/* Driver's License */}
        <Card className="border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">
            Driver&apos;s License
          </h2>
          <Separator className="my-4 bg-white/10" />

          <div className="space-y-4">
            <div>
              <Label htmlFor="drivers_license_number" className="text-white/70">
                License Number
              </Label>
              <Input
                id="drivers_license_number"
                name="drivers_license_number"
                value={form.drivers_license_number}
                onChange={handleChange}
                className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                placeholder="DL-123456789"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label
                  htmlFor="drivers_license_state"
                  className="text-white/70"
                >
                  Issuing State
                </Label>
                <Input
                  id="drivers_license_state"
                  name="drivers_license_state"
                  value={form.drivers_license_state}
                  onChange={handleChange}
                  className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                  placeholder="FL"
                />
              </div>

              <div>
                <Label
                  htmlFor="drivers_license_expiry"
                  className="text-white/70"
                >
                  Expiry Date
                </Label>
                <Input
                  id="drivers_license_expiry"
                  name="drivers_license_expiry"
                  type="date"
                  value={form.drivers_license_expiry}
                  onChange={handleChange}
                  className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Insurance */}
        <Card className="border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">
            Insurance Information
          </h2>
          <Separator className="my-4 bg-white/10" />

          <div className="space-y-4">
            <div>
              <Label htmlFor="insurance_provider" className="text-white/70">
                Insurance Provider
              </Label>
              <Input
                id="insurance_provider"
                name="insurance_provider"
                value={form.insurance_provider}
                onChange={handleChange}
                className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                placeholder="State Farm, Geico, etc."
              />
            </div>

            <div>
              <Label
                htmlFor="insurance_policy_number"
                className="text-white/70"
              >
                Policy Number
              </Label>
              <Input
                id="insurance_policy_number"
                name="insurance_policy_number"
                value={form.insurance_policy_number}
                onChange={handleChange}
                className="mt-1.5 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                placeholder="POL-123456"
              />
            </div>
          </div>
        </Card>

        <Button
          type="submit"
          disabled={saving}
          className="w-full bg-gold text-black font-semibold hover:bg-gold/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
