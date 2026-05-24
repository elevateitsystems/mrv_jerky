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
      className="py-20 md:py-32 overflow-hidden bg-white dark:bg-zinc-900 border-t border-b border-border"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Side */}
          <div
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-primary/10 -translate-x-4 translate-y-4 rounded-xl" />

              <div
                className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 rounded-xl bg-cover bg-center shadow-2xl flex items-center justify-center border border-border"
                style={{
                  backgroundImage: "url('/images/about-placeholder.png')",
                }}
              >
                Brand / Process Image
                {/* <Image
                  src="/images/about-placeholder.png"
                  alt="Brand / Process Image"
                  width={400}
                  height={400}
                  className="sr-only h-60 w-60"
                /> */}
              </div>

              {/* Badge Overlay (এটা এখানেই থাকবে) */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground h-32 w-32 rounded-full flex flex-col items-center justify-center shadow-lg border-4 border-background rotate-12">
                <span className="font-heading text-3xl font-bold uppercase leading-none">
                  100%
                </span>
                <span className="font-bold text-xs uppercase tracking-widest mt-1">
                  Premium
                </span>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div
            className="w-full lg:w-1/2"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-6">
              Never Settle For <span className="text-primary">Average</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6">
              MRVJerky was born from a simple idea: beef jerky shouldn't taste
              like cardboard. We were tired of mass-produced, sugar-filled
              snacks masquerading as protein. So we decided to make it
              ourselves.
            </p>

            <p className="text-lg text-muted-foreground mb-8">
              Every bag is packed with thick, tender cuts of 100% premium beef,
              marinated to perfection, and slow-smoked for that bold flavor you
              crave. Fuel your next adventure with a snack that works as hard as
              you do.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="font-bold text-lg">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="font-bold uppercase tracking-wider rounded-none px-8"
            >
              Read Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
