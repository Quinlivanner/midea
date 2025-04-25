// 自動報價計算系統 - 計算邏輯
document.addEventListener('DOMContentLoaded', function() {
    // 獲取DOM元素
    const elevatorTypeSelect = document.getElementById('elevatorType');
    const loadSpeedSelect = document.getElementById('loadSpeed');
    const floorsInput = document.getElementById('floors');
    const stopsInput = document.getElementById('stops');
    const doorsInput = document.getElementById('doors');
    const liftHeightInput = document.getElementById('liftHeight');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultSection = document.getElementById('resultSection');
    
    // 選配項目勾選框
    const emergencyCheckbox = document.getElementById('emergency');
    const russianPackageCheckbox = document.getElementById('russianPackage');
    const fireCarDoorCheckbox = document.getElementById('fireCarDoor');
    const fireFloorDoorCheckbox = document.getElementById('fireFloorDoor');
    const mirrorCheckbox = document.getElementById('mirror');
    const arrivalBellCheckbox = document.getElementById('arrivalBell');
    const handrailCheckbox = document.getElementById('handrail');
    const handrailCountInput = document.getElementById('handrailCount');
    const guardCheckbox = document.getElementById('guard');
    const fireFunctionCheckbox = document.getElementById('fireFunction');
    const safetyWindowCheckbox = document.getElementById('safetyWindow');
    
    // 折扣相關元素
    const percentDiscountRadio = document.getElementById('percentDiscount');
    const fixedDiscountRadio = document.getElementById('fixedDiscount');
    const discountValueInput = document.getElementById('discountValue');
    const discountUnitSpan = document.getElementById('discountUnit');
    
    // 台數輸入
    const quantityInput = document.getElementById('quantity');
    
    // 初始化梯型選擇
    function initElevatorTypes() {
        // 清空現有選項
        elevatorTypeSelect.innerHTML = '<option value="">請選擇梯型</option>';
        
        // 添加梯型選項
        const types = Object.keys(pricingData.basePrices);
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            elevatorTypeSelect.appendChild(option);
        });
    }
    
    // 根據選擇的梯型更新載重/速度選項
    function updateLoadSpeedOptions() {
        // 清空現有選項
        loadSpeedSelect.innerHTML = '<option value="">請選擇載重/速度</option>';
        
        const selectedType = elevatorTypeSelect.value;
        if (!selectedType) return;
        
        // 獲取該梯型下的所有載重/速度選項
        const loadSpeedOptions = Object.keys(pricingData.basePrices[selectedType]);
        
        // 添加載重/速度選項
        loadSpeedOptions.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option;
            optElement.textContent = option;
            loadSpeedSelect.appendChild(optElement);
        });
    }
    
    // 更新標準尺寸信息
    function updateSizeInfo() {
        const selectedType = elevatorTypeSelect.value;
        const selectedLoadSpeed = loadSpeedSelect.value;
        
        if (!selectedType || !selectedLoadSpeed) {
            document.getElementById('shaftSize').textContent = '-';
            document.getElementById('carSize').textContent = '-';
            return;
        }
        
        if (pricingData.standardSizes[selectedType] && 
            pricingData.standardSizes[selectedType][selectedLoadSpeed]) {
            const sizeInfo = pricingData.standardSizes[selectedType][selectedLoadSpeed];
            document.getElementById('shaftSize').textContent = sizeInfo.井道尺寸;
            document.getElementById('carSize').textContent = sizeInfo.轎廂尺寸;
        } else {
            document.getElementById('shaftSize').textContent = '無數據';
            document.getElementById('carSize').textContent = '無數據';
        }
    }
    
    // 計算基礎價格
    function calculateBasePrice() {
        const selectedType = elevatorTypeSelect.value;
        const selectedLoadSpeed = loadSpeedSelect.value;
        const floors = parseInt(floorsInput.value) || 2;
        
        if (!selectedType || !selectedLoadSpeed) return 0;
        
        // 獲取基價
        const basePrice = pricingData.basePrices[selectedType][selectedLoadSpeed];
        
        // 計算加層費用
        let layerDiffPrice;
        if (selectedType === 'LTHX') {
            layerDiffPrice = pricingData.layerDiffPrices[selectedType][selectedLoadSpeed];
        } else {
            layerDiffPrice = pricingData.layerDiffPrices[selectedType];
        }
        
        const extraLayerPrice = Math.max(floors - 2, 0) * layerDiffPrice;
        
        // 更新界面顯示
        document.getElementById('basePrice').textContent = formatCurrency(basePrice);
        document.getElementById('extraLayerPrice').textContent = formatCurrency(extraLayerPrice);
        
        return { basePrice, extraLayerPrice };
    }
    
    // 計算選配項目價格
    function calculateOptionsPrice() {
        const selectedType = elevatorTypeSelect.value;
        const selectedLoadSpeed = loadSpeedSelect.value;
        const doorSize = document.getElementById('doorSize').value;
        const carDoorMaterial = document.getElementById('carDoorMaterial').value;
        const firstFloorDoorMaterial = document.getElementById('firstFloorDoorMaterial').value;
        const otherFloorDoorMaterial = document.getElementById('otherFloorDoorMaterial').value;
        const doors = parseInt(doorsInput.value) || 2;
        const liftHeight = parseInt(liftHeightInput.value) || 3000;
        
        let optionsTotal = 0;
        
        // 隱藏所有選配項目行
        document.querySelectorAll('[id$="Row"]').forEach(row => {
            row.style.display = 'none';
        });
        
        // 停電應急
        if (emergencyCheckbox.checked) {
            const emergencyPrice = pricingData.emergencyPrices[selectedType][selectedLoadSpeed];
            optionsTotal += emergencyPrice;
            document.getElementById('emergencyRow').style.display = '';
            document.getElementById('emergencyPrice').textContent = formatCurrency(emergencyPrice);
        }
        
        // 俄羅斯包
        if (russianPackageCheckbox.checked) {
            const russianPackagePrice = pricingData.fixedPrices.俄羅斯包;
            optionsTotal += russianPackagePrice;
            document.getElementById('russianPackageRow').style.display = '';
            document.getElementById('russianPackagePrice').textContent = formatCurrency(russianPackagePrice);
        }
        
        // 防火轎門
        if (fireCarDoorCheckbox.checked) {
            const fireCarDoorPrice = pricingData.fireDoorPrices.轎門[doorSize][carDoorMaterial];
            optionsTotal += fireCarDoorPrice;
            document.getElementById('fireCarDoorRow').style.display = '';
            document.getElementById('fireCarDoorPrice').textContent = formatCurrency(fireCarDoorPrice);
        }
        
        // 防火層門
        if (fireFloorDoorCheckbox.checked) {
            // 首層防火門價格
            const firstFloorDoorPrice = pricingData.fireDoorPrices.層門.首層[doorSize][firstFloorDoorMaterial];
            // 其他層防火門價格
            const otherFloorDoorPrice = (doors - 1) * pricingData.fireDoorPrices.層門.其他層[doorSize][otherFloorDoorMaterial];
            const totalFireFloorDoorPrice = firstFloorDoorPrice + otherFloorDoorPrice;
            
            optionsTotal += totalFireFloorDoorPrice;
            document.getElementById('fireFloorDoorRow').style.display = '';
            document.getElementById('fireFloorDoorPrice').textContent = formatCurrency(totalFireFloorDoorPrice);
        }
        
        // 井道超高費用計算
        const standardHeight = 3000; // 標準高度，單位mm
        const heightDiff = Math.max(liftHeight - standardHeight, 0); // 超高距離，若為負則歸零
        if (heightDiff > 0) {
            const shaftHeightPrice = heightDiff * 0.38; // 假設每mm超高費用為0.38
            optionsTotal += shaftHeightPrice;
            document.getElementById('shaftHeightRow').style.display = '';
            document.getElementById('shaftHeightPrice').textContent = formatCurrency(shaftHeightPrice);
        }
        
        // 鏡子
        if (mirrorCheckbox.checked) {
            const mirrorPrice = pricingData.fixedPrices.鏡子;
            optionsTotal += mirrorPrice;
            document.getElementById('mirrorRow').style.display = '';
            document.getElementById('mirrorPrice').textContent = formatCurrency(mirrorPrice);
        }
        
        // 到站鐘
        if (arrivalBellCheckbox.checked) {
            const arrivalBellPrice = pricingData.fixedPrices.到站鐘;
            optionsTotal += arrivalBellPrice;
            document.getElementById('arrivalBellRow').style.display = '';
            document.getElementById('arrivalBellPrice').textContent = formatCurrency(arrivalBellPrice);
        }
        
        // 扶手
        if (handrailCheckbox.checked) {
            const handrailCount = parseInt(handrailCountInput.value) || 1;
            const handrailPrice = pricingData.fixedPrices.扶手 * handrailCount;
            optionsTotal += handrailPrice;
            document.getElementById('handrailRow').style.display = '';
            document.getElementById('handrailPrice').textContent = formatCurrency(handrailPrice);
        }
        
        // 護欄
        if (guardCheckbox.checked) {
            const guardPrice = pricingData.fixedPrices.護欄;
            optionsTotal += guardPrice;
            document.getElementById('guardRow').style.display = '';
            document.getElementById('guardPrice').textContent = formatCurrency(guardPrice);
        }
        
        // 消防功能
        if (fireFunctionCheckbox.checked) {
            const fireFunctionPrice = pricingData.fixedPrices.消防功能;
            optionsTotal += fireFunctionPrice;
            document.getElementById('fireFunctionRow').style.display = '';
            document.getElementById('fireFunctionPrice').textContent = formatCurrency(fireFunctionPrice);
        }
        
        // 安全窗
        if (safetyWindowCheckbox.checked) {
            const safetyWindowPrice = pricingData.fixedPrices.安全窗;
            optionsTotal += safetyWindowPrice;
            document.getElementById('safetyWindowRow').style.display = '';
            document.getElementById('safetyWindowPrice').textContent = formatCurrency(safetyWindowPrice);
        }
        
        document.getElementById('optionsTotal').textContent = formatCurrency(optionsTotal);
        
        return optionsTotal;
    }
    
    // 計算折扣
    function calculateDiscount(amount) {
        const isPercentDiscount = percentDiscountRadio.checked;
        const discountValue = parseFloat(discountValueInput.value) || 0;
        
        let discountAmount = 0;
        
        if (isPercentDiscount) {
            // 百分比折扣
            discountAmount = amount * (discountValue / 100);
        } else {
            // 固定金額折扣
            discountAmount = discountValue;
        }
        
        return discountAmount;
    }
    
    // 計算總價
    function calculateTotal() {
        // 檢查必填項
        if (!validateInputs()) return;
        
        // 計算基礎價格
        const { basePrice, extraLayerPrice } = calculateBasePrice();
        const basicTotal = basePrice + extraLayerPrice;
        document.getElementById('basicTotal').textContent = formatCurrency(basicTotal);
        
        // 計算基礎折扣
        const basicDiscount = calculateDiscount(basicTotal);
        document.getElementById('basicDiscount').textContent = formatCurrency(basicDiscount);
        
        // 基礎折後價
        const basicNet = basicTotal - basicDiscount;
        document.getElementById('basicNet').textContent = formatCurrency(basicNet);
        
        // 計算選配項目價格
        const optionsTotal = calculateOptionsPrice();
        
        // 計算選配折扣
        const optionsDiscount = calculateDiscount(optionsTotal);
        document.getElementById('optionsDiscount').textContent = formatCurrency(optionsDiscount);
        
        // 選配折後價
        const optionsNet = optionsTotal - optionsDiscount;
        document.getElementById('optionsNet').textContent = formatCurrency(optionsNet);
        
        // 單台總價
        const unitTotal = basicNet + optionsNet;
        document.getElementById('unitTotal').textContent = formatCurrency(unitTotal);
        
        // 項目總價
        const quantity = parseInt(quantityInput.value) || 1;
        const grandTotal = unitTotal * quantity;
        document.getElementById('quantityDisplay').textContent = quantity;
        document.getElementById('grandTotal').textContent = formatCurrency(grandTotal);
        
        // 顯示結果區域
        resultSection.style.display = 'block';
    }
    
    // 驗證輸入
    function validateInputs() {
        // 檢查梯型和載重/速度是否已選擇
        if (!elevatorTypeSelect.value) {
            alert('請選擇梯型');
            elevatorTypeSelect.focus();
            return false;
        }
        
        if (!loadSpeedSelect.value) {
            alert('請選擇載重/速度');
            loadSpeedSelect.focus();
            return false;
        }
        
        // 檢查數字輸入是否有效
        const floors = parseInt(floorsInput.value);
        if (isNaN(floors) || floors < 2) {
            alert('層數必須大於或等於2');
            floorsInput.focus();
            return false;
        }
        
        const stops = parseInt(stopsInput.value);
        if (isNaN(stops) || stops < 2) {
            alert('站數必須大於或等於2');
            stopsInput.focus();
            return false;
        }
        
        const doors = parseInt(doorsInput.value);
        if (isNaN(doors) || doors < 2) {
            alert('門數必須大於或等於2');
            doorsInput.focus();
            return false;
        }
        
        const liftHeight = parseInt(liftHeightInput.value);
        if (isNaN(liftHeight) || liftHeight <= 0) {
            alert('提升高度必須大於0');
            liftHeightInput.focus();
            return false;
        }
        
        return true;
    }
    
    // 格式化貨幣顯示
    function formatCurrency(value) {
        return value.toLocaleString('zh-TW', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' 元';
    }
    
    // 事件監聽器
    elevatorTypeSelect.addEventListener('change', function() {
        updateLoadSpeedOptions();
        resultSection.style.display = 'none';
    });
    
    loadSpeedSelect.addEventListener('change', function() {
        updateSizeInfo();
        resultSection.style.display = 'none';
    });
    
    // 折扣類型切換
    percentDiscountRadio.addEventListener('change', function() {
        if (this.checked) {
            discountUnitSpan.textContent = '%';
            discountValueInput.max = 100;
        }
    });
    
    fixedDiscountRadio.addEventListener('change', function() {
        if (this.checked) {
            discountUnitSpan.textContent = '元';
            discountValueInput.max = '';
        }
    });
    
    // 扶手勾選框狀態變更
    handrailCheckbox.addEventListener('change', function() {
        handrailCountInput.disabled = !this.checked;
        if (this.checked) {
            handrailCountInput.value = 1;
        }
    });
    
    // 計算按鈕點擊事件
    calculateBtn.addEventListener('click', calculateTotal);
    
    // 初始化
    initElevatorTypes();
});
