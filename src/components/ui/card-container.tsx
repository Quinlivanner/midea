"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
  indicatorColor?: string;
  title?: string;
  subtitle?: string;
  useGlass?: boolean;
}

export function CardContainer({
  children,
  className,
  indicatorColor,
  title,
  subtitle,
  useGlass = false,
}: CardContainerProps) {
  return (
    <div className={cn(
      'rounded-lg shadow overflow-hidden card-hover-effect mb-6',
      useGlass ? 'glass-effect' : 'bg-white',
      className
    )}>
      {indicatorColor && (
        <div className="module-indicator" style={{ color: indicatorColor }}></div>
      )}
      
      {(title || subtitle) && (
        <div className="p-4 sm:p-6 border-b">
          {title && <h2 className="text-xl font-semibold mb-1">{title}</h2>}
          {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
        </div>
      )}
      
      <div className="p-4 sm:p-6">
        {children}
      </div>
    </div>
  );
} 