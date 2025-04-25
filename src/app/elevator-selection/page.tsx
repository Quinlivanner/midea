"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Header from './components/header';
import BasicParameters from './components/BasicParameters';
import DoorConfiguration from './components/DoorConfiguration';
import SelectionResults from './components/SelectionResults';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <div className="bg-white rounded-lg shadow overflow-hidden p-4 sm:p-6 mb-6">
          <BasicParameters disabled={true} />
          <DoorConfiguration disabled={true} />
          <SelectionResults isLoading={loading} />

          <div className="flex justify-between mt-8">
            <Button 
              onClick={handleBack} 
              variant="outline"
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
        </div>
      </div>
    </div>
  );
}

export default function ElevatorSelectionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 flex items-center justify-center">
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