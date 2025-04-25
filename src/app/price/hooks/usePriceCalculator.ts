"use client";

import { useState, useCallback, useMemo } from 'react';
import { pricingData } from '../data/pricing-data';
import { 
  calculateBasePrice, 
  calculateDiscount, 
  calculateOptionsPrice, 
  calculateTotal,
  validateInputs,
  ElevatorOptions
} from '../lib/calculator';

// 表单状态接口
interface FormState {
  // 基本参数
  elevatorType: string;
  loadSpeed: string;
  floors: number;
  stops: number;
  doors: number;
  liftHeight: number;
  
  // 门与材质
  doorSize: string;
  carDoorMaterial: string;
  firstFloorDoorMaterial: string;
  otherFloorDoorMaterial: string;
  
  // 选配项目
  options: ElevatorOptions;
  
  // 折扣设置
  isPercentDiscount: boolean;
  discountValue: number;
  
  // 运费设置
  shippingFee: number;
  
  // 台数设置
  quantity: number;
}

// 计算结果接口
interface CalculationResult {
  // 基本价格结果
  basePrice: number;
  extraLayerPrice: number;
  basicTotal: number;
  basicDiscount: number;
  basicNet: number;
  
  // 选配价格结果
  optionsPrices: { [key: string]: number };
  optionsTotal: number;
  optionsDiscount: number;
  optionsNet: number;
  
  // 运费结果
  shippingFee: number;
  
  // 总价结果
  unitTotal: number;
  grandTotal: number;
  
  // 标准尺寸信息
  standardSizes: {
    shaftSize: string;
    carSize: string;
  } | null;
}

// 表单初始状态
const initialFormState: FormState = {
  // 电梯类型
  elevatorType: '',
  // 载重/速度
  loadSpeed: '',
  // 层数
  floors: 2,
  // 停站数
  stops: 2,
  // 门数
  doors: 2,
  // 提升高度
  liftHeight: 3000,
  
  doorSize: '800*2100(CO)',
  carDoorMaterial: '發紋不銹鋼',
  firstFloorDoorMaterial: '發紋不銹鋼',
  otherFloorDoorMaterial: '發紋不銹鋼',
  
  options: {
    emergency: false,
    russianPackage: false,
    fireCarDoor: false,
    fireFirstFloorDoor: false,
    fireOtherFloorDoor: false,
    fireCarDoorBrand: '',
    fireFirstFloorDoorBrand: '',
    fireOtherFloorDoorBrand: '',
    mirror: false,
    arrivalBell: false,
    handrail: false,
    handrailCount: 1,
    guard: false,
    fireFunction: false,
    safetyWindow: false
  },
  
  isPercentDiscount: true,
  discountValue: 0,
  
  shippingFee: 0,
  
  quantity: 1
};

// 计算结果初始状态
const initialResult: CalculationResult = {
  basePrice: 0,
  extraLayerPrice: 0,
  basicTotal: 0,
  basicDiscount: 0,
  basicNet: 0,
  
  optionsPrices: {},
  optionsTotal: 0,
  optionsDiscount: 0,
  optionsNet: 0,
  
  shippingFee: 0,
  
  unitTotal: 0,
  grandTotal: 0,
  
  standardSizes: null
};

