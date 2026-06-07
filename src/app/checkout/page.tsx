// src/app/checkout/page.tsx
"use client";

import { mockProducts } from "@/components/sections/Products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/api";
import { useCartStore } from "@/lib/store/useCartStore";
import {
  ArrowLeft,
  CreditCard,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();

  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Form fields with local storage persistence
  const [form, setForm] = useState({
    customerEmail: "test123@gmail.com",
    customerPhone: "+8801700000000",
    shippingCountry: "netherlands",
  });

  // Load persisted contact info
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mrv_jerky_checkout_contact");
      if (saved) {
        try {
          setForm(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  // Save contact info when it changes
  const updateForm = (fields: Partial<typeof form>) => {
    const updated = { ...form, ...fields };
    setForm(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "mrv_jerky_checkout_contact",
        JSON.stringify(updated),
      );
    }
  };

  // Fetch all products to resolve details
useEffect(() => {
  let isMounted = true;

  const loadProducts = async () => {
    try {
      const response = await apiRequest("products?limit=100");
      const data = response?.data ?? response ?? [];

      if (isMounted) {
        setProducts(Array.isArray(data) ? data : mockProducts || []);
      }
    } catch (err) {
      console.error("Failed to load products:", err);

      if (isMounted) {
        setProducts(mockProducts || []);
      }
    } finally {
      if (isMounted) {
        setLoadingProducts(false);
      }
    }
  };

  loadProducts();

  return () => {
    isMounted = false;
  };
}, []);

  // Map cart items to full details
  const cartWithDetails = items.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    return {
      ...cartItem,
      product,
    };
  });

  // Calculate total amount
  const totalAmount = cartWithDetails.reduce((total, item) => {
    if (!item.product) return total;
    const price = parseFloat(item.product.price);
    return total + price * item.quantity;
  }, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (items.length === 0) {
      setSubmitError("Your cart is empty");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        products: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        shippingCountry: "netherlands",
      };

      console.log("Checkout Payload:", payload);

      const response = await apiRequest("order/checkout", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response?.data) {
        toast.success("Your order has been successfully received.");
        clearCart(); // Optional: clear the cart after success
      } else {
        throw new Error(
          "Oops! Your order could not be received. Please try again.",
        );
      }
    } catch (err: any) {
      const errorMessage =
        err?.message ||
        "Oops! Your order could not be received. Please try again.";

      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12 px-4 md:px-8">
      <Toaster richColors position="top-right" />
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Link */}
        <div className="sm:flex items-center justify-between gap-4">
          <Link
            href="/"
            className="cursor-pointer flex items-center text-sm font-semibold text-zinc-400 hover:text-white uppercase tracking-wider transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Store
          </Link>
          <h1 className="font-heading text-3xl font-black uppercase tracking-wider">
            Checkout <span className="text-primary">Summary</span>
          </h1>
        </div>

        {loadingProducts ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">
              Retrieving Cart Items...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT SIDE: Cart items table */}
            <div className="lg:col-span-7 bg-zinc-900 border border-white/5 rounded-xl p-6 space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-wider flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-primary" /> Shopping
                Cart ({items.length})
              </h2>

              {cartWithDetails.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <p className="text-zinc-500 uppercase tracking-wider text-sm font-bold">
                    Your cart is empty.
                  </p>
                  <Button
                    onClick={() => (window.location.href = "/")}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/5 text-zinc-400 uppercase tracking-widest text-xs font-black">
                        <th className="pb-3">Product</th>
                        <th className="pb-3 text-center">Quantity</th>
                        <th className="pb-3 text-right">Price</th>
                        <th className="pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {cartWithDetails.map((item) => {
                        const { product, productId, quantity } = item;
                        if (!product) {
                          return (
                            <tr key={productId} className="text-zinc-500">
                              <td colSpan={4} className="py-4">
                                Loading item info...
                              </td>
                            </tr>
                          );
                        }
                        return (
                          <tr key={productId} className="align-middle">
                            <td className="py-4 flex items-center space-x-4">
                              <div className="relative w-16 h-16 bg-zinc-950 border border-white/10 rounded overflow-hidden flex items-center justify-center shrink-0">
                                {product.image ? (
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="64px"
                                    className="object-cover object-bottom"
                                  />
                                ) : (
                                  <ShoppingBag className="h-6 w-6 text-zinc-600" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-bold text-zinc-100 line-clamp-1">
                                  {product.name}
                                </h3>
                                <p className="text-xs text-zinc-400">
                                  ${parseFloat(product.price).toFixed(2)} each
                                </p>
                              </div>
                            </td>
                            <td className="py-4 text-center">
                              <div className="inline-flex items-center border border-white/10 rounded bg-zinc-950">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(productId, quantity - 1)
                                  }
                                  className="p-1.5 hover:bg-zinc-800 transition text-zinc-400"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="px-3 font-mono font-bold text-xs">
                                  {quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(productId, quantity + 1)
                                  }
                                  className="p-1.5 hover:bg-zinc-800 transition text-zinc-400"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </td>
                            <td className="py-4 text-right font-bold text-emerald-400">
                              $
                              {(parseFloat(product.price) * quantity).toFixed(
                                2,
                              )}
                            </td>
                            <td className="py-4 text-right">
                              <button
                                type="button"
                                onClick={() => removeItem(productId)}
                                className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-950/20 rounded transition"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* RIGHT SIDE: Checkout form */}
            <div className="lg:col-span-5 bg-zinc-900 border border-white/5 rounded-xl p-6 space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-wider flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-primary" /> Checkout
                Information
              </h2>

              {submitError && (
                <div className="p-3 bg-red-950/50 border border-red-500/30 text-red-400 rounded-md text-xs">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="customerEmail"
                    className="text-zinc-300 font-bold uppercase tracking-wider text-xs"
                  >
                    Customer Email
                  </Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    required
                    value={form.customerEmail}
                    onChange={(e) =>
                      updateForm({ customerEmail: e.target.value })
                    }
                    className="bg-zinc-950 border-white/10 text-white focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="customerPhone"
                    className="text-zinc-300 font-bold uppercase tracking-wider text-xs"
                  >
                    Customer Phone
                  </Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    required
                    value={form.customerPhone}
                    onChange={(e) =>
                      updateForm({ customerPhone: e.target.value })
                    }
                    className="bg-zinc-950 border-white/10 text-white focus-visible:ring-primary"
                  />
                </div>

                {/* <div className="space-y-2">
                  <Label
                    htmlFor="shippingCountry"
                    className="text-zinc-300 font-bold uppercase tracking-wider text-xs"
                  >
                    Shipping Country
                  </Label>
                  <Input
                    id="shippingCountry"
                    type="text"
                    required
                    value={form.shippingCountry}
                    onChange={(e) =>
                      updateForm({ shippingCountry: e.target.value })
                    }
                    className="bg-zinc-950 border-white/10 text-white focus-visible:ring-primary"
                  />
                </div> */}

                <div className="pt-4 border-t border-white/5 space-y-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span className="uppercase text-sm text-zinc-400 tracking-wider">
                      Total amount
                    </span>
                    <span className="text-emerald-400 font-black">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {submitting ? (
                  <Button
                    disabled
                    className="w-full bg-primary text-white py-6 uppercase font-bold tracking-wider"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparing
                    Payment...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={items.length === 0}
                    className="w-full bg-primary hover:bg-primary/95 text-white py-6 uppercase font-extrabold tracking-wider"
                  >
                    $ {totalAmount.toFixed(2)} Pay
                  </Button>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
