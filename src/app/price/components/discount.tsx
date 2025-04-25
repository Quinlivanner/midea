"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DiscountProps {
  isPercentDiscount: boolean;
  discountValue: number;
  onDiscountTypeChange: (value: boolean) => void;
  onDiscountValueChange: (value: number) => void;
}

export const Discount = ({
  isPercentDiscount,
  discountValue,
  onDiscountTypeChange,
  onDiscountValueChange,
}: DiscountProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>折扣设置</CardTitle>
        <CardDescription>
          选择折扣类型和折扣值
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <RadioGroup
            value={isPercentDiscount ? "percent" : "fixed"}
            onValueChange={(value) => onDiscountTypeChange(value === "percent")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="percent" id="percentDiscount" />
              <Label htmlFor="percentDiscount">百分比折扣</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fixed" id="fixedDiscount" />
              <Label htmlFor="fixedDiscount">固定金额折扣</Label>
            </div>
          </RadioGroup>

          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={discountValue}
              onChange={(e) => onDiscountValueChange(parseFloat(e.target.value) || 0)}
              min={0}
              max={isPercentDiscount ? 100 : undefined}
              step={0.01}
              className="w-32"
            />
            <span>{isPercentDiscount ? "%" : "元"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Discount; 