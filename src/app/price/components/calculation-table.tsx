"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "../utils/format";

// 为了保持兼容性，我们定义一个适配接口
interface CalculationTableResult {
  elevatorType: string;
  basePrice: number;
  optionsPrices: { [key: string]: number };
  extraLayerPrice: number;
  discountAmount: number;
  totalPriceBeforeDiscount: number;
  totalPrice: number;
  finalPrice: number;
  quantity: number;
  standardSizes: {
    shaftSize: string;
    carSize: string;
    machineRoomSize: string;
    doorOpeningSize: string;
  } | null;
}

interface CalculationTableProps {
  result: CalculationTableResult;
  onPrint: () => void;
}

export default function CalculationTable({ result, onPrint }: CalculationTableProps) {
  const {
    elevatorType,
    basePrice,
    optionsPrices,
    extraLayerPrice,
    discountAmount,
    totalPriceBeforeDiscount,
    totalPrice,
    finalPrice,
    quantity,
    standardSizes,
  } = result;

  // 选项名称映射
  const optionNameMap: Record<string, string> = {
    emergency: "停电应急",
    russianPackage: "俄罗斯包",
    fireCarDoor: "防火轎门",
    fireFirstFloorDoor: "防火首层层门",
    fireOtherFloorDoor: "防火其他层门",
    arrivalBell: "到站钟",
    overload: "超载",
    handrail: "扶手",
    mirror: "轿厢后壁半高全宽镜子",
    guard: "护栏",
    fireFunction: "消防功能",
    safetyWindow: "安全窗",
    shaftHeight: "井道超高",
  };

  // 创建额外选项的表格行
  const optionRows = Object.entries(optionsPrices).map(([key, price]) => {
    const optionName = optionNameMap[key] || key;
    return (
      <TableRow key={key}>
        <TableCell className="font-medium">{optionName}</TableCell>
        <TableCell className="text-right">{formatCurrency(price)}</TableCell>
      </TableRow>
    );
  });

  // 设置电梯类型的中文名称
  const elevatorTypeNames: Record<string, string> = {
    "LTHX": "货梯",
    "EVIN": "电梯",
    "EVIK": "电梯"
  };

  const elevatorTypeName = elevatorTypeNames[elevatorType] || elevatorType;

  return (
    <Card className="w-full mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">计算明细表</CardTitle>
        <Button onClick={onPrint} variant="outline" className="no-print">
          打印报价单
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>电梯报价计算明细</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>项目</TableHead>
              <TableHead className="text-right">金额 (元)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">电梯型号</TableCell>
              <TableCell className="text-right">{elevatorTypeName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">基价</TableCell>
              <TableCell className="text-right">{formatCurrency(basePrice)}</TableCell>
            </TableRow>
            {extraLayerPrice > 0 && (
              <TableRow>
                <TableCell className="font-medium">加价</TableCell>
                <TableCell className="text-right">{formatCurrency(extraLayerPrice)}</TableCell>
              </TableRow>
            )}
            
            {/* 选项价格 */}
            {optionRows.length > 0 && (
              <>
                <TableRow className="bg-muted/50">
                  <TableCell colSpan={2} className="font-semibold">选配</TableCell>
                </TableRow>
                {optionRows}
              </>
            )}

            <TableRow className="bg-muted/50">
              <TableCell className="font-semibold">折扣前总价</TableCell>
              <TableCell className="text-right font-semibold">{formatCurrency(totalPriceBeforeDiscount)}</TableCell>
            </TableRow>
            
            {discountAmount > 0 && (
              <TableRow>
                <TableCell className="font-medium">折扣金额</TableCell>
                <TableCell className="text-right text-red-500">-{formatCurrency(discountAmount)}</TableCell>
              </TableRow>
            )}
            
            <TableRow>
              <TableCell className="font-medium">单台价格</TableCell>
              <TableCell className="text-right">{formatCurrency(totalPrice)}</TableCell>
            </TableRow>
            
            {quantity > 1 && (
              <TableRow>
                <TableCell className="font-medium">台数</TableCell>
                <TableCell className="text-right">{quantity} 台</TableCell>
              </TableRow>
            )}
            
            <TableRow className="bg-primary/10">
              <TableCell className="font-bold text-lg">最终总价</TableCell>
              <TableCell className="text-right font-bold text-lg">{formatCurrency(finalPrice)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        {standardSizes && (
          <div className="mt-6 border p-4 rounded-md bg-gray-50">
            <h3 className="font-semibold text-lg mb-2">标准尺寸规格</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">轿厢尺寸:</p>
                <p>{standardSizes.carSize}</p>
              </div>
              <div>
                <p className="text-sm font-medium">井道尺寸:</p>
                <p>{standardSizes.shaftSize}</p>
              </div>
              <div>
                <p className="text-sm font-medium">机房尺寸:</p>
                <p>{standardSizes.machineRoomSize}</p>
              </div>
              <div>
                <p className="text-sm font-medium">开门尺寸:</p>
                <p>{standardSizes.doorOpeningSize}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 border-t pt-4 print-only">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-medium mb-2">客户信息:</p>
              <div className="border-b pb-2 mb-2">公司名称: _______________________</div>
              <div className="border-b pb-2 mb-2">联系人: _________________________</div>
              <div className="border-b pb-2">联系电话: _______________________</div>
            </div>
            <div>
              <p className="font-medium mb-2">销售信息:</p>
              <div className="border-b pb-2 mb-2">销售顾问: _______________________</div>
              <div className="border-b pb-2 mb-2">签约日期: _______________________</div>
              <div className="border-b pb-2">有效期至: _______________________</div>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="font-medium mb-2">备注:</p>
            <div className="border p-4 h-24"></div>
          </div>
          
          <div className="flex justify-end mt-8">
            <div>
              <p>签字确认: _______________________</p>
              <p className="mt-6">公司盖章: _______________________</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 