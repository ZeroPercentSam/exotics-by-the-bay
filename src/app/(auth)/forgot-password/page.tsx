"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur">
        <div className="text-center">
          <h1 className="font-heading mb-4 text-2xl font-bold text-[#fbdd2f]">
            Check Your Email
          </h1>
          <p className="text-sm text-zinc-400">
            If an account exists for{" "}
            <span className="font-medium text-white">{email}</span>, we&apos;ve
            sent a password reset link.
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
          Reset Password
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        Remember your password?{" "}
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
