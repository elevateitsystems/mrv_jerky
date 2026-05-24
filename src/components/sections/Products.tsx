"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

// Mock data for up to 8 products as requested
const products = [
  {
    id: 1,
    name: "Original Beef Jerky",
    price: "$7.99",
    weight: "2 oz",
    image: "/images/img1.jpeg",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Spicy Jalapeño",
    price: "$7.99",
    weight: "2 oz",
    image: "/images/img2.jpeg",
  },
  {
    id: 3,
    name: "Teriyaki Blast",
    price: "$7.99",
    weight: "2 oz",
    image: "/images/img3.jpeg",
  },
  {
    id: 4,
    name: "Black Pepper",
    price: "$7.99",
    weight: "2 oz",
    image: "/images/img4.jpeg",
  },
  {
    id: 5,
    name: "Habanero Heat",
    price: "$8.99",
    weight: "2 oz",
    image: "/images/img5.jpeg",
    tag: "New",
  },
  {
    id: 6,
    name: "Sweet & Spicy",
    price: "$7.99",
    weight: "2 oz",
    image: "/images/img6.jpeg",
  },
  {
    id: 7,
    name: "Garlic Lover's",
    price: "$7.99",
    weight: "2 oz",
    image: "/images/img7.jpeg",
  },
  {
    id: 8,
    name: "Variety Pack (8-Count)",
    price: "$49.99",
    weight: "16 oz",
    image: "/images/img8.jpeg",
    tag: "Save 20%",
  },
];

export function Products() {
  return (
    <section
      id="products"
      className="bg-[linear-gradient(180deg,#09070c_0%,#120f16_52%,#09070c_100%)] py-20 text-white md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
          <div
            className="text-center mb-16"
          >
            <p className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.28em] text-primary">
              Small Batch Jerky
            </p>
            <h2
              className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4"
            >
              Shop The <span className="text-primary">Bold Flavor</span>
            </h2>
            <p
              className="text-zinc-300 text-lg max-w-2xl mx-auto"
            >
              Premium cuts, rugged smoke, and valley-made flavor in every bag.
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {products.map((product) => (
              <div key={product.id} className="h-full flex flex-col">
              <Card className="h-full flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#070609] p-0 text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition-colors hover:border-primary/80 group cursor-pointer">
                <CardHeader className="p-0 relative h-64 shrink-0 overflow-hidden bg-[#070609]">
                  {/* Tag */}
                  {product.tag && (
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase px-2 py-1 rounded-[4px] shadow-sm z-10">
                      {product.tag}
                    </div>
                  )}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                </CardHeader>
                <CardContent className="flex-grow bg-[#070609] p-6 text-center">
                  <p className="text-sm text-primary font-bold mb-2 uppercase tracking-wider">
                    {product.weight}
                  </p>
                  <h3 className="font-heading text-xl font-bold uppercase leading-tight mb-2 group-hover:text-primary">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold">{product.price}</p>
                </CardContent>
                <CardFooter className="border-t-0 bg-[#070609] p-6 pt-0">
                  <Button className="h-12 w-full rounded-[4px] font-heading font-bold uppercase tracking-wider group-hover:bg-primary/90">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
