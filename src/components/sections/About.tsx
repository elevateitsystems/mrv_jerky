"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const features = [
  "Handcrafted in Small Batches",
  "No Artificial Preservatives",
  "Sourced from Local Farms",
  "Marinated for 24 Hours",
];

export function About() {
  return (
    <section
      id="about"
      className="overflow-hidden border-y border-primary/20 bg-black py-20 text-white md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 -translate-x-4 translate-y-4 rounded-lg border border-primary/30 bg-primary/15" />

              <div
                className="absolute inset-0 overflow-hidden rounded-lg border border-white/10 bg-zinc-900 shadow-2xl"
              >
                <Image
                  src="/images/about-placeholder.png"
                  alt="MRV beef jerky ingredients and process"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="absolute -bottom-5 -right-3 flex h-28 w-28 rotate-12 flex-col items-center justify-center rounded-full border-4 border-black bg-primary text-primary-foreground shadow-lg md:-right-6 md:h-32 md:w-32">
                <span className="font-heading text-3xl font-bold uppercase leading-none">
                  100%
                </span>
                <span className="font-bold text-xs uppercase tracking-widest mt-1">
                  Premium
                </span>
              </div>
            </div>
          </div>

          <div
            className="w-full lg:w-1/2"
          >
            <p className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.28em] text-primary">
              Our Story
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-6">
              Real Ingredients. <span className="text-primary">Bold Flavor.</span>
            </h2>

            <p className="text-lg text-zinc-300 mb-6">
              Middle River Valley jerky is built around honest cuts, deep
              marinades, and the kind of smoke-forward flavor that feels right
              at home in mountain country.
            </p>

            <p className="text-lg text-zinc-300 mb-8">
              Every bag is crafted in small batches with premium beef, no
              fillers, and a patient process that keeps the texture tender and
              the flavor clean.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="font-bold text-lg text-white">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="h-12 rounded-[4px] px-8 font-heading font-bold uppercase tracking-wider"
            >
              Read Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
