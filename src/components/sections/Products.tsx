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
      className="py-20 md:py-32 bg-zinc-50 dark:bg-zinc-950"
    >
      <div className="container mx-auto px-4 md:px-6">
          <div
            className="text-center mb-16"
          >
            <h2
              className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4"
            >
              Shop the <span className="text-primary">Stash</span>
            </h2>
            <p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Premium cuts, bold flavors. Find your new favorite obsession.
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {products.map((product) => (
              <div key={product.id} className="h-full flex flex-col">
              <Card className="h-full flex flex-col overflow-hidden border-2 border-transparent hover:border-primary group cursor-pointer shadow-md hover:shadow-xl rounded-xl">
                <CardHeader className="p-0 relative bg-zinc-200 dark:bg-zinc-900 h-64 flex items-center justify-center">
                  {/* Tag */}
                  {product.tag && (
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase px-2 py-1 rounded shadow-sm z-10">
                      {product.tag}
                    </div>
                  )}
                  {/* Image Placeholder - User can replace with Next/Image later */}
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.image})` }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold bg-black/5">
                      Product Image
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-6 text-center">
                  <p className="text-sm text-muted-foreground font-bold mb-2 uppercase tracking-wider">
                    {product.weight}
                  </p>
                  <h3 className="font-heading text-xl font-bold uppercase leading-tight mb-2 group-hover:text-primary">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold">{product.price}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full font-bold uppercase tracking-wider rounded-none group-hover:bg-primary/90">
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
