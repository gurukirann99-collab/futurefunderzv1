"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Not sure what to do next?
            <br />
            <span className="text-blue-600">
              We help you move forward.
            </span>
          </h1>

          <p className="text-lg text-gray-600">
            Whether you’re confused about your career, learning skills,
            or finding opportunities — FutureFunderz guides you step by step.
          </p>

          <Link
            href="/explore"
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
          >
            Get started
          </Link>
        </div>
      </section>

      {/* JOURNEY CARDS */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {/* CARD 1 */}
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4 border-t-4 border-blue-600">
            <div className="text-blue-600 text-2xl font-bold">01</div>
            <h3 className="text-xl font-semibold">Understand yourself</h3>
            <p className="text-sm text-gray-600">
              Get clarity on where you are, what interests you,
              and what direction makes sense — without pressure.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4 border-t-4 border-blue-600">
            <div className="text-blue-600 text-2xl font-bold">02</div>
            <h3 className="text-xl font-semibold">Build the right skills</h3>
            <p className="text-sm text-gray-600">
              Focus only on skills that actually help you grow,
              practice with real projects, and gain confidence.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4 border-t-4 border-blue-600">
            <div className="text-blue-600 text-2xl font-bold">03</div>
            <h3 className="text-xl font-semibold">Apply to opportunities</h3>
            <p className="text-sm text-gray-600">
              Move into internships, projects, and entry-level jobs
              when you’re ready — not before.
            </p>
          </div>
        </div>
      </section>

      {/* REASSURANCE CARD */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            This is not another course platform.
          </h2>
          <p className="text-gray-700">
            We don’t force decisions, sell false promises, or overwhelm you.
            You move forward only when you’re ready.
          </p>
        </div>
      </section>

      {/* FINAL CTA CARD */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-blue-600 rounded-2xl p-10 text-center space-y-6 text-white">
          <h2 className="text-3xl font-semibold">
            Take the first step today
          </h2>
          <p className="text-blue-100">
            No pressure. No confusion. Just guidance.
          </p>

          <Link
            href="/explore"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100"
          >
            Start exploring
          </Link>
        </div>
      </section>
    </main>
  );
}
