"use client";

import { useState, useEffect } from 'react';
import { BusinessOpportunity, BusinessOpportunityFormData } from '../lib/types';

export function useOpportunities() {
  const [opportunities, setOpportunities] = useState<BusinessOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  // 模拟初始数据加载
  useEffect(() => {
    // 从localStorage中获取数据，如果有的话
    const savedOpportunities = localStorage.getItem('businessOpportunities');
    if (savedOpportunities) {
      try {
        const parsed = JSON.parse(savedOpportunities);
        // 将字符串日期转换回Date对象
        const formattedData = parsed.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          estimatedInstallationDate: item.estimatedInstallationDate 
            ? new Date(item.estimatedInstallationDate) 
            : undefined
        }));
        setOpportunities(formattedData);
      } catch (error) {
        console.error('Failed to parse saved opportunities:', error);
        setOpportunities([]);
      }
    }
    setLoading(false);
  }, []);

  // 保存数据到localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('businessOpportunities', JSON.stringify(opportunities));
    }
  }, [opportunities, loading]);

  // 添加新商机
  const addOpportunity = (data: BusinessOpportunityFormData) => {
    const newOpportunity: BusinessOpportunity = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      estimatedInstallationDate: data.estimatedInstallationDate 
        ? new Date(data.estimatedInstallationDate) 
        : undefined
    };
    setOpportunities(prev => [newOpportunity, ...prev]);
  };

  // 更新商机
  const updateOpportunity = (id: string, data: BusinessOpportunityFormData) => {
    setOpportunities(prev => 
      prev.map(opportunity => 
        opportunity.id === id
          ? {
              ...opportunity,
              ...data,
              estimatedInstallationDate: data.estimatedInstallationDate 
                ? new Date(data.estimatedInstallationDate) 
                : undefined
            }
          : opportunity
      )
    );
  };

  // 删除商机
  const deleteOpportunity = (id: string) => {
    setOpportunities(prev => 
      prev.filter(opportunity => opportunity.id !== id)
    );
  };

  return {
    opportunities,
    loading,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity
  };
} 