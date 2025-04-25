"use client";

import { useState } from 'react';
import { usePriceCalculator } from "../hooks/usePriceCalculator";
import BasicParams from "./basic-params";
import DoorMaterial from "./door-material";
import Options from "./options";
import Discount from "./discount";
import Shipping from "./shipping";
import Quantity from "./quantity";
import Result from "./result";
import CalculationTable from "./calculation-table";
import { Button } from "@/components/ui/button";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface PriceCalculatorProps {
  opportunityId?: string | null;
}

export default function PriceCalculator({ opportunityId }: PriceCalculatorProps) {
  const {
    formState,
    updateFormField,
    updateOption,
    loadSpeedOptions,
    result,
    isCalculated,
    validationError,
    calculatePrice,
    resetForm,
  } = usePriceCalculator();

  const [showPrintView, setShowPrintView] = useState(false);

  // 处理打印功能
  const handlePrint = (e?: React.MouseEvent) => {
    // 如果是来自按钮点击，阻止默认行为
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // 切换到打印视图
    setShowPrintView(true);
    
    // 延迟执行打印
    setTimeout(() => {
      try {
        window.print();
      } catch (error) {
        console.error("打印失败:", error);
      }
      
      // 打印完成后切换回正常视图
      setTimeout(() => {
        setShowPrintView(false);
      }, 500);
    }, 300);
  };

  return (
    <div className={`space-y-8 md:space-y-10 py-4 ${showPrintView ? 'print-view' : ''}`}>
      {opportunityId && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
          <p className="text-sm text-blue-700">
            商机ID: {opportunityId} - 已从选型系统导入配置
          </p>
        </div>
      )}

      {/* 非打印视图 - 完整表单 */}
      <div className={showPrintView ? 'hidden' : ''}>
        <div className="mb-6 md:mb-8">
          <BasicParams
            elevatorType={formState.elevatorType}
            loadSpeed={formState.loadSpeed}
            floors={formState.floors}
            stops={formState.stops}
            doors={formState.doors}
            liftHeight={formState.liftHeight}
            loadSpeedOptions={loadSpeedOptions}
            onElevatorTypeChange={(value) => updateFormField("elevatorType", value)}
            onLoadSpeedChange={(value) => updateFormField("loadSpeed", value)}
            onFloorsChange={(value) => updateFormField("floors", value)}
            onStopsChange={(value) => updateFormField("stops", value)}
            onDoorsChange={(value) => updateFormField("doors", value)}
            onLiftHeightChange={(value) => updateFormField("liftHeight", value)}
          />
        </div>

        <div className="mb-6 md:mb-8">
          <DoorMaterial
            doorSize={formState.doorSize}
            carDoorMaterial={formState.carDoorMaterial}
            firstFloorDoorMaterial={formState.firstFloorDoorMaterial}
            otherFloorDoorMaterial={formState.otherFloorDoorMaterial}
            elevatorType={formState.elevatorType}
            onDoorSizeChange={(value) => updateFormField("doorSize", value)}
            onCarDoorMaterialChange={(value) => updateFormField("carDoorMaterial", value)}
            onFirstFloorDoorMaterialChange={(value) => updateFormField("firstFloorDoorMaterial", value)}
            onOtherFloorDoorMaterialChange={(value) => updateFormField("otherFloorDoorMaterial", value)}
          />
        </div>

        <div className="mb-6 md:mb-8">
          <Options
            options={formState.options}
            onOptionChange={updateOption}
            doorSize={formState.doorSize}
            carDoorMaterial={formState.carDoorMaterial}
            firstFloorDoorMaterial={formState.firstFloorDoorMaterial}
            otherFloorDoorMaterial={formState.otherFloorDoorMaterial}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 md:mb-8">
          <Discount
            isPercentDiscount={formState.isPercentDiscount}
            discountValue={formState.discountValue}
            onDiscountTypeChange={(value) => updateFormField("isPercentDiscount", value)}
            onDiscountValueChange={(value) => updateFormField("discountValue", value)}
          />

          <Shipping
            shippingFee={formState.shippingFee}
            onShippingFeeChange={(value) => updateFormField("shippingFee", value)}
          />
        </div>

        <div className="mb-6 md:mb-8">
          <Quantity
            quantity={formState.quantity}
            onQuantityChange={(value) => updateFormField("quantity", value)}
            onCalculate={calculatePrice}
            validationError={validationError}
          />
        </div>

        {isCalculated && (
          <>
            <div className="mb-6 md:mb-8">
              <Result
                isCalculated={isCalculated}
                result={result}
                quantity={formState.quantity}
              />
            </div>
            
            <div className="flex justify-between mt-6 mb-4">
              <Button 
                onClick={resetForm}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowPathIcon className="w-4 h-4" />
                重置表单
              </Button>
              
              <Button 
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-700"
                type="button"
              >
                打印报价单
              </Button>
            </div>
          </>
        )}
      </div>
      
      {/* 打印视图 - 只有计算结果 */}
      <div className={`print-container ${!showPrintView ? 'hidden' : ''}`}>
        <div className="print-header mb-8">
          <h1 className="text-2xl font-bold text-center">美的电梯报价单</h1>
          <p className="text-center text-gray-500">生成日期: {new Date().toLocaleDateString()}</p>
          {opportunityId && (
            <p className="text-center text-gray-500 mt-1">商机编号: {opportunityId}</p>
          )}
        </div>
        
        {isCalculated && (
          <CalculationTable 
            result={{
              elevatorType: formState.elevatorType,
              basePrice: result.basePrice,
              optionsPrices: result.optionsPrices,
              extraLayerPrice: result.extraLayerPrice,
              discountAmount: result.basicDiscount + result.optionsDiscount,
              totalPriceBeforeDiscount: result.basicTotal + result.optionsTotal,
              totalPrice: result.unitTotal,
              finalPrice: result.grandTotal,
              quantity: formState.quantity,
              standardSizes: result.standardSizes ? {
                ...result.standardSizes,
                machineRoomSize: "标准",
                doorOpeningSize: formState.doorSize
              } : null
            }}
            onPrint={handlePrint}
          />
        )}
      </div>
      
      {/* 打印样式 */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container,
          .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20mm;
          }
        }
        
        .print-only {
          display: none;
        }
        
        @media print {
          .print-only {
            display: block;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
} 