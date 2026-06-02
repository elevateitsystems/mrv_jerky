"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { useCartStore } from "@/lib/store/useCartStore";
import { apiRequest } from "@/lib/api";

export const mockProducts = [
  {
    id: "colorado-mock-id-1",
    name: "Colorado",
    price: 7.99,
    weight: "2 oz",
    image: "/images/Colorado-1.webp",
    tag: "Best Seller",
  },
  {
    id: "southwest-mock-id-2",
    name: "SouthWest",
    price: 7.99,
    weight: "2 oz",
    image: "/images/Southwest-1.webp",
  },
  {
    id: "polish-mock-id-3",
    name: "Polish",
    price: 7.99,
    weight: "2 oz",
    image: "/images/polish-1.webp",
  },
  {
    id: "teriyaki-mock-id-4",
    name: "Teriyaki",
    price: 7.99,
    weight: "2 oz",
    image: "/images/Teriyaki.webp",
  },
];

export function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await apiRequest("products?limit=100");
        const data = response.data || response;
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(mockProducts);
        }
      } catch (err) {
        console.error("Failed to load products from API, using mock products:", err);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <section
      id="products"
      className="bg-[linear-gradient(180deg,#09070c_0%,#120f16_52%,#09070c_100%)] py-20 text-white md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <p className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.28em] text-primary">
            Small Batch Jerky
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4">
            Shop The <span className="text-primary">Bold Flavor</span>
          </h2>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            Premium cuts, rugged smoke, and valley-made flavor in every bag.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => {
              const displayImage = product.images?.[0]?.url || product.image || "/images/Colorado-1.webp";
              const displayPrice = typeof product.price === "number" 
                ? `$${product.price.toFixed(2)}` 
                : isNaN(parseFloat(product.price)) 
                  ? product.price 
                  : `$${parseFloat(product.price).toFixed(2)}`;
              
              return (
                <div key={product.id} className="h-full flex flex-col">
                  <Card className="h-fit flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#070609] p-0 text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition-colors hover:border-primary/80 group cursor-pointer">
                    <CardHeader className="relative aspect-[4/5] overflow-hidden bg-[#070609] p-0">
                      {product.tag && (
                        <div className="absolute top-4 left-4 z-10 rounded-[4px] bg-primary px-2 py-1 text-xs font-bold uppercase text-primary-foreground shadow-sm">
                          {product.tag}
                        </div>
                      )}
                      <Image
                        src={displayImage}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-bottom transition-transform duration-500 group-hover:scale-105"
                      />
                    </CardHeader>
                    <CardContent className="flex-grow bg-[#070609] p-6 text-center">
                      <p className="text-sm text-primary font-bold mb-2 uppercase tracking-wider">
                        {product.weight || "2 oz"}
                      </p>
                      <h3 className="font-heading text-xl font-bold uppercase leading-tight mb-2 group-hover:text-primary">
                        {product.name}
                      </h3>
                      <p className="text-lg font-bold">{displayPrice}</p>
                    </CardContent>
                    <CardFooter className="border-t-0 bg-[#070609] p-6 pt-0">
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem(product.id);
                        }}
                        className="cursor-pointer h-12 w-full rounded-[4px] font-heading font-bold uppercase tracking-wider group-hover:bg-primary/90"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
