export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-3xl mx-auto p-6 space-y-6 text-[var(--text)]">
        <h1 className="text-3xl font-bold">
          Privacy Policy
        </h1>

        <p className="text-sm text-[var(--muted)]">
          Last updated: {new Date().toDateString()}
        </p>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">
            1. Introduction
          </h2>
          <p className="text-sm text-[var(--muted)]">
            FutureFunderz respects your privacy. This policy explains how we
            collect, use, and protect your personal information while you use
            our platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">
            2. Information We Collect
          </h2>
          <ul className="list-disc list-inside text-sm text-[var(--muted)] space-y-1">
            <li>Email address and login credentials</li>
            <li>Role selection (Student / Entrepreneur / Mentor)</li>
            <li>Career and business assessment inputs</li>
            <li>Mentor profile details (for mentors)</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-sm text-[var(--muted)] space-y-1">
            <li>To personalize your dashboard and journey</li>
            <li>To provide guidance based on your inputs</li>
            <li>To enable mentor requests and responses</li>
            <li>To improve platform reliability and security</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">
            4. Data Sharing
          </h2>
          <p className="text-sm text-[var(--muted)]">
            We do not sell your personal data. Your information is shared only
            when necessary to deliver platform features (for example, mentor
            requests).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">
            5. Data Security
          </h2>
          <p className="text-sm text-[var(--muted)]">
            We use industry-standard security practices and Supabase
            authentication to protect your data from unauthorized access.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">
            6. Your Rights
          </h2>
          <ul className="list-disc list-inside text-sm text-[var(--muted)] space-y-1">
            <li>You can update your profile information</li>
            <li>You can request account deletion</li>
            <li>You can contact us for data-related questions</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">
            7. Changes to This Policy
          </h2>
          <p className="text-sm text-[var(--muted)]">
            This privacy policy may be updated as the platform evolves. Any
            significant changes will be communicated clearly.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">
            8. Contact
          </h2>
          <p className="text-sm text-[var(--muted)]">
            If you have questions about this policy, please contact us at:
            <br />
            <span className="font-medium text-[var(--text)]">
              support@futurefunderz.com
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}
