import ExploreCTA from "@/app/components/ExploreCTA";

export default function ExploreEntrepreneur() {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Explore Entrepreneurship</h1>
        <p className="text-[var(--muted)]">
          Build a business step by step — without confusion.
        </p>
      </header>

      <section className="space-y-4">
        {[
          "Idea validation",
          "Skill readiness",
          "Business registration",
          "First revenue",
          "Scale & funding",
        ].map((step, i) => (
          <div
            key={step}
            className="border rounded-xl p-5 bg-[var(--card)]"
          >
            <strong>Step {i + 1}:</strong> {step}
          </div>
        ))}
      </section>

      <ExploreCTA
        label="Continue as Entrepreneur"
        intent="explore_entrepreneur"
      />
    </div>
  );
}
