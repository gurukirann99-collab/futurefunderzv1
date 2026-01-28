"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center space-y-4">
          <h1 className="text-4xl font-bold">Contact FutureFunderz</h1>
          <p className="text-lg opacity-90">
            Questions, partnerships, institutions, or support — we’re here.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">

          {/* LEFT: INFO */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                Let’s talk
              </h2>
              <p className="text-[var(--muted)]">
                FutureFunderz is building India’s life-path platform —
                education, skills, jobs, and entrepreneurship in one place.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <InfoRow icon="📧" label="Email" value="support@futurefunderz.com" />
              <InfoRow icon="📍" label="Region" value="India" />
              <InfoRow icon="🤝" label="Partnerships" value="partners@futurefunderz.com" />
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <h3 className="font-medium mb-2">Who should contact us?</h3>
              <ul className="text-sm text-[var(--muted)] space-y-1">
                <li>• Parents & students with questions</li>
                <li>• Schools, colleges & institutions</li>
                <li>• Training partners & educators</li>
                <li>• Employers & recruiters</li>
                <li>• Startup & ecosystem partners</li>
              </ul>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="bg-[var(--card)] border border-[var(--border)]
                          rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-6">
              Send us a message
            </h3>

            <form className="space-y-5">
              <Input label="Full name" placeholder="Your name" />
              <Input label="Email address" placeholder="you@email.com" />
              <Input label="Phone (optional)" placeholder="+91 XXXXX XXXXX" />

              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us how we can help…"
                  className="w-full border border-[var(--border)]
                             bg-[var(--bg)] rounded-lg px-3 py-2
                             text-sm focus:outline-none focus:ring-2
                             focus:ring-[var(--primary)]"
                />
              </div>

              <button
                type="button"
                className="w-full bg-[var(--primary)] text-white
                           py-3 rounded-lg font-medium hover:opacity-90"
              >
                Send message
              </button>

              <p className="text-xs text-[var(--muted)] text-center">
                We usually respond within 24–48 hours.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="py-20 bg-[var(--card)] text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Want to start your journey instead?
        </h2>
        <Link
          href="/guidance/explore"
          className="inline-block bg-[var(--primary)]
                     text-white px-8 py-3 rounded-xl font-medium"
        >
          Explore FutureFunderz →
        </Link>
      </section>

    </main>
  );
}

/* =====================
   SMALL COMPONENTS
===================== */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <div>
        <div className="text-xs text-[var(--muted)]">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full border border-[var(--border)]
                   bg-[var(--bg)] rounded-lg px-3 py-2
                   text-sm focus:outline-none focus:ring-2
                   focus:ring-[var(--primary)]"
      />
    </div>
  );
}
