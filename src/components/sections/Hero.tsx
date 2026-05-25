"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[650px] h-[86vh] flex items-end overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-image.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/55" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-8 md:px-6 md:pb-12 lg:pb-16">
        <div className="flex max-w-5xl flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
          <div className="relative size-52 shrink-0 md:h-72 md:w-72 lg:h-80 lg:w-80">
            <Image
              src="/images/logo1.png"
              alt="MRV Beef Jerky Company logo"
              fill
              className="object-contain drop-shadow-[0_18px_38px_rgba(0,0,0,0.75)]"
              priority
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 288px, 160px"
            />
          </div>

          <div className="max-w-xl">
          <span className="inline-flex border border-primary/60 bg-black/60 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-primary shadow-[0_0_24px_rgba(110,75,174,0.35)] backdrop-blur">
            Middle River Valley Beef Jerky
          </span>

          <h1 className="mt-5 font-heading text-4xl font-bold uppercase leading-[0.95] tracking-wide text-white drop-shadow-xl md:text-6xl lg:text-7xl">
            Real Ingredients.
            <span className="block text-primary">Bold Flavor.</span>
          </h1>

          <div className="my-5 flex max-w-md items-center gap-3 text-primary">
            <span className="h-px flex-1 bg-white/40" />
            <span className="h-2 w-2 rotate-45 bg-primary" />
            <span className="h-px flex-1 bg-white/40" />
          </div>

          <p className="max-w-md text-base font-medium leading-7 text-white/90 md:text-lg">
            Premium beef jerky made the right way. No shortcuts. No fillers.
            Just real flavor from our valley to you.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="h-12 rounded-[4px] px-7 font-heading text-base font-bold uppercase tracking-wider shadow-[0_0_26px_rgba(110,75,174,0.55)]">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-[4px] border-white/45 bg-black/40 px-7 font-heading text-base font-bold uppercase tracking-wider text-white backdrop-blur hover:bg-white hover:text-black">
              Our Story
            </Button>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
