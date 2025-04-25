// 电梯报价系统 - 计算逻辑函数

import { PricingData } from '../data/pricing-data';

// 格式化货币显示
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('zh-TW', { 
    style: 'decimal', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  }) + ' 元';
};

// 计算基础价格和加层费用
export const calculateBasePrice = (
  pricingData: PricingData,
  elevatorType: string,
  loadSpeed: string,
  floors: number
): { basePrice: number; extraLayerPrice: number; basicTotal: number } => {
  if (!elevatorType || !loadSpeed) {
    return { basePrice: 0, extraLayerPrice: 0, basicTotal: 0 };
  }

  // 获取基价
  const basePrice = pricingData.basePrices[elevatorType][loadSpeed];

  // 计算加层费用
  let layerDiffPrice;
  if (elevatorType === 'LTHX') {
    layerDiffPrice = (pricingData.layerDiffPrices[elevatorType] as { [key: string]: number })[loadSpeed];
  } else {
    layerDiffPrice = pricingData.layerDiffPrices[elevatorType] as number;
  }

  const extraLayerPrice = Math.max(floors - 2, 0) * layerDiffPrice;
  const basicTotal = basePrice + extraLayerPrice;

  return { basePrice, extraLayerPrice, basicTotal };
};

// 计算折扣
export const calculateDiscount = (
  amount: number,
  isPercentDiscount: boolean,
  discountValue: number
): number => {
  if (isPercentDiscount) {
    // 百分比折扣 - discountValue表示折后价格占原价的百分比
    // 例如：discountValue=53 表示折后价是原价的53%，折扣金额是原价的47%
    return amount * (1 - discountValue / 100);
  } else {
    // 固定金额折扣
    return discountValue;
  }
};

// 电梯选配接口定义
export interface ElevatorOptions {
  emergency: boolean;
  russianPackage: boolean;
  fireCarDoor: boolean;
  fireFirstFloorDoor: boolean;
  fireOtherFloorDoor: boolean;
  fireCarDoorBrand: string;
  fireFirstFloorDoorBrand: string;
  fireOtherFloorDoorBrand: string;
  mirror: boolean;
  arrivalBell: boolean;
  handrail: boolean;
  handrailCount: number;
  guard: boolean;
  fireFunction: boolean;
  safetyWindow: boolean;
}

