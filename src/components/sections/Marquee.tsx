import { Flame } from "lucide-react";

const benefits = [
  "100% Grass-Fed Beef",
  "High Protein",
  "Zero Added Sugar",
  "Gluten Free",
  "Keto Friendly",
  "No Nitrates",
  "Bold Flavor",
  "Made in USA",
];

// Duplicate the array to create a seamless infinite loop
const marqueeItems = [...benefits, ...benefits, ...benefits, ...benefits];

export function Marquee() {
  return (
    <div className="w-full bg-primary text-primary-foreground py-4 overflow-hidden flex items-center border-y-4 border-black">
      <div className="flex w-max items-center gap-12">
        {marqueeItems.map((benefit, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="font-heading text-xl md:text-2xl font-bold tracking-wider whitespace-nowrap">
              {benefit}
            </span>
            <Flame className="h-6 w-6 text-black" fill="currentColor" />
          </div>
        ))}
      </div>
    </div>
  );
}
