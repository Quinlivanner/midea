"use client";

import { useState, useEffect } from 'react';
import { 
  BusinessOpportunity, 
  BusinessOpportunityFormData, 
  Priority, 
  Status 
} from '../lib/types';
import { Button } from '@/components/ui/button';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface OpportunityFormProps {
  opportunity?: BusinessOpportunity;
  onSubmit: (data: BusinessOpportunityFormData) => void;
  onCancel: () => void;
}

export default function OpportunityForm({ 
  opportunity, 
  onSubmit, 
  onCancel 
}: OpportunityFormProps) {
  // 初始化表单状态
  const [formData, setFormData] = useState<BusinessOpportunityFormData>({
    companyName: '',
    installationAddress: '',
    contactPerson: '',
    contactPhone: '',
    email: '',
    priority: 'medium',
    estimatedInstallationDate: '',
    description: '',
    source: '',
    status: 'new'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // 如果是编辑模式，填充表单数据
  useEffect(() => {
    if (opportunity) {
      setFormData({
        companyName: opportunity.companyName,
        installationAddress: opportunity.installationAddress,
        contactPerson: opportunity.contactPerson,
        contactPhone: opportunity.contactPhone,
        email: opportunity.email || '',
        priority: opportunity.priority,
        estimatedInstallationDate: opportunity.estimatedInstallationDate 
          ? opportunity.estimatedInstallationDate.toISOString().split('T')[0]
          : '',
        description: opportunity.description || '',
        source: opportunity.source || '',
        status: opportunity.status
      });
    }
  }, [opportunity]);

  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 清除错误
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // 表单验证
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = '公司名称不能为空';
    }
    
    if (!formData.installationAddress.trim()) {
      newErrors.installationAddress = '安装地址不能为空';
    }
    
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = '联系人不能为空';
    }
    
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = '联系电话不能为空';
    } else if (!/^1[3-9]\d{9}$/.test(formData.contactPhone)) {
      newErrors.contactPhone = '请输入有效的手机号码';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {opportunity ? '编辑商机' : '新增商机'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 公司名称 */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              公司名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors.companyName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs">{errors.companyName}</p>
            )}
          </div>

          {/* 安装地址 */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              安装地址 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="installationAddress"
              value={formData.installationAddress}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors.installationAddress ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.installationAddress && (
              <p className="text-red-500 text-xs">{errors.installationAddress}</p>
            )}
          </div>

          {/* 联系人 */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              联系人 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors.contactPerson ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.contactPerson && (
              <p className="text-red-500 text-xs">{errors.contactPerson}</p>
            )}
          </div>

          {/* 联系电话 */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              联系电话 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors.contactPhone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.contactPhone && (
              <p className="text-red-500 text-xs">{errors.contactPhone}</p>
            )}
          </div>

          {/* 邮箱 */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              邮箱
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          {/* 优先级 */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              优先级
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </div>

          {/* 预计安装日期 */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              预计安装日期
            </label>
            <input
              type="date"
              name="estimatedInstallationDate"
              value={formData.estimatedInstallationDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* 商机来源 */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              商机来源
            </label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="例如：线上咨询、展会、客户介绍等"
            />
          </div>

          {/* 状态 */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              状态
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="new">新建</option>
              <option value="following">跟进中</option>
              <option value="quoted">已报价</option>
              <option value="won">已成交</option>
              <option value="lost">已失效</option>
            </select>
          </div>
        </div>

        {/* 项目描述 */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            项目描述/备注
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="请输入项目的详细描述或其他备注信息"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            取消
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
          >
            {opportunity ? '保存修改' : '添加商机'}
          </Button>
        </div>
      </form>
    </div>
  );
} 