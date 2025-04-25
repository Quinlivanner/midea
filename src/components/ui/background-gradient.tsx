"use client";

import React from 'react';

interface BackgroundGradientProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

export function BackgroundGradient({
  variant = 'primary',
  className,
}: BackgroundGradientProps) {
  const variants = {
    primary: {
      // 商机模块 - 更改为柔和的蓝绿色调
      first: "top:10vh;right:-200px;width:500px;height:500px;opacity:0.6;background:radial-gradient(circle, rgba(100, 204, 197, 1) 0%, rgba(76, 161, 175, 0.8) 50%, rgba(46, 144, 162, 0) 100%);filter:blur(80px);animation:float 12s ease-in-out infinite",
      second: "bottom:15vh;left:-150px;width:450px;height:450px;opacity:0.4;background:radial-gradient(circle, rgba(88, 178, 172, 1) 0%, rgba(65, 138, 150, 0.7) 50%, rgba(38, 120, 135, 0) 100%);filter:blur(90px);animation:float 15s ease-in-out infinite reverse",
    },
    secondary: {
      // 选型模块 - 蓝色系
      first: "top:15vh;right:-180px;width:480px;height:480px;opacity:0.7;background:radial-gradient(circle, rgba(93, 159, 255, 1) 0%, rgba(66, 125, 212, 0.8) 50%, rgba(45, 96, 179, 0) 100%);filter:blur(80px);animation:float 14s ease-in-out infinite",
      second: "bottom:10vh;left:-170px;width:470px;height:470px;opacity:0.5;background:radial-gradient(circle, rgba(66, 139, 246, 1) 0%, rgba(41, 109, 207, 0.7) 50%, rgba(28, 85, 170, 0) 100%);filter:blur(85px);animation:float 16s ease-in-out infinite reverse",
    },
    tertiary: {
      // 报价模块 - 青绿色系
      first: "top:12vh;right:-190px;width:490px;height:490px;opacity:0.7;background:radial-gradient(circle, rgba(37, 201, 198, 1) 0%, rgba(32, 164, 172, 0.8) 50%, rgba(21, 135, 142, 0) 100%);filter:blur(80px);animation:float 13s ease-in-out infinite",
      second: "bottom:12vh;left:-160px;width:460px;height:460px;opacity:0.5;background:radial-gradient(circle, rgba(27, 182, 163, 1) 0%, rgba(22, 145, 135, 0.7) 50%, rgba(18, 118, 110, 0) 100%);filter:blur(87px);animation:float 17s ease-in-out infinite reverse",
    },
  };

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-[-1] ${className}`}>
      <div style={{ position: 'absolute', ...stringToObject(variants[variant].first) }}></div>
      <div style={{ position: 'absolute', ...stringToObject(variants[variant].second) }}></div>
    </div>
  );
}

// 辅助函数：将CSS字符串转换为对象
function stringToObject(styleString: string) {
  const result: Record<string, string> = {};
  styleString.split(';').forEach(item => {
    const [key, value] = item.split(':');
    if (key && value) {
      result[key.trim()] = value.trim();
    }
  });
  return result;
} 