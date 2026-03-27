import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-gradient-gold font-heading text-9xl font-bold">
        404
      </h1>
      <h2 className="mt-4 text-3xl font-semibold text-foreground">
        Page Not Found
      </h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
        <Link href="/fleet">
          <Button variant="outline">Browse Fleet</Button>
        </Link>
      </div>
    </div>
  )
}
