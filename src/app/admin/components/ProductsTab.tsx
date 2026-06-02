// src/app/admin/components/ProductsTab.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Plus, Trash2, Edit } from "lucide-react";
import { SkeletonLoader } from "./SkeletonLoader";

const initialMockProducts = [
  {
    id: "colorado-mock-id-1",
    name: "Colorado",
    price: 7.99,
    stock: 45,
    quantity: 5,
    description: "Colorado bold flavor beef jerky.",
    image: "/images/Colorado-1.webp",
  },
  {
    id: "southwest-mock-id-2",
    name: "SouthWest",
    price: 7.99,
    stock: 32,
    quantity: 5,
    description: "Southwest style smoked beef jerky.",
    image: "/images/Southwest-1.webp",
  },
  {
    id: "polish-mock-id-3",
    name: "Polish",
    price: 7.99,
    stock: 50,
    quantity: 5,
    description: "Polish classic recipe beef jerky.",
    image: "/images/polish-1.webp",
  },
  {
    id: "teriyaki-mock-id-4",
    name: "Teriyaki",
    price: 7.99,
    stock: 12,
    quantity: 5,
    description: "Teriyaki sweet and savory beef jerky.",
    image: "/images/Teriyaki.webp",
  },
];

export function ProductsTab() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    price: "",
    stock: "",
    quantity: "",
    description: "",
  });
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real mock app, we can pull from localStorage or local list
      const stored = localStorage.getItem("mrv_mock_products");
      if (stored) {
        setProducts(JSON.parse(stored));
      } else {
        setProducts(initialMockProducts);
        localStorage.setItem("mrv_mock_products", JSON.stringify(initialMockProducts));
      }
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const saveToLocal = (newProducts: any[]) => {
    setProducts(newProducts);
    localStorage.setItem("mrv_mock_products", JSON.stringify(newProducts));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(productForm.price) || 0.0;
    const stockNum = parseInt(productForm.stock) || 0;
    const qtyNum = parseInt(productForm.quantity) || 0;

    if (isEditingProduct) {
      const updated = products.map((p) =>
        p.id === productForm.id
          ? {
              ...p,
              name: productForm.name,
              price: priceNum,
              stock: stockNum,
              quantity: qtyNum,
              description: productForm.description,
            }
          : p
      );
      saveToLocal(updated);
    } else {
      const newProduct = {
        id: "mock-prod-" + Date.now(),
        name: productForm.name,
        price: priceNum,
        stock: stockNum,
        quantity: qtyNum,
        description: productForm.description,
        image: "/images/Colorado-1.webp", // Default mock image
      };
      saveToLocal([...products, newProduct]);
    }

    setShowProductModal(false);
    setProductForm({ id: "", name: "", price: "", stock: "", quantity: "", description: "" });
  };

  const handleDeleteProduct = (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const filtered = products.filter((p) => p.id !== id);
    saveToLocal(filtered);
  };

  if (loading) {
    return <SkeletonLoader rows={4} cols={5} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider">Products Inventory</h2>
          <p className="text-sm text-zinc-400">Add, edit, or delete items in store catalog (Mock Data)</p>
        </div>
        <Button
          onClick={() => {
            setIsEditingProduct(false);
            setProductForm({ id: "", name: "", price: "", stock: "", quantity: "", description: "" });
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
              <div className="space-y-2">
                <Label htmlFor="prodName">Product Name</Label>
                <Input
                  id="prodName"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  required
                  className="bg-zinc-950 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prodPrice">Price ($)</Label>
                <Input
                  id="prodPrice"
                  type="number"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  required
                  className="bg-zinc-950 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prodStock">Stock Quantity</Label>
                <Input
                  id="prodStock"
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                  required
                  className="bg-zinc-950 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prodQty">Quantity Limit per Order</Label>
                <Input
                  id="prodQty"
                  type="number"
                  value={productForm.quantity}
                  onChange={(e) => setProductForm({ ...productForm, quantity: e.target.value })}
                  className="bg-zinc-950 border-white/10 text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="prodDesc">Description</Label>
              <textarea
                id="prodDesc"
                rows={3}
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                className="w-full rounded-md bg-zinc-950 border border-white/10 text-white p-2.5 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
            <div className="flex space-x-3 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowProductModal(false)}
                className="border-white/10 text-zinc-400 hover:bg-zinc-800"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white hover:bg-primary/95">
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
                      <div className="w-12 h-12 bg-zinc-950 rounded overflow-hidden border border-white/10 flex items-center justify-center">
                        {prod.image ? (
                          <img src={prod.image} alt={prod.name} className="object-cover w-full h-full" />
                        ) : (
                          <ShoppingBag className="h-6 w-6 text-zinc-650" />
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-bold">{prod.name}</td>
                    <td className="p-4 text-emerald-400 font-semibold">${parseFloat(prod.price).toFixed(2)}</td>
                    <td className="p-4 font-mono">{prod.stock} items</td>
                    <td className="p-4 max-w-xs truncate text-zinc-400">{prod.description || "-"}</td>
                    <td className="p-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setIsEditingProduct(true);
                          setProductForm({
                            id: prod.id,
                            name: prod.name,
                            price: prod.price.toString(),
                            stock: prod.stock.toString(),
                            quantity: (prod.quantity || 0).toString(),
                            description: prod.description || "",
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
