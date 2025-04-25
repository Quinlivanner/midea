"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddNew: () => void;
}

export default function EmptyState({ onAddNew }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-lg bg-white">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="p-3 bg-blue-100 rounded-full">
          <PlusIcon className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">暂无商机数据</h3>
        <p className="text-sm text-gray-500 max-w-md">
          您还没有添加任何商机数据。点击下方按钮开始创建您的第一个商机。
        </p>
        <Button 
          onClick={onAddNew} 
          className="mt-2 bg-blue-600 hover:bg-blue-700"
        >
          添加商机
        </Button>
      </div>
    </div>
  );
} 