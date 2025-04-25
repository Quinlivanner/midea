"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// 从pricingData中获取电梯型号
import { pricingData } from "../data/pricing-data";

interface BasicParamsProps {
  elevatorType: string;
  loadSpeed: string;
  floors: number;
  stops: number;
  doors: number;
  liftHeight: number;
  loadSpeedOptions: string[];
  onElevatorTypeChange: (value: string) => void;
  onLoadSpeedChange: (value: string) => void;
  onFloorsChange: (value: number) => void;
  onStopsChange: (value: number) => void;
  onDoorsChange: (value: number) => void;
  onLiftHeightChange: (value: number) => void;
}

export const BasicParams = ({
  elevatorType,
  loadSpeed,
  floors,
  stops,
  doors,
  liftHeight,
  loadSpeedOptions,
  onElevatorTypeChange,
  onLoadSpeedChange,
  onFloorsChange,
  onStopsChange,
  onDoorsChange,
  onLiftHeightChange,
}: BasicParamsProps) => {
  // 获取所有电梯型号
  const elevatorTypes = Object.keys(pricingData.basePrices);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>基本参数</CardTitle>
        <CardDescription>
          请选择梯型、载重/速度，并填写层数、站数、门数和提升高度
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="elevatorType">梯型</Label>
            <Select
              value={elevatorType}
              onValueChange={onElevatorTypeChange}
            >
              <SelectTrigger id="elevatorType">
                <SelectValue placeholder="请选择梯型" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {elevatorTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "LTHX" ? `${type} (货梯)` : type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loadSpeed">载重/速度</Label>
            <Select
              value={loadSpeed}
              onValueChange={onLoadSpeedChange}
              disabled={!elevatorType}
            >
              <SelectTrigger id="loadSpeed">
                <SelectValue placeholder={elevatorType ? "请选择载重/速度" : "请先选择梯型"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {loadSpeedOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="floors">层数</Label>
            <Input
              id="floors"
              type="number"
              min={2}
              value={floors}
              onChange={(e) => onFloorsChange(parseInt(e.target.value) || 2)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stops">站数</Label>
            <Input
              id="stops"
              type="number"
              min={2}
              value={stops}
              onChange={(e) => onStopsChange(parseInt(e.target.value) || 2)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doors">门数</Label>
            <Input
              id="doors"
              type="number"
              min={2}
              value={doors}
              onChange={(e) => onDoorsChange(parseInt(e.target.value) || 2)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="liftHeight">提升高度 (mm)</Label>
            <Input
              id="liftHeight"
              type="number"
              min={0}
              value={liftHeight}
              onChange={(e) => onLiftHeightChange(parseInt(e.target.value) || 3000)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicParams; 