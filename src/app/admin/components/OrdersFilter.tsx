// src/app/admin/components/OrdersFilter.tsx
"use client";

import React from "react";

interface Props {
  search: string;
  status: string;
  fromDate: string;
  toDate: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;

  onReset?: () => void;
}

export function OrdersFilter({
  search,
  status,
  fromDate,
  toDate,
  onSearchChange,
  onStatusChange,
  onFromDateChange,
  onToDateChange,
  onReset,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <input
        type="text"
        placeholder="Search order, email or phone..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="h-10 rounded border border-zinc-700 bg-zinc-900 px-3 text-sm text-white"
      />

      {/* Status */}
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="h-10 rounded border border-zinc-700 bg-zinc-900 px-3 text-sm text-white"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>

      {/* From Date */}
      <input
        type="date"
        value={fromDate}
        onChange={(e) => onFromDateChange(e.target.value)}
        className="h-10 rounded border border-zinc-700 bg-zinc-900 px-3 text-sm text-white"
      />

      {/* To Date */}
      <input
        type="date"
        value={toDate}
        onChange={(e) => onToDateChange(e.target.value)}
        className="h-10 rounded border border-zinc-700 bg-zinc-900 px-3 text-sm text-white"
      />

      {/* Reset */}
      {onReset && (
        <button
          onClick={onReset}
          className="h-10 px-3 rounded border border-white/10 text-sm text-zinc-300 hover:bg-zinc-800"
        >
          Reset
        </button>
      )}
    </div>
  );
}