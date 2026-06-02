// src/app/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, KeyRound, Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const { forgotPassword, verifyResetOtp, resetPassword, isLoading, error: authError } = useAuthStore();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await forgotPassword(email);
      setStep(2);
    } catch (err: any) {
      setError(err.message || "Failed to send reset link");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await verifyResetOtp(email, otp);
      setStep(3);
    } catch (err: any) {
      setError(err.message || "Invalid OTP code");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await resetPassword(email, newPassword);
      setStep(4);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" style={{ backgroundImage: "url('/images/hero-image.webp')" }} />
      
      <Card className="w-full max-w-md border-white/10 bg-zinc-900 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-orange-500 to-red-600" />
        
        {step === 1 && (
          <form onSubmit={handleRequestOtp}>
            <CardHeader className="space-y-1 text-center pt-8">
              <CardTitle className="text-2xl font-heading font-extrabold uppercase tracking-wider flex items-center justify-center">
                <Mail className="h-6 w-6 mr-2 text-primary" /> Reset Password
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Enter your email address to receive a verification OTP code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <div className="p-3 bg-red-950/50 border border-red-500/30 text-red-400 rounded-md text-xs">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300 font-bold uppercase tracking-wider text-xs">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@mrvjerky.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-zinc-950 border-white/10 text-white focus-visible:ring-primary"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3 pb-8">
              {isLoading ? (
                <Button disabled className="w-full bg-primary text-white font-bold uppercase py-6">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </Button>
              ) : (
                <Button type="submit" className="w-full bg-primary text-white font-bold uppercase py-6">
                  Send OTP Code
                </Button>
              )}
              <a href="/admin" className="text-xs text-zinc-400 hover:text-white flex items-center">
                <ArrowLeft className="h-3 w-3 mr-1" /> Back to Login
              </a>
            </CardFooter>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <CardHeader className="space-y-1 text-center pt-8">
              <CardTitle className="text-2xl font-heading font-extrabold uppercase tracking-wider flex items-center justify-center">
                <KeyRound className="h-6 w-6 mr-2 text-primary" /> Verify OTP
              </CardTitle>
              <CardDescription className="text-zinc-400">
                We sent a 6-digit code to <span className="text-white font-semibold">{email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <div className="p-3 bg-red-950/50 border border-red-500/30 text-red-400 rounded-md text-xs">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-zinc-300 font-bold uppercase tracking-wider text-xs">6-Digit Code</Label>
                <Input
                  id="otp"
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="bg-zinc-950 border-white/10 text-white font-mono text-center tracking-widest text-lg focus-visible:ring-primary"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3 pb-8">
              {isLoading ? (
                <Button disabled className="w-full bg-primary text-white font-bold uppercase py-6">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                </Button>
              ) : (
                <Button type="submit" className="w-full bg-primary text-white font-bold uppercase py-6">
                  Verify OTP
                </Button>
              )}
              <button type="button" onClick={() => setStep(1)} className="text-xs text-zinc-400 hover:text-white flex items-center">
                <ArrowLeft className="h-3 w-3 mr-1" /> Use different email
              </button>
            </CardFooter>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <CardHeader className="space-y-1 text-center pt-8">
              <CardTitle className="text-2xl font-heading font-extrabold uppercase tracking-wider">
                Create New Password
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Set a strong password to secure your admin account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <div className="p-3 bg-red-950/50 border border-red-500/30 text-red-400 rounded-md text-xs">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="bg-zinc-950 border-white/10 text-white focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-zinc-950 border-white/10 text-white focus-visible:ring-primary"
                />
              </div>
            </CardContent>
            <CardFooter className="pb-8">
              {isLoading ? (
                <Button disabled className="w-full bg-primary text-white font-bold uppercase py-6">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Resetting...
                </Button>
              ) : (
                <Button type="submit" className="w-full bg-primary text-white font-bold uppercase py-6">
                  Save Password
                </Button>
              )}
            </CardFooter>
          </form>
        )}

        {step === 4 && (
          <div className="text-center pt-8 pb-8">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-emerald-500 animate-bounce" />
              </div>
              <CardTitle className="text-2xl font-heading font-extrabold uppercase tracking-wider text-emerald-400">
                Password Reset Complete
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Your password has been changed successfully. You can now log in using your new credentials.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              <Button onClick={() => window.location.href = "/admin"} className="w-full bg-primary text-white font-bold uppercase py-6">
                Go to Login
              </Button>
            </CardContent>
          </div>
        )}
      </Card>
    </div>
  );
}
