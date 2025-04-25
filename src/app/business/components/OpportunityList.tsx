"use client";

import { useState } from 'react';
import { BusinessOpportunity, Status } from '../lib/types';
import OpportunityItem from './OpportunityItem';
import EmptyState from './EmptyState';
import { Button } from '@/components/ui/button';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface OpportunityListProps {
  opportunities: BusinessOpportunity[];
  onAddNew: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function OpportunityList({
  opportunities,
  onAddNew,
  onEdit,
  onDelete
}: OpportunityListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 处理状态过滤
  const handleStatusFilter = (status: Status | 'all') => {
    setStatusFilter(status);
  };

  // 过滤商机
  const filteredOpportunities = opportunities.filter(opportunity => {
    // 搜索条件
    const matchesSearch = 
      opportunity.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.installationAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 状态过滤
    const matchesStatus = statusFilter === 'all' || opportunity.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // 状态过滤按钮颜色
  const getButtonVariant = (status: Status | 'all') => {
    return statusFilter === status ? "default" : "outline";
  };

  // 状态文本映射
  const statusText = {
    all: "全部",
    new: "新建",
    following: "跟进中",
    quoted: "已报价",
    won: "已成交",
    lost: "已失效"
  };

  if (opportunities.length === 0) {
    return <EmptyState onAddNew={onAddNew} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="搜索公司名称、联系人或地址"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button
          onClick={onAddNew}
          className="flex items-center bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          添加商机
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 pb-2">
        <Button
          size="sm"
          variant={getButtonVariant('all')}
          onClick={() => handleStatusFilter('all')}
        >
          {statusText.all}
        </Button>
        <Button
          size="sm"
          variant={getButtonVariant('new')}
          onClick={() => handleStatusFilter('new')}
        >
          {statusText.new}
        </Button>
        <Button
          size="sm"
          variant={getButtonVariant('following')}
          onClick={() => handleStatusFilter('following')}
        >
          {statusText.following}
        </Button>
        <Button
          size="sm"
          variant={getButtonVariant('quoted')}
          onClick={() => handleStatusFilter('quoted')}
        >
          {statusText.quoted}
        </Button>
        <Button
          size="sm"
          variant={getButtonVariant('won')}
          onClick={() => handleStatusFilter('won')}
        >
          {statusText.won}
        </Button>
        <Button
          size="sm"
          variant={getButtonVariant('lost')}
          onClick={() => handleStatusFilter('lost')}
        >
          {statusText.lost}
        </Button>
      </div>

      {filteredOpportunities.length === 0 ? (
        <div className="py-12 px-4 text-center border border-gray-200 rounded-lg bg-white">
          <p className="text-gray-500">没有找到匹配的商机记录</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredOpportunities.map(opportunity => (
            <OpportunityItem
              key={opportunity.id}
              opportunity={opportunity}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
} 