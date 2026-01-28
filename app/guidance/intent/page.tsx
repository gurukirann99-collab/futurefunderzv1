import { Suspense } from "react";
import GuidanceIntentContent from "./GuidanceIntentContent";

export default function GuidanceIntentPage() {
  return (
    <Suspense fallback={<Loading />}>
      <GuidanceIntentContent />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center text-[var(--muted)]">
      Loading guidance…
    </div>
  );
}
