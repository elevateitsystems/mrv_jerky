// src/app/admin/components/StoresTab.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Globe, Plus, Trash2, Edit } from "lucide-react";
import { SkeletonLoader } from "./SkeletonLoader";

const initialMockStores = [
  {
    id: "1",
    name: "Cask and Barrel",
    embed: "https://www.google.com/maps?q=Cask%20and%20Barrel&output=embed",
  },
  {
    id: "2",
    name: "El Cejas Meat Market",
    embed: "https://www.google.com/maps?q=El%20Cejas%20Meat%20Market&output=embed",
  },
  {
    id: "3",
    name: "Trove Spirits",
    embed: "https://www.google.com/maps?q=Trove%20Spirits&output=embed",
  },
  {
    id: "4",
    name: "Oakdale 7-11",
    embed: "https://www.google.com/maps?q=7-Eleven%20Oakdale&output=embed",
  },
  {
    id: "5",
    name: "Tracy Marina",
    embed: "https://www.google.com/maps?q=Tracy%20Marina&output=embed",
  },
  {
    id: "6",
    name: "Lodi Discount Cigarettes",
    embed: "https://www.google.com/maps?q=Lodi%20Discount%20Cigarettes&output=embed",
  },
];

export function StoresTab() {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [storeForm, setStoreForm] = useState({
    id: "",
    name: "",
    embed: "",
  });
  const [isEditingStore, setIsEditingStore] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = localStorage.getItem("mrv_mock_stores");
      if (stored) {
        setStores(JSON.parse(stored));
      } else {
        setStores(initialMockStores);
        localStorage.setItem("mrv_mock_stores", JSON.stringify(initialMockStores));
      }
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const saveToLocal = (newStores: any[]) => {
    setStores(newStores);
    localStorage.setItem("mrv_mock_stores", JSON.stringify(newStores));
  };

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditingStore) {
      const updated = stores.map((s) =>
        s.id === storeForm.id
          ? {
              ...s,
              name: storeForm.name,
              embed: storeForm.embed,
            }
          : s
      );
      saveToLocal(updated);
    } else {
      const newStore = {
        id: "mock-store-" + Date.now(),
        name: storeForm.name,
        embed: storeForm.embed,
      };
      saveToLocal([...stores, newStore]);
    }

    setShowStoreModal(false);
    setStoreForm({ id: "", name: "", embed: "" });
  };

  const handleDeleteStore = (id: string) => {
    if (!confirm("Are you sure you want to delete this store locator?")) return;
    const filtered = stores.filter((s) => s.id !== id);
    saveToLocal(filtered);
  };

  if (loading) {
    return <SkeletonLoader rows={3} cols={3} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider">Store Management</h2>
          <p className="text-sm text-zinc-400">Manage locations showing in your local store map locator (Mock Data)</p>
        </div>
        <Button
          onClick={() => {
            setIsEditingStore(false);
            setStoreForm({ id: "", name: "", embed: "" });
            setShowStoreModal(true);
          }}
          className="bg-primary text-white hover:bg-primary/90 font-bold uppercase"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Store
        </Button>
      </div>

      {showStoreModal && (
        <Card className="bg-zinc-900 border border-white/10 text-white shadow-2xl p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="uppercase tracking-wider text-lg">
              {isEditingStore ? "Edit Location" : "Create New Location"}
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSaveStore} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={storeForm.name}
                onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })}
                required
                className="bg-zinc-950 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeEmbed">Google Maps Embed URL</Label>
              <Input
                id="storeEmbed"
                placeholder="https://www.google.com/maps?q=StoreName&output=embed"
                value={storeForm.embed}
                onChange={(e) => setStoreForm({ ...storeForm, embed: e.target.value })}
                required
                className="bg-zinc-950 border-white/10 text-white"
              />
              <p className="text-xs text-zinc-500">Provide the iframe embed url, matching `https://www.google.com/maps?...&output=embed`</p>
            </div>
            <div className="flex space-x-3 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowStoreModal(false)}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.length === 0 ? (
          <div className="col-span-full py-12 text-center text-zinc-500">No stores locator points configured yet.</div>
        ) : (
          stores.map((store) => (
            <Card
              key={store.id}
              className="bg-zinc-900 border-white/5 text-white overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-bold uppercase truncate pr-4">{store.name}</CardTitle>
                <div className="flex space-x-1 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsEditingStore(true);
                      setStoreForm({
                        id: store.id,
                        name: store.name,
                        embed: store.embed || "",
                      });
                      setShowStoreModal(true);
                    }}
                    className="border-white/10 hover:bg-zinc-800 p-2 h-7 w-7"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteStore(store.id)}
                    className="border-white/10 text-red-400 hover:bg-red-950/20 hover:border-red-500/30 p-2 h-7 w-7"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-44 p-0 bg-zinc-950">
                {store.embed ? (
                  <iframe src={store.embed} className="w-full h-full border-0" loading="lazy" />
                ) : (
                  <div className="flex items-center justify-center h-full text-zinc-550">
                    <Globe className="h-8 w-8" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
