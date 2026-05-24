"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-zinc-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/hero-image.webp')" }}
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="absolute top-0 left-0 w-full h-px bg-primary/70" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-4xl text-center">
        <div>
          <p className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.28em] text-primary">
            First Bite Club
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-4">
            Stock Up On <span className="text-primary">Valley Flavor</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Get 10% off your first order and hear first about limited batches,
            new flavors, and wholesale drops.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-grow">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 rounded-[4px] border-white/15 bg-white/8 text-white placeholder:text-zinc-500 focus-visible:ring-primary"
              />
            </div>
            <Button 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className="h-12 rounded-[4px] px-8 font-heading font-bold uppercase tracking-wider"
            >
              {status === "loading" ? (
                "Joining..."
              ) : status === "success" ? (
                "Welcome to the Club!"
              ) : (
                <>
                  Subscribe <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          
          <p className="text-xs text-zinc-600 mt-4 uppercase tracking-widest">
            We don&apos;t spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
