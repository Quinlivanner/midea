"use client";

import React from 'react';

export function MeshPattern({ 
  className,
  color = 'rgba(100, 100, 255, 0.1)',
  size = 40,
  strokeWidth = 1
}: {
  className?: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        opacity: 0.5,
        zIndex: -1
      }}
    >
      <defs>
        <pattern
          id="mesh-pattern"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mesh-pattern)" />
    </svg>
  );
}

export function CirclePattern({
  className,
  color = 'rgba(100, 100, 255, 0.1)',
  size = 80,
  radius = 4
}: {
  className?: string;
  color?: string;
  size?: number;
  radius?: number;
}) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        opacity: 0.5,
        zIndex: -1
      }}
    >
      <defs>
        <pattern
          id="circle-pattern"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={size/2} cy={size/2} r={radius} fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circle-pattern)" />
    </svg>
  );
}

export function GridPattern({
  className,
  color = 'rgba(100, 100, 255, 0.1)',
  size = 20,
  strokeWidth = 1
}: {
  className?: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        opacity: 0.5,
        zIndex: -1
      }}
    >
      <defs>
        <pattern
          id="grid-pattern"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
          />
          <path
            d={`M 0 0 L ${size} ${size}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
} 