// 计算选配项目价格
export const calculateOptionsPrice = (
  pricingData: PricingData,
  elevatorType: string,
  loadSpeed: string,
  doorSize: string,
  carDoorMaterial: string,
  firstFloorDoorMaterial: string,
  otherFloorDoorMaterial: string,
  doors: number,
  liftHeight: number,
  options: ElevatorOptions,
  floors: number  // 添加楼层数参数，默认为2层
): { [key: string]: number; optionsTotal: number } => {
  const result: { [key: string]: number } = {};
  let optionsTotal = 0;

  console.log('options => ',options)

  // 防御性检查 - 确保必要的参数存在
  if (!elevatorType || !loadSpeed) {
    return { optionsTotal: 0 };
  }

  // 停电应急
  if (options.emergency) {
    // 防御性检查 - 确保emergencyPrices数据存在
    if (pricingData.emergencyPrices[elevatorType] && 
        pricingData.emergencyPrices[elevatorType][loadSpeed]) {
      const price = pricingData.emergencyPrices[elevatorType][loadSpeed];
      result.emergency = price;
      optionsTotal += price;
    } else {
      // 使用默认值或禁用该选项
      console.warn(`缺少电梯类型 ${elevatorType} 载重/速度 ${loadSpeed} 的应急价格数据`);
      result.emergency = 0;
    }
  }

  // 俄罗斯包 - 使用动态计算：10000 + 350 * 层数
  if (options.russianPackage) {
    // 使用楼层数计算价格
    const basePrice = 10000;
    const perFloorPrice = 350;
    const price = basePrice + (perFloorPrice * floors);
    
    result.russianPackage = price;
    optionsTotal += price;
  }

  console.log('PricingData => ',pricingData)
  // 防火轎門
  if (options.fireCarDoor) {
    // 防御性检查
    if (pricingData.fireCarDoorBrands && 
        pricingData.fireCarDoorBrands["防火轿门"] && 
        pricingData.fireCarDoorBrands["防火轿门"][carDoorMaterial] && 
        pricingData.fireCarDoorBrands["防火轿门"][carDoorMaterial][doorSize]) {
      // 如果有品牌选择，则使用特定品牌的价格
      if (options.fireCarDoorBrand && 
          pricingData.fireCarDoorBrands["防火轿门"][carDoorMaterial][doorSize][options.fireCarDoorBrand]) {
        const price = pricingData.fireCarDoorBrands["防火轿门"][carDoorMaterial][doorSize][options.fireCarDoorBrand];
        result.fireCarDoor = price;
        optionsTotal += price;
      } else {
        alert(`缺少门尺寸 ${doorSize} 材质 ${carDoorMaterial} 品牌 ${options.fireCarDoorBrand} 的轿门价格数据`);
        result.fireCarDoor = 0;
      }
    } else {
      alert(`缺少门尺寸 ${doorSize} 材质 ${carDoorMaterial} 的轿门价格数据`);
      result.fireCarDoor = 0;
    }
  }


  // 防火首层层门
  if (options.fireFirstFloorDoor) {
    let firstFloorDoorPrice = 0;
    if (pricingData.fireCarDoorBrands && 
        pricingData.fireCarDoorBrands["防火层门"] && 
        pricingData.fireCarDoorBrands["防火层门"][firstFloorDoorMaterial] && 
        pricingData.fireCarDoorBrands["防火层门"][firstFloorDoorMaterial][doorSize]) {
      // 如果有品牌选择，则使用特定品牌的价格
      if (options.fireFirstFloorDoorBrand && pricingData.fireCarDoorBrands && 
          pricingData.fireCarDoorBrands["防火层门"] && 
          pricingData.fireCarDoorBrands["防火层门"][firstFloorDoorMaterial] && 
          pricingData.fireCarDoorBrands["防火层门"][firstFloorDoorMaterial][doorSize] && 
          pricingData.fireCarDoorBrands["防火层门"][firstFloorDoorMaterial][doorSize][options.fireFirstFloorDoorBrand]) {
        firstFloorDoorPrice = pricingData.fireCarDoorBrands["防火层门"][firstFloorDoorMaterial][doorSize][options.fireFirstFloorDoorBrand];
      } else {
        alert(`缺少门尺寸 ${doorSize} 材质 ${firstFloorDoorMaterial} 的首层门价格数据`);
      }
    } else {
      alert(`缺少门尺寸 ${doorSize} 材质 ${firstFloorDoorMaterial} 的首层门价格数据`);
    }
    
    result.fireFirstFloorDoor = firstFloorDoorPrice;
    optionsTotal += firstFloorDoorPrice;
  }

  
  // 防火其他层门
  if (options.fireOtherFloorDoor) {
    // 防御性检查 - 其他层
    let otherFloorDoorPrice = 0;
    if (pricingData.fireCarDoorBrands && 
        pricingData.fireCarDoorBrands["防火层门"] && 
        pricingData.fireCarDoorBrands["防火层门"][otherFloorDoorMaterial] && 
        pricingData.fireCarDoorBrands["防火层门"][otherFloorDoorMaterial][doorSize]) {
      // 如果有品牌选择，则使用特定品牌的价格
      if (options.fireOtherFloorDoorBrand && pricingData.fireCarDoorBrands && 
          pricingData.fireCarDoorBrands["防火层门"] && 
          pricingData.fireCarDoorBrands["防火层门"][otherFloorDoorMaterial] && 
          pricingData.fireCarDoorBrands["防火层门"][otherFloorDoorMaterial][doorSize] && 
          pricingData.fireCarDoorBrands["防火层门"][otherFloorDoorMaterial][doorSize][options.fireOtherFloorDoorBrand]) {
        otherFloorDoorPrice = (doors - 1) * pricingData.fireCarDoorBrands["防火层门"][otherFloorDoorMaterial][doorSize][options.fireOtherFloorDoorBrand];
      } else {
        alert(`缺少门尺寸 ${doorSize} 材质 ${otherFloorDoorMaterial} 的其他层门价格数据`);
      }
    } else {
      alert(`缺少门尺寸 ${doorSize} 材质 ${otherFloorDoorMaterial} 的其他层门价格数据`);
    }
    
    result.fireOtherFloorDoor = otherFloorDoorPrice;
    optionsTotal += otherFloorDoorPrice;
  }

  // 井道超高费用计算

  const standardHeight = 4800; // 标准高度，单位mm
  const heightDiff = liftHeight - standardHeight // 超高距离，若为负则归零 
  // =950*((B6-4800*(B3-1))/1000)
  
    const price = 950*((liftHeight-standardHeight*(floors-1))/1000) // 每mm超高费用为0.38
    result.shaftHeight = price;
    optionsTotal += price;
  

  // 镜子
  if (options.mirror) {
    // 防御性检查
    if (pricingData.fixedPrices['鏡子']) {
      const price = pricingData.fixedPrices['鏡子'];
      result.mirror = price;
      optionsTotal += price;
    } else {
      console.warn(`缺少轿厢后壁半高全宽镜子的价格数据`);
      result.mirror = 0;
    }
  }

  // 到站钟
  if (options.arrivalBell) {
    // 防御性检查
    if (pricingData.fixedPrices['到站鐘']) {
      const price = pricingData.fixedPrices['到站鐘'];
      result.arrivalBell = price;
      optionsTotal += price;
    } else {
      console.warn(`缺少到站钟的价格数据`);
      result.arrivalBell = 0;
    }
  }

  // 扶手
  if (options.handrail) {
    // 防御性检查
    if (pricingData.fixedPrices['扶手']) {
      const price = pricingData.fixedPrices['扶手'] * options.handrailCount;
      result.handrail = price;
      optionsTotal += price;
    } else {
      console.warn(`缺少扶手的价格数据`);
      result.handrail = 0;
    }
  }

  // 护栏
  if (options.guard) {
    // 防御性检查
    if (pricingData.fixedPrices['護欄']) {
      const price = pricingData.fixedPrices['護欄'];
      result.guard = price;
      optionsTotal += price;
    } else {
      console.warn(`缺少护栏的价格数据`);
      result.guard = 0;
    }
  }

  // 消防功能
  if (options.fireFunction) {
    // 防御性检查
    if (pricingData.fixedPrices['消防功能']) {
      const price = pricingData.fixedPrices['消防功能'];
      result.fireFunction = price;
      optionsTotal += price;
    } else {
      console.warn(`缺少消防功能的价格数据`);
      result.fireFunction = 0;
    }
  }

  // 安全窗
  if (options.safetyWindow) {
    // 防御性检查
    if (pricingData.fixedPrices['安全窗']) {
      const price = pricingData.fixedPrices['安全窗'];
      result.safetyWindow = price;
      optionsTotal += price;
    } else {
      console.warn(`缺少安全窗的价格数据`);
      result.safetyWindow = 0;
    }
  }

  return { ...result, optionsTotal };
};

