import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-16 py-6 text-center text-sm text-gray-600">
      <div className="flex justify-center gap-6">
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>

        <Link href="/terms" className="hover:underline">
          Terms of Service
        </Link>

        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        © {new Date().getFullYear()} FutureFunderz. All rights reserved.
      </p>
    </footer>
  );
}
