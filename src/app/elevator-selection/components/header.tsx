"use client";

import Image from 'next/image';

export const Header = () => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex items-center justify-center w-full mb-4">
        <div className="flex items-center mr-4">
          <Image
            src="/mdv.png"
            alt="MDV Logo"
            width={120}
            height={120}
            className="mr-2"
          />
        </div>
        <Image
          src="/media-logo.png"
          alt="Midea Logo"
          width={100}
          height={40}
        />
      </div>
      <h1 className="text-3xl font-bold text-blue-600 mb-2">电梯选型系统</h1>
      <p className="text-gray-500 text-center max-w-2xl">
        美的集团电梯选型工具，帮助您选择最合适的电梯配置
      </p>
    </div>
  );
};

export default Header; 