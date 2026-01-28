import Link from "next/link";

export default function GuidanceCTA({ text }: { text: string }) {
  return (
    <div className="border-t pt-6 text-center space-y-3">
      <p className="text-sm text-[var(--muted)]">
        Not sure what’s right for you?
      </p>

      <Link
        href="/guidance/intent"
        className="inline-block bg-[var(--primary)]
                   text-white px-6 py-3 rounded-xl
                   font-medium hover:opacity-90"
      >
        {text} →
      </Link>
    </div>
  );
}
