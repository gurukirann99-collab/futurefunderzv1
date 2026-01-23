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
          
          <div className="border rounded p-6">
            <h2 className="font-semibold mb-2">🎓 Student</h2>
            <p className="text-sm text-gray-600">
              Understand your career stage and next steps
            </p>
          </div>

          <div className="border rounded p-6">
            <h2 className="font-semibold mb-2">🚀 Entrepreneur</h2>
            <p className="text-sm text-gray-600">
              Get clarity on your business stage and direction
            </p>
          </div>

          <div className="border rounded p-6">
            <h2 className="font-semibold mb-2">🧠 Mentor</h2>
            <p className="text-sm text-gray-600">
              Share experience and guide others (V1 limited)
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
