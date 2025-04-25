"use client";

interface BasicParametersProps {
  disabled?: boolean;
}

export default function BasicParameters({ disabled = true }: BasicParametersProps) {
  return (
    <div className="mb-6 border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-blue-600 text-white font-medium px-4 py-2">
        基本选型
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            电梯类型
          </label>
          <select 
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
          >
            <option>EVIN</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            机房类型
          </label>
          <select 
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
          >
            <option>有机房</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            电梯型号
          </label>
          <select 
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
          >
            <option>请选择电梯型号</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            额定载重 (kg)
          </label>
          <select 
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
          >
            <option>请选择额定载重</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            额定速度 (m/s)
          </label>
          <select 
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
          >
            <option>请选择额定速度</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            提升高度 (m)
          </label>
          <input 
            type="text" 
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
            placeholder="输入提升高度"
          />
        </div>
      </div>
    </div>
  );
} 