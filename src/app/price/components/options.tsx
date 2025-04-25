"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ElevatorOptions } from "../lib/calculator";

// 防火门品牌数据
interface FireDoorBrandPrice {
  [brand: string]: number;
}

interface FireDoorSizeOptions {
  [size: string]: FireDoorBrandPrice;
}

interface FireDoorMaterialOptions {
  [material: string]: FireDoorSizeOptions;
}

interface FireDoorData {
  [doorType: string]: FireDoorMaterialOptions;
}

const fireDoorData: FireDoorData = {
  "防火轿门": {
    "发纹不锈钢": {
      "700*2000(CO)": {
        "易升EI60": 15128,
        "申菱E120": 13500
      },
      "800*2100(CO)": {
        "威特EI60": 16365,
        "易升EI60": 15128,
        "申菱E120": 13500
      },
      "900*2100(CO)": {
        "威特EI60": 16680,
        "易升EI60": 16080,
        "申菱E120": 13500
      },
      "1000*2100(CO)": {
        "威特EI60": 17310,
        "易升EI60": 16780,
        "申菱E120": 13500
      },
      "1100*2100(CO)": {
        "威特EI60": 18885,
        "易升EI60": 19580,
        "申菱E120": 13500
      },
      "800*2100(SO)": {
        "威特EI60": 17100,
        "易升EI60": 16220
      },
      "900*2100(SO)": {
        "威特EI60": 17415,
        "易升EI60": 17228
      },
      "1000*2100(SO)": {
        "威特EI60": 18150,
        "易升EI60": 18936
      },
      "1100*2100(SO)": {
        "威特EI60": 19410,
        "易升EI60": 18936
      },
      "1200*2000(SO)": {
        "易升EI60": 19286
      },
      "1200*2100(SO)": {
        "威特EI60": 20460,
        "易升EI60": 19286
      },
      "900*2400(SO)": {
        "威特EI60": 17730,
        "易升EI60": 17480
      },
      "1200*2400(SO)": {
        "威特EI60": 20775,
        "易升EI60": 20532
      }
    },
    "钢板喷塑": {
      "800*2100(CO)": {
        "威特EI60": 16050,
        "易升EI60": 14260
      },
      "900*2100(CO)": {
        "威特EI60": 16155,
        "易升EI60": 14400
      },
      "1000*2100(CO)": {
        "威特EI60": 16260,
        "易升EI60": 14680
      },
      "1100*2100(CO)": {
        "威特EI60": 16470,
        "易升EI60": 14960
      },
      "800*2100(SO)": {
        "威特EI60": 16155,
        "易升EI60": 14680
      },
      "900*2100(SO)": {
        "威特EI60": 16365,
        "易升EI60": 14960
      },
      "1000*2100(SO)": {
        "威特EI60": 16995,
        "易升EI60": 17760
      },
      "1100*2100(SO)": {
        "威特EI60": 17205,
        "易升EI60": 18040
      },
      "1200*2100(SO)": {
        "威特EI60": 17625,
        "易升EI60": 18824
      }
    }
  },
  "防火层门": {
    "发纹不锈钢": {
      "700*2000(CO)": {
        "易升EI60": 14316,
        "申菱E120": 7080
      },
      "800*2100(CO)": {
        "威特EI60": 11115,
        "易升EI60": 14456,
        "申菱E120": 7080
      },
      "900*2100(CO)": {
        "威特EI60": 11535,
        "易升EI60": 14638,
        "申菱E120": 7080
      },
      "1000*2100(CO)": {
        "威特EI60": 11955,
        "易升EI60": 15702,
        "申菱E120": 7080
      },
      "1100*2100(CO)": {
        "威特EI60": 15945,
        "易升EI60": 15100,
        "申菱E120": 7080
      },
      "800*2100(SO)": {
        "威特EI60": 12795,
        "易升EI60": 15940
      },
      "900*2100(SO)": {
        "威特EI60": 13110,
        "易升EI60": 16640
      },
      "1000*2100(SO)": {
        "威特EI60": 13740,
        "易升EI60": 17522
      },
      "1100*2100(SO)": {
        "威特EI60": 14055,
        "易升EI60": 17956
      },
      "1200*2000(SO)": {
        "易升EI60": 18586
      },
      "1200*2100(SO)": {
        "威特EI60": 14475,
        "易升EI60": 18586
      },
      "900*2400(SO)": {
        "威特EI60": 17310,
        "易升EI60": 21400
      },
      "1200*2400(SO)": {
        "威特EI60": 18885,
        "易升EI60": 22100
      }
    },
    "钢板喷塑": {
      "800*2100(CO)": {
        "威特EI60": 9435,
        "易升EI60": 14190
      },
      "900*2100(CO)": {
        "威特EI60": 9750,
        "易升EI60": 14470
      },
      "1000*2100(CO)": {
        "威特EI60": 10065,
        "易升EI60": 14722
      },
      "1100*2100(CO)": {
        "威特EI60": 13215,
        "易升EI60": 14820
      },
      "800*2100(SO)": {
        "威特EI60": 10800,
        "易升EI60": 14190
      },
      "900*2100(SO)": {
        "威特EI60": 11010,
        "易升EI60": 14540
      },
      "1000*2100(SO)": {
        "威特EI60": 11325,
        "易升EI60": 15240
      },
      "1100*2100(SO)": {
        "威特EI60": 11535,
        "易升EI60": 15310
      },
      "1200*2100(SO)": {
        "威特EI60": 11745,
        "易升EI60": 10300
      }
    }
  }
};

