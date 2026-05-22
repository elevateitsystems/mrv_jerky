"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-4">
            Join The <span className="text-primary">Bold</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter and get 10% off your first order. 
            Plus, be the first to know about new flavors and exclusive drops.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-grow">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 bg-white/5 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-primary rounded-none"
              />
            </div>
            <Button 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className="h-12 px-8 font-bold uppercase tracking-wider rounded-none"
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
            We don't spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
