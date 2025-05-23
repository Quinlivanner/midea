// 电梯报价系统 - 价格数据类型定义

export interface StandardSize {
  井道尺寸: string;
  轎廂尺寸: string;
}

export interface PricingData {
  basePrices: {
    [elevatorType: string]: {
      [loadSpeed: string]: number;
    };
  };
  layerDiffPrices: {
    [elevatorType: string]: number | {
      [loadSpeed: string]: number;
    };
  };
  emergencyPrices: {
    [elevatorType: string]: {
      [loadSpeed: string]: number;
    };
  };
  // 新增：防火门品牌价格数据
  fireCarDoorBrands: {
    [doorType: string]: {
      [material: string]: {
        [doorSize: string]: {
          [brand: string]: number;
        };
      };
    };
  };
  standardSizes: {
    [elevatorType: string]: {
      [loadSpeed: string]: StandardSize;
    };
  };
  fixedPrices: {
    [optionName: string]: number;
  };
}

// 电梯报价系统 - 实际价格数据
export const pricingData: PricingData = {
  // 基价数据
  basePrices: {
    "EVIN": {
      "400/1.0": 1691,
      "400/1.5": 1763,
      "400/1.6": 1763,
      "400/1.75": 1805,
      "630/1.0": 1861,
      "630/1.5": 1931,
      "630/1.6": 1931,
      "630/1.75": 1966,
      "800/1.0": 1931,
      "800/1.5": 2001,
      "800/1.6": 2001,
      "800/1.75": 2054,
      "800/2.0": 2194,
      "800/2.5": 2264,
      "1000/1.0": 2001,
      "1000/1.5": 2071,
      "1000/1.6": 2071,
      "1000/1.75": 2124,
      "1000/2.0": 2264,
      "1000/2.5": 2334,
      "1150/1.0": 2091,
      "1150/1.5": 2176,
      "1150/1.6": 2176,
      "1150/1.75": 2212,
      "1150/2.0": 2348,
      "1150/2.5": 2434,
      "1250/1.0": 2176,
      "1250/1.5": 2245,
      "1250/1.6": 2245,
      "1250/1.75": 2280,
      "1250/2.0": 2434,
      "1250/2.5": 2503,
      "1350/1.0": 2245,
      "1350/1.5": 2313,
      "1350/1.6": 2313,
      "1350/1.75": 2348,
      "1350/2.0": 2503,
      "1350/2.5": 2571,
      "1600/1.0": 2383,
      "1600/1.5": 2452,
      "1600/1.6": 2452,
      "1600/1.75": 2503,
      "1600/2.0": 2641,
      "1600/2.5": 2706
    },
    "EVIK": {
      "400/1.0": 1515,
      "400/1.5": 1587,
      "400/1.6": 1587,
      "400/1.75": 1629,
      "630/1.0": 1686,
      "630/1.5": 1756,
      "630/1.6": 1756,
      "630/1.75": 1791,
      "800/1.0": 1756,
      "800/1.5": 1826,
      "800/1.6": 1826,
      "800/1.75": 1878,
      "800/2.0": 2019,
      "800/2.5": 2089,
      "1000/1.0": 1826,
      "1000/1.5": 1896,
      "1000/1.6": 1896,
      "1000/1.75": 1949,
      "1000/2.0": 2089,
      "1000/2.5": 2159,
      "1150/1.0": 1915,
      "1150/1.5": 2001,
      "1150/1.6": 2001,
      "1150/1.75": 2036,
      "1150/2.0": 2173,
      "1150/2.5": 2259,
      "1250/1.0": 2001,
      "1250/1.5": 2070,
      "1250/1.6": 2070,
      "1250/1.75": 2105,
      "1250/2.0": 2259,
      "1250/2.5": 2327,
      "1350/1.0": 2070,
      "1350/1.5": 2138,
      "1350/1.6": 2138,
      "1350/1.75": 2173,
      "1350/2.0": 2327,
      "1350/2.5": 2396,
      "1600/1.0": 2208,
      "1600/1.5": 2276,
      "1600/1.6": 2276,
      "1600/1.75": 2327,
      "1600/2.0": 2466,
      "1600/2.5": 2534
    },
    "LTHX": {
      "1500/0.5": 2174,
      "1500/0.75": 2274,
      "1500/1": 2573,
      "1600/0.5": 2174,
      "1600/0.75": 2274,
      "1600/1": 2573,
      "2000/0.5": 2274,
      "2000/0.75": 2373,
      "2000/1": 2672,
      "3000/0.5": 2789,
      "3000/0.75": 2888,
      "3000/1": 3042,
      "3200/0.5": 3008,
      "3200/0.75": 3107,
      "3200/1": 3326,
      "4000/0.5": 3903,
      "4000/0.75": 4392,
      "4000/1": 4489,
      "5000/0.5": 4297,
      "5000/0.75": 4490,
      "5000/1": 4781,
      "6000/0.5": 6597,
      "7000/0.5": 7065,
      "8000/0.5": 7401,
      "9000/0.5": 7627,
      "10000/0.5": 8379,
      "10500/0.5": 8379,
      "11000/0.5": 10729,
      "12000/0.5": 10729,
      "13000/0.5": 19401,
      "14000/0.5": 19401,
      "15000/0.5": 20962,
      "16000/0.5": 20962,
      "17000/0.5": 24611,
      "18000/0.5": 24611
    }
  },
  layerDiffPrices: {
    "EVIN": 5420,
    "EVIK": 5420,
    "LTHX": {
      "1500/0.5": 110,
      "1500/0.75": 110,
      "1500/1": 110,
      "1600/0.5": 116,
      "1600/0.75": 116,
      "1600/1": 116,
      "2000/0.5": 116,
      "2000/0.75": 116,
      "2000/1": 116,
      "3000/0.5": 124,
      "3000/0.75": 124,
      "3000/1": 124,
      "3200/0.5": 124,
      "3200/0.75": 124,
      "3200/1": 124,
      "4000/0.5": 176,
      "4000/0.75": 176,
      "4000/1": 176,
      "5000/0.5": 216,
      "5000/0.75": 216,
      "5000/1": 216,
      "6000/0.5": 216,
      "7000/0.5": 330,
      "8000/0.5": 362,
      "9000/0.5": 435,
      "10000/0.5": 435,
      "10500/0.5": 536,
      "11000/0.5": 536,
      "12000/0.5": 633,
      "13000/0.5": 972,
      "14000/0.5": 972,
      "15000/0.5": 972,
      "16000/0.5": 972,
      "17000/0.5": 972,
      "18000/0.5": 972
    }
  },
  emergencyPrices: {
    "EVIN": {
      "400/1.0": 77,
      "400/1.5": 77,
      "400/1.6": 77,
      "400/1.75": 77,
      "630/1.0": 77,
      "630/1.5": 77,
      "630/1.6": 77,
      "630/1.75": 77,
      "800/1.0": 77,
      "800/1.5": 77,
      "800/1.6": 162,
      "800/1.75": 162,
      "800/2.0": 162,
      "800/2.5": 162,
      "1000/1.0": 77,
      "1000/1.5": 77,
      "1000/1.6": 162,
      "1000/1.75": 162,
      "1000/2.0": 162,
      "1000/2.5": 162,
      "1150/1.0": 77,
      "1150/1.5": 162,
      "1150/1.6": 162,
      "1150/1.75": 162,
      "1150/2.0": 162,
      "1150/2.5": 162,
      "1250/1.0": 162,
      "1250/1.5": 162,
      "1250/1.6": 162,
      "1250/1.75": 162,
      "1250/2.0": 162,
      "1250/2.5": 162,
      "1350/1.0": 162,
      "1350/1.5": 162,
      "1350/1.6": 162,
      "1350/1.75": 162,
      "1350/2.0": 162,
      "1350/2.5": 162,
      "1600/1.0": 162,
      "1600/1.5": 162,
      "1600/1.6": 162,
      "1600/1.75": 162,
      "1600/2.0": 162,
      "1600/2.5": 162
    },
    "EVIK": {
      "400/1.0": 77,
      "400/1.5": 77,
      "400/1.6": 77,
      "400/1.75": 77,
      "630/1.0": 77,
      "630/1.5": 77,
      "630/1.6": 77,
      "630/1.75": 77,
      "800/1.0": 77,
      "800/1.5": 77,
      "800/1.6": 162,
      "800/1.75": 162,
      "800/2.0": 162,
      "800/2.5": 162,
      "1000/1.0": 77,
      "1000/1.5": 77,
      "1000/1.6": 162,
      "1000/1.75": 162,
      "1000/2.0": 162,
      "1000/2.5": 162,
      "1150/1.0": 77,
      "1150/1.5": 162,
      "1150/1.6": 162,
      "1150/1.75": 162,
      "1150/2.0": 162,
      "1150/2.5": 162,
      "1250/1.0": 162,
      "1250/1.5": 162,
      "1250/1.6": 162,
      "1250/1.75": 162,
      "1250/2.0": 162,
      "1250/2.5": 162,
      "1350/1.0": 162,
      "1350/1.5": 162,
      "1350/1.6": 162,
      "1350/1.75": 162,
      "1350/2.0": 162,
      "1350/2.5": 162,
      "1600/1.0": 162,
      "1600/1.5": 162,
      "1600/1.6": 162,
      "1600/1.75": 162,
      "1600/2.0": 162,
      "1600/2.5": 162
    },
    "LTHX": {
      "1500/0.5": 4645,
      "1500/0.75": 4645,
      "1500/1": 4645,
      "1600/0.5": 4645,
      "1600/0.75": 4645,
      "1600/1": 4645,
      "2000/0.5": 4645,
      "2000/0.75": 4645,
      "2000/1": 4645,
      "3000/0.5": 4645,
      "3000/0.75": 9790,
      "3000/1": 9790,
      "3200/0.5": 9790,
      "3200/0.75": 9790,
      "3200/1": 9790,
      "4000/0.5": 9790,
      "4000/0.75": 9790,
      "4000/1": 9790,
      "5000/0.5": 9790,
      "5000/0.75": 9790,
      "5000/1": 9790,
      "6000/0.5": 9790,
      "7000/0.5": 9790,
      "8000/0.5": 9790,
      "9000/0.5": 9790,
      "10000/0.5": 9790,
      "10500/0.5": 9790,
      "11000/0.5": 9790,
      "12000/0.5": 9790,
      "13000/0.5": 9790,
      "14000/0.5": 9790,
      "15000/0.5": 9790,
      "16000/0.5": 9790,
      "17000/0.5": 9790,
      "18000/0.5": 9790
    }
  },


  standardSizes: {
    "EVIN": {
      "400/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "400/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "400/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "400/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "630/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "630/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "630/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "630/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "800/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "800/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "800/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "800/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "800/2.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "800/2.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1000/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1000/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1000/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1000/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1000/2.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1000/2.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1150/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1150/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1150/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1150/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1150/2.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1150/2.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1250/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1250/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1250/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1250/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1250/2.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1250/2.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1350/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1350/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1350/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1350/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1350/2.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1350/2.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1600/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1600/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1600/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1600/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1600/2.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1600/2.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" }
    },
    "EVIK": {
      "400/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "400/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "400/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "400/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "630/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "630/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "630/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "630/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "800/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1350*2300" },
      "800/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1350*2300" },
      "800/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1350*2300" },
      "800/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1350*2300" },
      "800/2.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1350*2300" },
      "800/2.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1350*2300" },
      "1000/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1600*1400*2300" },
      "1000/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1600*1400*2300" },
      "1000/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "1600*1400*2300" },
      "1000/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1600*1400*2300" },
      "1000/2.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1600*1400*2300" },
      "1000/2.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1600*1400*2300" },
      "1150/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1800*1400*2400" },
      "1150/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1800*1400*2400" },
      "1150/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "1800*1400*2400" },
      "1150/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1800*1400*2400" },
      "1150/2.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "1800*1400*2400" },
      "1150/2.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1800*1400*2400" },
      "1250/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1400*2400" },
      "1250/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1400*2400" },
      "1250/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1400*2400" },
      "1250/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1400*2400" },
      "1250/2.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1400*2400" },
      "1250/2.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1400*2400" },
      "1350/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1500*2400" },
      "1350/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1500*2400" },
      "1350/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1500*2400" },
      "1350/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1500*2400" },
      "1350/2.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1500*2400" },
      "1350/2.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1500*2400" },
      "1600/1.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1700*2400" },
      "1600/1.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1700*2400" },
      "1600/1.6": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1700*2400" },
      "1600/1.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1700*2400" },
      "1600/2.0": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1700*2400" },
      "1600/2.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "2000*1700*2400" }
    },
    "LTHX": {
      "1500/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1500/0.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1500/1": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1600/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1600/0.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "1600/1": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "2000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "2000/0.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "2000/1": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "3000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "3000/0.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "3000/1": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "3200/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "3200/0.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "3200/1/1": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "4000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "4000/0.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "4000/1": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "5000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "5000/0.75": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "5000/1": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "6000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "7000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "8000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "9000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "10000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "10500/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "11000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "12000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "13000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "14000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "15000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "16000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "17000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" },
      "18000/0.5": { "井道尺寸": "1850*1850", "轎廂尺寸": "1400*1100*2300" }
    }
  }
  ,
  fixedPrices: {
    "俄羅斯包": 11050,
    "鏡子": 17680,
    "到站鐘": 250,
    "扶手": 530,  // 每條
    "護欄": 1750,
    "消防功能": 3520,
    "安全窗": 1060
  },
  // 防火门品牌价格数据
  fireCarDoorBrands: {
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
}

};
