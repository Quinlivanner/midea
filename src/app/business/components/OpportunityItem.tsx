"use client";

import { BusinessOpportunity } from "../lib/types";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, PhoneIcon, MapPinIcon, EnvelopeIcon, CalendarIcon,CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface OpportunityItemProps {
  opportunity: BusinessOpportunity;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function OpportunityItem({ 
  opportunity, 
  onEdit, 
  onDelete 
}: OpportunityItemProps) {

  const router = useRouter();

  // 优先级标签颜色
  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800"
  };

  // 状态标签颜色
  const statusColors = {
    new: "bg-blue-100 text-blue-800",
    following: "bg-purple-100 text-purple-800",
    quoted: "bg-orange-100 text-orange-800",
    won: "bg-green-100 text-green-800",
    lost: "bg-gray-100 text-gray-800"
  };

  // 状态文本映射
  const statusText = {
    new: "新建",
    following: "跟进中",
    quoted: "已报价",
    won: "已成交",
    lost: "已失效"
  };

  // 优先级文本映射
  const priorityText = {
    high: "高",
    medium: "中",
    low: "低"
  };

  // 格式化日期
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN').format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium text-gray-900 truncate">{opportunity.companyName}</h3>
          <div className="flex space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[opportunity.priority]}`}>
              {priorityText[opportunity.priority]}优先
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[opportunity.status]}`}>
              {statusText[opportunity.status]}
            </span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPinIcon className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
            <span className="truncate">{opportunity.installationAddress}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <PhoneIcon className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
            <span>{opportunity.contactPhone}</span>
          </div>
          
          {opportunity.email && (
            <div className="flex items-center text-sm text-gray-500">
              <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
              <span className="truncate">{opportunity.email}</span>
            </div>
          )}
          
          {opportunity.estimatedInstallationDate && (
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
              <span>预计安装: {formatDate(opportunity.estimatedInstallationDate)}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            创建于 {formatDate(opportunity.createdAt)}
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={() => onEdit(opportunity.id)} 
              variant="outline" 
              size="sm"
              className="flex items-center"
            >
              <PencilIcon className="h-3 w-3 mr-1" />
              编辑
            </Button>
            <Button 
              onClick={() => router.push(`/elevator-selection?opportunityId=${opportunity.id}`)} 
              variant="outline" 
              size="sm"
              className="flex items-center text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
            >
              <CurrencyDollarIcon className="h-3 w-3 mr-1" />
              报价
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 