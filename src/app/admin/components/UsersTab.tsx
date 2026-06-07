// src/app/admin/components/UsersTab.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SkeletonLoader } from "./SkeletonLoader";

export function UsersTab() {
  const {
    users,
    fetchUsers,
    updateUserRole,
    deleteUser,
    isLoading,
    error,
    usersPagination,
  } = useAuthStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers({
        page,
        limit,
        search: searchTerm.trim() || undefined,
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [page, searchTerm]);

  const handleRoleUpdate = async (
    userId: string,
    currentRole: "admin" | "user",
  ) => {
    const nextRole = currentRole === "admin" ? "user" : "admin";

    try {
      await updateUserRole(userId, nextRole);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      alert(`Error updating role: ${message}`);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to soft delete this user?")) return;

    try {
      await deleteUser(userId);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      alert(`Error deleting user: ${message}`);
    }
  };

  if (isLoading) {
    return <SkeletonLoader rows={4} cols={5} />;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider">
            User Accounts
          </h2>
          <p className="text-sm text-zinc-400">
            View user registration list, adjust user roles and delete profiles
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            placeholder="Search by name, email, or username"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="bg-zinc-950 border-white/10 text-white w-full sm:w-80"
          />

          <Button
            onClick={() => setPage(1)}
            variant="outline"
            className="border-white/10 hover:bg-zinc-800 bg-transparent hover:text-white"
          >
            Search
          </Button>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="p-3 bg-yellow-950/30 border border-yellow-500/20 text-yellow-400 rounded-md text-xs">
          Notice: Access to backend users API failed (likely CORS or
          authentication restriction). Showing empty or cache list.
        </div>
      )}

      {/* TABLE (ONLY ONCE — FIXED) */}
      <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-widest text-xs border-b border-white/5">
              <tr>
                <th className="p-4 font-black">User Details</th>
                <th className="p-4 font-black">Email</th>
                <th className="p-4 font-black">Role</th>
                <th className="p-4 font-black">Status</th>
                <th className="p-4 font-black text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-500">
                    No users loaded from backend.
                  </td>
                </tr>
              ) : (
                users.map((usr) => (
                  <tr key={usr.id} className="hover:bg-zinc-850 transition">
                    <td className="p-4 font-semibold">
                      {usr.firstName} {usr.lastName}
                      {usr.username && (
                        <span className="block text-xs text-zinc-500 font-normal">
                          @{usr.username}
                        </span>
                      )}
                    </td>

                    <td className="p-4 font-mono">{usr.email}</td>

                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                          usr.role === "admin"
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {usr.role}
                      </span>
                    </td>

                    <td className="p-4 capitalize text-zinc-400">
                      {usr.status}
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRoleUpdate(usr.id, usr.role)}
                        className="border-white/10 text-primary hover:bg-primary/10 hover:border-primary/30"
                      >
                        Toggle Role
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(usr.id)}
                        className="border-white/10 text-red-400 hover:bg-red-950/20 hover:border-red-500/30"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      {usersPagination && usersPagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-white/5 bg-zinc-950 px-4 py-3 text-sm text-zinc-400">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage(Math.max(1, page - 1))}
            className="border-white/10 hover:bg-zinc-800"
          >
            Previous
          </Button>

          <div>
            Page {usersPagination.page} of {usersPagination.totalPages} ·{" "}
            {usersPagination.total} users
          </div>

          <Button
            variant="outline"
            disabled={!usersPagination.hasNext}
            onClick={() => setPage(page + 1)}
            className="border-white/10 hover:bg-zinc-800"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
