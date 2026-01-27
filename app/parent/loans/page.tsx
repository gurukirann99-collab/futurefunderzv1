"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ParentLoans() {
  const [loans, setLoans] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("loan_products")
      .select("*")
      .then(({ data }) => setLoans(data || []));
  }, []);

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold">Education Loans</h1>
      <p className="text-gray-600 mt-1">
        Compare education loan options for your child
      </p>

      <div className="mt-6 space-y-4">
        {loans.map(l => (
          <div key={l.id} className="border p-4 rounded">
            <p className="font-semibold">{l.bank}</p>
            <p>Interest: {l.interest_rate}%</p>
            <p>Max Amount: ₹{l.max_amount}</p>

            <Link href={`/loans/apply/${l.id}`}>
              <button className="mt-2 bg-black text-white px-4 py-1">
                Apply
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
