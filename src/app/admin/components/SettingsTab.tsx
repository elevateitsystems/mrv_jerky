// src/app/admin/components/SettingsTab.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User as UserIcon, Lock, Loader2 } from "lucide-react";

export function SettingsTab() {
  const { user, updateProfile, changePassword, isLoading } = useAuthStore();

  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [profileMessage, setProfileMessage] = useState({ type: "", text: "" });
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (user) {
      // @todo: Refactor to use callback ref if cascading renders become a problem
      setProfileForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMessage({ type: "", text: "" });
    try {
      await updateProfile(profileForm);
      setProfileMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update profile (CORS/Network error)";
      setProfileMessage({ type: "error", text: message });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage({ type: "", text: "" });
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match" });
      return;
    }
    try {
      await changePassword(passwordForm);
      setPasswordMessage({ type: "success", text: "Password changed successfully!" });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to change password (CORS/Network error)";
      setPasswordMessage({ type: "error", text: message });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold uppercase tracking-wider">Console Settings</h2>
        <p className="text-sm text-zinc-400">Configure profile preferences and authenticate options</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile card */}
        <Card className="bg-zinc-900 border-white/5 text-white">
          <CardHeader>
            <CardTitle className="uppercase tracking-wider text-sm flex items-center">
              <UserIcon className="h-4 w-4 mr-2 text-primary" /> Profile Settings
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleUpdateProfile}>
            <CardContent className="space-y-4">
              {profileMessage.text && (
                <div
                  className={`p-3 border rounded text-xs ${
                    profileMessage.type === "success"
                      ? "bg-emerald-950/50 border-emerald-500/30 text-emerald-400"
                      : "bg-red-950/50 border-red-500/30 text-red-400"
                  }`}
                >
                  {profileMessage.text}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileForm.firstName}
                    onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                    className="bg-zinc-950 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileForm.lastName}
                    onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                    className="bg-zinc-950 border-white/10 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profileForm.username}
                  onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                  className="bg-zinc-950 border-white/10 text-white"
                />
              </div>
            </CardContent>
            <CardFooter className=" bg-transparent border-none">
              <Button type="submit" disabled={isLoading} className="bg-primary text-white hover:bg-primary/95 font-bold uppercase">
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null} Update Profile
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Password card */}
        <Card className="bg-zinc-900 border-white/5 text-white">
          <CardHeader>
            <CardTitle className="uppercase tracking-wider text-sm flex items-center">
              <Lock className="h-4 w-4 mr-2 text-primary" /> Reset Password
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleChangePassword}>
            <CardContent className="space-y-4">
              {passwordMessage.text && (
                <div
                  className={`p-3 border rounded text-xs ${
                    passwordMessage.type === "success"
                      ? "bg-emerald-950/50 border-emerald-500/30 text-emerald-400"
                      : "bg-red-950/50 border-red-500/30 text-red-400"
                  }`}
                >
                  {passwordMessage.text}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required
                  className="bg-zinc-950 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                  className="bg-zinc-950 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <Input
                  id="confirmNewPassword"
                  type="password"
                  value={passwordForm.confirmNewPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })}
                  required
                  className="bg-zinc-950 border-white/10 text-white"
                />
              </div>
            </CardContent>
            <CardFooter className=" bg-transparent border-none">
              <Button type="submit" disabled={isLoading} className="bg-primary text-white hover:bg-primary/95 font-bold uppercase">
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null} Change Password
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
