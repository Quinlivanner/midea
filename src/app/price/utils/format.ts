/**
 * 将数字格式化为货币显示形式
 * @param value 要格式化的数值
 * @param currency 货币符号，默认为空（人民币）
 * @returns 格式化后的货币字符串
 */
export function formatCurrency(value: number, currency: string = ''): string {
  return `${currency}${value.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

/**
 * 将小数格式化为百分比
 * @param value 要格式化的小数值 (0.1 = 10%)
 * @returns 格式化后的百分比字符串
 */
export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(0)}%`;
}

/**
 * 将价格四舍五入到最接近的整数
 * @param value 要四舍五入的价格
 * @returns 四舍五入后的整数
 */
export function roundPrice(value: number): number {
  return Math.round(value);
} 