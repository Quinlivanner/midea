"use client";

interface SelectionResultsProps {
  isLoading?: boolean;
}

export default function SelectionResults({ isLoading = false }: SelectionResultsProps) {
  const dimensions = {
    carWidth: { value: 1600, unit: 'mm' },
    carDepth: { value: 1400, unit: 'mm' },
    carHeight: { value: 2300, unit: 'mm' },
    shaftWidth: { value: 2200, unit: 'mm' },
    shaftDepth: { value: 2100, unit: 'mm' },
    topFloorHeight: { value: 4200, unit: 'mm' },
    pitDepth: { value: 1500, unit: 'mm' },
    capacity: { value: 13, unit: '人' },
    areaWeight: { value: 900, unit: 'kg' }
  };

  return (
    <div className="mb-6 border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-green-600 text-white font-medium px-4 py-2">
        选型结果
      </div>
      
      {isLoading ? (
        <div className="p-12 text-center">
          <p className="text-gray-500">正在计算选型结果...</p>
        </div>
      ) : (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-800 border-b pb-2">轿厢尺寸</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500">宽度 CW</label>
                  <div className="flex items-baseline">
                    <span className="text-lg font-medium">{dimensions.carWidth.value}</span>
                    <span className="text-xs text-gray-500 ml-1">{dimensions.carWidth.unit}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500">深度 CD</label>
                  <div className="flex items-baseline">
                    <span className="text-lg font-medium">{dimensions.carDepth.value}</span>
                    <span className="text-xs text-gray-500 ml-1">{dimensions.carDepth.unit}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500">高度 CH</label>
                  <div className="flex items-baseline">
                    <span className="text-lg font-medium">{dimensions.carHeight.value}</span>
                    <span className="text-xs text-gray-500 ml-1">{dimensions.carHeight.unit}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-800 border-b pb-2">井道尺寸</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500">宽度 SW</label>
                  <div className="flex items-baseline">
                    <span className="text-lg font-medium">{dimensions.shaftWidth.value}</span>
                    <span className="text-xs text-gray-500 ml-1">{dimensions.shaftWidth.unit}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500">深度 SD</label>
                  <div className="flex items-baseline">
                    <span className="text-lg font-medium">{dimensions.shaftDepth.value}</span>
                    <span className="text-xs text-gray-500 ml-1">{dimensions.shaftDepth.unit}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500">顶层高度 K</label>
                  <div className="flex items-baseline">
                    <span className="text-lg font-medium">{dimensions.topFloorHeight.value}</span>
                    <span className="text-xs text-gray-500 ml-1">{dimensions.topFloorHeight.unit}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500">底坑深度 S</label>
                  <div className="flex items-baseline">
                    <span className="text-lg font-medium">{dimensions.pitDepth.value}</span>
                    <span className="text-xs text-gray-500 ml-1">{dimensions.pitDepth.unit}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-800 border-b pb-2">其他信息</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500">载重/人数</label>
                  <div className="flex items-baseline">
                    <span className="text-lg font-medium">{dimensions.capacity.value}</span>
                    <span className="text-xs text-gray-500 ml-1">{dimensions.capacity.unit}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500">面积折算载重</label>
                  <div className="flex items-baseline">
                    <span className="text-lg font-medium">{dimensions.areaWeight.value}</span>
                    <span className="text-xs text-gray-500 ml-1">{dimensions.areaWeight.unit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 px-3 py-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              注：以上尺寸为推荐参考值，实际安装尺寸请以技术图纸为准。如需定制尺寸，请联系技术支持。
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 