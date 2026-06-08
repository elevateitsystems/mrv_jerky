// src/app/admin/layout.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/useAuthStore";
import {
  ClipboardList,
  Loader2,
  LogOut,
  Settings,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, checkAuth, isLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkAuth()
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, mounted, router]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold mt-4">
          Loading Admin Workspace...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navLinks = [
    { name: "Orders Table", href: "/admin/orders", icon: ClipboardList },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Store Locator", href: "/admin/stores", icon: Store },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Profile Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 bg-wh">
            <Image
              src="/images/logo1.png"
              alt="MRV Jerky Logo"
              width={72}
              height={52}
              className="h-12 w-12 object-contain md:h-[3.5rem] md:w-[3.5rem] mx-auto"
              priority
            />
          </Link>
          <p className="text-xs text-zinc-500 mt-1 uppercase font-bold tracking-widest text-center">
            Welcome, {user?.firstName || "Admin"}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <span
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition cursor-pointer ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Button
            onClick={() => {
              logout();
              router.push("/auth/login");
            }}
            variant="outline"
            className="w-full justify-start space-x-3 text-zinc-400 border-white/5 hover:border-red-500/50 hover:bg-red-950/20 hover:text-red-400 bg-transparent"
          >
            <LogOut className="h-4 w-4" />
            <span className="uppercase tracking-wider font-semibold text-xs">
              Sign Out
            </span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Toaster richColors position="top-right" />
        {children}
      </main>
    </div>
  );
}
