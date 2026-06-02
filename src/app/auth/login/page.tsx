// src/app/auth/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const { token, login, checkAuth, isLoading } = useAuthStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (token) {
      router.push("/admin/orders");
    }
  }, [token, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      await login(email, password);
      router.push("/admin/orders");
    } catch (err: any) {
      setLoginError(err.message || "Invalid credentials");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url('/images/hero-image.webp')" }}
        />
        <Link href="/">
          <div className="cursor-pointer relative h-20 w-40 mx-auto">
            <Image
              src="/images/logo1.png"
              alt="logo"
              fill
              sizes="160px"
              className="object-contain"
            />
          </div>
        </Link>
        {/* Login Box */}
        <Card className="w-full max-w-[500px] border-0 bg-[#1c1b1f] text-white relative rounded-xl overflow-hidden shadow-2xl mt-6">
          {/* Top border gradient */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-purple-500 via-orange-500 to-red-600" />

          <form onSubmit={handleLogin}>
            <div className="p-8 pb-6 space-y-6">
              {/* Header */}
              <div className="space-y-2 text-center mt-4">
                <h1 className="text-3xl font-black uppercase tracking-wider text-white">
                  <span className="text-[#8452cd]">ADMIN</span>
                </h1>
                <p className="text-zinc-400 text-sm">
                  Access the administrator panel dashboard
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-950/45 border border-red-500/20 text-red-400 rounded text-xs">
                  {loginError}
                </div>
              )}

              {/* Form Input fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-zinc-400 font-bold uppercase tracking-wider text-xs"
                  >
                    EMAIL
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@mrvjerky.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[#0b0a0c] border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white h-12"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="password"
                      className="text-zinc-400 font-bold uppercase tracking-wider text-xs"
                    >
                      PASSWORD
                    </Label>
                    <a
                      href="/forgot-password"
                      className="text-xs text-[#8452cd] font-semibold hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-[#0b0a0c] border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white h-12"
                  />
                </div>
              </div>
            </div>

            {/* Gray Footer Area with Purple Authenticate button */}
            <div className="p-6 flex justify-center items-center rounded-b-xl">
              {isLoading ? (
                <Button
                  disabled
                  className="w-full bg-[#6c3eb9] hover:bg-[#6c3eb9]/90 text-white font-extrabold uppercase py-6 text-sm tracking-wider"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> VERIFYING...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-[#6c3eb9] hover:bg-[#6c3eb9]/95 text-white font-extrabold uppercase py-6 text-sm tracking-wider"
                >
                  AUTHENTICATE
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
