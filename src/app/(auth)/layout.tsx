import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 py-12">
      <Link
        href="/"
        className="font-heading mb-10 text-2xl font-bold tracking-widest text-white"
      >
        EXOTICS BY THE BAY
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
