"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "../lib/calculator";

interface ResultProps {
  isCalculated: boolean;
  result: {
    basePrice: number;
    extraLayerPrice: number;
    basicTotal: number;
    basicDiscount: number;
    basicNet: number;
    optionsPrices: { [key: string]: number };
    optionsTotal: number;
    optionsDiscount: number;
    optionsNet: number;
    shippingFee: number;
    unitTotal: number;
    grandTotal: number;
    standardSizes: {
      shaftSize: string;
      carSize: string;
    } | null;
  };
  quantity: number;
}

// 选配项目名称映射
const optionNameMap: { [key: string]: string } = {
  emergency: "停电应急",
  russianPackage: "俄罗斯包",
  fireCarDoor: "防火轎门",
  fireFirstFloorDoor: "防火首层层门",
  fireOtherFloorDoor: "防火其他层门",
  mirror: "轿厢后壁半高全宽镜子",
  arrivalBell: "到站钟",
  handrail: "扶手",
  guard: "护栏",
  fireFunction: "消防功能",
  safetyWindow: "安全窗",
  shaftHeight: "井道超高",
};

export const Result = ({ isCalculated, result, quantity }: ResultProps) => {
  if (!isCalculated) {
    return null;
  }

  const {
    basePrice,
    extraLayerPrice,
    basicTotal,
    basicDiscount,
    basicNet,
    optionsPrices,
    optionsTotal,
    optionsDiscount,
    optionsNet,
    shippingFee,
    unitTotal,
    grandTotal,
    standardSizes,
  } = result;

  return (
    <Card>
      <CardHeader>
        <CardTitle>计算结果</CardTitle>
        <CardDescription>
          电梯报价明细及总价
        </CardDescription>
      </CardHeader>
      <CardContent>
        {standardSizes && (
          <Card className="mb-6 bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">标准尺寸参考</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">井道尺寸：</p>
                  <p className="text-gray-700">{standardSizes.shaftSize}</p>
                </div>
                <div>
                  <p className="font-medium">轿厢尺寸：</p>
                  <p className="text-gray-700">{standardSizes.carSize}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>项目</TableHead>
              <TableHead className="text-right">金额</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* 基础价格部分 */}
            <TableRow>
              <TableCell>基价</TableCell>
              <TableCell className="text-right">{formatCurrency(basePrice)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>加层费用</TableCell>
              <TableCell className="text-right">{formatCurrency(extraLayerPrice)}</TableCell>
            </TableRow>
            <TableRow className="bg-blue-50">
              <TableCell className="font-medium">基础小计</TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(basicTotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>基础折扣</TableCell>
              <TableCell className="text-right">{formatCurrency(basicDiscount)}</TableCell>
            </TableRow>
            <TableRow className="bg-blue-100">
              <TableCell className="font-medium">基础折后价</TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(basicNet)}</TableCell>
            </TableRow>

            {/* 选配项目部分 */}
            <TableRow className="bg-gray-100">
              <TableCell colSpan={2} className="font-medium">选配项目</TableCell>
            </TableRow>

            {/* 动态生成选配项目价格 */}
            {Object.entries(optionsPrices).map(([key, price]) => (
              <TableRow key={key}>
                <TableCell>{optionNameMap[key] || key}</TableCell>
                <TableCell className="text-right">{formatCurrency(price)}</TableCell>
              </TableRow>
            ))}

            <TableRow className="bg-blue-50">
              <TableCell className="font-medium">选配小计</TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(optionsTotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>选配折扣</TableCell>
              <TableCell className="text-right">{formatCurrency(optionsDiscount)}</TableCell>
            </TableRow>
            <TableRow className="bg-blue-100">
              <TableCell className="font-medium">选配折后价</TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(optionsNet)}</TableCell>
            </TableRow>

            {/* 总价部分 */}
            <TableRow className="bg-green-100">
              <TableCell className="font-medium">单台总价</TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(unitTotal)}</TableCell>
            </TableRow>
            
            {/* 添加运费行 */}
            {shippingFee > 0 && (
              <TableRow className="bg-yellow-50">
                <TableCell className="font-medium">运费</TableCell>
                <TableCell className="text-right">{formatCurrency(shippingFee)}</TableCell>
              </TableRow>
            )}
            
            <TableRow className="bg-red-100">
              <TableCell className="font-medium">项目总价 (台数: {quantity})</TableCell>
              <TableCell className="text-right font-bold text-lg">{formatCurrency(grandTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Result; 