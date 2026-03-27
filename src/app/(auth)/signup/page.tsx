"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Insert into user_profiles table
    if (data.user) {
      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert({
          id: data.user.id,
          full_name: fullName,
          email,
          phone,
        });

      if (profileError) {
        console.error("Profile creation error:", profileError.message);
        // Don't block signup if profile insert fails — it can be retried
      }
    }

    // If email confirmation is required, show success message
    if (data.user && !data.session) {
      setSuccess(true);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur">
        <div className="text-center">
          <h1 className="font-heading mb-4 text-2xl font-bold text-[#fbdd2f]">
            Check Your Email
          </h1>
          <p className="text-sm text-zinc-400">
            We&apos;ve sent a confirmation link to{" "}
            <span className="font-medium text-white">{email}</span>. Please
            click the link to verify your account.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block text-sm font-medium text-[#fbdd2f] hover:text-[#fbdd2f]/80"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur">
      <div className="mb-8 text-center">
        <h1 className="font-heading bg-gradient-to-r from-[#fbdd2f] to-amber-400 bg-clip-text text-3xl font-bold text-transparent">
          Create Account
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Join the exclusive Exotics By The Bay experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-zinc-300">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="border-zinc-700 bg-zinc-800/50 text-white placeholder:text-zinc-500 focus-visible:border-[#fbdd2f]/50 focus-visible:ring-[#fbdd2f]/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-zinc-300">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-zinc-700 bg-zinc-800/50 text-white placeholder:text-zinc-500 focus-visible:border-[#fbdd2f]/50 focus-visible:ring-[#fbdd2f]/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-zinc-300">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-zinc-700 bg-zinc-800/50 text-white placeholder:text-zinc-500 focus-visible:border-[#fbdd2f]/50 focus-visible:ring-[#fbdd2f]/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-zinc-300">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="border-zinc-700 bg-zinc-800/50 text-white placeholder:text-zinc-500 focus-visible:border-[#fbdd2f]/50 focus-visible:ring-[#fbdd2f]/20"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="h-10 w-full bg-[#fbdd2f] text-zinc-900 hover:bg-[#fbdd2f]/90 font-semibold"
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[#fbdd2f] hover:text-[#fbdd2f]/80"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
