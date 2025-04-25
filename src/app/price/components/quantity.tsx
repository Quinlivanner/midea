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
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface QuantityProps {
  quantity: number;
  onQuantityChange: (value: number) => void;
  onCalculate: () => void;
  validationError: string | null;
}

export const Quantity = ({
  quantity,
  onQuantityChange,
  onCalculate,
  validationError,
}: QuantityProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>台数设置</CardTitle>
        <CardDescription>
          设置电梯台数并计算报价
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="quantity">台数</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
              min={1}
              className="w-32"
            />
          </div>

          <div className="flex flex-col items-center">
            <Button 
              onClick={onCalculate} 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-lg"
            >
              计算报价
            </Button>
            
            {validationError && (
              <div className="flex items-center mt-2 text-red-500">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span className="text-sm">{validationError}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Quantity; 