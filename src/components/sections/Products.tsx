"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// Mock data for up to 8 products as requested
const products = [
  {
    id: 1,
    name: "Original Beef Jerky",
    price: "$7.99",
    weight: "2 oz",
    image: "/images/product-placeholder.png",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Spicy Jalapeño",
    price: "$7.99",
    weight: "2 oz",
    image: "/images/product-placeholder.png",
  },
  {
    id: 3,
    name: "Teriyaki Blast",
    price: "$7.99",
    weight: "2 oz",
    image: "/images/product-placeholder.png",
  },
  {
    id: 4,
    name: "Black Pepper",
    price: "$7.99",
    weight: "2 oz",
    image: "/images/product-placeholder.png",
  },
  {
    id: 5,
    name: "Habanero Heat",
    price: "$8.99",
    weight: "2 oz",
    image: "/images/product-placeholder.png",
    tag: "New",
  },
  {
    id: 6,
    name: "Sweet & Spicy",
    price: "$7.99",
    weight: "2 oz",
    image: "/images/product-placeholder.png",
  },
  {
    id: 7,
    name: "Garlic Lover's",
    price: "$7.99",
    weight: "2 oz",
    image: "/images/product-placeholder.png",
  },
  {
    id: 8,
    name: "Variety Pack (8-Count)",
    price: "$49.99",
    weight: "16 oz",
    image: "/images/product-placeholder.png",
    tag: "Save 20%",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Products() {
  return (
    <section id="products" className="py-20 md:py-32 bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4"
          >
            Shop the <span className="text-primary">Stash</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Premium cuts, bold flavors. Find your new favorite obsession.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Card className="h-full flex flex-col overflow-hidden border-2 border-transparent hover:border-primary transition-colors group cursor-pointer shadow-md hover:shadow-xl rounded-xl">
                <CardHeader className="p-0 relative bg-zinc-200 dark:bg-zinc-900 h-64 flex items-center justify-center">
                  {/* Tag */}
                  {product.tag && (
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase px-2 py-1 rounded shadow-sm z-10">
                      {product.tag}
                    </div>
                  )}
                  {/* Image Placeholder - User can replace with Next/Image later */}
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${product.image})` }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold bg-black/5">
                      Product Image
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-6 text-center">
                  <p className="text-sm text-muted-foreground font-bold mb-2 uppercase tracking-wider">{product.weight}</p>
                  <h3 className="font-heading text-xl font-bold uppercase leading-tight mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold">{product.price}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full font-bold uppercase tracking-wider rounded-none group-hover:bg-primary/90 transition-colors">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
