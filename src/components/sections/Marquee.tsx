import { BadgeCheck, Dumbbell, Leaf, Mountain } from "lucide-react";

const benefits = [
  {
    title: "100% Premium Beef",
    text: "High-quality cuts, no compromises.",
    icon: BadgeCheck,
  },
  {
    title: "Real Ingredients",
    text: "No fillers, no junk. Just real flavor.",
    icon: Leaf,
  },
  {
    title: "High In Protein",
    text: "Fuel your day the right way.",
    icon: Dumbbell,
  },
  {
    title: "Made In Our Valley",
    text: "Crafted in small batches with care.",
    icon: Mountain,
  },
];

export function Marquee() {
  return (
    <section className="border-y border-primary/25 bg-black py-7 text-white">
      <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2 md:px-6 xl:grid-cols-4">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div key={benefit.title} className="flex items-center gap-4">
              <Icon className="h-10 w-10 shrink-0 text-primary md:h-12 md:w-12" strokeWidth={1.8} />
              <div>
                <h2 className="font-heading text-lg font-bold uppercase tracking-wide">
                  {benefit.title}
                </h2>
                <p className="mt-1 max-w-xs text-sm leading-6 text-zinc-300">
                  {benefit.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
