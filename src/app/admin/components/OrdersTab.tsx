// src/app/admin/components/OrdersTab.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SkeletonLoader } from "./SkeletonLoader";
import { apiRequest } from "@/lib/api";

interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerEmail: string;
  customerPhone: string;
  shippingCountry: string;
  totalAmount: string | number;
  orderStatus: string;
  paymentStatus: string;
}

const formatTotalAmount = (amount: string | number | undefined) => {
  const value = Number(amount ?? 0);
  return Number.isFinite(value) ? value.toFixed(2) : "0.00";
};

const mockOrders: Order[] = [
  {
    id: "ord-1",
    orderNumber: "MRV-90812-US",
    createdAt: "2026-06-01T14:30:00.000Z",
    customerEmail: "john.doe@gmail.com",
    customerPhone: "+1 (555) 321-4567",
    shippingCountry: "united states",
    totalAmount: 23.97,
    orderStatus: "delivered",
    paymentStatus: "paid",
  },
  {
    id: "ord-2",
    orderNumber: "MRV-71263-NL",
    createdAt: "2026-05-30T09:15:00.000Z",
    customerEmail: "test123@gmail.com",
    customerPhone: "+8801700000000",
    shippingCountry: "netherlands",
    totalAmount: 15.98,
    orderStatus: "pending",
    paymentStatus: "unpaid",
  },
  {
    id: "ord-3",
    orderNumber: "MRV-10293-CA",
    createdAt: "2026-05-28T18:45:00.000Z",
    customerEmail: "lisa.smith@yahoo.com",
    customerPhone: "+1 (416) 902-1823",
    shippingCountry: "canada",
    totalAmount: 39.95,
    orderStatus: "cancelled",
    paymentStatus: "refunded",
  },
];

export function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [pagination, setPagination] = useState<{ page: number; limit: number; total: number; totalPages: number; hasNext: boolean; hasPrevious: boolean } | null>(null);

  const loadOrders = useCallback(async (requestedPage = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiRequest(`order?page=${requestedPage}&limit=${limit}`);
      const data = response.data || response;
      setOrders(Array.isArray(data) ? data : []);
      setPagination(response.meta?.pagination ?? null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Failed to load orders from API:", message);
      setError("Unable to load orders from backend. Showing mock data.");
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    let active = true;

    const fetchOrders = async () => {
      if (!active) return;
      await loadOrders(page);
    };

    fetchOrders();

    return () => {
      active = false;
    };
  }, [loadOrders, page]);

  if (loading) {
    return <SkeletonLoader rows={4} cols={7} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wider">Orders Management</h2>
          <p className="text-sm text-zinc-400">View and track customer orders</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => loadOrders(page)}
            variant="outline"
            className="border-white/10 hover:bg-zinc-800 bg-transparent hover:text-white"
          >
            Refresh
          </Button>
          {pagination && (
            <div className="text-xs text-zinc-400">
              Page {pagination.page} / {pagination.totalPages} · {pagination.total} orders
            </div>
          )}
        </div>
      </div>
      {error ? (
        <div className="p-3 rounded-md bg-yellow-950/50 border border-yellow-500/20 text-yellow-300 text-sm">
          {error}
        </div>
      ) : null}

      <div className="bg-zinc-900 border border-white/5 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-widest text-xs border-b border-white/5">
              <tr>
                <th className="p-4 font-black">Order No.</th>
                <th className="p-4 font-black">Date</th>
                <th className="p-4 font-black">Customer</th>
                <th className="p-4 font-black">Country</th>
                <th className="p-4 font-black">Total</th>
                <th className="p-4 font-black">Status</th>
                <th className="p-4 font-black">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-zinc-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-850 transition">
                    <td className="p-4 font-mono font-bold text-primary">{order.orderNumber}</td>
                    <td className="p-4 text-zinc-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <div className="font-semibold">{order.customerEmail}</div>
                      <div className="text-xs text-zinc-500">{order.customerPhone}</div>
                    </td>
                    <td className="p-4 capitalize">{order.shippingCountry}</td>
                    <td className="p-4 font-bold text-emerald-400">${formatTotalAmount(order.totalAmount)}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs uppercase font-bold tracking-wider ${
                        order.orderStatus === "delivered" ? "bg-emerald-950 text-emerald-400 border border-emerald-500/20" :
                        order.orderStatus === "cancelled" ? "bg-red-950 text-red-400 border border-red-500/20" :
                        "bg-orange-950/50 text-orange-400 border border-orange-500/20"
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs uppercase font-bold tracking-wider ${
                        order.paymentStatus === "paid" ? "bg-emerald-950 text-emerald-400" : "bg-zinc-950 text-zinc-500"
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {pagination && pagination.totalPages > 1 ? (
        <div className="flex items-center justify-between border-t border-white/5 bg-zinc-950 px-4 py-3 text-sm text-zinc-400">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="border-white/10 hover:bg-zinc-800"
          >
            Previous
          </Button>
          <div>
            Page {pagination.page} of {pagination.totalPages} · {pagination.total} orders
          </div>
          <Button
            variant="outline"
            disabled={!pagination.hasNext}
            onClick={() => setPage((current) => current + 1)}
            className="border-white/10 hover:bg-zinc-800"
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}