interface OptionsProps {
  options: ElevatorOptions;
  onOptionChange: (option: keyof ElevatorOptions, value: boolean | number | string) => void;
  doorSize: string;
  carDoorMaterial: string;
  firstFloorDoorMaterial: string;
  otherFloorDoorMaterial: string;
}

export const Options = ({ 
  options, 
  onOptionChange, 
  doorSize, 
  carDoorMaterial, 
  firstFloorDoorMaterial, 
  otherFloorDoorMaterial 
}: OptionsProps) => {
  // 选配项目列表
  const optionItems = [
    { id: "emergency", label: "停电应急" },
    { id: "russianPackage", label: "俄罗斯包" },
    { id: "fireCarDoor", label: "防火轎门" },
    { id: "fireFirstFloorDoor", label: "防火首层层门" },
    { id: "fireOtherFloorDoor", label: "防火其他层门" },
    { id: "mirror", label: "轿厢后壁半高全宽镜子" },
    { id: "arrivalBell", label: "到站钟" },
    { id: "handrail", label: "扶手", hasCount: true },
    { id: "guard", label: "护栏" },
    { id: "fireFunction", label: "消防功能" },
    { id: "safetyWindow", label: "安全窗" },
  ];

  // 获取可用品牌
  const getAvailableBrands = (doorType: string, material: string, size: string): string[] => {
    const materialName = material;
    
    if (!fireDoorData[doorType] || 
        !fireDoorData[doorType][materialName] || 
        !fireDoorData[doorType][materialName][size]) {
      return [];
    }
    
    return Object.keys(fireDoorData[doorType][materialName][size]);
  };

  // 轿门可用品牌
  const [carDoorBrands, setCarDoorBrands] = useState<string[]>([]);
  // 首层层门可用品牌
  const [firstFloorDoorBrands, setFirstFloorDoorBrands] = useState<string[]>([]);
  // 其他层门可用品牌
  const [otherFloorDoorBrands, setOtherFloorDoorBrands] = useState<string[]>([]);

  // 当尺寸或材质变化时更新可用品牌
  useEffect(() => {
    if (doorSize) {
      setCarDoorBrands(getAvailableBrands("防火轿门", carDoorMaterial, doorSize));
      setFirstFloorDoorBrands(getAvailableBrands("防火层门", firstFloorDoorMaterial, doorSize));
      setOtherFloorDoorBrands(getAvailableBrands("防火层门", otherFloorDoorMaterial, doorSize));
    }
  }, [doorSize, carDoorMaterial, firstFloorDoorMaterial, otherFloorDoorMaterial]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>选配项目</CardTitle>
        <CardDescription>
          选择所需的电梯附加功能和选配项目
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {optionItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={item.id}
                  checked={options[item.id as keyof ElevatorOptions] as boolean}
                  onCheckedChange={(checked) => {
                    onOptionChange(item.id as keyof ElevatorOptions, !!checked);
                    // 当取消选中时，清空对应的品牌选择
                    if (!checked) {
                      if (item.id === "fireCarDoor") {
                        onOptionChange("fireCarDoorBrand", "");
                      } else if (item.id === "fireFirstFloorDoor") {
                        onOptionChange("fireFirstFloorDoorBrand", "");
                      } else if (item.id === "fireOtherFloorDoor") {
                        onOptionChange("fireOtherFloorDoorBrand", "");
                      }
                    }
                  }}
                />
                <Label htmlFor={item.id} className="cursor-pointer">
                  {item.label}
                </Label>
                
                {item.hasCount && options.handrail && (
                  <Input
                    type="number"
                    min={1}
                    className="w-16 h-8"
                    value={options.handrailCount}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      onOptionChange("handrailCount", value);
                    }}
                  />
                )}
              </div>
              
              {/* 防火轿门品牌选择 */}
              {item.id === "fireCarDoor" && options.fireCarDoor && carDoorBrands.length > 0 && (
                <div className="mt-1 ml-6">
                  <Select
                    value={options.fireCarDoorBrand}
                    onValueChange={(value) => onOptionChange("fireCarDoorBrand", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="选择品牌" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {carDoorBrands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* 防火首层层门品牌选择 */}
              {item.id === "fireFirstFloorDoor" && options.fireFirstFloorDoor && firstFloorDoorBrands.length > 0 && (
                <div className="mt-1 ml-6">
                  <Select
                    value={options.fireFirstFloorDoorBrand}
                    onValueChange={(value) => onOptionChange("fireFirstFloorDoorBrand", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="选择品牌" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {firstFloorDoorBrands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* 防火其他层门品牌选择 */}
              {item.id === "fireOtherFloorDoor" && options.fireOtherFloorDoor && otherFloorDoorBrands.length > 0 && (
                <div className="mt-1 ml-6">
                  <Select
                    value={options.fireOtherFloorDoorBrand}
                    onValueChange={(value) => onOptionChange("fireOtherFloorDoorBrand", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="选择品牌" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {otherFloorDoorBrands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Options; 