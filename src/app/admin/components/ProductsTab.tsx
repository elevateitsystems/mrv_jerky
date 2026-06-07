// src/app/admin/components/ProductsTab.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Plus, Trash2, Edit } from "lucide-react";
import { SkeletonLoader } from "./SkeletonLoader";
import Image from "next/image";
import { apiRequest } from "@/lib/api";

export function ProductsTab() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    price: "",
    weight: "",
    image: "",
    tag: "",
    stock: "",
    quantity: "",
    description: "",
    labelImages: [] as string[],
    comingSoon: false,
  });

  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);

  // ---------------- FETCH PRODUCTS ----------------
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await apiRequest("/products");
        const data = res?.data || res || [];

        setProducts(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError("Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // -------------- Thubmain Hanlder --------------
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setProductForm((prev) => ({
      ...prev,
      image: url,
    }));
  };

  // ------- Multiple Handler
  const handleLabelImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const urls = files.map((file) => URL.createObjectURL(file));

    setProductForm((prev) => ({
      ...prev,
      labelImages: [
        ...(Array.isArray(prev.labelImages) ? prev.labelImages : []),
        ...urls,
      ],
    }));
  };

  // --------- Remove item from lables images
  const removeLabelImage = (index: number) => {
    setProductForm((prev) => ({
      ...prev,
      labelImages: (Array.isArray(prev.labelImages)
        ? prev.labelImages
        : []
      ).filter((_, i) => i !== index),
    }));
  };

  // ---------------- SAVE (POST / PUT) ----------------
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      id: productForm.id,
      name: productForm.name,
      price:
        productForm.comingSoon || productForm.price === "COMING SOON"
          ? "COMING SOON"
          : parseFloat(productForm.price),
      weight: productForm.weight,
      image: productForm.image,
      tag: productForm.tag,
      description: productForm.description,
      comingSoon: productForm.comingSoon,
      labelImages: Array.isArray(productForm.labelImages)
        ? productForm.labelImages
        : [],
    };

    try {
      if (isEditingProduct) {
        await apiRequest(`/products/${productForm.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        setProducts((prev) =>
          prev.map((p) => (p.id === productForm.id ? payload : p)),
        );
      } else {
        const res = await apiRequest("/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        const newProduct = res?.data || payload;
        setProducts((prev) => [...prev, newProduct]);
      }

      setShowProductModal(false);
    } catch (err) {
      alert("Failed to save product");
    }
  };

  // ---------------- DELETE ----------------
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await apiRequest(`/products/${id}`, {
        method: "DELETE",
      });

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) return <SkeletonLoader rows={4} cols={5} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider">
            Products Inventory
          </h2>
          <p className="text-sm text-zinc-400">
            Add, edit, or delete items in store catalog (Mock Data)
          </p>
        </div>
        <Button
          onClick={() => {
            setIsEditingProduct(false);
            setProductForm({
              id: "",
              name: "",
              price: "",
              weight: "",
              image: "",
              tag: "",
              stock: "",
              quantity: "",
              description: "",
              labelImages: [],
              comingSoon: false,
            });
            setShowProductModal(true);
          }}
          className="bg-primary text-white hover:bg-primary/90 font-bold uppercase"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      {showProductModal && (
        <Card className="bg-zinc-900 border border-white/10 text-white shadow-2xl p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="uppercase tracking-wider text-lg">
              {isEditingProduct ? "Edit Product" : "Create New Product"}
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input
                  value={productForm.name}
                  onChange={(e) =>
                    setProductForm({ ...productForm, name: e.target.value })
                  }
                  className="bg-zinc-950 border-white/10 text-white"
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  value={productForm.price}
                  onChange={(e) =>
                    setProductForm({ ...productForm, price: e.target.value })
                  }
                  className="bg-zinc-950 border-white/10 text-white"
                />
              </div>

              {/* Weight (NEW) */}
              <div className="space-y-2">
                <Label>Weight</Label>
                <Input
                  value={productForm.weight}
                  onChange={(e) =>
                    setProductForm({ ...productForm, weight: e.target.value })
                  }
                  className="bg-zinc-950 border-white/10 text-white"
                  placeholder="e.g. 2 oz"
                />
              </div>

              {/* Tag (NEW) */}
              <div className="space-y-2">
                <Label>Tag</Label>
                <Input
                  value={productForm.tag}
                  onChange={(e) =>
                    setProductForm({ ...productForm, tag: e.target.value })
                  }
                  className="bg-zinc-950 border-white/10 text-white"
                  placeholder="Best Seller / New / etc"
                />
              </div>

              {/* Thumbnail Image (NEW but same style) */}
              <div className="space-y-2 md:col-span-2">
                <Label>Thumbnail Image</Label>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="bg-zinc-950 border-white/10 text-white"
                />

                {productForm.image && (
                  <div className="relative w-24 h-24 mt-2 rounded overflow-hidden border border-white/10">
                    <Image
                      src={productForm.image}
                      alt="Thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Label Images (NEW) */}
              <div className="space-y-2 md:col-span-2">
                <Label>Label Images</Label>

                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleLabelImagesChange}
                  className="bg-zinc-950 border-white/10 text-white"
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  {productForm.labelImages?.map(
                    (img: string, index: number) => (
                      <div
                        key={index}
                        className="relative rounded overflow-hidden border border-white/10"
                      >
                        <div className="relative w-full aspect-square">
                          <Image
                            src={img}
                            alt={`Label ${index}`}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute top-1 right-1 h-7 w-7"
                          onClick={() => removeLabelImage(index)}
                        >
                          ✕
                        </Button>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Description (UNCHANGED STYLE) */}
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                rows={3}
                value={productForm.description}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    description: e.target.value,
                  })
                }
                className="w-full rounded-md bg-zinc-950 border border-white/10 text-white p-2.5 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>

            {/* Buttons (UNCHANGED) */}
            <div className="flex space-x-3 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowProductModal(false)}
                className="border-white/10 text-zinc-400 hover:bg-zinc-800"
              >
                Cancel
              </Button>

              <Button type="submit" className="bg-primary text-white">
                Save
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-widest text-xs border-b border-white/5">
              <tr>
                <th className="p-4 font-black">Image</th>
                <th className="p-4 font-black">Name</th>
                <th className="p-4 font-black">Price</th>
                <th className="p-4 font-black">Stock</th>
                <th className="p-4 font-black">Description</th>
                <th className="p-4 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-zinc-850 transition">
                    <td className="p-4">
                      <div className="w-12 h-12 bg-zinc-950 rounded overflow-hidden border border-white/10 flex items-center justify-center relative">
                        {prod.image ? (
                          <Image
                            src={prod.image}
                            alt={prod.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <ShoppingBag className="h-6 w-6 text-zinc-500" />
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-bold">{prod.name}</td>
                    <td className="p-4 text-emerald-400 font-semibold">
                      ${parseFloat(prod.price).toFixed(2)}
                    </td>
                    <td className="p-4 font-mono">{prod.stock} items</td>
                    <td className="p-4 max-w-xs truncate text-zinc-400">
                      {prod.description || "-"}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setIsEditingProduct(true);
                          setProductForm({
                            id: prod.id,
                            name: prod.name || "",
                            price: String(prod.price ?? ""),
                            weight: prod.weight || "",
                            image: prod.image || "",
                            tag: prod.tag || "",
                            stock: String(prod.stock ?? ""),
                            quantity: String(prod.quantity ?? ""),
                            description: prod.description || "",
                            labelImages: Array.isArray(prod.labelImages)
                              ? prod.labelImages
                              : [],
                            comingSoon: !!prod.comingSoon,
                          });
                          setShowProductModal(true);
                        }}
                        className="border-white/10 hover:bg-zinc-800"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="border-white/10 text-red-400 hover:bg-red-950/20 hover:border-red-500/30"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
