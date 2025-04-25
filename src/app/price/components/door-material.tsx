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
import { Label } from "@/components/ui/label";
import { pricingData } from "../data/pricing-data";

interface DoorMaterialProps {
  doorSize: string;
  carDoorMaterial: string;
  firstFloorDoorMaterial: string;
  otherFloorDoorMaterial: string;
  elevatorType: string;
  onDoorSizeChange: (value: string) => void;
  onCarDoorMaterialChange: (value: string) => void;
  onFirstFloorDoorMaterialChange: (value: string) => void;
  onOtherFloorDoorMaterialChange: (value: string) => void;
}

export const DoorMaterial = ({
  doorSize,
  carDoorMaterial,
  firstFloorDoorMaterial,
  otherFloorDoorMaterial,
  elevatorType,
  onDoorSizeChange,
  onCarDoorMaterialChange,
  onFirstFloorDoorMaterialChange,
  onOtherFloorDoorMaterialChange,
}: DoorMaterialProps) => {
  // 门尺寸选项
  const doorSizeOptions = [
    "700*2000(CO)",
    "800*2100(CO)",
    "800*2100(SO)",
    "900*2100(CO)",
    "900*2100(SO)",
    "900*2400(SO)",
    "1000*2100(CO)",
    "1000*2100(SO)",
    "1100*2100(CO)",
    "1100*2100(SO)",
    "1200*2000(SO)",
    "1200*2100(SO)",
    "1200*2400(SO)"
]


  // 材质选项
  const materialOptions = ["发纹不锈钢", "钢板喷塑"];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>门与材质</CardTitle>
        <CardDescription>
          选择门尺寸、开门方式和各种门的材质
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="doorSize">门尺寸/开门方式</Label>
            <Select value={doorSize} onValueChange={onDoorSizeChange}>
              <SelectTrigger id="doorSize" className="">
                <SelectValue placeholder="请选择门尺寸/开门方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {doorSizeOptions.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="carDoorMaterial">轿门材质</Label>
            <Select
              value={carDoorMaterial}
              onValueChange={onCarDoorMaterialChange}
            >
              <SelectTrigger id="carDoorMaterial">
                <SelectValue placeholder="请选择轿门材质" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {materialOptions.map((material) => (
                    <SelectItem key={material} value={material}>
                      {material}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstFloorDoorMaterial">首层层门材质</Label>
            <Select
              value={firstFloorDoorMaterial}
              onValueChange={onFirstFloorDoorMaterialChange}
            >
              <SelectTrigger id="firstFloorDoorMaterial">
                <SelectValue placeholder="请选择首层层门材质" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {materialOptions.map((material) => (
                    <SelectItem key={material} value={material}>
                      {material}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otherFloorDoorMaterial">其他层门材质</Label>
            <Select
              value={otherFloorDoorMaterial}
              onValueChange={onOtherFloorDoorMaterialChange}
            >
              <SelectTrigger id="otherFloorDoorMaterial">
                <SelectValue placeholder="请选择其他层门材质" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {materialOptions.map((material) => (
                    <SelectItem key={material} value={material}>
                      {material}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoorMaterial; 