"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Header from './components/header';
import BasicParameters from './components/BasicParameters';
import DoorConfiguration from './components/DoorConfiguration';
import SelectionResults from './components/SelectionResults';
import { Button } from '@/components/ui/button';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { CardContainer } from '@/components/ui/card-container';
import { CirclePattern } from '@/components/icons';

function ElevatorSelectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const opportunityId = searchParams.get('opportunityId');
  const [loading, setLoading] = useState(true);

  // 模拟加载选型数据
  useEffect(() => {
    // 假设我们正在加载数据
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // 确认选型，跳转到报价页面
  const handleConfirm = () => {
    router.push(`/price?opportunityId=${opportunityId}`);
  };
  
  // 返回商机页面
  const handleBack = () => {
    router.push('/business');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 md:p-8">
      <BackgroundGradient variant="secondary" />
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-blue-900">电梯选型</h1>
          <p className="text-gray-600">根据需求配置最适合的电梯方案</p>
        </div>
        
        <Header />
        
        <div className="relative">
          <CirclePattern color="rgba(66, 139, 246, 0.1)" size={60} radius={3} />
          
          <CardContainer 
            title="选型配置" 
            indicatorColor="#427DF6"
            useGlass={true}
          >
            <BasicParameters disabled={true} />
            <DoorConfiguration disabled={true} />
            <SelectionResults isLoading={loading} />

            <div className="flex justify-between mt-8">
              <Button 
                onClick={handleBack} 
                variant="outline"
                className="hover:bg-blue-50"
              >
                返回商机列表
              </Button>
              
              <Button 
                onClick={handleConfirm} 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                确认选型并进入报价
              </Button>
            </div>
          </CardContainer>
        </div>
      </div>
    </div>
  );
}

export default function ElevatorSelectionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <BackgroundGradient variant="secondary" />
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    }>
      <ElevatorSelectionContent />
    </Suspense>
  );
} 