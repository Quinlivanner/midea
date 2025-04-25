"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from "./components/header";
import PriceCalculator from "./components/PriceCalculator";
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { CardContainer } from '@/components/ui/card-container'; 
import { GridPattern } from '@/components/icons';

function PricePageContent() {
  // 获取URL参数中的opportunityId
  const searchParams = useSearchParams();
  const opportunityId = searchParams.get('opportunityId');

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 md:p-8">
      <BackgroundGradient variant="tertiary" />
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-teal-900">报价管理</h1>
          <p className="text-gray-600">根据选型生成精准报价方案</p>
        </div>
        
        <Header />
        
        <div className="relative">
          <GridPattern color="rgba(37, 201, 198, 0.1)" size={25} />
          
          <CardContainer 
            title="报价计算" 
            subtitle={opportunityId ? `商机ID: ${opportunityId}` : "新建报价"}
            indicatorColor="#25C9C6"
            useGlass={true}
          >
            <PriceCalculator opportunityId={opportunityId} />
          </CardContainer>
        </div>
      </div>
    </div>
  );
}

export default function PricePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <BackgroundGradient variant="tertiary" />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    }>
      <PricePageContent />
    </Suspense>
  );
}
