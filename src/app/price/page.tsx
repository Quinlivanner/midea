"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from "./components/header";
import PriceCalculator from "./components/PriceCalculator";

function PricePageContent() {
  // 获取URL参数中的opportunityId
  const searchParams = useSearchParams();
  const opportunityId = searchParams.get('opportunityId');

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Header />
        <PriceCalculator opportunityId={opportunityId} />
      </div>
    </div>
  );
}

export default function PricePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    }>
      <PricePageContent />
    </Suspense>
  );
}
