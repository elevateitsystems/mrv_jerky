"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-8 text-center shadow-lg">
        
        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <Check className="h-8 w-8 text-green-500" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Order Confirmed
        </h2>

        {/* Subtitle */}
        <p className="text-zinc-400 text-sm mb-6">
          Your order has been successfully received. We’ll start processing it soon.
        </p>

        {/* Button */}
        <Button
          onClick={() => router.push("/")}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}