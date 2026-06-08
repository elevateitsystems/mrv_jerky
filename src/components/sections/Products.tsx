//products.tsx
"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { apiRequest } from "@/lib/api";
import { useCartStore } from "@/lib/store/useCartStore";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductSkeleton from "../productSkeleton";

// For Product reference
export const mockProducts = [
  {
    id: "colorado-mock-id-1",
    name: "Colorado",
    price: 7.99,
    weight: "2 oz",
    images: [
      "/images/colorado.jpeg",
      "/images/colorado.jpeg",
      "/images/packaging.jpg",
      "/images/pupup-image.jpg",
    ], // replace with your image
    tag: "Best Seller",
    description:
      "Bold, hearty, and built for adventure. Colorado combines rich savory flavor with garlic, onion, and a deep golden finish. Packed with 14g of protein, it's the perfect companion for every trail and road trip.",
  },
  {
    id: "southwest-mock-id-2",
    name: "Southwest",
    price: 7.99,
    weight: "2 oz",
    image: "",
    images: ["/images/Southwest-1.webp"],
    description:
      "Smoky, slightly sweet, and finished with warm spices, Southwest delivers a bold flavor profile inspired by desert sunsets while providing 14g of protein in every serving.",
  },
  {
    id: "polish-mock-id-3",
    name: "Polish",
    price: 7.99,
    weight: "2 oz",
    images: ["/images/polish.png"],
    // labelImage: "/images/polish.png",
    description:
      "Classic old-world flavor with a clean ingredient list. Crafted with beef, garlic, spices, and apple cider vinegar for a satisfying bite and an impressive 15g of protein.",
  },
];

export function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await apiRequest("products?limit=10");
        const data = response.data || response;

        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          // setProducts(mockProducts);
          setProducts([]);
        }
      } catch {
        // setProducts(mockProducts);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const renderProducts = useMemo(
    () => (products.length ? products : []),
    [products],
  );

  return (
    <>
      <section
        id="products"
        className="bg-[linear-gradient(180deg,#09070c_0%,#120f16_52%,#09070c_100%)] py-20 text-white md:py-28"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-primary">
              Small Batch Jerky
            </p>

            <h2 className="mb-4 text-4xl font-bold uppercase md:text-5xl">
              Shop The <span className="text-primary">Bold Flavor</span>
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-zinc-300">
              Premium cuts, rugged smoke, and valley-made flavor in every bag.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {renderProducts.map((product) => {
                const displayImage = product.images?.[0]?.url || "";

                const isComingSoon =
                  product.comingSoon ||
                  String(product.price).toLowerCase().includes("coming");

                const displayPrice =
                  typeof product.price === "number"
                    ? `$${product.price.toFixed(2)}`
                    : product.price;

                return (
                  <Card
                    key={product.id}
                    className="flex h-full flex-col overflow-hidden border border-white/10 bg-[#070609] transition-all text-white duration-300 hover:border-primary"
                  >
                    <CardHeader className="relative h-96 p-0">
                      {product.tag && (
                        <div className="absolute left-4 top-4 z-10 rounded bg-primary px-3 py-1 text-xs font-bold text-black">
                          {product.tag}
                        </div>
                      )}

                      {isComingSoon && (
                        <div className="absolute right-4 top-4 z-10 rounded bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                          COMING SOON
                        </div>
                      )}

                      <Image
                        src={displayImage}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-contain"
                      />
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col p-6">
                      <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">
                        {product.weight || "2 oz"}
                      </p>

                      <h3 className="mb-2 text-2xl font-bold uppercase">
                        {product.name}
                      </h3>

                      <p className="mb-4 text-lg font-bold">{displayPrice}</p>

                      <p className="line-clamp-3 text-sm leading-6 text-zinc-300">
                        {product.description}
                      </p>

                      <Button
                        variant="link"
                        className="mt-3 w-fit p-0 text-primary"
                        onClick={() => setSelectedProduct(product)}
                      >
                        Show More
                      </Button>
                    </CardContent>

                    <CardFooter className="border-t-0 bg-[#070609] p-6 pt-0">
                      {isComingSoon ? (
                        <Button
                          disabled
                          className="w-full cursor-not-allowed opacity-60"
                        >
                          Coming Soon
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => addItem(product.id)}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}

              {/* Comming soon card */}

              <Card className="flex h-full flex-col overflow-hidden border border-white/10 bg-[#070609] transition-all text-white duration-300 hover:border-primary">
                <CardHeader className="relative h-96 p-0">
                  <div className="absolute right-4 top-4 z-10 rounded bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                    COMING SOON
                  </div>

                  <Image
                    src={"/images/placeholder.webp"}
                    alt={"/comming soon product"}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain"
                  />
                </CardHeader>

                <CardContent className="flex flex-1 flex-col p-6">
                  <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">
                    {"2 oz"}
                  </p>

                  <h3 className="mb-2 text-2xl font-bold uppercase">
                    Teriyaki
                  </h3>

                  <p className="mb-4 text-lg font-bold">COMING SOON</p>
                </CardContent>

                <CardFooter className="border-t-0 bg-[#070609] p-6 pt-0">
                  <Button
                    disabled
                    className="w-full cursor-not-allowed opacity-60"
                  >
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Dialog
        open={!!selectedProduct}
        onOpenChange={(open) => {
          if (!open) setSelectedProduct(null);
        }}
      >
        <DialogContent className="max-h-[95vh] w-[95vw] overflow-y-auto border-zinc-800 bg-[#09070c] p-4 text-white sm:max-w-4xl md:p-6">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold uppercase md:text-3xl">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-white/10">
                  <Image
                    src={selectedProduct.images?.[0]?.url || ""}
                    alt={selectedProduct.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <p className="mb-4 text-primary font-bold">
                    {selectedProduct.weight || "2 oz"}
                  </p>

                  <p className="text-sm leading-7 text-zinc-300 md:text-base">
                    {selectedProduct.description}
                  </p>

                  {!selectedProduct.comingSoon && (
                    <Button
                      className="mt-6 w-full"
                      onClick={() => addItem(selectedProduct.id)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>

              {/* Nutrition / Ingredients Label */}
              {selectedProduct.images?.length > 1 && (
                <div className="mt-8">
                  <h4 className="mb-4 text-xl font-semibold">
                    Nutrition & Ingredients
                  </h4>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {selectedProduct.images
                      .slice(1)
                      .map((image: { url: string }, index: number) => (
                        <div
                          key={`${image.url}-${index}`}
                          className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-white/10"
                        >
                          <Image
                            src={image.url}
                            alt={`${selectedProduct.name} Label ${index + 1}`}
                            fill
                            sizes="100vw"
                            className="object-contain"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
