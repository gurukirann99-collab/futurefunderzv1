import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-16 py-6 text-center text-sm bg-[var(--bg)] text-[var(--muted)]">
      <div className="flex justify-center gap-6">
        <Link
          href="/privacy"
          className="hover:underline text-[var(--text)]"
        >
          Privacy Policy
        </Link>

        <Link
          href="/terms"
          className="hover:underline text-[var(--text)]"
        >
          Terms of Service
        </Link>

        <Link
          href="/contact"
          className="hover:underline text-[var(--text)]"
        >
          Contact
        </Link>
      </div>

      <p className="mt-4 text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} FutureFunderz. All rights reserved.
      </p>
    </footer>
  );
}
