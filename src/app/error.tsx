"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-gradient-gold font-heading text-9xl font-bold">
        Error
      </h1>
      <h2 className="mt-4 text-3xl font-semibold text-foreground">
        Something went wrong
      </h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        An unexpected error occurred. Please try again or return to the home
        page.
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={reset}>Try Again</Button>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    </div>
  )
}
