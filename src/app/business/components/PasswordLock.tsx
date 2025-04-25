"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

interface PasswordLockProps {
  setIsAuthenticated: (value: boolean) => void;
}

export default function PasswordLock({ setIsAuthenticated }: PasswordLockProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 自动聚焦输入框
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // 处理密码更改
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError('');
  };
  
  // 处理密码提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      setError('请输入密码');
      return;
    }
    
    setIsAuthenticating(true);
    
    // 模拟验证延迟
    setTimeout(() => {
      if (password === 'james666') {
        // 验证成功
        setShowSuccess(true);
        
        // 保存验证状态到localStorage
        localStorage.setItem('business_auth', new Date().toISOString());
        
        // 延迟后设置认证状态，让成功动画有时间显示
        setTimeout(() => {
          setIsAuthenticated(true);
        }, 1000);
      } else {
        // 验证失败
        setAttempts(prev => prev + 1);
        setError(`密码错误，请重试 (${attempts + 1}/5)`);
        setIsShaking(true);
        
        // 停止抖动动画
        setTimeout(() => {
          setIsShaking(false);
        }, 500);
        
        // 如果尝试次数过多，禁用表单一段时间
        if (attempts >= 4) {
          setError('尝试次数过多，请稍后再试');
          setTimeout(() => {
            setAttempts(0);
            setError('');
          }, 30000);
        }
      }
      
      setIsAuthenticating(false);
      setPassword('');
    }, 800);
  };
  
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-blue-600/30 z-0" />
        <div className="w-full h-full flex items-center justify-center opacity-10">
          <Image
            src="/mdv.png"
            alt="MDV Logo"
            width={400}
            height={400}
            priority
            className="object-contain max-w-3xl"
          />
        </div>
      </div>
      
      <div 
        className={`w-full max-w-md p-8 backdrop-blur-xl bg-white/70 rounded-lg shadow-2xl 
        border border-white/20 overflow-hidden transition-all duration-200 
        ${isShaking ? 'animate-shake' : ''}`}
      >
        <div className="text-center mb-6">
          <div className="mx-auto bg-blue-600 text-white w-16 h-16 flex items-center justify-center rounded-full mb-4">
            {showSuccess ? (
              <ShieldCheckIcon className="w-8 h-8 animate-pulse" />
            ) : (
              <LockClosedIcon className="w-8 h-8" />
            )}
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {showSuccess ? '验证成功' : '商机管理系统'}
          </h2>
          <p className="text-gray-600 text-sm">
            {showSuccess 
              ? '正在进入系统...' 
              : '请输入密码进入系统'
            }
          </p>
        </div>
        
        {!showSuccess && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isAuthenticating || attempts >= 5}
                  className={`w-full px-4 py-3 bg-white/60 border ${
                    error ? 'border-red-300' : 'border-gray-200'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all`}
                  placeholder="请输入密码"
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isAuthenticating || attempts >= 5 || !password}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all
              ${isAuthenticating 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              }
              ${attempts >= 5 ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isAuthenticating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  验证中...
                </span>
              ) : '验证密码'}
            </button>
          </form>
        )}
        
        {showSuccess && (
          <div className="border border-green-200 rounded-lg bg-green-50 p-4 mt-4 flex items-center justify-center">
            <div className="text-green-500 text-sm">验证成功，即将进入系统</div>
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t border-gray-200/50">
          <p className="text-center text-xs text-gray-500">
            美的集团电梯商机管理系统 | 安全认证
          </p>
        </div>
      </div>
      
      {/* 自定义动画样式 */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>
    </div>
  );
} 