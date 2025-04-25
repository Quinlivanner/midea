"use client";

import { useSearchParams } from 'next/navigation';
import Header from "./components/header";
import PriceCalculator from "./components/PriceCalculator";

export default function PricePage() {
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
