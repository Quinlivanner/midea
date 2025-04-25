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

interface ShippingProps {
  shippingFee: number;
  onShippingFeeChange: (value: number) => void;
}

export const Shipping = ({
  shippingFee,
  onShippingFeeChange,
}: ShippingProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>运费设置</CardTitle>
        <CardDescription>
          输入产品运输费用
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="shippingFee">运费 (元)</Label>
          <Input
            id="shippingFee"
            type="number"
            value={shippingFee}
            onChange={(e) => onShippingFeeChange(parseFloat(e.target.value) || 0)}
            min={0}
            step={0.01}
            className="w-32"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Shipping; 