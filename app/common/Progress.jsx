"use client";

import React from "react";

export default function ProgressBar({ value, max = 100 }) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
