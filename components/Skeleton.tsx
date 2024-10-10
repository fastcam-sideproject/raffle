import React from 'react';

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
    </div>
  );
}