// 价格计算Hook
export function usePriceCalculator() {
  // 表单状态
  const [formState, setFormState] = useState<FormState>(initialFormState);
  
  // 计算结果
  const [result, setResult] = useState<CalculationResult>(initialResult);
  
  // 表单提交状态
  const [isCalculated, setIsCalculated] = useState(false);
  
  // 表单验证错误
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // 可用的载重/速度选项
  const loadSpeedOptions = useMemo(() => {
    if (!formState.elevatorType) return [];
    return Object.keys(pricingData.basePrices[formState.elevatorType]);
  }, [formState.elevatorType]);
  
  // 标准尺寸信息
  const standardSizes = useMemo(() => {
    const { elevatorType, loadSpeed } = formState;
    if (!elevatorType || !loadSpeed) return null;
    
    if (pricingData.standardSizes[elevatorType] && 
        pricingData.standardSizes[elevatorType][loadSpeed]) {
      const sizeInfo = pricingData.standardSizes[elevatorType][loadSpeed];
      return {
        shaftSize: sizeInfo.井道尺寸,
        carSize: sizeInfo.轎廂尺寸
      };
    }
    
    return null;
  }, [formState.elevatorType, formState.loadSpeed]);
  
  // 更新表单字段
  const updateFormField = useCallback(<K extends keyof FormState>(
    field: K, 
    value: FormState[K]
  ) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    
    // 如果更改了梯型，清空载重/速度
    if (field === 'elevatorType') {
      setFormState(prev => ({ ...prev, [field]: value, loadSpeed: '' }));
    }
    
    // 如果更改了扶手勾选状态
    if (field === 'options' && 'handrail' in (value as object)) {
      const newOptions = value as ElevatorOptions;
      if (!newOptions.handrail) {
        // 如果取消勾选扶手，重置扶手数量为1
        setFormState(prev => ({
          ...prev,
          options: {
            ...prev.options,
            ...newOptions,
            handrailCount: 1
          }
        }));
        return;
      }
    }
    
    // 常规字段更新
    setFormState(prev => ({ ...prev, [field]: value }));
  }, []);
  
  // 更新选项字段
  const updateOption = useCallback((
    optionName: keyof ElevatorOptions,
    value: boolean | number | string
  ) => {
    setFormState(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [optionName]: value
      }
    }));
  }, []);
  
  // 计算价格
  const calculatePrice = useCallback(() => {
    // 验证表单
    const { 
      elevatorType, loadSpeed, floors, stops, doors, liftHeight 
    } = formState;
    
    const validation = validateInputs(
      elevatorType, loadSpeed, floors, stops, doors, liftHeight
    );
    
    if (!validation.valid) {
      setValidationError(validation.message || '表单验证失败');
      return;
    }
    
    setValidationError(null);
    
    // 计算基本价格
    const { basePrice, extraLayerPrice, basicTotal } = calculateBasePrice(
      pricingData, elevatorType, loadSpeed, floors
    );
    
    // 计算基本折扣
    const basicDiscount = calculateDiscount(
      basicTotal,
      formState.isPercentDiscount,
      formState.discountValue
    );
    
    // 计算基本折后价
    const basicNet = basicTotal - basicDiscount;
    
    // 计算选配项目价格
    const { 
      optionsTotal, 
      ...optionsPrices 
    } = calculateOptionsPrice(
      pricingData,
      elevatorType,
      loadSpeed,
      formState.doorSize,
      formState.carDoorMaterial,
      formState.firstFloorDoorMaterial,
      formState.otherFloorDoorMaterial,
      doors,
      liftHeight,
      formState.options,
      floors
    );
    
    // 选配项目也应用折扣
    const optionsDiscount = calculateDiscount(
      optionsTotal,
      formState.isPercentDiscount,
      formState.discountValue
    );
    
    // 获取运费
    const shippingFee = formState.shippingFee;
    
    // 计算总价
    const { 
      optionsNet, unitTotal, grandTotal 
    } = calculateTotal(
      basicTotal,
      basicDiscount,
      optionsTotal,
      optionsDiscount,
      shippingFee,
      formState.quantity
    );
    
    // 更新计算结果
    setResult({
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
      
      standardSizes
    });
    
    setIsCalculated(true);
  }, [formState, standardSizes]);
  
  // 重置表单
  const resetForm = useCallback(() => {
    setFormState(initialFormState);
    setResult(initialResult);
    setIsCalculated(false);
    setValidationError(null);
  }, []);
  
  return {
    formState,
    updateFormField,
    updateOption,
    loadSpeedOptions,
    result,
    isCalculated,
    validationError,
    calculatePrice,
    resetForm
  };
} 