// 计算总价
export const calculateTotal = (
  basicTotal: number,
  basicDiscount: number,
  optionsTotal: number,
  optionsDiscount: number,
  shippingFee: number,
  quantity: number
): { 
  basicNet: number;
  optionsNet: number;
  unitTotal: number;
  grandTotal: number;
} => {
  const basicNet = basicTotal - basicDiscount;
  const optionsNet = optionsTotal - optionsDiscount;
  const unitTotal = basicNet + optionsNet;
  // 运费计入总价，但不乘以数量（假设运费是总运费）
  const grandTotal = (unitTotal * quantity) + shippingFee;

  return {
    basicNet,
    optionsNet,
    unitTotal,
    grandTotal
  };
};

// 验证输入
export const validateInputs = (
  elevatorType: string,
  loadSpeed: string,
  floors: number,
  stops: number,
  doors: number,
  liftHeight: number
): { valid: boolean; message?: string } => {
  if (!elevatorType) {
    return { valid: false, message: '请选择梯型' };
  }
  
  if (!loadSpeed) {
    return { valid: false, message: '请选择载重/速度' };
  }
  
  if (isNaN(floors) || floors < 2) {
    return { valid: false, message: '层数必须大于或等于2' };
  }
  
  if (isNaN(stops) || stops < 2) {
    return { valid: false, message: '站数必须大于或等于2' };
  }
  
  if (isNaN(doors) || doors < 2) {
    return { valid: false, message: '门数必须大于或等于2' };
  }
  
  if (isNaN(liftHeight) || liftHeight <= 0) {
    return { valid: false, message: '提升高度必须大于0' };
  }
  
  return { valid: true };
}; 