"use client";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0 bg-zinc-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
        <div>
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-bold tracking-wider uppercase mb-6">
            100% Premium Grass-Fed Beef
          </span>
        </div>

        <h1
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase text-white mb-6 drop-shadow-lg"
        >
          Fuel Your <span className="text-primary">Bold</span>
        </h1>

        <p
          className="text-lg md:text-xl text-zinc-300 max-w-2xl mb-10 drop-shadow-md"
        >
          High protein, zero sugar, and crafted with mouth-watering flavors. 
          The ultimate snack for those who demand more from their jerky.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" className="font-bold uppercase tracking-wider text-md px-8 py-6 rounded-none shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]">
            Shop Best Sellers
          </Button>
          <Button size="lg" variant="outline" className="font-bold uppercase tracking-wider text-md px-8 py-6 rounded-none text-white border-white hover:bg-white hover:text-black">
            Explore Flavors
          </Button>
        </div>
      </div>
    </section>
  );
}
