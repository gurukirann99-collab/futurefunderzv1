import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">FutureFunderz</h1>
      <p className="text-gray-600">Career to Capital. One journey.</p>
      <h1 className="text-6xl font-bold text-green-600">   Tailwind Fully Working ✅ </h1>

      <Link
        href="/signup"
        className="px-6 py-3 bg-black text-white rounded"
      >
        Start Free
      </Link>
    </main>
  );
}
