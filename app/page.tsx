import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      {/* HERO */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-3xl font-bold mb-4">
          FutureFunderz
        </h1>

        <p className="text-gray-600 max-w-xl mb-10">
          A simple platform to help students, entrepreneurs, and mentors
          navigate their journey — step by step.
        </p>

        {/* ROLE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-10">
          
          <Link
          href="/student/assessment"
          className="block border p-4 rounded hover:bg-gray-100">
          <p className="font-medium">🎓 Career Assessment</p>
          <p className="text-sm text-gray-600">
          Understand your career clarity
          </p>
          </Link>

          <Link
            href="/entrepreneur/stage"
            className="block border p-4 rounded hover:bg-gray-100">
            <p className="font-medium">🚀 Business Stage</p>
            <p className="text-sm text-gray-600">
            Tell us where your business stands
            </p>
          </Link>


          <div className="border p-4 rounded bg-gray-50 opacity-70 cursor-not-allowed">
          <p className="font-medium">🧠 Mentor Guidance</p>
          <p className="text-sm text-gray-600">
            Coming soon
            </p>
          </div>

        </div>

        {/* CTA */}
        <Link
          href="/signup"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Start Free
        </Link>
      </main>

      {/* FOOTER */}
      <footer className="border-t text-center text-sm text-gray-500 py-4">
        <p>
          © {new Date().getFullYear()} FutureFunderz ·
          <span className="mx-2">About</span>·
          <span className="mx-2">Contact</span>·
          <span className="mx-2">Privacy</span>
        </p>
      </footer>
    </div>
  );
}
