// src/app/admin/components/SkeletonLoader.tsx
import React from "react";

export function SkeletonLoader({ rows = 5, cols = 5 }) {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-8 bg-zinc-800 rounded w-1/4"></div>
      <div className="border border-white/5 rounded-xl bg-zinc-900 overflow-hidden">
        <div className="h-12 bg-zinc-950 border-b border-white/5 flex items-center px-4 space-x-4">
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="h-4 bg-zinc-800 rounded flex-1"></div>
          ))}
        </div>
        <div className="divide-y divide-white/5 p-4 space-y-4">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center space-x-4">
              {Array.from({ length: cols }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`h-4 bg-zinc-800 rounded flex-1 ${
                    colIndex === 0 ? "w-3/4" : "w-1/2"
                  }`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
