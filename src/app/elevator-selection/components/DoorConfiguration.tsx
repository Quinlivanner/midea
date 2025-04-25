"use client";

interface DoorConfigurationProps {
  disabled?: boolean;
}

export default function DoorConfiguration({ disabled = true }: DoorConfigurationProps) {
  return (
    <div className="mb-6 border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-blue-600 text-white font-medium px-4 py-2">
        门与井道配置
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              贯通门（前后开门）
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  disabled={disabled}
                  checked={true}
                  className="form-radio text-blue-600"
                  name="doorType"
                />
                <span className="ml-2 text-sm text-gray-700">贯通门</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  disabled={disabled}
                  className="form-radio text-blue-600"
                  name="doorType"
                />
                <span className="ml-2 text-sm text-gray-700">单开门</span>
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              对重位置
            </label>
            <select 
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
            >
              <option>侧置</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              开门类型
            </label>
            <select 
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
            >
              <option>中分两扇门(C2)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              门宽 DW (mm)
            </label>
            <input 
              type="text" 
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
              value="800"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              门高 DH (mm)
            </label>
            <input 
              type="text" 
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
              value="2100"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              玻璃门/魔光梯门
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  disabled={disabled}
                  className="form-radio text-blue-600"
                  name="glassDoor"
                />
                <span className="ml-2 text-sm text-gray-700">是</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  disabled={disabled}
                  checked={true}
                  className="form-radio text-blue-600"
                  name="glassDoor"
                />
                <span className="ml-2 text-sm text-gray-700">否</span>
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              对重安全钳
            </label>
            <select 
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
            >
              <option>否</option>
              <option>是</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              设计标准
            </label>
            <select 
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
            >
              <option>EN81-20/50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 