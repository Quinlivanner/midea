"use client";

import { useState, useEffect } from 'react';
import Header from "./components/header";
import OpportunityList from "./components/OpportunityList";
import OpportunityForm from "./components/OpportunityForm";
import PasswordLock from "./components/PasswordLock";
import { useOpportunities } from "./hooks/useOpportunities";
import { BusinessOpportunity, BusinessOpportunityFormData } from "./lib/types";
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { CardContainer } from '@/components/ui/card-container';
import { MeshPattern } from '@/components/icons';

export default function BusinessOpportunityPage() {
  const { 
    opportunities, 
    loading, 
    addOpportunity, 
    updateOpportunity, 
    deleteOpportunity 
  } = useOpportunities();

  const [showForm, setShowForm] = useState(false);
  const [editOpportunity, setEditOpportunity] = useState<BusinessOpportunity | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 检查是否已验证
  useEffect(() => {
    const auth = localStorage.getItem('business_auth');
    if (auth) {
      // 验证通过
      setIsAuthenticated(true);
      
      // 可选：检查令牌是否过期（例如24小时后过期）
      const authTime = new Date(auth).getTime();
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - authTime;
      const oneDayInMs = 24 * 60 * 60 * 1000;
      
      if (timeDiff > oneDayInMs) {
        // 如果验证令牌超过24小时，清除并要求重新验证
        localStorage.removeItem('business_auth');
        setIsAuthenticated(false);
      }
    }
  }, []);

  // 打开新增表单
  const handleAddNew = () => {
    setEditOpportunity(undefined);
    setShowForm(true);
  };

  // 打开编辑表单
  const handleEdit = (id: string) => {
    const opportunity = opportunities.find(op => op.id === id);
    if (opportunity) {
      setEditOpportunity(opportunity);
      setShowForm(true);
    }
  };

  // 确认删除
  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这个商机吗？此操作不可撤销。')) {
      deleteOpportunity(id);
    }
  };

  // 关闭表单
  const handleCancel = () => {
    setShowForm(false);
    setEditOpportunity(undefined);
  };

  // 提交表单
  const handleSubmit = (data: BusinessOpportunityFormData) => {
    if (editOpportunity) {
      updateOpportunity(editOpportunity.id, data);
    } else {
      addOpportunity(data);
    }
    setShowForm(false);
    setEditOpportunity(undefined);
  };

  // 如果未验证，显示密码锁屏
  if (!isAuthenticated) {
    return (
      <>
        <BackgroundGradient variant="primary" />
        <PasswordLock setIsAuthenticated={setIsAuthenticated} />
      </>
    );
  }

  // 已验证，显示正常的商机管理界面
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 md:p-8 relative">
      <BackgroundGradient variant="primary" />
      
      <div className="max-w-6xl mx-auto relative">
        <Header />
        
        {/* 商机管理主容器 */}
        <div className="relative">
          <MeshPattern color="rgba(76, 161, 175, 0.1)" size={30} />
          
          {/* 表单或列表 */}
          {showForm ? (
            <CardContainer 
              title={editOpportunity ? "编辑商机" : "添加新商机"}
              indicatorColor="#4CA1AF"
              useGlass={true}
            >
              <OpportunityForm
                opportunity={editOpportunity}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </CardContainer>
          ) : (
            <CardContainer 
              title="商机列表" 
              subtitle="所有进行中的销售机会"
              indicatorColor="#4CA1AF"
              useGlass={true}
            >
              {loading ? (
                <div className="py-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="text-gray-500 mt-4">加载中...</p>
                </div>
              ) : (
                <OpportunityList
                  opportunities={opportunities}
                  onAddNew={handleAddNew}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </CardContainer>
          )}
        </div>
      </div>
    </div>
  );
} 