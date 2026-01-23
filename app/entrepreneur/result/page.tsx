"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type Guidance = {
  title: string;
  steps: string[];
};

const guidanceMap: Record<string, Guidance> = {
  idea: {
    title: "Idea Stage",
    steps: [
      "Validate the problem you are solving",
      "Talk to potential customers",
      "Build a simple MVP",
      "Avoid spending money too early",
    ],
  },
  early_revenue: {
    title: "Early Revenue Stage",
    steps: [
      "Stabilize your revenue streams",
      "Track income and expenses",
      "Start basic compliance planning",
      "Improve customer retention",
    ],
  },
  registered: {
    title: "Registered Business Stage",
    steps: [
      "Ensure statutory compliances",
      "Set up proper accounting",
      "Explore funding or subsidies",
      "Build a growth roadmap",
    ],
  },
  scaling: {
    title: "Scaling Stage",
    steps: [
      "Strengthen operations and team",
      "Prepare investor-ready documents",
      "Optimize cash flow",
      "Explore VC / strategic funding",
    ],
  },
};

export default function EntrepreneurResultPage() {
  const router = useRouter();
  const [stage, setStage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResult = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("entrepreneur_stages")
        .select("business_stage")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error || !data || data.length === 0) {
        router.push("/entrepreneur/stage");
        return;
      }

      setStage(data[0].business_stage);
      setLoading(false);
    };

    loadResult();
  }, [router]);

  if (loading || !stage) {
    return <p className="p-8">Loading your business snapshot...</p>;
  }

  const guidance = guidanceMap[stage];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md border p-6 rounded space-y-4">
        <h1 className="text-2xl font-bold text-center">
          {guidance.title}
        </h1>

        <p className="text-sm text-gray-600 text-center">
          Based on your current business stage
        </p>

        <div className="border-t pt-4">
          <p className="font-medium mb-2">Recommended next steps:</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            {guidance.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-4 text-sm text-gray-600">
          🚀 More tools like compliance, funding & mentors will unlock soon
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-4 border py-2 rounded"
        >
          Back to Dashboard
        </button>
      
      </div>

    </div>
  );
}
