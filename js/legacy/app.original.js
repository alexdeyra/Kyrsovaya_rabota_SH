
        // Расширенные данные приложения
        const appData = {
            currentShop: null,
            currentUser: {
        name: "Системный администратор",
        role: "admin",
        login: "admin",
        phone: "",
        email: "",
        avatar: null
    },
	currentInventoryId: null,
	currentInventoryDate: null,
	isFullScreenView: false,
	
			
            inventories: [],
            
            documents: [
                { id: 1, type: "Приходная накладная", number: "PN-451-2025-000123", date: "19/06/2025", amount: 45678.90, status: "open", shopId: 451 },
                { id: 2, type: "Списание", number: "WR-451-2025-000456", date: "18/06/2025", amount: 12345.67, status: "open", shopId: 451 },
                { id: 3, type: "Возврат поставщику", number: "RT-451-2025-000789", date: "17/06/2025", amount: 8901.23, status: "open", shopId: 451 },
                { id: 4, type: "Акт инвентаризации", number: "INV-451-2025-000321", date: "15/06/2025", amount: 0, status: "closed", shopId: 451 },
                { id: 5, type: "Приходная накладная", number: "PN-452-2025-000124", date: "19/06/2025", amount: 34567.89, status: "open", shopId: 452 },
                { id: 6, type: "Списание", number: "WR-453-2025-000457", date: "18/06/2025", amount: 23456.78, status: "open", shopId: 453 }
            ],
            history: [
                { id: 1, date: "15/05/2025", type: "general", name: "Полная инвентаризация", amount: 8456789.12, difference: -124567.89, status: "completed", responsible: "Сергей Иванов", shopId: 451 },
                { id: 2, date: "30/04/2025", type: "alcohol", name: "Алкоголь", amount: 6123456.78, difference: -89012.34, status: "completed", responsible: "Наталья Смирнова", shopId: 451 },
                { id: 3, date: "15/04/2025", type: "beer", name: "Пиво", amount: 789012.34, difference: -12345.67, status: "completed", responsible: "Наталья Смирнова", shopId: 452 },
                { id: 4, date: "31/03/2025", type: "cigarettes", name: "Сигареты", amount: 345678.90, difference: -6789.01, status: "completed", responsible: "Наталья Смирнова", shopId: 453 }
            ],
                        shops: [
                { id: 101, name: 'Магазин #101', location: 'ул. Маршала Жукова, 13', lastInventory: '20/06/2025', status: 'active' },
                { id: 102, name: 'Магазин #102', location: 'ул. Декабристов, 77Б', lastInventory: '19/06/2025', status: 'active' },
                { id: 103, name: 'Магазин #103', location: 'Сиреневый бульвар, 2', lastInventory: '18/06/2025', status: 'active' },
                { id: 104, name: 'Магазин #104', location: 'ул. Свердлова, 27', lastInventory: '17/06/2025', status: 'active' },
                { id: 105, name: 'Магазин #105', location: 'Билимбаевская ул., 15', lastInventory: '16/06/2025', status: 'active' },
                { id: 106, name: 'Магазин #106', location: 'ул. Восстания, 50', lastInventory: '15/06/2025', status: 'critical' },
                { id: 107, name: 'Магазин #107', location: 'ул. Соболева, 5', lastInventory: '14/06/2025', status: 'active' },
                { id: 108, name: 'Магазин #108', location: 'ул. Луначарского, 210А', lastInventory: '13/06/2025', status: 'active' },
                { id: 109, name: 'Магазин #109', location: 'ул. Пальмиро Тольятти, 19', lastInventory: '12/06/2025', status: 'warning' },
                { id: 110, name: 'Магазин #110', location: 'ул. Белинского, 108', lastInventory: '11/06/2025', status: 'active' },
                { id: 111, name: 'Магазин #111', location: 'просп. Ленина, 58', lastInventory: '10/06/2025', status: 'active' },
                { id: 112, name: 'Магазин #112', location: 'ул. Академика Бардина, 12А', lastInventory: '09/06/2025', status: 'active' },
                { id: 113, name: 'Магазин #113', location: 'ул. Луначарского, 48', lastInventory: '08/06/2025', status: 'active' },
                { id: 114, name: 'Магазин #114', location: 'Родонитовая ул., 19', lastInventory: '07/06/2025', status: 'active' },
                { id: 115, name: 'Магазин #115', location: 'ул. Викулова, 38В', lastInventory: '06/06/2025', status: 'active' },
                { id: 116, name: 'Магазин #116', location: 'Уральская ул., 67', lastInventory: '05/06/2025', status: 'critical' },
                { id: 117, name: 'Магазин #117', location: 'ул. Бебеля, 136', lastInventory: '04/06/2025', status: 'active' },
                { id: 118, name: 'Магазин #118', location: 'ул. Белинского, 135', lastInventory: '03/06/2025', status: 'active' },
                { id: 119, name: 'Магазин #119', location: 'ул. Крауля, 48', lastInventory: '02/06/2025', status: 'warning' },
                { id: 120, name: 'Магазин #120', location: 'ул. Учителей, 2Б', lastInventory: '01/06/2025', status: 'active' },
                { id: 121, name: 'Магазин #121', location: 'ул. Вильгельма де Геннина, 33', lastInventory: '31/05/2025', status: 'active' },
                { id: 122, name: 'Магазин #122', location: 'ул. Малышева, 127', lastInventory: '30/05/2025', status: 'active' },
                { id: 123, name: 'Магазин #123', location: 'ул. Софьи Перовской, 117', lastInventory: '29/05/2025', status: 'active' },
                { id: 124, name: 'Магазин #124', location: 'ул. Гагарина, 20', lastInventory: '28/05/2025', status: 'active' }
            ],
                        problemShops: [
                { id: 106, name: 'Магазин #106', issues: ['Высокая недостача алкоголя', 'Незакрытые документы'], status: 'critical' },
                { id: 109, name: 'Магазин #109', issues: ['Просроченная инвентаризация'], status: 'warning' },
                { id: 116, name: 'Магазин #116', issues: ['Низкая выручка', 'Проблемы с персоналом'], status: 'critical' },
                { id: 119, name: 'Магазин #119', issues: ['Жалобы клиентов'], status: 'warning' }
            ],
            currentInventoryItem: null,
            currentInventoryItems: []
			
        };
		
		
		


const productDatabase = {
    // ОБЩИЕ ТОВАРЫ (type: 'general')
    '4601234567890': { name: 'Молоко Домик в деревне 2.5% 1л', price: 89.90, category: 'Молочные продукты', type: 'general' },
    '4601234567891': { name: 'Хлеб Бородинский нарезка 400г', price: 45.50, category: 'Хлебобулочные', type: 'general' },
    '4601234567892': { name: 'Яйца куриные С1 10шт', price: 120.00, category: 'Яйца', type: 'general' },
    '4601234567893': { name: 'Пельмени Сибирские 1кг', price: 250.00, category: 'Замороженные продукты', type: 'general' },
    '4601234567894': { name: 'Мороженое Пломбир 100г', price: 65.00, category: 'Замороженные продукты', type: 'general' },
    
    // АЛКОГОЛЬ (type: 'alcohol')
    '4601234567897': { name: 'Водка Русская 0.5л', price: 450.00, category: 'Алкоголь', type: 'alcohol' },
    '4601234567898': { name: 'Коньяк Армянский 5* 0.5л', price: 1200.00, category: 'Алкоголь', type: 'alcohol' },
    '4601234567899': { name: 'Вино красное сухое 0.75л', price: 650.00, category: 'Алкоголь', type: 'alcohol' },
    '4601234567900': { name: 'Вино белое полусладкое 0.75л', price: 580.00, category: 'Алкоголь', type: 'alcohol' },
    '4601234567901': { name: 'Шампанское Советское полусладкое 0.75л', price: 350.00, category: 'Алкоголь', type: 'alcohol' },
    '4601234567902': { name: 'Виски Jack Daniels 0.7л', price: 2800.00, category: 'Алкоголь', type: 'alcohol' },
    
    // ПИВО (type: 'beer')
    '4601234567906': { name: 'Пиво Жигулёвское 0.5л', price: 85.00, category: 'Пиво', type: 'beer' },
    '4601234567907': { name: 'Пиво Балтика 9 0.5л', price: 95.00, category: 'Пиво', type: 'beer' },
    '4601234567908': { name: 'Пиво Сибирская корона 0.5л', price: 110.00, category: 'Пиво', type: 'beer' },
    
    // СИГАРЕТЫ (type: 'cigarettes')
    '4601234567925': { name: 'Сигареты Rothmans 20шт', price: 160.00, category: 'Сигареты', type: 'cigarettes' },
    '4601234567926': { name: 'Сигареты LM 20шт', price: 140.00, category: 'Сигареты', type: 'cigarettes' },
    
    // ОСТАЛЬНЫЕ ОБЩИЕ ТОВАРЫ
    '4601234567903': { name: 'Сахар песок 1кг', price: 75.00, category: 'Бакалея', type: 'general' },
    '4601234567904': { name: 'Мука пшеничная 1кг', price: 60.00, category: 'Бакалея', type: 'general' },
    '4601234567905': { name: 'Соль поваренная 1кг', price: 25.00, category: 'Бакалея', type: 'general' },
    '4601234567909': { name: 'Чай Greenfield 100 пак', price: 350.00, category: 'Бакалея', type: 'general' },
    '4601234567910': { name: 'Кофе Jacobs 250г', price: 420.00, category: 'Бакалея', type: 'general' },
    '4601234567911': { name: 'Шоколад Alpen Gold 100г', price: 95.00, category: 'Кондитерские изделия', type: 'general' },
    '4601234567912': { name: 'Печенье Юбилейное 300г', price: 120.00, category: 'Кондитерские изделия', type: 'general' }
};

function findProductByBarcode(barcode, inventoryType = 'general') {
    console.log('Поиск товара по штрихкоду:', barcode, 'для типа инвентаризации:', inventoryType);
    
    // Сначала ищем товар в глобальной базе
    let product = productDatabase[barcode];
    
    if (product) {
        console.log('Товар найден в базе:', product.name, 'Тип товара:', product.type);
        
        // Проверяем, подходит ли товар для этой инвентаризации
        const isValid = isProductValidForInventory(product.type, inventoryType);
        
        if (!isValid) {
            console.log('Товар не подходит для этой инвентаризации!');
            return {
                ...product,
                isValidForInventory: false,
                errorMessage: getTypeErrorMessage(product.type, inventoryType),
                foundInDb: true,
                isRandom: false
            };
        }
        
        console.log('Товар подходит для инвентаризации');
        return {
            ...product,
            isValidForInventory: true,
            foundInDb: true,
            isRandom: false
        };
    }
    
    // Если товар не найден - генерируем случайный товар ПО ТИПУ ИНВЕНТАРИЗАЦИИ
    console.log('Товар не найден в базе, генерируем случайный для типа:', inventoryType);
    const randomProduct = generateRandomProductForType(barcode, inventoryType);
    
    return {
        ...randomProduct,
        isValidForInventory: true,
        foundInDb: false,
        isRandom: true
    };
}

function generateRandomProductForType(barcode, inventoryType) {
    console.log('Генерация случайного товара для типа:', inventoryType);
    
    // Получаем товары нужного типа
    const products = getProductsByInventoryType(inventoryType);
    
    // Если есть товары в базе - выбираем случайный
    if (products && products.length > 0) {
        const randomIndex = Math.floor(Math.random() * products.length);
        const randomProduct = { ...products[randomIndex] };
        
        // Случайная вариация цены ±10%
        const priceVariation = 0.9 + (Math.random() * 0.2);
        randomProduct.price = Math.round(randomProduct.price * priceVariation * 100) / 100;
        randomProduct.barcode = barcode;
        randomProduct.isRandom = true;
        
        console.log('Сгенерирован товар из базы:', randomProduct.name);
        return randomProduct;
    }
    
    console.log('В базе нет товаров этого типа, создаем шаблонный');
    
    const productTemplates = {
        alcohol: [
            { name: 'Водка Премиум 0.5л', category: 'Крепкий алкоголь', group: 'Водка', price: 500.00, type: 'alcohol' },
            { name: 'Коньяк Выдержанный 0.5л', category: 'Крепкий алкоголь', group: 'Коньяк', price: 1500.00, type: 'alcohol' },
            { name: 'Вино красное премиум 0.75л', category: 'Вино', group: 'Красное вино', price: 800.00, type: 'alcohol' }
        ],
        beer: [
            { name: 'Пиво Светлое 0.5л', category: 'Пиво светлое', group: 'Светлое пиво', price: 90.00, type: 'beer' },
            { name: 'Пиво Темное 0.5л', category: 'Пиво темное', group: 'Темное пиво', price: 110.00, type: 'beer' },
            { name: 'Пиво Нефильтрованное 0.5л', category: 'Пиво живое', group: 'Нефильтрованное', price: 130.00, type: 'beer' }
        ],
        cigarettes: [
            { name: 'Сигареты Легкие 20шт', category: 'Легкие сигареты', group: 'Легкие', price: 160.00, type: 'cigarettes' },
            { name: 'Сигареты Крепкие 20шт', category: 'Крепкие сигареты', group: 'Крепкие', price: 165.00, type: 'cigarettes' },
            { name: 'Сигареты Ментоловые 20шт', category: 'Ментоловые сигареты', group: 'Ментоловые', price: 170.00, type: 'cigarettes' }
        ],
        general: [
            { name: 'Продукт питания 1кг', category: 'Продукты', group: 'Бакалея', price: 150.00, type: 'general' },
            { name: 'Напиток 1л', category: 'Напитки', group: 'Напитки', price: 100.00, type: 'general' },
            { name: 'Кондитерское изделие', category: 'Кондитерские изделия', group: 'Сладости', price: 120.00, type: 'general' }
        ]
    };
    
    const templates = productTemplates[inventoryType] || productTemplates.general;
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    const priceVariation = 0.8 + (Math.random() * 0.4);
    const randomPrice = Math.round(randomTemplate.price * priceVariation * 100) / 100;
    
    return {
        name: randomTemplate.name,
        category: randomTemplate.category,
        group: randomTemplate.group,
        type: randomTemplate.type,
        price: randomPrice,
        barcode: barcode,
        isRandom: true
    };
}

// Функция проверки, подходит ли тип товара для типа инвентаризации
function isProductValidForInventory(productType, inventoryType) {
    console.log('Проверка совместимости: товар типа "' + productType + '" для инвентаризации "' + inventoryType + '"');
    
    if (inventoryType === 'general') {
        // Общая инвентаризация принимает все
        return true;
    }
    
    if (inventoryType === 'alcohol') {
        // Алкогольная инвентаризация принимает ТОЛЬКО алкоголь
        return productType === 'alcohol';
    }
    
    if (inventoryType === 'beer') {
        // Пивная инвентаризация принимает ТОЛЬКО пиво
        return productType === 'beer';
    }
    
    if (inventoryType === 'cigarettes') {
        // Сигаретная инвентаризация принимает ТОЛЬКО сигареты
        return productType === 'cigarettes';
    }
    
    console.log('Неизвестный тип инвентаризации: ' + inventoryType);
    return false;
}

// Функция для создания понятного сообщения об ошибке
function getTypeErrorMessage(productType, inventoryType) {
    const productTypeNames = {
        'general': 'обычный товар',
        'alcohol': 'алкогольный товар', 
        'beer': 'пиво',
        'cigarettes': 'сигареты'
    };
    
    const inventoryTypeNames = {
        'general': 'общую инвентаризацию',
        'alcohol': 'алкогольную инвентаризацию',
        'beer': 'инвентаризацию пива',
        'cigarettes': 'инвентаризацию сигарет'
    };
    
    const productName = productTypeNames[productType] || 'товар';
    const inventoryName = inventoryTypeNames[inventoryType] || 'эту инвентаризацию';
    
    
}
		
		

        // Инициализация приложения
        document.addEventListener('DOMContentLoaded', function() {
            initLogin();
            initShopSelection();
            initUserMenu();
            initNavigation();
            initSidebarMenu();
            initDashboard();
            initModals();
            initInventoryManagement();
            initDocumentChecking();
            initHistorySearch();
            initSettings();
            initShopsPage();
            initReportsPage();
            initSettingsPage();
            initThemeToggle();
            initFullScreenModals();
			 initPhoneMask();
            initItemManagement();
            initReportModals();
			initProfileManagement();
			loadInventoryData();
    loadProfileFromStorage();
        });
		
		
		
		// Добавьте эти функции ПЕРЕД всеми остальными функциями:
function saveTerminalDataToStorage() {
    try {
        // Сохраняем только terminalData
        localStorage.setItem('inventoryTerminalData', JSON.stringify(appData.terminalData));
        console.log('terminalData сохранен в localStorage');
        return true;
    } catch (error) {
        console.error('Ошибка сохранения terminalData:', error);
        return false;
    }
}

function loadTerminalDataFromStorage() {
    try {
        const savedData = localStorage.getItem('inventoryTerminalData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            
            // ОБЯЗАТЕЛЬНО: Преобразуем ключи в числа, так как в localStorage они сохраняются как строки
            const normalizedData = {};
            Object.keys(parsedData).forEach(key => {
                normalizedData[Number(key)] = parsedData[key];
            });
            
            // Объединяем с существующими данными, но сохраненные имеют приоритет
            appData.terminalData = { ...appData.terminalData, ...normalizedData };
            console.log('terminalData загружен из localStorage:', appData.terminalData);
            return true;
        }
    } catch (error) {
        console.error('Ошибка загрузки terminalData:', error);
    }
    return false;
}

function clearTerminalDataStorage() {
    localStorage.removeItem('inventoryTerminalData');
    console.log('terminalData очищен из localStorage');
}

        // Инициализация модальных окон отчетов
        function initReportModals() {
		
		// Добавьте этот код в initReportModals() или в общую функцию инициализации модальных окон
window.addEventListener('click', function(event) {
    const modal = document.getElementById('exportCashModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        // Сбрасываем состояние при закрытии
        document.getElementById('confirmExportCash').disabled = false;
        document.getElementById('cancelExportCash').disabled = false;
        document.getElementById('cashLoading').style.display = 'none';
        document.getElementById('cashResult').style.display = 'none';
        document.getElementById('cashProgressBar').style.width = '0%';
    }
});
		
            // Инициализация модального окна выгрузки данных по кассам
document.getElementById('exportCashBtn').addEventListener('click', function() {
    document.getElementById('exportCashModal').style.display = 'flex';
    // Установка текущей даты по умолчанию
    const today = new Date();
    document.getElementById('cashDate').valueAsDate = today;
    
    // Скрываем блоки результата и загрузки
    document.getElementById('cashResult').style.display = 'none';
    document.getElementById('cashLoading').style.display = 'none';
    
    // Сбрасываем прогресс бар
    document.getElementById('cashProgressBar').style.width = '0%';
});

document.getElementById('cancelExportCash').addEventListener('click', function() {
    document.getElementById('exportCashModal').style.display = 'none';
});

document.getElementById('confirmExportCash').addEventListener('click', function() {
    const date = document.getElementById('cashDate').value;
    const format = document.getElementById('cashFormat').value;
    
    if (!date) {
        showAlert('Выберите дату выгрузки', 'warning');
        return;
    }
    
    // Скрываем кнопку "Выгрузить" и показываем индикатор загрузки
    document.getElementById('confirmExportCash').disabled = true;
    document.getElementById('cancelExportCash').disabled = true;
    document.getElementById('cashLoading').style.display = 'block';
    
    // Генерируем случайную сумму от 200,000 до 1,000,000
    const randomAmount = Math.floor(Math.random() * 800001) + 200000; // 200,000 - 1,000,000
    
    // Форматируем сумму
    const formattedAmount = formatNumber(randomAmount);
    
    // Получаем название формата
    const formatNames = {
        'screen': 'Вывод на экран',
        'print': 'На печать',
        'wordpad': 'Выгрузка в WordPad',
        'excel': 'Выгрузка в Excel'
    };
    const formatName = formatNames[format] || format;
    
    // Имитируем загрузку в течение 15 секунд
    let progress = 0;
    const progressBar = document.getElementById('cashProgressBar');
    const progressInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // Скрываем индикатор загрузки
            document.getElementById('cashLoading').style.display = 'none';
            
            // Показываем результат
            const resultContent = document.getElementById('cashResultContent');
            resultContent.innerHTML = `
                <p><strong>Дата выгрузки:</strong> ${formatInputDate(date)}</p>
                <p><strong>Формат:</strong> ${formatName}</p>
                <p><strong>Общая сумма по кассам:</strong> <span style="font-weight: bold; color: #2ecc71;">${formattedAmount} ₽</span></p>
                <div style="margin-top: 15px; padding: 10px; background-color: #e8f5e8; border-radius: 3px;">
                    <p style="margin: 0; color: #27ae60;"><i class="fas fa-check-circle"></i> Выгрузка успешно завершена</p>
                </div>
            `;
            
            document.getElementById('cashResult').style.display = 'block';
            
            // Восстанавливаем кнопки
            document.getElementById('confirmExportCash').disabled = false;
            document.getElementById('cancelExportCash').disabled = false;
            
            // В зависимости от формата выполняем соответствующее действие
            switch(format) {
                case 'screen':
                    // Уже показано на экране
                    break;
                    
                case 'print':
                    // Печать данных
                    printCashData(date, randomAmount);
                    break;
                    
                case 'wordpad':
                    // Выгрузка в WordPad
                    exportToWordPad(date, randomAmount);
                    break;
                    
                case 'excel':
                    // Выгрузка в Excel
                    exportToExcel(date, randomAmount);
                    break;
            }
            
            // Показываем уведомление об успешной выгрузке
            showAlert(`Выгрузка данных по кассам на ${formatInputDate(date)} завершена. Сумма: ${formattedAmount} ₽`, 'success');
        }
    }, 150); // 100% за 15 секунд (150ms × 100 = 15000ms = 15 секунд)
});


// Функция для проверки, подходит ли товар для данного типа инвентаризации
function validateProductForInventory(productType, inventoryType) {
    console.log(`🔍 Проверка: товар типа "${productType}" для инвентаризации "${inventoryType}"`);
    
    // Сопоставление типов
    const inventoryAllowedTypes = {
        'general': ['general', 'alcohol', 'beer', 'cigarettes'], // Общая инвентаризация принимает все
        'alcohol': ['alcohol'], // Только алкоголь
        'beer': ['beer'], // Только пиво
        'cigarettes': ['cigarettes'] // Только сигареты
    };
    
    const allowedTypes = inventoryAllowedTypes[inventoryType] || ['general'];
    const isValid = allowedTypes.includes(productType);
    
    console.log(`📋 Разрешённые типы для ${inventoryType}:`, allowedTypes);
    console.log(`✅ Результат проверки: ${isValid ? 'ПРОШЁЛ' : 'НЕ ПРОШЁЛ'}`);
    
    return isValid;
}

// Функция для получения текста ошибки
function getInventoryTypeError(productType, inventoryType) {
    const typeNames = {
        'general': 'общей инвентаризации',
        'alcohol': 'алкогольной инвентаризации',
        'beer': 'инвентаризации пива',
        'cigarettes': 'инвентаризации сигарет'
    };
    
    const productTypeNames = {
        'general': 'обычный товар',
        'alcohol': 'алкогольный товар',
        'beer': 'пиво',
        'cigarettes': 'сигареты'
    };
    
    return `Товар (${productTypeNames[productType] || productType}) не может быть добавлен в ${typeNames[inventoryType] || inventoryType}.`;
}

// Функция для печати данных
function printCashData(date, amount) {
    const formattedDate = formatInputDate(date);
    const formattedAmount = formatNumber(amount);
    
    const printContent = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Отчет по кассам</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                ...header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                ...report-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                ...report-date {
                    font-size: 16px;
                    color: #666;
                }
                ...data-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                ...data-table th, .data-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                ...data-table th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                ...total-row {
                    font-weight: bold;
                    background-color: #f8f8f8;
                }
                ...footer {
                    margin-top: 30px;
                    font-size: 12px;
                    color: #888;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="report-title">ОТЧЕТ ПО КАССАМ</div>
                <div class="report-date">Дата выгрузки: ${formattedDate}</div>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Касса</th>
                        <th>Сумма, ₽</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Основная касса</td>
                        <td>${formatNumber(amount * 0.6)}</td>
                        <td>Активна</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Резервная касса</td>
                        <td>${formatNumber(amount * 0.25)}</td>
                        <td>Активна</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Касса самообслуживания</td>
                        <td>${formatNumber(amount * 0.15)}</td>
                        <td>Активна</td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="2">Итого:</td>
                        <td>${formattedAmount}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            
            <div class="footer">
                Сформировано: ${new Date().toLocaleString('ru-RU')}<br>
                Система управления инвентаризацией - Кировский
            </div>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Даем время на загрузку содержимого
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

// Функция для выгрузки в WordPad (RTF формат с поддержкой русского)
function exportToWordPad(date, amount) {
    const formattedDate = formatInputDate(date);
    const formattedAmount = formatNumber(amount);
    
    // Создаем RTF-документ с правильной кодировкой для русского
    const rtfContent = `{\\rtf1\\ansi\\ansicpg1251\\deff0\\nouicompat\\deflang1049
{\\fonttbl{\\f0\\fnil\\fcharset204 Arial;}}
{\\colortbl;\\red0\\green0\\blue0;\\red0\\green0\\blue255;\\red0\\green128\\blue0;}
\\paperw11906\\paperh16838
\\margl1134\\margr1134\\margt1134\\margb1134
\\sectd
\\pard\\plain\\f0\\fs28\\qc\\b \\u1054\\u1058\\u1063\\u1045\\u1058 \\u1055\\u1054 \\u1050\\u1040\\u1057\\u1057\\u1040\\u1052\\par
\\pard\\plain\\f0\\fs20\\qc \\u1044\\u1072\\u1090\\u1072 \\u1074\\u1099\\u1075\\u1088\\u1091\\u1079\\u1082\\u1080\\u58 ${formattedDate}\\par
\\pard\\plain\\f0\\fs20\\qc \\par
\\trowd\\trgaph0
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx2000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx4000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx6000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx8000
\\pard\\plain\\f0\\fs18\\b\\cell \\u8470\\cell \\u1050\\u1072\\u1089\\u1089\\u1072\\cell \\u1057\\u1091\\u1084\\u1084\\u1072\\u44 \\u838\\cell \\u1057\\u1090\\u1072\\u1090\\u1091\\u1089\\row
\\trowd\\trgaph0
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx2000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx4000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx6000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx8000
\\pard\\plain\\f0\\fs18\\cell 1\\cell \\u1054\\u1089\\u1085\\u1086\\u1074\\u1085\\u1072\\u1103 \\u1082\\u1072\\u1089\\u1089\\u1072\\cell ${formatNumber(amount * 0.6)}\\cell \\u1040\\u1082\\u1090\\u1080\\u1074\\u1085\\u1072\\row
\\trowd\\trgaph0
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx2000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx4000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx6000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx8000
\\pard\\plain\\f0\\fs18\\cell 2\\cell \\u1056\\u1077\\u1079\\u1077\\u1088\\u1074\\u1085\\u1072\\u1103 \\u1082\\u1072\\u1089\\u1089\\u1072\\cell ${formatNumber(amount * 0.25)}\\cell \\u1040\\u1082\\u1090\\u1080\\u1074\\u1085\\u1072\\row
\\trowd\\trgaph0
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx2000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx4000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx6000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx8000
\\pard\\plain\\f0\\fs18\\cell 3\\cell \\u1050\\u1072\\u1089\\u1089\\u1072 \\u1089\\u1072\\u1084\\u1086\\u1086\\u1073\\u1089\\u1083\\u1091\\u1078\\u1080\\u1074\\u1072\\u1085\\u1080\\u1103\\cell ${formatNumber(amount * 0.15)}\\cell \\u1040\\u1082\\u1090\\u1080\\u1074\\u1085\\u1072\\row
\\trowd\\trgaph0
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx2000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx4000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx6000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx8000
\\pard\\plain\\f0\\fs18\\b\\cell \\cell \\u1048\\u1090\\u1086\\u1075\\u1086\\u58\\cell ${formattedAmount}\\cell \\row
\\pard\\plain\\f0\\fs16\\par
\\u1057\\u1092\\u1086\\u1088\\u1084\\u1080\\u1088\\u1086\\u1074\\u1072\\u1085\\u1086\\u58 ${new Date().toLocaleString('ru-RU')}\\par
\\u1057\\u1080\\u1089\\u1090\\u1077\\u1084\\u1072 \\u1091\\u1087\\u1088\\u1072\\u1074\\u1083\\u1077\\u1085\\u1080\\u1103 \\u1080\\u1085\\u1074\\u1077\\u1085\\u1090\\u1072\\u1080\\u1088\\u1080\\u1079\\u1072\\u1094\\u1080\\u1077\\u1081 - \\u1050\\u1080\\u1088\\u1086\\u1074\\u1089\\u1082\\u1080\\u1081\\par
}`;
    
    // Создаем Blob с RTF содержимым
    const blob = new Blob([rtfContent], { type: 'application/rtf' });
    const url = URL.createObjectURL(blob);
    
    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    a.download = `Отчет_по_кассам_${formattedDate.replace(/\//g, '-')}.rtf`;
    document.body.appendChild(a);
    a.click();
    
    // Очищаем
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Функция для выгрузки в Excel (CSV формат с поддержкой русского)
function exportToExcel(date, amount) {
    const formattedDate = formatInputDate(date);
    const formattedAmount = formatNumber(amount);
    
    // Создаем CSV содержимое с BOM для правильной кодировки UTF-8
    const csvContent = '\uFEFF' + // UTF-8 BOM
                      `Отчет по кассам\n` +
                      `Дата выгрузки: ${formattedDate}\n\n` +
                      `№;Касса;Сумма, ₽;Статус\n` +
                      `1;Основная касса;${formatNumber(amount * 0.6)};Активна\n` +
                      `2;Резервная касса;${formatNumber(amount * 0.25)};Активна\n` +
                      `3;Касса самообслуживания;${formatNumber(amount * 0.15)};Активна\n` +
                      `;Итого:;${formattedAmount};\n\n` +
                      `Сформировано: ${new Date().toLocaleString('ru-RU')}\n` +
                      `Система управления инвентаризацией - Кировский`;
    
    // Создаем Blob с CSV содержимым и правильной кодировкой
    const blob = new Blob([csvContent], { 
        type: 'text/csv;charset=utf-8;' 
    });
    const url = URL.createObjectURL(blob);
    
    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    a.download = `Отчет_по_кассам_${formattedDate.replace(/\//g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    
    // Очищаем
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Форматирование даты из формата input[type="date"] в DD/MM/YYYY
function formatInputDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Обработчик закрытия модального окна через крестик
document.querySelector('#exportCashModal .close').addEventListener('click', function() {
    document.getElementById('exportCashModal').style.display = 'none';
    resetExportCashModal();
});

// Обработчик закрытия модального окна через кнопку "Отмена"
document.getElementById('cancelExportCash').addEventListener('click', function() {
    document.getElementById('exportCashModal').style.display = 'none';
    resetExportCashModal();
});

// Функция сброса состояния модального окна
function resetExportCashModal() {
    document.getElementById('confirmExportCash').disabled = false;
    document.getElementById('cancelExportCash').disabled = false;
    document.getElementById('cashLoading').style.display = 'none';
    document.getElementById('cashResult').style.display = 'none';
    document.getElementById('cashProgressBar').style.width = '0%';
    document.getElementById('cashResultContent').innerHTML = '';
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    const modal = document.getElementById('exportCashModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        resetExportCashModal();
    }
});
            
          // ================== ВЫГРУЗКА ВЫРУЧКИ - ИСПРАВЛЕННАЯ ВЕРСИЯ ==================

// Инициализация модального окна выгрузки данных по выручке
document.getElementById('exportRevenueBtn').addEventListener('click', function() {
    document.getElementById('exportRevenueModal').style.display = 'flex';
    
    // Установка дат по умолчанию (последние 7 дней)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);
    
    document.getElementById('revenueStartDate').valueAsDate = startDate;
    document.getElementById('revenueEndDate').valueAsDate = endDate;
    
    // Скрываем блоки результата и загрузки
    document.getElementById('revenueResult').style.display = 'none';
    document.getElementById('revenueLoading').style.display = 'none';
    
    // Сбрасываем прогресс бар
    document.getElementById('revenueProgressBar').style.width = '0%';
});

// Отмена выгрузки
document.getElementById('cancelExportRevenue').addEventListener('click', function() {
    document.getElementById('exportRevenueModal').style.display = 'none';
    resetExportRevenueModal();
});

// Основная функция выгрузки
document.getElementById('confirmExportRevenue').addEventListener('click', function() {
    const startDateStr = document.getElementById('revenueStartDate').value;
    const endDateStr = document.getElementById('revenueEndDate').value;
    const format = document.getElementById('revenueFormat').value;
    const groupBy = document.getElementById('revenueGroupBy').value;
    
    if (!startDateStr || !endDateStr) {
        showAlert('Выберите даты начала и окончания', 'warning');
        return;
    }
    
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    
    if (startDate > endDate) {
        showAlert('Дата начала не может быть позже даты окончания', 'warning');
        return;
    }
    
    // Блокируем кнопки и показываем загрузку
    document.getElementById('confirmExportRevenue').disabled = true;
    document.getElementById('cancelExportRevenue').disabled = true;
    document.getElementById('revenueLoading').style.display = 'block';
    document.getElementById('revenueResult').style.display = 'none';
    
    // Имитация загрузки
    let progress = 0;
    const progressBar = document.getElementById('revenueProgressBar');
    progressBar.style.width = '0%';
    
    const progressInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            try {
                // Генерируем данные
                const revenueData = generateRevenueDataSimple(startDate, endDate, groupBy);
                
                // Показываем результат
                showRevenueResultSimple(startDate, endDate, groupBy, revenueData, format);
                
                // Выполняем выгрузку в выбранном формате
                executeRevenueExport(format, startDate, endDate, groupBy, revenueData);
                
                // Восстанавливаем кнопки
                document.getElementById('confirmExportRevenue').disabled = false;
                document.getElementById('cancelExportRevenue').disabled = false;
                
                // Уведомление
                showAlert(`Выгрузка данных по выручке завершена`, 'success');
                
            } catch (error) {
                console.error('Ошибка:', error);
                document.getElementById('confirmExportRevenue').disabled = false;
                document.getElementById('cancelExportRevenue').disabled = false;
                document.getElementById('revenueLoading').style.display = 'none';
                showAlert('Ошибка при выгрузке', 'danger');
            }
        }
    }, 150);
});

// Простая генерация данных
function generateRevenueDataSimple(startDate, endDate, groupBy) {
    const data = [];
    let total = 0;
    
    if (groupBy === 'day') {
        let current = new Date(startDate);
        while (current <= endDate) {
            const revenue = Math.floor(Math.random() * 450000) + 50000;
            data.push({
                period: current.toLocaleDateString('ru-RU'),
                revenue: revenue
            });
            total += revenue;
            current.setDate(current.getDate() + 1);
        }
    } else if (groupBy === 'week') {
        let weekStart = new Date(startDate);
        let weekNum = 1;
        while (weekStart <= endDate) {
            const revenue = Math.floor(Math.random() * 3150000) + 350000;
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            data.push({
                period: `Неделя ${weekNum} (${weekStart.toLocaleDateString('ru-RU')} - ${weekEnd.toLocaleDateString('ru-RU')})`,
                revenue: revenue
            });
            total += revenue;
            weekStart.setDate(weekStart.getDate() + 7);
            weekNum++;
        }
    } else if (groupBy === 'month') {
        let monthStart = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        const monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
        
        while (monthStart <= endDate) {
            const revenue = Math.floor(Math.random() * 13500000) + 1500000;
            data.push({
                period: `${monthNames[monthStart.getMonth()]} ${monthStart.getFullYear()}`,
                revenue: revenue
            });
            total += revenue;
            monthStart.setMonth(monthStart.getMonth() + 1);
        }
    }
    
    return { data: data, total: total };
}

// Показать результат
function showRevenueResultSimple(startDate, endDate, groupBy, revenueData, format) {
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let html = `
        <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
        <p><strong>Период:</strong> ${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}</p>
        <p><strong>Группировка:</strong> ${groupBy === 'day' ? 'По дням' : groupBy === 'week' ? 'По неделям' : 'По месяцам'}</p>
        <p><strong>Формат:</strong> ${format === 'screen' ? 'На экран' : format === 'print' ? 'На печать' : format === 'word' ? 'В Word' : 'В Excel'}</p>
        <hr>
        <table style="width:100%; border-collapse:collapse;">
            <thead>
                <tr style="background:#f2f2f2;">
                    <th style="padding:8px; border:1px solid #ddd;">Период</th>
                    <th style="padding:8px; border:1px solid #ddd; text-align:right;">Выручка</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    revenueData.data.forEach(item => {
        html += `
            <tr>
                <td style="padding:8px; border:1px solid #ddd;">${item.period}</td>
                <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.revenue)} ₽</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
            <tfoot>
                <tr style="background:#e8f5e8; font-weight:bold;">
                    <td style="padding:8px; border:1px solid #ddd;">Итого:</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(revenueData.total)} ₽</td>
                </tr>
            </tfoot>
        </table>
        <div style="margin-top:15px; padding:10px; background:#e8f5e8; border-radius:5px;">
            <p style="margin:0; color:#27ae60;"><i class="fas fa-check-circle"></i> Выгрузка завершена</p>
        </div>
    `;
    
    document.getElementById('revenueResultContent').innerHTML = html;
    document.getElementById('revenueLoading').style.display = 'none';
    document.getElementById('revenueResult').style.display = 'block';
}

// Выполнить выгрузку в нужном формате
function executeRevenueExport(format, startDate, endDate, groupBy, revenueData) {
    if (format === 'screen') return; // Уже показано
    
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    if (format === 'print') {
        // Простая печать
        const printContent = `
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Отчет по выручке</title>
                <style>
                    body { font-family:Arial; margin:20px; }
                    h1 { text-align:center; }
                    table { width:100%; border-collapse:collapse; margin-top:20px; }
                    th, td { border:1px solid #000; padding:8px; }
                    th { background:#eee; }
                    ...total { font-weight:bold; background:#e8f5e8; }
                </style>
            </head>
            <body>
                <h1>ОТЧЕТ ПО ВЫРУЧКЕ</h1>
                <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
                <p><strong>Период:</strong> ${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}</p>
                <p><strong>Группировка:</strong> ${groupBy === 'day' ? 'По дням' : groupBy === 'week' ? 'По неделям' : 'По месяцам'}</p>
                <table>
                    <tr><th>Период</th><th>Выручка</th></tr>
                    ${revenueData.data.map(item => `<tr><td>${item.period}</td><td>${formatNumber(item.revenue)} ₽</td></tr>`).join('')}
                    <tr class="total"><td>Итого:</td><td>${formatNumber(revenueData.total)} ₽</td></tr>
                </table>
                <p style="margin-top:30px; font-size:12px; color:#666;">
                    Сформировано: ${new Date().toLocaleString('ru-RU')}<br>
                    Система управления инвентаризацией
                </p>
            </body>
            </html>
        `;
        
        const win = window.open('', '_blank');
        win.document.write(printContent);
        win.document.close();
        win.print();
        
    } else if (format === 'word') {
        // Выгрузка в Word (HTML с русской кодировкой)
        const wordContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Отчет по выручке</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 2cm; }
                    h1 { text-align: center; color: #2c3e50; }
                    ...info { margin-bottom: 20px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    ...total { font-weight: bold; background-color: #e8f5e8; }
                    ...footer { margin-top: 40px; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <h1>ОТЧЕТ ПО ВЫРУЧКЕ</h1>
                
                <div class="info">
                    <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
                    <p><strong>Период:</strong> ${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}</p>
                    <p><strong>Группировка:</strong> ${groupBy === 'day' ? 'По дням' : groupBy === 'week' ? 'По неделям' : 'По месяцам'}</p>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Период</th>
                            <th>Выручка, ₽</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${revenueData.data.map(item => `
                            <tr>
                                <td>${item.period}</td>
                                <td>${formatNumber(item.revenue)}</td>
                            </tr>
                        `).join('')}
                        <tr class="total">
                            <td>Итого:</td>
                            <td>${formatNumber(revenueData.total)}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="footer">
                    <p>Сформировано: ${new Date().toLocaleString('ru-RU')}</p>
                    <p>Система управления инвентаризацией - Кировский</p>
                </div>
            </body>
            </html>
        `;
        
        // Создаем Blob с BOM для правильной кодировки UTF-8
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]); // UTF-8 BOM
        const blobContent = [bom, wordContent];
        const blob = new Blob(blobContent, { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `Отчет_по_выручке_${shopId}_${startDate.toISOString().slice(0,10)}_${endDate.toISOString().slice(0,10)}.doc`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        
    } else if (format === 'excel') {
        // Выгрузка в Excel (CSV с BOM)
        let excelContent = '\uFEFF'; // UTF-8 BOM для Excel
        
        excelContent += 'ОТЧЕТ ПО ВЫРУЧКЕ\r\n\r\n';
        excelContent += `Магазин;${shopName} (№${shopId})\r\n`;
        excelContent += `Период;${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}\r\n`;
        excelContent += `Группировка;${groupBy === 'day' ? 'По дням' : groupBy === 'week' ? 'По неделям' : 'По месяцам'}\r\n\r\n`;
        excelContent += 'Период;Выручка, ₽\r\n';
        
        revenueData.data.forEach(item => {
            excelContent += `${item.period};${formatNumber(item.revenue)}\r\n`;
        });
        
        excelContent += `\r\nИтого;${formatNumber(revenueData.total)}\r\n\r\n`;
        excelContent += `Сформировано;${new Date().toLocaleString('ru-RU')}\r\n`;
        excelContent += 'Система;Система управления инвентаризацией - Кировский';
        
        const blob = new Blob([excelContent], { 
            type: 'text/csv;charset=utf-8;' 
        });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `Отчет_по_выручке_${shopId}_${startDate.toISOString().slice(0,10)}_${endDate.toISOString().slice(0,10)}.csv`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }
}

// Сброс состояния
function resetExportRevenueModal() {
    document.getElementById('confirmExportRevenue').disabled = false;
    document.getElementById('cancelExportRevenue').disabled = false;
    document.getElementById('revenueLoading').style.display = 'none';
    document.getElementById('revenueResult').style.display = 'none';
    document.getElementById('revenueProgressBar').style.width = '0%';
}

// Закрытие по крестику
document.querySelector('#exportRevenueModal .close').addEventListener('click', function() {
    document.getElementById('exportRevenueModal').style.display = 'none';
    resetExportRevenueModal();
});

// Закрытие по клику вне окна
window.addEventListener('click', function(e) {
    if (e.target.id === 'exportRevenueModal') {
        document.getElementById('exportRevenueModal').style.display = 'none';
        resetExportRevenueModal();
    }
});
            
            // ================== ВЫГРУЗКА ПРОДАЖ - НОВАЯ ВЕРСИЯ ==================

// Инициализация модального окна выгрузки данных по продажам
document.getElementById('exportSalesBtn').addEventListener('click', function() {
    document.getElementById('exportSalesModal').style.display = 'flex';
    
    // Установка текущей даты по умолчанию
    const today = new Date();
    document.getElementById('salesSingleDate').valueAsDate = today;
    document.getElementById('salesStartDate').valueAsDate = today;
    document.getElementById('salesEndDate').valueAsDate = today;
    
    // Скрываем блоки результата и загрузки
    document.getElementById('salesResult').style.display = 'none';
    document.getElementById('salesLoading').style.display = 'none';
    
    // Сбрасываем прогресс бар
    document.getElementById('salesProgressBar').style.width = '0%';
});

// Переключение между одним днем и периодом
document.getElementById('salesPeriodType').addEventListener('change', function() {
    const isSingle = this.value === 'single';
    document.getElementById('singleDateGroup').style.display = isSingle ? 'block' : 'none';
    document.getElementById('rangeDateGroup').style.display = isSingle ? 'none' : 'block';
});

// Отмена выгрузки
document.getElementById('cancelExportSales').addEventListener('click', function() {
    document.getElementById('exportSalesModal').style.display = 'none';
    resetExportSalesModal();
});

// Основная функция выгрузки продаж
document.getElementById('confirmExportSales').addEventListener('click', function() {
    const periodType = document.getElementById('salesPeriodType').value;
    const singleDate = document.getElementById('salesSingleDate').value;
    const startDateStr = document.getElementById('salesStartDate').value;
    const endDateStr = document.getElementById('salesEndDate').value;
    const format = document.getElementById('salesFormat').value;
    const groupBy1 = document.getElementById('salesGroupBy1').value;
    const groupBy2 = document.getElementById('salesGroupBy2').value;
    const groupBy3 = document.getElementById('salesGroupBy3').value;
    
    let startDate, endDate;
    
    // Определяем даты в зависимости от типа периода
    if (periodType === 'single') {
        if (!singleDate) {
            showAlert('Выберите дату', 'warning');
            return;
        }
        startDate = new Date(singleDate);
        endDate = new Date(singleDate);
    } else {
        if (!startDateStr || !endDateStr) {
            showAlert('Выберите даты начала и окончания', 'warning');
            return;
        }
        startDate = new Date(startDateStr);
        endDate = new Date(endDateStr);
        
        if (startDate > endDate) {
            showAlert('Дата начала не может быть позже даты окончания', 'warning');
            return;
        }
    }
    
    // Блокируем кнопки и показываем загрузку
    document.getElementById('confirmExportSales').disabled = true;
    document.getElementById('cancelExportSales').disabled = true;
    document.getElementById('salesLoading').style.display = 'block';
    document.getElementById('salesResult').style.display = 'none';
    
    // Имитация загрузки
    let progress = 0;
    const progressBar = document.getElementById('salesProgressBar');
    progressBar.style.width = '0%';
    
    const progressInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            try {
                // Генерируем данные о продажах
                const salesData = generateSalesData(startDate, endDate, groupBy1, groupBy2, groupBy3);
                
                // Показываем результат
                showSalesResult(startDate, endDate, periodType, groupBy1, groupBy2, groupBy3, salesData, format);
                
                // Выполняем выгрузку в выбранном формате
                executeSalesExport(format, startDate, endDate, periodType, groupBy1, groupBy2, groupBy3, salesData);
                
                // Восстанавливаем кнопки
                document.getElementById('confirmExportSales').disabled = false;
                document.getElementById('cancelExportSales').disabled = false;
                
                // Уведомление
                showAlert(`Выгрузка данных по продажам завершена`, 'success');
                
            } catch (error) {
                console.error('Ошибка:', error);
                document.getElementById('confirmExportSales').disabled = false;
                document.getElementById('cancelExportSales').disabled = false;
                document.getElementById('salesLoading').style.display = 'none';
                showAlert('Ошибка при выгрузке', 'danger');
            }
        }
    }, 150);
});

// Генерация данных о продажах
function generateSalesData(startDate, endDate, groupBy1, groupBy2, groupBy3) {
    const data = [];
    let totalRevenue = 0;
    let totalQuantity = 0;
    
    // Примерные категории товаров
    const departments = ['Бакалея', 'Молочные продукты', 'Мясо и колбасы', 'Овощи и фрукты', 'Напитки', 'Кондитерские изделия'];
    const groups = {
        'Бакалея': ['Крупы', 'Макароны', 'Мука', 'Сахар', 'Соль', 'Масло растительное'],
        'Молочные продукты': ['Молоко', 'Кефир', 'Сметана', 'Творог', 'Сыр', 'Йогурт'],
        'Мясо и колбасы': ['Курица', 'Говядина', 'Свинина', 'Колбаса вареная', 'Колбаса сырокопченая', 'Сосиски'],
        'Овощи и фрукты': ['Картофель', 'Морковь', 'Лук', 'Яблоки', 'Бананы', 'Помидоры'],
        'Напитки': ['Вода', 'Сок', 'Газировка', 'Чай', 'Кофе'],
        'Кондитерские изделия': ['Печенье', 'Шоколад', 'Конфеты', 'Вафли', 'Торт']
    };
    
    const products = [
        { name: 'Рис круглозерный 1кг', department: 'Бакалея', group: 'Крупы', subgroup: 'Рис', price: 89.90 },
        { name: 'Гречка 1кг', department: 'Бакалея', group: 'Крупы', subgroup: 'Гречка', price: 75.50 },
        { name: 'Макароны 500г', department: 'Бакалея', group: 'Макароны', subgroup: 'Спагетти', price: 65.00 },
        { name: 'Молоко 2.5% 1л', department: 'Молочные продукты', group: 'Молоко', subgroup: 'Пастеризованное', price: 79.90 },
        { name: 'Сыр Российский 1кг', department: 'Молочные продукты', group: 'Сыр', subgroup: 'Твердый', price: 850.00 },
        { name: 'Курица тушка 1.5кг', department: 'Мясо и колбасы', group: 'Курица', subgroup: 'Охлажденная', price: 350.00 },
        { name: 'Картофель 1кг', department: 'Овощи и фрукты', group: 'Овощи', subgroup: 'Корнеплоды', price: 45.00 },
        { name: 'Яблоки 1кг', department: 'Овочи и фрукты', group: 'Фрукты', subgroup: 'Сезонные', price: 120.00 },
        { name: 'Вода минеральная 1.5л', department: 'Напитки', group: 'Вода', subgroup: 'Газированная', price: 55.00 },
        { name: 'Шоколад молочный 100г', department: 'Кондитерские изделия', group: 'Шоколад', subgroup: 'Плиточный', price: 95.00 }
    ];
    
    // Генерация данных в зависимости от группировок
    if (groupBy1 === 'whole') {
        // За весь период
        if (groupBy2 === 'totals') {
            // По итогам
            const revenue = Math.floor(Math.random() * 5000000) + 1000000;
            const quantity = Math.floor(Math.random() * 10000) + 5000;
            data.push({
                period: 'Весь период',
                revenue: revenue,
                quantity: quantity,
                avgPrice: revenue / quantity
            });
            totalRevenue = revenue;
            totalQuantity = quantity;
        } else {
            // По товарам/отделам/группам
            if (groupBy3 === 'all') {
                // По всем товарам
                products.forEach(product => {
                    const quantity = Math.floor(Math.random() * 100) + 10;
                    const revenue = quantity * product.price;
                    data.push({
                        name: product.name,
                        quantity: quantity,
                        revenue: revenue,
                        price: product.price
                    });
                    totalRevenue += revenue;
                    totalQuantity += quantity;
                });
            } else if (groupBy3 === 'departments') {
                // По отделам
                departments.forEach(dept => {
                    const quantity = Math.floor(Math.random() * 1000) + 100;
                    const revenue = Math.floor(Math.random() * 500000) + 50000;
                    data.push({
                        department: dept,
                        quantity: quantity,
                        revenue: revenue,
                        avgPrice: revenue / quantity
                    });
                    totalRevenue += revenue;
                    totalQuantity += quantity;
                });
            } else if (groupBy3 === 'groups') {
                // По группам
                const allGroups = [];
                Object.values(groups).forEach(groupList => {
                    allGroups.push(...groupList);
                });
                
                const uniqueGroups = [...new Set(allGroups)];
                uniqueGroups.forEach(group => {
                    const quantity = Math.floor(Math.random() * 500) + 50;
                    const revenue = Math.floor(Math.random() * 250000) + 25000;
                    data.push({
                        group: group,
                        quantity: quantity,
                        revenue: revenue,
                        avgPrice: revenue / quantity
                    });
                    totalRevenue += revenue;
                    totalQuantity += quantity;
                });
            } else if (groupBy3 === 'subgroups') {
                // По подгруппам
                const subgroups = ['Рис', 'Гречка', 'Спагетти', 'Пастеризованное', 'Твердый', 
                                  'Охлажденная', 'Корнеплоды', 'Сезонные', 'Газированная', 'Плиточный'];
                subgroups.forEach(subgroup => {
                    const quantity = Math.floor(Math.random() * 200) + 20;
                    const revenue = Math.floor(Math.random() * 100000) + 10000;
                    data.push({
                        subgroup: subgroup,
                        quantity: quantity,
                        revenue: revenue,
                        avgPrice: revenue / quantity
                    });
                    totalRevenue += revenue;
                    totalQuantity += quantity;
                });
            }
        }
    } else {
        // По каждому дню
        const currentDate = new Date(startDate);
        const daysData = [];
        
        while (currentDate <= endDate) {
            const dayRevenue = Math.floor(Math.random() * 500000) + 100000;
            const dayQuantity = Math.floor(Math.random() * 1000) + 500;
            
            daysData.push({
                date: currentDate.toLocaleDateString('ru-RU'),
                revenue: dayRevenue,
                quantity: dayQuantity,
                avgPrice: dayRevenue / dayQuantity
            });
            
            totalRevenue += dayRevenue;
            totalQuantity += dayQuantity;
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        data.push(...daysData);
    }
    
    return {
        data: data,
        totalRevenue: totalRevenue,
        totalQuantity: totalQuantity,
        groupBy1: groupBy1,
        groupBy2: groupBy2,
        groupBy3: groupBy3,
        startDate: startDate,
        endDate: endDate
    };
}

// Показать результат продаж
function showSalesResult(startDate, endDate, periodType, groupBy1, groupBy2, groupBy3, salesData, format) {
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let periodText = '';
    if (periodType === 'single') {
        periodText = startDate.toLocaleDateString('ru-RU');
    } else {
        periodText = `${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}`;
    }
    
    let html = `
        <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
        <p><strong>Период:</strong> ${periodText}</p>
        <p><strong>Группировка 1:</strong> ${getSalesGroup1Name(groupBy1)}</p>
        <p><strong>Группировка 2:</strong> ${getSalesGroup2Name(groupBy2)}</p>
        <p><strong>Группировка 3:</strong> ${getSalesGroup3Name(groupBy3)}</p>
        <p><strong>Формат:</strong> ${getSalesFormatName(format)}</p>
        <hr>
    `;
    
    // Заголовок таблицы в зависимости от группировок
    let tableHeader = '';
    if (groupBy1 === 'whole' && groupBy2 === 'totals') {
        tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Период</th>';
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во, шт</th>';
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Выручка, ₽</th>';
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Средняя цена, ₽</th>';
    } else if (groupBy1 === 'daily') {
        tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Дата</th>';
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во, шт</th>';
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Выручка, ₽</th>';
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Средняя цена, ₽</th>';
    } else {
        // Определяем заголовок для группировки 3
        let firstColumn = '';
        if (groupBy3 === 'all') firstColumn = 'Товар';
        else if (groupBy3 === 'departments') firstColumn = 'Отдел';
        else if (groupBy3 === 'groups') firstColumn = 'Группа';
        else if (groupBy3 === 'subgroups') firstColumn = 'Подгруппа';
        
        tableHeader = `<th style="padding:8px; border:1px solid #ddd;">${firstColumn}</th>`;
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во, шт</th>';
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Выручка, ₽</th>';
        if (groupBy3 === 'all') {
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Цена, ₽</th>';
        } else {
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Средняя цена, ₽</th>';
        }
    }
    
    html += `
        <table style="width:100%; border-collapse:collapse; margin-top:10px;">
            <thead>
                <tr style="background:#f2f2f2;">
                    ${tableHeader}
                </tr>
            </thead>
            <tbody>
    `;
    
    // Данные таблицы
    salesData.data.forEach(item => {
        html += '<tr>';
        
        if (groupBy1 === 'whole' && groupBy2 === 'totals') {
            html += `<td style="padding:8px; border:1px solid #ddd;">${item.period}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.revenue)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
        } else if (groupBy1 === 'daily') {
            html += `<td style="padding:8px; border:1px solid #ddd;">${item.date}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.revenue)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
        } else {
            // Определяем первую колонку в зависимости от группировки 3
            if (groupBy3 === 'all') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.name}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.revenue)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.price)}</td>`;
            } else if (groupBy3 === 'departments') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.department}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.revenue)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
            } else if (groupBy3 === 'groups') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.group}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.revenue)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
            } else if (groupBy3 === 'subgroups') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.subgroup}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.revenue)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
            }
        }
        
        html += '</tr>';
    });
    
    // Итоги
    html += `
            </tbody>
            <tfoot>
                <tr style="background:#e8f5e8; font-weight:bold;">
                    <td style="padding:8px; border:1px solid #ddd;">Итого:</td>
    `;
    
    if (groupBy1 === 'whole' && groupBy2 === 'totals') {
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(salesData.totalQuantity)}</td>`;
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(salesData.totalRevenue)} ₽</td>`;
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(salesData.totalRevenue / salesData.totalQuantity)}</td>`;
    } else if (groupBy1 === 'daily') {
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(salesData.totalQuantity)}</td>`;
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(salesData.totalRevenue)} ₽</td>`;
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(salesData.totalRevenue / salesData.totalQuantity)}</td>`;
    } else {
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(salesData.totalQuantity)}</td>`;
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(salesData.totalRevenue)} ₽</td>`;
        if (groupBy3 === 'all') {
            html += '<td style="padding:8px; border:1px solid #ddd; text-align:right;">-</td>';
        } else {
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(salesData.totalRevenue / salesData.totalQuantity)}</td>`;
        }
    }
    
    html += `
                </tr>
            </tfoot>
        </table>
        
        <div style="margin-top:15px; padding:10px; background:#e8f5e8; border-radius:5px;">
            <p style="margin:0; color:#27ae60;"><i class="fas fa-check-circle"></i> Выгрузка завершена</p>
        </div>
    `;
    
    document.getElementById('salesResultContent').innerHTML = html;
    document.getElementById('salesLoading').style.display = 'none';
    document.getElementById('salesResult').style.display = 'block';
}

// Вспомогательные функции для названий группировок
function getSalesGroup1Name(group) {
    return group === 'whole' ? 'За весь период' : 'По каждому дню';
}

function getSalesGroup2Name(group) {
    return group === 'products' ? 'По товарам' : 'По итогам';
}

function getSalesGroup3Name(group) {
    const names = {
        'all': 'По всем товарам',
        'departments': 'По отделам',
        'groups': 'По группам',
        'subgroups': 'По подгруппам'
    };
    return names[group] || group;
}

function getSalesFormatName(format) {
    const names = {
        'screen': 'Вывод на экран',
        'print': 'На печать',
        'word': 'Выгрузка в Word',
        'excel': 'Выгрузка в Excel'
    };
    return names[format] || format;
}

// Выполнить выгрузку продаж в нужном формате
function executeSalesExport(format, startDate, endDate, periodType, groupBy1, groupBy2, groupBy3, salesData) {
    if (format === 'screen') return; // Уже показано
    
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let periodText = '';
    if (periodType === 'single') {
        periodText = startDate.toLocaleDateString('ru-RU');
    } else {
        periodText = `${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}`;
    }
    
    // Подготовка данных для выгрузки
    let fileContent = '\uFEFF'; // UTF-8 BOM
    
    fileContent += 'ОТЧЕТ ПО ПРОДАЖАМ\r\n\r\n';
    fileContent += `Магазин: ${shopName} (№${shopId})\r\n`;
    fileContent += `Период: ${periodText}\r\n`;
    fileContent += `Группировка 1: ${getSalesGroup1Name(groupBy1)}\r\n`;
    fileContent += `Группировка 2: ${getSalesGroup2Name(groupBy2)}\r\n`;
    fileContent += `Группировка 3: ${getSalesGroup3Name(groupBy3)}\r\n\r\n`;
    
    // Заголовки столбцов
    let headers = '';
    if (groupBy1 === 'whole' && groupBy2 === 'totals') {
        headers = 'Период;Количество, шт;Выручка, ₽;Средняя цена, ₽\r\n';
    } else if (groupBy1 === 'daily') {
        headers = 'Дата;Количество, шт;Выручка, ₽;Средняя цена, ₽\r\n';
    } else {
        if (groupBy3 === 'all') {
            headers = 'Товар;Количество, шт;Выручка, ₽;Цена, ₽\r\n';
        } else if (groupBy3 === 'departments') {
            headers = 'Отдел;Количество, шт;Выручка, ₽;Средняя цена, ₽\r\n';
        } else if (groupBy3 === 'groups') {
            headers = 'Группа;Количество, шт;Выручка, ₽;Средняя цена, ₽\r\n';
        } else if (groupBy3 === 'subgroups') {
            headers = 'Подгруппа;Количество, шт;Выручка, ₽;Средняя цена, ₽\r\n';
        }
    }
    
    fileContent += headers;
    
    // Данные
    salesData.data.forEach(item => {
        if (groupBy1 === 'whole' && groupBy2 === 'totals') {
            fileContent += `${item.period};${item.quantity};${formatNumber(item.revenue)};${formatNumber(item.avgPrice)}\r\n`;
        } else if (groupBy1 === 'daily') {
            fileContent += `${item.date};${item.quantity};${formatNumber(item.revenue)};${formatNumber(item.avgPrice)}\r\n`;
        } else {
            if (groupBy3 === 'all') {
                fileContent += `${item.name};${item.quantity};${formatNumber(item.revenue)};${formatNumber(item.price)}\r\n`;
            } else if (groupBy3 === 'departments') {
                fileContent += `${item.department};${item.quantity};${formatNumber(item.revenue)};${formatNumber(item.avgPrice)}\r\n`;
            } else if (groupBy3 === 'groups') {
                fileContent += `${item.group};${item.quantity};${formatNumber(item.revenue)};${formatNumber(item.avgPrice)}\r\n`;
            } else if (groupBy3 === 'subgroups') {
                fileContent += `${item.subgroup};${item.quantity};${formatNumber(item.revenue)};${formatNumber(item.avgPrice)}\r\n`;
            }
        }
    });
    
    fileContent += `\r\nИтого;${salesData.totalQuantity};${formatNumber(salesData.totalRevenue)}\r\n\r\n`;
    fileContent += `Сформировано: ${new Date().toLocaleString('ru-RU')}\r\n`;
    fileContent += 'Система управления инвентаризацией - Кировский';
    
    // Создание файла
    let mimeType, fileExt;
    if (format === 'print') {
        // Для печати открываем новое окно
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Отчет по продажам</title>
                <style>
                    body { font-family: Arial; margin: 20px; }
                    h1 { text-align: center; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #000; padding: 8px; }
                    th { background: #eee; }
                    ...total { font-weight: bold; background: #e8f5e8; }
                </style>
            </head>
            <body>
                <h1>ОТЧЕТ ПО ПРОДАЖАМ</h1>
                <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
                <p><strong>Период:</strong> ${periodText}</p>
                <p><strong>Группировка 1:</strong> ${getSalesGroup1Name(groupBy1)}</p>
                <p><strong>Группировка 2:</strong> ${getSalesGroup2Name(groupBy2)}</p>
                <p><strong>Группировка 3:</strong> ${getSalesGroup3Name(groupBy3)}</p>
                ${document.getElementById('salesResultContent').innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        return;
    } else if (format === 'word') {
        mimeType = 'application/msword';
        fileExt = 'doc';
    } else if (format === 'excel') {
        mimeType = 'text/csv;charset=utf-8';
        fileExt = 'csv';
    }
    
    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Отчет_по_продажам_${shopId}_${startDate.toISOString().slice(0,10)}_${format === 'single' ? '' : endDate.toISOString().slice(0,10)}.${fileExt}`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Сброс состояния модального окна продаж
function resetExportSalesModal() {
    document.getElementById('confirmExportSales').disabled = false;
    document.getElementById('cancelExportSales').disabled = false;
    document.getElementById('salesLoading').style.display = 'none';
    document.getElementById('salesResult').style.display = 'none';
    document.getElementById('salesProgressBar').style.width = '0%';
}

// Закрытие по крестику
document.querySelector('#exportSalesModal .close').addEventListener('click', function() {
    document.getElementById('exportSalesModal').style.display = 'none';
    resetExportSalesModal();
});

// Закрытие по клику вне окна
window.addEventListener('click', function(e) {
    if (e.target.id === 'exportSalesModal') {
        document.getElementById('exportSalesModal').style.display = 'none';
        resetExportSalesModal();
    }
});
            
            // ================== ВЫГРУЗКА ОСТАТКОВ - НОВАЯ ВЕРСИЯ ==================

// Инициализация модального окна выгрузки данных по остаткам
document.getElementById('exportStockBtn').addEventListener('click', function() {
    document.getElementById('exportStockModal').style.display = 'flex';
    
    // Установка текущей даты по умолчанию
    const today = new Date();
    document.getElementById('stockDate').valueAsDate = today;
    
    // Скрываем блоки результата и загрузки
    document.getElementById('stockResult').style.display = 'none';
    document.getElementById('stockLoading').style.display = 'none';
    
    // Сбрасываем прогресс бар
    document.getElementById('stockProgressBar').style.width = '0%';
});

// Отмена выгрузки
document.getElementById('cancelExportStock').addEventListener('click', function() {
    document.getElementById('exportStockModal').style.display = 'none';
    resetExportStockModal();
});

// Основная функция выгрузки остатков
document.getElementById('confirmExportStock').addEventListener('click', function() {
    const stockDate = document.getElementById('stockDate').value;
    const format = document.getElementById('stockFormat').value;
    const groupBy1 = document.getElementById('stockGroupBy1').value;
    const groupBy2 = document.getElementById('stockGroupBy2').value;
    
    if (!stockDate) {
        showAlert('Выберите дату', 'warning');
        return;
    }
    
    const date = new Date(stockDate);
    
    // Блокируем кнопки и показываем загрузку
    document.getElementById('confirmExportStock').disabled = true;
    document.getElementById('cancelExportStock').disabled = true;
    document.getElementById('stockLoading').style.display = 'block';
    document.getElementById('stockResult').style.display = 'none';
    
    // Имитация загрузки
    let progress = 0;
    const progressBar = document.getElementById('stockProgressBar');
    progressBar.style.width = '0%';
    
    const progressInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            try {
                // Генерируем данные об остатках
                const stockData = generateStockData(date, groupBy1, groupBy2);
                
                // Показываем результат
                showStockResult(date, groupBy1, groupBy2, stockData, format);
                
                // Выполняем выгрузку в выбранном формате
                executeStockExport(format, date, groupBy1, groupBy2, stockData);
                
                // Восстанавливаем кнопки
                document.getElementById('confirmExportStock').disabled = false;
                document.getElementById('cancelExportStock').disabled = false;
                
                // Уведомление
                showAlert(`Выгрузка данных по остаткам на ${date.toLocaleDateString('ru-RU')} завершена`, 'success');
                
            } catch (error) {
                console.error('Ошибка:', error);
                document.getElementById('confirmExportStock').disabled = false;
                document.getElementById('cancelExportStock').disabled = false;
                document.getElementById('stockLoading').style.display = 'none';
                showAlert('Ошибка при выгрузке', 'danger');
            }
        }
    }, 150);
});

// Генерация данных об остатках
function generateStockData(date, groupBy1, groupBy2) {
    const data = [];
    let totalQuantity = 0;
    let totalAmount = 0;
    
    // Примерные категории товаров для остатков
    const departments = ['Бакалея', 'Молочные продукты', 'Мясо и колбасы', 'Овощи и фрукты', 'Напитки', 'Кондитерские изделия'];
    const groups = {
        'Бакалея': ['Крупы', 'Макароны', 'Мука', 'Сахар', 'Соль', 'Масло растительное'],
        'Молочные продукты': ['Молоко', 'Кефир', 'Сметана', 'Творог', 'Сыр', 'Йогурт'],
        'Мясо и колбасы': ['Курица', 'Говядина', 'Свинина', 'Колбаса вареная', 'Колбаса сырокопченая', 'Сосиски'],
        'Овощи и фрукты': ['Картофель', 'Морковь', 'Лук', 'Яблоки', 'Бананы', 'Помидоры'],
        'Напитки': ['Вода', 'Сок', 'Газировка', 'Чай', 'Кофе'],
        'Кондитерские изделия': ['Печенье', 'Шоколад', 'Конфеты', 'Вафли', 'Торт']
    };
    
    const products = [
        { name: 'Рис круглозерный 1кг', department: 'Бакалея', group: 'Крупы', subgroup: 'Рис', price: 89.90, unit: 'шт' },
        { name: 'Гречка 1кг', department: 'Бакалея', group: 'Крупы', subgroup: 'Гречка', price: 75.50, unit: 'шт' },
        { name: 'Макароны 500г', department: 'Бакалея', group: 'Макароны', subgroup: 'Спагетти', price: 65.00, unit: 'шт' },
        { name: 'Молоко 2.5% 1л', department: 'Молочные продукты', group: 'Молоко', subgroup: 'Пастеризованное', price: 79.90, unit: 'шт' },
        { name: 'Сыр Российский 1кг', department: 'Молочные продукты', group: 'Сыр', subgroup: 'Твердый', price: 850.00, unit: 'кг' },
        { name: 'Курица тушка 1.5кг', department: 'Мясо и колбасы', group: 'Курица', subgroup: 'Охлажденная', price: 350.00, unit: 'шт' },
        { name: 'Картофель 1кг', department: 'Овощи и фрукты', group: 'Овощи', subgroup: 'Корнеплоды', price: 45.00, unit: 'кг' },
        { name: 'Яблоки 1кг', department: 'Овочи и фрукты', group: 'Фрукты', subgroup: 'Сезонные', price: 120.00, unit: 'кг' },
        { name: 'Вода минеральная 1.5л', department: 'Напитки', group: 'Вода', subgroup: 'Газированная', price: 55.00, unit: 'шт' },
        { name: 'Шоколад молочный 100г', department: 'Кондитерские изделия', group: 'Шоколад', subgroup: 'Плиточный', price: 95.00, unit: 'шт' }
    ];
    
    // Генерация данных в зависимости от группировок
    if (groupBy1 === 'totals') {
        // Итоги
        if (groupBy2 === 'all') {
            // Общий итог
            const quantity = Math.floor(Math.random() * 10000) + 5000;
            const amount = Math.floor(Math.random() * 5000000) + 1000000;
            data.push({
                type: 'Общий остаток',
                quantity: quantity,
                amount: amount,
                avgPrice: amount / quantity
            });
            totalQuantity = quantity;
            totalAmount = amount;
        } else if (groupBy2 === 'departments') {
            // Итоги по отделам
            departments.forEach(dept => {
                const quantity = Math.floor(Math.random() * 1000) + 100;
                const amount = Math.floor(Math.random() * 500000) + 50000;
                data.push({
                    department: dept,
                    quantity: quantity,
                    amount: amount,
                    avgPrice: amount / quantity
                });
                totalQuantity += quantity;
                totalAmount += amount;
            });
        } else if (groupBy2 === 'groups') {
            // Итоги по группам
            const allGroups = [];
            Object.values(groups).forEach(groupList => {
                allGroups.push(...groupList);
            });
            
            const uniqueGroups = [...new Set(allGroups)];
            uniqueGroups.forEach(group => {
                const quantity = Math.floor(Math.random() * 500) + 50;
                const amount = Math.floor(Math.random() * 250000) + 25000;
                data.push({
                    group: group,
                    quantity: quantity,
                    amount: amount,
                    avgPrice: amount / quantity
                });
                totalQuantity += quantity;
                totalAmount += amount;
            });
        } else if (groupBy2 === 'subgroups') {
            // Итоги по подгруппам
            const subgroups = ['Рис', 'Гречка', 'Спагетти', 'Пастеризованное', 'Твердый', 
                              'Охлажденная', 'Корнеплоды', 'Сезонные', 'Газированная', 'Плиточный'];
            subgroups.forEach(subgroup => {
                const quantity = Math.floor(Math.random() * 200) + 20;
                const amount = Math.floor(Math.random() * 100000) + 10000;
                data.push({
                    subgroup: subgroup,
                    quantity: quantity,
                    amount: amount,
                    avgPrice: amount / quantity
                });
                totalQuantity += quantity;
                totalAmount += amount;
            });
        }
    } else {
        // По товарам
        if (groupBy2 === 'all') {
            // Все товары
            products.forEach(product => {
                const quantity = Math.floor(Math.random() * 100) + 10;
                const amount = quantity * product.price;
                data.push({
                    name: product.name,
                    unit: product.unit,
                    quantity: quantity,
                    price: product.price,
                    amount: amount
                });
                totalQuantity += quantity;
                totalAmount += amount;
            });
        } else if (groupBy2 === 'departments') {
            // По отделам (детализация по товарам внутри отделов)
            departments.forEach(dept => {
                const deptProducts = products.filter(p => p.department === dept);
                deptProducts.forEach(product => {
                    const quantity = Math.floor(Math.random() * 50) + 5;
                    const amount = quantity * product.price;
                    data.push({
                        department: dept,
                        name: product.name,
                        unit: product.unit,
                        quantity: quantity,
                        price: product.price,
                        amount: amount
                    });
                    totalQuantity += quantity;
                    totalAmount += amount;
                });
            });
        } else if (groupBy2 === 'groups') {
            // По группам (детализация по товарам внутри групп)
            const allGroups = [];
            Object.entries(groups).forEach(([dept, groupList]) => {
                groupList.forEach(group => {
                    const groupProducts = products.filter(p => p.department === dept && p.group === group);
                    groupProducts.forEach(product => {
                        const quantity = Math.floor(Math.random() * 30) + 3;
                        const amount = quantity * product.price;
                        data.push({
                            group: group,
                            name: product.name,
                            unit: product.unit,
                            quantity: quantity,
                            price: product.price,
                            amount: amount
                        });
                        totalQuantity += quantity;
                        totalAmount += amount;
                    });
                });
            });
        } else if (groupBy2 === 'subgroups') {
            // По подгруппам (детализация по товарам внутри подгрупп)
            const subgroupsMap = {
                'Рис': ['Рис круглозерный 1кг'],
                'Гречка': ['Гречка 1кг'],
                'Спагетти': ['Макароны 500г'],
                'Пастеризованное': ['Молоко 2.5% 1л'],
                'Твердый': ['Сыр Российский 1кг'],
                'Охлажденная': ['Курица тушка 1.5кг'],
                'Корнеплоды': ['Картофель 1кг'],
                'Сезонные': ['Яблоки 1кг'],
                'Газированная': ['Вода минеральная 1.5л'],
                'Плиточный': ['Шоколад молочный 100г']
            };
            
            Object.entries(subgroupsMap).forEach(([subgroup, productNames]) => {
                productNames.forEach(productName => {
                    const product = products.find(p => p.name === productName);
                    if (product) {
                        const quantity = Math.floor(Math.random() * 20) + 2;
                        const amount = quantity * product.price;
                        data.push({
                            subgroup: subgroup,
                            name: product.name,
                            unit: product.unit,
                            quantity: quantity,
                            price: product.price,
                            amount: amount
                        });
                        totalQuantity += quantity;
                        totalAmount += amount;
                    }
                });
            });
        }
    }
    
    return {
        data: data,
        totalQuantity: totalQuantity,
        totalAmount: totalAmount,
        groupBy1: groupBy1,
        groupBy2: groupBy2,
        date: date
    };
}

// Показать результат остатков
function showStockResult(date, groupBy1, groupBy2, stockData, format) {
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let html = `
        <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
        <p><strong>На утро даты:</strong> ${date.toLocaleDateString('ru-RU')}</p>
        <p><strong>Группировка 1:</strong> ${getStockGroup1Name(groupBy1)}</p>
        <p><strong>Группировка 2:</strong> ${getStockGroup2Name(groupBy2)}</p>
        <p><strong>Формат:</strong> ${getStockFormatName(format)}</p>
        <hr>
    `;
    
    // Заголовок таблицы в зависимости от группировок
    let tableHeader = '';
    if (groupBy1 === 'totals') {
        if (groupBy2 === 'all') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Тип</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Средняя цена, ₽</th>';
        } else if (groupBy2 === 'departments') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Отдел</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Средняя цена, ₽</th>';
        } else if (groupBy2 === 'groups') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Группа</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Средняя цена, ₽</th>';
        } else if (groupBy2 === 'subgroups') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Подгруппа</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Средняя цена, ₽</th>';
        }
    } else {
        // По товарам
        if (groupBy2 === 'all') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Товар</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd;">Ед.</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Цена, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
        } else if (groupBy2 === 'departments') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Отдел</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd;">Товар</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd;">Ед.</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Цена, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
        } else if (groupBy2 === 'groups') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Группа</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd;">Товар</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd;">Ед.</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Цена, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
        } else if (groupBy2 === 'subgroups') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Подгруппа</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd;">Товар</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd;">Ед.</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Цена, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
        }
    }
    
    html += `
        <table style="width:100%; border-collapse:collapse; margin-top:10px;">
            <thead>
                <tr style="background:#f2f2f2;">
                    ${tableHeader}
                </tr>
            </thead>
            <tbody>
    `;
    
    // Данные таблицы
    stockData.data.forEach(item => {
        html += '<tr>';
        
        if (groupBy1 === 'totals') {
            if (groupBy2 === 'all') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.type}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
            } else if (groupBy2 === 'departments') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.department}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
            } else if (groupBy2 === 'groups') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.group}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
            } else if (groupBy2 === 'subgroups') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.subgroup}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
            }
        } else {
            // По товарам
            if (groupBy2 === 'all') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.name}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.unit}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.price)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
            } else if (groupBy2 === 'departments') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.department}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.name}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.unit}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.price)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
            } else if (groupBy2 === 'groups') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.group}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.name}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.unit}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.price)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
            } else if (groupBy2 === 'subgroups') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.subgroup}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.name}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.unit}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.price)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
            }
        }
        
        html += '</tr>';
    });
    
    // Итоги
    html += `
            </tbody>
            <tfoot>
                <tr style="background:#e8f5e8; font-weight:bold;">
    `;
    
    if (groupBy1 === 'totals') {
        if (groupBy2 === 'all') {
            html += `<td style="padding:8px; border:1px solid #ddd;">Итого:</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(stockData.totalQuantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(stockData.totalAmount)} ₽</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(stockData.totalAmount / stockData.totalQuantity)}</td>`;
        } else {
            html += `<td style="padding:8px; border:1px solid #ddd;" colspan="2">Итого:</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(stockData.totalQuantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(stockData.totalAmount)} ₽</td>`;
        }
    } else {
        // По товарам
        if (groupBy2 === 'all') {
            html += `<td style="padding:8px; border:1px solid #ddd;" colspan="3">Итого:</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(stockData.totalQuantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(stockData.totalAmount)} ₽</td>`;
        } else if (groupBy2 === 'departments') {
            html += `<td style="padding:8px; border:1px solid #ddd;" colspan="4">Итого:</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(stockData.totalQuantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(stockData.totalAmount)} ₽</td>`;
        } else if (groupBy2 === 'groups') {
            html += `<td style="padding:8px; border:1px solid #ddd;" colspan="4">Итого:</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(stockData.totalQuantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(stockData.totalAmount)} ₽</td>`;
        } else if (groupBy2 === 'subgroups') {
            html += `<td style="padding:8px; border:1px solid #ddd;" colspan="4">Итого:</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(stockData.totalQuantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(stockData.totalAmount)} ₽</td>`;
        }
    }
    
    html += `
                </tr>
            </tfoot>
        </table>
        
        <div style="margin-top:15px; padding:10px; background:#e8f5e8; border-radius:5px;">
            <p style="margin:0; color:#27ae60;"><i class="fas fa-check-circle"></i> Выгрузка завершена</p>
        </div>
    `;
    
    document.getElementById('stockResultContent').innerHTML = html;
    document.getElementById('stockLoading').style.display = 'none';
    document.getElementById('stockResult').style.display = 'block';
}

// Вспомогательные функции для названий группировок
function getStockGroup1Name(group) {
    return group === 'products' ? 'По товарам' : 'Итоги';
}

function getStockGroup2Name(group) {
    const names = {
        'all': 'По всем товарам',
        'departments': 'По отделам',
        'groups': 'По группам',
        'subgroups': 'По подгруппам'
    };
    return names[group] || group;
}

function getStockFormatName(format) {
    const names = {
        'screen': 'Вывод на экран',
        'print': 'На печать',
        'wordpad': 'Выгрузка в WordPad',
        'excel': 'Выгрузка в Excel'
    };
    return names[format] || format;
}

// Выполнить выгрузку остатков в нужном формате
function executeStockExport(format, date, groupBy1, groupBy2, stockData) {
    if (format === 'screen') return; // Уже показано
    
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    // Подготовка данных для выгрузки
    let fileContent = '\uFEFF'; // UTF-8 BOM
    
    fileContent += 'ОТЧЕТ ПО ОСТАТКАМ\r\n\r\n';
    fileContent += `Магазин: ${shopName} (№${shopId})\r\n`;
    fileContent += `На утро даты: ${date.toLocaleDateString('ru-RU')}\r\n`;
    fileContent += `Группировка 1: ${getStockGroup1Name(groupBy1)}\r\n`;
    fileContent += `Группировка 2: ${getStockGroup2Name(groupBy2)}\r\n\r\n`;
    
    // Заголовки столбцов
    let headers = '';
    if (groupBy1 === 'totals') {
        if (groupBy2 === 'all') {
            headers = 'Тип;Количество;Сумма, ₽;Средняя цена, ₽\r\n';
        } else if (groupBy2 === 'departments') {
            headers = 'Отдел;Количество;Сумма, ₽;Средняя цена, ₽\r\n';
        } else if (groupBy2 === 'groups') {
            headers = 'Группа;Количество;Сумма, ₽;Средняя цена, ₽\r\n';
        } else if (groupBy2 === 'subgroups') {
            headers = 'Подгруппа;Количество;Сумма, ₽;Средняя цена, ₽\r\n';
        }
    } else {
        // По товарам
        if (groupBy2 === 'all') {
            headers = 'Товар;Ед.изм.;Количество;Цена, ₽;Сумма, ₽\r\n';
        } else if (groupBy2 === 'departments') {
            headers = 'Отдел;Товар;Ед.изм.;Количество;Цена, ₽;Сумма, ₽\r\n';
        } else if (groupBy2 === 'groups') {
            headers = 'Группа;Товар;Ед.изм.;Количество;Цена, ₽;Сумма, ₽\r\n';
        } else if (groupBy2 === 'subgroups') {
            headers = 'Подгруппа;Товар;Ед.изм.;Количество;Цена, ₽;Сумма, ₽\r\n';
        }
    }
    
    fileContent += headers;
    
    // Данные
    stockData.data.forEach(item => {
        if (groupBy1 === 'totals') {
            if (groupBy2 === 'all') {
                fileContent += `${item.type};${item.quantity};${formatNumber(item.amount)};${formatNumber(item.avgPrice)}\r\n`;
            } else if (groupBy2 === 'departments') {
                fileContent += `${item.department};${item.quantity};${formatNumber(item.amount)};${formatNumber(item.avgPrice)}\r\n`;
            } else if (groupBy2 === 'groups') {
                fileContent += `${item.group};${item.quantity};${formatNumber(item.amount)};${formatNumber(item.avgPrice)}\r\n`;
            } else if (groupBy2 === 'subgroups') {
                fileContent += `${item.subgroup};${item.quantity};${formatNumber(item.amount)};${formatNumber(item.avgPrice)}\r\n`;
            }
        } else {
            // По товарам
            if (groupBy2 === 'all') {
                fileContent += `${item.name};${item.unit};${item.quantity};${formatNumber(item.price)};${formatNumber(item.amount)}\r\n`;
            } else if (groupBy2 === 'departments') {
                fileContent += `${item.department};${item.name};${item.unit};${item.quantity};${formatNumber(item.price)};${formatNumber(item.amount)}\r\n`;
            } else if (groupBy2 === 'groups') {
                fileContent += `${item.group};${item.name};${item.unit};${item.quantity};${formatNumber(item.price)};${formatNumber(item.amount)}\r\n`;
            } else if (groupBy2 === 'subgroups') {
                fileContent += `${item.subgroup};${item.name};${item.unit};${item.quantity};${formatNumber(item.price)};${formatNumber(item.amount)}\r\n`;
            }
        }
    });
    
    fileContent += `\r\nИтого;${stockData.totalQuantity};${formatNumber(stockData.totalAmount)}\r\n\r\n`;
    fileContent += `Сформировано: ${new Date().toLocaleString('ru-RU')}\r\n`;
    fileContent += 'Система управления инвентаризацией - Кировский';
    
    // Создание файла
    let mimeType, fileExt;
    
    if (format === 'print') {
        // Для печати открываем новое окно
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Отчет по остаткам</title>
                <style>
                    body { font-family: Arial; margin: 20px; }
                    h1 { text-align: center; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #000; padding: 8px; }
                    th { background: #eee; }
                    ...total { font-weight: bold; background: #e8f5e8; }
                </style>
            </head>
            <body>
                <h1>ОТЧЕТ ПО ОСТАТКАМ</h1>
                <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
                <p><strong>На утро даты:</strong> ${date.toLocaleDateString('ru-RU')}</p>
                <p><strong>Группировка 1:</strong> ${getStockGroup1Name(groupBy1)}</p>
                <p><strong>Группировка 2:</strong> ${getStockGroup2Name(groupBy2)}</p>
                ${document.getElementById('stockResultContent').innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        return;
    } else if (format === 'wordpad') {
        // Для WordPad - текстовый файл с табуляцией
        let txtContent = 'ОТЧЕТ ПО ОСТАТКАМ\n\n';
        txtContent += `Магазин: ${shopName} (№${shopId})\n`;
        txtContent += `На утро даты: ${date.toLocaleDateString('ru-RU')}\n`;
        txtContent += `Группировка 1: ${getStockGroup1Name(groupBy1)}\n`;
        txtContent += `Группировка 2: ${getStockGroup2Name(groupBy2)}\n\n`;
        
        // Данные с табуляцией
        stockData.data.forEach(item => {
            if (groupBy1 === 'totals') {
                if (groupBy2 === 'all') {
                    txtContent += `${item.type}\t${item.quantity}\t${formatNumber(item.amount)} ₽\t${formatNumber(item.avgPrice)} ₽\n`;
                } else if (groupBy2 === 'departments') {
                    txtContent += `${item.department}\t${item.quantity}\t${formatNumber(item.amount)} ₽\t${formatNumber(item.avgPrice)} ₽\n`;
                } else if (groupBy2 === 'groups') {
                    txtContent += `${item.group}\t${item.quantity}\t${formatNumber(item.amount)} ₽\t${formatNumber(item.avgPrice)} ₽\n`;
                } else if (groupBy2 === 'subgroups') {
                    txtContent += `${item.subgroup}\t${item.quantity}\t${formatNumber(item.amount)} ₽\t${formatNumber(item.avgPrice)} ₽\n`;
                }
            } else {
                if (groupBy2 === 'all') {
                    txtContent += `${item.name}\t${item.unit}\t${item.quantity}\t${formatNumber(item.price)} ₽\t${formatNumber(item.amount)} ₽\n`;
                } else if (groupBy2 === 'departments') {
                    txtContent += `${item.department} - ${item.name}\t${item.unit}\t${item.quantity}\t${formatNumber(item.price)} ₽\t${formatNumber(item.amount)} ₽\n`;
                } else if (groupBy2 === 'groups') {
                    txtContent += `${item.group} - ${item.name}\t${item.unit}\t${item.quantity}\t${formatNumber(item.price)} ₽\t${formatNumber(item.amount)} ₽\n`;
                } else if (groupBy2 === 'subgroups') {
                    txtContent += `${item.subgroup} - ${item.name}\t${item.unit}\t${item.quantity}\t${formatNumber(item.price)} ₽\t${formatNumber(item.amount)} ₽\n`;
                }
            }
        });
        
        txtContent += `\nИтого:\t${stockData.totalQuantity}\t${formatNumber(stockData.totalAmount)} ₽\n\n`;
        txtContent += `Сформировано: ${new Date().toLocaleString('ru-RU')}\n`;
        txtContent += 'Система управления инвентаризацией - Кировский';
        
        fileContent = txtContent;
        mimeType = 'text/plain;charset=utf-8';
        fileExt = 'txt';
    } else if (format === 'excel') {
        mimeType = 'text/csv;charset=utf-8';
        fileExt = 'csv';
    }
    
    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Отчет_по_остаткам_${shopId}_${date.toISOString().slice(0,10)}.${fileExt}`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Сброс состояния модального окна остатков
function resetExportStockModal() {
    document.getElementById('confirmExportStock').disabled = false;
    document.getElementById('cancelExportStock').disabled = false;
    document.getElementById('stockLoading').style.display = 'none';
    document.getElementById('stockResult').style.display = 'none';
    document.getElementById('stockProgressBar').style.width = '0%';
}

// Закрытие по крестику
document.querySelector('#exportStockModal .close').addEventListener('click', function() {
    document.getElementById('exportStockModal').style.display = 'none';
    resetExportStockModal();
});

// Закрытие по клику вне окна
window.addEventListener('click', function(e) {
    if (e.target.id === 'exportStockModal') {
        document.getElementById('exportStockModal').style.display = 'none';
        resetExportStockModal();
    }
});
            
            // ================== ХОЗЯЙСТВЕННЫЕ ОПЕРАЦИИ - НОВАЯ ВЕРСИЯ ==================

// Инициализация модального окна выполнения хозяйственных операций
document.getElementById('executeOperationsBtn').addEventListener('click', function() {
    document.getElementById('executeOperationsModal').style.display = 'flex';
    
    // Установка дат по умолчанию (последние 30 дней)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
    
    document.getElementById('operationStartDate').valueAsDate = startDate;
    document.getElementById('operationEndDate').valueAsDate = endDate;
    
    // Сброс полей
    document.getElementById('operationShopNumber').value = appData.currentShop ? appData.currentShop.id : '';
    document.getElementById('operationNumbers').value = '';
    document.getElementById('operationSingleProduct').value = '';
    document.getElementById('operationPrintTotalsOnly').checked = false;
    
    // Скрываем блоки результата и загрузки
    document.getElementById('operationResult').style.display = 'none';
    document.getElementById('operationLoading').style.display = 'none';
    
    // Сбрасываем прогресс бар
    document.getElementById('operationProgressBar').style.width = '0%';
});

// Переключение между номером магазина и ракурсом
document.getElementById('operationDivisionType').addEventListener('change', function() {
    const isShop = this.value === 'shop';
    document.getElementById('shopNumberGroup').style.display = isShop ? 'block' : 'none';
    document.getElementById('perspectiveGroup').style.display = isShop ? 'none' : 'block';
});

// Переключение между всеми товарами и одним товаром
document.getElementById('operationProductType').addEventListener('change', function() {
    const isSingle = this.value === 'single';
    document.getElementById('singleProductGroup').style.display = isSingle ? 'block' : 'none';
});

// Отмена выполнения
document.getElementById('cancelExecuteOperations').addEventListener('click', function() {
    document.getElementById('executeOperationsModal').style.display = 'none';
    resetExecuteOperationsModal();
});

document.getElementById('confirmExecuteOperations').addEventListener('click', function() {
    // Существующие проверки...
    const divisionType = document.getElementById('operationDivisionType').value;
    const shopNumber = document.getElementById('operationShopNumber').value;
    const perspective = document.getElementById('operationPerspective').value;
    const startDateStr = document.getElementById('operationStartDate').value;
    const endDateStr = document.getElementById('operationEndDate').value;
    const operationsString = document.getElementById('operationNumbers').value;
    const productType = document.getElementById('operationProductType').value;
    const singleProduct = document.getElementById('operationSingleProduct').value;
    const format = document.getElementById('operationFormat').value;
    const printTotalsOnly = document.getElementById('operationPrintTotalsOnly').checked;
    
    // Валидация дат
    const dateError = validateDateRange(startDateStr, endDateStr, 'Дата начала периода', 'Дата окончания периода');
    if (dateError) {
        showAlert(dateError, 'warning');
        return; // Важно: останавливаем выполнение
    }
    
    // Валидация операций
    const operationsError = validateOperations(operationsString);
    if (operationsError) {
        showAlert(operationsError, 'warning');
        return; // Важно: останавливаем выполнение
    }
    
    // Валидация номера магазина (если выбран)
    if (divisionType === 'shop') {
        if (!shopNumber.trim()) {
            showAlert('Введите номер магазина', 'warning');
            return; // Важно: останавливаем выполнение
        }
        if (!/^\d+$/.test(shopNumber.trim())) {
            showAlert('Номер магазина должен содержать только цифры', 'warning');
            return; // Важно: останавливаем выполнение
        }
    }
    
    // Валидация товара (если выбран один товар)
    if (productType === 'single' && !singleProduct.trim()) {
        showAlert('Введите название товара', 'warning');
        return; // Важно: останавливаем выполнение
    }
    
    // Блокируем кнопки и показываем загрузку
    document.getElementById('confirmExecuteOperations').disabled = true;
    document.getElementById('cancelExecuteOperations').disabled = true;
    document.getElementById('operationLoading').style.display = 'block';
    document.getElementById('operationResult').style.display = 'none';
    
    // Имитация загрузки
    let progress = 0;
    const progressBar = document.getElementById('operationProgressBar');
    progressBar.style.width = '0%';
    
    const progressInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            try {
                // Генерируем данные
                const operationData = generateOperationData(startDateStr, endDateStr, operationsString, productType, singleProduct, printTotalsOnly);
                
                // Показываем результат
                showOperationResult(startDateStr, endDateStr, operationsString, operationData, format, printTotalsOnly);
                
                // Выполняем выгрузку в выбранном формате
                executeOperationExport(format, startDateStr, endDateStr, operationsString, operationData, printTotalsOnly);
                
                // Восстанавливаем кнопки
                document.getElementById('confirmExecuteOperations').disabled = false;
                document.getElementById('cancelExecuteOperations').disabled = false;
                
                // Уведомление
                showAlert(`Выполнение хозяйственных операций завершено`, 'success');
                
            } catch (error) {
                console.error('Ошибка:', error);
                document.getElementById('confirmExecuteOperations').disabled = false;
                document.getElementById('cancelExecuteOperations').disabled = false;
                document.getElementById('operationLoading').style.display = 'none';
                showAlert('Ошибка при выполнении операций', 'danger');
            }
        }
    }, 150);
});

// Генерация данных об операциях
function generateOperationsData(divisionType, shopNumber, perspective, startDate, endDate, operationNumbers, productType, singleProduct, printTotalsOnly) {
    const data = [];
    let totalOperations = 0;
    let totalAmount = 0;
    let totalQuantity = 0;
    
    // Определяем подразделение
    let divisionInfo = '';
    if (divisionType === 'shop') {
        divisionInfo = `Магазин №${shopNumber}`;
    } else {
        const perspectiveNames = {
            'all': 'Все подразделения',
            'north': 'Северный округ',
            'south': 'Южный округ',
            'center': 'Центральный округ',
            'east': 'Восточный округ'
        };
        divisionInfo = perspectiveNames[perspective] || perspective;
    }
    
    // Примерные товары для операций
    const allProducts = [
	...productData.alcohol,
    ...productData.beer,
    ...productData.cigarettes,
    ...productData.general,
        'Рис круглозерный 1кг', 'Гречка 1кг', 'Макароны 500г', 'Молоко 2.5% 1л',
        'Сыр Российский 1кг', 'Курица тушка 1.5кг', 'Картофель 1кг', 'Яблоки 1кг',
        'Вода минеральная 1.5л', 'Шоколад молочный 100г', 'Чай черный 100г',
        'Кофе молотый 250г', 'Сахар 1кг', 'Соль 1кг', 'Масло подсолнечное 1л'
    ];
    
    // Определяем товары для отчета
    let products = [];
    if (productType === 'single') {
        products = [singleProduct];
    } else {
        products = allProducts;
    }
    
    // Генерируем данные для каждой операции
    operationNumbers.forEach(opNumber => {
        // Для каждой операции создаем записи по товарам или итоги
        if (printTotalsOnly) {
            // Только итоги по операции
            const opQuantity = Math.floor(Math.random() * 1000) + 100;
            const opAmount = Math.floor(Math.random() * 500000) + 50000;
            
            data.push({
                operation: opNumber,
                type: 'Итог операции',
                product: '-',
                quantity: opQuantity,
                amount: opAmount,
                unit: 'шт',
                price: opAmount / opQuantity,
                date: getRandomDate(startDate, endDate).toLocaleDateString('ru-RU')
            });
            
            totalOperations++;
            totalQuantity += opQuantity;
            totalAmount += opAmount;
        } else {
            // Детализация по товарам
            products.forEach(product => {
                const quantity = Math.floor(Math.random() * 100) + 10;
                const price = Math.floor(Math.random() * 500) + 50;
                const amount = quantity * price;
                const unit = product.includes('кг') || product.includes('л') ? 'кг/л' : 'шт';
                
                data.push({
                    operation: opNumber,
                    type: 'Хоз. операция',
                    product: product,
                    quantity: quantity,
                    amount: amount,
                    unit: unit,
                    price: price,
                    date: getRandomDate(startDate, endDate).toLocaleDateString('ru-RU')
                });
                
                totalOperations++;
                totalQuantity += quantity;
                totalAmount += amount;
            });
        }
    });
    
    return {
        data: data,
        divisionInfo: divisionInfo,
        period: `${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}`,
        operationNumbers: operationNumbers.join(', '),
        productType: productType === 'single' ? `Товар: ${singleProduct}` : 'Все товары',
        printTotalsOnly: printTotalsOnly,
        totals: {
            operations: totalOperations,
            quantity: totalQuantity,
            amount: totalAmount
        }
    };
}

// Вспомогательная функция для получения случайной даты в диапазоне
function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Показать результат операций
function showOperationsResult(operationsData) {
    let html = `
        <p><strong>Подразделение:</strong> ${operationsData.divisionInfo}</p>
        <p><strong>Период:</strong> ${operationsData.period}</p>
        <p><strong>Операции:</strong> ${operationsData.operationNumbers}</p>
        <p><strong>Товары:</strong> ${operationsData.productType}</p>
        <p><strong>Режим:</strong> ${operationsData.printTotalsOnly ? 'Только итоги' : 'Полная детализация'}</p>
        <hr>
    `;
    
    if (operationsData.printTotalsOnly) {
        // Только итоги
        html += `
            <table style="width:100%; border-collapse:collapse; margin-top:10px;">
                <thead>
                    <tr style="background:#f2f2f2;">
                        <th style="padding:8px; border:1px solid #ddd;">Операция</th>
                        <th style="padding:8px; border:1px solid #ddd;">Тип</th>
                        <th style="padding:8px; border:1px solid #ddd;">Дата</th>
                        <th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>
                        <th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>
                        <th style="padding:8px; border:1px solid #ddd; text-align:right;">Ср. цена, ₽</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        operationsData.data.forEach(item => {
            html += `
                <tr>
                    <td style="padding:8px; border:1px solid #ddd;">${item.operation}</td>
                    <td style="padding:8px; border:1px solid #ddd;">${item.type}</td>
                    <td style="padding:8px; border:1px solid #ddd;">${item.date}</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)} ${item.unit}</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.price)}</td>
                </tr>
            `;
        });
    } else {
        // Полная детализация
        html += `
            <table style="width:100%; border-collapse:collapse; margin-top:10px;">
                <thead>
                    <tr style="background:#f2f2f2;">
                        <th style="padding:8px; border:1px solid #ddd;">Операция</th>
                        <th style="padding:8px; border:1px solid #ddd;">Товар</th>
                        <th style="padding:8px; border:1px solid #ddd;">Ед.</th>
                        <th style="padding:8px; border:1px solid #ddd;">Дата</th>
                        <th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>
                        <th style="padding:8px; border:1px solid #ddd; text-align:right;">Цена, ₽</th>
                        <th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        operationsData.data.forEach(item => {
            html += `
                <tr>
                    <td style="padding:8px; border:1px solid #ddd;">${item.operation}</td>
                    <td style="padding:8px; border:1px solid #ddd;">${item.product}</td>
                    <td style="padding:8px; border:1px solid #ddd;">${item.unit}</td>
                    <td style="padding:8px; border:1px solid #ddd;">${item.date}</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.price)}</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>
                </tr>
            `;
        });
    }
    
    html += `
            </tbody>
            <tfoot>
                <tr style="background:#e8f5e8; font-weight:bold;">
                    <td style="padding:8px; border:1px solid #ddd;" colspan="${operationsData.printTotalsOnly ? '3' : '4'}">Итого:</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(operationsData.totals.quantity)} ${operationsData.printTotalsOnly ? 'шт' : ''}</td>
    `;
    
    if (operationsData.printTotalsOnly) {
        html += `
                    <td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(operationsData.totals.amount)}</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(operationsData.totals.amount / operationsData.totals.quantity)}</td>
        `;
    } else {
        html += `
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">-</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(operationsData.totals.amount)}</td>
        `;
    }
    
    html += `
                </tr>
            </tfoot>
        </table>
        
        <div style="margin-top:15px; padding:10px; background:#e8f5e8; border-radius:5px;">
            <p style="margin:0; color:#27ae60;"><i class="fas fa-check-circle"></i> Операции выполнены успешно</p>
            <p style="margin:5px 0 0 0; font-size:12px;">Выполнено операций: ${operationsData.totals.operations}</p>
        </div>
    `;
    
    document.getElementById('operationResultContent').innerHTML = html;
    document.getElementById('operationLoading').style.display = 'none';
    document.getElementById('operationResult').style.display = 'block';
}

// Выполнить выгрузку операций в нужном формате
function executeOperationsExport(format, operationsData) {
    // Подготовка данных для выгрузки
    let fileContent = '\uFEFF'; // UTF-8 BOM
    
    fileContent += 'ХОЗЯЙСТВЕННЫЕ ОПЕРАЦИИ\r\n\r\n';
    fileContent += `Подразделение: ${operationsData.divisionInfo}\r\n`;
    fileContent += `Период: ${operationsData.period}\r\n`;
    fileContent += `Операции: ${operationsData.operationNumbers}\r\n`;
    fileContent += `Товары: ${operationsData.productType}\r\n`;
    fileContent += `Режим: ${operationsData.printTotalsOnly ? 'Только итоги' : 'Полная детализация'}\r\n\r\n`;
    
    // Заголовки столбцов
    let headers = '';
    if (operationsData.printTotalsOnly) {
        headers = 'Операция;Тип;Дата;Количество;Сумма, ₽;Средняя цена, ₽\r\n';
    } else {
        headers = 'Операция;Товар;Ед.изм.;Дата;Количество;Цена, ₽;Сумма, ₽\r\n';
    }
    
    fileContent += headers;
    
    // Данные
    operationsData.data.forEach(item => {
        if (operationsData.printTotalsOnly) {
            fileContent += `${item.operation};${item.type};${item.date};${item.quantity} ${item.unit};${formatNumber(item.amount)};${formatNumber(item.price)}\r\n`;
        } else {
            fileContent += `${item.operation};${item.product};${item.unit};${item.date};${item.quantity};${formatNumber(item.price)};${formatNumber(item.amount)}\r\n`;
        }
    });
    
    fileContent += `\r\nИтого;${operationsData.totals.quantity};${formatNumber(operationsData.totals.amount)}\r\n\r\n`;
    fileContent += `Сформировано: ${new Date().toLocaleString('ru-RU')}\r\n`;
    fileContent += 'Система управления инвентаризацией - Кировский';
    
    // Создание файла
    let mimeType, fileExt;
    
    if (format === 'excel') {
        mimeType = 'text/csv;charset=utf-8';
        fileExt = 'csv';
    } else if (format === 'wordpad') {
        // Для WordPad - текстовый файл с табуляцией
        let txtContent = 'ХОЗЯЙСТВЕННЫЕ ОПЕРАЦИИ\n\n';
        txtContent += `Подразделение: ${operationsData.divisionInfo}\n`;
        txtContent += `Период: ${operationsData.period}\n`;
        txtContent += `Операции: ${operationsData.operationNumbers}\n`;
        txtContent += `Товары: ${operationsData.productType}\n`;
        txtContent += `Режим: ${operationsData.printTotalsOnly ? 'Только итоги' : 'Полная детализация'}\n\n`;
        
        // Данные с табуляцией
        if (operationsData.printTotalsOnly) {
            txtContent += 'Операция\tТип\tДата\tКоличество\tСумма, ₽\tСредняя цена, ₽\n';
            operationsData.data.forEach(item => {
                txtContent += `${item.operation}\t${item.type}\t${item.date}\t${item.quantity} ${item.unit}\t${formatNumber(item.amount)}\t${formatNumber(item.price)}\n`;
            });
        } else {
            txtContent += 'Операция\tТовар\tЕд.изм.\tДата\tКоличество\tЦена, ₽\tСумма, ₽\n';
            operationsData.data.forEach(item => {
                txtContent += `${item.operation}\t${item.product}\t${item.unit}\t${item.date}\t${item.quantity}\t${formatNumber(item.price)}\t${formatNumber(item.amount)}\n`;
            });
        }
        
        txtContent += `\nИтого:\t${operationsData.totals.quantity}\t${formatNumber(operationsData.totals.amount)}\n\n`;
        txtContent += `Сформировано: ${new Date().toLocaleString('ru-RU')}\n`;
        txtContent += 'Система управления инвентаризацией - Кировский';
        
        fileContent = txtContent;
        mimeType = 'text/plain;charset=utf-8';
        fileExt = 'txt';
    }
    
    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // Формируем имя файла
    let fileName = 'Хоз_операции_';
    if (operationsData.divisionInfo.includes('Магазин')) {
        fileName += operationsData.divisionInfo.replace('Магазин №', 'Магазин');
    } else {
        fileName += operationsData.divisionInfo.replace(/\s+/g, '_');
    }
    fileName += '_' + operationsData.period.replace(/\s+/g, '_').replace(/-/g, '_');
    fileName += '.' + fileExt;
    
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Сброс состояния модального окна операций
function resetExecuteOperationsModal() {
    document.getElementById('confirmExecuteOperations').disabled = false;
    document.getElementById('cancelExecuteOperations').disabled = false;
    document.getElementById('operationLoading').style.display = 'none';
    document.getElementById('operationResult').style.display = 'none';
    document.getElementById('operationProgressBar').style.width = '0%';
}

// Закрытие по крестику
document.querySelector('#executeOperationsModal .close').addEventListener('click', function() {
    document.getElementById('executeOperationsModal').style.display = 'none';
    resetExecuteOperationsModal();
});

// Закрытие по клику вне окна
window.addEventListener('click', function(e) {
    if (e.target.id === 'executeOperationsModal') {
        document.getElementById('executeOperationsModal').style.display = 'none';
        resetExecuteOperationsModal();
    }
});
            
            // Инициализация модального окна загрузки естественной убыли
            document.getElementById('uploadNaturalLossBtn').addEventListener('click', function() {
                document.getElementById('uploadNaturalLossModal').style.display = 'flex';
                // Установка текущей даты по умолчанию
                document.getElementById('lossStartDate').valueAsDate = new Date();
                document.getElementById('lossEndDate').valueAsDate = new Date();
            });
            
            document.getElementById('lossPeriod').addEventListener('change', function() {
                const customRange = document.getElementById('customLossPeriod');
                if (this.value === 'custom') {
                    customRange.style.display = 'block';
                } else {
                    customRange.style.display = 'none';
                }
            });
            
            document.getElementById('cancelUploadNaturalLoss').addEventListener('click', function() {
                document.getElementById('uploadNaturalLossModal').style.display = 'none';
            });
            
            document.getElementById('confirmUploadNaturalLoss').addEventListener('click', function() {
                const period = document.getElementById('lossPeriod').value;
                const file = document.getElementById('lossFile').files[0];
                const overwrite = document.getElementById('lossOverwrite').checked;
                
                if (!file) {
                    showAlert('Выберите файл для загрузки', 'warning');
                    return;
                }
                
                let startDate, endDate;
                
                if (period === 'custom') {
                    startDate = document.getElementById('lossStartDate').value;
                    endDate = document.getElementById('lossEndDate').value;
                } else {
                    const today = new Date();
                    startDate = formatDate(today);
                    endDate = formatDate(today);
                    
                    if (period === 'month') {
                        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                        startDate = formatDate(firstDay);
                        endDate = formatDate(today);
                    } else if (period === 'quarter') {
                        const quarter = Math.floor(today.getMonth() / 3);
                        const firstDay = new Date(today.getFullYear(), quarter * 3, 1);
                        startDate = formatDate(firstDay);
                        endDate = formatDate(today);
                    } else if (period === 'year') {
                        const firstDay = new Date(today.getFullYear(), 0, 1);
                        startDate = formatDate(firstDay);
                        endDate = formatDate(today);
                    }
                }
                
                document.getElementById('uploadNaturalLossModal').style.display = 'none';
                showAlert(`Загрузка данных по естественной убыли за период с ${startDate} по ${endDate} из файла ${file.name} начата`, 'info');
                
                // В реальном приложении здесь будет вызов API для загрузки данных
                setTimeout(() => {
                    showAlert(`Данные по естественной убыли успешно загружены`, 'success');
                }, 2000);
            });
            
            // Инициализация модального окна работы с отходами
            document.getElementById('wasteBtn').addEventListener('click', function() {
                document.getElementById('wasteModal').style.display = 'flex';
                // Установка текущей даты по умолчанию
                document.getElementById('wasteDate').valueAsDate = new Date();
            });
            
            document.getElementById('wasteAction').addEventListener('change', function() {
                const action = this.value;
                const reasonContainer = document.getElementById('wasteReasonContainer');
                const formatContainer = document.getElementById('wasteFormatContainer');
                const typeContainer = document.getElementById('wasteTypeContainer');
                
                if (action === 'report') {
                    formatContainer.style.display = 'block';
                    reasonContainer.style.display = 'none';
                    typeContainer.style.display = 'block';
                } else {
                    formatContainer.style.display = 'none';
                    reasonContainer.style.display = 'block';
                    typeContainer.style.display = 'none';
                }
            });
            
            document.getElementById('cancelWaste').addEventListener('click', function() {
                document.getElementById('wasteModal').style.display = 'none';
            });
            
            document.getElementById('confirmWaste').addEventListener('click', function() {
                const action = document.getElementById('wasteAction').value;
                const date = document.getElementById('wasteDate').value;
                const shop = document.getElementById('wasteShop').value;
                const type = document.getElementById('wasteType').value;
                const format = document.getElementById('wasteFormat').value;
                const reason = document.getElementById('wasteReason').value;
                
                document.getElementById('wasteModal').style.display = 'none';
                
                if (action === 'report') {
                    showAlert(`Формирование отчета по отходам на ${date} (тип: ${type}) для магазина ${shop || 'всех магазинов'} в формате ${format.toUpperCase()} начато`, 'info');
                    
                    // В реальном приложении здесь будет вызов API для формирования отчета
                    setTimeout(() => {
                        showAlert(`Отчет по отходам успешно сформирован`, 'success');
                    }, 2000);
                } else if (action === 'register') {
                    showAlert(`Регистрация отходов на ${date} для магазина ${shop || 'всех магазинов'} (Название: ${reason}) начата`, 'info');
                    
                    // В реальном приложении здесь будет вызов API для регистрации отходов
                    setTimeout(() => {
                        showAlert(`Отходы успешно зарегистрированы`, 'success');
                    }, 2000);
                } else if (action === 'writeoff') {
                    showAlert(`Списание отходов на ${date} для магазина ${shop || 'всех магазинов'} (Название: ${reason}) начато`, 'info');
                    
                    // В реальном приложении здесь будет вызов API для списания отходов
                    setTimeout(() => {
                        showAlert(`Отходы успешно списаны`, 'success');
                    }, 2000);
                }
            });
        }

        // Инициализация экрана входа
        function initLogin() {
            const loginForm = document.getElementById('loginForm');
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const errorElement = document.getElementById('loginError');
                
                if (username === 'admin' && password === 'admin') {
                    appData.currentUser = {
                        name: "Системный администратор",
                        role: "admin",
                        login: username
                    };
                    
                    document.getElementById('loginScreen').style.display = 'none';
                    document.getElementById('shopSelectScreen').style.display = 'flex';
                    errorElement.style.display = 'none';
                } else {
                    errorElement.style.display = 'block';
                }
            });
        }
		
		// Генерация данных о выручке
function generateRevenueData(startDate, endDate, groupBy) {
    console.log('generateRevenueData вызвана:', { startDate, endDate, groupBy });
    
    const data = [];
    let totalRevenue = 0;
    
    if (groupBy === 'day') {
        // Группировка по дням
        const currentDate = new Date(startDate);
        
        while (currentDate <= endDate) {
            // Генерируем случайную выручку от 50,000 до 500,000 за день
            const dailyRevenue = Math.floor(Math.random() * 450001) + 50000;
            totalRevenue += dailyRevenue;
            
            data.push({
                period: formatDate(currentDate),
                revenue: dailyRevenue,
                type: 'day'
            });
            
            // Переходим к следующему дню
            currentDate.setDate(currentDate.getDate() + 1);
        }
    } else if (groupBy === 'week') {
        // Группировка по неделям
        let weekStart = new Date(startDate);
        let weekNumber = 1;
        
        while (weekStart <= endDate) {
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            
            if (weekEnd > endDate) {
                weekEnd.setTime(endDate.getTime());
            }
            
            // Генерируем случайную выручку от 350,000 до 3,500,000 за неделю
            const weeklyRevenue = Math.floor(Math.random() * 3150001) + 350000;
            totalRevenue += weeklyRevenue;
            
            data.push({
                period: `Неделя ${weekNumber} (${formatDate(weekStart)} - ${formatDate(weekEnd)})`,
                revenue: weeklyRevenue,
                type: 'week'
            });
            
            // Переходим к следующей неделе
            weekStart.setDate(weekStart.getDate() + 7);
            weekNumber++;
        }
    } else if (groupBy === 'month') {
        // Группировка по месяцам
        let monthStart = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        
        while (monthStart <= endDate) {
            const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
            
            if (monthEnd > endDate) {
                monthEnd.setTime(endDate.getTime());
            }
            
            const monthNames = [
                'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
            ];
            
            // Генерируем случайную выручку от 1,500,000 до 15,000,000 за месяц
            const monthlyRevenue = Math.floor(Math.random() * 13500001) + 1500000;
            totalRevenue += monthlyRevenue;
            
            data.push({
                period: `${monthNames[monthStart.getMonth()]} ${monthStart.getFullYear()}`,
                revenue: monthlyRevenue,
                type: 'month'
            });
            
            // Переходим к следующему месяцу
            monthStart.setMonth(monthStart.getMonth() + 1);
        }
    }
    
    console.log('Сгенерировано данных:', data.length, 'записей, общая сумма:', totalRevenue);
    
    return {
        data: data,
        total: totalRevenue,
        groupBy: groupBy,
        startDate: startDate,
        endDate: endDate
    };
}

// Показать результат выручки на экране
function showRevenueResult(startDate, endDate, groupBy, revenueData, format) {
    console.log('showRevenueResult вызвана:', { startDate, endDate, groupBy, revenueData, format });
    
    const formattedStart = formatInputDate(startDate.toISOString().split('T')[0]);
    const formattedEnd = formatInputDate(endDate.toISOString().split('T')[0]);
    
    let resultHTML = `
        <p><strong>Период:</strong> с ${formattedStart} по ${formattedEnd}</p>
        <p><strong>Группировка:</strong> ${getGroupByName(groupBy)}</p>
        <p><strong>Магазин:</strong> ${appData.currentShop ? appData.currentShop.name : 'Не выбран'} (№${appData.currentShop ? appData.currentShop.id : 'N/A'})</p>
        <hr>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Период</th>
                    <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Выручка, ₽</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    revenueData.data.forEach(item => {
        resultHTML += `
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.period}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold;">${formatNumber(item.revenue)}</td>
            </tr>
        `;
    });
    
    resultHTML += `
            </tbody>
            <tfoot>
                <tr style="background-color: #e8f5e8; font-weight: bold;">
                    <td style="padding: 8px; border: 1px solid #ddd;">Итого:</td>
                    <td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: #27ae60;">${formatNumber(revenueData.total)}</td>
                </tr>
            </tfoot>
        </table>
        
        <div style="margin-top: 15px; padding: 10px; background-color: #e8f5e8; border-radius: 3px;">
            <p style="margin: 0; color: #27ae60;"><i class="fas fa-check-circle"></i> Выгрузка успешно завершена</p>
            <p style="margin: 5px 0 0 0; font-size: 12px;">Формат: ${getFormatName(format)}</p>
        </div>
    `;
    
    document.getElementById('revenueResultContent').innerHTML = resultHTML;
    document.getElementById('revenueResult').style.display = 'block';
    console.log('Результат отображен на экране');
}

// Печать данных о выручке
function printRevenueData(startDate, endDate, groupBy, revenueData) {
    const formattedStart = formatInputDate(startDate.toISOString().split('T')[0]);
    const formattedEnd = formatInputDate(endDate.toISOString().split('T')[0]);
    const shopName = appData.currentShop ? appData.currentShop.name : 'Не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let tableRows = '';
    revenueData.data.forEach(item => {
        tableRows += `
            <tr>
                <td>${item.period}</td>
                <td style="text-align: right;">${formatNumber(item.revenue)}</td>
            </tr>
        `;
    });
    
    const printContent = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Отчет по выручке</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                ...header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                ...report-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                ...report-info {
                    font-size: 14px;
                    margin-bottom: 5px;
                }
                ...data-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                ...data-table th, .data-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                ...data-table th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                ...data-table td:nth-child(2) {
                    text-align: right;
                }
                ...total-row {
                    font-weight: bold;
                    background-color: #f8f8f8;
                }
                ...footer {
                    margin-top: 30px;
                    font-size: 12px;
                    color: #888;
                    text-align: center;
                }
                @media print {
                    body { margin: 0; }
                    ...no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="report-title">ОТЧЕТ ПО ВЫРУЧКЕ</div>
                <div class="report-info">Магазин: ${shopName} (№${shopId})</div>
                <div class="report-info">Период: с ${formattedStart} по ${formattedEnd}</div>
                <div class="report-info">Группировка: ${getGroupByName(groupBy)}</div>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Период</th>
                        <th>Выручка, ₽</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                    <tr class="total-row">
                        <td>Итого:</td>
                        <td>${formatNumber(revenueData.total)}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="footer">
                <p>Сформировано: ${new Date().toLocaleString('ru-RU')}</p>
                <p>Система управления инвентаризацией - Кировский</p>
            </div>
            
            <div class="no-print" style="margin-top: 20px; text-align: center;">
                <button onclick="window.print()" style="padding: 10px 20px; background-color: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Печать
                </button>
            </div>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
}

// Выгрузка в Word
function exportRevenueToWord(startDate, endDate, groupBy, revenueData) {
    const formattedStart = formatInputDate(startDate.toISOString().split('T')[0]);
    const formattedEnd = formatInputDate(endDate.toISOString().split('T')[0]);
    const shopName = appData.currentShop ? appData.currentShop.name : 'Не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    const now = new Date().toLocaleString('ru-RU');
    
    // Создаем HTML содержимое для Word
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Отчет по выручке</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 2cm; }
                h1 { text-align: center; color: #2c3e50; }
                ...info { margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                ...total { font-weight: bold; background-color: #e8f5e8; }
                ...footer { margin-top: 40px; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <h1>ОТЧЕТ ПО ВЫРУЧКЕ</h1>
            
            <div class="info">
                <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
                <p><strong>Период:</strong> с ${formattedStart} по ${formattedEnd}</p>
                <p><strong>Группировка:</strong> ${getGroupByName(groupBy)}</p>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Период</th>
                        <th>Выручка, ₽</th>
                    </tr>
                </thead>
                <tbody>
                    ${revenueData.data.map(item => `
                        <tr>
                            <td>${item.period}</td>
                            <td>${formatNumber(item.revenue)}</td>
                        </tr>
                    `).join('')}
                    <tr class="total">
                        <td>Итого:</td>
                        <td>${formatNumber(revenueData.total)}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="footer">
                <p>Сформировано: ${now}</p>
                <p>Система управления инвентаризацией - Кировский</p>
            </div>
        </body>
        </html>
    `;
    
    // Создаем Blob с HTML содержимым
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    
    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    const fileName = `Отчет_по_выручке_${shopId}_${formattedStart.replace(/\//g, '-')}_${formattedEnd.replace(/\//g, '-')}.doc`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Очищаем
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Выгрузка в Excel (XML формат)
function exportRevenueToExcel(startDate, endDate, groupBy, revenueData) {
    const formattedStart = formatInputDate(startDate.toISOString().split('T')[0]);
    const formattedEnd = formatInputDate(endDate.toISOString().split('T')[0]);
    const shopName = appData.currentShop ? appData.currentShop.name : 'Не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    const now = new Date().toLocaleString('ru-RU');
    
    // Создаем XML для Excel
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Author>Система управления инвентаризацией</Author>
  <Created>${new Date().toISOString()}</Created>
 </DocumentProperties>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Bottom"/>
   <Borders/>
   <Font ss:FontName="Arial" ss:Size="12"/>
   <Interior/>
   <NumberFormat ss:Format="#,##0.00"/>
  </Style>
  <Style ss:ID="Header">
   <Font ss:FontName="Arial" ss:Size="14" ss:Bold="1"/>
   <Alignment ss:Horizontal="Center"/>
  </Style>
  <Style ss:ID="Title">
   <Font ss:FontName="Arial" ss:Size="16" ss:Bold="1"/>
   <Alignment ss:Horizontal="Center"/>
  </Style>
  <Style ss:ID="Total">
   <Font ss:FontName="Arial" ss:Size="12" ss:Bold="1"/>
   <Interior ss:Color="#E6E6E6" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="Currency">
   <NumberFormat ss:Format="#,##0.00\ &quot;₽&quot;"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Отчет по выручке">
  <Table>
   <Column ss:Width="200"/>
   <Column ss:Width="150"/>
   
   <Row>
    <Cell ss:MergeAcross="1" ss:StyleID="Title">
     <Data ss:Type="String">ОТЧЕТ ПО ВЫРУЧКЕ</Data>
    </Cell>
   </Row>
   <Row>
    <Cell><Data ss:Type="String">Магазин:</Data></Cell>
    <Cell><Data ss:Type="String">${shopName} (№${shopId})</Data></Cell>
   </Row>
   <Row>
    <Cell><Data ss:Type="String">Период:</Data></Cell>
    <Cell><Data ss:Type="String">с ${formattedStart} по ${formattedEnd}</Data></Cell>
   </Row>
   <Row>
    <Cell><Data ss:Type="String">Группировка:</Data></Cell>
    <Cell><Data ss:Type="String">${getGroupByName(groupBy)}</Data></Cell>
   </Row>
   <Row></Row>
   
   <Row>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Период</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Выручка, ₽</Data></Cell>
   </Row>
   
   ${revenueData.data.map(item => `
   <Row>
    <Cell><Data ss:Type="String">${item.period}</Data></Cell>
    <Cell ss:StyleID="Currency"><Data ss:Type="Number">${item.revenue}</Data></Cell>
   </Row>
   `).join('')}
   
   <Row>
    <Cell ss:StyleID="Total"><Data ss:Type="String">Итого:</Data></Cell>
    <Cell ss:StyleID="Total" ss:StyleID="Currency"><Data ss:Type="Number">${revenueData.total}</Data></Cell>
   </Row>
   
   <Row></Row>
   <Row>
    <Cell ss:MergeAcross="1">
     <Data ss:Type="String">Сформировано: ${now}</Data>
    </Cell>
   </Row>
   <Row>
    <Cell ss:MergeAcross="1">
     <Data ss:Type="String">Система управления инвентаризацией - Кировский</Data>
    </Cell>
   </Row>
  </Table>
 </Worksheet>
</Workbook>`;
    
    // Создаем Blob с XML содержимым
    const blob = new Blob([xmlContent], { 
        type: 'application/vnd.ms-excel' 
    });
    const url = URL.createObjectURL(blob);
    
    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    const fileName = `Отчет_по_выручке_${shopId}_${formattedStart.replace(/\//g, '-')}_${formattedEnd.replace(/\//g, '-')}.xls`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Очищаем
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Получить название группировки
function getGroupByName(groupBy) {
    const groups = {
        'day': 'По дням',
        'week': 'По неделям',
        'month': 'По месяцам'
    };
    return groups[groupBy] || groupBy;
}

// Получить название формата
function getFormatName(format) {
    const formats = {
        'screen': 'Вывод на экран',
        'print': 'На печать',
        'word': 'Выгрузка в Word',
        'excel': 'Выгрузка в Excel'
    };
    return formats[format] || format;
}

// Печать данных о выручке
function printRevenueData(startDate, endDate, groupBy, revenueData) {
    const formattedStart = formatInputDate(startDate.toISOString().split('T')[0]);
    const formattedEnd = formatInputDate(endDate.toISOString().split('T')[0]);
    const shopName = appData.currentShop ? appData.currentShop.name : 'Не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let tableRows = '';
    revenueData.data.forEach(item => {
        tableRows += `
            <tr>
                <td>${item.period}</td>
                <td style="text-align: right;">${formatNumber(item.revenue)}</td>
            </tr>
        `;
    });
    
    const printContent = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Отчет по выручке</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                ...header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                ...report-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                ...report-info {
                    font-size: 14px;
                    margin-bottom: 5px;
                }
                ...data-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                ...data-table th, .data-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                ...data-table th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                ...data-table td:nth-child(2) {
                    text-align: right;
                }
                ...total-row {
                    font-weight: bold;
                    background-color: #f8f8f8;
                }
                ...footer {
                    margin-top: 30px;
                    font-size: 12px;
                    color: #888;
                    text-align: center;
                }
                @media print {
                    body { margin: 0; }
                    ...no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="report-title">ОТЧЕТ ПО ВЫРУЧКЕ</div>
                <div class="report-info">Магазин: ${shopName} (№${shopId})</div>
                <div class="report-info">Период: с ${formattedStart} по ${formattedEnd}</div>
                <div class="report-info">Группировка: ${getGroupByName(groupBy)}</div>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Период</th>
                        <th>Выручка, ₽</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                    <tr class="total-row">
                        <td>Итого:</td>
                        <td>${formatNumber(revenueData.total)}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="footer">
                Сформировано: ${new Date().toLocaleString('ru-RU')}<br>
                Система управления инвентаризацией - Кировский
            </div>
            
            <div class="no-print" style="margin-top: 20px; text-align: center;">
                <button onclick="window.print()" style="padding: 10px 20px; background-color: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Печать
                </button>
            </div>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
}

// Функция сброса состояния модального окна выручки
function resetExportRevenueModal() {
    document.getElementById('confirmExportRevenue').disabled = false;
    document.getElementById('cancelExportRevenue').disabled = false;
    document.getElementById('revenueLoading').style.display = 'none';
    document.getElementById('revenueResult').style.display = 'none';
    document.getElementById('revenueProgressBar').style.width = '0%';
    document.getElementById('revenueResultContent').innerHTML = '';
}

// Обработчик закрытия модального окна через крестик
document.querySelector('#exportRevenueModal .close').addEventListener('click', function() {
    document.getElementById('exportRevenueModal').style.display = 'none';
    resetExportRevenueModal();
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    const modal = document.getElementById('exportRevenueModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        resetExportRevenueModal();
    }
});

// Обработчик закрытия модального окна через крестик
document.querySelector('#exportRevenueModal .close').addEventListener('click', function() {
    document.getElementById('exportRevenueModal').style.display = 'none';
    resetExportRevenueModal();
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    const modal = document.getElementById('exportRevenueModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        resetExportRevenueModal();
    }
});

// Выгрузка в Word
function exportRevenueToWord(startDate, endDate, groupBy, revenueData) {
    const formattedStart = formatInputDate(startDate.toISOString().split('T')[0]);
    const formattedEnd = formatInputDate(endDate.toISOString().split('T')[0]);
    const shopName = appData.currentShop ? appData.currentShop.name : 'Не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    const now = new Date().toLocaleString('ru-RU');
    
    // Создаем HTML содержимое для Word
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Отчет по выручке</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 2cm; }
                h1 { text-align: center; color: #2c3e50; }
                ...info { margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                ...total { font-weight: bold; background-color: #e8f5e8; }
                ...footer { margin-top: 40px; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <h1>ОТЧЕТ ПО ВЫРУЧКЕ</h1>
            
            <div class="info">
                <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
                <p><strong>Период:</strong> с ${formattedStart} по ${formattedEnd}</p>
                <p><strong>Группировка:</strong> ${getGroupByName(groupBy)}</p>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Период</th>
                        <th>Выручка, ₽</th>
                    </tr>
                </thead>
                <tbody>
                    ${revenueData.data.map(item => `
                        <tr>
                            <td>${item.period}</td>
                            <td>${formatNumber(item.revenue)}</td>
                        </tr>
                    `).join('')}
                    <tr class="total">
                        <td>Итого:</td>
                        <td>${formatNumber(revenueData.total)}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="footer">
                <p>Сформировано: ${now}</p>
                <p>Система управления инвентаризацией - Кировский</p>
            </div>
        </body>
        </html>
    `;
    
    // Создаем Blob с HTML содержимым
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    
    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    const fileName = `Отчет_по_выручке_${shopId}_${formattedStart.replace(/\//g, '-')}_${formattedEnd.replace(/\//g, '-')}.doc`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Очищаем
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Выгрузка в Excel (XML формат)
function exportRevenueToExcel(startDate, endDate, groupBy, revenueData) {
    const formattedStart = formatInputDate(startDate.toISOString().split('T')[0]);
    const formattedEnd = formatInputDate(endDate.toISOString().split('T')[0]);
    const shopName = appData.currentShop ? appData.currentShop.name : 'Не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    const now = new Date().toLocaleString('ru-RU');
    
    // Создаем XML для Excel
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Author>Система управления инвентаризацией</Author>
  <Created>${new Date().toISOString()}</Created>
 </DocumentProperties>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Bottom"/>
   <Borders/>
   <Font ss:FontName="Arial" ss:Size="12"/>
   <Interior/>
   <NumberFormat ss:Format="#,##0.00"/>
  </Style>
  <Style ss:ID="Header">
   <Font ss:FontName="Arial" ss:Size="14" ss:Bold="1"/>
   <Alignment ss:Horizontal="Center"/>
  </Style>
  <Style ss:ID="Title">
   <Font ss:FontName="Arial" ss:Size="16" ss:Bold="1"/>
   <Alignment ss:Horizontal="Center"/>
  </Style>
  <Style ss:ID="Total">
   <Font ss:FontName="Arial" ss:Size="12" ss:Bold="1"/>
   <Interior ss:Color="#E6E6E6" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="Currency">
   <NumberFormat ss:Format="#,##0.00\ &quot;₽&quot;"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Отчет по выручке">
  <Table>
   <Column ss:Width="200"/>
   <Column ss:Width="150"/>
   
   <Row>
    <Cell ss:MergeAcross="1" ss:StyleID="Title">
     <Data ss:Type="String">ОТЧЕТ ПО ВЫРУЧКЕ</Data>
    </Cell>
   </Row>
   <Row>
    <Cell><Data ss:Type="String">Магазин:</Data></Cell>
    <Cell><Data ss:Type="String">${shopName} (№${shopId})</Data></Cell>
   </Row>
   <Row>
    <Cell><Data ss:Type="String">Период:</Data></Cell>
    <Cell><Data ss:Type="String">с ${formattedStart} по ${formattedEnd}</Data></Cell>
   </Row>
   <Row>
    <Cell><Data ss:Type="String">Группировка:</Data></Cell>
    <Cell><Data ss:Type="String">${getGroupByName(groupBy)}</Data></Cell>
   </Row>
   <Row></Row>
   
   <Row>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Период</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Выручка, ₽</Data></Cell>
   </Row>
   
   ${revenueData.data.map(item => `
   <Row>
    <Cell><Data ss:Type="String">${item.period}</Data></Cell>
    <Cell ss:StyleID="Currency"><Data ss:Type="Number">${item.revenue}</Data></Cell>
   </Row>
   `).join('')}
   
   <Row>
    <Cell ss:StyleID="Total"><Data ss:Type="String">Итого:</Data></Cell>
    <Cell ss:StyleID="Total" ss:StyleID="Currency"><Data ss:Type="Number">${revenueData.total}</Data></Cell>
   </Row>
   
   <Row></Row>
   <Row>
    <Cell ss:MergeAcross="1">
     <Data ss:Type="String">Сформировано: ${now}</Data>
    </Cell>
   </Row>
   <Row>
    <Cell ss:MergeAcross="1">
     <Data ss:Type="String">Система управления инвентаризацией - Кировский</Data>
    </Cell>
   </Row>
  </Table>
 </Worksheet>
</Workbook>`;
    
    // Создаем Blob с XML содержимым
    const blob = new Blob([xmlContent], { 
        type: 'application/vnd.ms-excel' 
    });
    const url = URL.createObjectURL(blob);
    
    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    const fileName = `Отчет_по_выручке_${shopId}_${formattedStart.replace(/\//g, '-')}_${formattedEnd.replace(/\//g, '-')}.xls`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Очищаем
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Получить название группировки
function getGroupByName(groupBy) {
    const groups = {
        'day': 'По дням',
        'week': 'По неделям',
        'month': 'По месяцам'
    };
    return groups[groupBy] || groupBy;
}



function getProductsByInventoryType(inventoryType) {
    console.log('Получение товаров для типа инвентаризации:', inventoryType);
    
    const allProducts = [
        // Алкоголь (type: 'alcohol')
        { barcode: '4601234567897', name: 'Водка Русская 0.5л 40%', category: 'Крепкий алкоголь', group: 'Водка', price: 450.00, type: 'alcohol' },
        { barcode: '4601234567898', name: 'Коньяк Армянский 5* 0.5л', category: 'Крепкий алкоголь', group: 'Коньяк', price: 1200.00, type: 'alcohol' },
        { barcode: '4601234567899', name: 'Вино красное сухое 0.75л', category: 'Вино', group: 'Красное вино', price: 350.00, type: 'alcohol' },
        { barcode: '4601234567900', name: 'Вино белое полусладкое 0.75л', category: 'Вино', group: 'Белое вино', price: 320.00, type: 'alcohol' },
        { barcode: '4601234567901', name: 'Шампанское Советское полусладкое 0.75л', category: 'Игристые вина', group: 'Шампанское', price: 450.00, type: 'alcohol' },
        { barcode: '4601234567902', name: 'Виски Jack Daniels 0.7л', category: 'Крепкий алкоголь', group: 'Виски', price: 2500.00, type: 'alcohol' },
        
        // Пиво (type: 'beer')
        { barcode: '4601234567906', name: 'Пиво Жигулёвское 0.5л', category: 'Пиво светлое', group: 'Светлое пиво', price: 85.00, type: 'beer' },
        { barcode: '4601234567907', name: 'Пиво Балтика 9 0.5л', category: 'Пиво крепкое', group: 'Крепкое пиво', price: 95.00, type: 'beer' },
        { barcode: '4601234567908', name: 'Пиво Сибирская корона 0.5л', category: 'Пиво светлое', group: 'Светлое пиво', price: 90.00, type: 'beer' },
        { barcode: '4601234567910', name: 'Пиво Тинькофф 0.45л', category: 'Пиво светлое', group: 'Премиум пиво', price: 120.00, type: 'beer' },
        
        // Сигареты (type: 'cigarettes')
        { barcode: '4601234567911', name: 'Сигареты Parliament 20шт', category: 'Легкие сигареты', group: 'Parliament', price: 180.00, type: 'cigarettes' },
        { barcode: '4601234567912', name: 'Сигареты Marlboro 20шт', category: 'Крепкие сигареты', group: 'Marlboro', price: 170.00, type: 'cigarettes' },
        { barcode: '4601234567913', name: 'Сигареты Winston 20шт', category: 'Средние сигареты', group: 'Winston', price: 160.00, type: 'cigarettes' },
        { barcode: '4601234567914', name: 'Сигареты Kent 20шт', category: 'Легкие сигареты', group: 'Kent', price: 175.00, type: 'cigarettes' },
        
        // Общие товары (type: 'general')
        { barcode: '4601234567890', name: 'Молоко Домик в деревне 2.5% 1л', category: 'Молочные продукты', group: 'Молоко', price: 79.90, type: 'general' },
        { barcode: '4601234567891', name: 'Хлеб Бородинский нарезка 400г', category: 'Хлебобулочные изделия', group: 'Хлеб', price: 45.00, type: 'general' },
        { barcode: '4601234567892', name: 'Яйца куриные С1 10шт', category: 'Яйца', group: 'Яйца', price: 120.00, type: 'general' },
        { barcode: '4601234567893', name: 'Пельмени Сибирские 1кг', category: 'Замороженные продукты', group: 'Пельмени', price: 250.00, type: 'general' },
    ];
    
    console.log('Всего товаров в базе:', allProducts.length);
    
    switch(inventoryType) {
        case 'alcohol':
            const alcoholProducts = allProducts.filter(p => p.type === 'alcohol');
            console.log('Алкогольных товаров:', alcoholProducts.length);
            return alcoholProducts;
            
        case 'beer':
            const beerProducts = allProducts.filter(p => p.type === 'beer');
            console.log('Пивных товаров:', beerProducts.length);
            return beerProducts;
            
        case 'cigarettes':
            const cigaretteProducts = allProducts.filter(p => p.type === 'cigarettes');
            console.log('Сигаретных товаров:', cigaretteProducts.length);
            return cigaretteProducts;
            
        case 'general':
            const generalProducts = allProducts.filter(p => p.type === 'general');
            console.log('Общих товаров:', generalProducts.length);
            return generalProducts;
            
        case 'all':
            return allProducts;
            
        default:
            return allProducts;
    }
}

function getProductTypeByBarcode(barcode) {
    if (productData.alcohol.find(p => p.barcode === barcode)) return 'alcohol';
    if (productData.beer.find(p => p.barcode === barcode)) return 'beer';
    if (productData.cigarettes.find(p => p.barcode === barcode)) return 'cigarettes';
    if (productData.general.find(p => p.barcode === barcode)) return 'general';
    return null;
}

// Глобальные переменные
let currentInventoryForPrint = null;

// Данные о товарах с категориями
const productData = {
    alcohol: [
        { barcode: '4601234567897', name: 'Водка Русская 0.5л 40%', category: 'Крепкий алкоголь', group: 'Водка', price: 450.00 },
        { barcode: '4601234567898', name: 'Коньяк Армянский 5* 0.5л', category: 'Крепкий алкоголь', group: 'Коньяк', price: 1200.00 },
        { barcode: '4601234567899', name: 'Вино красное сухое 0.75л', category: 'Вино', group: 'Красное вино', price: 350.00 },
        { barcode: '4601234567900', name: 'Вино белое полусладкое 0.75л', category: 'Вино', group: 'Белое вино', price: 320.00 },
        { barcode: '4601234567901', name: 'Шампанское Советское полусладкое 0.75л', category: 'Игристые вина', group: 'Шампанское', price: 450.00 },
        { barcode: '4601234567902', name: 'Виски Jack Daniel\'s 0.7л', category: 'Крепкий алкоголь', group: 'Виски', price: 2500.00 },
        { barcode: '4601234567915', name: 'Текила Olmeca 0.7л', category: 'Крепкий алкоголь', group: 'Текила', price: 1800.00 },
        { barcode: '4601234567916', name: 'Ром Bacardi 0.7л', category: 'Крепкий алкоголь', group: 'Ром', price: 950.00 },
        { barcode: '4601234567917', name: 'Ликер Baileys 0.7л', category: 'Ликеры', group: 'Ликер', price: 1500.00 },
        { barcode: '4601234567918', name: 'Портвейн 777 0.75л', category: 'Крепленые вина', group: 'Портвейн', price: 280.00 }
    ],
    beer: [
        { barcode: '4601234567906', name: 'Пиво Жигулёвское 0.5л', category: 'Пиво светлое', group: 'Светлое пиво', price: 85.00 },
        { barcode: '4601234567907', name: 'Пиво Балтика 9 0.5л', category: 'Пиво крепкое', group: 'Крепкое пиво', price: 95.00 },
        { barcode: '4601234567908', name: 'Пиво Сибирская корона 0.5л', category: 'Пиво светлое', group: 'Светлое пиво', price: 90.00 },
        { barcode: '4601234567910', name: 'Пиво Тинькофф 0.45л', category: 'Пиво светлое', group: 'Премиум пиво', price: 120.00 },
        { barcode: '4601234567919', name: 'Пиво Heineken 0.5л', category: 'Пиво светлое', group: 'Импортное пиво', price: 150.00 },
        { barcode: '4601234567920', name: 'Пиво Corona Extra 0.355л', category: 'Пиво светлое', group: 'Импортное пиво', price: 180.00 },
        { barcode: '4601234567921', name: 'Пиво Carlsberg 0.5л', category: 'Пиво светлое', group: 'Импортное пиво', price: 110.00 },
        { barcode: '4601234567922', name: 'Пиво Старый мельник 1л', category: 'Пиво светлое', group: 'Разливное пиво', price: 160.00 },
        { barcode: '4601234567923', name: 'Пиво Охота крепкое 0.5л', category: 'Пиво крепкое', group: 'Крепкое пиво', price: 105.00 }
    ],
    cigarettes: [
        { barcode: '4601234567911', name: 'Сигареты Parliament 20шт', category: 'Легкие сигареты', group: 'Parliament', price: 180.00 },
        { barcode: '4601234567912', name: 'Сигареты Marlboro 20шт', category: 'Крепкие сигареты', group: 'Marlboro', price: 170.00 },
        { barcode: '4601234567913', name: 'Сигареты Winston 20шт', category: 'Средние сигареты', group: 'Winston', price: 160.00 },
        { barcode: '4601234567914', name: 'Сигареты Kent 20шт', category: 'Легкие сигареты', group: 'Kent', price: 175.00 },
        { barcode: '4601234567924', name: 'Сигареты Camel 20шт', category: 'Средние сигареты', group: 'Camel', price: 165.00 },
        { barcode: '4601234567925', name: 'Сигареты Chesterfield 20шт', category: 'Крепкие сигареты', group: 'Chesterfield', price: 155.00 },
        { barcode: '4601234567926', name: 'Сигареты Bond 20шт', category: 'Легкие сигареты', group: 'Bond', price: 145.00 },
        { barcode: '4601234567927', name: 'Сигареты LD 20шт', category: 'Средние сигареты', group: 'LD', price: 135.00 }
    ],
    general: [
        { barcode: '4601234567890', name: 'Молоко Домик в деревне 2.5% 1л', category: 'Молочные продукты', group: 'Молоко', price: 79.90 },
        { barcode: '4601234567891', name: 'Хлеб Бородинский нарезка 400г', category: 'Хлебобулочные изделия', group: 'Хлеб', price: 45.00 },
        { barcode: '4601234567892', name: 'Яйца куриные С1 10шт', category: 'Яйца', group: 'Яйца', price: 120.00 },
        { barcode: '4601234567893', name: 'Пельмени Сибирские 1кг', category: 'Замороженные продукты', group: 'Пельмени', price: 250.00 },
        { barcode: '4601234567894', name: 'Мороженое Пломбир 100г', category: 'Замороженные продукты', group: 'Мороженое', price: 65.00 },
        { barcode: '4601234567928', name: 'Сахар песок 1кг', category: 'Бакалея', group: 'Сахар', price: 85.00 },
        { barcode: '4601234567929', name: 'Мука пшеничная 1кг', category: 'Бакалея', group: 'Мука', price: 75.00 },
        { barcode: '4601234567930', name: 'Соль йодированная 1кг', category: 'Бакалея', group: 'Соль', price: 35.00 },
        { barcode: '4601234567931', name: 'Масло подсолнечное 1л', category: 'Масла', group: 'Растительное масло', price: 145.00 },
        { barcode: '4601234567932', name: 'Чай черный 100г', category: 'Бакалея', group: 'Чай', price: 95.00 }
    ]
};


// Получение товаров по типу инвентаризации
function getProductsByInventoryType(inventoryType) {
    switch(inventoryType) {
        case 'alcohol':
            return productData.alcohol;
        case 'beer':
            return productData.beer;
        case 'cigarettes':
            return productData.cigarettes;
        default:
            return productData.general;
    }
}





// Генерация данных для печати
function generatePrintData(inventory, inventoryType, printType) {
    const items = [];
    let totalAmount = 0;
    
    // Получаем товары по типу инвентаризации
    const products = getProductsByInventoryType(inventoryType);
    
    // Генерируем фиктивные данные
    products.forEach(product => {
        const quantity = Math.floor(Math.random() * 50) + 5;
        const amount = quantity * product.price;
        totalAmount += amount;
        
        items.push({
            barcode: product.barcode,
            name: product.name,
            category: product.category,
            group: product.group,
            unit: 'шт',
            quantity: quantity,
            price: product.price,
            amount: amount,
            difference: Math.random() > 0.7 ? -(Math.random() * 5) : 0,
            actualQuantity: quantity + (Math.random() > 0.7 ? -(Math.random() * 5) : 0)
        });
    });
    
    // Если нужно только итоги - группируем данные
    if (printType === 'totals') {
        return generateTotalsData(items);
    }
    
    return {
        items: items,
        totalAmount: totalAmount,
        totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0)
    };
}

// Генерация данных для итогов
function generateTotalsData(items) {
    // Группируем по категориям
    const groups = {};
    
    items.forEach(item => {
        if (!groups[item.category]) {
            groups[item.category] = {
                category: item.category,
                items: [],
                totalQuantity: 0,
                totalAmount: 0
            };
        }
        
        groups[item.category].items.push(item);
        groups[item.category].totalQuantity += item.quantity;
        groups[item.category].totalAmount += item.amount;
    });
    
    return {
        groups: Object.values(groups),
        totalAmount: Object.values(groups).reduce((sum, group) => sum + group.totalAmount, 0),
        totalQuantity: Object.values(groups).reduce((sum, group) => sum + group.totalQuantity, 0)
    };
}

// Добавьте эти вспомогательные функции в начало файла (можно после объявления appData)

// Функция валидации даты
function validateDate(dateInput, fieldName) {
    const date = new Date(dateInput);
    const today = new Date();
    const minDate = new Date('1960-01-01');
    
    if (isNaN(date.getTime())) {
        return `${fieldName}: Некорректная дата`;
    }
    
    if (date < minDate) {
        return `${fieldName}: Дата не может быть раньше 01.01.1960`;
    }
    
    if (date > today) {
        return `${fieldName}: Дата не может быть в будущем`;
    }
    
    return null;
}

// Функция валидации диапазона дат
function validateDateRange(startDateInput, endDateInput, startFieldName, endFieldName) {
    const startError = validateDate(startDateInput, startFieldName);
    if (startError) return startError;
    
    const endError = validateDate(endDateInput, endFieldName);
    if (endError) return endError;
    
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
    
    if (startDate > endDate) {
        return `${startFieldName} не может быть позже ${endFieldName}`;
    }
    
    return null;
}

function validateOperations(operationsString) {
    if (!operationsString.trim()) {
        return "Введите номера операций (через запятую)";
    }
    
    const operations = operationsString.split(',').map(op => op.trim());
    
    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];
        
        // Проверка на пустые значения (две запятые подряд)
        if (op === '') {
            return `После запятой #${i + 1} нет номера операции`;
        }
        
        // Проверка на только цифры
        if (!/^\d+$/.test(op)) {
            return `Операция "${op}": разрешены только цифры (0-9)`;
        }
        
        // Проверка на максимум 3 цифры
        if (op.length > 3) {
            return `Операция "${op}": максимум 3 цифры (1-999)`;
        }
        
        // Проверка на валидное число
        if (op === '0') {
            return `Операция "0": номер операции должен быть от 1 до 999`;
        }
        
        if (op.length > 1 && op.startsWith('0')) {
            return `Операция "${op}": не должно быть ведущих нулей`;
        }
        
        // Проверка диапазона
        const num = parseInt(op, 10);
        if (num < 1 || num > 999) {
            return `Операция "${op}": должен быть в диапазоне 1-999`;
        }
    }
    
    return null;
}

// ================== ВЫГРУЗКА КАСС - ДОБАВЛЯЕМ ВАЛИДАЦИЮ ==================

document.getElementById('confirmExportCash').addEventListener('click', function() {
    const date = document.getElementById('cashDate').value;
    const format = document.getElementById('cashFormat').value;
    
    // Валидация даты
    const dateError = validateDate(date, 'Дата выгрузки');
    if (dateError) {
        showAlert(dateError, 'warning');
        return;
    }
    
    // ... остальной код функции без изменений ...
});

// ================== ВЫГРУЗКА ВЫРУЧКИ - ДОБАВЛЯЕМ ВАЛИДАЦИЮ ==================

document.getElementById('confirmExportRevenue').addEventListener('click', function() {
    const startDateStr = document.getElementById('revenueStartDate').value;
    const endDateStr = document.getElementById('revenueEndDate').value;
    const format = document.getElementById('revenueFormat').value;
    const groupBy = document.getElementById('revenueGroupBy').value;
    
    // Валидация дат
    const dateError = validateDateRange(startDateStr, endDateStr, 'Дата начала', 'Дата окончания');
    if (dateError) {
        showAlert(dateError, 'warning');
        return;
    }
    
    // ... остальной код функции без изменений ...
});

// ================== ВЫГРУЗКА ПРОДАЖ - ДОБАВЛЯЕМ ВАЛИДАЦИЮ ==================

document.getElementById('confirmExportSales').addEventListener('click', function() {
    const periodType = document.getElementById('salesPeriodType').value;
    const singleDate = document.getElementById('salesSingleDate').value;
    const startDateStr = document.getElementById('salesStartDate').value;
    const endDateStr = document.getElementById('salesEndDate').value;
    const format = document.getElementById('salesFormat').value;
    const groupBy1 = document.getElementById('salesGroupBy1').value;
    const groupBy2 = document.getElementById('salesGroupBy2').value;
    const groupBy3 = document.getElementById('salesGroupBy3').value;
    
    let startDate, endDate;
    
    // Определяем даты в зависимости от типа периода
    if (periodType === 'single') {
        if (!singleDate) {
            showAlert('Выберите дату', 'warning');
            return;
        }
        
        // Валидация одной даты
        const dateError = validateDate(singleDate, 'Дата');
        if (dateError) {
            showAlert(dateError, 'warning');
            return;
        }
        
        startDate = new Date(singleDate);
        endDate = new Date(singleDate);
    } else {
        if (!startDateStr || !endDateStr) {
            showAlert('Выберите даты начала и окончания', 'warning');
            return;
        }
        
        // Валидация диапазона дат
        const dateError = validateDateRange(startDateStr, endDateStr, 'Дата начала', 'Дата окончания');
        if (dateError) {
            showAlert(dateError, 'warning');
            return;
        }
        
        startDate = new Date(startDateStr);
        endDate = new Date(endDateStr);
    }
    
    // ... остальной код функции без изменений ...
});

// ================== ВЫГРУЗКА ОСТАТКОВ - ДОБАВЛЯЕМ ВАЛИДАЦИЮ ==================

document.getElementById('confirmExportStock').addEventListener('click', function() {
    const stockDate = document.getElementById('stockDate').value;
    const format = document.getElementById('stockFormat').value;
    const groupBy1 = document.getElementById('stockGroupBy1').value;
    const groupBy2 = document.getElementById('stockGroupBy2').value;
    
    // Валидация даты
    const dateError = validateDate(stockDate, 'Дата остатков');
    if (dateError) {
        showAlert(dateError, 'warning');
        return;
    }
    
    // ... остальной код функции без изменений ...
});

// ================== ХОЗЯЙСТВЕННЫЕ ОПЕРАЦИИ - ДОБАВЛЯЕМ ВАЛИДАЦИЮ ==================

document.getElementById('confirmExecuteOperations').addEventListener('click', function() {
    // Существующие проверки...
    const divisionType = document.getElementById('operationDivisionType').value;
    const shopNumber = document.getElementById('operationShopNumber').value;
    const perspective = document.getElementById('operationPerspective').value;
    const startDateStr = document.getElementById('operationStartDate').value;
    const endDateStr = document.getElementById('operationEndDate').value;
    const operationsString = document.getElementById('operationNumbers').value;
    const productType = document.getElementById('operationProductType').value;
    const singleProduct = document.getElementById('operationSingleProduct').value;
    const format = document.getElementById('operationFormat').value;
    const printTotalsOnly = document.getElementById('operationPrintTotalsOnly').checked;
    
    // Валидация дат
    const dateError = validateDateRange(startDateStr, endDateStr, 'Дата начала периода', 'Дата окончания периода');
    if (dateError) {
        showAlert(dateError, 'warning');
        return;
    }
    
    // Валидация операций
    const operationsError = validateOperations(operationsString);
    if (operationsError) {
        showAlert(operationsError, 'warning');
        return;
    }
    
    // Валидация номера магазина (если выбран)
    if (divisionType === 'shop') {
        if (!shopNumber.trim()) {
            showAlert('Введите номер магазина', 'warning');
            return;
        }
        if (!/^\d+$/.test(shopNumber.trim())) {
            showAlert('Номер магазина должен содержать только цифры', 'warning');
            return;
        }
    }
    
    // Валидация товара (если выбран один товар)
    if (productType === 'single' && !singleProduct.trim()) {
        showAlert('Введите название товара', 'warning');
        return;
    }
    
    // ... остальной код функции без изменений ...
});

// ================== ЕСТЕСТВЕННАЯ УБЫЛЬ - ДОБАВЛЯЕМ ВАЛИДАЦИЮ ==================

document.getElementById('confirmUploadNaturalLoss').addEventListener('click', function() {
    const startDateStr = document.getElementById('lossStartDate').value;
    const endDateStr = document.getElementById('lossEndDate').value;
    const format = document.getElementById('lossFormat').value;
    
    // Валидация дат
    const dateError = validateDateRange(startDateStr, endDateStr, 'Дата начала', 'Дата окончания');
    if (dateError) {
        showAlert(dateError, 'warning');
        return;
    }
    
    // ... остальной код функции без изменений ...
});

// ================== ОТХОДЫ - ДОБАВЛЯЕМ ВАЛИДАЦИЮ ==================

document.getElementById('confirmWaste').addEventListener('click', function() {
    const startDateStr = document.getElementById('wasteStartDate').value;
    const endDateStr = document.getElementById('wasteEndDate').value;
    const format = document.getElementById('wasteFormat').value;
    
    // Валидация дат
    const dateError = validateDateRange(startDateStr, endDateStr, 'Дата начала', 'Дата окончания');
    if (dateError) {
        showAlert(dateError, 'warning');
        return;
    }
    
    // ... остальной код функции без изменений ...
});

// ================== ДОБАВЛЯЕМ ВАЛИДАЦИЮ ДЛЯ ДРУГИХ ПОЛЕЙ ==================

// Для поля даты в документе проверки документов
document.getElementById('checkDocumentsBtn').addEventListener('click', function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (startDate || endDate) {
        if (startDate && endDate) {
            const dateError = validateDateRange(startDate, endDate, 'Дата начала', 'Дата окончания');
            if (dateError) {
                showAlert(dateError, 'warning');
                return;
            }
        } else if (startDate) {
            const dateError = validateDate(startDate, 'Дата начала');
            if (dateError) {
                showAlert(dateError, 'warning');
                return;
            }
        } else if (endDate) {
            const dateError = validateDate(endDate, 'Дата окончания');
            if (dateError) {
                showAlert(dateError, 'warning');
                return;
            }
        }
    }
    
    // ... остальной код функции ...
});

// Для дат в создании инвентаризации
document.getElementById('confirmCreateInventory').addEventListener('click', function() {
    const inventoryDate = document.getElementById('inventoryDate').value;
    
    if (inventoryDate) {
        const dateError = validateDate(inventoryDate, 'Дата инвентаризации');
        if (dateError) {
            showAlert(dateError, 'warning');
            return;
        }
    }
    
    // ... остальной код функции ...
});

// Добавляем валидацию на сами поля ввода дат (опционально, но удобно для пользователя)
function setupDateInputValidation() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    dateInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value) {
                const error = validateDate(this.value, 'Дата');
                if (error) {
                    showAlert(error, 'warning', 3000);
                    this.value = ''; // Очищаем поле при ошибке
                }
            }
        });
    });
}

// Инициализируем валидацию дат при загрузке
document.addEventListener('DOMContentLoaded', function() {
    setupDateInputValidation();
});

// Также можно добавить динамическую подсказку для поля операций
document.getElementById('operationNumbers').addEventListener('input', function() {
    const value = this.value.trim();
    if (value) {
        const operations = value.split(',').map(op => op.trim());
        let isValid = true;
        
        for (let i = 0; i < operations.length; i++) {
            const op = operations[i];
            if (op && (!/^\d+$/.test(op) || op.length > 3 || (op.length > 1 && op.startsWith('0')) || op === '0')) {
                isValid = false;
                break;
            }
        }
        
        if (isValid) {
            this.classList.remove('invalid');
            this.classList.add('valid');
        } else {
            this.classList.remove('valid');
            this.classList.add('invalid');
        }
    } else {
        this.classList.remove('valid', 'invalid');
    }
});

// Инициализация печати для бухгалтера
function initPrintForAccountant() {
    // Открытие модального окна при нажатии на кнопку "Печать для бухгалтера"
    document.addEventListener('click', function(e) {
        if (e.target.closest('.print-for-accountant-btn')) {
            const button = e.target.closest('.print-for-accountant-btn');
            const inventoryId = button.getAttribute('data-inventory-id');
            const inventoryType = button.getAttribute('data-inventory-type') || 'general';
            
            currentInventoryForPrint = {
                id: inventoryId,
                type: inventoryType
            };
            
            openPrintForAccountantModal(inventoryId, inventoryType);
        }
    });
    
function openPrintForAccountantModal(inventoryId, inventoryType) {
    console.log('Открытие модального окна для печати:', inventoryId, inventoryType);
    
    // Создаем модальное окно если его нет
    if (!document.getElementById('printForAccountantModal')) {
        console.log('Создание модального окна...');
        createPrintModal();
    }
    
    const modal = document.getElementById('printForAccountantModal');
    if (!modal) {
        console.error('Модальное окно не создано!');
        return;
    }
    
    modal.style.display = 'flex';
    
    // Устанавливаем значения
    const printInventoryId = document.getElementById('printInventoryId');
    const printInventoryType = document.getElementById('printInventoryType');
    
    if (printInventoryId) {
        printInventoryId.value = `Инвентаризация #${inventoryId}`;
        console.log('Установлен ID инвентаризации:', inventoryId);
    }
    
    if (printInventoryType) {
        printInventoryType.value = inventoryType;
        console.log('Установлен тип инвентаризации:', inventoryType);
    }
    
    // Сбрасываем состояние
    const printResult = document.getElementById('printResult');
    const printLoading = document.getElementById('printLoading');
    
    if (printResult) {
        printResult.style.display = 'none';
        printResult.innerHTML = '';
    }
    
    if (printLoading) {
        printLoading.style.display = 'none';
    }
    
    // Устанавливаем заголовок
    let title = 'Сличительная ведомость';
    switch(inventoryType) {
        case 'alcohol':
            title = 'Сличительная ведомость по алкоголю';
            break;
        case 'beer':
            title = 'Сличительная ведомость по пиву';
            break;
        case 'cigarettes':
            title = 'Сличительная ведомость по сигаретам';
            break;
    }
    
    const modalHeader = modal.querySelector('.modal-header h2');
    if (modalHeader) {
        modalHeader.textContent = title;
    }
    
    console.log('Модальное окно открыто успешно');
}
    
    // Закрытие модального окна
    document.querySelector('#printForAccountantModal .close')?.addEventListener('click', closePrintModal);
    document.getElementById('cancelPrintForAccountant')?.addEventListener('click', closePrintModal);
    
    // Подтверждение печати
    document.getElementById('confirmPrintForAccountant')?.addEventListener('click', function() {
        if (!currentInventoryForPrint) return;
        
        const printType = document.getElementById('printType').value;
        const printFormat = document.getElementById('printFormat').value;
        const groupBy = document.getElementById('groupBy').value;
        const includeSubtotals = document.getElementById('includeSubtotals').checked;
        
        // Показываем загрузку
        document.getElementById('printLoading').style.display = 'block';
        document.getElementById('printResult').style.display = 'none';
        
        // Имитация загрузки
        setTimeout(() => {
            generatePrintDocument(
                currentInventoryForPrint.id,
                currentInventoryForPrint.type,
                printType,
                printFormat,
                groupBy,
                includeSubtotals
            );
            
            document.getElementById('printLoading').style.display = 'none';
            document.getElementById('printResult').style.display = 'block';
        }, 1500);
    });
    
    // Закрытие по клику вне окна
    window.addEventListener('click', function(e) {
        if (e.target.id === 'printForAccountantModal') {
            closePrintModal();
        }
    });
    
    function closePrintModal() {
        const modal = document.getElementById('printForAccountantModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// Генерация документа для печати
function generatePrintDocument(inventoryId, inventoryType, printType, printFormat, groupBy, includeSubtotals) {
    try {
        // Находим инвентаризацию
        const inventory = appData.inventories.find(inv => 
            inv.id === inventoryId || inv.shopId === appData.currentShop?.id && inv.type === inventoryType
        );
        
        // Если инвентаризация не найдена, создаем тестовую
        const testInventory = inventory || {
            id: inventoryId,
            date: new Date().toLocaleDateString('ru-RU'),
            type: inventoryType,
            shopId: appData.currentShop?.id || 451
        };
        
        // Генерируем данные для печати
        const printData = generatePrintData(testInventory, inventoryType, printType);
        
        // Формируем результат
        const resultHTML = `
            <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                <i class="fas fa-check-circle"></i> <strong>Документ успешно сформирован!</strong>
            </div>
            <p><strong>Инвентаризация:</strong> #${testInventory.id}</p>
            <p><strong>Тип инвентаризации:</strong> ${getInventoryTypeName(inventoryType)}</p>
            <p><strong>Тип печати:</strong> ${printType === 'full' ? 'Полная ведомость' : 'Только итоги'}</p>
            <p><strong>Формат:</strong> ${getFormatName(printFormat)}</p>
            ${printType === 'totals' ? `<p><strong>Группировка:</strong> ${getGroupByName(groupBy)}</p>` : ''}
            <hr>
            <div style="margin-top: 15px;">
                <p>Всего позиций: ${printType === 'full' ? printData.items.length : printData.groups.length}</p>
                <p>Общее количество: ${printData.totalQuantity}</p>
                <p><strong>Общая сумма: ${formatNumber(printData.totalAmount)} ₽</strong></p>
            </div>
            <div style="margin-top: 15px; font-size: 12px; color: #666;">
                <p><i class="fas fa-info-circle"></i> Документ будет автоматически скачан через несколько секунд...</p>
            </div>
        `;
        
        const printResultContent = document.getElementById('printResultContent');
        if (printResultContent) {
            printResultContent.innerHTML = resultHTML;
        }
        
        // Выполняем действие в зависимости от формата
        setTimeout(() => {
            switch(printFormat) {
                case 'pdf':
                    generatePDF(testInventory, printData, printType);
                    break;
                case 'excel':
                    generateExcel(testInventory, printData, printType);
                    break;
                case 'word':
                    generateWord(testInventory, printData, printType);
                    break;
                case 'print':
                    printDocument(testInventory, printData, printType);
                    break;
                default:
                    generateExcel(testInventory, printData, printType);
            }
        }, 1000);
        
    } catch (error) {
        console.error('Ошибка в generatePrintDocument:', error);
        
        const errorHTML = `
            <div style="background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px;">
                <i class="fas fa-exclamation-circle"></i> <strong>Ошибка при формировании документа</strong>
                <p style="margin-top: 10px; font-size: 14px;">${error.message || 'Неизвестная ошибка'}</p>
            </div>
        `;
        
        const printResultContent = document.getElementById('printResultContent');
        if (printResultContent) {
            printResultContent.innerHTML = errorHTML;
        }
        
        throw error;
    }
}

// Генерация данных для печати
function generatePrintData(inventory, inventoryType, printType) {
    const items = [];
    let totalAmount = 0;
    
    // Получаем товары по типу инвентаризации
    const products = getProductsByInventoryType(inventoryType);
    
    // Генерируем фиктивные данные
    products.forEach(product => {
        const quantity = Math.floor(Math.random() * 50) + 5;
        const amount = quantity * product.price;
        totalAmount += amount;
        
        items.push({
            barcode: product.barcode,
            name: product.name,
            category: product.category,
            group: product.group,
            unit: 'шт',
            quantity: quantity,
            price: product.price,
            amount: amount,
            difference: Math.random() > 0.7 ? -(Math.random() * 5) : 0,
            actualQuantity: quantity + (Math.random() > 0.7 ? -(Math.random() * 5) : 0)
        });
    });
    
    // Если нужно только итоги - группируем данные
    if (printType === 'totals') {
        return generateTotalsData(items);
    }
    
    return {
        items: items,
        totalAmount: totalAmount,
        totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0)
    };
}

// Генерация данных для итогов
function generateTotalsData(items) {
    // Группируем по категориям
    const groups = {};
    
    items.forEach(item => {
        if (!groups[item.category]) {
            groups[item.category] = {
                category: item.category,
                items: [],
                totalQuantity: 0,
                totalAmount: 0
            };
        }
        
        groups[item.category].items.push(item);
        groups[item.category].totalQuantity += item.quantity;
        groups[item.category].totalAmount += item.amount;
    });
    
    return {
        groups: Object.values(groups),
        totalAmount: Object.values(groups).reduce((sum, group) => sum + group.totalAmount, 0),
        totalQuantity: Object.values(groups).reduce((sum, group) => sum + group.totalQuantity, 0)
    };
}

// Вспомогательные функции
function getInventoryTypeName(type) {
    const names = {
        'general': 'Общая инвентаризация',
        'alcohol': 'Алкоголь',
        'beer': 'Пиво',
        'cigarettes': 'Сигареты'
    };
    return names[type] || type;
}

function getFormatName(format) {
    const names = {
        'pdf': 'PDF документ',
        'excel': 'Excel файл',
        'word': 'Word документ',
        'print': 'Непосредственно на печать'
    };
    return names[format] || format;
}

function getGroupByName(group) {
    const names = {
        'product_group': 'Группе товаров',
        'product_type': 'Вид товара',
        'department': 'Отделу/Секции',
        'operator': 'Оператору'
    };
    return names[group] || group;
}

// Функции генерации документов
function generatePDF(inventory, printData, printType) {
    showAlert('PDF документ сформирован', 'success');
    // В реальном приложении здесь будет генерация PDF
}

function generateExcel(inventory, printData, printType) {
    try {
        // Генерация Excel файла
        let csvContent = '\uFEFF'; // UTF-8 BOM для Excel
        
        if (printType === 'full') {
            csvContent += 'СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ\n\n';
            csvContent += `Инвентаризация: #${inventory.id}\n`;
            csvContent += `Тип: ${getInventoryTypeName(inventory.type)}\n`;
            csvContent += `Дата: ${inventory.date}\n`;
            csvContent += `Магазин: ${appData.currentShop?.name || 'Магазин #451'}\n\n`;
            csvContent += 'Штрихкод;Наименование;Категория;Группа;Ед.;Кол-во;Цена;Сумма\n';
            
            printData.items.forEach(item => {
                csvContent += `${item.barcode};${item.name};${item.category};${item.group};${item.unit};${item.quantity};${formatNumber(item.price)};${formatNumber(item.amount)}\n`;
            });
            
            csvContent += `\nИтого;;;Количество позиций: ${printData.items.length};Общее количество: ${printData.totalQuantity};Общая сумма: ${formatNumber(printData.totalAmount)} ₽`;
        } else {
            csvContent += 'ИТОГОВАЯ СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ\n\n';
            csvContent += `Инвентаризация: #${inventory.id}\n`;
            csvContent += `Тип: ${getInventoryTypeName(inventory.type)}\n`;
            csvContent += `Дата: ${inventory.date}\n\n`;
            csvContent += 'Категория;Количество позиций;Общее количество;Общая сумма\n';
            
            printData.groups.forEach(group => {
                csvContent += `${group.category};${group.items.length};${group.totalQuantity};${formatNumber(group.totalAmount)}\n`;
            });
            
            csvContent += `\nОБЩИЙ ИТОГ;${printData.groups.reduce((sum, g) => sum + g.items.length, 0)};${printData.totalQuantity};${formatNumber(printData.totalAmount)} ₽`;
        }
        
        // Скачивание файла
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Сличительная_ведомость_${inventory.id}_${new Date().toISOString().slice(0,10)}.csv`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Показываем уведомление
            showAlert('Excel файл успешно скачан', 'success');
            
            // Обновляем результат в модальном окне
            const successHTML = `
                <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px;">
                    <i class="fas fa-check-circle"></i> <strong>Файл успешно скачан!</strong>
                    <p style="margin-top: 10px; font-size: 14px;">
                        Файл: Сличительная_ведомость_${inventory.id}_${new Date().toISOString().slice(0,10)}.csv
                    </p>
                </div>
            `;
            
            const printResultContent = document.getElementById('printResultContent');
            if (printResultContent) {
                printResultContent.innerHTML = successHTML;
            }
        }, 100);
        
    } catch (error) {
        console.error('Ошибка при генерации Excel:', error);
        showAlert('Ошибка при генерации Excel файла', 'danger');
    }
}

function generateWord(inventory, printData, printType) {
    showAlert('Word документ сформирован', 'success');
    // В реальном приложении здесь будет генерация Word
}

function printDocument(inventory, printData, printType) {
    const printWindow = window.open('', '_blank');
    
    let content = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>Сличительная ведомость #${inventory.id}</title>
            <style>
                body { font-family: Arial; margin: 20px; }
                h1 { text-align: center; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #000; padding: 8px; }
                th { background: #eee; }
                ...total { font-weight: bold; background: #e8f5e8; }
            </style>
        </head>
        <body>
            <h1>СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ</h1>
            <p><strong>Инвентаризация:</strong> #${inventory.id}</p>
            <p><strong>Тип:</strong> ${getInventoryTypeName(inventory.type)}</p>
            <p><strong>Дата:</strong> ${inventory.date}</p>
    `;
    
    if (printType === 'full') {
        content += `
            <table>
                <tr><th>№</th><th>Наименование</th><th>Кол-во</th><th>Цена</th><th>Сумма</th></tr>
        `;
        
        printData.items.forEach((item, idx) => {
            content += `<tr><td>${idx+1}</td><td>${item.name}</td><td>${item.quantity}</td><td>${formatNumber(item.price)}</td><td>${formatNumber(item.amount)}</td></tr>`;
        });
        
        content += `<tr class="total"><td colspan="4">Итого:</td><td>${formatNumber(printData.totalAmount)} ₽</td></tr>`;
    } else {
        content += `
            <h2>Итоговая ведомость</h2>
            <table>
                <tr><th>Категория</th><th>Кол-во позиций</th><th>Общее кол-во</th><th>Общая сумма</th></tr>
        `;
        
        printData.groups.forEach(group => {
            content += `<tr><td>${group.category}</td><td>${group.items.length}</td><td>${group.totalQuantity}</td><td>${formatNumber(group.totalAmount)}</td></tr>`;
        });
        
        content += `<tr class="total"><td>ОБЩИЙ ИТОГ</td><td>${printData.groups.reduce((sum, g) => sum + g.items.length, 0)}</td><td>${printData.totalQuantity}</td><td>${formatNumber(printData.totalAmount)} ₽</td></tr>`;
    }
    
    content += `
            </table>
            <p style="margin-top: 30px;">Сформировано: ${new Date().toLocaleString('ru-RU')}</p>
            <button onclick="window.print()" style="margin-top: 20px; padding: 10px 20px;">Печать</button>
        </body>
        </html>
    `;
    
    printWindow.document.write(content);
    printWindow.document.close();
    
    showAlert('Документ открыт для печати', 'success');
}

function generateExcel(inventory, printData, printType) {
    // Генерация Excel файла
    let csvContent = '\uFEFF'; // UTF-8 BOM для Excel
    
    if (printType === 'full') {
        csvContent += 'Сличительная ведомость\n\n';
        csvContent += `Инвентаризация: #${inventory.id}\n`;
        csvContent += `Тип: ${getInventoryTypeName(inventory.type)}\n`;
        csvContent += `Дата: ${inventory.date}\n\n`;
        csvContent += 'Штрихкод;Наименование;Категория;Группа;Ед.;Кол-во;Цена;Сумма\n';
        
        printData.items.forEach(item => {
            csvContent += `${item.barcode};${item.name};${item.category};${item.group};${item.unit};${item.quantity};${formatNumber(item.price)};${formatNumber(item.amount)}\n`;
        });
        
        csvContent += `\nИтого;;;Количество: ${printData.items.length};Сумма: ${formatNumber(printData.totalAmount)} ₽`;
    } else {
        csvContent += 'Итоговая сличительная ведомость\n\n';
        csvContent += `Инвентаризация: #${inventory.id}\n`;
        csvContent += `Тип: ${getInventoryTypeName(inventory.type)}\n\n`;
        csvContent += 'Категория;Количество позиций;Общее количество;Общая сумма\n';
        
        printData.groups.forEach(group => {
            csvContent += `${group.category};${group.items.length};${group.totalQuantity};${formatNumber(group.totalAmount)}\n`;
        });
        
        csvContent += `\nОбщий итог;;${printData.totalQuantity};${formatNumber(printData.totalAmount)} ₽`;
    }
    
    // Скачивание файла
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Сличительная_ведомость_${inventory.id}_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    showAlert('Excel файл сформирован и скачан', 'success');
}

function generateWord(inventory, printData, printType) {
    // В реальном приложении здесь будет генерация Word
    console.log('Генерация Word для инвентаризации', inventory.id);
    showAlert('Word документ сформирован', 'success');
}

function printDocument(inventory, printData, printType) {
    const printWindow = window.open('', '_blank');
    let content = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Сличительная ведомость #${inventory.id}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    font-size: 14px;
                }
                ...header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                ...title {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                ...subtitle {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                ...info-table {
                    width: 100%;
                    margin-bottom: 20px;
                    border-collapse: collapse;
                }
                ...info-table td {
                    padding: 5px 10px;
                    border: 1px solid #ddd;
                }
                ...info-table .label {
                    font-weight: bold;
                    background-color: #f5f5f5;
                    width: 200px;
                }
                ...main-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                ...main-table th, .main-table td {
                    border: 1px solid #000;
                    padding: 8px;
                    text-align: left;
                }
                ...main-table th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                ...total-row {
                    font-weight: bold;
                    background-color: #e8f5e8;
                }
                ...group-header {
                    background-color: #f0f0f0;
                    font-weight: bold;
                }
                ...footer {
                    margin-top: 50px;
                    font-size: 12px;
                }
                ...signature {
                    margin-top: 50px;
                }
                ...signature-line {
                    border-top: 1px solid #000;
                    width: 200px;
                    margin-top: 30px;
                }
                @media print {
                    body { margin: 0; }
                    ...no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="title">СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ</div>
                <div class="subtitle">по результатам инвентаризации №${inventory.id}</div>
            </div>
            
            <table class="info-table">
                <tr>
                    <td class="label">Тип инвентаризации:</td>
                    <td>${getInventoryTypeName(inventory.type)}</td>
                </tr>
                <tr>
                    <td class="label">Дата проведения:</td>
                    <td>${inventory.date}</td>
                </tr>
                <tr>
                    <td class="label">Магазин:</td>
                    <td>${appData.currentShop?.name || 'Магазин #451'}</td>
                </tr>
                <tr>
                    <td class="label">Формат отчета:</td>
                    <td>${printType === 'full' ? 'Полная ведомость' : 'Только итоги'}</td>
                </tr>
            </table>
    `;
    
    if (printType === 'full') {
        content += `
            <table class="main-table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Штрихкод</th>
                        <th>Наименование товара</th>
                        <th>Категория</th>
                        <th>Ед. изм.</th>
                        <th>Количество по описи</th>
                        <th>Количество по учету</th>
                        <th>Разница</th>
                        <th>Цена</th>
                        <th>Сумма разницы</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        printData.items.forEach((item, index) => {
            const diff = item.difference || 0;
            const diffAmount = diff * item.price;
            
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.barcode}</td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.unit}</td>
                    <td>${item.quantity}</td>
                    <td>${item.actualQuantity || item.quantity}</td>
                    <td>${diff > 0 ? '+' : ''}${formatNumber(diff)}</td>
                    <td>${formatNumber(item.price)}</td>
                    <td>${formatNumber(diffAmount)}</td>
                </tr>
            `;
        });
        
        content += `
                </tbody>
                <tfoot>
                    <tr class="total-row">
                        <td colspan="5">Итого:</td>
                        <td>${printData.items.length} позиций</td>
                        <td></td>
                        <td></td>
                        <td>Общая сумма:</td>
                        <td>${formatNumber(printData.totalAmount)} ₽</td>
                    </tr>
                </tfoot>
            </table>
        `;
    } else {
        content += `
            <table class="main-table">
                <thead>
                    <tr>
                        <th>Категория товаров</th>
                        <th>Количество позиций</th>
                        <th>Общее количество</th>
                        <th>Общая сумма</th>
                        <th>Сумма разницы</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        let totalDiff = 0;
        printData.groups.forEach(group => {
            const groupDiff = Math.random() * 1000 - 500;
            totalDiff += groupDiff;
            
            content += `
                <tr>
                    <td>${group.category}</td>
                    <td>${group.items.length}</td>
                    <td>${group.totalQuantity}</td>
                    <td>${formatNumber(group.totalAmount)}</td>
                    <td>${formatNumber(groupDiff)}</td>
                </tr>
            `;
        });
        
        content += `
                </tbody>
                <tfoot>
                    <tr class="total-row">
                        <td>ОБЩИЙ ИТОГ:</td>
                        <td>${printData.groups.reduce((sum, g) => sum + g.items.length, 0)}</td>
                        <td>${printData.totalQuantity}</td>
                        <td>${formatNumber(printData.totalAmount)} ₽</td>
                        <td>${formatNumber(totalDiff)} ₽</td>
                    </tr>
                </tfoot>
            </table>
        `;
    }
    
    content += `
            <div class="footer">
                <p>Сформировано: ${new Date().toLocaleString('ru-RU')}</p>
                <p>Система управления инвентаризацией</p>
            </div>
            
            <div class="signature">
                <p>Председатель инвентаризационной комиссии:</p>
                <div class="signature-line"></div>
                <p>${appData.currentUser?.name || 'Системный администратор'}</p>
            </div>
            
            <div class="no-print" style="margin-top: 20px; text-align: center;">
                <button onclick="window.print()" style="padding: 10px 20px; background-color: #007bff; color: white; border: none; cursor: pointer;">
                    Печать документа
                </button>
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(content);
    printWindow.document.close();
    
    showAlert('Документ открыт для печати', 'success');
}

// Получить название формата
function getFormatName(format) {
    const formats = {
        'screen': 'Вывод на экран',
        'print': 'На печать',
        'word': 'Выгрузка в Word',
        'excel': 'Выгрузка в Excel'
    };
    return formats[format] || format;
}

        // Инициализация выбора магазина
        function initShopSelection() {
            const shopList = document.querySelector('.shop-list');
            const selectShopBtn = document.getElementById('selectShopBtn');
            const shopSearchInput = document.getElementById('shopSearchInput');
            const searchShopBtn = document.getElementById('searchShopBtn');
			
			
			selectShopBtn.addEventListener('click', function() {
    if (!appData.currentShop) return;
    
    document.getElementById('shopSelectScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    
    // Обновляем отображение профиля (включая шапку)
    updateProfileDisplay();
    
    loadDashboard();
});
            
            // Функция для отображения магазинов
            function displayShops(shops) {
                shopList.innerHTML = '';
                
                shops.forEach(shop => {
                    const shopItem = document.createElement('div');
                    shopItem.className = 'shop-item';
                    shopItem.setAttribute('data-shop-id', shop.id);
                    
                    const shopName = document.createElement('h3');
                    shopName.textContent = shop.name;
                    
                    const shopLocation = document.createElement('p');
                    shopLocation.textContent = shop.location;
                    
                    const lastInventory = document.createElement('p');
                    lastInventory.textContent = `Последняя инвентаризация: ${shop.lastInventory}`;
                    lastInventory.style.fontSize = '12px';
                    lastInventory.style.marginTop = '5px';
                    
                    shopItem.appendChild(shopName);
                    shopItem.appendChild(shopLocation);
                    shopItem.appendChild(lastInventory);
                    
                    shopItem.addEventListener('click', function() {
                        document.querySelectorAll('.shop-item').forEach(i => i.classList.remove('active'));
                        this.classList.add('active');
                        selectShopBtn.disabled = false;
                        
                        appData.currentShop = {
                            id: shop.id,
                            name: shop.name,
                            location: shop.location,
                            lastInventory: shop.lastInventory
                        };
                    });
                    
                    shopList.appendChild(shopItem);
                });
            }
            
            // Изначально отображаем все магазины
            displayShops(appData.shops);
            
            // Поиск магазинов
            function searchShops() {
                const searchTerm = shopSearchInput.value.toLowerCase();
                const filteredShops = appData.shops.filter(shop => 
                    shop.name.toLowerCase().includes(searchTerm) || 
                    shop.location.toLowerCase().includes(searchTerm) ||
                    shop.id.toString().includes(searchTerm)
                );
                displayShops(filteredShops);
            }
            
            shopSearchInput.addEventListener('input', searchShops);
            searchShopBtn.addEventListener('click', searchShops);
            
            selectShopBtn.addEventListener('click', function() {
                if (!appData.currentShop) return;
                
                document.getElementById('shopSelectScreen').style.display = 'none';
                document.getElementById('mainApp').style.display = 'block';
                
                document.querySelector('.user-info span').textContent = 
                    `${appData.currentUser.name} (${appData.currentShop.name})`;
                
                loadDashboard();
            });
        }

       function initUserMenu() {
    const userAvatar = document.getElementById('userAvatar');
    const userMenu = document.getElementById('userMenu');
    const editProfileBtnMenu = document.getElementById('editProfileBtnMenu');
    const changePasswordBtnMenu = document.getElementById('changePasswordBtnMenu');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!userAvatar || !userMenu) return; // Проверяем существование элементов

    // Открытие/закрытие меню
    userAvatar.addEventListener('click', function(e) {
        e.stopPropagation();
        userMenu.classList.toggle('active');
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', function() {
        userMenu.classList.remove('active');
    });

    // Предотвращение закрытия при клике внутри меню
    userMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Редактирование профиля
    if (editProfileBtnMenu) {
        editProfileBtnMenu.addEventListener('click', function() {
            userMenu.classList.remove('active');
            showEditProfileModal();
        });
    }

    // Изменение пароля
    if (changePasswordBtnMenu) {
        changePasswordBtnMenu.addEventListener('click', function() {
            userMenu.classList.remove('active');
            showChangePasswordModal();
        });
    }

    // Выход
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            userMenu.classList.remove('active');
            logout();
        });
    }
}


function saveInventoryData() {
    try {
        localStorage.setItem('inventoryTerminalData', JSON.stringify(appData.terminalData));
        localStorage.setItem('inventoryCurrentId', JSON.stringify(appData.currentInventoryId));
        console.log('Данные сохранены в LocalStorage');
    } catch (error) {
        console.error('Ошибка сохранения в LocalStorage:', error);
    }
}

// Функция для загрузки данных из LocalStorage
function loadInventoryData() {
    try {
        const savedTerminalData = localStorage.getItem('inventoryTerminalData');
        const savedCurrentId = localStorage.getItem('inventoryCurrentId');
        
        if (savedTerminalData) {
            appData.terminalData = JSON.parse(savedTerminalData);
            console.log('Данные загружены из LocalStorage:', appData.terminalData);
        }
        
        if (savedCurrentId) {
            appData.currentInventoryId = JSON.parse(savedCurrentId);
        }
    } catch (error) {
        console.error('Ошибка загрузки из LocalStorage:', error);
    }
}


// Функция обновления превью аватара
function updateAvatarPreview() {
    const previewIcon = document.getElementById('previewIcon');
    const avatarPreview = document.getElementById('avatarPreview');
    const headerAvatarIcon = document.getElementById('headerAvatarIcon');
    const headerAvatarContainer = document.getElementById('headerAvatarContainer');
    
    if (appData.currentUser.avatar) {
        // Если есть аватар - показываем изображение
        if (previewIcon) previewIcon.style.display = 'none';
        if (avatarPreview) {
            avatarPreview.style.backgroundImage = `url(${appData.currentUser.avatar})`;
            avatarPreview.style.backgroundSize = 'cover';
            avatarPreview.style.backgroundPosition = 'center';
        }
        if (headerAvatarIcon) headerAvatarIcon.style.display = 'none';
        if (headerAvatarContainer) {
            headerAvatarContainer.style.backgroundImage = `url(${appData.currentUser.avatar})`;
            headerAvatarContainer.style.backgroundSize = 'cover';
            headerAvatarContainer.style.backgroundPosition = 'center';
        }
    } else {
        // Если нет аватара - показываем иконку
        if (previewIcon) previewIcon.style.display = 'flex';
        if (avatarPreview) {
            avatarPreview.style.backgroundImage = 'none';
            avatarPreview.style.backgroundColor = '#3498db';
        }
        if (headerAvatarIcon) headerAvatarIcon.style.display = 'flex';
        if (headerAvatarContainer) {
            headerAvatarContainer.style.backgroundImage = 'none';
            headerAvatarContainer.style.backgroundColor = '#3498db';
        }
    }
}



// Функция сохранения профиля в localStorage
function saveProfileToStorage() {
    try {
        localStorage.setItem('userProfile', JSON.stringify(appData.currentUser));
    } catch (e) {
        console.error('Ошибка сохранения профиля:', e);
    }
}

// Функция загрузки профиля из localStorage
function loadProfileFromStorage() {
    try {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            appData.currentUser = { ...appData.currentUser, ...profile };
            
            // Обновляем отображение
            document.getElementById('headerUserName').textContent = appData.currentUser.name;
            updateAvatarPreview();
        }
    } catch (e) {
        console.error('Ошибка загрузки профиля:', e);
    }
}

function showEditProfileModal() {
    console.log('Открытие модального окна профиля');
    
    const modal = document.getElementById('editProfileModal');
    if (!modal) {
        alert('Ошибка: модальное окно не найдено');
        return;
    }
    
    // Заполняем поля
    const fullNameInput = document.getElementById('editFullName');
    const phoneInput = document.getElementById('editPhone');
    const emailInput = document.getElementById('editEmail');
    
    // Получаем текущее отображение имени из header
    const currentHeaderText = document.getElementById('headerUserName').textContent;
    
    // Извлекаем только имя пользователя (без магазина)
    let currentName = appData.currentUser.name || '';
    
    // Если в текущем header есть магазин, сохраняем его
    let currentShopInfo = '';
    if (currentHeaderText.includes('(')) {
        const match = currentHeaderText.match(/\((.*?)\)/);
        if (match) {
            currentShopInfo = ` (${match[1]})`;
        }
    }
    
    fullNameInput.value = currentName;
    phoneInput.value = appData.currentUser.phone || '';
    emailInput.value = appData.currentUser.email || '';
    
    // Применяем маску телефона при загрузке
    if (phoneInput.value) {
        phoneInput.value = formatPhoneNumber(phoneInput.value);
    }
    
    // Показываем окно
    modal.style.display = 'flex';
    
    // Валидация телефона при вводе
    phoneInput.addEventListener('input', function() {
        validatePhoneField(phoneInput);
    });
    
    // Функция валидации телефона
    function validatePhoneField(input) {
        const value = input.value;
        const cleaned = value.replace(/\D/g, '');
        
        // Сбрасываем стили
        input.classList.remove('valid', 'invalid', 'warning');
        
        // Если поле пустое - это нормально (необязательное поле)
        if (!value.trim()) {
            return true;
        }
        
        // Удаляем код страны 7 или 8 для проверки длины
        let phoneDigits = cleaned;
        if (phoneDigits.startsWith('7') || phoneDigits.startsWith('8')) {
            phoneDigits = phoneDigits.substring(1);
        }
        
        // Проверяем длину (должно быть 10 цифр)
        if (phoneDigits.length !== 10) {
            input.classList.add('invalid');
            showPhoneError('Номер должен содержать 10 цифр');
            return false;
        }
        
        // Проверяем, что номер начинается с правильной цифры (9 для мобильных, 3-6 для городских)
        const firstDigit = phoneDigits.charAt(0);
        if (!/[3456789]/.test(firstDigit)) {
            input.classList.add('invalid');
            showPhoneError('Неверный формат номера');
            return false;
        }
        
        // Если все проверки пройдены
        input.classList.add('valid');
        clearPhoneError();
        return true;
    }
    
    // Функция показа ошибки телефона
    function showPhoneError(message) {
        clearPhoneError();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'color: #e74c3c; font-size: 12px; margin-top: 5px;';
        phoneInput.parentNode.appendChild(errorDiv);
    }
    
    // Функция очистки ошибки телефона
    function clearPhoneError() {
        const errorDiv = phoneInput.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // Валидация email
    function validateEmail(email) {
        if (!email) return true; // email необязательный
        
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Простой обработчик сохранения с валидацией
    document.getElementById('saveProfileBtn').onclick = function() {
        console.log('Сохранение профиля...');
        
        // Получаем значения
        const name = fullNameInput.value.trim();
        let phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        
        // ВАЛИДАЦИЯ
        let isValid = true;
        const errors = [];
        
        // 1. Проверка ФИО (обязательное поле)
        if (!name) {
            isValid = false;
            errors.push('Введите ФИО');
            fullNameInput.classList.add('invalid');
        } else {
            fullNameInput.classList.remove('invalid');
        }
        
        // 2. Проверка телефона (если указан)
        if (phone) {
            // Форматируем телефон для сохранения
            phone = formatPhoneNumberForSave(phone);
            
            // Проверяем валидность
            if (!validatePhoneField(phoneInput)) {
                isValid = false;
                errors.push('Укажите корректный номер телефона (10 цифр)');
            }
        }
        
        // 3. Проверка email (если указан)
        if (email && !validateEmail(email)) {
            isValid = false;
            errors.push('Укажите корректный email адрес');
            emailInput.classList.add('invalid');
        } else {
            emailInput.classList.remove('invalid');
        }
        
        // Если есть ошибки - показываем их и останавливаем сохранение
        if (!isValid) {
            showAlert(errors.join('\n'), 'warning');
            return;
        }
        
        // Сохраняем
        appData.currentUser.name = name;
        appData.currentUser.phone = phone; // Сохраняем отформатированный номер
        appData.currentUser.email = email;
        
        // Обновляем header с сохранением информации о магазине
        const headerUserName = document.getElementById('headerUserName');
        if (headerUserName) {
            // Формируем новую строку: Имя + (Магазин)
            let newHeaderText = name;
            if (appData.currentShop) {
                newHeaderText += ` (${appData.currentShop.name})`;
            } else if (currentShopInfo) {
                // Используем сохраненную информацию о магазине
                newHeaderText += currentShopInfo;
            }
            headerUserName.textContent = newHeaderText;
            console.log('Header обновлен:', newHeaderText);
        }
        
        // Обновляем превью профиля если есть
        const profileNameDisplay = document.getElementById('profileNameDisplay');
        const profilePhoneDisplay = document.getElementById('profilePhoneDisplay');
        
        if (profileNameDisplay) {
            profileNameDisplay.textContent = name;
        }
        
        if (profilePhoneDisplay) {
            profilePhoneDisplay.textContent = phone || 'Телефон не указан';
        }
        
        // Сохраняем в localStorage
        localStorage.setItem('userProfile', JSON.stringify(appData.currentUser));
        
        // Закрываем окно
        modal.style.display = 'none';
        
        // Показываем сообщение
        showAlert('Профиль успешно сохранен!', 'success');
    };
    
    // Простой обработчик отмены
    document.querySelector('#editProfileModal .close').onclick = function() {
        modal.style.display = 'none';
        clearPhoneError();
    };
    
    document.getElementById('cancelEditProfile').onclick = function() {
        modal.style.display = 'none';
        clearPhoneError();
    };
}

// Функция форматирования телефона для сохранения
function formatPhoneNumberForSave(phone) {
    if (!phone) return '';
    
    // Оставляем только цифры
    let cleaned = phone.replace(/\D/g, '');
    
    // Если номер пустой, возвращаем пустую строку
    if (!cleaned) return '';
    
    // Удаляем начальный 7 или 8
    if (cleaned.startsWith('7') || cleaned.startsWith('8')) {
        cleaned = cleaned.substring(1);
    }
    
    // Проверяем длину
    if (cleaned.length === 10) {
        return `+7${cleaned}`;
    }
    
    // Если длина не 10, возвращаем как есть (будет ошибка при валидации)
    return phone;
}

// Улучшенная функция форматирования телефона для отображения
function formatPhoneNumber(phone) {
    if (!phone) return '';
    
    // Оставляем только цифры
    let cleaned = phone.replace(/\D/g, '');
    
    // Если номер пустой, возвращаем пустую строку
    if (!cleaned) return '';
    
    // Удаляем начальный 7 или 8 для форматирования
    if (cleaned.startsWith('7') || cleaned.startsWith('8')) {
        cleaned = cleaned.substring(1);
    }
    
    // Форматируем только если есть 10 цифр
    if (cleaned.length === 10) {
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
        if (match) {
            return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
        }
    }
    
    // Если не удалось отформатировать, возвращаем оригинал
    return phone;
}

// Функция очистки всех ошибок полей
function clearAllFieldErrors() {
    const errors = document.querySelectorAll('.field-error');
    errors.forEach(error => error.remove());
    
    // Сбрасываем классы валидации
    const inputs = document.querySelectorAll('#editProfileModal .form-control');
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid', 'warning');
    });
}

// Упрощенная функция showAlert для тестирования
function showAlert(message, type = 'info') {
    console.log(`Alert [${type}]: ${message}`);
    
    // Простое уведомление
    alert(`${type.toUpperCase()}: ${message}`);
}

// Функция сохранения в localStorage
function saveProfileToStorage() {
    try {
        localStorage.setItem('userProfile', JSON.stringify(appData.currentUser));
        console.log('Профиль сохранен в localStorage');
    } catch (e) {
        console.error('Ошибка сохранения профиля:', e);
    }
}

// Функция валидации email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showChangePasswordModal() {
    console.log('Открытие модального окна изменения пароля');
    
    const modal = document.getElementById('changePasswordModal');
    if (!modal) {
        alert('Ошибка: модальное окно не найдено');
        return;
    }
    
    // Очищаем поля и ошибки
    const currentPasswordInput = document.getElementById('currentPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmNewPasswordInput = document.getElementById('confirmNewPassword');
    const passwordError = document.getElementById('passwordError');
    
    if (currentPasswordInput) currentPasswordInput.value = '';
    if (newPasswordInput) newPasswordInput.value = '';
    if (confirmNewPasswordInput) confirmNewPasswordInput.value = '';
    if (passwordError) {
        passwordError.textContent = '';
        passwordError.style.display = 'none';
    }
    
    // Показываем окно
    modal.style.display = 'flex';
    
    // Функция для проверки текущего пароля
    function validateCurrentPassword(password) {
        // Здесь должна быть реальная проверка пароля
        // Для демо используем хардкод или проверку с сервера
        
        // Демо: текущий пароль "admin123"
        const currentCorrectPassword = "admin123";
        
        return password === currentCorrectPassword;
    }
    
    // Функция валидации нового пароля
    function validateNewPassword(newPass, confirmPass) {
        const errors = [];
        
        // Проверка на минимальную длину
        if (newPass.length < 6) {
            errors.push('Пароль должен содержать минимум 6 символов');
        }
        
        // Проверка на совпадение паролей
        if (newPass !== confirmPass) {
            errors.push('Новые пароли не совпадают');
        }
        
        // Проверка на сложность (опционально)
        if (!/(?=.*[a-z])/.test(newPass)) {
            errors.push('Добавьте строчные буквы');
        }
        
        if (!/(?=.*[A-Z])/.test(newPass)) {
            errors.push('Добавьте заглавные буквы');
        }
        
        if (!/(?=.*\d)/.test(newPass)) {
            errors.push('Добавьте цифры');
        }
        
        // Проверка, что новый пароль не совпадает со старым
        if (newPass === currentPasswordInput.value) {
            errors.push('Новый пароль должен отличаться от старого');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
    
   // Исправленный обработчик изменения пароля
document.getElementById('confirmChangePassword').addEventListener('click', function() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    const passwordError = document.getElementById('passwordError');

    // Сброс ошибок
    passwordError.style.display = 'none';
    passwordError.textContent = '';

    // Валидация
    if (!currentPassword || !newPassword || !confirmNewPassword) {
        passwordError.textContent = 'Заполните все поля';
        passwordError.style.display = 'block';
        return;
    }

    // Проверка соответствия нового пароля и подтверждения
    if (newPassword !== confirmNewPassword) {
        passwordError.textContent = 'Новый пароль и подтверждение не совпадают';
        passwordError.style.display = 'block';
        return;
    }

    // Проверка длины нового пароля
    if (newPassword.length < 6) {
        passwordError.textContent = 'Новый пароль должен содержать минимум 6 символов';
        passwordError.style.display = 'block';
        return;
    }

    // В реальном приложении здесь будет проверка текущего пароля через API
    // Для демонстрации используем фиксированный пароль "admin123"
    const correctCurrentPassword = 'admin123';
    
    if (currentPassword !== correctCurrentPassword) {
        passwordError.textContent = 'Неверный текущий пароль';
        passwordError.style.display = 'block';
        return;
    }

    // Если все проверки пройдены
    showAlert('Пароль успешно изменен', 'success');
    document.getElementById('changePasswordModal').style.display = 'none';
    
    // Очистка полей
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
    
    // В реальном приложении здесь будет вызов API для изменения пароля
    console.log('Пароль изменен:', { 
        currentPassword: currentPassword, 
        newPassword: newPassword 
    });
});
        
        // Валидация нового пароля
        const validation = validateNewPassword(newPassword, confirmPassword);
        
        if (!validation.isValid) {
            passwordError.textContent = validation.errors.join('\n');
            passwordError.style.display = 'block';
            
            // Анимация ошибок
            newPasswordInput.classList.add('invalid');
            confirmNewPasswordInput.classList.add('invalid');
            setTimeout(() => {
                newPasswordInput.classList.remove('invalid');
                confirmNewPasswordInput.classList.remove('invalid');
            }, 1000);
            
            return;
        }
        
        // Если все проверки пройдены - меняем пароль
        // В реальном приложении здесь был бы запрос на сервер
        
        try {
            // Здесь должна быть логика смены пароля на сервере
            console.log('Пароль успешно изменен (в реальном приложении был бы запрос на сервер)');
            
            // Очищаем поля
            currentPasswordInput.value = '';
            newPasswordInput.value = '';
            confirmNewPasswordInput.value = '';
            
            // Закрываем окно
            modal.style.display = 'none';
            
            // Показываем сообщение об успехе
            showAlert('Пароль успешно изменен!', 'success');
            
        } catch (error) {
            console.error('Ошибка при изменении пароля:', error);
            passwordError.textContent = 'Ошибка при изменении пароля. Попробуйте еще раз.';
            passwordError.style.display = 'block';
        }
    };
    
    // Простой обработчик отмены
    document.querySelector('#changePasswordModal .close').onclick = function() {
        modal.style.display = 'none';
    };
    
    
    
   



        // Инициализация переключения темы
        function initThemeToggle() {
            const themeToggle = document.getElementById('themeToggle');
            themeToggle.addEventListener('click', toggleTheme);
            
            // Проверяем сохранённую тему
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        }

        // Переключение темы
        function toggleTheme() {
            const themeToggle = document.getElementById('themeToggle');
            
            if (document.body.classList.contains('dark-theme')) {
                document.body.classList.remove('dark-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.add('dark-theme');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            }
        }

        // Инициализация основной навигации
        function initNavigation() {
            const navTabs = document.querySelectorAll('.nav-tabs li');
            
            navTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    navTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    const navId = this.getAttribute('data-nav');
                    document.querySelectorAll('.page-content').forEach(content => {
                        content.style.display = 'none';
                    });
                    
                    document.getElementById(`${navId}-content`).style.display = 'block';
                    
                    switch(navId) {
                        case 'dashboard':
                            loadDashboard();
                            break;
                        case 'inventories':
                            loadInventories();
                            break;
                        case 'shops':
                            loadShops();
                            break;
                        case 'operators':
                            loadOperators();
                            break;
                        case 'reports':
                            loadReports();
                            break;
                        case 'settings':
                            loadSettings();
                            break;
                    }
                });
            });
        }

        // Инициализация бокового меню
        function initSidebarMenu() {
            const sidebarItems = document.querySelectorAll('.sidebar-menu li');
            
            sidebarItems.forEach(item => {
                item.addEventListener('click', function() {
                    sidebarItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    
                    const action = this.getAttribute('data-sidebar');
                    executeSidebarAction(action);
                });
            });
        }

        // Выполнение действий бокового меню
        function executeSidebarAction(action) {
            switch(action) {
                case 'dashboard':
                    showNavTab('dashboard');
                    loadDashboard();
                    break;
                case 'create-inventory':
                    document.getElementById('createInventoryModal').style.display = 'flex';
                    break;
                case 'upload-inventories':
                    document.getElementById('uploadInventoriesModal').style.display = 'flex';
                    fillInventorySelect();
                    break;
                case 'check-documents':
                    checkDocuments();
                    break;
                case 'history':
                    showNavTab('dashboard');
                    document.querySelector('.tab[data-tab="history"]').click();
                    break;
                case 'help':
                    showAlert('Открыт раздел помощи', 'info');
                    break;
            }
        }

        // Показать вкладку навигации
        function showNavTab(tabId) {
            document.querySelectorAll('.nav-tabs li').forEach(tab => tab.classList.remove('active'));
            document.querySelector(`.nav-tabs li[data-nav="${tabId}"]`).classList.add('active');
            
            document.querySelectorAll('.page-content').forEach(content => {
                content.style.display = 'none';
            });
            
            document.getElementById(`${tabId}-content`).style.display = 'block';
        }

        // Инициализация панели управления
        function initDashboard() {
            document.getElementById('refreshData').addEventListener('click', function() {
                loadDashboard();
                showAlert('Данные успешно обновлены', 'success');
            });
            
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    tabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    const tabId = this.getAttribute('data-tab');
                    document.querySelectorAll('.tab-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    
                    document.getElementById(`${tabId}-tab`).classList.add('active');
                });
            });
        }

        // Загрузка данных на панель управления
        function loadDashboard() {
    console.log(' Обновление панели управления...');
    
    // Обновляем итоговую разницу
    updateTotalDifference();
    
    // Обновляем таблицу инвентаризаций
    loadInventoriesTable();
    
    // Обновляем другие разделы...
    loadHistoryTable();
    loadDocumentsTable();
    
    console.log(' Панель управления обновлена');
}


// Функция обновления итоговой разницы
function updateTotalDifference() {
    const shopInventories = appData.inventories.filter(inv => 
        inv.shopId === appData.currentShop.id && inv.status === 'completed'
    );
    
    const totalDiff = shopInventories.reduce((sum, inv) => sum + (inv.difference || 0), 0);
    
    const totalDiffElement = document.getElementById('total-diff');
    if (totalDiffElement) {
        totalDiffElement.textContent = `${formatNumber(totalDiff)} ₽`;
        totalDiffElement.style.color = totalDiff >= 0 ? '#2ecc71' : '#e74c3c';
    }
}

        // Проверка открытых документов
        function checkOpenDocuments() {
            const shopDocuments = appData.documents.filter(doc => 
                doc.shopId === appData.currentShop.id && doc.status === 'open'
            );
            
            document.getElementById('openDocumentsAlert').style.display = 
                shopDocuments.length > 0 ? 'block' : 'none';
        }

        // Загрузка таблицы инвентаризаций
        function loadInventoriesTable() {
    const tbody = document.getElementById('inventory-table').querySelector('tbody');
    tbody.innerHTML = '';
    
    if (appData.inventories.length === 0) {
        appData.inventories = [
            { 
                id: '451000207', 
                type: 'general', 
                date: '24/05/2025', 
                reason: 'Мини-учет', 
                lines: 6, 
                amount: 4467.29, 
                difference: 0, 
                status: 'active',
                shopId: appData.currentShop.id,
                isClosed: false // НОВОЕ ПОЛЕ: не закрыта
            },
            { 
                id: '451000208', 
                type: 'general', 
                date: '18/06/2025', 
                reason: 'ИНВЕНТАРИЗАЦИЯ', 
                lines: 156543, 
                amount: -374.47, 
                difference: 374.47, // ЭТОТ ЗАПИСЬ УЖЕ ИМЕЕТ РАЗНИЦУ, НО ПУСТЬ БУДЕТ КАК ПРИМЕР
                status: 'active',
                shopId: appData.currentShop.id,
                isClosed: true // Закрыта, поэтому есть разница
            },
            { 
                id: '451000209', 
                type: 'alcohol', 
                date: '20/06/2025', 
                reason: 'Алкоголь', 
                lines: 2490, 
                amount: 6740934.50, 
                difference: -334092.76, // Уже закрыта
                status: 'active',
                shopId: appData.currentShop.id,
                isClosed: true
            },
            { 
                id: '451000210', 
                type: 'beer', 
                date: '20/06/2025', 
                reason: 'Пиво', 
                lines: 421, 
                amount: 849967.51, 
                difference: -21163.28, // Уже закрыта
                status: 'active',
                shopId: appData.currentShop.id,
                isClosed: true
            },
            { 
                id: '451000211', 
                type: 'cigarettes', 
                date: '20/06/2025', 
                reason: 'Сигареты', 
                lines: 286, 
                amount: 318281.00, 
                difference: -5095.93, // Уже закрыта
                status: 'active',
                shopId: appData.currentShop.id,
                isClosed: true
            }
        ];
    }
    
    const shopInventories = appData.inventories.filter(inv => inv.shopId === appData.currentShop.id);
    
    let totalDiff = 0; // Для общей разницы в хедере
    
    shopInventories.forEach(inv => {
        const row = document.createElement('tr');
        
        const statusCell = document.createElement('td');
        const statusIndicator = document.createElement('span');
        // Изменяем логику статуса: если закрыта - зеленый, если открыта - желтый
        if (inv.isClosed) {
            statusIndicator.className = 'status-indicator status-closed';
            statusIndicator.title = 'Закрыта';
        } else {
            statusIndicator.className = 'status-indicator status-active';
            statusIndicator.title = 'Активна (не закрыта)';
        }
        statusCell.appendChild(statusIndicator);
        row.appendChild(statusCell);
        
        row.appendChild(createCell(inv.id));
        row.appendChild(createCell(inv.date));
        row.appendChild(createCell(inv.reason));
        row.appendChild(createCell(inv.lines));
        row.appendChild(createCell(`${formatNumber(inv.amount)} ₽`));
        
        // ВАЖНОЕ ИЗМЕНЕНИЕ: отображаем разницу только для закрытых инвентаризаций
        const diffCell = document.createElement('td');
        const diffBadge = document.createElement('span');
        
        if (inv.isClosed) {
            // Если инвентаризация закрыта - показываем разницу
            diffBadge.className = `badge ${inv.difference >= 0 ? 'badge-success' : 'badge-danger'}`;
            diffBadge.textContent = `${inv.difference >= 0 ? '+' : ''}${formatNumber(inv.difference)} ₽`;
            // Суммируем для общей разницы
            totalDiff += inv.difference;
        } else {
            // Если не закрыта - показываем 0
            diffBadge.className = 'badge badge-secondary';
            diffBadge.textContent = '0 ₽';
            diffBadge.title = 'Инвентаризация еще не закрыта';
        }
        
        diffCell.appendChild(diffBadge);
        row.appendChild(diffCell);
        
        const actionsCell = document.createElement('td');
        
        const viewBtn = document.createElement('button');
        viewBtn.className = 'btn btn-primary btn-sm';
        viewBtn.innerHTML = '<i class="fas fa-eye"></i>';
        viewBtn.addEventListener('click', () => viewInventoryFull(inv.id));
        actionsCell.appendChild(viewBtn);
        
        const printShopBtn = document.createElement('button');
        printShopBtn.className = 'btn btn-secondary btn-sm';
        printShopBtn.innerHTML = '<i class="fas fa-print"></i>';
        printShopBtn.title = 'Печать для магазина';
        printShopBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            printDiscrepancies(inv.type);
        });
        actionsCell.appendChild(printShopBtn);
        
        const printAccountantBtn = document.createElement('button');
        printAccountantBtn.className = 'btn btn-secondary btn-sm';
        printAccountantBtn.innerHTML = '<i class="fas fa-file-invoice"></i>';
        printAccountantBtn.title = 'Печать для бухгалтера';
        printAccountantBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            printForAccountant(inv.id, inv.type);
        });
        actionsCell.appendChild(printAccountantBtn);
        
        // Изменяем логику кнопки "Завершить"
        if (!inv.isClosed) {
            const completeBtn = document.createElement('button');
            completeBtn.className = 'btn btn-success btn-sm';
            completeBtn.innerHTML = '<i class="fas fa-lock"></i>';
            completeBtn.title = 'Закрыть инвентаризацию';
            completeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                completeInventory(inv.id);
            });
            actionsCell.appendChild(completeBtn);
        } else {
            // Если уже закрыта - показываем другую кнопку или иконку
            const closedBadge = document.createElement('span');
            closedBadge.className = 'badge badge-success';
            closedBadge.innerHTML = '<i class="fas fa-check"></i> Закрыта';
            actionsCell.appendChild(closedBadge);
        }
        
        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });
    
    // Обновляем общую разницу в хедере (только закрытые)
    document.getElementById('total-diff').textContent = `${totalDiff >= 0 ? '+' : ''}${formatNumber(totalDiff)} ₽`;
}

function viewInventoryFull(inventoryId) {
    console.log('🔍 ОТКРЫТИЕ ПРОСМОТРА ИНВЕНТАРИЗАЦИИ');
    
    // Устанавливаем текущую инвентаризацию
    appData.currentInventoryId = Number(inventoryId);
    
    // Загружаем актуальные данные
    loadTerminalDataFromStorage();
    
    // Находим инвентаризацию в данных
    const inventory = appData.inventories.find(inv => inv.id == inventoryId);
    if (!inventory) {
        showAlert('Инвентаризация не найдена', 'error');
        return;
    }
    
    // Заполняем информацию об инвентаризации
    document.getElementById('inventoryIdFull').textContent = inventoryId;
    document.getElementById('inventoryTitleFull').textContent = `Инвентаризация #${inventoryId}`;
    document.getElementById('inventoryDateTextFull').textContent = inventory.date || 'Не указана';
    document.getElementById('inventoryReasonTextFull').textContent = inventory.reason || 'Не указана';
    document.getElementById('inventoryAmountFull').textContent = inventory.amount ? `${inventory.amount} ₽` : '0 ₽';
    
    // ВАЖНО: Отображаем разницу только если инвентаризация закрыта
    if (inventory.isClosed) {
        document.getElementById('inventoryDifferenceFull').textContent = 
            inventory.difference ? `${inventory.difference >= 0 ? '+' : ''}${inventory.difference} ₽` : '0 ₽';
        document.getElementById('inventoryDifferenceFull').className = 
            inventory.difference >= 0 ? 'text-success' : 'text-danger';
    } else {
        document.getElementById('inventoryDifferenceFull').textContent = '0 ₽ (не закрыта)';
        document.getElementById('inventoryDifferenceFull').className = 'text-secondary';
    }
    
    // ВАЖНО: Обновляем кнопку "Добавить опись" в зависимости от статуса
    const addInventoryItemBtnFull = document.getElementById('addInventoryItemBtnFull');
    if (addInventoryItemBtnFull) {
        if (inventory.isClosed) {
            // Инвентаризация закрыта - кнопка неактивна
            addInventoryItemBtnFull.disabled = true;
            addInventoryItemBtnFull.innerHTML = '<i class="fas fa-ban"></i> Инвентаризация закрыта';
            addInventoryItemBtnFull.className = 'btn btn-secondary';
            addInventoryItemBtnFull.title = 'Невозможно добавить опись в закрытую инвентаризацию';
        } else {
            // Инвентаризация открыта - кнопка активна
            addInventoryItemBtnFull.disabled = false;
            addInventoryItemBtnFull.innerHTML = '<i class="fas fa-plus"></i> Добавить опись';
            addInventoryItemBtnFull.className = 'btn btn-success';
            addInventoryItemBtnFull.title = 'Добавить новую опись';
        }
    }
    
    // Обновляем таблицу описей
    updateInventoryOperatorsTableFull(inventoryId);
    
    // Показываем окно
    document.getElementById('viewInventoryFullScreen').style.display = 'block';
    
    console.log(' Просмотр открыт. Статус инвентаризации:', inventory.isClosed ? 'ЗАКРЫТА' : 'ОТКРЫТА');
}
		
		// В функции, которая вызывается при клике на инвентаризацию:
function openInventoryDetails(inventoryId) {
    // Загружаем свежие данные
    loadInventoryData();
    
    // Устанавливаем текущий ID
    appData.currentInventoryId = inventoryId;
    saveInventoryData();
    
    // Открываем просмотр
    viewInventoryFull(inventoryId);
}

        // Редактирование описи инвентаризации
        function editInventoryItem(item) {
            document.getElementById('itemOperator').value = item.terminalId;
            document.getElementById('itemDate').value = formatDateForInput(item.date);
            document.getElementById('itemName').value = item.name;
            document.getElementById('itemLines').value = item.lines;
            document.getElementById('itemQuantity').value = item.quantity;
            
            // Сохраняем текущую опись для обновления
            appData.currentInventoryItem = item;
            
            document.getElementById('viewInventoryFullScreen').style.display = 'none';
            document.getElementById('addInventoryItemModal').style.display = 'flex';
            
            // Изменяем заголовок и кнопку подтверждения
            document.querySelector('#addInventoryItemModal .modal-header h2').textContent = 'Редактировать опись';
            document.getElementById('confirmAddInventoryItem').textContent = 'Сохранить';
        }

        // Просмотр товаров в описи в полноэкранном режиме
        function viewInventoryItemsFull(inventoryItem) {
            document.getElementById('inventoryItemTitleFull').textContent = inventoryItem.name;
            document.getElementById('inventoryItemOperatorFull').textContent = `${inventoryItem.operatorName} (Терминал #${inventoryItem.terminalId})`;
            document.getElementById('inventoryItemDateFull').textContent = inventoryItem.date;
            document.getElementById('inventoryItemLinesFull').textContent = inventoryItem.lines;
            document.getElementById('inventoryItemTotalQuantityFull').textContent = formatNumber(inventoryItem.quantity);
            
            // Сохраняем текущую опись
            appData.currentInventoryItem = inventoryItem;
            appData.currentInventoryItems = [...inventoryItem.items];
            
            const tbody = document.getElementById('inventory-items-table-full').querySelector('tbody');
            tbody.innerHTML = '';
            
            if (inventoryItem.items && inventoryItem.items.length > 0) {
                inventoryItem.items.forEach((item, index) => {
                    const row = document.createElement('tr');
                    
                    const barcodeCell = document.createElement('td');
                    barcodeCell.textContent = item.barcode;
                    row.appendChild(barcodeCell);
                    
                    const nameCell = document.createElement('td');
                    nameCell.textContent = item.name;
                    row.appendChild(nameCell);
                    
                    const quantityCell = document.createElement('td');
                    quantityCell.textContent = formatNumber(item.quantity);
                    row.appendChild(quantityCell);
                    
                    const actionsCell = document.createElement('td');
                    
                    const editBtn = document.createElement('button');
                    editBtn.className = 'btn btn-warning btn-sm';
                    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
                    editBtn.addEventListener('click', () => editItem(index));
                    actionsCell.appendChild(editBtn);
                    
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'btn btn-danger btn-sm';
                    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
                    deleteBtn.addEventListener('click', () => deleteItem(index));
                    actionsCell.appendChild(deleteBtn);
                    
                    row.appendChild(actionsCell);
                    tbody.appendChild(row);
                });
            } else {
                const row = document.createElement('tr');
                const emptyCell = document.createElement('td');
                emptyCell.colSpan = 4;
                emptyCell.textContent = 'Нет данных о товарах в этой описи';
                emptyCell.style.textAlign = 'center';
                row.appendChild(emptyCell);
                tbody.appendChild(row);
            }
            
            // Показываем полноэкранное окно
            document.getElementById('viewInventoryItemsFullScreen').style.display = 'block';
            
            // Обработчик закрытия модального окна
            document.getElementById('closeViewInventoryItemsFull').addEventListener('click', function() {
                document.getElementById('viewInventoryItemsFullScreen').style.display = 'none';
            });
            
            // Обработчик кнопки сохранения изменений
            document.getElementById('saveInventoryItemsBtn').addEventListener('click', function() {
                saveInventoryItems();
            });
            
            
            
        }
		
		
		
let addItemCallCount = 0;

function addItemToInventory() {
    console.log(' НАЧАЛО addItemToInventory');
    
    // Получаем значения
    const barcodeInput = document.getElementById('itemBarcode');
    const quantityInput = document.getElementById('itemQuantity');
    
    if (!barcodeInput || !quantityInput) {
        console.error(' Не найдены поля формы');
        showAlert('Ошибка формы', 'error');
        return;
    }
    
    const barcode = barcodeInput.value.trim();
    const quantityStr = quantityInput.value.trim();
    
    console.log(' Введенные данные:', { barcode, quantityStr });
    
    // ==============================
    // ПРОВЕРКА 1: ОБЯЗАТЕЛЬНЫЕ ПОЛЯ
    // ==============================
    if (!barcode) {
        showAlert('Введите штрихкод товара', 'warning');
        barcodeInput.focus();
        return;
    }
    
    if (!quantityStr) {
        showAlert('Введите количество товара', 'warning');
        quantityInput.focus();
        return;
    }
    
    // ==============================
    // ПРОВЕРКА 2: ФОРМАТ ШТРИХКОДА
    // ==============================
    // Проверяем, что штрихкод содержит только цифры
    if (!/^\d+$/.test(barcode)) {
        showAlert('Штрихкод должен содержать только цифры', 'warning');
        barcodeInput.focus();
        barcodeInput.select();
        return;
    }
    
    
    
    // ==============================
    // ПРОВЕРКА 3: ВАЛИДАЦИЯ КОЛИЧЕСТВА
    // ==============================
    const quantity = parseFloat(quantityStr.replace(',', '.'));
    
    // Проверяем, что это число
    if (isNaN(quantity) || !isFinite(quantity)) {
        showAlert('Введите корректное число для количества', 'warning');
        quantityInput.focus();
        quantityInput.select();
        return;
    }
    
    // Проверяем, что больше 0
    if (quantity <= 0) {
        showAlert('Количество должно быть больше 0', 'warning');
        quantityInput.focus();
        quantityInput.select();
        return;
    }
    
    // Проверяем максимальное значение
    const MAX_QUANTITY = 10000;
    if (quantity > MAX_QUANTITY) {
        showAlert(`Количество не может превышать ${MAX_QUANTITY}`, 'warning');
        quantityInput.focus();
        quantityInput.select();
        return;
    }
    
    // Проверяем точность (максимум 3 знака после запятой)
    const decimalPlaces = (quantityStr.replace(',', '.').split('.')[1] || '').length;
    if (decimalPlaces > 3) {
        showAlert('Количество не может содержать более 3 знаков после запятой', 'warning');
        quantityInput.focus();
        quantityInput.select();
        return;
    }
    
    // ==============================
    // ПРОВЕРКА 4: ВАЛИДНОСТЬ ДАННЫХ
    // ==============================
    if (!appData.currentInventoryItem) {
        showAlert('Не выбрана опись для добавления товара', 'error');
        return;
    }
    
    console.log(' Валидация пройдена');
    
    // ==============================
    // ПРОВЕРКА 5: СТАТУС ИНВЕНТАРИЗАЦИИ
    // ==============================
    // Проверяем, не закрыта ли инвентаризация
    if (appData.currentInventoryId) {
        const inventory = appData.inventories.find(inv => inv.id == appData.currentInventoryId);
        if (inventory && inventory.isClosed) {
            showAlert('Невозможно добавить товар. Инвентаризация закрыта!', 'error');
            document.getElementById('addItemModal').style.display = 'none';
            return;
        }
    }
    
    // ==============================
    // ПОИСК И СОЗДАНИЕ ТОВАРА
    // ==============================
    // Получаем тип инвентаризации
    let inventoryType = 'general';
    if (appData.currentInventoryItem && appData.currentInventoryItem.inventoryType) {
        inventoryType = appData.currentInventoryItem.inventoryType;
    } else if (appData.currentInventoryId) {
        const inventory = appData.inventories.find(inv => inv.id === appData.currentInventoryId);
        if (inventory && inventory.type) {
            inventoryType = inventory.type;
        }
    }
    
    console.log('Текущий тип инвентаризации:', inventoryType);
    
    // ПОИСК ТОВАРА ПО ШТРИХКОДУ С ПРОВЕРКОЙ ТИПА
    let productInfo;
    
    // 1. Используем функцию findProductByBarcode, которая проверяет тип
    productInfo = findProductByBarcode(barcode, inventoryType);
    
    // 2. ПРОВЕРЯЕМ, ПОДХОДИТ ЛИ ТОВАР ДЛЯ ЭТОЙ ИНВЕНТАРИЗАЦИИ
    if (productInfo.errorMessage || !productInfo.isValidForInventory) {
        // ВАЖНО: Используем только showAlert для отображения ошибки
        showAlert(productInfo.errorMessage || 'Этот товар не подходит для данной инвентаризации', 'error');
        
        // Очищаем форму и фокусируемся на штрихкоде
        barcodeInput.value = '';
        quantityInput.value = '';
        barcodeInput.focus();
        return; // Прекращаем выполнение функции
    }
    
    // 3. Если товар не найден в базе (сгенерирован случайный) - проверяем его тип
    if (productInfo.isRandom && productInfo.type) {
        const isValid = isProductValidForInventory(productInfo.type, inventoryType);
        if (!isValid) {
            showAlert(getTypeErrorMessage(productInfo.type, inventoryType), 'error');
            barcodeInput.value = '';
            quantityInput.value = '';
            barcodeInput.focus();
            return; // Прекращаем выполнение функции
        }
    }
    
    // ==============================
    // ПРОВЕРКА 6: ВАЛИДАЦИЯ ЦЕНЫ
    // ==============================
    if (!productInfo.price || productInfo.price <= 0) {
        productInfo.price = 100.00; // Цена по умолчанию
        console.log(' Установлена цена по умолчанию:', productInfo.price);
    }
    
    console.log(' Найден/сгенерирован товар:', productInfo);
    
    // ==============================
    // СОЗДАНИЕ ОБЪЕКТА ТОВАРА
    // ==============================
    const newItem = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        barcode: barcode,
        name: productInfo.name,
        price: productInfo.price,
        category: productInfo.category,
        group: productInfo.group || '',
        type: productInfo.type || 'general', // Сохраняем тип товара!
        quantity: parseFloat(quantity.toFixed(3)), // Округляем до 3 знаков
        addedDate: new Date().toLocaleString('ru-RU'),
        isRandom: productInfo.isRandom || false,
        inventoryType: inventoryType,
        isValidForInventory: productInfo.isValidForInventory
    };
    
    // Вычисляем общую стоимость
    newItem.totalPrice = parseFloat((newItem.quantity * newItem.price).toFixed(2));
    
    console.log(' Создан товар для добавления:', newItem);
    
    // ==============================
    // ПРОВЕРКА 7: ДУБЛИРОВАНИЕ ТОВАРА
    // ==============================
    // ВАЖНО: Работаем только с ОДНИМ массивом!
    
    // 1. Проверяем, инициализирован ли массив товаров в описи
    if (!appData.currentInventoryItem.items) {
        appData.currentInventoryItem.items = [];
    }
    
    // 2. Ищем, есть ли такой товар уже в описи
    const existingItemIndex = appData.currentInventoryItem.items.findIndex(item => 
        item.barcode === barcode
    );
    
    if (existingItemIndex !== -1) {
        // Если товар уже есть - спрашиваем пользователя
        const existingItem = appData.currentInventoryItem.items[existingItemIndex];
        const newTotalQuantity = existingItem.quantity + newItem.quantity;
        
        if (newTotalQuantity > MAX_QUANTITY) {
            showAlert(`Общее количество товара "${existingItem.name}" превысит максимальное значение ${MAX_QUANTITY}`, 'warning');
            return;
        }
        
        const userChoice = confirm(
            `Товар "${existingItem.name}" уже есть в описи.\n\n` +
            `Текущее количество: ${existingItem.quantity}\n` +
            `Добавляемое количество: ${newItem.quantity}\n` +
            `Новое общее количество: ${newTotalQuantity.toFixed(3)}\n\n` +
            `Увеличить количество существующего товара?`
        );
        
        if (!userChoice) {
            console.log(' Пользователь отменил добавление');
            return;
        }
        
        console.log(' Увеличиваем количество существующего товара');
        appData.currentInventoryItem.items[existingItemIndex].quantity = newTotalQuantity;
        
        // Обновляем общую стоимость
        appData.currentInventoryItem.items[existingItemIndex].totalPrice = 
            parseFloat((newTotalQuantity * existingItem.price).toFixed(2));
    } else {
        // Если товара нет - добавляем новый
        console.log(' Добавляем новый товар');
        appData.currentInventoryItem.items.push(newItem);
    }
    
    // 3. Обновляем currentInventoryItems (это ссылка на тот же массив!)
    appData.currentInventoryItems = appData.currentInventoryItem.items;
    
    console.log(' Товар добавлен. Всего товаров в описи:', appData.currentInventoryItem.items.length);
    
    // ==============================
    // ОБНОВЛЕНИЕ ИНТЕРФЕЙСА
    // ==============================
    // 4. Обновляем таблицу товаров
    updateInventoryItemsTable();
    
    // 5. Закрываем модальное окно
    document.getElementById('addItemModal').style.display = 'none';
    
    // 6. Очищаем форму
    clearAddItemForm();
    
    // 7. Уведомление
    const successMessage = existingItemIndex !== -1 
        ? `Количество товара "${productInfo.name}" увеличено. Новое количество: ${appData.currentInventoryItem.items[existingItemIndex].quantity}`
        : `Товар "${productInfo.name}" добавлен в опись. Количество: ${newItem.quantity}`;
    
    showAlert(successMessage, 'success');
    
    // 8. Сохраняем изменения
    saveTerminalDataToStorage();
    
    // 9. Обновляем статистику описи
    updateOperatorStatistics(appData.currentInventoryItem.id);
    
    console.log(' КОНЕЦ addItemToInventory - товар добавлен');
    console.log(' Проверка на дублирование...');
    checkItemDuplication();
}


// Функция обновления статистики описи
function updateOperatorStatistics(operatorId) {
    // Находим опись в terminalData
    const inventoryId = appData.currentInventoryId;
    const operators = appData.terminalData[inventoryId] || [];
    const operator = operators.find(op => op.id === operatorId);
    
    if (operator && operator.items) {
        // Обновляем общее количество товаров
        operator.quantity = parseFloat(operator.items.reduce((sum, item) => {
            return sum + (item.quantity || 0);
        }, 0).toFixed(3));
        
        // Обновляем количество строк
        operator.lines = operator.items.length;
        
        // Обновляем сумму
        operator.totalAmount = parseFloat(operator.items.reduce((sum, item) => {
            return sum + ((item.quantity || 0) * (item.price || 0));
        }, 0).toFixed(2));
        
        console.log(' Статистика описи обновлена:', {
            товаров: operator.lines,
            количество: operator.quantity,
            сумма: operator.totalAmount
        });
        
        // Сохраняем изменения
        saveTerminalDataToStorage();
    }
}




// В инициализации добавьте обработчики ввода
function initItemInputValidation() {
    const barcodeInput = document.getElementById('itemBarcode');
    const quantityInput = document.getElementById('itemQuantity');
    
    if (barcodeInput) {
        barcodeInput.addEventListener('input', function(e) {
            // Удаляем все не-цифры при вводе
            this.value = this.value.replace(/\D/g, '');
            
            // Ограничиваем длину
            if (this.value.length > 13) {
                this.value = this.value.substring(0, 13);
            }
            
            // Визуальная обратная связь
            if (this.value.length >= 8) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else if (this.value.length > 0) {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-valid', 'is-invalid');
            }
        });
        
        // При потере фокуса проверяем длину
        barcodeInput.addEventListener('blur', function() {
            if (this.value.length > 0 && this.value.length < 8) {
                this.classList.add('is-invalid');
            }
        });
    }
    
    if (quantityInput) {
        quantityInput.addEventListener('input', function(e) {
            // Разрешаем цифры, точку и запятую
            this.value = this.value.replace(/[^\d,.]/g, '');
            
            // Заменяем запятую на точку
            if (this.value.includes(',')) {
                this.value = this.value.replace(',', '.');
            }
            
            // Убираем лишние точки
            const parts = this.value.split('.');
            if (parts.length > 2) {
                this.value = parts[0] + '.' + parts.slice(1).join('');
            }
            
            // Проверяем значение
            const num = parseFloat(this.value);
            if (this.value && !isNaN(num) && num > 0 && num <= 999999) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else if (this.value) {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-valid', 'is-invalid');
            }
        });
    }
}

// Вызовите в инициализации
document.addEventListener('DOMContentLoaded', function() {
    initItemInputValidation();
    // ... остальная инициализация
});



// Добавьте эту функцию (она отсутствовала):
function initEditItemFunctionality() {
    console.log('🔧 ИНИЦИАЛИЗАЦИЯ РЕДАКТИРОВАНИЯ ТОВАРОВ');
    
    // Кнопка сохранения редактирования
    const confirmEditItemBtn = document.getElementById('confirmEditItem');
    if (confirmEditItemBtn) {
        // Удаляем старые обработчики
        confirmEditItemBtn.replaceWith(confirmEditItemBtn.cloneNode(true));
        const newBtn = document.getElementById('confirmEditItem');
        
        // Добавляем новый обработчик
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            saveEditedItem();
        });
    }
    
    // Кнопка отмены редактирования
    const cancelEditItemBtn = document.getElementById('cancelEditItem');
    if (cancelEditItemBtn) {
        cancelEditItemBtn.addEventListener('click', function() {
            document.getElementById('editItemModal').style.display = 'none';
        });
    }
    
    // Закрытие по крестику
    const editModalClose = document.querySelector('#editItemModal .close');
    if (editModalClose) {
        editModalClose.addEventListener('click', function() {
            document.getElementById('editItemModal').style.display = 'none';
        });
    }
    
    console.log(' Редактирование товаров инициализировано');
}

// В функции, которая открывает модальное окно редактирования, добавьте:
function openEditItemModal(itemIndex) {
    console.log(' Открытие модального окна редактирования для индекса:', itemIndex);
    
    if (!appData.currentInventoryItems || !appData.currentInventoryItems[itemIndex]) {
        showAlert('Товар не найден', 'error');
        return;
    }
    
    const item = appData.currentInventoryItems[itemIndex];
    
    // Заполняем поля формы
    document.getElementById('editItemBarcode').value = item.barcode;
    document.getElementById('editItemName').value = item.name;
    document.getElementById('editItemQuantity').value = item.quantity;
    document.getElementById('editItemIndex').value = itemIndex;
    
    // Сбрасываем стили валидации
    document.getElementById('editItemBarcode').classList.remove('is-valid', 'is-invalid');
    document.getElementById('editItemName').classList.remove('is-valid', 'is-invalid');
    document.getElementById('editItemQuantity').classList.remove('is-valid', 'is-invalid');
    
    // Показываем модальное окно
    document.getElementById('editItemModal').style.display = 'flex';
    
    // Фокус на штрихкод
    setTimeout(() => {
        document.getElementById('editItemBarcode').focus();
    }, 100);
}

function saveEditedItem() {
    console.log('💾 СОХРАНЕНИЕ ИЗМЕНЕНИЙ ТОВАРА - НАЧАЛО');
    
    // Показываем лоадер на кнопке
    const saveButton = document.getElementById('confirmEditItem');
    const originalText = saveButton.innerHTML;
    saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Сохранение...';
    saveButton.disabled = true;
    
    try {
        // Получаем значения из формы
        const barcodeInput = document.getElementById('editItemBarcode');
        const nameInput = document.getElementById('editItemName');
        const quantityInput = document.getElementById('editItemQuantity');
        const indexInput = document.getElementById('editItemIndex');
        
        if (!barcodeInput || !nameInput || !quantityInput || !indexInput) {
            throw new Error('Не найдены поля формы');
        }
        
        const barcode = barcodeInput.value.trim();
        const name = nameInput.value.trim();
        const quantityStr = quantityInput.value.trim();
        const itemIndex = indexInput.value;
        
        console.log(' Данные для сохранения:', { barcode, name, quantityStr, itemIndex });
        
        // ==============================
        // ВАЛИДАЦИЯ
        // ==============================
        const errors = [];
        
        if (!barcode) {
            errors.push('Введите штрихкод товара');
        }
        
        if (!name) {
            errors.push('Введите название товара');
        }
        
        if (!quantityStr) {
            errors.push('Введите количество товара');
        }
        
        if (errors.length > 0) {
            showAlert(errors.join('\n'), 'warning');
            throw new Error('Валидация не пройдена');
        }
        
        const quantity = parseFloat(quantityStr.replace(',', '.'));
        
        if (isNaN(quantity) || !isFinite(quantity)) {
            showAlert('Введите корректное число для количества', 'warning');
            throw new Error('Некорректное количество');
        }
        
        if (quantity <= 0) {
            showAlert('Количество должно быть больше 0', 'warning');
            throw new Error('Количество ≤ 0');
        }
        
        if (quantity > 10000) {
            showAlert('Количество не может превышать 10000', 'warning');
            throw new Error('Количество > 10000');
        }
        
        const decimalPlaces = (quantityStr.replace(',', '.').split('.')[1] || '').length;
        if (decimalPlaces > 3) {
            showAlert('Количество не может содержать более 3 знаков после запятой', 'warning');
            throw new Error('Слишком много знаков после запятой');
        }
        
        if (!itemIndex || isNaN(itemIndex)) {
            throw new Error('Неверный индекс товара');
        }
        
        const index = parseInt(itemIndex);
        const items = appData.currentInventoryItem?.items || [];
        
        if (index < 0 || index >= items.length) {
            throw new Error('Товар не найден');
        }
        
        // ==============================
        // ПОИСК ЦЕНЫ ТОВАРА
        // ==============================
        let price = items[index].price || 0;
        let category = items[index].category || '';
        let group = items[index].group || '';
        
        // Если изменился штрихкод, ищем новый товар
        if (barcode !== items[index].barcode) {
            console.log(' Штрихкод изменен, ищем новый товар...');
            
            // Определяем тип инвентаризации
            let inventoryType = 'general';
            if (appData.currentInventoryItem && appData.currentInventoryItem.inventoryType) {
                inventoryType = appData.currentInventoryItem.inventoryType;
            } else if (appData.currentInventoryId) {
                const inventory = appData.inventories.find(inv => inv.id == appData.currentInventoryId);
                if (inventory && inventory.type) {
                    inventoryType = inventory.type;
                }
            }
            
            // Ищем товар в базе
            const productInfo = findProductByBarcode(barcode, inventoryType);
            
            if (productInfo) {
                price = productInfo.price || 100.00;
                category = productInfo.category || '';
                group = productInfo.group || '';
                console.log(' Обновлена цена:', price);
            } else {
                console.log('️ Товар не найден, оставляем старую цену');
            }
        }
        
        // ==============================
        // ПРОВЕРКА ДУБЛИРОВАНИЯ
        // ==============================
        const duplicateItemIndex = items.findIndex((item, i) => 
            i !== index && item.barcode === barcode
        );
        
        if (duplicateItemIndex !== -1) {
            const duplicateItem = items[duplicateItemIndex];
            const confirmMerge = confirm(
                `Товар с штрихкодом "${barcode}" уже есть в описи.\n\n` +
                `Существующий товар: "${duplicateItem.name}"\n` +
                `Количество: ${duplicateItem.quantity}\n\n` +
                `Объединить с существующим товаром?`
            );
            
            if (confirmMerge) {
                // Объединяем количество
                items[duplicateItemIndex].quantity += quantity;
                items[duplicateItemIndex].quantity = parseFloat(items[duplicateItemIndex].quantity.toFixed(3));
                
                // Обновляем сумму
                items[duplicateItemIndex].totalPrice = 
                    parseFloat((items[duplicateItemIndex].quantity * items[duplicateItemIndex].price).toFixed(2));
                
                // Удаляем редактируемый товар
                items.splice(index, 1);
                
                // Обновляем интерфейс
                updateInventoryItemsTable();
                
                // Закрываем модальное окно
                document.getElementById('editItemModal').style.display = 'none';
                
                // Уведомление
                showAlert(`Товар объединен. Новое количество: ${items[duplicateItemIndex].quantity}`, 'success');
                
                // Сохраняем
                saveTerminalDataToStorage();
                updateOperatorStatistics(appData.currentInventoryItem.id);
                
                return;
            } else {
                showAlert('Измените штрихкод или объедините товары', 'warning');
                throw new Error('Дублирование не разрешено');
            }
        }
        
        // ==============================
        // СОХРАНЕНИЕ ИЗМЕНЕНИЙ
        // ==============================
        console.log(' Сохранение изменений товара...');
        
        // Сохраняем старые значения для логирования
        const oldItem = { ...items[index] };
        
        // Обновляем товар
        items[index] = {
            ...items[index], // Сохраняем существующие свойства
            barcode: barcode,
            name: name,
            price: price,
            category: category,
            group: group,
            quantity: parseFloat(quantity.toFixed(3)),
            totalPrice: parseFloat((quantity * price).toFixed(2)),
            editedAt: new Date().toLocaleString('ru-RU'),
            editedBy: appData.currentUser.name
        };
        
        console.log(' Товар обновлен:', {
            'До': oldItem,
            'После': items[index]
        });
        
        // Обновляем интерфейс
        updateInventoryItemsTable();
        
        // Закрываем модальное окно
        document.getElementById('editItemModal').style.display = 'none';
        
        // Уведомление
        showAlert(`Товар "${name}" успешно обновлен`, 'success');
        
        // Сохраняем изменения
        saveTerminalDataToStorage();
        
        // Обновляем статистику описи
        updateOperatorStatistics(appData.currentInventoryItem.id);
        
        console.log(' СОХРАНЕНИЕ ИЗМЕНЕНИЙ ТОВАРА - УСПЕХ');
        
    } catch (error) {
        console.error(' Ошибка при сохранении товара:', error.message);
        showAlert(`Ошибка сохранения: ${error.message}`, 'error');
    } finally {
        // Восстанавливаем кнопку
        saveButton.innerHTML = originalText;
        saveButton.disabled = false;
    }
}

function initEditItemHandlers() {
    console.log(' ИНИЦИАЛИЗАЦИЯ ОБРАБОТЧИКОВ РЕДАКТИРОВАНИЯ');
    
    // 1. Кнопка "Сохранить изменения" - ГЛАВНЫЙ ОБРАБОТЧИК
    const confirmEditItemBtn = document.getElementById('confirmEditItem');
    if (confirmEditItemBtn) {
        console.log(' Найдена кнопка "Сохранить изменения"');
        
        // Удаляем все старые обработчики
        const newBtn = confirmEditItemBtn.cloneNode(true);
        confirmEditItemBtn.parentNode.replaceChild(newBtn, confirmEditItemBtn);
        
        // Добавляем новый обработчик
        document.getElementById('confirmEditItem').addEventListener('click', function(e) {
            console.log('🖱️ НАЖАТИЕ КНОПКИ "Сохранить изменения"');
            e.preventDefault();
            e.stopPropagation();
            saveEditedItem();
        });
        
        // Добавляем обработчик нажатия Enter
        document.getElementById('confirmEditItem').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveEditedItem();
            }
        });
    } else {
        console.error(' Не найдена кнопка "confirmEditItem"');
    }
    
    // 2. Кнопка "Отмена"
    const cancelEditItemBtn = document.getElementById('cancelEditItem');
    if (cancelEditItemBtn) {
        cancelEditItemBtn.addEventListener('click', function() {
            document.getElementById('editItemModal').style.display = 'none';
        });
    }
    
    // 3. Закрытие по крестику
    const editModalClose = document.querySelector('#editItemModal .close');
    if (editModalClose) {
        editModalClose.addEventListener('click', function() {
            document.getElementById('editItemModal').style.display = 'none';
        });
    }
    
    // 4. Закрытие по клику вне окна
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('editItemModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 5. Обработка Enter в полях формы
    const editItemBarcode = document.getElementById('editItemBarcode');
    if (editItemBarcode) {
        editItemBarcode.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                document.getElementById('editItemQuantity').focus();
            }
        });
    }
    
    const editItemQuantity = document.getElementById('editItemQuantity');
    if (editItemQuantity) {
        editItemQuantity.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveEditedItem();
            }
        });
    }
    
    console.log(' Обработчики редактирования инициализированы');
}

// Добавьте эту функцию для автозаполнения
function initBarcodeAutoFill() {
    const barcodeInput = document.getElementById('itemBarcode');
    if (!barcodeInput) return;
    
    barcodeInput.addEventListener('input', function(e) {
        const barcode = this.value.trim();
        
        // Скрываем информацию о товаре
        const productInfoDiv = document.getElementById('barcodeProductInfo');
        const autoFillAlert = document.getElementById('autoFillAlert');
        
        if (productInfoDiv) productInfoDiv.style.display = 'none';
        if (autoFillAlert) autoFillAlert.style.display = 'none';
        
        // Если введено достаточно цифр (минимум 8)
        const digitsOnly = barcode.replace(/\D/g, '');
        if (digitsOnly.length >= 8) {
            // Ищем товар
            const productInfo = findProductByBarcode(barcode);
            
            if (productInfo && productInfoDiv) {
                // Показываем информацию о товаре
                document.getElementById('detectedProductName').textContent = productInfo.name;
                document.getElementById('detectedProductCategory').textContent = productInfo.category;
                productInfoDiv.style.display = 'block';
                
                // Показываем предупреждение, если товар сгенерирован случайно
                if (productInfo.isRandom && autoFillAlert) {
                    autoFillAlert.style.display = 'block';
                    autoFillAlert.innerHTML = `
                        <i class="fas fa-exclamation-triangle"></i> 
                        Товар не найден в базе. Создан автоматический вариант.
                    `;
                }
            }
            
            // Автофокус на поле количества
            const quantityInput = document.getElementById('itemQuantity');
            if (quantityInput) {
                setTimeout(() => quantityInput.focus(), 100);
            }
        }
    });
    
    // Обработка нажатия Enter в поле штрихкода
    barcodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const quantityInput = document.getElementById('itemQuantity');
            if (quantityInput) {
                quantityInput.focus();
            }
        }
    });
}


// Исправленная функция:
function initAllItemFunctions() {
    console.log(' ИНИЦИАЛИЗАЦИЯ ФУНКЦИЙ ДЛЯ ТОВАРОВ');
    
    // Инициализация добавления товара
    initAddItemFunctionality();
    
    // Инициализация автозаполнения по штрихкоду
    initBarcodeAutoFill();
    
    // Инициализация редактирования товара (если есть элементы)
    const editItemModal = document.getElementById('editItemModal');
    const confirmEditItemBtn = document.getElementById('confirmEditItem');
    
    if (editItemModal && confirmEditItemBtn) {
        initEditItemFunctionality();
    } else {
        console.log('️ Элементы для редактирования товара не найдены, пропускаем инициализацию');
    }
    
    // Инициализация кнопки сохранения
    initSaveButton();
    
    console.log(' Функции для товаров инициализированы');
}

// Функция инициализации кнопки сохранения (если её нет):
function initSaveButton() {
    const saveItemsBtn = document.getElementById('saveInventoryItemsBtn');
    if (saveItemsBtn) {
        saveItemsBtn.addEventListener('click', function() {
            saveInventoryItems();
        });
    }
}

// Вызовите эту функцию при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log(' Документ загружен, инициализируем редактирование...');
    
    // Даем время на загрузку DOM
    setTimeout(() => {
        initEditItemHandlers();
        console.log(' Инициализация редактирования завершена');
    }, 500);
});

document.getElementById('editItemModal')?.addEventListener('show', function() {
    console.log(' Модальное окно редактирования открыто, переинициализируем обработчики');
    setTimeout(() => {
        initEditItemHandlers();
    }, 100);
});






function initItemManagement() {
    console.log(' ИНИЦИАЛИЗАЦИЯ УПРАВЛЕНИЯ ТОВАРАМИ');
    
    // Кнопка добавления товара
    const addItemBtn = document.getElementById('addItemBtn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', function() {
            document.getElementById('addItemModal').style.display = 'flex';
            document.getElementById('itemBarcode').focus();
        });
    }
    
    // Кнопка сохранения товаров
    const saveItemsBtn = document.getElementById('saveInventoryItemsBtn');
    if (saveItemsBtn) {
        saveItemsBtn.addEventListener('click', function() {
            saveInventoryItems();
        });
    }
    
    // Закрытие окон
    initModalClosures();
    
    console.log(' Управление товарами инициализировано');
}

function initModalClosures() {
    // Закрытие модального окна добавления товара
    const cancelAddItem = document.getElementById('cancelAddItem');
    if (cancelAddItem) {
        cancelAddItem.addEventListener('click', function() {
            document.getElementById('addItemModal').style.display = 'none';
            clearAddItemForm();
        });
    }
    
    // Закрытие модального окна редактирования товара
    const cancelEditItem = document.getElementById('cancelEditItem');
    if (cancelEditItem) {
        cancelEditItem.addEventListener('click', function() {
            document.getElementById('editItemModal').style.display = 'none';
        });
    }
    
    // Закрытие по крестику
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) modal.style.display = 'none';
        });
    });
    
    // Закрытие по клику вне модального окна
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}

        // Редактирование товара
        function editItem(index) {
            if (index >= 0 && index < appData.currentInventoryItems.length) {
                const item = appData.currentInventoryItems[index];
                document.getElementById('editItemBarcode').value = item.barcode;
                document.getElementById('editItemName').value = item.name;
                document.getElementById('editItemQuantity').value = item.quantity;
                document.getElementById('editItemIndex').value = index;
                
                document.getElementById('viewInventoryItemsFullScreen').style.display = 'none';
                document.getElementById('editItemModal').style.display = 'flex';
            }
        }

        // Удаление товара
        function deleteItem(index) {
            if (confirm('Вы уверены, что хотите удалить этот товар?')) {
                appData.currentInventoryItems.splice(index, 1);
                viewInventoryItemsFull(appData.currentInventoryItem);
                showAlert('Товар успешно удален', 'success');
            }
        }

        function saveInventoryItems() {
    console.log(' СОХРАНЕНИЕ ИЗМЕНЕНИЙ В ОПИСИ');
    
    if (!appData.currentInventoryItem) {
        showAlert('Нет активной описи для сохранения', 'warning');
        return;
    }
    
    // Обновляем данные описи
    const totalQuantity = appData.currentInventoryItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalLines = appData.currentInventoryItems.length;
    
    appData.currentInventoryItem.quantity = totalQuantity;
    appData.currentInventoryItem.lines = totalLines;
    appData.currentInventoryItem.items = [...appData.currentInventoryItems];
    
    // Сохраняем изменения
    saveTerminalDataToStorage();
    
    // Обновляем отображение
    updateInventoryItemsTable();
    
    showAlert('Изменения в описи сохранены', 'success');
    console.log(' Изменения сохранены');
}

        // Инициализация полноэкранных модальных окон
        function initFullScreenModals() {
		initInventoryItemEvents();
            // Закрытие по клику на крестик
            document.querySelectorAll('.full-screen-modal .close').forEach(closeBtn => {
                closeBtn.addEventListener('click', function() {
                    this.closest('.full-screen-modal').style.display = 'none';
                });
            });
			
			
			const saveInventoriesBtn = document.getElementById('saveInventoriesBtnFull');
    if (saveInventoriesBtn) {
        saveInventoriesBtn.addEventListener('click', saveInventoriesToFile);
    }
            
            // Закрытие по клику вне модального окна
            window.addEventListener('click', function(event) {
                if (event.target.classList.contains('full-screen-modal')) {
                    event.target.style.display = 'none';
                }
            });
        }
		
	




// Функция для показа превью форматирования
function showTerminalFormatPreview(value) {
    const previewElement = document.getElementById('terminalFormatPreview');
    if (!previewElement) return;
    
    if (value && /^\d+$/.test(value)) {
        const formatted = formatTerminalNumber(value);
        previewElement.textContent = `Будет отображено как: ${formatted}`;
        previewElement.style.display = 'block';
        previewElement.style.color = '#27ae60';
    } else {
        previewElement.style.display = 'none';
    }
}


function showAddInventoryItemModal(type, isFullScreen = false) {
    if (type === 'manual') {
        // Получаем ID текущей инвентаризации
        const inventoryId = appData.currentInventoryId || 
                           document.getElementById('inventoryIdFull')?.textContent;
        
        if (!inventoryId) {
            showAlert('Ошибка: не указана инвентаризация', 'error');
            return;
        }
        
        // Находим инвентаризацию
        const inventory = appData.inventories.find(inv => inv.id == inventoryId);
        if (!inventory) {
            showAlert('Инвентаризация не найдена', 'error');
            return;
        }
        
        // ВАЖНО: Проверяем, не закрыта ли инвентаризация
        if (inventory.isClosed) {
            showAlert('Невозможно добавить опись. Инвентаризация уже закрыта!', 'error');
            return;
        }
        
        // Устанавливаем флаг полноэкранного просмотра
        appData.isFullScreenView = isFullScreen;
        
        // Устанавливаем текущий ID инвентаризации
        if (isFullScreen) {
            const inventoryIdElement = document.getElementById('inventoryIdFull');
            if (inventoryIdElement) {
                appData.currentInventoryId = inventoryIdElement.textContent;
            }
        }
        
        // Показываем модальное окно
        document.getElementById('addInventoryItemModal').style.display = 'flex';
        document.getElementById('itemName').focus();
    } else if (type === 'upload') {
        // ТАКАЯ ЖЕ ПРОВЕРКА ДЛЯ ЗАГРУЗКИ ФАЙЛА
        const inventoryId = appData.currentInventoryId || 
                           document.getElementById('inventoryIdFull')?.textContent;
        
        if (!inventoryId) {
            showAlert('Ошибка: не указана инвентаризация', 'error');
            return;
        }
        
        const inventory = appData.inventories.find(inv => inv.id == inventoryId);
        if (!inventory) {
            showAlert('Инвентаризация не найдена', 'error');
            return;
        }
        
        if (inventory.isClosed) {
            showAlert('Невозможно загрузить опись. Инвентаризация уже закрыта!', 'error');
            return;
        }
        
        document.getElementById('uploadInventoryItemModal').style.display = 'flex';
    }
}


// Функция для отображения типа текущей инвентаризации
function showCurrentInventoryType() {
    const inventoryType = appData.currentInventoryType || 'general';
    const typeNames = {
        'general': 'Общая инвентаризация',
        'alcohol': 'Алкогольная инвентаризация',
        'beer': 'Инвентаризация пива',
        'cigarettes': 'Инвентаризация сигарет'
    };
    
    const typeColors = {
        'general': '#3498db',
        'alcohol': '#e74c3c',
        'beer': '#f39c12',
        'cigarettes': '#95a5a6'
    };
    
    // Создаем или находим элемент для отображения типа
    let typeBadge = document.getElementById('inventoryTypeBadge');
    if (!typeBadge) {
        typeBadge = document.createElement('div');
        typeBadge.id = 'inventoryTypeBadge';
        typeBadge.style.cssText = `
            display: inline-block;
            padding: 4px 12px;
            margin-left: 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            color: white;
        `;
        
        // Вставляем бейдж рядом с заголовком
        const titleElement = document.querySelector('#viewInventoryFullScreen h2');
        if (titleElement) {
            titleElement.appendChild(typeBadge);
        }
    }
    
    typeBadge.textContent = typeNames[inventoryType];
    typeBadge.style.backgroundColor = typeColors[inventoryType];
}


function initAddItemFunctionality() {
    console.log(' ИНИЦИАЛИЗАЦИЯ ДОБАВЛЕНИЯ ТОВАРА');
    
    // 1. Кнопка открытия модального окна "Добавить товар" (в таблице товаров)
    const addItemBtn = document.getElementById('addItemBtn');
    if (addItemBtn) {
        // Удаляем старые обработчики
        addItemBtn.replaceWith(addItemBtn.cloneNode(true));
        
        // Получаем новую кнопку
        const newAddBtn = document.getElementById('addItemBtn');
        
        // Добавляем ОДИН обработчик
        newAddBtn.addEventListener('click', function() {
            console.log(' Открытие формы добавления товара');
            
            if (!appData.currentInventoryItem) {
                showAlert('Сначала откройте опись', 'warning');
                return;
            }
            
            document.getElementById('addItemModal').style.display = 'flex';
            clearAddItemForm();
            
            setTimeout(() => {
                const barcodeInput = document.getElementById('itemBarcode');
    if (barcodeInput) {
        barcodeInput.addEventListener('input', function(e) {
            const barcode = e.target.value.trim();
            
            // Проверяем только если штрихкод достаточно длинный
            if (barcode.length >= 10) {
                // Получаем тип текущей инвентаризации
                let inventoryType = 'general';
                if (appData.currentInventoryItem && appData.currentInventoryItem.inventoryType) {
                    inventoryType = appData.currentInventoryItem.inventoryType;
                }
                
                // Ищем товар
                const productInfo = findProductByBarcode(barcode, inventoryType);
                
                // Показываем подсказку
                const productInfoDiv = document.getElementById('barcodeProductInfo');
                if (productInfoDiv) {
                    if (productInfo.name) {
                        let infoHTML = `<strong>Товар: </strong>${productInfo.name}<br>`;
                        infoHTML += `<small>Категория: ${productInfo.category || 'Неизвестно'}</small><br>`;
                        
                        // Показываем статус совместимости
                        if (productInfo.errorMessage || !productInfo.isValidForInventory) {
                            infoHTML += `<div style="color: red; margin-top: 5px; font-weight: bold;">
                                 ${productInfo.errorMessage || 'Товар не подходит для этой инвентаризации'}
                            </div>`;
                        } else {
                            infoHTML += `<div style="color: green; margin-top: 5px;">
                                ✓ Товар подходит для инвентаризации
                            </div>`;
                        }
                        
                        productInfoDiv.innerHTML = infoHTML;
                        productInfoDiv.style.display = 'block';
                    } else {
                        // Если товар не найден, показываем, что будет сгенерирован подходящий
                        productInfoDiv.innerHTML = `
                            <div style="color: orange; font-weight: bold;">
                                 Товар не найден в базе. Будет сгенерирован подходящий товар для ${inventoryType === 'alcohol' ? 'алкогольной' : 
                                inventoryType === 'beer' ? 'пивной' : 
                                inventoryType === 'cigarettes' ? 'сигаретной' : 'общей'} инвентаризации
                            </div>
                        `;
                        productInfoDiv.style.display = 'block';
                    }
                }
            }
        });
    }
            }, 100);
        });
    }
    
    // 2. Кнопка подтверждения добавления товара (в модальном окне)
    const confirmAddItemBtn = document.getElementById('confirmAddItem');
    if (confirmAddItemBtn) {
        // Удаляем старые обработчики
        confirmAddItemBtn.replaceWith(confirmAddItemBtn.cloneNode(true));
        
        // Получаем новую кнопку
        const newConfirmBtn = document.getElementById('confirmAddItem');
        
        // Добавляем ОДИН обработчик с защитой от ошибок
        newConfirmBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(' Нажата кнопка "Добавить" в модалке');
            
            try {
                // Проверяем, определена ли функция
                if (typeof addItemToInventory === 'function') {
                    addItemToInventory();
                } else {
                    console.error(' Функция addItemToInventory не определена');
                    showAlert('Ошибка: функция добавления товара не найдена', 'error');
                    
                    // Альтернативный вариант - прямая логика
                    addItemDirectly();
                }
            } catch (error) {
                console.error(' Ошибка при вызове addItemToInventory:', error);
                showAlert(`Ошибка добавления товара: ${error.message}`, 'error');
                
                // Пытаемся использовать альтернативный метод
                try {
                    addItemDirectly();
                } catch (fallbackError) {
                    console.error(' Ошибка в запасном методе:', fallbackError);
                }
            }
        });
    }
    
    // 3. Кнопка отмены
    const cancelAddItemBtn = document.getElementById('cancelAddItem');
    if (cancelAddItemBtn) {
        cancelAddItemBtn.addEventListener('click', function() {
            document.getElementById('addItemModal').style.display = 'none';
            clearAddItemForm();
        });
    }
    
    // 4. Закрытие по крестику
    const addItemModalClose = document.querySelector('#addItemModal .close');
    if (addItemModalClose) {
        addItemModalClose.addEventListener('click', function() {
            document.getElementById('addItemModal').style.display = 'none';
            clearAddItemForm();
        });
    }
	
	 const barcodeInput = document.getElementById('itemBarcode');
    if (barcodeInput) {
        barcodeInput.addEventListener('input', function(e) {
            const barcode = e.target.value.trim();
            
            // Проверяем только если штрихкод достаточно длинный
            if (barcode.length >= 10) {
                // Получаем тип инвентаризации
                let inventoryType = 'general';
                if (appData.currentInventoryItem && appData.currentInventoryItem.inventoryType) {
                    inventoryType = appData.currentInventoryItem.inventoryType;
                }
                
                // Ищем товар для проверки типа
                const typeProducts = getProductsByInventoryType(inventoryType);
                let productInfo = typeProducts.find(p => p.barcode === barcode);
                
                if (!productInfo) {
                    const allProducts = getProductsByInventoryType('all');
                    productInfo = allProducts.find(p => p.barcode === barcode);
                }
                
                // Если нашли товар - проверяем тип
                if (productInfo && productInfo.type) {
                    const productInfoDiv = document.getElementById('barcodeProductInfo');
                    if (productInfoDiv) {
                        let infoHTML = `<strong>Товар: </strong>${productInfo.name}<br>`;
                        
                        // Проверяем, подходит ли товар для этой инвентаризации
                        const inventoryAllowedTypes = {
                            'general': ['general', 'alcohol', 'beer', 'cigarettes'],
                            'alcohol': ['alcohol'],
                            'beer': ['beer'],
                            'cigarettes': ['cigarettes']
                        };
                        
                        const allowedTypes = inventoryAllowedTypes[inventoryType] || ['general'];
                        const isValid = allowedTypes.includes(productInfo.type);
                        
                        if (!isValid) {
                            infoHTML += `<span style="color: red; font-weight: bold;">
                                 Этот товар не подходит для ${inventoryType === 'alcohol' ? 'алкогольной' : 
                                inventoryType === 'beer' ? 'пивной' : 
                                inventoryType === 'cigarettes' ? 'сигаретной' : 'общей'} инвентаризации
                            </span>`;
                        } else {
                            infoHTML += `<span style="color: green;">
                                ✓ Подходит для этой инвентаризации
                            </span>`;
                        }
                        
                        productInfoDiv.innerHTML = infoHTML;
                        productInfoDiv.style.display = 'block';
                    }
                }
            }
        });
    }
    
    console.log(' Инициализация добавления товара завершена (один обработчик)');
}

// ЗАПАСНАЯ ФУНКЦИЯ ДОБАВЛЕНИЯ ТОВАРА (если основная не работает)
function addItemDirectly() {
    console.log(' Запасной метод добавления товара');
    
    const barcodeInput = document.getElementById('itemBarcode');
    const nameInput = document.getElementById('itemName');
    const quantityInput = document.getElementById('itemQuantity');
    
    if (!barcodeInput || !quantityInput) {
        showAlert('Не найдены поля формы', 'error');
        return;
    }
    
    const barcode = barcodeInput.value.trim();
    const quantityStr = quantityInput.value.trim();
    const name = nameInput ? nameInput.value.trim() : `Товар ${barcode.slice(-4)}`;
    
    // Простая валидация
    if (!barcode || !/^\d+$/.test(barcode)) {
        showAlert('Введите корректный штрихкод (только цифры)', 'warning');
        barcodeInput.focus();
        return;
    }
    
    if (!quantityStr) {
        showAlert('Введите количество', 'warning');
        quantityInput.focus();
        return;
    }
    
    const quantity = parseFloat(quantityStr.replace(',', '.'));
    if (isNaN(quantity) || quantity <= 0) {
        showAlert('Введите корректное количество', 'warning');
        quantityInput.focus();
        return;
    }
    
    if (!appData.currentInventoryItem) {
        showAlert('Не выбрана опись', 'error');
        return;
    }
    
    // Создаем товар
    const newItem = {
        id: Date.now(),
        barcode: barcode,
        name: name,
        quantity: quantity,
        addedDate: new Date().toLocaleString('ru-RU')
    };
    
    // Добавляем в опись
    if (!appData.currentInventoryItem.items) {
        appData.currentInventoryItem.items = [];
    }
    
    appData.currentInventoryItem.items.push(newItem);
    appData.currentInventoryItems = appData.currentInventoryItem.items;
    
    // Обновляем таблицу
    updateInventoryItemsTable();
    
    // Закрываем модальное окно
    document.getElementById('addItemModal').style.display = 'none';
    
    // Очищаем форму
    clearAddItemForm();
    
    // Сохраняем
    saveTerminalDataToStorage();
    
    showAlert(`Товар "${name}" добавлен`, 'success');
}


document.addEventListener('DOMContentLoaded', function() {
    // Сначала определяем все функции
    // ... определения функций ...
    
    function addItemToInventory() {
        // ... полный код функции ...
    }
    
    function initAddItemFunctionality() {
        // ... код этой функции ...
    }
    
    // Потом вызываем инициализацию
    initAddItemFunctionality();
});


function isItemAllowedForInventoryType(itemType, inventoryType) {
    console.log(' Проверка типа товара:', { itemType, inventoryType });
    
    // Создаем карту соответствия
    const allowedTypes = {
        'alcohol': ['водка', 'вино', 'коньяк', 'виски', 'шампанское', 'ликёр', 'ром', 'джин', 'текила', 'наливка', 'настойка', 'алкоголь'],
        'beer': ['пиво', 'эль', 'лагер', 'стаут', 'портер', 'сидр', 'медовуха'],
        'cigarettes': ['сигареты', 'сигары', 'сигариллы', 'табак', 'папиросы', 'курительные']
    };
    
    // Если инвентаризация общая - разрешаем всё
    if (inventoryType === 'general') {
        return true;
    }
    
    // Получаем разрешенные типы для данной инвентаризации
    const allowedForInventory = allowedTypes[inventoryType];
    
    if (!allowedForInventory) {
        console.warn(' Неизвестный тип инвентаризации:', inventoryType);
        return true; // На всякий случай разрешаем
    }
    
    // Проверяем, содержит ли тип товара разрешенные ключевые слова
    const itemTypeLower = itemType.toLowerCase();
    return allowedForInventory.some(allowed => 
        itemTypeLower.includes(allowed) || allowed.includes(itemTypeLower)
    );
}

// Функция очистки формы добавления товара
function clearAddItemForm() {
    const barcodeInput = document.getElementById('itemBarcode');
    const quantityInput = document.getElementById('itemQuantity');
    const productInfoDiv = document.getElementById('barcodeProductInfo');
    const autoFillAlert = document.getElementById('autoFillAlert');
    
    if (barcodeInput) barcodeInput.value = '';
    if (quantityInput) quantityInput.value = '';
    if (productInfoDiv) productInfoDiv.style.display = 'none';
    if (autoFillAlert) autoFillAlert.style.display = 'none';
}

// Функция для подсветки поля ввода
function highlightInputField(inputId, isValid) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    input.classList.remove('is-valid', 'is-invalid');
    
    if (isValid === true) {
        input.classList.add('is-valid');
    } else if (isValid === false) {
        input.classList.add('is-invalid');
    }
}

// УДАЛИТЕ СТАРЫЙ КОД И ВСТАВЬТЕ ЭТОТ:
document.getElementById('confirmAddInventoryItem').addEventListener('click', function() {
    console.log(' СОЗДАНИЕ НОВОЙ ОПИСИ - НАЧАЛО');
    
    // Получаем название описи
    const nameInput = document.getElementById('itemName');
    if (!nameInput) {
        console.error(' Не найден элемент itemName');
        return;
    }
    
    const name = nameInput.value.trim();
    
    if (!name) {
        showAlert('Введите название описи', 'warning');
        return;
    }
    
    // Получаем ID текущей инвентаризации
    const inventoryId = appData.currentInventoryId;
    if (!inventoryId) {
        console.error(' currentInventoryId не установлен');
        showAlert('Не выбрана инвентаризация', 'error');
        return;
    }
    
    console.log(' Инвентаризация:', inventoryId);
    
    // Загружаем актуальные данные ПЕРЕД добавлением
    loadTerminalDataFromStorage();
    
    // Получаем дату из инвентаризации
    let date = new Date().toLocaleDateString('ru-RU');
    const dateElement = document.getElementById('inventoryDateTextFull');
    if (dateElement && dateElement.textContent) {
        date = dateElement.textContent;
    }
    
    // Генерируем уникальный ID
    const newItemId = Date.now();
    console.log(' Сгенерирован ID новой описи:', newItemId);
    
    // Создаем новую опись
    const newInventoryItem = {
        id: newItemId,
        date: date,
        name: name,
        lines: 0,
        quantity: 0.000,
        status: "pending",
        inventoryId: String(inventoryId),
        closed: false,
        items: []
    };
    
    console.log(' Новая опись:', newInventoryItem);
    
    // Инициализируем массив, если его нет
    if (!appData.terminalData[inventoryId]) {
        appData.terminalData[inventoryId] = [];
        console.log(' Создан новый массив для инвентаризации');
    }
    
    // Добавляем опись
    appData.terminalData[inventoryId].push(newInventoryItem);
    console.log(' Опись добавлена. Всего:', appData.terminalData[inventoryId].length);
    
    // СОХРАНЯЕМ в localStorage
    saveTerminalDataToStorage();
    
    // Обновляем таблицу
    updateInventoryOperatorsTableFull(inventoryId);
    
    // Уведомление
    showAlert(`Опись "${name}" успешно создана`, 'success');
    
    // Закрываем модалку
    document.getElementById('addInventoryItemModal').style.display = 'none';
    nameInput.value = '';
    
    console.log(' СОЗДАНИЕ ОПИСИ - ЗАВЕРШЕНО');
});



function updateInventoryTable() {
    const tableBody = document.querySelector('#inventory-table tbody');
    if (!tableBody) return;
    
    
}

function attachInventoryItemEvents() {
    // Пока оставьте пустой
}

document.getElementById('confirmUploadInventoryItem').addEventListener('click', function() {
    const fileOperator = document.getElementById('fileOperator').value;
    const fileInput = document.getElementById('inventoryFile');
    
    if (!fileOperator) {
        showAlert('Выберите оператора', 'warning');
        return;
    }
    
    if (!fileInput.files || fileInput.files.length === 0) {
        showAlert('Выберите файл для загрузки', 'warning');
        return;
    }
    
    const file = fileInput.files[0];
    
    // Определяем, в какую инвентаризацию добавляем
    let targetInventoryId = appData.currentInventoryId;
    if (!targetInventoryId && appData.inventories.length > 0) {
        targetInventoryId = appData.inventories[0].id;
    }
    
    if (!targetInventoryId) {
        showAlert('Создайте или откройте инвентаризацию', 'warning');
        return;
    }
    
    const targetInventory = appData.inventories.find(inv => inv.id === targetInventoryId);
    if (!targetInventory) {
        showAlert('Инвентаризация не найдена', 'warning');
        return;
    }
    
    // Находим оператора по ID
    const operator = appData.operators.find(op => op.id.toString() === fileOperator);
    const operatorName = operator ? operator.name : `Оператор ${fileOperator}`;
    
    // Создаем опись из файла
    const fileItem = {
        id: Date.now(),
        name: file.name,
        date: targetInventory.date || new Date().toLocaleDateString('ru-RU'),
        operator: operatorName,
        lines: Math.floor(Math.random() * 100) + 20, // Имитация количества строк из файла
        quantity: Math.random() * 1000, // Имитация количества
        status: 'loaded',
        inventoryId: targetInventoryId,
        items: [
            { barcode: '4601234567890', name: 'Товар из файла 1', quantity: 10.000 },
            { barcode: '4601234567891', name: 'Товар из файла 2', quantity: 5.500 },
            { barcode: '4601234567892', name: 'Товар из файла 3', quantity: 3.200 }
        ]
    };
    
    // Добавляем опись в инвентаризацию
    if (!targetInventory.items) {
        targetInventory.items = [];
    }
    targetInventory.items.push(fileItem);
    
    // Закрываем модальное окно
    document.getElementById('uploadInventoryItemModal').style.display = 'none';
    
    // Обновляем таблицы если нужно
    if (appData.isFullScreenView && appData.currentInventoryId === targetInventoryId) {
        updateInventoryOperatorsTableFull();
    }
    
    // Показываем уведомление
    showAlert(`Файл "${file.name}" успешно загружен в инвентаризацию ${targetInventory.id}`, 'success');
    
    // Сбрасываем форму
    document.getElementById('fileOperator').value = '';
    document.getElementById('inventoryFile').value = '';
});

document.getElementById('cancelUploadInventoryItem').addEventListener('click', function() {
    document.getElementById('uploadInventoryItemModal').style.display = 'none';
    
    document.getElementById('inventoryFile').value = '';
});


function openInventoryFullScreen(inventoryId) {
    appData.currentInventoryId = inventoryId;
    appData.isFullScreenView = true;
    
    const inventory = appData.inventories.find(inv => inv.id === inventoryId);
    if (inventory) {
        appData.currentInventoryType = inventory.type || 'general';
    }
	
	showCurrentInventoryType();
    
    if (inventory) {
        document.getElementById('inventoryIdFull').textContent = inventory.id;
        document.getElementById('inventoryDateTextFull').textContent = inventory.date;
        document.getElementById('inventoryReasonTextFull').textContent = inventory.reason || '';
        document.getElementById('inventoryAmountFull').textContent = formatNumber(inventory.amount) + ' ₽';
        document.getElementById('inventoryDifferenceFull').textContent = formatNumber(inventory.difference) + ' ₽';
        document.getElementById('inventoryTitleFull').textContent = `Инвентаризация #${inventory.id}`;
        
        document.getElementById('viewInventoryFullScreen').style.display = 'block';
        updateInventoryOperatorsTableFull();
    }
}

function updateInventoryOperatorsTableFull(inventoryId) {
    console.log(' ОБНОВЛЕНИЕ ТАБЛИЦЫ ОПИСЕЙ');
    
    const tableBody = document.querySelector('#inventory-operators-table-full tbody');
    if (!tableBody) {
        console.error(' Таблица не найдена');
        return;
    }
    
    // ВСЕГДА загружаем актуальные данные из localStorage
    loadTerminalDataFromStorage();
    console.log(' Данные загружены из localStorage');
    
    // Получаем описи для данной инвентаризации
    const operators = appData.terminalData[inventoryId] || [];
    console.log(' Найдено описей:', operators.length);
    
    // Находим инвентаризацию для проверки статуса
    const inventory = appData.inventories.find(inv => inv.id == inventoryId);
    const isInventoryClosed = inventory ? inventory.isClosed : false;
    
    // Очищаем таблицу
    tableBody.innerHTML = '';
    
    if (operators.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center py-4 text-muted">
                    <i class="fas fa-box-open fa-2x mb-3"></i><br>
                    <span class="h6">Нет описей</span><br>
                    <small>${isInventoryClosed ? 'Инвентаризация закрыта. Добавление описей невозможно.' : 'Нажмите "Добавить опись" чтобы создать первую'}</small>
                </td>
            </tr>
        `;
        console.log('📭 Таблица пуста');
        return;
    }
    
    // Заполняем таблицу
    operators.forEach(operator => {
        const row = document.createElement('tr');
        
        // Форматируем дату
        const displayDate = operator.date || 'Не указана';
        
        // Определяем статус закрытия
        const isOperatorClosed = operator.closed || false;
        const closeBtnClass = isOperatorClosed ? 'btn-outline-success' : 'btn-outline-warning';
        const closeBtnText = isOperatorClosed ? 'Закрыта' : 'Закрыть';
        const closeBtnIcon = isOperatorClosed ? 'fa-lock' : 'fa-lock-open';
        const statusText = isOperatorClosed ? 'Закрыта' : getStatusText(operator.status);
        const statusClass = isOperatorClosed ? 'badge-success' : getStatusBadgeClass(operator.status);
        
        // Определяем, нужно ли блокировать кнопки действий
        const isActionsDisabled = isInventoryClosed || isOperatorClosed;
        const actionTitle = isInventoryClosed ? 'Инвентаризация закрыта' : (isOperatorClosed ? 'Опись закрыта' : '');
        
        row.innerHTML = `
            <td><code>${operator.id}</code></td>
            <td><strong>${operator.name}</strong></td>
            <td>${displayDate}</td>
            <td><span class="badge badge-light border">${operator.lines}</span></td>
            <td><span class="badge badge-light border">${operator.quantity.toFixed(3)}</span></td>
            <td>
                <span class="badge ${statusClass}">
                    ${statusText}
                </span>
            </td>
            <td class="text-nowrap">
                <button class="btn btn-sm btn-outline-primary view-inventory-items mr-1" 
                        data-item-id="${operator.id}" 
                        data-inventory-id="${inventoryId}"
                        title="Просмотр товаров"
                        ${isActionsDisabled ? 'disabled' : ''}>
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-inventory-item" 
                        data-item-id="${operator.id}"
                        data-inventory-id="${inventoryId}"
                        title="${isActionsDisabled ? actionTitle : 'Удалить опись'}"
                        ${isActionsDisabled ? 'disabled' : ''}>
                    <i class="fas fa-trash"></i>
                </button>
            </td>
            <!-- СТОЛБЕЦ ДЛЯ ЗАКРЫТИЯ ОПИСИ -->
            <td>
                ${isOperatorClosed ? 
                    `<span class="badge badge-success">
                        <i class="fas fa-check"></i> Закрыта
                    </span>` :
                    `<button class="btn btn-sm ${closeBtnClass} close-inventory-operator" 
                            data-item-id="${operator.id}"
                            data-inventory-id="${inventoryId}"
                            data-closed="${isOperatorClosed}"
                            title="${isInventoryClosed ? 'Инвентаризация закрыта' : 'Закрыть опись'}"
                            ${isInventoryClosed ? 'disabled' : ''}>
                        <i class="fas ${closeBtnIcon}"></i> ${closeBtnText}
                    </button>`
                }
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    console.log(' Таблица обновлена, строк:', operators.length);
    
    // Обновляем количество описей в заголовке
    updateInventoryItemsCount(inventoryId, operators.length);
    
    // Добавляем обработчики
    attachTableEventHandlers();
}

// Вспомогательные функции для статусов
function getStatusBadgeClass(status) {
    switch(status) {
        case 'loaded': return 'badge-success';
        case 'pending': return 'badge-warning';
        default: return 'badge-secondary';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'loaded': return 'Загружено';
        case 'pending': return 'В процессе';
        default: return 'Неизвестно';
    }
}

function updateInventoryItemsCount(inventoryId, count) {
    const countElement = document.getElementById('inventoryItemsCount');
    if (countElement) {
        countElement.textContent = ` (${count} описей)`;
    }
}


function attachTableEventHandlers() {
    console.log(' Добавление обработчиков таблицы');
    
    // Используем делегирование событий для всей таблицы
    const table = document.querySelector('#inventory-operators-table-full');
    if (!table) return;
    
    // Удаляем старые обработчики
    table.removeEventListener('click', handleTableClick);
    
    // Добавляем новый обработчик
    table.addEventListener('click', handleTableClick);
   
    console.log(' Обработчики добавлены');
	
	document.querySelectorAll('.close-inventory-operator').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const itemId = parseInt(this.getAttribute('data-item-id'));
            const inventoryId = parseInt(this.getAttribute('data-inventory-id'));
            const isAlreadyClosed = this.getAttribute('data-closed') === 'true';
            
            console.log(' Закрытие описи:', { itemId, inventoryId, isAlreadyClosed });
            
            if (itemId && inventoryId && !isAlreadyClosed) {
                closeInventoryOperator(itemId, inventoryId);
            } else if (isAlreadyClosed) {
                showAlert('Эта опись уже закрыта', 'info');
            }
        });
    });
}

// Добавьте функцию для закрытия описи
function closeInventoryOperator(operatorId, inventoryId) {
    console.log(' ЗАКРЫТИЕ ОПИСИ:', { operatorId, inventoryId });
    
    // Находим инвентаризацию
    const inventory = appData.inventories.find(inv => inv.id == inventoryId);
    if (!inventory) {
        showAlert('Ошибка: инвентаризация не найдена', 'error');
        return;
    }
    
    // Проверяем, не закрыта ли уже инвентаризация
    if (inventory.isClosed) {
        showAlert('Невозможно закрыть опись. Вся инвентаризация уже закрыта!', 'error');
        return;
    }
    
    // Находим опись в данных
    const operators = appData.terminalData[inventoryId] || [];
    const operatorIndex = operators.findIndex(op => op.id === operatorId);
    
    if (operatorIndex === -1) {
        showAlert('Ошибка: опись не найдена', 'error');
        return;
    }
    
    const operator = operators[operatorIndex];
    
    // Проверяем, есть ли товары в описи
    if (!operator.items || operator.items.length === 0) {
        if (!confirm('В этой описи нет товаров. Всё равно закрыть?')) {
            return;
        }
    }
    
    // Подтверждение закрытия
    if (confirm(`Закрыть опись "${operator.name}"?\n\nПосле закрытия редактирование описи будет невозможно.`)) {
        // Устанавливаем флаг закрытия
        operator.closed = true;
        
        // Сохраняем изменения
        saveTerminalDataToStorage();
        
        // Обновляем таблицу
        updateInventoryOperatorsTableFull(inventoryId);
        
        // Показываем уведомление
        showAlert(`Опись "${operator.name}" успешно закрыта`, 'success');
        
        // Проверяем, можно ли закрыть всю инвентаризацию
        checkInventoryClosureStatus(inventoryId);
    }
}// Добавьте функцию для закрытия описи
function closeInventoryOperator(operatorId, inventoryId) {
    console.log(' ЗАКРЫТИЕ ОПИСИ:', { operatorId, inventoryId });
    
    // Находим инвентаризацию
    const inventory = appData.inventories.find(inv => inv.id == inventoryId);
    if (!inventory) {
        showAlert('Ошибка: инвентаризация не найдена', 'error');
        return;
    }
    
    // Проверяем, не закрыта ли уже инвентаризация
    if (inventory.isClosed) {
        showAlert('Невозможно закрыть опись. Вся инвентаризация уже закрыта!', 'error');
        return;
    }
    
    // Находим опись в данных
    const operators = appData.terminalData[inventoryId] || [];
    const operatorIndex = operators.findIndex(op => op.id === operatorId);
    
    if (operatorIndex === -1) {
        showAlert('Ошибка: опись не найдена', 'error');
        return;
    }
    
    const operator = operators[operatorIndex];
    
    // Проверяем, есть ли товары в описи
    if (!operator.items || operator.items.length === 0) {
        if (!confirm('В этой описи нет товаров. Всё равно закрыть?')) {
            return;
        }
    }
    
    // Подтверждение закрытия
    if (confirm(`Закрыть опись "${operator.name}"?\n\nПосле закрытия редактирование описи будет невозможно.`)) {
        // Устанавливаем флаг закрытия
        operator.closed = true;
        
        // Сохраняем изменения
        saveTerminalDataToStorage();
        
        // Обновляем таблицу
        updateInventoryOperatorsTableFull(inventoryId);
        
        // Показываем уведомление
        showAlert(`Опись "${operator.name}" успешно закрыта`, 'success');
        
        // Проверяем, можно ли закрыть всю инвентаризацию
        checkInventoryClosureStatus(inventoryId);
    }
}

// Функция проверки статуса закрытия всей инвентаризации
function checkInventoryClosureStatus(inventoryId) {
    console.log(' ПРОВЕРКА СТАТУСА ЗАКРЫТИЯ ИНВЕНТАРИЗАЦИИ');
    
    // Загружаем актуальные данные
    loadTerminalDataFromStorage();
    
    // Получаем все описи для этой инвентаризации
    const operators = appData.terminalData[inventoryId] || [];
    
    if (operators.length === 0) {
        console.log(' Нет описей для проверки');
        return false;
    }
    
    // Проверяем, все ли описи закрыты
    const allClosed = operators.every(op => op.closed);
    const unclosedCount = operators.filter(op => !op.closed).length;
    
    console.log(' Статус описей:', {
        всего: operators.length,
        закрыто: operators.length - unclosedCount,
        не_закрыто: unclosedCount,
        все_закрыты: allClosed
    });
    
    // Если все описи закрыты, предлагаем закрыть инвентаризацию
    if (allClosed && operators.length > 0) {
        console.log(' Все описи закрыты, можно закрывать инвентаризацию');
        
        // Находим инвентаризацию
        const inventory = appData.inventories.find(inv => inv.id == inventoryId);
        if (inventory && !inventory.isClosed) {
            // Можем предложить пользователю закрыть инвентаризацию
            console.log('💡 Все описи закрыты. Готово к закрытию инвентаризации.');
        }
    }
    
    return allClosed;
}

// Функция обновления кнопки закрытия инвентаризации
function updateInventoryCloseButton(canClose) {
    const closeBtn = document.getElementById('closeInventoryBtn');
    if (closeBtn) {
        closeBtn.disabled = !canClose;
        closeBtn.title = canClose ? 
            'Закрыть инвентаризацию' : 
            'Не все описи закрыты';
        
        if (canClose) {
            closeBtn.classList.remove('btn-secondary');
            closeBtn.classList.add('btn-success');
        } else {
            closeBtn.classList.remove('btn-success');
            closeBtn.classList.add('btn-secondary');
        }
    }
}

function handleTableClick(e) {
    const target = e.target;
    
    // Кнопка удаления
    const deleteBtn = target.closest('.delete-inventory-item');
    if (deleteBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        const itemId = deleteBtn.getAttribute('data-item-id');
        const inventoryId = deleteBtn.getAttribute('data-inventory-id');
        
        console.log(' Клик по удалению:', { itemId, inventoryId });
        
        if (itemId && inventoryId) {
            if (confirm('Вы точно хотите удалить эту опись?')) {
                deleteInventoryItem(itemId, inventoryId);
            }
        }
        return;
    }
    
    // Кнопка просмотра
    const viewBtn = target.closest('.view-inventory-items');
    if (viewBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        const itemId = viewBtn.getAttribute('data-item-id');
        const inventoryId = viewBtn.getAttribute('data-inventory-id');
        
        console.log(' Клик по просмотру:', { itemId, inventoryId });
        
        if (itemId && inventoryId) {
            viewInventoryItems(itemId, inventoryId);
        }
        return;
    }
}

// Новая функция для добавления обработчиков событий
function addInventoryItemEventHandlers() {
    console.log('Добавление обработчиков для описей...');
    
    const tableBody = document.querySelector('#inventory-operators-table-full tbody');
    if (!tableBody) return;
    
    // Удаляем старые обработчики (если есть)
    const oldButtons = tableBody.querySelectorAll('.delete-inventory-item, .view-inventory-items');
    oldButtons.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });
    
    // Добавляем обработчики для кнопок просмотра
    const viewButtons = tableBody.querySelectorAll('.view-inventory-items');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const itemId = this.getAttribute('data-item-id');
            const inventoryId = this.getAttribute('data-inventory-id');
            
            console.log('Просмотр описи:', {itemId, inventoryId});
            
            if (itemId && inventoryId) {
                viewInventoryItems(itemId, inventoryId);
            }
        });
    });
    
    // Добавляем обработчики для кнопок удаления
    const deleteButtons = tableBody.querySelectorAll('.delete-inventory-item');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const itemId = this.getAttribute('data-item-id');
            const inventoryId = this.getAttribute('data-inventory-id');
            
            console.log('Клик по удалению описи:', {itemId, inventoryId});
            
            if (itemId && inventoryId) {
                if (confirm('Вы точно хотите удалить эту опись? Это действие нельзя отменить.')) {
                    deleteInventoryItem(itemId, inventoryId);
                }
            }
        });
    });
    
    console.log('Добавлено обработчиков:', {
        view: viewButtons.length,
        delete: deleteButtons.length
    });
}



// Также добавьте эту функцию для инициализации (если её нет):
function showAlert(message, type = 'info') {
    // Проверяем, нет ли уже открытого алерта с таким же сообщением
    const existingAlerts = document.querySelectorAll('.custom-alert');
    for (const alert of existingAlerts) {
        if (alert.textContent.includes(message)) {
            console.log('Предотвращено дублирование алерта:', message);
            return; // Не показываем дубликат
        }
    }
    
    // Ваш существующий код создания алерта
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Стили для алерта
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Цвета в зависимости от типа
    const colors = {
        'success': '#28a745',
        'error': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8'
    };
    
    alertDiv.style.backgroundColor = colors[type] || colors.info;
    
    // Добавляем на страницу
    document.body.appendChild(alertDiv);
    
    // Удаляем через 5 секунд
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

// Или, если у вас уже есть функция showAlert, убедитесь что она существует:
if (typeof showAlert !== 'function') {
    function showAlert(message, type = 'info') {
        console.log(`${type}: ${message}`);
        alert(`${type}: ${message}`);
    }
}

// Обновите функцию initInventoryItemEvents:
function initInventoryItemEvents() {
    console.log('Инициализация обработчиков событий для описей...');
    
    // Используем делегирование событий для динамически созданных элементов
    document.addEventListener('click', function(e) {
        console.log('Клик по элементу:', e.target);
        
        // Обработчик для кнопок просмотра товаров в описи
        if (e.target.closest('.view-inventory-items')) {
            const button = e.target.closest('.view-inventory-items');
            const itemId = button.getAttribute('data-item-id');
            const inventoryId = button.getAttribute('data-inventory-id');
            
            console.log('Просмотр описи:', itemId, inventoryId);
            
            if (itemId && inventoryId) {
                viewInventoryItems(itemId, inventoryId);
            }
        }
        
        // Обработчик для кнопок удаления описи
        if (e.target.closest('.delete-inventory-item')) {
            e.preventDefault();
            e.stopPropagation();
            
            const button = e.target.closest('.delete-inventory-item');
            const itemId = button.getAttribute('data-item-id');
            const row = button.closest('tr');
            
            // Получаем ID инвентаризации из строки таблицы или используем текущий
            let inventoryId = appData.currentInventoryId;
            
            // Пытаемся получить из data-атрибута кнопки или из строки
            if (!inventoryId) {
                const inventoryIdAttr = button.getAttribute('data-inventory-id');
                if (inventoryIdAttr) {
                    inventoryId = inventoryIdAttr;
                } else if (row) {
                    // Ищем в строке кнопку просмотра, которая имеет data-inventory-id
                    const viewButton = row.querySelector('.view-inventory-items');
                    if (viewButton) {
                        inventoryId = viewButton.getAttribute('data-inventory-id');
                    }
                }
            }
            
            console.log('Удаление описи:', itemId, 'Инвентаризация:', inventoryId);
            
            if (itemId && inventoryId) {
                if (confirm('Вы точно хотите удалить эту опись?')) {
                    deleteInventoryItem(itemId, inventoryId);
                }
            } else {
                console.error('Не удалось получить ID для удаления:', {itemId, inventoryId});
                showAlert('Ошибка: не удалось определить данные для удаления', 'error');
            }
        }
    });
}

function viewInventoryItems(itemId, inventoryId) {
    console.log(' ПРОСМОТР ОПИСИ');
    
    // Находим опись
    const inventoryItems = appData.terminalData[inventoryId] || [];
    const inventoryItem = inventoryItems.find(item => item.id == itemId);
    
    if (!inventoryItem) {
        showAlert('Опись не найдена', 'error');
        return;
    }
    
    console.log('📄 Найдена опись:', inventoryItem);
    
    // Заполняем информацию
    document.getElementById('inventoryItemTitleFull').textContent = inventoryItem.name;
    document.getElementById('inventoryItemDateFull').textContent = inventoryItem.date;
    document.getElementById('inventoryItemLinesFull').textContent = inventoryItem.lines || 0;
    document.getElementById('inventoryItemTotalQuantityFull').textContent = (inventoryItem.quantity || 0).toFixed(3);
    
    // ВАЖНО: currentInventoryItems должен быть ссылкой на items описи
    appData.currentInventoryItem = inventoryItem;
    appData.currentInventoryItems = inventoryItem.items || [];
    
    // Инициализируем массив товаров, если его нет
    if (!appData.currentInventoryItem.items) {
        appData.currentInventoryItem.items = [];
        appData.currentInventoryItems = appData.currentInventoryItem.items;
    }
    
    console.log(' Товаров в описи:', appData.currentInventoryItems.length);
    
    // Обновляем таблицу товаров
    updateInventoryItemsTable();
    
    // Показываем полноэкранное окно
    document.getElementById('viewInventoryItemsFullScreen').style.display = 'block';
    
    console.log(' Просмотр описи открыт');
}

// Функция проверки дублирования (для отладки)
function checkItemDuplication() {
    const inventoryId = appData.currentInventoryId;
    const operatorId = appData.currentInventoryItem?.id;
    
    if (!inventoryId || !operatorId) return;
    
    const operators = appData.terminalData[inventoryId] || [];
    const operator = operators.find(op => op.id === operatorId);
    
    if (operator && operator.items) {
        // Проверяем дубли по штрихкоду
        const barcodeCounts = {};
        operator.items.forEach(item => {
            barcodeCounts[item.barcode] = (barcodeCounts[item.barcode] || 0) + 1;
        });
        
        const duplicates = Object.keys(barcodeCounts).filter(barcode => barcodeCounts[barcode] > 1);
        
        if (duplicates.length > 0) {
            console.warn('️ Обнаружены дублирующиеся товары:', duplicates);
            // Здесь можно показать предупреждение или объединить дубли
        }
    }
}

function initAddItemValidation() {
    const barcodeInput = document.getElementById('itemBarcode');
    const quantityInput = document.getElementById('itemQuantity');
    
    if (!barcodeInput || !quantityInput) return;
    
    // Валидация штрихкода при вводе
    barcodeInput.addEventListener('input', function(e) {
        const value = e.target.value.trim();
        
        // Убираем все нецифровые символы
        const digitsOnly = value.replace(/\D/g, '');
        
        // Ограничиваем длину 13 символами
        const limitedValue = digitsOnly.substring(0, 13);
        
        if (value !== limitedValue) {
            e.target.value = limitedValue;
        }
        
        // Подсветка если не 13 цифр
        if (limitedValue.length === 13) {
            e.target.classList.remove('is-invalid');
            e.target.classList.add('is-valid');
        } else {
            e.target.classList.remove('is-valid');
            if (limitedValue.length > 0) {
                e.target.classList.add('is-invalid');
            }
        }
    });
    
    // Валидация количества при вводе
    quantityInput.addEventListener('input', function(e) {
        const value = e.target.value.trim();
        
        // Разрешаем только цифры, точку и запятую
        const cleanValue = value.replace(/[^\d,.]/g, '');
        
        // Заменяем запятую на точку
        const normalizedValue = cleanValue.replace(',', '.');
        
        // Убираем лишние точки/запятые
        const parts = normalizedValue.split('.');
        if (parts.length > 2) {
            e.target.value = parts[0] + '.' + parts.slice(1).join('');
        } else if (cleanValue !== value) {
            e.target.value = cleanValue;
        }
        
        // Проверяем валидность
        if (value) {
            const numValue = parseFloat(normalizedValue);
            if (isNaN(numValue) || numValue <= 0) {
                e.target.classList.add('is-invalid');
                e.target.classList.remove('is-valid');
            } else if (numValue > 10000) {
                e.target.classList.add('is-invalid');
                e.target.classList.remove('is-valid');
            } else {
                e.target.classList.remove('is-invalid');
                e.target.classList.add('is-valid');
            }
        } else {
            e.target.classList.remove('is-invalid', 'is-valid');
        }
    });
}

// Вызов инициализации при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initAddItemValidation();
});


function deleteInventoryItem(itemId, inventoryId) {
    console.log(' УДАЛЕНИЕ ОПИСИ - НАЧАЛО');
    
    // Проверяем параметры
    if (!itemId || !inventoryId) {
        console.error(' Не указаны ID для удаления');
        showAlert('Ошибка: не указаны идентификаторы', 'error');
        return;
    }
    
    // Преобразуем в числа
    const numItemId = Number(itemId);
    const numInventoryId = Number(inventoryId);
    
    console.log(' Параметры удаления:', {
        itemId: numItemId,
        inventoryId: numInventoryId
    });
    
    // Загружаем актуальные данные ПЕРЕД удалением
    loadTerminalDataFromStorage();
    
    // Проверяем существование инвентаризации
    if (!appData.terminalData[numInventoryId]) {
        console.error(' Инвентаризация не найдена:', numInventoryId);
        console.log(' Все инвентаризации:', Object.keys(appData.terminalData));
        showAlert('Инвентаризация не найдена', 'error');
        return;
    }
    
    const items = appData.terminalData[numInventoryId];
    console.log(' Описи в инвентаризации:', items.length, 'шт');
    
    // Находим опись для удаления
    const itemIndex = items.findIndex(item => {
        // Преобразуем ID описи к числу для сравнения
        const itemIdNum = Number(item.id);
        return itemIdNum === numItemId || item.id == itemId;
    });
    
    if (itemIndex === -1) {
        console.error(' Опись не найдена');
        console.log(' Искали ID:', numItemId, 'Тип:', typeof numItemId);
        console.log(' Доступные ID:', items.map(i => ({id: i.id, type: typeof i.id, name: i.name})));
        showAlert('Опись не найдена', 'error');
        return;
    }
    
    // Сохраняем информацию об удаляемой описи
    const deletedItem = items[itemIndex];
    console.log(' Удаляемая опись:', deletedItem);
    
    // Удаляем опись из массива
    items.splice(itemIndex, 1);
    console.log(' Опись удалена из массива. Осталось:', items.length);
    
    // Если массив стал пустым, удаляем ключ инвентаризации
    if (items.length === 0) {
        delete appData.terminalData[numInventoryId];
        console.log(' Ключ инвентаризации удален');
    }
    
    // СОХРАНЯЕМ изменения в localStorage
    saveTerminalDataToStorage();
    
    // Обновляем отображение таблицы
    updateInventoryOperatorsTableFull(numInventoryId);
    
    // Показываем уведомление
    showAlert(`Опись "${deletedItem.name}" успешно удалена`, 'success');
    
    console.log(' УДАЛЕНИЕ ОПИСИ - ЗАВЕРШЕНО');
    console.log(' Текущие данные:', appData.terminalData);
}

// Пример обновленного обработчика для кнопки "Вручную" в меню:
document.addEventListener('DOMContentLoaded', function() {

 initBarcodeValidation();
    initQuantityValidation();
    // Обработчик для кнопки "Вручную" в меню "Добавить опись"
    document.querySelector('[onclick*="showAddInventoryItemModal(\'manual\'"]')?.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Проверяем, что мы находимся в контексте инвентаризации
        if (!appData.currentInventoryId) {
            showAlert('Сначала откройте инвентаризацию', 'warning');
            return;
        }
        
        showAddInventoryItemModal('manual', true);
    });
});

function initBarcodeValidation() {
    const barcodeInput = document.getElementById('itemBarcode');
    if (!barcodeInput) return;
    
    barcodeInput.addEventListener('input', function() {
        // Очищаем от всех не-цифр
        this.value = this.value.replace(/\D/g, '');
        
        // Проверяем валидность
        const isValid = this.value.length >= 8 && /^\d+$/.test(this.value);
        highlightInputField('itemBarcode', isValid);
    });
    
    barcodeInput.addEventListener('blur', function() {
        if (this.value && !/^\d+$/.test(this.value)) {
            highlightInputField('itemBarcode', false);
        }
    });
}


function initQuantityValidation() {
    const quantityInput = document.getElementById('itemQuantity');
    if (!quantityInput) return;
    
    quantityInput.addEventListener('input', function() {
        // Заменяем запятую на точку
        this.value = this.value.replace(',', '.');
        
        // Удаляем все лишние символы
        this.value = this.value.replace(/[^\d.]/g, '');
        
        // Проверяем на несколько точек
        const dotCount = (this.value.match(/\./g) || []).length;
        if (dotCount > 1) {
            const parts = this.value.split('.');
            this.value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        // Проверяем валидность
        const num = parseFloat(this.value);
        const isValid = !isNaN(num) && num > 0 && num <= 999999;
        highlightInputField('itemQuantity', isValid);
    });
}




// Функция для просмотра товаров в описи с проверкой инвентаризации
function viewInventoryItemsFull(itemId) {
    // Находим текущую инвентаризацию
    const currentInventory = appData.inventories.find(inv => inv.id === appData.currentInventoryId);
    
    if (currentInventory && currentInventory.items) {
        // Ищем опись в текущей инвентаризации
        const item = currentInventory.items.find(i => i.id === itemId);
        
        if (item) {
            appData.currentInventoryItem = item;
            appData.currentInventoryItems = item.items || [];
            
            // Заполняем информацию об описи
            document.getElementById('inventoryItemTitleFull').textContent = item.name;
            document.getElementById('inventoryItemOperatorFull').textContent = item.operator || 'Не указан';
            document.getElementById('inventoryItemDateFull').textContent = item.date;
            document.getElementById('inventoryItemLinesFull').textContent = item.lines;
            document.getElementById('inventoryItemTotalQuantityFull').textContent = item.quantity;
            
            // Показываем окно
            document.getElementById('viewInventoryItemsFullScreen').style.display = 'block';
            
            // Обновляем таблицу товаров
            updateInventoryItemsTableFull();
        }
    }
}

// Обработчик отмены
document.getElementById('cancelAddInventoryItem').addEventListener('click', function() {
    document.getElementById('addInventoryItemModal').style.display = 'none';
    document.getElementById('itemName').value = '';
});

        // Печать расхождений для магазина
        function printDiscrepancies(type) {
            const inventory = appData.inventories.find(inv => 
                inv.shopId === appData.currentShop.id && inv.type === type
            );
            
            if (inventory) {
                showAlert(`Печать расхождений для ${getInventoryTypeName(type)} начата`, 'info');
                // В реальном приложении здесь будет вызов API для печати
            } else {
                showAlert(`Инвентаризация ${getInventoryTypeName(type)} не найдена`, 'warning');
            }
        }

function printForAccountant(inventoryId, inventoryType) {
    console.log('printForAccountant вызвана с параметрами:', inventoryId, inventoryType);
    
    // Если передали только type (старый вызов), находим инвентаризацию по типу
    if (!inventoryId && inventoryType) {
        console.log('Поиск инвентаризации по типу:', inventoryType);
        const inventory = appData.inventories.find(inv => 
            inv.shopId === appData.currentShop?.id && inv.type === inventoryType
        );
        
        if (inventory) {
            inventoryId = inventory.id;
            console.log('Найдена инвентаризация:', inventory);
        }
    }
    
    if (!inventoryId) {
        console.error('Не удалось определить инвентаризацию');
        showAlert('Ошибка: не указана инвентаризация', 'danger');
        return;
    }
    
    // Открываем модальное окно для выбора параметров печати
    openPrintForAccountantModal(inventoryId, inventoryType);
}

// Функция открытия модального окна печати
function openPrintForAccountantModal(inventoryId, inventoryType) {
    console.log('Открытие модального окна для печати:', inventoryId, inventoryType);
    
    // Находим инвентаризацию по ID
    let inventory;
    
    if (inventoryId && inventoryId !== 'undefined') {
        inventory = appData.inventories.find(inv => 
            inv.id === inventoryId || inv.id.toString() === inventoryId.toString()
        );
    }
    
    // Если не нашли по ID, ищем по типу
    if (!inventory && inventoryType) {
        inventory = appData.inventories.find(inv => 
            inv.shopId === appData.currentShop?.id && inv.type === inventoryType
        );
    }
    
    if (!inventory) {
        console.error('Инвентаризация не найдена');
        showAlert('Инвентаризация не найдена', 'warning');
        return;
    }
    
    console.log('Открытие окна для инвентаризации:', inventory);
    
    // Создаем модальное окно если его нет
    if (!document.getElementById('printForAccountantModal')) {
        console.log('Создание модального окна...');
        createPrintModal();
    }
    
    const modal = document.getElementById('printForAccountantModal');
    if (!modal) {
        console.error('Модальное окно не создано!');
        return;
    }
    
    modal.style.display = 'flex';
    
    // Устанавливаем значения
    const printInventoryId = document.getElementById('printInventoryId');
    const printInventoryType = document.getElementById('printInventoryType');
    
    if (printInventoryId) {
        printInventoryId.value = `Инвентаризация #${inventory.id}`;
        printInventoryId.dataset.inventoryId = inventory.id; // Сохраняем ID в data-атрибут
        console.log('Установлен ID инвентаризации:', inventory.id);
    }
    
    if (printInventoryType) {
        printInventoryType.value = inventory.type;
        console.log('Установлен тип инвентаризации:', inventory.type);
    }
    
    // Сбрасываем состояние
    const printResult = document.getElementById('printResult');
    const printLoading = document.getElementById('printLoading');
    
    if (printResult) {
        printResult.style.display = 'none';
        printResult.innerHTML = '';
    }
    
    if (printLoading) {
        printLoading.style.display = 'none';
    }
    
    // Устанавливаем заголовок
    let title = 'Сличительная ведомость';
    switch(inventory.type) {
        case 'alcohol':
            title = 'Сличительная ведомость по алкоголю';
            break;
        case 'beer':
            title = 'Сличительная ведомость по пиву';
            break;
        case 'cigarettes':
            title = 'Сличительная ведомость по сигаретам';
            break;
        case 'general':
            title = 'Общая сличительная ведомость';
            break;
    }
    
    const modalHeader = modal.querySelector('.modal-header h2');
    if (modalHeader) {
        modalHeader.textContent = title;
    }
    
    console.log('Модальное окно открыто успешно');
}

function createPrintModal() {
    console.log('Создание модального окна печати...');
    
    const modalHTML = `
    <div id="printForAccountantModal" class="modal">
        <div class="modal-content" style="width: 600px;">
            <div class="modal-header">
                <h2>Печать для бухгалтера</h2>
                <span class="close" style="cursor: pointer; font-size: 24px;">&times;</span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="printInventoryId">Инвентаризация</label>
                    <input type="text" id="printInventoryId" class="form-control" readonly>
                    <input type="hidden" id="printInventoryType">
                </div>
                
                <div class="form-group">
                    <label for="printType">Тип печати</label>
                    <select id="printType" class="form-control">
                        <option value="full">Сохранить полную сличительную ведомость</option>
                        <option value="totals">Сохранить только итоги сличительной ведомости</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="printFormat">Формат вывода</label>
                    <select id="printFormat" class="form-control">
                        <option value="excel">Excel файл</option>
                        <option value="print">Непосредственно на печать</option>
                        <option value="pdf">PDF документ</option>
                        <option value="word">Word документ</option>
                    </select>
                </div>
                
                <div id="printOptions" style="display: none; margin-top: 15px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
                    <h4 style="margin-bottom: 10px;">Параметры группировки итогов:</h4>
                    <div class="form-group">
                        <label for="groupBy">Группировать по:</label>
                        <select id="groupBy" class="form-control">
                            <option value="product_group">Группе товаров</option>
                            <option value="product_type">Вид товара</option>
                        </select>
                    </div>
                </div>
                
                <div id="printResult" style="display: none; margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
                    <div id="printResultContent"></div>
                </div>
                
                <div id="printLoading" style="display: none; text-align: center; margin-top: 20px;">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Загрузка...</span>
                    </div>
                    <p style="margin-top: 10px;">Идет формирование документа...</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="cancelPrintForAccountant" class="btn btn-danger">Отмена</button>
                <button type="button" id="confirmPrintForAccountant" class="btn btn-success">
                    <i class="fas fa-print"></i> Сформировать документ
                </button>
            </div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    console.log('Модальное окно создано');
    
    // Добавляем обработчик изменения типа печати
    const printTypeSelect = document.getElementById('printType');
    if (printTypeSelect) {
        printTypeSelect.addEventListener('change', function() {
            const printOptions = document.getElementById('printOptions');
            if (printOptions) {
                printOptions.style.display = this.value === 'totals' ? 'block' : 'none';
            }
        });
    }
}

// Инициализация событий модального окна
function initPrintModalEvents() {
    const modal = document.getElementById('printForAccountantModal');
    if (!modal) return;
    
    // Удаляем старые обработчики чтобы избежать дублирования
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = document.getElementById('cancelPrintForAccountant');
    const confirmBtn = document.getElementById('confirmPrintForAccountant');
    
    // Удаляем старые обработчики
    if (closeBtn) {
        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
    }
    
    if (cancelBtn) {
        const newCancelBtn = cancelBtn.cloneNode(true);
        cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
    }
    
    if (confirmBtn) {
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    }
    
    // Закрытие модального окна
    const newCloseBtn = modal.querySelector('.close');
    if (newCloseBtn) {
        newCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            modal.style.display = 'none';
        });
    }
    
    const newCancelBtn = document.getElementById('cancelPrintForAccountant');
    if (newCancelBtn) {
        newCancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            modal.style.display = 'none';
        });
    }
    
    // Подтверждение печати
    const newConfirmBtn = document.getElementById('confirmPrintForAccountant');
    if (newConfirmBtn) {
        newConfirmBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const inventoryId = document.getElementById('printInventoryId')?.value.replace('Инвентаризация #', '') || '';
            const inventoryType = document.getElementById('printInventoryType')?.value || 'general';
            const printType = document.getElementById('printType')?.value || 'full';
            const printFormat = document.getElementById('printFormat')?.value || 'excel';
            const groupBy = document.getElementById('groupBy')?.value || 'product_group';
            const includeSubtotals = document.getElementById('includeSubtotals')?.checked || true;
            
            // Валидация
            if (!inventoryId) {
                showAlert('Ошибка: не указана инвентаризация', 'danger');
                return;
            }
            
            // Показываем загрузку
            const printLoading = document.getElementById('printLoading');
            const printResult = document.getElementById('printResult');
            if (printLoading) {
                printLoading.style.display = 'block';
                printLoading.innerHTML = `
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Загрузка...</span>
                    </div>
                    <p style="margin-top: 10px;">Идет формирование документа...</p>
                `;
            }
            if (printResult) printResult.style.display = 'none';
            
            // Имитация загрузки (2 секунды)
            setTimeout(() => {
                try {
                    generatePrintDocument(
                        inventoryId,
                        inventoryType,
                        printType,
                        printFormat,
                        groupBy,
                        includeSubtotals
                    );
                    
                    if (printLoading) printLoading.style.display = 'none';
                    if (printResult) printResult.style.display = 'block';
                    
                } catch (error) {
                    console.error('Ошибка при генерации документа:', error);
                    if (printLoading) printLoading.style.display = 'none';
                    showAlert('Ошибка при формировании документа', 'danger');
                }
            }, 2000);
        });
    }
    
    // Закрытие по клику вне окна
    window.addEventListener('click', function(e) {
        if (e.target.id === 'printForAccountantModal') {
            modal.style.display = 'none';
        }
    });
}




// Вспомогательные функции
function getFormatName(format) {
    const names = {
        'pdf': 'PDF документ',
        'excel': 'Excel файл',
        'word': 'Word документ',
        'print': 'Непосредственно на печать'
    };
    return names[format] || format;
}

function getGroupByName(group) {
    const names = {
        'product_group': 'Группе товаров',
        'product_type': 'Вид товара',
        'department': 'Отделу/Секции',
        'operator': 'Оператору'
    };
    return names[group] || group;
}

        // Закрытие описи инвентаризации
        function closeInventoryItem(itemId, terminalId) {
            const terminalData = appData.terminalData[terminalId];
            const itemIndex = terminalData.findIndex(item => item.id === itemId);
            
            if (itemIndex !== -1) {
                terminalData[itemIndex].closed = true;
                showAlert('Опись успешно закрыта', 'success');
                document.getElementById('viewInventoryFullScreen').style.display = 'none';
                setTimeout(() => viewInventoryFull(terminalData[itemIndex].inventoryId), 100);
            }
        }

        

        // Сохранение описей в файл
        function saveInventoriesToFile(inventoryId, inventories) {
            const inventory = appData.inventories.find(inv => inv.id === inventoryId);
            if (!inventory) return;
            
            let fileContent = `Инвентаризация #${inventoryId}\n`;
            fileContent += `Тип: ${getInventoryTypeName(inventory.type)}\n`;
            fileContent += `Дата: ${inventory.date}\n`;
            fileContent += `Название: ${inventory.reason}\n\n`;
            fileContent += `Описи операторов:\n\n`;
            
            inventories.forEach(item => {
                fileContent += `ID: ${item.id}\n`;
                fileContent += `Оператор: ${item.operatorName} (Терминал #${item.terminalId})\n`;
                fileContent += `Дата: ${item.date}\n`;
                fileContent += `Название: ${item.name}\n`;
                fileContent += `Количество строк: ${item.lines}\n`;
                fileContent += `Количество: ${formatNumber(item.quantity)}\n`;
                fileContent += `Статус: ${item.status === 'loaded' ? 'Загружено' : 'Ожидает загрузки'}\n`;
                fileContent += `Закрыта: ${item.closed ? 'Да' : 'Нет'}\n\n`;
                
                // Добавляем товары в опись
                if (item.items && item.items.length > 0) {
                    fileContent += `Товары:\n`;
                    item.items.forEach(product => {
                        fileContent += `- ${product.barcode} | ${product.name} | ${formatNumber(product.quantity)}\n`;
                    });
                    fileContent += `\n`;
                }
            });
            
            const blob = new Blob([fileContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `inventory_${inventoryId}_${new Date().toISOString().slice(0, 10)}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showAlert('Описи успешно сохранены в файл', 'success');
        }

// Завершение инвентаризации - ФИНАЛЬНАЯ ВЕРСИЯ
function completeInventory(inventoryId) {
    console.log(' ПОПЫТКА ЗАВЕРШЕНИЯ ИНВЕНТАРИЗАЦИИ:', inventoryId);
    
    // Находим инвентаризацию в данных
    const inventory = appData.inventories.find(inv => inv.id === inventoryId);
    if (!inventory) {
        console.error(' Инвентаризация не найдена:', inventoryId);
        showAlert('Ошибка: инвентаризация не найдена', 'error');
        return;
    }
    
    console.log('📋 Найдена инвентаризация:', inventory);
    
    // Проверяем, не закрыта ли уже инвентаризация
    if (inventory.isClosed) {
        showAlert(`Инвентаризация #${inventoryId} уже была закрыта ранее. Разница: ${formatNumber(inventory.difference)} ₽`, 'info');
        console.log(' Инвентаризация уже закрыта, разница уже была рассчитана:', inventory.difference);
        return;
    }
    
    // Загружаем актуальные данные из localStorage
    loadTerminalDataFromStorage();
    
    // Получаем описи для этой инвентаризации
    // ВАЖНО: terminalData использует числовые ID инвентаризации
    const numericInventoryId = parseInt(inventoryId.toString().replace(/\D/g, '')) || inventoryId;
    const operators = appData.terminalData[numericInventoryId] || [];
    
    console.log(' Поиск описей для ID:', numericInventoryId);
    console.log(' Все доступные terminalData ключи:', Object.keys(appData.terminalData));
    console.log(' Найдено описей:', operators.length);
    
    // Показываем статус описей
    if (operators.length > 0) {
        const closedCount = operators.filter(op => op.closed).length;
        const unclosedCount = operators.filter(op => !op.closed).length;
        console.log(` Статус описей: ${closedCount} закрыто, ${unclosedCount} не закрыто`);
    }
    
    // Проверяем, есть ли незакрытые описи
    const unclosedOperators = operators.filter(op => !op.closed);
    
    if (unclosedOperators.length > 0) {
        // Формируем понятное сообщение
        const message = `
            Нельзя завершить инвентаризацию #${inventoryId}!
            
            Есть ${unclosedOperators.length} незакрытых описей:
            
            ${unclosedOperators.map((op, i) => `${i+1}. "${op.name}" (ID: ${op.id})`).join('\n')}
            
            Что вы хотите сделать?
        `;
        
        // Показываем диалог с выбором действий
        const userChoice = confirm(`${message}\n\nНажмите OK чтобы закрыть все описи автоматически.\nНажмите Отмена чтобы отменить завершение.`);
        
        if (userChoice) {
            // Пользователь выбрал закрыть все описи
            console.log(' Закрытие всех описей автоматически...');
            
            operators.forEach(operator => {
                console.log(` Закрытие описи: ${operator.name} (ID: ${operator.id})`);
                operator.closed = true;
            });
            
            // Сохраняем изменения
            saveTerminalDataToStorage();
            
            // Обновляем интерфейс если он открыт
            const fullScreenModal = document.getElementById('viewInventoryFullScreen');
            if (fullScreenModal && fullScreenModal.style.display === 'block') {
                updateInventoryOperatorsTableFull(numericInventoryId);
            }
            
            showAlert(`Все ${unclosedOperators.length} описей закрыты!`, 'success');
            
            // Даём небольшую паузу и затем завершаем инвентаризацию
            setTimeout(() => {
                proceedWithInventoryCompletion(inventory, operators);
            }, 500);
            
        } else {
            // Пользователь отменил
            console.log(' Пользователь отменил завершение инвентаризации');
            showAlert('Завершение инвентаризации отменено. Закройте все описи вручную.', 'warning');
        }
        
        return;
    }
    
    // Если все описи закрыты или их нет
    proceedWithInventoryCompletion(inventory, operators);
}

// Функция завершения инвентаризации
function proceedWithInventoryCompletion(inventory, operators) {
    console.log(' Завершение инвентаризации #', inventory.id);
    
    // ВАЖНО: Проверяем, не закрыта ли уже инвентаризация
    if (inventory.isClosed) {
        console.log(' Инвентаризация уже закрыта, пропускаем расчет разницы');
        showAlert(`Инвентаризация #${inventory.id} уже закрыта. Разница: ${formatNumber(inventory.difference)} ₽`, 'info');
        return;
    }
    
    // Расчет разницы ТОЛЬКО при первом закрытии
    console.log(' Расчет разницы для инвентаризации...');
    
    let calculatedDifference = 0;
    let totalItems = 0;
    let totalAmount = 0;
    
    // Если есть описи с товарами, рассчитываем фактическую сумму
    if (operators && operators.length > 0) {
        operators.forEach(operator => {
            if (operator.items && operator.items.length > 0) {
                const operatorAmount = operator.items.reduce((sum, item) => {
                    return sum + (item.quantity * item.price);
                }, 0);
                
                totalItems += operator.items.length;
                totalAmount += operatorAmount;
            }
        });
        
        console.log(' Итого по описям:', {
            описей: operators.length,
            товаров: totalItems,
            сумма: totalAmount
        });
    }
    
    // Вычисляем разницу (в реальном приложении здесь будет сравнение с системными данными)
    // Для демо: если есть сумма из описей, используем ее, иначе генерируем разницу
    if (totalAmount > 0) {
        // В реальной системе здесь было бы: difference = фактическая_сумма - системная_сумма
        // Для демо: генерируем разницу в пределах ±10% от суммы
        const diffPercent = (Math.random() * 0.2 - 0.1); // -10% до +10%
        calculatedDifference = Math.round(totalAmount * diffPercent * 100) / 100;
        
        // Обновляем сумму инвентаризации фактической суммой из описей
        inventory.amount = Math.round(totalAmount * 100) / 100;
    } else if (inventory.amount && inventory.amount !== 0) {
        // Если нет описей, но есть сумма в инвентаризации
        const diffPercent = (Math.random() * 0.2 - 0.1); // -10% до +10%
        calculatedDifference = Math.round(Math.abs(inventory.amount) * diffPercent * 100) / 100;
        if (inventory.amount < 0) calculatedDifference = -calculatedDifference;
    } else {
        // Если нет ни суммы ни описей - случайная небольшая разница
        calculatedDifference = Math.round((Math.random() * 10000 - 5000) * 100) / 100;
    }
    
    console.log(' Рассчитанная разница:', calculatedDifference);
    
    // Показываем подтверждение с результатами
    const diffPercent = inventory.amount ? Math.abs(calculatedDifference / Math.abs(inventory.amount) * 100) : 0;
    const confirmationMessage = `
        Подтверждение закрытия инвентаризации #${inventory.id}
        
        Результаты:
        • Тип: ${getInventoryTypeName(inventory.type) || inventory.type}
        • Название: ${inventory.reason}
        • Дата: ${inventory.date}
        
        Итоги:
        • ${operators ? operators.length : 0} описей
        • ${totalItems} товаров
        • Сумма: ${formatNumber(inventory.amount)} ₽
        • РАЗНИЦА: ${formatNumber(calculatedDifference)} ₽ (${diffPercent.toFixed(2)}%)
        
        После закрытия разница будет отображаться в отчетах.
        
        Закрыть инвентаризацию?
    `;
    
    if (!confirm(confirmationMessage)) {
        console.log(' Пользователь отменил закрытие');
        showAlert('Закрытие инвентаризации отменено', 'warning');
        return;
    }
    
    // Обновляем статус инвентаризации - ТЕПЕРЬ ЗАКРЫТА
    inventory.isClosed = true;
    inventory.status = 'completed';
    inventory.completedAt = new Date().toISOString();
    inventory.completedBy = appData.currentUser.name;
    
    // ВАЖНО: Устанавливаем разницу ТОЛЬКО ПРИ ПЕРВОМ ЗАКРЫТИИ
    // Если разница уже есть (например, в демо-данных), не перезаписываем
    if (!inventory.difference || Math.abs(inventory.difference) < 0.01) {
        inventory.difference = calculatedDifference;
        console.log(' Установлена новая разница:', inventory.difference);
    } else {
        console.log(' Разница уже была установлена ранее:', inventory.difference);
    }
    
    // Добавляем статистику если есть описи
    if (operators && operators.length > 0) {
        const totalLines = operators.reduce((sum, op) => sum + (op.lines || 0), 0);
        const totalQuantity = operators.reduce((sum, op) => sum + (op.quantity || 0), 0);
        
        inventory.totalOperators = operators.length;
        inventory.totalLines = totalLines || totalItems;
        inventory.totalQuantity = totalQuantity;
    }
    
    // Обновляем количество строк в инвентаризации
    if (totalItems > 0) {
        inventory.lines = totalItems;
    }
    
    // Добавляем запись в историю
    const historyEntry = {
        id: generateId(),
        date: formatDate(new Date()),
        type: inventory.type,
        name: getInventoryTypeName(inventory.type) || inventory.type,
        amount: inventory.amount || 0,
        difference: inventory.difference || 0, // Используем сохраненную разницу
        status: 'completed',
        responsible: appData.currentUser.name,
        shopId: appData.currentShop ? appData.currentShop.id : null,
        inventoryId: inventory.id
    };
    
    appData.history.unshift(historyEntry);
    
    // Сохраняем историю
    saveHistoryToStorage();
    
    // Сохраняем обновленные данные инвентаризации
    saveInventoryToStorage(inventory.id);
    
    // Обновляем интерфейс
    loadInventoriesTable();
    
    // Показываем уведомление об успехе
    const successMessage = `
         Инвентаризация #${inventory.id} успешно закрыта!
        
        Результаты:
        • Статус: ЗАКРЫТА
        • Разница: ${formatNumber(inventory.difference)} ₽
        • Дата закрытия: ${formatDate(new Date())}
        • ${operators ? operators.length : 0} описей
    `;
    
    showAlert(successMessage, 'success');
    
    // Логирование для отладки
    console.log(' Инвентаризация завершена:', {
        id: inventory.id,
        тип: inventory.type,
        статус: inventory.status,
        закрыта: inventory.isClosed,
        разница: inventory.difference,
        описей: operators ? operators.length : 0,
        завершена: new Date().toLocaleString()
    });
}

// Вспомогательные функции (должны быть уже в коде)
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}



function saveHistoryToStorage() {
    try {
        localStorage.setItem('inventoryHistory', JSON.stringify(appData.history));
        console.log(' История сохранена');
    } catch (error) {
        console.error(' Ошибка сохранения истории:', error);
    }
}

// Функция для быстрого закрытия всех описей (дополнительная)
function closeAllOperatorsForInventory(inventoryId) {
    const numericId = parseInt(inventoryId.toString().replace(/\D/g, '')) || inventoryId;
    const operators = appData.terminalData[numericId] || [];
    
    if (operators.length === 0) {
        return { success: true, message: 'Нет описей для закрытия' };
    }
    
    const unclosedCount = operators.filter(op => !op.closed).length;
    
    if (unclosedCount === 0) {
        return { success: true, message: 'Все описи уже закрыты' };
    }
    
    operators.forEach(operator => {
        operator.closed = true;
    });
    
    saveTerminalDataToStorage();
    
    return { 
        success: true, 
        message: `Закрыто ${unclosedCount} описей`,
        closed: unclosedCount 
    };
}

        // Удаление инвентаризации
        function deleteInventory(inventoryId) {
            if (!confirm('Вы уверены, что хотите удалить эту инвентаризацию?')) return;
            
            appData.inventories = appData.inventories.filter(inv => inv.id !== inventoryId);
            loadDashboard();
            showAlert(`Инвентаризация #${inventoryId} удалена`, 'success');
        }

        // Загрузка таблицы документов
        function loadDocumentsTable() {
            const tbody = document.getElementById('documents-table').querySelector('tbody');
            tbody.innerHTML = '';
            
            const shopDocuments = appData.documents.filter(doc => doc.shopId === appData.currentShop.id);
            
            shopDocuments.forEach(doc => {
                const row = document.createElement('tr');
                
                row.appendChild(createCell(doc.type));
                row.appendChild(createCell(doc.number));
                row.appendChild(createCell(doc.date));
                row.appendChild(createCell(`${formatNumber(doc.amount)} ₽`));
                
                const statusCell = document.createElement('td');
                const statusBadge = document.createElement('span');
                statusBadge.className = `badge ${doc.status === 'closed' ? 'badge-success' : 'badge-warning'}`;
                statusBadge.textContent = doc.status === 'closed' ? 'Закрыт' : 'Открыт';
                statusCell.appendChild(statusBadge);
                row.appendChild(statusCell);
                
                tbody.appendChild(row);
            });
            
            // Проверяем открытые документы
            checkOpenDocuments();
        }

        // Инициализация проверки документов
        function initDocumentChecking() {
            document.getElementById('checkDocumentsBtn').addEventListener('click', function() {
                const startDate = document.getElementById('startDate').value;
                const endDate = document.getElementById('endDate').value;
                
                if (!startDate || !endDate) {
                    showAlert('Укажите диапазон дат для проверки', 'warning');
                    return;
                }
                
                const start = new Date(startDate);
                const end = new Date(endDate);
                
                if (start > end) {
                    showAlert('Дата начала не может быть позже даты окончания', 'warning');
                    return;
                }
                
                // Проверяем документы в выбранном диапазоне
                const shopDocuments = appData.documents.filter(doc => doc.shopId === appData.currentShop.id);
                const docsToCheck = shopDocuments.filter(doc => {
                    const docDateParts = doc.date.split('/');
                    const docDate = new Date(`${docDateParts[2]}-${docDateParts[1]}-${docDateParts[0]}`);
                    return docDate >= start && docDate <= end;
                });
                
                if (docsToCheck.length === 0) {
                    showAlert(`Документов за период с ${formatDate(startDate)} по ${formatDate(endDate)} не найдено`, 'warning');
                    return;
                }
                
                // Подсчитываем открытые документы
                const openDocuments = docsToCheck.filter(doc => doc.status === 'open');
                
                // Формируем отчет о проверке
                const resultContainer = document.getElementById('documents-result');
                const statusContainer = document.getElementById('documents-status');
                
                resultContainer.style.display = 'block';
                statusContainer.innerHTML = '';
                
                if (openDocuments.length === 0) {
                    statusContainer.innerHTML = '<div class="alert alert-success">Все документы закрыты</div>';
                } else {
                    statusContainer.innerHTML = `
                        <div class="alert alert-warning">
                            <i class="fas fa-exclamation-triangle"></i> Найдено ${openDocuments.length} открытых документов
                        </div>
                        <p>Открытые документы:</p>
                        <ul>
                            ${openDocuments.map(doc => `<li>${doc.type} №${doc.number} от ${doc.date} (${formatNumber(doc.amount)} ₽)</li>`).join('')}
                        </ul>
                    `;
                }
                
                // Обновляем таблицу документов
                loadDocumentsTable();
                
                showAlert(`Проверка документов завершена. Найдено ${openDocuments.length} открытых документов.`, 
                          openDocuments.length > 0 ? 'warning' : 'success');
            });
        }

        // Загрузка таблицы истории
        function loadHistoryTable() {
            const tbody = document.getElementById('history-table').querySelector('tbody');
            tbody.innerHTML = '';
            
            const shopHistory = appData.history.filter(item => item.shopId === appData.currentShop.id);
            
            shopHistory.forEach(item => {
                const row = document.createElement('tr');
                
                row.appendChild(createCell(item.date));
                row.appendChild(createCell(item.name));
                row.appendChild(createCell(`${formatNumber(item.amount)} ₽`));
                
                const diffCell = document.createElement('td');
                const diffBadge = document.createElement('span');
                diffBadge.className = 'badge badge-danger';
                diffBadge.textContent = `${formatNumber(item.difference)} ₽`;
                diffCell.appendChild(diffBadge);
                row.appendChild(diffCell);
                
                const statusCell = document.createElement('td');
                const statusBadge = document.createElement('span');
                statusBadge.className = 'badge badge-success';
                statusBadge.textContent = 'Завершено';
                statusCell.appendChild(statusBadge);
                row.appendChild(statusCell);
                
                row.appendChild(createCell(item.responsible));
                
                tbody.appendChild(row);
            });
        }

        // Обновление сводных данных
        function updateSummaryData() {
            const shopInventories = appData.inventories.filter(inv => inv.shopId === appData.currentShop.id);
            const totalDiff = shopInventories.reduce((sum, inv) => sum + inv.difference, 0);
            document.getElementById('total-diff').textContent = `${formatNumber(totalDiff)} ₽`;
        }

        // Инициализация модальных окон
        function initModals() {
            document.querySelectorAll('.close, .btn-danger').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.modal').forEach(modal => {
                        modal.style.display = 'none';
                    });
                });
            });
            
            window.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal')) {
                    e.target.style.display = 'none';
                }
            });
        }
		
		
		
// Обновленная функция обновления таблицы товаров
function updateInventoryItemsTable() {
    console.log('📊 ОБНОВЛЕНИЕ ТАБЛИЦЫ ТОВАРОВ');
    
    const tableBody = document.querySelector('#inventory-items-table-full tbody');
    if (!tableBody) {
        console.error('❌ Таблица товаров не найдена');
        return;
    }
    
    // Проверяем, есть ли текущая опись
    if (!appData.currentInventoryItem || !appData.currentInventoryItem.items) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4 text-muted">
                    <i class="fas fa-boxes fa-2x mb-3"></i><br>
                    <span class="h6">Нет товаров</span><br>
                    <small>Нажмите "Добавить товар" чтобы добавить первый товар</small>
                </td>
            </tr>
        `;
        return;
    }
    
    const items = appData.currentInventoryItem.items;
    
    // Очищаем таблицу
    tableBody.innerHTML = '';
    
    // Заполняем таблицу
    items.forEach((item, index) => {
        const row = document.createElement('tr');
        
        const totalPrice = (item.quantity || 0) * (item.price || 0);
        const formattedTotalPrice = formatNumber(totalPrice);
        const formattedPrice = formatNumber(item.price || 0);
        const formattedQuantity = item.quantity ? item.quantity.toFixed(3) : '0.000';
        
        row.innerHTML = `
            <td><code>${item.barcode || 'Н/Д'}</code></td>
            <td>
                <strong>${item.name || 'Без названия'}</strong>
                ${item.category ? `<br><small class="text-muted">${item.category}</small>` : ''}
                ${item.isRandom ? `<br><small class="text-warning"><i class="fas fa-exclamation-triangle"></i> Случайный товар</small>` : ''}
            </td>
            <td>
                <span class="badge badge-light border">${formattedQuantity}</span>
            </td>
            <td>${formattedPrice} ₽</td>
            <td>
                <span class="badge badge-primary">${formattedTotalPrice} ₽</span>
            </td>
            <td class="text-nowrap">
                <button class="btn btn-sm btn-outline-warning mr-1 edit-item-btn" 
                        data-index="${index}"
                        title="Редактировать товар">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-item-btn" 
                        data-index="${index}"
                        title="Удалить товар">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Добавляем итоговую строку
    if (items.length > 0) {
        const totalRow = document.createElement('tr');
        totalRow.className = 'table-info font-weight-bold';
        
        const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
        const totalAmount = items.reduce((sum, item) => sum + ((item.quantity || 0) * (item.price || 0)), 0);
        
        totalRow.innerHTML = `
            <td colspan="2" class="text-right"><strong>ИТОГО:</strong></td>
            <td><span class="badge badge-info">${totalQuantity.toFixed(3)}</span></td>
            <td></td>
            <td><span class="badge badge-success">${formatNumber(totalAmount)} ₽</span></td>
            <td></td>
        `;
        
        tableBody.appendChild(totalRow);
    }
    
    // Добавляем обработчики событий ДЛЯ ВСЕХ КНОПОК УДАЛЕНИЯ
    addDeleteItemEventHandlers();
	
	setTimeout(() => {
        addEditItemEventHandlers();
        addDeleteItemEventHandlers();
    }, 50);
    
    console.log(' Таблица товаров обновлена. Товаров:', items.length);
}

// Функция для добавления обработчиков кнопок удаления
function addDeleteItemEventHandlers() {
    console.log(' ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ ДЛЯ КНОПОК УДАЛЕНИЯ');
    
    const deleteButtons = document.querySelectorAll('.delete-item-btn');
    
    if (deleteButtons.length === 0) {
        console.log('️ Кнопки удаления не найдены');
        return;
    }
    
    console.log(` Найдено ${deleteButtons.length} кнопок удаления`);
    
    deleteButtons.forEach(button => {
        // Удаляем старые обработчики
        button.replaceWith(button.cloneNode(true));
        
        const newButton = document.querySelector(`.delete-item-btn[data-index="${button.dataset.index}"]`);
        
        if (newButton) {
            // Добавляем новый обработчик
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const index = parseInt(this.getAttribute('data-index'));
                console.log('🖱️ Клик по кнопке удаления, индекс:', index);
                
                // Проверяем, не закрыта ли инвентаризация
                if (appData.currentInventoryId) {
                    const inventory = appData.inventories.find(inv => inv.id == appData.currentInventoryId);
                    if (inventory && inventory.isClosed) {
                        showAlert('Невозможно удалить товар. Инвентаризация закрыта!', 'error');
                        return;
                    }
                }
                
                // Проверяем, не закрыта ли опись
                const operators = appData.terminalData[appData.currentInventoryId] || [];
                const currentOperator = operators.find(op => op.id === appData.currentInventoryItem.id);
                if (currentOperator && currentOperator.closed) {
                    showAlert('Невозможно удалить товар. Опись закрыта!', 'error');
                    return;
                }
                
                // Вызываем функцию удаления
                deleteInventoryItemFromList(index);
            });
        }
    });
}

// Добавляем обработчики для модального окна редактирования
document.addEventListener('DOMContentLoaded', function() {
    // Кнопка отмены редактирования
    document.getElementById('cancelEditItem')?.addEventListener('click', function() {
        document.getElementById('editItemModal').style.display = 'none';
    });
    
    // Кнопка сохранения изменений
    document.getElementById('confirmEditItem')?.addEventListener('click', saveEditedItem);
    
    // Обработка Enter в поле штрихкода
    document.getElementById('editItemBarcode')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('editItemQuantity').focus();
        }
    });
    
    // Обработка Enter в поле количества
    document.getElementById('editItemQuantity')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveEditedItem();
        }
    });
});

// Функция для обновления информации об описи
function updateInventoryItemInfo() {
    if (!appData.currentInventoryItems) return;
    
    const totalQuantity = appData.currentInventoryItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalLines = appData.currentInventoryItems.length;
    
    // Обновляем отображаемую информацию
    const quantityElement = document.getElementById('inventoryItemTotalQuantityFull');
    const linesElement = document.getElementById('inventoryItemLinesFull');
    
    if (quantityElement) quantityElement.textContent = totalQuantity.toFixed(3);
    if (linesElement) linesElement.textContent = totalLines;
    
    // Обновляем данные в описи
    if (appData.currentInventoryItem) {
        appData.currentInventoryItem.quantity = totalQuantity;
        appData.currentInventoryItem.lines = totalLines;
        
        // Сохраняем изменения в localStorage
        saveTerminalDataToStorage();
    }
}

function attachItemTableEventHandlers() {
    console.log(' Добавление обработчиков для таблицы товаров');
    
    const table = document.querySelector('#inventory-items-table-full');
    if (!table) return;
    
    // Используем делегирование событий
    table.addEventListener('click', function(e) {
        const target = e.target;
        
        // Удаление товара
        const deleteBtn = target.closest('.delete-item');
        if (deleteBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            // Получаем индекс из data-атрибута
            const itemIndex = deleteBtn.getAttribute('data-index');
            console.log('️ Клик по удалению, индекс из атрибута:', itemIndex);
            
            if (itemIndex !== null) {
                // Преобразуем в число и вызываем удаление
                deleteInventoryItemFromList(parseInt(itemIndex));
            }
            return;
        }
        
        // Редактирование товара
        const editBtn = target.closest('.edit-item');
        if (editBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const itemIndex = editBtn.getAttribute('data-index');
            console.log(' Клик по редактированию, индекс из атрибута:', itemIndex);
            
            if (itemIndex !== null) {
                editInventoryItem(parseInt(itemIndex));
            }
            return;
        }
    });
    
    console.log(' Обработчики добавлены (делегирование)');
}

// ИСПРАВЛЕННАЯ функция handleItemTableClick (только удаление и редактирование):
function handleItemTableClick(e) {
    const target = e.target;
    
    // ТОЛЬКО УДАЛЕНИЕ товара
    const deleteBtn = target.closest('.delete-item');
    if (deleteBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        const itemIndex = deleteBtn.getAttribute('data-index');
        console.log(' Удаление товара, индекс:', itemIndex);
        
        if (itemIndex !== null) {
            deleteInventoryItemFromList(parseInt(itemIndex));
        }
        return;
    }
    
    // ТОЛЬКО РЕДАКТИРОВАНИЕ товара
    const editBtn = target.closest('.edit-item');
    if (editBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        const itemIndex = editBtn.getAttribute('data-index');
        console.log(' Редактирование товара, индекс:', itemIndex);
        
        if (itemIndex !== null) {
            editInventoryItem(parseInt(itemIndex));
        }
        return;
    }
    
    // УБРАЛИ обработку кнопки добавления товара отсюда!
    // Кнопка "Добавить товар" обрабатывается отдельно
}

let isDeleting = false;
function deleteInventoryItemFromList(itemIndex) {
    // Защита от множественного вызова
    if (isDeleting) {
        console.log(' Удаление уже в процессе');
        showAlert('Удаление уже выполняется, подождите...', 'warning');
        return;
    }
    
    console.log(' УДАЛЕНИЕ ТОВАРА ИЗ СПИСКА');
    console.log(' Индекс для удаления:', itemIndex);
    
    // Проверяем наличие данных
    if (!appData.currentInventoryItem || !appData.currentInventoryItem.items) {
        console.error(' Нет данных о товарах');
        showAlert('Ошибка: нет данных о товарах', 'error');
        return;
    }
    
    const items = appData.currentInventoryItem.items;
    
    // Проверяем корректность индекса
    if (itemIndex < 0 || itemIndex >= items.length) {
        console.error(' Неверный индекс:', itemIndex);
        showAlert('Ошибка: товар не найден', 'error');
        return;
    }
    
    const itemToDelete = items[itemIndex];
    console.log(' Товар для удаления:', itemToDelete);
    
    // Показываем подтверждение
    const confirmMessage = `
        Удалить товар?\n\n
        Название: ${itemToDelete.name || 'Без названия'}
        Штрихкод: ${itemToDelete.barcode || 'Не указан'}
        Количество: ${itemToDelete.quantity || 0}
        Сумма: ${formatNumber((itemToDelete.quantity || 0) * (itemToDelete.price || 0))} ₽
    `;
    
    if (!confirm(confirmMessage)) {
        console.log(' Пользователь отменил удаление');
        return;
    }
    
    // Блокируем возможность повторного вызова
    isDeleting = true;
    
    try {
        console.log(' Удаление товара...');
        
        // Сохраняем информацию об удаляемом товаре для уведомления
        const deletedItemName = itemToDelete.name || 'Товар';
        
        // Удаляем товар
        items.splice(itemIndex, 1);
        
        // Обновляем ссылку на массив
        appData.currentInventoryItems = items;
        
        console.log(' Товар удален из массива. Осталось товаров:', items.length);
        
        // Обновляем интерфейс
        updateInventoryItemsTable();
        
        // Сохраняем изменения
        saveTerminalDataToStorage();
        
        // Обновляем статистику описи
        updateOperatorStatistics(appData.currentInventoryItem.id);
        
        // Показываем уведомление
        showAlert(`Товар "${deletedItemName}" успешно удален`, 'success');
        
        // Логируем успех
        console.log(' Товар успешно удален');
        
    } catch (error) {
        console.error(' Ошибка при удалении:', error);
        showAlert(`Ошибка при удалении товара: ${error.message}`, 'error');
    } finally {
        // Разблокируем через небольшую задержку
        setTimeout(() => {
            isDeleting = false;
            console.log(' Удаление разблокировано');
        }, 1000);
    }
}


function addEditItemEventHandlers() {
    console.log('🔧 ДОБАВЛЕНИЕ ОБРАБОТЧИКОВ ДЛЯ КНОПОК РЕДАКТИРОВАНИЯ');
    
    const editButtons = document.querySelectorAll('.edit-item-btn');
    
    if (editButtons.length === 0) {
        console.log(' Кнопки редактирования не найдены');
        return;
    }
    
    console.log(` Найдено ${editButtons.length} кнопок редактирования`);
    
    editButtons.forEach(button => {
        // Удаляем старые обработчики
        button.replaceWith(button.cloneNode(true));
        
        const newButton = document.querySelector(`.edit-item-btn[data-index="${button.dataset.index}"]`);
        
        if (newButton) {
            // Добавляем новый обработчик
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const index = parseInt(this.getAttribute('data-index'));
                console.log('🖱️ Клик по кнопке редактирования, индекс:', index);
                
                // Вызываем функцию редактирования
                editInventoryItem(index);
            });
        }
    });
}


// Функция открытия редактирования товара
function editInventoryItem(itemIndex) {
    console.log(' РЕДАКТИРОВАНИЕ ТОВАРА #', itemIndex);
    
    // Проверяем, выбрана ли опись
    if (!appData.currentInventoryItem) {
        showAlert('Сначала выберите опись', 'error');
        return;
    }
    
    // Проверяем, не закрыта ли инвентаризация
    if (appData.currentInventoryId) {
        const inventory = appData.inventories.find(inv => inv.id == appData.currentInventoryId);
        if (inventory && inventory.isClosed) {
            showAlert('Невозможно редактировать товар. Инвентаризация закрыта!', 'error');
            return;
        }
    }
    
    // Проверяем, не закрыта ли опись
    const operators = appData.terminalData[appData.currentInventoryId] || [];
    const currentOperator = operators.find(op => op.id === appData.currentInventoryItem.id);
    if (currentOperator && currentOperator.closed) {
        showAlert('Невозможно редактировать товар. Опись закрыта!', 'error');
        return;
    }
    
    // Получаем товар
    const items = appData.currentInventoryItem.items || [];
    if (itemIndex < 0 || itemIndex >= items.length) {
        showAlert('Товар не найден', 'error');
        return;
    }
    
    const item = items[itemIndex];
    console.log(' Найден товар для редактирования:', item);
    
    // Заполняем форму редактирования
    document.getElementById('editItemBarcode').value = item.barcode || '';
    document.getElementById('editItemName').value = item.name || '';
    document.getElementById('editItemQuantity').value = item.quantity || 0;
    document.getElementById('editItemIndex').value = itemIndex;
    
    // Очищаем ошибки
    document.getElementById('editError').style.display = 'none';
    document.getElementById('editError').textContent = '';
    
    // Отображаем информацию о текущем товаре
    const editProductInfo = document.getElementById('editProductInfo');
    if (editProductInfo) {
        editProductInfo.innerHTML = `
            <div class="alert alert-info">
                <p><strong>Текущий товар:</strong> ${item.name}</p>
                <p><strong>Штрихкод:</strong> ${item.barcode}</p>
                <p><strong>Текущее количество:</strong> ${item.quantity}</p>
                <p><strong>Цена:</strong> ${formatNumber(item.price || 0)} ₽</p>
                <p><strong>Сумма:</strong> ${formatNumber((item.quantity || 0) * (item.price || 0))} ₽</p>
            </div>
        `;
    }
    
    // Устанавливаем обработчик изменения штрихкода
    const barcodeInput = document.getElementById('editItemBarcode');
    if (barcodeInput) {
        // Удаляем предыдущий обработчик
        barcodeInput.oninput = null;
        // Добавляем новый
        barcodeInput.oninput = function() {
            handleBarcodeChangeInEdit(this.value);
        };
    }
    
    // Автоматически ищем товар при открытии
    if (item.barcode) {
        setTimeout(() => {
            handleBarcodeChangeInEdit(item.barcode);
        }, 100);
    }
    
    // Показываем модальное окно
    document.getElementById('editItemModal').style.display = 'flex';
    
    // Фокусируемся на поле штрихкода
    setTimeout(() => {
        document.getElementById('editItemBarcode').focus();
        document.getElementById('editItemBarcode').select();
    }, 200);
}



function handleBarcodeChangeInEdit(barcode) {
    console.log(' Поиск товара по штрихкоду:', barcode);
    
    const nameInput = document.getElementById('editItemName');
    
    // Если штрихкод пустой
    if (!barcode || barcode.trim() === '') {
        if (nameInput) {
            nameInput.value = '';
            nameInput.style.backgroundColor = '#f8f9fa';
        }
        return;
    }
    
    // Ищем товар в базе данных
    let productInfo = null;
    
    // Определяем тип инвентаризации
    let inventoryType = 'general';
    if (appData.currentInventoryItem && appData.currentInventoryItem.inventoryType) {
        inventoryType = appData.currentInventoryItem.inventoryType;
    } else if (appData.currentInventoryId) {
        const inventory = appData.inventories.find(inv => inv.id == appData.currentInventoryId);
        if (inventory && inventory.type) {
            inventoryType = inventory.type;
        }
    }
    
    console.log('📋 Тип инвентаризации для поиска:', inventoryType);
    
    // Ищем товар
    productInfo = findProductByBarcode(barcode, inventoryType);
    
    if (productInfo) {
        console.log(' Товар найден:', productInfo);
        
        // Обновляем поле названия
        if (nameInput) {
            nameInput.value = productInfo.name || '';
            nameInput.style.backgroundColor = '#e8f4fd';
            
            // Показываем информацию о найденном товаре
            const editProductInfo = document.getElementById('editProductInfo');
            if (editProductInfo) {
                editProductInfo.innerHTML = `
                    <div class="alert alert-success">
                        <p><strong>Найден товар:</strong> ${productInfo.name}</p>
                        <p><strong>Цена:</strong> ${formatNumber(productInfo.price || 0)} ₽</p>
                        <p><strong>Категория:</strong> ${productInfo.category || 'Не указана'}</p>
                        <p><strong>Статус:</strong> ${productInfo.foundInDb ? 'В базе данных' : 'Сгенерирован'}</p>
                        <small class="text-muted">Данные обновлены по новому штрихкоду</small>
                    </div>
                `;
            }
        }
    } else {
        console.log(' Товар не найден');
        if (nameInput) {
            nameInput.value = '';
            nameInput.style.backgroundColor = '#f8f9fa';
        }
    }
}


// Добавьте этот обработчик (если его нет)
document.getElementById('confirmEditItem') && document.getElementById('confirmEditItem').addEventListener('click', function() { 
    console.log(' СОХРАНЕНИЕ ИЗМЕНЕНИЙ ТОВАРА');
    
    // Получаем значения из формы
    const barcode = document.getElementById('editItemBarcode').value.trim();
    const name = document.getElementById('editItemName').value.trim();
    const quantity = parseFloat(document.getElementById('editItemQuantity').value);
    const itemIndex = parseInt(document.getElementById('editItemIndex').value);
    
    console.log(' Данные для сохранения:', { barcode, name, quantity, itemIndex });
    
    // Валидация
    if (!barcode && !name) {
        showAlert('Введите штрихкод ИЛИ название товара', 'warning');
        return;
    }
    
    if (isNaN(quantity) || quantity <= 0) {
        showAlert('Введите корректное количество (больше 0)', 'warning');
        return;
    }
    
    if (isNaN(itemIndex) || itemIndex < 0) {
        console.error(' Неверный индекс товара');
        showAlert('Ошибка редактирования', 'error');
        return;
    }
    
    // Обновляем товар
    if (appData.currentInventoryItems && appData.currentInventoryItems[itemIndex]) {
        appData.currentInventoryItems[itemIndex] = {
            barcode: barcode || 'Не указан',
            name: name || 'Без названия',
            quantity: quantity,
            addedDate: new Date().toLocaleString('ru-RU')
        };
        
        // Также обновляем в объекте описи
        if (appData.currentInventoryItem && appData.currentInventoryItem.items) {
            appData.currentInventoryItem.items[itemIndex] = appData.currentInventoryItems[itemIndex];
        }
        
        console.log(' Товар обновлен:', appData.currentInventoryItems[itemIndex]);
        
        // Обновляем таблицу
        updateInventoryItemsTable();
        
        // Закрываем модальное окно
        document.getElementById('editItemModal').style.display = 'none';
        
        // Очищаем форму
        document.getElementById('editItemBarcode').value = '';
        document.getElementById('editItemName').value = '';
        document.getElementById('editItemQuantity').value = '';
        document.getElementById('editItemIndex').value = '';
        
        // Сохраняем изменения
        saveTerminalDataToStorage();
        
        showAlert('Товар изменен', 'success');
    } else {
        console.error(' Товар не найден по индексу:', itemIndex);
        showAlert('Товар не найден', 'error');
    }
});




        // Инициализация управления инвентаризациями
function initInventoryManagement() {
    const createInventoryBtn = document.getElementById('createInventoryBtn');
    const cancelCreateInventory = document.getElementById('cancelCreateInventory');
    const confirmCreateInventory = document.getElementById('confirmCreateInventory');
    
    createInventoryBtn && createInventoryBtn.addEventListener('click', () => {
        document.getElementById('inventoryDate').valueAsDate = new Date();
        document.getElementById('inventoryReason').value = '';
        document.getElementById('createInventoryModal').style.display = 'flex';
    });
    
    cancelCreateInventory && cancelCreateInventory.addEventListener('click', () => {
        document.getElementById('createInventoryModal').style.display = 'none';
    });
    
    confirmCreateInventory && confirmCreateInventory.addEventListener('click', () => {
        const type = document.getElementById('inventoryType').value;
        const date = document.getElementById('inventoryDate').value;
        const reason = document.getElementById('inventoryReason').value;
        
        if (!type || !date || !reason) {
            showAlert('Заполните все поля', 'warning');
            return;
        }
        
        // Если мы редактируем существующую опись
        if (appData.currentInventoryItem) {
            const terminalId = appData.currentInventoryItem.terminalId;
            const itemId = appData.currentInventoryItem.id;
            
            // ВАЖНОЕ ИСПРАВЛЕНИЕ: Проверяем, существует ли terminalItems
            const terminalItems = appData.terminalData[terminalId];
            
            // Если terminalItems не существует или это не массив, создаем новый массив
            if (typeof terminalItems === 'undefined' || !Array.isArray(terminalItems)) {
    console.error(' terminalItems не найден или не является массивом:', terminalItems);
    // Создаем пустой массив, если terminalItems не существует
    terminalItems = [];
    showAlert('Создана новая опись', 'info');
}
            
            const itemIndex = terminalItems.findIndex(item => item.id === itemId);
            
            if (itemIndex === -1) {
                showAlert('Опись не найдена', 'error');
                return;
            }
            
            // Проверяем значения перед присвоением
            const linesInput = document.getElementById('itemLines');
            const quantityInput = document.getElementById('itemQuantity');
            
            const lines = linesInput ? parseInt(linesInput.value) || 0 : 0;
            const quantity = quantityInput ? parseFloat(quantityInput.value) || 0 : 0;
            
            // Обновляем опись
            terminalItems[itemIndex].date = formatDate(date);
            terminalItems[itemIndex].name = reason;
            terminalItems[itemIndex].lines = lines;
            terminalItems[itemIndex].quantity = quantity;
            
            // Сохраняем изменения
            saveTerminalDataToStorage();
            
            showAlert('Опись успешно обновлена', 'success');
            document.getElementById('addInventoryItemModal').style.display = 'none';
            
            // Сбрасываем текущую опись
            appData.currentInventoryItem = null;
            
            // Возвращаемся к просмотру инвентаризации
            const inventoryId = terminalItems[itemIndex].inventoryId;
            if (inventoryId) {
                viewInventoryFull(inventoryId);
            }
        } else {
            // Создаем новую инвентаризацию
            const newInventory = {
                id: generateId(),
                type: type,
                date: formatDate(date),
                reason: reason,
                lines: 0,
                amount: 0,
                difference: 0, // НАЧИНАЕМ С 0 РАЗНИЦЫ
                status: 'active',
                shopId: appData.currentShop.id,
                isClosed: false, // НОВАЯ ИНВЕНТАРИЗАЦИЯ НЕ ЗАКРЫТА
                createdAt: new Date().toISOString()
            };
            
            appData.inventories.push(newInventory);
            document.getElementById('createInventoryModal').style.display = 'none';
            
            // Сохраняем в localStorage
            saveInventoryToStorage(newInventory.id);
            
            loadDashboard();
            showAlert(`Инвентаризация "${reason}" успешно создана`, 'success');
            
            console.log(' Создана новая инвентаризация:', {
                id: newInventory.id,
                тип: newInventory.type,
                Название: newInventory.reason,
                закрыта: newInventory.isClosed,
                разница: newInventory.difference
            });
        }
    });
    
    const uploadInventoriesBtn = document.getElementById('uploadInventoriesBtn');
    const cancelUploadInventories = document.getElementById('cancelUploadInventories');
    const confirmUploadInventories = document.getElementById('confirmUploadInventories');
    const inventoryFiles = document.getElementById('inventoryFiles');
    
    uploadInventoriesBtn && uploadInventoriesBtn.addEventListener('click', () => {
        fillInventorySelect();
        document.getElementById('selectedFiles').innerHTML = '';
        document.getElementById('uploadInventoriesModal').style.display = 'flex';
    });
    
    cancelUploadInventories && cancelUploadInventories.addEventListener('click', () => {
        document.getElementById('uploadInventoriesModal').style.display = 'none';
    });
    
    inventoryFiles && inventoryFiles.addEventListener('change', function(e) {
        const files = e.target.files;
        const filesContainer = document.getElementById('selectedFiles');
        filesContainer.innerHTML = '';
        
        if (files.length > 0) {
            const list = document.createElement('ul');
            list.style.listStyleType = 'none';
            list.style.padding = '0';
            list.style.marginTop = '10px';
            
            for (let i = 0; i < files.length; i++) {
                const item = document.createElement('li');
                item.textContent = `${i+1}. ${files[i].name}`;
                list.appendChild(item);
            }
            
            filesContainer.appendChild(list);
        }
    });

    
    confirmUploadInventories && confirmUploadInventories.addEventListener('click', function() {
        const operatorId = parseInt(document.getElementById('operatorSelect').value);
        const inventoryId = document.getElementById('inventorySelect').value;
        const files = document.getElementById('inventoryFiles').files;
        
        if (!operatorId || !inventoryId || inventoryId === "" || files.length === 0) {
            showAlert('Выберите оператора, инвентаризацию и файлы для загрузки', 'warning');
            return;
        }
        
        setTimeout(() => {
            appData.terminalData[operatorId].forEach(item => {
                if (item.status === 'pending') {
                    item.status = 'loaded';
                    item.inventoryId = inventoryId;
                }
            });
            
            document.getElementById('uploadInventoriesModal').style.display = 'none';
            showAlert('Описи успешно загружены в выбранную инвентаризацию', 'success');
            loadDashboard();
        }, 1500);
    });
    
    // Инициализация модального окна добавления описи
    document.getElementById('cancelAddInventoryItem') && document.getElementById('cancelAddInventoryItem').addEventListener('click', function() {
        document.getElementById('addInventoryItemModal').style.display = 'none';
        appData.currentInventoryItem = null;
        
        // Возвращаемся к просмотру инвентаризации, если было открыто полноэкранное окно
        if (document.getElementById('viewInventoryFullScreen').style.display === 'none') {
            document.getElementById('viewInventoryFullScreen').style.display = 'block';
        }
    });
    
    // Инициализация модального окна загрузки файла описи
    document.getElementById('cancelUploadInventoryItem') && document.getElementById('cancelUploadInventoryItem').addEventListener('click', function() {
        document.getElementById('uploadInventoryItemModal').style.display = 'none';
        
        // Возвращаемся к просмотру инвентаризации, если было открыто полноэкранное окно
        if (document.getElementById('viewInventoryFullScreen').style.display === 'none') {
            document.getElementById('viewInventoryFullScreen').style.display = 'block';
        }
    });
    
    document.getElementById('confirmUploadInventoryItem') && document.getElementById('confirmUploadInventoryItem').addEventListener('click', function() {
        const operatorId = parseInt(document.getElementById('fileOperator').value);
        const file = document.getElementById('inventoryFile').files[0];
        
        if (!operatorId || !file) {
            showAlert('Выберите оператора и файл для загрузки', 'warning');
            return;
        }
        
        // Получаем текущую инвентаризацию из модального окна просмотра
        const inventoryId = document.getElementById('inventoryIdFull').textContent;
        
        // ВАЖНО: Получаем объект инвентаризации
        const inventory = appData.inventories.find(inv => inv.id === inventoryId);
        if (inventory && inventory.isClosed) {
            showAlert('Невозможно добавить опись. Инвентаризация уже закрыта!', 'error');
            return;
        }
        
        // В демо-версии просто создаем тестовые данные
        const newItem = {
            id: generateId(),
            date: formatDate(new Date()),
            name: file.name,
            lines: Math.floor(Math.random() * 100) + 50,
            quantity: Math.floor(Math.random() * 1000) + 500,
            status: 'loaded',
            inventoryId: inventoryId,
            closed: false,
            items: [
                { barcode: "4601234567890", name: "Товар 1", quantity: 10 },
                { barcode: "4601234567891", name: "Товар 2", quantity: 20 },
                { barcode: "4601234567892", name: "Товар 3", quantity: 15 }
            ]
        };
        
        if (!appData.terminalData[operatorId]) {
            appData.terminalData[operatorId] = [];
        }
        
        appData.terminalData[operatorId].push(newItem);
        
        // Сохраняем в localStorage
        saveTerminalDataToStorage();
        
        document.getElementById('uploadInventoryItemModal').style.display = 'none';
        showAlert('Файл описи успешно загружен', 'success');
        
        // Закрываем и снова открываем модальное окно просмотра, чтобы обновить данные
        document.getElementById('viewInventoryFullScreen').style.display = 'none';
        setTimeout(() => viewInventoryFull(inventoryId), 100);
    });
}

// Добавляем вспомогательную функцию сохранения инвентаризации (если её нет)
function saveInventoryToStorage(inventoryId) {
    try {
        const inventory = appData.inventories.find(inv => inv.id === inventoryId);
        if (inventory) {
            localStorage.setItem(`inventory_${inventoryId}`, JSON.stringify(inventory));
            console.log(' Инвентаризация сохранена в localStorage:', inventoryId);
            return true;
        }
    } catch (error) {
        console.error(' Ошибка сохранения инвентаризации:', error);
    }
    return false;
}

        // Заполнение выпадающего списка инвентаризаций
        function fillInventorySelect() {
            const select = document.getElementById('inventorySelect');
            select.innerHTML = '<option value="">-- Выберите инвентаризацию --</option>';
            
            const shopInventories = appData.inventories.filter(
                inv => inv.shopId === appData.currentShop.id && inv.status === 'active'
            );
            
            shopInventories.forEach(inv => {
                const option = document.createElement('option');
                option.value = inv.id;
                option.textContent = `${getInventoryTypeName(inv.type)} (${inv.date}) - ${inv.reason}`;
                select.appendChild(option);
            });
        }

        // Инициализация поиска по истории
        function initHistorySearch() {
            const searchInput = document.getElementById('historySearch');
            const searchButton = document.querySelector('#history-tab .search-box button');
            
            searchButton.addEventListener('click', function() {
                const searchTerm = searchInput.value.toLowerCase();
                
                if (!searchTerm) {
                    loadHistoryTable();
                    return;
                }
                
                const filteredHistory = appData.history.filter(item => 
                    item.name.toLowerCase().includes(searchTerm) || 
                    item.responsible.toLowerCase().includes(searchTerm) ||
                    item.date.includes(searchTerm)
                );
                
                const tbody = document.getElementById('history-table').querySelector('tbody');
                tbody.innerHTML = '';
                
                filteredHistory.forEach(item => {
                    const row = document.createElement('tr');
                    
                    row.appendChild(createCell(item.date));
                    row.appendChild(createCell(item.name));
                    row.appendChild(createCell(`${formatNumber(item.amount)} ₽`));
                    
                    const diffCell = document.createElement('td');
                    const diffBadge = document.createElement('span');
                    diffBadge.className = 'badge badge-danger';
                    diffBadge.textContent = `${formatNumber(item.difference)} ₽`;
                    diffCell.appendChild(diffBadge);
                    row.appendChild(diffCell);
                    
                    const statusCell = document.createElement('td');
                    const statusBadge = document.createElement('span');
                    statusBadge.className = 'badge badge-success';
                    statusBadge.textContent = 'Завершено';
                    statusCell.appendChild(statusBadge);
                    row.appendChild(statusCell);
                    
                    row.appendChild(createCell(item.responsible));
                    
                    tbody.appendChild(row);
                });
            });
        }

        // Инициализация раздела настроек
        function initSettings() {
            // В демо-версии просто показываем уведомление при переходе
        }

        // Инициализация страницы магазинов
        function initShopsPage() {
            document.getElementById('searchShopBtnMain').addEventListener('click', searchShopsMain);
            document.getElementById('sortByDateBtn').addEventListener('click', sortShopsByDate);
            loadShops();
        }

        // Сортировка магазинов по дате последней инвентаризации
        function sortShopsByDate() {
            appData.shops.sort((a, b) => {
                const dateA = parseDate(a.lastInventory);
                const dateB = parseDate(b.lastInventory);
                return dateA - dateB;
            });
            
            loadShops();
            showAlert('Магазины отсортированы по дате последней инвентаризации', 'info');
        }

        // Парсинг даты из формата DD/MM/YYYY
        function parseDate(dateString) {
            if (!dateString) return new Date(0);
            
            const parts = dateString.split('/');
            return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        }

        // Поиск магазинов на странице магазинов
        function searchShopsMain() {
            const searchTerm = document.getElementById('shopSearch').value.toLowerCase();
            const tbody = document.getElementById('shops-table').querySelector('tbody');
            tbody.innerHTML = '';
            
            const filteredShops = appData.shops.filter(shop => 
                shop.name.toLowerCase().includes(searchTerm) || 
                shop.location.toLowerCase().includes(searchTerm) ||
                shop.id.toString().includes(searchTerm)
            );
            
            filteredShops.forEach(shop => {
                const row = document.createElement('tr');
                
                row.appendChild(createCell(shop.id));
                row.appendChild(createCell(shop.name));
                row.appendChild(createCell(shop.location));
                row.appendChild(createCell(shop.lastInventory));
                
                const statusCell = document.createElement('td');
                const statusBadge = document.createElement('span');
                statusBadge.className = `badge ${shop.status === 'active' ? 'badge-success' : 
                                        shop.status === 'warning' ? 'badge-warning' : 'badge-danger'}`;
                statusBadge.textContent = shop.status === 'active' ? 'Активен' : 
                                         shop.status === 'warning' ? 'Внимание' : 'Критично';
                statusCell.appendChild(statusBadge);
                row.appendChild(statusCell);
                
                const actionsCell = document.createElement('td');
                
                const selectBtn = document.createElement('button');
                selectBtn.className = 'btn btn-primary btn-sm';
                selectBtn.innerHTML = '<i class="fas fa-check"></i> Выбрать';
                selectBtn.addEventListener('click', () => selectShop(shop.id));
                actionsCell.appendChild(selectBtn);
                
                row.appendChild(actionsCell);
                tbody.appendChild(row);
            });
        }

        // Загрузка раздела магазинов
        function loadShops() {
            const tbody = document.getElementById('shops-table').querySelector('tbody');
            tbody.innerHTML = '';
            
            appData.shops.forEach(shop => {
                const row = document.createElement('tr');
                
                row.appendChild(createCell(shop.id));
                row.appendChild(createCell(shop.name));
                row.appendChild(createCell(shop.location));
                row.appendChild(createCell(shop.lastInventory));
                
                const statusCell = document.createElement('td');
                const statusBadge = document.createElement('span');
                statusBadge.className = `badge ${shop.status === 'active' ? 'badge-success' : 
                                        shop.status === 'warning' ? 'badge-warning' : 'badge-danger'}`;
                statusBadge.textContent = shop.status === 'active' ? 'Активен' : 
                                         shop.status === 'warning' ? 'Внимание' : 'Критично';
                statusCell.appendChild(statusBadge);
                row.appendChild(statusCell);
                
                const actionsCell = document.createElement('td');
                
                const selectBtn = document.createElement('button');
                selectBtn.className = 'btn btn-primary btn-sm';
                selectBtn.innerHTML = '<i class="fas fa-check"></i> Выбрать';
                selectBtn.addEventListener('click', () => selectShop(shop.id));
                actionsCell.appendChild(selectBtn);
                
                row.appendChild(actionsCell);
                tbody.appendChild(row);
            });
        }

        // Выбор магазина
        function selectShop(shopId) {
            const shop = appData.shops.find(s => s.id === shopId);
            if (!shop) return;
            
            appData.currentShop = {
                id: shop.id,
                name: shop.name,
                location: shop.location,
                lastInventory: shop.lastInventory
            };
            
            document.querySelector('.user-info span').textContent = 
                `${appData.currentUser.name} (${appData.currentShop.name})`;
            
            showNavTab('dashboard');
            loadDashboard();
            showAlert(`Выбран магазин: ${shop.name}`, 'success');
        }




        // Инициализация страницы отчетов
        function initReportsPage() {
            
        }

        // Загрузка раздела отчетов
        function loadReports() {
            // Кнопки уже инициализированы в initReportsPage()
        }
		
// ================== УПРАВЛЕНИЕ ПРОФИЛЕМ ==================

// Инициализация управления профилем
function initProfileManagement() {
    // Обработчик изменения аватара
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    const avatarUpload = document.getElementById('avatarUpload');
    const removeAvatarBtn = document.getElementById('removeAvatarBtn');
    const avatarPreview = document.getElementById('avatarPreview');
    
    if (changeAvatarBtn && avatarUpload) {
        changeAvatarBtn.addEventListener('click', function() {
            avatarUpload.click();
        });
        
        avatarUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) { // 5MB лимит
                    showAlert('Файл слишком большой. Максимальный размер 5MB', 'warning');
                    return;
                }
                
                if (!file.type.startsWith('image/')) {
                    showAlert('Пожалуйста, выберите изображение', 'warning');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    appData.currentUser.avatar = event.target.result;
                    updateAvatarPreview();
                    
                    // Показываем кнопку удаления
                    if (removeAvatarBtn) {
                        removeAvatarBtn.style.display = 'inline-block';
                    }
                    
                    saveProfileToStorage();
                    showAlert('Аватар успешно обновлен', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Обработчик удаления аватара
    if (removeAvatarBtn) {
        removeAvatarBtn.addEventListener('click', function() {
            appData.currentUser.avatar = null;
            updateAvatarPreview();
            this.style.display = 'none';
            
            // Очищаем input файла
            if (avatarUpload) {
                avatarUpload.value = '';
            }
            
            saveProfileToStorage();
            showAlert('Аватар удален', 'success');
        });
    }
}

// Загрузка профиля из localStorage
function loadProfileFromStorage() {
    try {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            appData.currentUser = {
                ...appData.currentUser,
                ...profile
            };
            
            // Обновляем отображение профиля
            updateProfileDisplay();
        }
    } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
    }
}

// Сохранение профиля в localStorage
function saveProfileToStorage() {
    try {
        localStorage.setItem('userProfile', JSON.stringify(appData.currentUser));
    } catch (error) {
        console.error('Ошибка сохранения профиля:', error);
    }
}

// Обновление отображения профиля
function updateProfileDisplay() {
    // Обновляем имя в профиле
    const profileNameDisplay = document.getElementById('profileNameDisplay');
    if (profileNameDisplay) {
        profileNameDisplay.textContent = appData.currentUser.name || 'Системный администратор';
    }
    
    // Обновляем телефон в профиле
    const profilePhoneDisplay = document.getElementById('profilePhoneDisplay');
    if (profilePhoneDisplay) {
        profilePhoneDisplay.textContent = appData.currentUser.phone || 'Телефон не указан';
    }
    
    // Обновляем аватар в профиле
    updateAvatarDisplay();
    
    // Обновляем имя в хедере
    const headerUserName = document.getElementById('headerUserName');
    if (headerUserName) {
        const shopName = appData.currentShop ? ` (${appData.currentShop.name})` : '';
        headerUserName.textContent = `${appData.currentUser.name}${shopName}`;
    }
}

// Обновление отображения аватара
function updateAvatarDisplay() {
    // Аватар в профиле
    const profileAvatarPreview = document.getElementById('profileAvatarPreview');
    const avatarIcon = document.getElementById('avatarIcon');
    
    // Аватар в хедере
    const headerAvatarContainer = document.getElementById('headerAvatarContainer');
    const headerAvatarIcon = document.getElementById('headerAvatarIcon');
    
    // Аватар в модальном окне редактирования
    const avatarPreview = document.getElementById('avatarPreview');
    const previewIcon = document.getElementById('previewIcon');
    
    if (appData.currentUser.avatar) {
        // Если есть загруженный аватар
        if (profileAvatarPreview) {
            profileAvatarPreview.innerHTML = `<img src="${appData.currentUser.avatar}" style="width: 100%; height: 100%; object-fit: cover;">`;
        }
        if (headerAvatarContainer) {
            headerAvatarContainer.innerHTML = `<img src="${appData.currentUser.avatar}" style="width: 100%; height: 100%; object-fit: cover;">`;
        }
        if (avatarPreview) {
            avatarPreview.innerHTML = `<img src="${appData.currentUser.avatar}" style="width: 100%; height: 100%; object-fit: cover;">`;
        }
    } else {
        // Если нет аватара, показываем иконку
        if (profileAvatarPreview && avatarIcon) {
            profileAvatarPreview.innerHTML = '<i class="fas fa-user" id="avatarIcon"></i>';
        }
        if (headerAvatarContainer && headerAvatarIcon) {
            headerAvatarContainer.innerHTML = '<i class="fas fa-user" id="headerAvatarIcon"></i>';
        }
        if (avatarPreview && previewIcon) {
            avatarPreview.innerHTML = '<i class="fas fa-user" id="previewIcon"></i>';
        }
    }
}



// Инициализация обработчиков модального окна профиля
function initProfileModalHandlers() {
    // Кнопка изменения аватара
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', function() {
            document.getElementById('avatarUpload').click();
        });
    }
	
	const editFullName = document.getElementById('editFullName');
    if (editFullName) {
        editFullName.addEventListener('input', function() {
            validateFieldInRealTime('editFullName', this.value);
        });
        
        editFullName.addEventListener('blur', function() {
            validateFieldOnBlur('editFullName', this.value);
        });
    }
    
    // Live validation для телефона
    const editPhone = document.getElementById('editPhone');
    if (editPhone) {
        editPhone.addEventListener('input', function(e) {
            // Маска для телефона
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                
                let formatted = '+7';
                if (value.length > 0) formatted += ' (' + value.substring(0, 3);
                if (value.length > 3) formatted += ') ' + value.substring(3, 6);
                if (value.length > 6) formatted += '-' + value.substring(6, 8);
                if (value.length > 8) formatted += '-' + value.substring(8, 10);
                
                e.target.value = formatted;
            }
            
            validateFieldInRealTime('editPhone', this.value);
        });
        
        editPhone.addEventListener('blur', function() {
            validateFieldOnBlur('editPhone', this.value);
        });
    }
    
    // Live validation для email
    const editEmail = document.getElementById('editEmail');
    if (editEmail) {
        editEmail.addEventListener('input', function() {
            validateFieldInRealTime('editEmail', this.value);
        });
        
        editEmail.addEventListener('blur', function() {
            validateFieldOnBlur('editEmail', this.value);
        });
    }
    
    // Загрузка аватара
    const avatarUpload = document.getElementById('avatarUpload');
    if (avatarUpload) {
        avatarUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    showAlert('Файл слишком большой. Максимальный размер: 5MB', 'warning');
                    return;
                }
                
                if (!file.type.match('image.*')) {
                    showAlert('Пожалуйста, выберите файл изображения', 'warning');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Показываем превью
                    const avatarPreview = document.getElementById('avatarPreview');
                    if (avatarPreview) {
                        avatarPreview.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
                    }
                    
                    // Показываем кнопку удаления
                    const removeAvatarBtn = document.getElementById('removeAvatarBtn');
                    if (removeAvatarBtn) {
                        removeAvatarBtn.style.display = 'inline-block';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Кнопка удаления аватара
    const removeAvatarBtn = document.getElementById('removeAvatarBtn');
    if (removeAvatarBtn) {
        removeAvatarBtn.addEventListener('click', function() {
            // Сбрасываем превью к иконке
            const avatarPreview = document.getElementById('avatarPreview');
            if (avatarPreview) {
                avatarPreview.innerHTML = '<i class="fas fa-user" id="previewIcon"></i>';
            }
            
            // Скрываем кнопку удаления
            this.style.display = 'none';
            
            // Сбрасываем input файла
            const avatarUpload = document.getElementById('avatarUpload');
            if (avatarUpload) {
                avatarUpload.value = '';
            }
        });
    }
    
    // Нажатие на превью аватара
    const avatarPreview = document.getElementById('avatarPreview');
    if (avatarPreview) {
        avatarPreview.addEventListener('click', function() {
            document.getElementById('avatarUpload').click();
        });
    }
    
    // Отмена редактирования профиля
    const cancelEditProfile = document.getElementById('cancelEditProfile');
    if (cancelEditProfile) {
        cancelEditProfile.addEventListener('click', function() {
            document.getElementById('editProfileModal').style.display = 'none';
        });
    }
    
    // Сохранение профиля
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function() {
            saveProfile();
        });
    }
    
    // Закрытие по крестику
    const editProfileModalClose = document.querySelector('#editProfileModal .close');
    if (editProfileModalClose) {
        editProfileModalClose.addEventListener('click', function() {
            document.getElementById('editProfileModal').style.display = 'none';
        });
    }
    
    // Закрытие по клику вне окна
    window.addEventListener('click', function(e) {
        if (e.target.id === 'editProfileModal') {
            document.getElementById('editProfileModal').style.display = 'none';
        }
    });
}


function validateFieldInRealTime(fieldId, value) {
    const field = document.getElementById(fieldId);
    const trimmedValue = value.trim();
    
    if (!field) return;
    
    // Убираем предыдущие стили ошибки
    field.style.borderColor = '';
    field.style.boxShadow = '';
    
    // Валидация в зависимости от поля
    switch(fieldId) {
        case 'editFullName':
            if (trimmedValue.length > 0) {
                if (trimmedValue.length < 2) {
                    field.style.borderColor = '#f39c12';
                    field.style.boxShadow = '0 0 0 0.2rem rgba(243, 156, 18, 0.25)';
                } else if (!/^[а-яА-ЯёЁ\s\-]+$/.test(trimmedValue)) {
                    field.style.borderColor = '#f39c12';
                    field.style.boxShadow = '0 0 0 0.2rem rgba(243, 156, 18, 0.25)';
                } else {
                    field.style.borderColor = '#2ecc71';
                    field.style.boxShadow = '0 0 0 0.2rem rgba(46, 204, 113, 0.25)';
                }
            }
            break;
            
        case 'editPhone':
            if (trimmedValue.length > 0) {
                const cleanPhone = trimmedValue.replace(/\D/g, '');
                if (cleanPhone.length < 10) {
                    field.style.borderColor = '#f39c12';
                    field.style.boxShadow = '0 0 0 0.2rem rgba(243, 156, 18, 0.25)';
                } else {
                    field.style.borderColor = '#2ecc71';
                    field.style.boxShadow = '0 0 0 0.2rem rgba(46, 204, 113, 0.25)';
                }
            }
            break;
            
        case 'editEmail':
            if (trimmedValue.length > 0) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(trimmedValue)) {
                    field.style.borderColor = '#f39c12';
                    field.style.boxShadow = '0 0 0 0.2rem rgba(243, 156, 18, 0.25)';
                } else {
                    field.style.borderColor = '#2ecc71';
                    field.style.boxShadow = '0 0 0 0.2rem rgba(46, 204, 113, 0.25)';
                }
            }
            break;
    }
}

// Валидация поля при потере фокуса
function validateFieldOnBlur(fieldId, value) {
    const field = document.getElementById(fieldId);
    const trimmedValue = value.trim();
    
    if (!field) return;
    
    // Сбрасываем стили
    field.style.borderColor = '';
    field.style.boxShadow = '';
    
    // Проверка обязательности
    switch(fieldId) {
        case 'editFullName':
            if (!trimmedValue) {
                markFieldAsInvalid(fieldId);
            }
            break;
    }
}


// Функция сохранения описей в файл
function saveInventoriesToFile() {
    console.log('💾 СОХРАНЕНИЕ ОПИСЕЙ В ФАЙЛ - НАЧАЛО');
    
    // Проверяем, открыта ли инвентаризация
    const currentInventoryId = appData.currentInventoryId;
    if (!currentInventoryId) {
        showAlert('Не выбрана инвентаризация для сохранения', 'warning');
        return;
    }
    
    // Находим инвентаризацию
    const inventory = appData.inventories.find(inv => inv.id == currentInventoryId);
    if (!inventory) {
        showAlert('Инвентаризация не найдена', 'error');
        return;
    }
    
    // Загружаем актуальные данные из localStorage
    loadTerminalDataFromStorage();
    
    // Получаем описи для этой инвентаризации
    const operators = appData.terminalData[currentInventoryId] || [];
    if (operators.length === 0) {
        showAlert('Нет описей для сохранения', 'info');
        return;
    }
    
    console.log(' Найдено описей для сохранения:', operators.length);
    
    // Создаем модальное окно для выбора формата
    showSaveFormatModal(inventory, operators);
}




// Показать модальное окно выбора формата
function showSaveFormatModal(inventory, operators) {
    // Проверяем, есть ли уже такое модальное окно
    let modal = document.getElementById('saveFormatModal');
    
    if (!modal) {
        // Создаем модальное окно
        modal = document.createElement('div');
        modal.id = 'saveFormatModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2>Сохранить описи в файл</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Инвентаризация:</label>
                        <p><strong>#${inventory.id}</strong> - ${inventory.reason || 'Без названия'}</p>
                    </div>
                    
                    <div class="form-group">
                        <label>Количество описей:</label>
                        <p>${operators.length} описей</p>
                    </div>
                    
                    <div class="form-group">
                        <label for="saveFileFormat">Формат файла:</label>
                        <select id="saveFileFormat" class="form-control">
                            <option value="csv">CSV (.csv)</option>                          
                            <option value="txt">Текстовый файл (.txt)</option>                          
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="includeItems">Что включать:</label>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="includeOperatorInfo" checked>
                            <label class="form-check-label" for="includeOperatorInfo">
                                Информацию об описях
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="includeAllItems" checked>
                            <label class="form-check-label" for="includeAllItems">
                                Все товары из описей
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="includeTotals">
                            <label class="form-check-label" for="includeTotals">
                                Итоговые суммы
                            </label>
                        </div>
                    </div>
                    
                    <div id="saveProgress" style="display: none; margin-top: 20px;">
                        <div class="progress" style="height: 20px;">
                            <div id="saveProgressBar" class="progress-bar progress-bar-striped progress-bar-animated" 
                                 style="width: 0%"></div>
                        </div>
                        <p id="saveProgressText" class="text-center mt-2">Подготовка данных...</p>
                    </div>
                    
                    <div id="saveResult" style="display: none; margin-top: 20px;">
                        <div class="alert alert-success">
                            <i class="fas fa-check-circle"></i> Файл успешно создан!
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="cancelSave" class="btn btn-danger">Отмена</button>
                    <button id="confirmSave" class="btn btn-success">
                        <i class="fas fa-download"></i> Сохранить файл
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Добавляем обработчики событий
        initSaveFormatModalHandlers(inventory, operators);
    }
    
    // Показываем модальное окно
    modal.style.display = 'flex';
}

// Инициализация обработчиков модального окна
function initSaveFormatModalHandlers(inventory, operators) {
    const modal = document.getElementById('saveFormatModal');
    if (!modal) return;
    
    // Закрытие по крестику
    modal.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
        resetSaveModal();
    });
    
    // Закрытие по клику вне окна
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            resetSaveModal();
        }
    });
    
    // Кнопка отмены
    document.getElementById('cancelSave').addEventListener('click', function() {
        modal.style.display = 'none';
        resetSaveModal();
    });
    
    // Кнопка сохранения
    document.getElementById('confirmSave').addEventListener('click', function() {
        const format = document.getElementById('saveFileFormat').value;
        const includeOperatorInfo = document.getElementById('includeOperatorInfo').checked;
        const includeAllItems = document.getElementById('includeAllItems').checked;
        const includeTotals = document.getElementById('includeTotals').checked;
        
        // Показываем прогресс
        document.getElementById('saveProgress').style.display = 'block';
        document.getElementById('confirmSave').disabled = true;
        document.getElementById('cancelSave').disabled = true;
        
        // Имитируем прогресс
        simulateSaveProgress(() => {
            // Создаем и скачиваем файл
            createAndDownloadFile(inventory, operators, format, {
                includeOperatorInfo,
                includeAllItems,
                includeTotals
            });
            
            // Показываем результат
            document.getElementById('saveProgress').style.display = 'none';
            document.getElementById('saveResult').style.display = 'block';
            
            // Через 2 секунды закрываем модальное окно
            setTimeout(() => {
                modal.style.display = 'none';
                resetSaveModal();
            }, 2000);
        });
    });
}

// Сброс состояния модального окна сохранения
function resetSaveModal() {
    setTimeout(() => {
        const saveProgress = document.getElementById('saveProgress');
        const saveResult = document.getElementById('saveResult');
        const confirmSave = document.getElementById('confirmSave');
        const cancelSave = document.getElementById('cancelSave');
        const saveProgressBar = document.getElementById('saveProgressBar');
        const saveProgressText = document.getElementById('saveProgressText');
        
        if (saveProgress) saveProgress.style.display = 'none';
        if (saveResult) saveResult.style.display = 'none';
        if (confirmSave) confirmSave.disabled = false;
        if (cancelSave) cancelSave.disabled = false;
        if (saveProgressBar) saveProgressBar.style.width = '0%';
        if (saveProgressText) saveProgressText.textContent = 'Подготовка данных...';
    }, 500);
}

// Имитация прогресса сохранения
function simulateSaveProgress(callback) {
    let progress = 0;
    const progressBar = document.getElementById('saveProgressBar');
    const progressText = document.getElementById('saveProgressText');
    
    const interval = setInterval(() => {
        progress += 2;
        if (progressBar) progressBar.style.width = progress + '%';
        
        if (progressText) {
            if (progress <= 30) {
                progressText.textContent = 'Сбор данных...';
            } else if (progress <= 60) {
                progressText.textContent = 'Формирование файла...';
            } else if (progress <= 90) {
                progressText.textContent = 'Финальная обработка...';
            }
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            if (progressText) progressText.textContent = 'Готово!';
            setTimeout(callback, 500);
        }
    }, 50);
}

// Создание и скачивание файла
function createAndDownloadFile(inventory, operators, format, options) {
    console.log(' Создание файла формата:', format);
    
    let content = '';
    let mimeType = '';
    let fileName = `Описи_инвентаризации_${inventory.id}_${new Date().toISOString().split('T')[0]}`;
    
    switch (format) {
        case 'csv':
            content = createCSVContent(inventory, operators, options);
            mimeType = 'text/csv;charset=utf-8;';
            fileName += '.csv';
            break;
            
        case 'json':
            content = createJSONContent(inventory, operators, options);
            mimeType = 'application/json;charset=utf-8;';
            fileName += '.json';
            break;
            
        case 'txt':
            content = createTXTContent(inventory, operators, options);
            mimeType = 'text/plain;charset=utf-8;';
            fileName += '.txt';
            break;
            
        case 'html':
            content = createHTMLContent(inventory, operators, options);
            mimeType = 'text/html;charset=utf-8;';
            fileName += '.html';
            break;
    }
    
    // Создаем Blob и скачиваем файл
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    console.log(' Файл создан и скачан:', fileName);
    showAlert(`Файл "${fileName}" успешно сохранен`, 'success');
}

// Создание содержимого CSV
function createCSVContent(inventory, operators, options) {
    let content = '\uFEFF'; // UTF-8 BOM для Excel
    
    // Заголовок
    content += `Описи инвентаризации #${inventory.id}\n`;
    content += `Дата: ${inventory.date || 'Не указана'}\n`;
    content += `Причина: ${inventory.reason || 'Не указана'}\n`;
    content += `Количество описей: ${operators.length}\n\n`;
    
    if (options.includeOperatorInfo) {
        // Информация об описях
        content += 'Информация об описях:\n';
        content += '№;Название описи;Дата;Кол-во строк;Количество;Статус\n';
        
        operators.forEach((operator, index) => {
            content += `${index + 1};"${operator.name || 'Без названия'}";`;
            content += `${operator.date || 'Не указана'};`;
            content += `${operator.lines || 0};`;
            content += `${operator.quantity || 0};`;
            content += `${operator.closed ? 'Закрыта' : 'Открыта'}\n`;
        });
        
        content += '\n';
    }
    
    if (options.includeAllItems) {
        // Товары из всех описей
        content += 'Товары из описей:\n';
        content += 'Опись;Штрихкод;Наименование;Категория;Количество;Цена;Сумма\n';
        
        operators.forEach(operator => {
            if (operator.items && operator.items.length > 0) {
                operator.items.forEach(item => {
                    content += `"${operator.name || 'Без названия'}";`;
                    content += `${item.barcode || ''};`;
                    content += `"${item.name || ''}";`;
                    content += `"${item.category || ''}";`;
                    content += `${item.quantity || 0};`;
                    content += `${item.price || 0};`;
                    content += `${(item.quantity || 0) * (item.price || 0)}\n`;
                });
            }
        });
        
        content += '\n';
    }
    
    if (options.includeTotals) {
        // Итоговые суммы
        content += 'Итоговые суммы:\n';
        
        let totalItems = 0;
        let totalQuantity = 0;
        let totalAmount = 0;
        
        operators.forEach(operator => {
            if (operator.items && operator.items.length > 0) {
                totalItems += operator.items.length;
                
                const operatorQuantity = operator.items.reduce((sum, item) => 
                    sum + (item.quantity || 0), 0);
                totalQuantity += operatorQuantity;
                
                const operatorAmount = operator.items.reduce((sum, item) => 
                    sum + ((item.quantity || 0) * (item.price || 0)), 0);
                totalAmount += operatorAmount;
            }
        });
        
        content += `Всего описей: ${operators.length}\n`;
        content += `Всего товаров: ${totalItems}\n`;
        content += `Общее количество: ${totalQuantity.toFixed(3)}\n`;
        content += `Общая сумма: ${formatNumber(totalAmount)} ₽\n`;
    }
    
    return content;
}

// Создание содержимого JSON
function createJSONContent(inventory, operators, options) {
    const data = {
        inventory: {
            id: inventory.id,
            type: inventory.type,
            date: inventory.date,
            reason: inventory.reason,
            amount: inventory.amount,
            difference: inventory.difference,
            isClosed: inventory.isClosed
        },
        operators: operators.map(operator => {
            const operatorData = {
                id: operator.id,
                name: operator.name,
                date: operator.date,
                lines: operator.lines,
                quantity: operator.quantity,
                closed: operator.closed,
                status: operator.status
            };
            
            if (options.includeAllItems && operator.items) {
                operatorData.items = operator.items.map(item => ({
                    barcode: item.barcode,
                    name: item.name,
                    category: item.category,
                    quantity: item.quantity,
                    price: item.price,
                    totalPrice: (item.quantity || 0) * (item.price || 0)
                }));
            }
            
            return operatorData;
        }),
        exportInfo: {
            exportedAt: new Date().toISOString(),
            exportedBy: appData.currentUser.name,
            format: 'json',
            includeOperatorInfo: options.includeOperatorInfo,
            includeAllItems: options.includeAllItems,
            includeTotals: options.includeTotals
        }
    };
    
    return JSON.stringify(data, null, 2);
}

// Создание содержимого текстового файла
function createTXTContent(inventory, operators, options) {
    let content = '='.repeat(60) + '\n';
    content += 'ОПИСИ ИНВЕНТАРИЗАЦИИ\n';
    content += '='.repeat(60) + '\n\n';
    
    content += `Инвентаризация: #${inventory.id}\n`;
    content += `Дата: ${inventory.date || 'Не указана'}\n`;
    content += `Причина: ${inventory.reason || 'Не указана'}\n`;
    content += `Тип: ${getInventoryTypeName(inventory.type) || inventory.type}\n`;
    content += `Статус: ${inventory.isClosed ? 'ЗАКРЫТА' : 'ОТКРЫТА'}\n`;
    content += `Разница: ${formatNumber(inventory.difference || 0)} ₽\n\n`;
    
    content += '-'.repeat(60) + '\n';
    content += 'СПИСОК ОПИСЕЙ\n';
    content += '-'.repeat(60) + '\n\n';
    
    if (operators.length === 0) {
        content += 'Описей нет\n\n';
    } else {
        operators.forEach((operator, index) => {
            content += `${index + 1}. ${operator.name || 'Опись без названия'}\n`;
            content += `   Дата: ${operator.date || 'Не указана'}\n`;
            content += `   Строк: ${operator.lines || 0}\n`;
            content += `   Количество: ${operator.quantity || 0}\n`;
            content += `   Статус: ${operator.closed ? 'ЗАКРЫТА' : 'ОТКРЫТА'}\n`;
            
            if (options.includeAllItems && operator.items && operator.items.length > 0) {
                content += '   Товары:\n';
                operator.items.forEach((item, itemIndex) => {
                    content += `      ${itemIndex + 1}. ${item.name || 'Без названия'}\n`;
                    content += `         Штрихкод: ${item.barcode || 'Н/Д'}\n`;
                    content += `         Количество: ${item.quantity || 0}\n`;
                    content += `         Цена: ${formatNumber(item.price || 0)} ₽\n`;
                    content += `         Сумма: ${formatNumber((item.quantity || 0) * (item.price || 0))} ₽\n`;
                });
            }
            
            content += '\n';
        });
    }
    
    if (options.includeTotals) {
        content += '-'.repeat(60) + '\n';
        content += 'ИТОГИ\n';
        content += '-'.repeat(60) + '\n\n';
        
        let totalOperators = operators.length;
        let totalItems = 0;
        let totalQuantity = 0;
        let totalAmount = 0;
        
        operators.forEach(operator => {
            if (operator.items) {
                totalItems += operator.items.length;
                totalQuantity += operator.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
                totalAmount += operator.items.reduce((sum, item) => 
                    sum + ((item.quantity || 0) * (item.price || 0)), 0);
            }
        });
        
        content += `Всего описей: ${totalOperators}\n`;
        content += `Всего товаров: ${totalItems}\n`;
        content += `Общее количество: ${totalQuantity.toFixed(3)}\n`;
        content += `Общая сумма: ${formatNumber(totalAmount)} ₽\n\n`;
    }
    
    content += '='.repeat(60) + '\n';
    content += `Сформировано: ${new Date().toLocaleString('ru-RU')}\n`;
    content += `Пользователь: ${appData.currentUser.name}\n`;
    content += 'Система управления инвентаризацией\n';
    content += '='.repeat(60) + '\n';
    
    return content;
}

// Создание HTML содержимого (для PDF)
function createHTMLContent(inventory, operators, options) {
    const html = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Описи инвентаризации #${inventory.id}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    line-height: 1.6;
                }
                ...header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid #333;
                    padding-bottom: 20px;
                }
                ...inventory-info {
                    margin-bottom: 30px;
                }
                ...operator-list {
                    margin-bottom: 30px;
                }
                ...operator {
                    margin-bottom: 20px;
                    padding: 15px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                ...operator-header {
                    background-color: #f8f9fa;
                    padding: 10px;
                    border-radius: 3px;
                    margin-bottom: 10px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f8f9fa;
                }
                ...total {
                    font-weight: bold;
                    background-color: #e8f4fd;
                }
                ...footer {
                    margin-top: 50px;
                    font-size: 12px;
                    color: #666;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Описи инвентаризации</h1>
                <h2>#${inventory.id} - ${inventory.reason || 'Без названия'}</h2>
            </div>
            
            <div class="inventory-info">
                <p><strong>Дата:</strong> ${inventory.date || 'Не указана'}</p>
                <p><strong>Тип:</strong> ${getInventoryTypeName(inventory.type) || inventory.type}</p>
                <p><strong>Статус:</strong> ${inventory.isClosed ? 'ЗАКРЫТА' : 'ОТКРЫТА'}</p>
                <p><strong>Количество описей:</strong> ${operators.length}</p>
            </div>
            
            <div class="operator-list">
                <h3>Список описей</h3>
                ${operators.map((operator, index) => `
                    <div class="operator">
                        <div class="operator-header">
                            <h4>${index + 1}. ${operator.name || 'Опись без названия'}</h4>
                            <p>Дата: ${operator.date || 'Не указана'} | 
                               Строк: ${operator.lines || 0} | 
                               Количество: ${operator.quantity || 0} | 
                               Статус: ${operator.closed ? 'ЗАКРЫТА' : 'ОТКРЫТА'}</p>
                        </div>
                        ${operator.items && operator.items.length > 0 ? `
                            <table>
                                <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Штрихкод</th>
                                        <th>Наименование</th>
                                        <th>Количество</th>
                                        <th>Цена</th>
                                        <th>Сумма</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${operator.items.map((item, itemIndex) => `
                                        <tr>
                                            <td>${itemIndex + 1}</td>
                                            <td>${item.barcode || 'Н/Д'}</td>
                                            <td>${item.name || 'Без названия'}</td>
                                            <td>${item.quantity || 0}</td>
                                            <td>${formatNumber(item.price || 0)} ₽</td>
                                            <td>${formatNumber((item.quantity || 0) * (item.price || 0))} ₽</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        ` : '<p>Товаров нет</p>'}
                    </div>
                `).join('')}
            </div>
            
            <div class="footer">
                <p>Сформировано: ${new Date().toLocaleString('ru-RU')}</p>
                <p>Пользователь: ${appData.currentUser.name}</p>
                <p>Система управления инвентаризацией</p>
            </div>
        </body>
        </html>
    `;
    
    return html;
}



// Валидация и сохранение профиля
function saveProfile() {
    const fullName = document.getElementById('editFullName').value.trim();
    const phone = document.getElementById('editPhone').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const avatarUpload = document.getElementById('avatarUpload');
    const profileError = document.getElementById('profileError');
    
    // Сбрасываем ошибки
    profileError.textContent = '';
    profileError.style.display = 'none';
    
    // Убираем красные рамки с полей
    clearValidationStyles();
    
    let isValid = true;
    let errorMessages = [];
    
    // Валидация ФИО
    if (!fullName) {
        markFieldAsInvalid('editFullName');
        errorMessages.push('Введите ФИО');
        isValid = false;
    } else if (fullName.length < 2) {
        markFieldAsInvalid('editFullName');
        errorMessages.push('ФИО должно содержать минимум 2 символа');
        isValid = false;
    } else if (fullName.length > 100) {
        markFieldAsInvalid('editFullName');
        errorMessages.push('ФИО слишком длинное (максимум 100 символов)');
        isValid = false;
    } else if (!/^[а-яА-ЯёЁ\s\-]+$/.test(fullName)) {
        markFieldAsInvalid('editFullName');
        errorMessages.push('ФИО должно содержать только русские буквы, пробелы и дефисы');
        isValid = false;
    }
    
    // Валидация телефона (необязательное поле)
    if (phone) {
        // Очищаем телефон от всего, кроме цифр
        const cleanPhone = phone.replace(/\D/g, '');
        
        if (cleanPhone.length < 10) {
            markFieldAsInvalid('editPhone');
            errorMessages.push('Номер телефона должен содержать минимум 10 цифр');
            isValid = false;
        } else if (cleanPhone.length > 15) {
            markFieldAsInvalid('editPhone');
            errorMessages.push('Номер телефона слишком длинный');
            isValid = false;
        } else if (!/^[\d\s\-\+\(\)]+$/.test(phone)) {
            markFieldAsInvalid('editPhone');
            errorMessages.push('Введите корректный номер телефона');
            isValid = false;
        } else {
            // Форматируем телефон для сохранения
            const formattedPhone = formatPhoneNumber(phone);
            document.getElementById('editPhone').value = formattedPhone;
        }
    }
    
    // Валидация email (необязательное поле)
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            markFieldAsInvalid('editEmail');
            errorMessages.push('Введите корректный email адрес');
            isValid = false;
        } else if (email.length > 100) {
            markFieldAsInvalid('editEmail');
            errorMessages.push('Email слишком длинный (максимум 100 символов)');
            isValid = false;
        } else {
            // Проверка домена
            const domain = email.split('@')[1];
            const commonDomains = ['gmail.com', 'mail.ru', 'yandex.ru', 'rambler.ru', 'outlook.com', 'yahoo.com'];
            if (!commonDomains.some(d => domain.includes(d))) {
                // Не блокируем, но предупреждаем
                errorMessages.push('Проверьте правильность домена в email');
            }
        }
    }
    
    // Валидация аватара
    if (avatarUpload.files.length > 0) {
        const file = avatarUpload.files[0];
        
        // Проверка размера файла (максимум 5MB)
        if (file.size > 5 * 1024 * 1024) {
            markFieldAsInvalid('avatarUpload');
            errorMessages.push('Файл слишком большой. Максимальный размер: 5MB');
            isValid = false;
        }
        
        // Проверка типа файла
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            markFieldAsInvalid('avatarUpload');
            errorMessages.push('Допустимые форматы: JPG, PNG, GIF, WebP');
            isValid = false;
        }
        
        // Проверка разрешения изображения
        const img = new Image();
        img.onload = function() {
            if (this.width > 2000 || this.height > 2000) {
                markFieldAsInvalid('avatarUpload');
                errorMessages.push('Изображение слишком большое. Максимальное разрешение: 2000x2000 пикселей');
                isValid = false;
            }
        };
        img.src = URL.createObjectURL(file);
    }
    
    // Если есть ошибки, показываем их
    if (!isValid) {
        profileError.innerHTML = errorMessages.map(msg => 
            `<div><i class="fas fa-exclamation-circle"></i> ${msg}</div>`
        ).join('');
        profileError.style.display = 'block';
        
        // Прокручиваем к первой ошибке
        profileError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }
    
    // Сохраняем данные
    appData.currentUser.name = fullName;
    appData.currentUser.phone = phone;
    appData.currentUser.email = email;
    
    // Показываем индикатор загрузки
    showLoadingIndicator();
    
    // Сохраняем аватар если загружен новый
    if (avatarUpload.files.length > 0) {
        const file = avatarUpload.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            appData.currentUser.avatar = event.target.result;
            completeProfileSave();
        };
        
        reader.onerror = function() {
            hideLoadingIndicator();
            profileError.textContent = 'Ошибка загрузки изображения';
            profileError.style.display = 'block';
        };
        
        reader.readAsDataURL(file);
    } else {
        // Если аватар был удален
        const removeAvatarBtn = document.getElementById('removeAvatarBtn');
        if (removeAvatarBtn && removeAvatarBtn.style.display !== 'none') {
            appData.currentUser.avatar = null;
        }
        
        completeProfileSave();
    }
}

// Завершение сохранения профиля
function completeProfileSave() {
    saveProfileToStorage();
    updateProfileDisplay();
    
    // Скрываем модальное окно
    setTimeout(() => {
        document.getElementById('editProfileModal').style.display = 'none';
        hideLoadingIndicator();
        showAlert('Профиль успешно обновлен', 'success');
        
        // Сбрасываем форму
        resetProfileForm();
    }, 500);
}

// Показать индикатор загрузки
function showLoadingIndicator() {
    const saveBtn = document.getElementById('saveProfileBtn');
    const cancelBtn = document.getElementById('cancelEditProfile');
    
    if (saveBtn) {
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Сохранение...';
        saveBtn.disabled = true;
    }
    
    if (cancelBtn) {
        cancelBtn.disabled = true;
    }
}

// Скрыть индикатор загрузки
function hideLoadingIndicator() {
    const saveBtn = document.getElementById('saveProfileBtn');
    const cancelBtn = document.getElementById('cancelEditProfile');
    
    if (saveBtn) {
        saveBtn.innerHTML = 'Сохранить изменения';
        saveBtn.disabled = false;
    }
    
    if (cancelBtn) {
        cancelBtn.disabled = false;
    }
}

// Сброс формы профиля
function resetProfileForm() {
    document.getElementById('avatarUpload').value = '';
    const removeAvatarBtn = document.getElementById('removeAvatarBtn');
    if (removeAvatarBtn) {
        removeAvatarBtn.style.display = 'none';
    }
    
    clearValidationStyles();
}

// Отметить поле как невалидное
function markFieldAsInvalid(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.style.borderColor = '#e74c3c';
        field.style.boxShadow = '0 0 0 0.2rem rgba(231, 76, 60, 0.25)';
        
        // Добавляем иконку ошибки
        const parent = field.parentElement;
        if (!parent.querySelector('.field-error-icon')) {
            const errorIcon = document.createElement('span');
            errorIcon.className = 'field-error-icon';
            errorIcon.innerHTML = '<i class="fas fa-exclamation-circle" style="color: #e74c3c; margin-left: 5px;"></i>';
            parent.appendChild(errorIcon);
        }
    }
}

// Очистить стили валидации
function clearValidationStyles() {
    // Очищаем поля ввода
    const fields = ['editFullName', 'editPhone', 'editEmail', 'avatarUpload'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '';
            field.style.boxShadow = '';
        }
    });
    
    // Удаляем иконки ошибок
    document.querySelectorAll('.field-error-icon').forEach(icon => {
        icon.remove();
    });
    
    // Очищаем сообщение об ошибке
    const profileError = document.getElementById('profileError');
    if (profileError) {
        profileError.textContent = '';
        profileError.style.display = 'none';
    }
}

// Форматирование номера телефона
function formatPhoneNumber(phone) {
    if (!phone) return '';
    
    // Оставляем только цифры
    let cleaned = phone.replace(/\D/g, '');
    
    // Если номер пустой, возвращаем пустую строку
    if (!cleaned) return '';
    
    // Удаляем начальный 7 или 8, но сохраняем для российских номеров
    if (cleaned.startsWith('7') || cleaned.startsWith('8')) {
        cleaned = cleaned.substring(1);
    }
    
    // Если номер начинается с 9 (мобильный), добавляем +7
    if (cleaned.length === 10 && cleaned.startsWith('9')) {
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
        if (match) {
            return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
        }
    }
    
    // Если номер начинается не с 9, но имеет 10 цифр
    if (cleaned.length === 10) {
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
        if (match) {
            return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
        }
    }
    
    // Для неполных номеров показываем частичное форматирование
    if (cleaned.length <= 3) {
        return `+7 (${cleaned}`;
    } else if (cleaned.length <= 6) {
        return `+7 (${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else if (cleaned.length <= 8) {
        return `+7 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length <= 10) {
        return `+7 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8)}`;
    }
    
    // Если номер слишком длинный, обрезаем до 10 цифр
    if (cleaned.length > 10) {
        cleaned = cleaned.slice(0, 10);
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
        if (match) {
            return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
        }
    }
    
    // Если не удалось отформатировать, возвращаем с +7
    return `+7 ${cleaned}`;
}

// Валидация номера телефона
function validatePhoneNumber(phone) {
    if (!phone) return { isValid: false, message: 'Введите номер телефона' };
    
    // Оставляем только цифры
    const cleaned = phone.replace(/\D/g, '');
    
    // Проверяем длину (10 цифр без кода страны)
    if (cleaned.length !== 10) {
        return { 
            isValid: false, 
            message: 'Номер телефона должен содержать 10 цифр' 
        };
    }
    
    // Проверяем, что номер начинается с 9 (мобильные РФ) или с 3-6 (городские)
    if (!/^[3456789]/.test(cleaned)) {
        return { 
            isValid: false, 
            message: 'Неверный формат номера телефона' 
        };
    }
    
    return { isValid: true, message: '' };
}

// Инициализация маски телефона
function initPhoneMask() {
    const phoneInput = document.getElementById('editPhone');
    
    if (!phoneInput) return;
    
    // Устанавливаем placeholder
    phoneInput.placeholder = '+7 (___) ___-__-__';
    
    // Обработчик ввода
    phoneInput.addEventListener('input', function(e) {
        const input = e.target;
        let value = input.value;
        const selectionStart = input.selectionStart;
        
        // Удаляем все нецифровые символы
        let cleaned = value.replace(/\D/g, '');
        
        // Удаляем начальный 7 или 8 если они есть
        if (cleaned.startsWith('7') || cleaned.startsWith('8')) {
            cleaned = cleaned.substring(1);
        }
        
        // Ограничиваем длину 10 цифрами
        cleaned = cleaned.slice(0, 10);
        
        // Форматируем по мере ввода
        let formatted = '';
        if (cleaned.length > 0) {
            formatted = '+7';
            if (cleaned.length > 0) {
                formatted += ` (${cleaned.slice(0, 3)}`;
            }
            if (cleaned.length > 3) {
                formatted += `) ${cleaned.slice(3, 6)}`;
            }
            if (cleaned.length > 6) {
                formatted += `-${cleaned.slice(6, 8)}`;
            }
            if (cleaned.length > 8) {
                formatted += `-${cleaned.slice(8, 10)}`;
            }
        }
        
        input.value = formatted;
        
        // Восстанавливаем позицию курсора
        setTimeout(() => {
            // Рассчитываем новую позицию курсора
            let newPosition = selectionStart;
            
            // Если добавлялись символы форматирования, корректируем позицию
            if (formatted.length > value.length) {
                const addedChars = formatted.length - value.length;
                newPosition += addedChars;
            }
            
            input.setSelectionRange(newPosition, newPosition);
        }, 0);
        
        // Проверяем валидность
        validatePhoneInput(input);
    });
    
    // Обработчик потери фокуса - финальное форматирование
    phoneInput.addEventListener('blur', function() {
        const value = this.value;
        const cleaned = value.replace(/\D/g, '');
        
        if (cleaned.length === 10) {
            this.value = formatPhoneNumber(value);
            validatePhoneInput(this);
        } else if (cleaned.length > 0 && cleaned.length < 10) {
            this.classList.add('invalid');
            showFieldError(this, 'Введите полный номер телефона (10 цифр)');
        }
    });
    
    // Обработчик получения фокуса - очищаем если только +7
    phoneInput.addEventListener('focus', function() {
        if (this.value === '+7' || this.value === '+7 ') {
            this.value = '';
        }
        clearFieldError(this);
    });
    
    // Обработчик клавиш для навигации
    phoneInput.addEventListener('keydown', function(e) {
        // Разрешаем стандартные клавиши навигации
        if ([8, 9, 13, 16, 17, 18, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 91, 144].includes(e.keyCode)) {
            return;
        }
        
        // Разрешаем цифры и функциональные клавиши
        if ((e.keyCode >= 48 && e.keyCode <= 57) || // цифры
            (e.keyCode >= 96 && e.keyCode <= 105) || // цифры на numpad
            e.keyCode === 107 || e.keyCode === 109 || e.keyCode === 110) { // +, -, .
            return;
        }
        
        // Запрещаем все остальные символы
        e.preventDefault();
    });
}

// Валидация поля телефона
function validatePhoneInput(input) {
    const value = input.value;
    const cleaned = value.replace(/\D/g, '');
    
    clearFieldError(input);
    input.classList.remove('valid', 'invalid', 'warning');
    
    if (!value.trim()) {
        input.classList.add('warning');
        showFieldError(input, 'Рекомендуется указать номер телефона');
        return false;
    }
    
    if (cleaned.length === 10) {
        const validation = validatePhoneNumber(value);
        if (validation.isValid) {
            input.classList.add('valid');
            return true;
        } else {
            input.classList.add('invalid');
            showFieldError(input, validation.message);
            return false;
        }
    } else if (cleaned.length > 0 && cleaned.length < 10) {
        input.classList.add('invalid');
        showFieldError(input, 'Введите полный номер телефона (10 цифр)');
        return false;
    }
    
    return false;
}

// Показать ошибку поля
function showFieldError(input, message) {
    // Удаляем старую ошибку
    clearFieldError(input);
    
    // Создаем элемент ошибки
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color: #e74c3c; font-size: 12px; margin-top: 5px;';
    
    // Вставляем после поля ввода
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

// Очистить ошибку поля
function clearFieldError(input) {
    const errorDiv = input.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Обновление аватарки в шапке
function updateHeaderAvatar() {
    const headerAvatarContainer = document.getElementById('headerAvatarContainer');
    const headerAvatarIcon = document.getElementById('headerAvatarIcon');
    
    if (appData.currentUser.avatar) {
        // Скрываем иконку и показываем изображение
        headerAvatarIcon.style.display = 'none';
        headerAvatarContainer.style.backgroundImage = `url(${appData.currentUser.avatar})`;
        headerAvatarContainer.style.backgroundSize = 'cover';
        headerAvatarContainer.style.backgroundPosition = 'center';
        headerAvatarContainer.style.backgroundColor = 'transparent';
    } else {
        // Показываем иконку по умолчанию
        headerAvatarIcon.style.display = 'flex';
        headerAvatarContainer.style.backgroundImage = '';
        headerAvatarContainer.style.backgroundColor = '#3498db';
    }
}

// Обновление отображения профиля
function updateProfileDisplay() {
    document.getElementById('profileNameDisplay').textContent = appData.currentUser.name;
    document.getElementById('profilePhoneDisplay').textContent = 
        appData.currentUser.phone || 'Телефон не указан';
    
    // Обновляем аватарку в настройках
    const profileAvatarPreview = document.getElementById('profileAvatarPreview');
    const profileAvatarIcon = document.getElementById('avatarIcon');
    
    if (appData.currentUser.avatar) {
        profileAvatarIcon.style.display = 'none';
        profileAvatarPreview.style.backgroundImage = `url(${appData.currentUser.avatar})`;
        profileAvatarPreview.style.backgroundSize = 'cover';
        profileAvatarPreview.style.backgroundPosition = 'center';
    } else {
        profileAvatarIcon.style.display = 'flex';
        profileAvatarPreview.style.backgroundImage = '';
    }
    
    // Обновляем аватарку в шапке
    updateHeaderAvatar();
    
    // Обновляем имя в шапке
    document.getElementById('headerUserName').textContent = 
        `${appData.currentUser.name} (${appData.currentShop ? appData.currentShop.name : 'Магазин не выбран'})`;
}

// Открытие модального окна редактирования профиля
function openEditProfileModal() {
    // Заполняем поля текущими данными
    document.getElementById('editFullName').value = appData.currentUser.name;
    document.getElementById('editPhone').value = appData.currentUser.phone || '';
    document.getElementById('editEmail').value = appData.currentUser.email || '';
    
    // Сбрасываем аватарку
    const preview = document.getElementById('avatarPreview');
    const previewIcon = document.getElementById('previewIcon');
    preview.style.backgroundImage = '';
    previewIcon.style.display = 'block';
    document.getElementById('removeAvatarBtn').style.display = 'none';
    document.getElementById('avatarUpload').value = '';
    
    // Сбрасываем ошибки
    document.getElementById('profileError').style.display = 'none';
    
    // Показываем модальное окно
    document.getElementById('editProfileModal').style.display = 'flex';
}

// Сохранение изменений профиля
function saveProfileChanges() {
    const fullName = document.getElementById('editFullName').value.trim();
    const phone = document.getElementById('editPhone').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const errorElement = document.getElementById('profileError');
    
    // Валидация
    if (!fullName) {
        errorElement.textContent = 'ФИО обязательно для заполнения';
        errorElement.style.display = 'block';
        return;
    }
    
    // Проверка телефона (опционально)
    if (phone && !/^[\d\s\-\+\(\)]+$/.test(phone)) {
        errorElement.textContent = 'Введите корректный номер телефона';
        errorElement.style.display = 'block';
        return;
    }
    
    // Проверка email (опционально)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorElement.textContent = 'Введите корректный email';
        errorElement.style.display = 'block';
        return;
    }
    
    // Сохраняем данные
    appData.currentUser.name = fullName;
    appData.currentUser.phone = phone;
    appData.currentUser.email = email;
    
    // Сохраняем аватарку, если загружена
    const avatarPreview = document.getElementById('avatarPreview');
    if (avatarPreview.style.backgroundImage && avatarPreview.style.backgroundImage !== 'none') {
        appData.currentUser.avatar = avatarPreview.style.backgroundImage.slice(4, -1).replace(/"/g, "");
    } else if (document.getElementById('removeAvatarBtn').style.display === 'inline-block') {
        // Если была нажата кнопка удаления
        appData.currentUser.avatar = null;
    }
    
        // Обновляем отображение (включая шапку)
    updateProfileDisplay();
    
    // Закрываем модальное окно
    document.getElementById('editProfileModal').style.display = 'none';
    
    // Показываем уведомление
    showAlert('Профиль успешно обновлен', 'success');
    
    // Сохраняем в localStorage (для демонстрации)
    try {
        localStorage.setItem('userProfile', JSON.stringify({
            name: appData.currentUser.name,
            phone: appData.currentUser.phone,
            email: appData.currentUser.email,
            avatar: appData.currentUser.avatar
        }));
    } catch (e) {
        console.log('Не удалось сохранить профиль в localStorage');
    }
}

// Загрузка профиля из localStorage
function loadProfileFromStorage() {
    try {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            appData.currentUser.name = profile.name || appData.currentUser.name;
            appData.currentUser.phone = profile.phone || '';
            appData.currentUser.email = profile.email || '';
            appData.currentUser.avatar = profile.avatar || null;
            
            updateProfileDisplay();
        }
    } catch (e) {
        console.log('Не удалось загрузить профиль из localStorage');
    }
}

function selectShop(shopId) {
    const shop = appData.shops.find(s => s.id === shopId);
    if (!shop) return;
    
    appData.currentShop = {
        id: shop.id,
        name: shop.name,
        location: shop.location,
        lastInventory: shop.lastInventory
    };
    
    // Обновляем отображение (включая шапку)
    updateProfileDisplay();
    
    showNavTab('dashboard');
    loadDashboard();
    showAlert(`Выбран магазин: ${shop.name}`, 'success');
}

        // Инициализация страницы настроек
        function initSettingsPage() {
		initProfileManagement();
            document.getElementById('changePasswordBtn').addEventListener('click', () => {
                document.getElementById('changePasswordModal').style.display = 'flex';
                document.getElementById('currentPassword').value = '';
                document.getElementById('newPassword').value = '';
                document.getElementById('confirmNewPassword').value = '';
                document.getElementById('passwordError').style.display = 'none';
            });
			
			 initChangePassword();
			 
			 const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            const modal = document.getElementById('changePasswordModal');
            if (modal) {
                modal.style.display = 'flex';
                
                // Очищаем поля
                const currentPass = document.getElementById('currentPassword');
                const newPass = document.getElementById('newPassword');
                const confirmPass = document.getElementById('confirmNewPassword');
                const errorDiv = document.getElementById('passwordError');
                
                if (currentPass) currentPass.value = '';
                if (newPass) newPass.value = '';
                if (confirmPass) confirmPass.value = '';
                if (errorDiv) {
                    errorDiv.style.display = 'none';
                    errorDiv.innerHTML = '';
                }
            }
        });
    }
    
    // Закрытие модального окна изменения пароля
    const closeBtns = document.querySelectorAll('#changePasswordModal .close, #cancelChangePassword');
    closeBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                const modal = document.getElementById('changePasswordModal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        }
    });
    
    // Подтверждение изменения пароля
    const confirmBtn = document.getElementById('confirmChangePassword');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            const currentPassword = document.getElementById('currentPassword')?.value || '';
            const newPassword = document.getElementById('newPassword')?.value || '';
            const confirmNewPassword = document.getElementById('confirmNewPassword')?.value || '';
            const errorDiv = document.getElementById('passwordError');
            
            // Валидация
            let errors = [];
            
            if (!currentPassword) errors.push('Введите текущий пароль');
            if (!newPassword) errors.push('Введите новый пароль');
            if (!confirmNewPassword) errors.push('Подтвердите новый пароль');
            
            if (newPassword.length < 6) {
                errors.push('Новый пароль должен быть не менее 6 символов');
            }
            
            if (newPassword !== confirmNewPassword) {
                errors.push('Новые пароли не совпадают');
            }
            
            // В демо-версии проверяем, что текущий пароль "admin"
            if (currentPassword && currentPassword !== 'admin') {
                errors.push('Неверный текущий пароль');
            }
            
            if (errors.length > 0 && errorDiv) {
                errorDiv.innerHTML = errors.map(error => `<div><i class="fas fa-exclamation-circle"></i> ${error}</div>`).join('');
                errorDiv.style.display = 'block';
                return;
            }
            
            // Успешное изменение
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
            
            showAlert('Пароль успешно изменен!', 'success');
            document.getElementById('changePasswordModal').style.display = 'none';
        });
    }
            
            document.getElementById('cancelChangePassword').addEventListener('click', () => {
                document.getElementById('changePasswordModal').style.display = 'none';
            });
            
            document.getElementById('confirmChangePassword').addEventListener('click', () => {
                const currentPassword = document.getElementById('currentPassword').value;
                const newPassword = document.getElementById('newPassword').value;
                const confirmNewPassword = document.getElementById('confirmNewPassword').value;
                const errorElement = document.getElementById('passwordError');
                
                if (currentPassword !== 'admin') {
                    errorElement.textContent = 'Текущий пароль неверный';
                    errorElement.style.display = 'block';
                    return;
                }
                
                if (newPassword !== confirmNewPassword) {
                    errorElement.textContent = 'Новые пароли не совпадают';
                    errorElement.style.display = 'block';
                    return;
                }
                
                if (newPassword.length < 6) {
                    errorElement.textContent = 'Пароль должен содержать минимум 6 символов';
                    errorElement.style.display = 'block';
                    return;
                }
                
                
            });
        }

        // Загрузка раздела настроек
        function loadSettings() {
            // Кнопки уже инициализированы в initSettingsPage()
        }
		
		// В функцию initSettingsPage() или в конец инициализации добавьте:
function initChangePassword() {
    // Обработчик кнопки "Изменить пароль"
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            const modal = document.getElementById('changePasswordModal');
            if (modal) {
                modal.style.display = 'flex';
                
                // Очищаем поля при открытии
                const currentPass = document.getElementById('currentPassword');
                const newPass = document.getElementById('newPassword');
                const confirmPass = document.getElementById('confirmNewPassword');
                const errorDiv = document.getElementById('passwordError');
                
                if (currentPass) currentPass.value = '';
                if (newPass) newPass.value = '';
                if (confirmPass) confirmPass.value = '';
                if (errorDiv) {
                    errorDiv.style.display = 'none';
                    errorDiv.innerHTML = '';
                    errorDiv.className = 'password-error';
                }
            }
        });
    }
    
    // Закрытие модального окна
    const closeModal = function() {
        const modal = document.getElementById('changePasswordModal');
        if (modal) {
            modal.style.display = 'none';
            
            // Очищаем поля
            const currentPass = document.getElementById('currentPassword');
            const newPass = document.getElementById('newPassword');
            const confirmPass = document.getElementById('confirmNewPassword');
            const errorDiv = document.getElementById('passwordError');
            
            if (currentPass) currentPass.value = '';
            if (newPass) newPass.value = '';
            if (confirmPass) confirmPass.value = '';
            if (errorDiv) {
                errorDiv.style.display = 'none';
                errorDiv.innerHTML = '';
            }
        }
    };
    
    // Назначаем обработчики закрытия
    const closeBtn = document.querySelector('#changePasswordModal .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    const cancelBtn = document.getElementById('cancelChangePassword');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    // Подтверждение изменения пароля
    const confirmBtn = document.getElementById('confirmChangePassword');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmNewPassword = document.getElementById('confirmNewPassword').value;
            const errorDiv = document.getElementById('passwordError');
            
            // Очищаем предыдущие сообщения
            if (errorDiv) {
                errorDiv.innerHTML = '';
                errorDiv.style.display = 'none';
                errorDiv.className = 'password-error';
            }
            
            // Валидация
            let errors = [];
            
            // Проверка: заполнены ли все поля
            if (!currentPassword) errors.push('Введите текущий пароль');
            if (!newPassword) errors.push('Введите новый пароль');
            if (!confirmNewPassword) errors.push('Подтвердите новый пароль');
            
            // Если есть пустые поля - показываем ошибки и выходим
            if (errors.length > 0) {
                if (errorDiv) {
                    errorDiv.innerHTML = errors.map(error => 
                        `<div><i class="fas fa-exclamation-circle"></i> ${error}</div>`
                    ).join('');
                    errorDiv.style.display = 'block';
                    errorDiv.className = 'password-error error';
                }
                return;
            }
            
            // Проверка 1: Действующий пароль должен быть "admin" (для демо)
            if (currentPassword !== 'admin') {
                if (errorDiv) {
                    errorDiv.innerHTML = '<div><i class="fas fa-exclamation-circle"></i> Неверный текущий пароль</div>';
                    errorDiv.style.display = 'block';
                    errorDiv.className = 'password-error error';
                }
                return;
            }
            
            // Проверка 2: Длина нового пароля
            if (newPassword.length < 6) {
                if (errorDiv) {
                    errorDiv.innerHTML = '<div><i class="fas fa-exclamation-circle"></i> Новый пароль должен быть не менее 6 символов</div>';
                    errorDiv.style.display = 'block';
                    errorDiv.className = 'password-error error';
                }
                return;
            }
            
            // Проверка 3: Новый пароль не должен совпадать с текущим
            if (newPassword === currentPassword) {
                if (errorDiv) {
                    errorDiv.innerHTML = '<div><i class="fas fa-exclamation-circle"></i> Новый пароль не должен совпадать с текущим</div>';
                    errorDiv.style.display = 'block';
                    errorDiv.className = 'password-error error';
                }
                return;
            }
            
            // Проверка 4: Новый пароль и подтверждение должны совпадать
            if (newPassword !== confirmNewPassword) {
                if (errorDiv) {
                    errorDiv.innerHTML = '<div><i class="fas fa-exclamation-circle"></i> Новые пароли не совпадают</div>';
                    errorDiv.style.display = 'block';
                    errorDiv.className = 'password-error error';
                }
                return;
            }
            
            // Все проверки пройдены - показываем успех
            if (errorDiv) {
                errorDiv.innerHTML = '<div><i class="fas fa-check-circle"></i> Пароль успешно изменен!</div>';
                errorDiv.style.display = 'block';
                errorDiv.className = 'password-error success';
            }
            
            // Закрываем окно через 2 секунды
            setTimeout(() => {
                closeModal();
            }, 2000);
        });
    }
    
    // Добавим валидацию в реальном времени для поля подтверждения пароля
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmNewPassword');
    
    if (newPasswordInput && confirmPasswordInput) {
        const checkPasswordsMatch = function() {
            const newPass = newPasswordInput.value;
            const confirmPass = confirmPasswordInput.value;
            
            if (newPass && confirmPass && newPass !== confirmPass) {
                confirmPasswordInput.style.borderColor = '#e74c3c';
                confirmPasswordInput.style.boxShadow = '0 0 0 0.2rem rgba(231, 76, 60, 0.25)';
            } else if (newPass && confirmPass && newPass === confirmPass) {
                confirmPasswordInput.style.borderColor = '#2ecc71';
                confirmPasswordInput.style.boxShadow = '0 0 0 0.2rem rgba(46, 204, 113, 0.25)';
            } else {
                confirmPasswordInput.style.borderColor = '';
                confirmPasswordInput.style.boxShadow = '';
            }
        };
        
        newPasswordInput.addEventListener('input', checkPasswordsMatch);
        confirmPasswordInput.addEventListener('input', checkPasswordsMatch);
    }
    
    // Закрытие по клику вне окна
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('changePasswordModal');
        if (event.target === modal && modal) {
            closeModal();
        }
    });
}

function initChangePassword() {
    // Обработчик кнопки "Изменить пароль"
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            const modal = document.getElementById('changePasswordModal');
            if (modal) {
                modal.style.display = 'flex';
                
                // Очищаем поля при открытии
                const currentPass = document.getElementById('currentPassword');
                const newPass = document.getElementById('newPassword');
                const confirmPass = document.getElementById('confirmNewPassword');
                const errorDiv = document.getElementById('passwordError');
                
                if (currentPass) currentPass.value = '';
                if (newPass) newPass.value = '';
                if (confirmPass) confirmPass.value = '';
                if (errorDiv) {
                    errorDiv.style.display = 'none';
                    errorDiv.innerHTML = '';
                    errorDiv.className = 'password-error';
                }
            }
        });
    }
    
    // Закрытие модального окна
    const closeModal = function() {
        const modal = document.getElementById('changePasswordModal');
        if (modal) {
            modal.style.display = 'none';
            
            // Очищаем поля
            const currentPass = document.getElementById('currentPassword');
            const newPass = document.getElementById('newPassword');
            const confirmPass = document.getElementById('confirmNewPassword');
            const errorDiv = document.getElementById('passwordError');
            
            if (currentPass) currentPass.value = '';
            if (newPass) newPass.value = '';
            if (confirmPass) confirmPass.value = '';
            if (errorDiv) {
                errorDiv.style.display = 'none';
                errorDiv.innerHTML = '';
            }
        }
    };
    
    // Назначаем обработчики закрытия
    const closeBtn = document.querySelector('#changePasswordModal .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    const cancelBtn = document.getElementById('cancelChangePassword');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    // Подтверждение изменения пароля
    const confirmBtn = document.getElementById('confirmChangePassword');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmNewPassword = document.getElementById('confirmNewPassword').value;
            const errorDiv = document.getElementById('passwordError');
            
            // Очищаем предыдущие сообщения
            if (errorDiv) {
                errorDiv.innerHTML = '';
                errorDiv.style.display = 'none';
                errorDiv.className = 'password-error';
            }
            
            // Валидация
            let errors = [];
            
            // Проверка: заполнены ли все поля
            if (!currentPassword) errors.push('Введите текущий пароль');
            if (!newPassword) errors.push('Введите новый пароль');
            if (!confirmNewPassword) errors.push('Подтвердите новый пароль');
            
            // Если есть пустые поля - показываем ошибки и выходим
            if (errors.length > 0) {
                if (errorDiv) {
                    errorDiv.innerHTML = errors.map(error => 
                        `<div><i class="fas fa-exclamation-circle"></i> ${error}</div>`
                    ).join('');
                    errorDiv.style.display = 'block';
                    errorDiv.className = 'password-error error';
                }
                return;
            }
            
            // Проверка 1: Действующий пароль должен быть "admin" (для демо)
            if (currentPassword !== 'admin') {
                if (errorDiv) {
                    errorDiv.innerHTML = '<div><i class="fas fa-exclamation-circle"></i> Неверный текущий пароль</div>';
                    errorDiv.style.display = 'block';
                    errorDiv.className = 'password-error error';
                }
                return;
            }
            
            // Проверка 2: Длина нового пароля
            if (newPassword.length < 6) {
                if (errorDiv) {
                    errorDiv.innerHTML = '<div><i class="fas fa-exclamation-circle"></i> Новый пароль должен быть не менее 6 символов</div>';
                    errorDiv.style.display = 'block';
                    errorDiv.className = 'password-error error';
                }
                return;
            }
            
            // Проверка 3: Новый пароль не должен совпадать с текущим
            if (newPassword === currentPassword) {
                if (errorDiv) {
                    errorDiv.innerHTML = '<div><i class="fas fa-exclamation-circle"></i> Новый пароль не должен совпадать с текущим</div>';
                    errorDiv.style.display = 'block';
                    errorDiv.className = 'password-error error';
                }
                return;
            }
            
            // Проверка 4: Новый пароль и подтверждение должны совпадать
            if (newPassword !== confirmNewPassword) {
                if (errorDiv) {
                    errorDiv.innerHTML = '<div><i class="fas fa-exclamation-circle"></i> Новые пароли не совпадают</div>';
                    errorDiv.style.display = 'block';
                    errorDiv.className = 'password-error error';
                }
                return;
            }
            
            // Все проверки пройдены - показываем успех
            if (errorDiv) {
                errorDiv.innerHTML = '<div><i class="fas fa-check-circle"></i> Пароль успешно изменен!</div>';
                errorDiv.style.display = 'block';
                errorDiv.className = 'password-error success';
            }
            
            // Закрываем окно через 2 секунды
            setTimeout(() => {
                closeModal();
            }, 2000);
        });
    }
    
    // Добавим валидацию в реальном времени для поля подтверждения пароля
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmNewPassword');
    
    if (newPasswordInput && confirmPasswordInput) {
        const checkPasswordsMatch = function() {
            const newPass = newPasswordInput.value;
            const confirmPass = confirmPasswordInput.value;
            
            if (newPass && confirmPass && newPass !== confirmPass) {
                confirmPasswordInput.style.borderColor = '#e74c3c';
                confirmPasswordInput.style.boxShadow = '0 0 0 0.2rem rgba(231, 76, 60, 0.25)';
            } else if (newPass && confirmPass && newPass === confirmPass) {
                confirmPasswordInput.style.borderColor = '#2ecc71';
                confirmPasswordInput.style.boxShadow = '0 0 0 0.2rem rgba(46, 204, 113, 0.25)';
            } else {
                confirmPasswordInput.style.borderColor = '';
                confirmPasswordInput.style.boxShadow = '';
            }
        };
        
        newPasswordInput.addEventListener('input', checkPasswordsMatch);
        confirmPasswordInput.addEventListener('input', checkPasswordsMatch);
    }
    
    // Закрытие по клику вне окна
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('changePasswordModal');
        if (event.target === modal && modal) {
            closeModal();
        }
    });
}

        // Загрузка раздела инвентаризаций
        function loadInventories() {
            const tbody = document.getElementById('all-inventories-table').querySelector('tbody');
            tbody.innerHTML = '';
            
            appData.inventories.forEach(inv => {
                const row = document.createElement('tr');
                
                row.appendChild(createCell(inv.id));
                
                const shop = appData.shops.find(s => s.id === inv.shopId);
                row.appendChild(createCell(shop ? shop.name : 'Неизвестный магазин'));
                
                row.appendChild(createCell(getInventoryTypeName(inv.type)));
                row.appendChild(createCell(inv.date));
                row.appendChild(createCell(inv.reason));
                row.appendChild(createCell(inv.lines));
                row.appendChild(createCell(`${formatNumber(inv.amount)} ₽`));
                
                const diffCell = document.createElement('td');
                const diffBadge = document.createElement('span');
                diffBadge.className = `badge ${inv.difference >= 0 ? 'badge-success' : 'badge-danger'}`;
                diffBadge.textContent = `${inv.difference >= 0 ? '+' : ''}${formatNumber(inv.difference)} ₽`;
                diffCell.appendChild(diffBadge);
                row.appendChild(diffCell);
                
                const statusCell = document.createElement('td');
                const statusBadge = document.createElement('span');
                statusBadge.className = `badge ${inv.status === 'active' ? 'badge-success' : 'badge-secondary'}`;
                statusBadge.textContent = inv.status === 'active' ? 'Активна' : 'Завершена';
                statusCell.appendChild(statusBadge);
                row.appendChild(statusCell);
                
                tbody.appendChild(row);
            });
        }

        // Проверка документов магазина
        function checkDocuments() {
            // Показываем вкладку документов
            showNavTab('dashboard');
            document.querySelector('.tab[data-tab="documents"]').click();
            
            // Устанавливаем даты по умолчанию (последние 7 дней)
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - 7);
            
            document.getElementById('startDate').valueAsDate = startDate;
            document.getElementById('endDate').valueAsDate = endDate;
            
            // Показываем уведомление
            showAlert('Проверьте документы магазина за выбранный период', 'info');
        }

        // Вспомогательные функции
        function createCell(text) {
            const cell = document.createElement('td');
            cell.textContent = text;
            return cell;
        }
        
       // Форматирование числа с разделителями тысяч
function formatNumber(num) {
    return new Intl.NumberFormat('ru-RU', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }).format(num);
}

// Форматирование даты в DD/MM/YYYY
function formatDate(date) {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
        
        function formatDate(dateString) {
            if (!dateString) return '';
            
            // Если дата уже в формате DD/MM/YYYY
            if (typeof dateString === 'string' && dateString.includes('/')) {
                return dateString;
            }
            
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        
        function generateId() {
            return Math.floor(100000000 + Math.random() * 900000000).toString();
        }
        
        
        
        function showAlert(message, type = 'info') {
    // Создаем элемент уведомления
    const alertDiv = document.createElement('div');
	alert(`${type === 'error' ? 'Ошибка' : type === 'warning' ? 'Внимание' : 'Информация'}: ${message}`);
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 10000; max-width: 400px;';
    
    let icon = '';
    switch(type) {
        case 'success': icon = '<i class="fas fa-check-circle"></i> '; break;
        case 'warning': icon = '<i class="fas fa-exclamation-triangle"></i> '; break;
        case 'danger': icon = '<i class="fas fa-times-circle"></i> '; break;
        default: icon = '<i class="fas fa-info-circle"></i> '; break;
    }
    
    alertDiv.innerHTML = `${icon}${message}`;
    
    document.body.appendChild(alertDiv);
    
    // Удаляем уведомление через 5 секунд
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}


// Функция выхода из системы
function logout() {
    // Показываем подтверждение выхода
    const confirmLogout = confirm('Вы уверены, что хотите выйти из системы?');
    
    if (!confirmLogout) {
        return;
    }
    
    try {
        // Скрываем основное приложение
        const mainApp = document.getElementById('mainApp');
        if (mainApp) {
            mainApp.style.display = 'none';
        }
        
        // Показываем экран входа
        const loginScreen = document.getElementById('loginScreen');
        if (loginScreen) {
            loginScreen.style.display = 'flex';
        }
        
        // Скрываем экран выбора магазина если он открыт
        const shopSelectScreen = document.getElementById('shopSelectScreen');
        if (shopSelectScreen) {
            shopSelectScreen.style.display = 'none';
        }
        
        // Закрываем все открытые модальные окна
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        
        // Закрываем все полноэкранные окна
        const fullScreenModals = document.querySelectorAll('.full-screen-modal');
        fullScreenModals.forEach(modal => {
            modal.style.display = 'none';
        });
        
        // Закрываем меню пользователя
        const userMenu = document.getElementById('userMenu');
        if (userMenu) {
            userMenu.classList.remove('active');
        }
        
        // Сбрасываем данные сессии
        appData.currentShop = null;
        
        // Очищаем поля ввода логина
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        if (usernameInput) usernameInput.value = '';
        if (passwordInput) passwordInput.value = '';
        
        // Показываем уведомление об успешном выходе
        showAlert('Вы успешно вышли из системы', 'success');
        
        console.log('Пользователь вышел из системы');
        
    } catch (error) {
        console.error('Ошибка при выходе из системы:', error);
        showAlert('Произошла ошибка при выходе из системы', 'danger');
    }
}

		
		// ================== ЕСТЕСТВЕННАЯ УБЫЛЬ ==================
document.getElementById('uploadNaturalLossBtn').addEventListener('click', function() {
    document.getElementById('uploadNaturalLossModal').style.display = 'flex';
    
    // Установка дат по умолчанию (последние 30 дней)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
    
    document.getElementById('lossStartDate').valueAsDate = startDate;
    document.getElementById('lossEndDate').valueAsDate = endDate;
    
    // Скрываем блоки результата и загрузки
    document.getElementById('lossResult').style.display = 'none';
    document.getElementById('lossLoading').style.display = 'none';
    
    // Сбрасываем прогресс бар
    document.getElementById('lossProgressBar').style.width = '0%';
});

document.getElementById('cancelUploadNaturalLoss').addEventListener('click', function() {
    document.getElementById('uploadNaturalLossModal').style.display = 'none';
    resetLossModal();
});

document.getElementById('confirmUploadNaturalLoss').addEventListener('click', function() {
    const startDateStr = document.getElementById('lossStartDate').value;
    const endDateStr = document.getElementById('lossEndDate').value;
    const format = document.getElementById('lossFormat').value;
    
    if (!startDateStr || !endDateStr) {
        showAlert('Выберите период', 'warning');
        return;
    }
    
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    
    if (startDate > endDate) {
        showAlert('Дата начала не может быть позже даты окончания', 'warning');
        return;
    }
    
    // Блокируем кнопки и показываем загрузку
    document.getElementById('confirmUploadNaturalLoss').disabled = true;
    document.getElementById('cancelUploadNaturalLoss').disabled = true;
    document.getElementById('lossLoading').style.display = 'block';
    document.getElementById('lossResult').style.display = 'none';
    
    // Имитация загрузки
    let progress = 0;
    const progressBar = document.getElementById('lossProgressBar');
    progressBar.style.width = '0%';
    
    const progressInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            try {
                // Генерируем данные
                const lossData = generateLossData(startDate, endDate);
                
                // Показываем результат
                showLossResult(startDate, endDate, lossData, format);
                
                // Выполняем выгрузку
                executeLossExport(format, startDate, endDate, lossData);
                
                // Восстанавливаем кнопки
                document.getElementById('confirmUploadNaturalLoss').disabled = false;
                document.getElementById('cancelUploadNaturalLoss').disabled = false;
                
                // Уведомление
                showAlert(`Выгрузка данных по естественной убыли завершена`, 'success');
                
            } catch (error) {
                console.error('Ошибка:', error);
                document.getElementById('confirmUploadNaturalLoss').disabled = false;
                document.getElementById('cancelUploadNaturalLoss').disabled = false;
                document.getElementById('lossLoading').style.display = 'none';
                showAlert('Ошибка при выгрузке', 'danger');
            }
        }
    }, 150);
});

function generateLossData(startDate, endDate) {
    // Примерные данные
    const types = [
        { name: 'Испарение', amount: 12500, unit: 'кг' },
        { name: 'Усушка', amount: 8300, unit: 'кг' },
        { name: 'Распыл', amount: 4200, unit: 'кг' },
        { name: 'Утруска', amount: 3100, unit: 'кг' },
        { name: 'Разлив', amount: 1800, unit: 'л' }
    ];
    
    const total = types.reduce((sum, item) => sum + item.amount, 0);
    
    return {
        types: types,
        total: total,
        startDate: startDate,
        endDate: endDate
    };
}

function showLossResult(startDate, endDate, lossData, format) {
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let html = `
        <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
        <p><strong>Период:</strong> ${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}</p>
        <p><strong>Формат:</strong> ${format === 'wordpad' ? 'WordPad' : 'Excel'}</p>
        <hr>
        <table style="width:100%; border-collapse:collapse;">
            <thead>
                <tr style="background:#f2f2f2;">
                    <th style="padding:8px; border:1px solid #ddd;">Тип убыли</th>
                    <th style="padding:8px; border:1px solid #ddd; text-align:right;">Количество</th>
                    <th style="padding:8px; border:1px solid #ddd;">Ед.изм.</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    lossData.types.forEach(item => {
        html += `
            <tr>
                <td style="padding:8px; border:1px solid #ddd;">${item.name}</td>
                <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>
                <td style="padding:8px; border:1px solid #ddd;">${item.unit}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
            <tfoot>
                <tr style="background:#e8f5e8; font-weight:bold;">
                    <td style="padding:8px; border:1px solid #ddd;">Итого:</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(lossData.total)}</td>
                    <td style="padding:8px; border:1px solid #ddd;">кг</td>
                </tr>
            </tfoot>
        </table>
        <div style="margin-top:15px; padding:10px; background:#e8f5e8; border-radius:5px;">
            <p style="margin:0; color:#27ae60;"><i class="fas fa-check-circle"></i> Выгрузка завершена</p>
        </div>
    `;
    
    document.getElementById('lossResultContent').innerHTML = html;
    document.getElementById('lossLoading').style.display = 'none';
    document.getElementById('lossResult').style.display = 'block';
}

function executeLossExport(format, startDate, endDate, lossData) {
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let fileContent = '\uFEFF'; // UTF-8 BOM
    
    fileContent += 'ОТЧЕТ ПО ЕСТЕСТВЕННОЙ УБЫЛИ\r\n\r\n';
    fileContent += `Магазин: ${shopName} (№${shopId})\r\n`;
    fileContent += `Период: ${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}\r\n\r\n`;
    fileContent += 'Тип убыли;Количество;Ед.изм.\r\n';
    
    lossData.types.forEach(item => {
        fileContent += `${item.name};${item.amount};${item.unit}\r\n`;
    });
    
    fileContent += `\r\nИтого;${lossData.total};кг\r\n\r\n`;
    fileContent += `Сформировано: ${new Date().toLocaleString('ru-RU')}\r\n`;
    fileContent += 'Система управления инвентаризацией - Кировский';
    
    let mimeType, fileExt;
    
    if (format === 'wordpad') {
        // Для WordPad - текстовый файл с табуляцией
        let txtContent = 'ОТЧЕТ ПО ЕСТЕСТВЕННОЙ УБЫЛИ\n\n';
        txtContent += `Магазин: ${shopName} (№${shopId})\n`;
        txtContent += `Период: ${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}\n\n`;
        
        lossData.types.forEach(item => {
            txtContent += `${item.name}\t${item.amount}\t${item.unit}\n`;
        });
        
        txtContent += `\nИтого:\t${lossData.total}\tкг\n\n`;
        txtContent += `Сформировано: ${new Date().toLocaleString('ru-RU')}\n`;
        txtContent += 'Система управления инвентаризацией - Кировский';
        
        fileContent = txtContent;
        mimeType = 'text/plain;charset=utf-8';
        fileExt = 'txt';
    } else if (format === 'excel') {
        mimeType = 'text/csv;charset=utf-8';
        fileExt = 'csv';
    }
    
    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Естественная_убыль_${shopId}_${startDate.toISOString().slice(0,10)}_${endDate.toISOString().slice(0,10)}.${fileExt}`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

function resetLossModal() {
    document.getElementById('confirmUploadNaturalLoss').disabled = false;
    document.getElementById('cancelUploadNaturalLoss').disabled = false;
    document.getElementById('lossLoading').style.display = 'none';
    document.getElementById('lossResult').style.display = 'none';
    document.getElementById('lossProgressBar').style.width = '0%';
}

// Закрытие по крестику
document.querySelector('#uploadNaturalLossModal .close').addEventListener('click', function() {
    document.getElementById('uploadNaturalLossModal').style.display = 'none';
    resetLossModal();
});

// Закрытие по клику вне окна
window.addEventListener('click', function(e) {
    if (e.target.id === 'uploadNaturalLossModal') {
        document.getElementById('uploadNaturalLossModal').style.display = 'none';
        resetLossModal();
    }
});

// ================== ОТХОДЫ ==================
document.getElementById('wasteBtn').addEventListener('click', function() {
    document.getElementById('wasteModal').style.display = 'flex';
    
    // Установка дат по умолчанию (последние 30 дней)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
    
    document.getElementById('wasteStartDate').valueAsDate = startDate;
    document.getElementById('wasteEndDate').valueAsDate = endDate;
    
    // Скрываем блоки результата и загрузки
    document.getElementById('wasteResult').style.display = 'none';
    document.getElementById('wasteLoading').style.display = 'none';
    
    // Сбрасываем прогресс бар
    document.getElementById('wasteProgressBar').style.width = '0%';
});

document.getElementById('cancelWaste').addEventListener('click', function() {
    document.getElementById('wasteModal').style.display = 'none';
    resetWasteModal();
});

document.getElementById('confirmWaste').addEventListener('click', function() {
    const startDateStr = document.getElementById('wasteStartDate').value;
    const endDateStr = document.getElementById('wasteEndDate').value;
    const format = document.getElementById('wasteFormat').value;
    
    if (!startDateStr || !endDateStr) {
        showAlert('Выберите период', 'warning');
        return;
    }
    
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    
    if (startDate > endDate) {
        showAlert('Дата начала не может быть позже даты окончания', 'warning');
        return;
    }
    
    // Блокируем кнопки и показываем загрузку
    document.getElementById('confirmWaste').disabled = true;
    document.getElementById('cancelWaste').disabled = true;
    document.getElementById('wasteLoading').style.display = 'block';
    document.getElementById('wasteResult').style.display = 'none';
    
    // Имитация загрузки
    let progress = 0;
    const progressBar = document.getElementById('wasteProgressBar');
    progressBar.style.width = '0%';
    
    const progressInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            try {
                // Генерируем данные
                const wasteData = generateWasteData(startDate, endDate);
                
                // Показываем результат
                showWasteResult(startDate, endDate, wasteData, format);
                
                // Выполняем выгрузку
                executeWasteExport(format, startDate, endDate, wasteData);
                
                // Восстанавливаем кнопки
                document.getElementById('confirmWaste').disabled = false;
                document.getElementById('cancelWaste').disabled = false;
                
                // Уведомление
                showAlert(`Выгрузка данных по отходам завершена`, 'success');
                
            } catch (error) {
                console.error('Ошибка:', error);
                document.getElementById('confirmWaste').disabled = false;
                document.getElementById('cancelWaste').disabled = false;
                document.getElementById('wasteLoading').style.display = 'none';
                showAlert('Ошибка при выгрузке', 'danger');
            }
        }
    }, 150);
});

function generateWasteData(startDate, endDate) {
    // Примерные данные
    const categories = [
        { name: 'Пищевые отходы', amount: 850, unit: 'кг', cost: 42500 },
        { name: 'Упаковка (картон)', amount: 320, unit: 'кг', cost: 6400 },
        { name: 'Упаковка (пластик)', amount: 180, unit: 'кг', cost: 3600 },
        { name: 'Стеклобой', amount: 95, unit: 'кг', cost: 1900 },
        { name: 'Просроченные товары', amount: 420, unit: 'кг', cost: 21000 }
    ];
    
    const totalAmount = categories.reduce((sum, item) => sum + item.amount, 0);
    const totalCost = categories.reduce((sum, item) => sum + item.cost, 0);
    
    return {
        categories: categories,
        totalAmount: totalAmount,
        totalCost: totalCost,
        startDate: startDate,
        endDate: endDate
    };
}

// Глобальная функция для создания реального документа
function createRealDocument(inventoryId, inventoryType, printType, printFormat) {
    console.log('Создание реального документа для:', { inventoryId, inventoryType, printType, printFormat });
    
    // Находим инвентаризацию по ID или типу
    let inventory;
    
    if (inventoryId && inventoryId !== 'TEST-001') {
        // Ищем по ID
        inventory = appData.inventories.find(inv => 
            inv.id === inventoryId || inv.id.toString() === inventoryId.toString()
        );
    } else {
        // Ищем по типу для текущего магазина
        inventory = appData.inventories.find(inv => 
            inv.shopId === appData.currentShop?.id && inv.type === inventoryType
        );
    }
    
    if (!inventory) {
        console.error('Инвентаризация не найдена:', { inventoryId, inventoryType });
        // Создаем тестовую инвентаризацию
        inventory = {
            id: inventoryId || 'TEST-001',
            type: inventoryType,
            date: new Date().toLocaleDateString('ru-RU'),
            amount: 1000000,
            difference: -50000,
            lines: 100,
            items: []
        };
    }
    
    console.log('Используется инвентаризация:', inventory);
    
    // Получаем товары по типу инвентаризации
    const products = getProductsByInventoryType(inventoryType);
    
    // Генерируем данные
    let documentContent = '';
    let fileName = '';
    
    if (printType === 'full') {
        // Полная сличительная ведомость с реальными суммами
        documentContent = createFullReconciliationStatement(inventory, products);
        fileName = `Полная_сличительная_ведомость_${inventory.id}_${new Date().toISOString().slice(0,10)}.txt`;
    } else {
        // Только итоги с реальными суммами
        documentContent = createSummaryReconciliationStatement(inventory, products);
        fileName = `Итоги_сличительной_ведомости_${inventory.id}_${new Date().toISOString().slice(0,10)}.txt`;
    }
    
    // В зависимости от формата
    switch(printFormat) {
        case 'excel':
            return createExcelDocument(inventory, products, printType, documentContent, fileName);
        case 'print':
            return printDocumentDirectly(inventory, products, printType, documentContent);
        case 'pdf':
            return createPDFDocument(inventory, products, printType, documentContent, fileName);
        case 'word':
            return createWordDocument(inventory, products, printType, documentContent, fileName);
        default:
            // По умолчанию текстовый документ
            return createTextDocument(documentContent, fileName);
    }
}

// Создание полной сличительной ведомости с реальными суммами
function createFullReconciliationStatement(inventory, products) {
    let content = '';
    let totalQuantity = 0;
    let totalAmount = 0;
    
    // Рассчитываем среднюю цену товара для распределения суммы
    const avgItemAmount = inventory.amount / Math.max(products.length, 1);
    
    // Заголовок
    content += '='.repeat(80) + '\n';
    content += 'СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ ПО РЕЗУЛЬТАТАМ ИНВЕНТАРИЗАЦИИ\n';
    content += '='.repeat(80) + '\n\n';
    
    // Информация об инвентаризации
    content += `Инвентаризация №: ${inventory.id}\n`;
    content += `Тип инвентаризации: ${getInventoryTypeName(inventory.type)}\n`;
    content += `Дата инвентаризации: ${inventory.date}\n`;
    content += `Дата формирования: ${new Date().toLocaleDateString('ru-RU')}\n`;
    content += `Магазин: ${appData.currentShop?.name || 'Магазин #451'}\n`;
    content += `Название: ${inventory.reason || 'Плановая инвентаризация'}\n`;
    content += '-'.repeat(80) + '\n\n';
    
    // Сводная информация
    content += `Сводные данные инвентаризации:\n`;
    content += `  Количество строк в описи: ${inventory.lines}\n`;
    content += `  Сумма по данным учета: ${formatNumber(inventory.amount)} ₽\n`;
    content += `  Выявленная разница: ${formatNumber(inventory.difference)} ₽\n`;
    content += `  Фактическая сумма: ${formatNumber(inventory.amount + inventory.difference)} ₽\n`;
    content += '-'.repeat(80) + '\n\n';
    
    // Заголовок таблицы
    content += '№   Штрихкод        Наименование товара' + ' '.repeat(30) + 'Ед. Кол-во Цена,₽   Сумма,₽   Разница\n';
    content += '-'.repeat(80) + '\n';
    
    // Данные товаров с распределением реальной суммы
    products.forEach((product, index) => {
        // Распределяем общую сумму пропорционально
        const quantity = Math.floor(Math.random() * 50) + 5;
        const price = product.price;
        const amount = (avgItemAmount * 0.8 + Math.random() * avgItemAmount * 0.4) / products.length;
        const diffPerItem = inventory.difference / products.length;
        
        totalQuantity += quantity;
        totalAmount += amount;
        
        // Форматируем строку
        const rowNum = (index + 1).toString().padEnd(3);
        const barcode = product.barcode.padEnd(13);
        const name = product.name.padEnd(40).substring(0, 40);
        const unit = 'шт'.padEnd(3);
        const qty = quantity.toString().padEnd(6);
        const priceFormatted = price.toFixed(2).padStart(8);
        const amountFormatted = amount.toFixed(2).padStart(10);
        const diffFormatted = diffPerItem.toFixed(2).padStart(10);
        
        content += `${rowNum} ${barcode} ${name} ${unit} ${qty} ${priceFormatted} ${amountFormatted} ${diffFormatted}\n`;
        
        // Если много товаров, группируем по категориям
        if ((index + 1) % 10 === 0 && (index + 1) < products.length) {
            content += '-'.repeat(80) + '\n';
        }
    });
    
    // Итоги
    content += '='.repeat(80) + '\n';
    content += 'ИТОГО:\n';
    content += `  Количество позиций: ${products.length}\n`;
    content += `  Общее количество: ${totalQuantity} шт.\n`;
    content += `  Сумма по учету: ${formatNumber(inventory.amount)} ₽\n`;
    content += `  Выявленная разница: ${formatNumber(inventory.difference)} ₽\n`;
    content += `  Фактическая сумма: ${formatNumber(inventory.amount + inventory.difference)} ₽\n`;
    content += '='.repeat(80) + '\n\n';
    
    // Анализ разниц
    if (inventory.difference !== 0) {
        content += 'АНАЛИЗ РАЗНИЦ:\n';
        content += '-'.repeat(80) + '\n';
        
        if (inventory.difference > 0) {
            content += '  Выявлена излишек на сумму: ' + formatNumber(inventory.difference) + ' ₽\n';
            content += '  Причины возможной излишка:\n';
            content += '  - Неоприходованные поступления\n';
            content += '  - Ошибки в учете\n';
            content += '  - Возвраты от покупателей\n';
        } else {
            content += '  Выявлена недостача на сумму: ' + formatNumber(Math.abs(inventory.difference)) + ' ₽\n';
            content += '  Причины возможной недостачи:\n';
            content += '  - Естественная убыль\n';
            content += '  - Списание порчи\n';
            content += '  - Хищения\n';
            content += '  - Ошибки в предшествующем учете\n';
        }
        content += '-'.repeat(80) + '\n\n';
    }
    
    // Подписи
    content += 'Председатель инвентаризационной комиссии:\n';
    content += '_________________ ' + (appData.currentUser?.name || 'Системный администратор') + '\n\n';
    
    content += 'Материально ответственное лицо:\n';
    content += '_________________ [ФИО]\n\n';
    
    content += 'Бухгалтер:\n';
    content += '_________________ [ФИО]\n\n';
    
    content += 'Дата составления ведомости: ' + new Date().toLocaleDateString('ru-RU') + '\n';
    
    return content;
}

// Создание итоговой сличительной ведомости с реальными суммами
function createSummaryReconciliationStatement(inventory, products) {
    let content = '';
    
    // Заголовок
    content += '='.repeat(60) + '\n';
    content += 'ИТОГИ СЛИЧИТЕЛЬНОЙ ВЕДОМОСТИ ПО РЕЗУЛЬТАТАМ ИНВЕНТАРИЗАЦИИ\n';
    content += '='.repeat(60) + '\n\n';
    
    // Основная информация об инвентаризации
    content += `ИНФОРМАЦИЯ ОБ ИНВЕНТАРИЗАЦИИ:\n`;
    content += `  Номер инвентаризации: ${inventory.id}\n`;
    content += `  Тип инвентаризации: ${getInventoryTypeName(inventory.type)}\n`;
    content += `  Дата проведения: ${inventory.date}\n`;
    content += `  Дата формирования отчета: ${new Date().toLocaleDateString('ru-RU')}\n`;
    content += `  Магазин: ${appData.currentShop?.name || 'Магазин #451'}\n`;
    content += `  Название: ${inventory.reason || 'Плановая инвентаризация'}\n\n`;
    
    // Сводные данные
    content += `СВОДНЫЕ ДАННЫЕ:\n`;
    content += `  Количество строк в описях: ${inventory.lines}\n`;
    content += `  Количество позиций товаров: ${products.length}\n`;
    content += `  Сумма по данным бухгалтерского учета: ${formatNumber(inventory.amount)} ₽\n`;
    content += `  Фактическая сумма по результатам инвентаризации: ${formatNumber(inventory.amount + inventory.difference)} ₽\n`;
    content += `  Выявленное расхождение: ${formatNumber(inventory.difference)} ₽\n\n`;
    
    // Анализ расхождения
    if (inventory.difference !== 0) {
        const absDifference = Math.abs(inventory.difference);
        const percentage = ((absDifference / inventory.amount) * 100).toFixed(2);
        
        content += `АНАЛИЗ РАСХОЖДЕНИЙ:\n`;
        content += `  Абсолютное значение расхождения: ${formatNumber(absDifference)} ₽\n`;
        content += `  Процент расхождения от учетной суммы: ${percentage}%\n`;
        
        if (inventory.difference > 0) {
            content += `  Характер расхождения: ИЗЛИШЕК\n`;
            content += `  Рекомендуемые действия: проверить правильность оприходования товаров\n`;
        } else {
            content += `  Характер расхождения: НЕДОСТАЧА\n`;
            content += `  Рекомендуемые действия: провести служебное расследование\n`;
        }
        content += '\n';
    }
    
    // Группировка по категориям с распределением сумм
    const categories = {};
    const avgCategoryAmount = inventory.amount / Math.max(Object.keys(getCategoriesByInventoryType(inventory.type)).length, 1);
    const avgCategoryDiff = inventory.difference / Math.max(Object.keys(getCategoriesByInventoryType(inventory.type)).length, 1);
    
    // Получаем категории для данного типа инвентаризации
    const inventoryCategories = getCategoriesByInventoryType(inventory.type);
    
    Object.keys(inventoryCategories).forEach(category => {
        const categoryProducts = products.filter(p => p.category === category);
        if (categoryProducts.length > 0) {
            categories[category] = {
                items: categoryProducts,
                totalQuantity: categoryProducts.length * 10, // Примерное количество
                totalAmount: avgCategoryAmount * (categoryProducts.length / products.length),
                totalDifference: avgCategoryDiff * (categoryProducts.length / products.length)
            };
        }
    });
    
    // Выводим по категориям
    content += 'ИТОГИ ПО КАТЕГОРИЯМ ТОВАРОВ:\n';
    content += '-'.repeat(60) + '\n';
    
    let grandTotalQuantity = 0;
    let grandTotalAmount = 0;
    let grandTotalDifference = 0;
    
    Object.keys(categories).forEach(category => {
        const catData = categories[category];
        grandTotalQuantity += catData.totalQuantity;
        grandTotalAmount += catData.totalAmount;
        grandTotalDifference += catData.totalDifference;
        
        content += `\n${category}:\n`;
        content += `  Количество позиций: ${catData.items.length}\n`;
        content += `  Общее количество: ${catData.totalQuantity} шт.\n`;
        content += `  Учетная сумма: ${formatNumber(catData.totalAmount)} ₽\n`;
        content += `  Расхождение: ${formatNumber(catData.totalDifference)} ₽\n`;
        content += `  Фактическая сумма: ${formatNumber(catData.totalAmount + catData.totalDifference)} ₽\n`;
    });
    
    // Общие итоги
    content += '\n' + '='.repeat(60) + '\n';
    content += 'ОБЩИЕ ИТОГИ ИНВЕНТАРИЗАЦИИ:\n';
    content += `  Всего категорий: ${Object.keys(categories).length}\n`;
    content += `  Всего позиций товаров: ${products.length}\n`;
    content += `  Общее количество товаров: ${grandTotalQuantity} шт.\n`;
    content += `  Общая учетная стоимость: ${formatNumber(inventory.amount)} ₽\n`;
    content += `  Общее расхождение: ${formatNumber(inventory.difference)} ₽\n`;
    content += `  Общая фактическая стоимость: ${formatNumber(inventory.amount + inventory.difference)} ₽\n`;
    
    // Процент расхождения
    const totalPercentage = inventory.amount !== 0 ? 
        Math.abs((inventory.difference / inventory.amount) * 100).toFixed(2) : '0.00';
    
    content += `  Процент расхождения: ${totalPercentage}%\n`;
    content += '='.repeat(60) + '\n\n';
    
    // Заключение
    content += 'ЗАКЛЮЧЕНИЕ ИНВЕНТАРИЗАЦИОННОЙ КОМИССИИ:\n';
    content += '-'.repeat(60) + '\n';
    
    if (Math.abs(inventory.difference) < inventory.amount * 0.01) { // Меньше 1%
        content += '  Расхождения находятся в пределах нормы.\n';
        content += '  Рекомендуется принять результаты инвентаризации.\n';
    } else if (Math.abs(inventory.difference) < inventory.amount * 0.05) { // Меньше 5%
        content += '  Расхождения превышают нормативные значения.\n';
        content += '  Рекомендуется провести повторную выборочную проверку.\n';
    } else {
        content += '  Значительные расхождения выявлены.\n';
        content += '  Требуется служебное расследование и принятие мер.\n';
    }
    
    content += '-'.repeat(60) + '\n\n';
    
    content += 'Подписи членов инвентаризационной комиссии:\n\n';
    content += 'Председатель комиссии:\n';
    content += '_________________ ' + (appData.currentUser?.name || 'Системный администратор') + '\n\n';
    
    content += 'Члены комиссии:\n';
    content += '_________________ [ФИО]\n';
    content += '_________________ [ФИО]\n\n';
    
    content += 'Дата: ' + new Date().toLocaleDateString('ru-RU');
    
    return content;
}

// Создание Excel документа с реальными данными
function createExcelDocument(inventory, products, printType, textContent, fileName) {
    // Создаем CSV с разделителями табуляции для Excel
    let csvContent = '';
    
    if (printType === 'full') {
        // Заголовок
        csvContent += 'СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ ПО РЕЗУЛЬТАТАМ ИНВЕНТАРИЗАЦИИ\n\n';
        csvContent += `Инвентаризация №:;${inventory.id}\n`;
        csvContent += `Тип инвентаризации:;${getInventoryTypeName(inventory.type)}\n`;
        csvContent += `Дата инвентаризации:;${inventory.date}\n`;
        csvContent += `Дата формирования:;${new Date().toLocaleDateString('ru-RU')}\n`;
        csvContent += `Магазин:;${appData.currentShop?.name || 'Магазин #451'}\n`;
        csvContent += `Название:;${inventory.reason || 'Плановая инвентаризация'}\n\n`;
        
        // Сводные данные
        csvContent += 'СВОДНЫЕ ДАННЫЕ ИНВЕНТАРИЗАЦИИ:\n';
        csvContent += `Количество строк в описях:;${inventory.lines}\n`;
        csvContent += `Сумма по данным учета:;${formatNumber(inventory.amount)} ₽\n`;
        csvContent += `Выявленная разница:;${formatNumber(inventory.difference)} ₽\n`;
        csvContent += `Фактическая сумма:;${formatNumber(inventory.amount + inventory.difference)} ₽\n\n`;
        
        // Заголовки таблицы
        csvContent += 'ДЕТАЛИЗАЦИЯ ПО ТОВАРАМ:\n';
        csvContent += '№;Штрихкод;Наименование товара;Категория;Группа;Ед.изм.;Количество;Цена,₽;Сумма по учету,₽;Фактическая сумма,₽;Разница,₽\n';
        
        // Распределяем суммы по товарам
        const avgItemAmount = inventory.amount / Math.max(products.length, 1);
        const avgItemDiff = inventory.difference / Math.max(products.length, 1);
        
        // Данные
        products.forEach((product, index) => {
            const quantity = Math.floor(Math.random() * 50) + 5;
            const price = product.price;
            const amount = (avgItemAmount * 0.8 + Math.random() * avgItemAmount * 0.4) / products.length;
            const diff = avgItemDiff / products.length;
            const actualAmount = amount + diff;
            
            csvContent += `${index + 1};${product.barcode};"${product.name}";"${product.category}";"${product.group}";шт;${quantity};${price.toFixed(2)};${amount.toFixed(2)};${actualAmount.toFixed(2)};${diff.toFixed(2)}\n`;
        });
        
        // Итоги
        csvContent += `\nИТОГО:;;;;;${products.length} позиций;;${formatNumber(inventory.amount)} ₽;${formatNumber(inventory.amount + inventory.difference)} ₽;${formatNumber(inventory.difference)} ₽`;
        
    } else {
        // Итоговая ведомость
        csvContent += 'ИТОГОВАЯ СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ ПО ИНВЕНТАРИЗАЦИИ\n\n';
        csvContent += `Инвентаризация №:;${inventory.id}\n`;
        csvContent += `Тип:;${getInventoryTypeName(inventory.type)}\n`;
        csvContent += `Дата проведения:;${inventory.date}\n`;
        csvContent += `Магазин:;${appData.currentShop?.name || 'Магазин #451'}\n\n`;
        
        // Основные итоги
        csvContent += 'ОСНОВНЫЕ ИТОГИ:\n';
        csvContent += `Количество строк в описях:;${inventory.lines}\n`;
        csvContent += `Сумма по данным бухгалтерского учета:;${formatNumber(inventory.amount)} ₽\n`;
        csvContent += `Фактическая сумма по инвентаризации:;${formatNumber(inventory.amount + inventory.difference)} ₽\n`;
        csvContent += `Выявленное расхождение:;${formatNumber(inventory.difference)} ₽\n\n`;
        
        // Группируем по категориям
        const categories = getCategoriesByInventoryType(inventory.type);
        const avgCategoryAmount = inventory.amount / Math.max(Object.keys(categories).length, 1);
        const avgCategoryDiff = inventory.difference / Math.max(Object.keys(categories).length, 1);
        
        csvContent += 'ИТОГИ ПО КАТЕГОРИЯМ ТОВАРОВ:\n';
        csvContent += 'Категория;Количество позиций;Учетная сумма,₽;Фактическая сумма,₽;Расхождение,₽;Процент расхождения\n';
        
        Object.keys(categories).forEach((category, index) => {
            const categoryProducts = products.filter(p => p.category === category);
            if (categoryProducts.length > 0) {
                const catAmount = avgCategoryAmount * (categoryProducts.length / products.length);
                const catDiff = avgCategoryDiff * (categoryProducts.length / products.length);
                const catActual = catAmount + catDiff;
                const catPercentage = catAmount !== 0 ? ((catDiff / catAmount) * 100).toFixed(2) : '0.00';
                
                csvContent += `"${category}";${categoryProducts.length};${catAmount.toFixed(2)};${catActual.toFixed(2)};${catDiff.toFixed(2)};${catPercentage}%\n`;
            }
        });
        
        // Общие итоги
        const totalPercentage = inventory.amount !== 0 ? 
            ((inventory.difference / inventory.amount) * 100).toFixed(2) : '0.00';
        
        csvContent += `\nОБЩИЙ ИТОГ;${products.length};${formatNumber(inventory.amount)};${formatNumber(inventory.amount + inventory.difference)};${formatNumber(inventory.difference)};${totalPercentage}%`;
        
        // Анализ
        csvContent += '\n\nАНАЛИЗ РАСХОЖДЕНИЙ:\n';
        if (inventory.difference > 0) {
            csvContent += `Характер расхождения:;ИЗЛИШЕК\n`;
            csvContent += `Рекомендуемые действия:;Проверить оприходование товаров\n`;
        } else if (inventory.difference < 0) {
            csvContent += `Характер расхождения:;НЕДОСТАЧА\n`;
            csvContent += `Рекомендуемые действия:;Провести служебное расследование\n`;
        } else {
            csvContent += `Характер расхождения:;РАСХОЖДЕНИЙ НЕТ\n`;
            csvContent += `Рекомендуемые действия:;Принять результаты инвентаризации\n`;
        }
    }
    
    // Добавляем BOM для правильной кодировки в Excel
    const bom = '\uFEFF';
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace('.txt', '_' + inventory.id + '.csv');
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    return {
        success: true,
        fileName: fileName.replace('.txt', '_' + inventory.id + '.csv'),
        type: 'excel'
    };
}

// Получение категорий по типу инвентаризации
function getCategoriesByInventoryType(inventoryType) {
    const categories = {
        'alcohol': {
            'Крепкий алкоголь': ['Водка', 'Коньяк', 'Виски', 'Ром', 'Текила'],
            'Вино': ['Красное вино', 'Белое вино', 'Розовое вино'],
            'Игристые вина': ['Шампанское', 'Игристые вина'],
            'Слабоалкогольные напитки': ['Слабоалкогольные коктейли']
        },
        'beer': {
            'Пиво светлое': ['Светлое пиво', 'Лагер'],
            'Пиво темное': ['Темное пиво', 'Портер'],
            'Пиво крепкое': ['Крепкое пиво', 'Эль'],
            'Пиво безалкогольное': ['Безалкогольное пиво']
        },
        'cigarettes': {
            'Легкие сигареты': ['Ultra Light', 'Light'],
            'Средние сигареты': ['Regular', 'Medium'],
            'Крепкие сигареты': ['Strong', 'Full Flavor'],
            'Электронные сигареты': ['Одноразовые', 'Многоразовые']
        },
        'general': {
            'Молочные продукты': ['Молоко', 'Сыр', 'Творог', 'Йогурт'],
            'Хлебобулочные изделия': ['Хлеб', 'Булочки', 'Пироги'],
            'Мясные продукты': ['Колбаса', 'Сосиски', 'Мясо'],
            'Бакалея': ['Крупы', 'Макароны', 'Мука', 'Сахар'],
            'Напитки': ['Вода', 'Соки', 'Газировка'],
            'Кондитерские изделия': ['Печенье', 'Шоколад', 'Конфеты']
        }
    };
    
    return categories[inventoryType] || categories['general'];
}

// Форматирование чисел с разделителями тысяч
function formatNumber(num) {
    if (num === undefined || num === null) return '0.00';
    
    // Убираем возможные строки
    if (typeof num === 'string') {
        num = parseFloat(num.replace(/[^\d.-]/g, ''));
    }
    
    // Форматируем с разделителями тысяч
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
}

// Создание полной сличительной ведомости
function createFullReconciliationStatement(inventoryId, inventoryType, products) {
    let content = '';
    let totalQuantity = 0;
    let totalAmount = 0;
    
    // Заголовок
    content += '='.repeat(80) + '\n';
    content += 'СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ ПО РЕЗУЛЬТАТАМ ИНВЕНТАРИЗАЦИИ\n';
    content += '='.repeat(80) + '\n\n';
    
    // Информация об инвентаризации
    content += `Инвентаризация №: ${inventoryId}\n`;
    content += `Тип инвентаризации: ${getInventoryTypeName(inventoryType)}\n`;
    content += `Дата формирования: ${new Date().toLocaleDateString('ru-RU')}\n`;
    content += `Магазин: ${appData.currentShop?.name || 'Магазин #451'}\n`;
    content += '-'.repeat(80) + '\n\n';
    
    // Заголовок таблицы
    content += '№   Штрихкод        Наименование товара' + ' '.repeat(30) + 'Ед. Кол-во Цена,₽   Сумма,₽\n';
    content += '-'.repeat(80) + '\n';
    
    // Данные товаров
    products.forEach((product, index) => {
        const quantity = Math.floor(Math.random() * 50) + 5;
        const price = product.price;
        const amount = quantity * price;
        
        totalQuantity += quantity;
        totalAmount += amount;
        
        // Форматируем строку
        const rowNum = (index + 1).toString().padEnd(3);
        const barcode = product.barcode.padEnd(13);
        const name = product.name.padEnd(40).substring(0, 40);
        const unit = 'шт'.padEnd(3);
        const qty = quantity.toString().padEnd(6);
        const priceFormatted = price.toFixed(2).padStart(8);
        const amountFormatted = amount.toFixed(2).padStart(10);
        
        content += `${rowNum} ${barcode} ${name} ${unit} ${qty} ${priceFormatted} ${amountFormatted}\n`;
        
        // Если много товаров, группируем по категориям
        if ((index + 1) % 10 === 0) {
            content += '-'.repeat(80) + '\n';
        }
    });
    
    // Итоги
    content += '='.repeat(80) + '\n';
    content += 'ИТОГО:\n';
    content += `Количество позиций: ${products.length}\n`;
    content += `Общее количество: ${totalQuantity} шт.\n`;
    content += `Общая сумма: ${totalAmount.toFixed(2)} ₽\n`;
    content += '='.repeat(80) + '\n\n';
    
    // Подписи
    content += 'Председатель инвентаризационной комиссии:\n';
    content += '_________________ ' + (appData.currentUser?.name || 'Системный администратор') + '\n\n';
    
    content += 'Материально ответственное лицо:\n';
    content += '_________________ [ФИО]\n\n';
    
    content += 'Бухгалтер:\n';
    content += '_________________ [ФИО]\n';
    
    return content;
}

// Создание итоговой сличительной ведомости
function createSummaryReconciliationStatement(inventoryId, inventoryType, products) {
    let content = '';
    
    // Заголовок
    content += '='.repeat(60) + '\n';
    content += 'ИТОГИ СЛИЧИТЕЛЬНОЙ ВЕДОМОСТИ\n';
    content += '='.repeat(60) + '\n\n';
    
    // Информация
    content += `Инвентаризация №: ${inventoryId}\n`;
    content += `Тип: ${getInventoryTypeName(inventoryType)}\n`;
    content += `Дата: ${new Date().toLocaleDateString('ru-RU')}\n\n`;
    
    // Группируем по категориям
    const categories = {};
    
    products.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = {
                items: [],
                totalQuantity: 0,
                totalAmount: 0
            };
        }
        
        const quantity = Math.floor(Math.random() * 50) + 5;
        const amount = quantity * product.price;
        
        categories[product.category].items.push({
            ...product,
            quantity: quantity,
            amount: amount
        });
        
        categories[product.category].totalQuantity += quantity;
        categories[product.category].totalAmount += amount;
    });
    
    // Выводим по категориям
    let grandTotalQuantity = 0;
    let grandTotalAmount = 0;
    
    content += 'КАТЕГОРИИ ТОВАРОВ:\n';
    content += '-'.repeat(60) + '\n';
    
    Object.keys(categories).forEach(category => {
        const catData = categories[category];
        grandTotalQuantity += catData.totalQuantity;
        grandTotalAmount += catData.totalAmount;
        
        content += `\n${category}:\n`;
        content += `  Количество позиций: ${catData.items.length}\n`;
        content += `  Общее количество: ${catData.totalQuantity} шт.\n`;
        content += `  Общая сумма: ${catData.totalAmount.toFixed(2)} ₽\n`;
    });
    
    // Общие итоги
    content += '\n' + '='.repeat(60) + '\n';
    content += 'ОБЩИЕ ИТОГИ:\n';
    content += `Всего категорий: ${Object.keys(categories).length}\n`;
    content += `Всего позиций: ${products.length}\n`;
    content += `Общее количество: ${grandTotalQuantity} шт.\n`;
    content += `Общая стоимость: ${grandTotalAmount.toFixed(2)} ₽\n`;
    content += '='.repeat(60) + '\n';
    
    return content;
}

// Создание текстового документа
function createTextDocument(content, fileName) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    return {
        success: true,
        fileName: fileName,
        type: 'text'
    };
}

// Создание Excel документа
function createExcelDocument(inventoryId, inventoryType, products, printType, textContent, fileName) {
    // Создаем CSV с разделителями табуляции для Excel
    let csvContent = '';
    
    if (printType === 'full') {
        // Заголовок
        csvContent += 'Сличительная ведомость\n\n';
        csvContent += `Инвентаризация:;${inventoryId}\n`;
        csvContent += `Тип:;${getInventoryTypeName(inventoryType)}\n`;
        csvContent += `Дата:;${new Date().toLocaleDateString('ru-RU')}\n`;
        csvContent += `Магазин:;${appData.currentShop?.name || 'Магазин #451'}\n\n`;
        
        // Заголовки таблицы
        csvContent += '№;Штрихкод;Наименование товара;Ед.изм.;Количество;Цена;Сумма;Категория;Группа\n';
        
        // Данные
        products.forEach((product, index) => {
            const quantity = Math.floor(Math.random() * 50) + 5;
            const amount = quantity * product.price;
            
            csvContent += `${index + 1};${product.barcode};"${product.name}";шт;${quantity};${product.price.toFixed(2)};${amount.toFixed(2)};"${product.category}";"${product.group}"\n`;
        });
        
        // Итоги
        const totalQuantity = products.reduce((sum, product, idx) => sum + (Math.floor(Math.random() * 50) + 5), 0);
        const totalAmount = products.reduce((sum, product, idx) => sum + ((Math.floor(Math.random() * 50) + 5) * product.price), 0);
        
        csvContent += `\nИТОГО:;;${products.length} позиций;${totalQuantity} шт.;;${totalAmount.toFixed(2)} ₽`;
        
    } else {
        // Итоговая ведомость
        csvContent += 'Итоговая сличительная ведомость\n\n';
        csvContent += `Инвентаризация:;${inventoryId}\n`;
        csvContent += `Тип:;${getInventoryTypeName(inventoryType)}\n\n`;
        
        // Группируем по категориям
        const categories = {};
        
        products.forEach(product => {
            if (!categories[product.category]) {
                categories[product.category] = {
                    items: [],
                    totalQuantity: 0,
                    totalAmount: 0
                };
            }
            
            const quantity = Math.floor(Math.random() * 50) + 5;
            const amount = quantity * product.price;
            
            categories[product.category].items.push(product);
            categories[product.category].totalQuantity += quantity;
            categories[product.category].totalAmount += amount;
        });
        
        csvContent += 'Категория;Количество позиций;Общее количество;Общая сумма\n';
        
        Object.keys(categories).forEach(category => {
            const catData = categories[category];
            csvContent += `"${category}";${catData.items.length};${catData.totalQuantity};${catData.totalAmount.toFixed(2)}\n`;
        });
        
        const totalPositions = Object.values(categories).reduce((sum, cat) => sum + cat.items.length, 0);
        const totalQuantity = Object.values(categories).reduce((sum, cat) => sum + cat.totalQuantity, 0);
        const totalAmount = Object.values(categories).reduce((sum, cat) => sum + cat.totalAmount, 0);
        
        csvContent += `\nОБЩИЙ ИТОГ;${totalPositions};${totalQuantity};${totalAmount.toFixed(2)}`;
    }
    
    // Добавляем BOM для правильной кодировки в Excel
    const bom = '\uFEFF';
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace('.txt', '.csv');
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    return {
        success: true,
        fileName: fileName.replace('.txt', '.csv'),
        type: 'excel'
    };
}

// Прямая печать документа
function printDocumentDirectly(inventoryId, inventoryType, products, printType, textContent) {
    const printWindow = window.open('', '_blank');
    
    let htmlContent = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Сличительная ведомость #${inventoryId}</title>
            <style>
                body {
                    font-family: 'Times New Roman', Times, serif;
                    margin: 20px;
                    font-size: 12pt;
                    line-height: 1.5;
                }
                @media print {
                    body { margin: 0; }
                    ...no-print { display: none; }
                }
                ...header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                ...title {
                    font-size: 14pt;
                    font-weight: bold;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                }
                ...subtitle {
                    font-size: 12pt;
                    margin-bottom: 20px;
                }
                ...info {
                    margin-bottom: 20px;
                }
                ...info p {
                    margin: 5px 0;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    font-size: 10pt;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 5px 8px;
                    text-align: left;
                    vertical-align: top;
                }
                th {
                    background-color: #f0f0f0;
                    font-weight: bold;
                }
                ...total {
                    font-weight: bold;
                    background-color: #f8f8f8;
                }
                ...signature {
                    margin-top: 50px;
                }
                ...signature-line {
                    border-top: 1px solid #000;
                    width: 300px;
                    margin-top: 40px;
                }
                ...footer {
                    margin-top: 30px;
                    font-size: 10pt;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="title">СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ</div>
                <div class="subtitle">по результатам инвентаризации товарно-материальных ценностей</div>
            </div>
            
            <div class="info">
                <p><strong>Инвентаризация №:</strong> ${inventoryId}</p>
                <p><strong>Тип инвентаризации:</strong> ${getInventoryTypeName(inventoryType)}</p>
                <p><strong>Дата проведения:</strong> ${new Date().toLocaleDateString('ru-RU')}</p>
                <p><strong>Магазин:</strong> ${appData.currentShop?.name || 'Магазин #451'}</p>
            </div>
    `;
    
    if (printType === 'full') {
        // Полная таблица
        htmlContent += `
            <table>
                <thead>
                    <tr>
                        <th width="30">№</th>
                        <th width="100">Штрихкод</th>
                        <th>Наименование товара</th>
                        <th width="50">Ед.</th>
                        <th width="60">Кол-во</th>
                        <th width="70">Цена, ₽</th>
                        <th width="80">Сумма, ₽</th>
                        <th width="100">Категория</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        let totalQuantity = 0;
        let totalAmount = 0;
        
        products.forEach((product, index) => {
            const quantity = Math.floor(Math.random() * 50) + 5;
            const amount = quantity * product.price;
            totalQuantity += quantity;
            totalAmount += amount;
            
            htmlContent += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.barcode}</td>
                    <td>${product.name}</td>
                    <td>шт</td>
                    <td>${quantity}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>${amount.toFixed(2)}</td>
                    <td>${product.category}</td>
                </tr>
            `;
        });
        
        htmlContent += `
                </tbody>
                <tfoot>
                    <tr class="total">
                        <td colspan="3">ИТОГО:</td>
                        <td colspan="2">${products.length} позиций</td>
                        <td>Общее количество:</td>
                        <td colspan="2">${totalQuantity} шт.</td>
                    </tr>
                    <tr class="total">
                        <td colspan="6">Общая стоимость:</td>
                        <td colspan="2">${totalAmount.toFixed(2)} ₽</td>
                    </tr>
                </tfoot>
            </table>
        `;
    } else {
        // Итоговая таблица
        // Группируем по категориям
        const categories = {};
        
        products.forEach(product => {
            if (!categories[product.category]) {
                categories[product.category] = {
                    items: [],
                    totalQuantity: 0,
                    totalAmount: 0
                };
            }
            
            const quantity = Math.floor(Math.random() * 50) + 5;
            const amount = quantity * product.price;
            
            categories[product.category].items.push(product);
            categories[product.category].totalQuantity += quantity;
            categories[product.category].totalAmount += amount;
        });
        
        htmlContent += `
            <h3>ИТОГИ ПО КАТЕГОРИЯМ:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Категория товаров</th>
                        <th>Количество позиций</th>
                        <th>Общее количество</th>
                        <th>Общая сумма, ₽</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        Object.keys(categories).forEach(category => {
            const catData = categories[category];
            htmlContent += `
                <tr>
                    <td>${category}</td>
                    <td>${catData.items.length}</td>
                    <td>${catData.totalQuantity}</td>
                    <td>${catData.totalAmount.toFixed(2)}</td>
                </tr>
            `;
        });
        
        const totalPositions = Object.values(categories).reduce((sum, cat) => sum + cat.items.length, 0);
        const totalQuantity = Object.values(categories).reduce((sum, cat) => sum + cat.totalQuantity, 0);
        const totalAmount = Object.values(categories).reduce((sum, cat) => sum + cat.totalAmount, 0);
        
        htmlContent += `
                </tbody>
                <tfoot>
                    <tr class="total">
                        <td><strong>ОБЩИЙ ИТОГ:</strong></td>
                        <td><strong>${totalPositions}</strong></td>
                        <td><strong>${totalQuantity}</strong></td>
                        <td><strong>${totalAmount.toFixed(2)} ₽</strong></td>
                    </tr>
                </tfoot>
            </table>
        `;
    }
    
    // Подписи и футер
    htmlContent += `
            <div class="signature">
                <p>Председатель инвентаризационной комиссии:</p>
                <div class="signature-line"></div>
                <p>${appData.currentUser?.name || 'Системный администратор'}</p>
                
                <p style="margin-top: 30px;">Материально ответственное лицо:</p>
                <div class="signature-line"></div>
                <p>[ФИО]</p>
            </div>
            
            <div class="footer">
                <p>Сформировано: ${new Date().toLocaleString('ru-RU')}</p>
                <p>Система управления инвентаризацией</p>
            </div>
            
            <div class="no-print" style="margin-top: 20px; text-align: center;">
                <button onclick="window.print()" style="padding: 10px 20px; background: #007bff; color: white; border: none; cursor: pointer;">
                    Печать документа
                </button>
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Автоматически открываем окно печати через 1 секунду
    setTimeout(() => {
        printWindow.print();
    }, 1000);
    
    return {
        success: true,
        type: 'print'
    };
}

function showWasteResult(startDate, endDate, wasteData, format) {
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let html = `
        <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
        <p><strong>Период:</strong> ${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}</p>
        <p><strong>Формат:</strong> ${format === 'wordpad' ? 'WordPad' : 'Excel'}</p>
        <hr>
        <table style="width:100%; border-collapse:collapse;">
            <thead>
                <tr style="background:#f2f2f2;">
                    <th style="padding:8px; border:1px solid #ddd;">Категория отходов</th>
                    <th style="padding:8px; border:1px solid #ddd; text-align:right;">Количество</th>
                    <th style="padding:8px; border:1px solid #ddd;">Ед.изм.</th>
                    <th style="padding:8px; border:1px solid #ddd; text-align:right;">Стоимость, ₽</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    wasteData.categories.forEach(item => {
        html += `
            <tr>
                <td style="padding:8px; border:1px solid #ddd;">${item.name}</td>
                <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>
                <td style="padding:8px; border:1px solid #ddd;">${item.unit}</td>
                <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.cost)}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
            <tfoot>
                <tr style="background:#e8f5e8; font-weight:bold;">
                    <td style="padding:8px; border:1px solid #ddd;">Итого:</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(wasteData.totalAmount)}</td>
                    <td style="padding:8px; border:1px solid #ddd;">кг</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right; color:#e74c3c;">${formatNumber(wasteData.totalCost)} ₽</td>
                </tr>
            </tfoot>
        </table>
        <div style="margin-top:15px; padding:10px; background:#e8f5e8; border-radius:5px;">
            <p style="margin:0; color:#27ae60;"><i class="fas fa-check-circle"></i> Выгрузка завершена</p>
        </div>
    `;
    
    document.getElementById('wasteResultContent').innerHTML = html;
    document.getElementById('wasteLoading').style.display = 'none';
    document.getElementById('wasteResult').style.display = 'block';
}

function executeWasteExport(format, startDate, endDate, wasteData) {
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let fileContent = '\uFEFF'; // UTF-8 BOM
    
    fileContent += 'ОТЧЕТ ПО ОТХОДАМ\r\n\r\n';
    fileContent += `Магазин: ${shopName} (№${shopId})\r\n`;
    fileContent += `Период: ${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}\r\n\r\n`;
    fileContent += 'Категория отходов;Количество;Ед.изм.;Стоимость, ₽\r\n';
    
    wasteData.categories.forEach(item => {
        fileContent += `${item.name};${item.amount};${item.unit};${item.cost}\r\n`;
    });
    
    fileContent += `\r\nИтого;${wasteData.totalAmount};кг;${wasteData.totalCost}\r\n\r\n`;
    fileContent += `Сформировано: ${new Date().toLocaleString('ru-RU')}\r\n`;
    fileContent += 'Система управления инвентаризацией - Кировский';
    
    let mimeType, fileExt;
    
    if (format === 'wordpad') {
        // Для WordPad - текстовый файл с табуляцией
        let txtContent = 'ОТЧЕТ ПО ОТХОДАМ\n\n';
        txtContent += `Магазин: ${shopName} (№${shopId})\n`;
        txtContent += `Период: ${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}\n\n`;
        
        wasteData.categories.forEach(item => {
            txtContent += `${item.name}\t${item.amount}\t${item.unit}\t${item.cost} ₽\n`;
        });
        
        txtContent += `\nИтого:\t${wasteData.totalAmount}\tкг\t${wasteData.totalCost} ₽\n\n`;
        txtContent += `Сформировано: ${new Date().toLocaleString('ru-RU')}\n`;
        txtContent += 'Система управления инвентаризацией - Кировский';
        
        fileContent = txtContent;
        mimeType = 'text/plain;charset=utf-8';
        fileExt = 'txt';
    } else if (format === 'excel') {
        mimeType = 'text/csv;charset=utf-8';
        fileExt = 'csv';
    }
    
    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Отходы_${shopId}_${startDate.toISOString().slice(0,10)}_${endDate.toISOString().slice(0,10)}.${fileExt}`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

function resetWasteModal() {
    document.getElementById('confirmWaste').disabled = false;
    document.getElementById('cancelWaste').disabled = false;
    document.getElementById('wasteLoading').style.display = 'none';
    document.getElementById('wasteResult').style.display = 'none';
    document.getElementById('wasteProgressBar').style.width = '0%';
}

// Закрытие по крестику
document.querySelector('#wasteModal .close').addEventListener('click', function() {
    document.getElementById('wasteModal').style.display = 'none';
    resetWasteModal();
});

// Закрытие по клику вне окна
window.addEventListener('click', function(e) {
    if (e.target.id === 'wasteModal') {
        document.getElementById('wasteModal').style.display = 'none';
        resetWasteModal();
    }
});




// Обновление дат в документе
function updateOrderDates() {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Форматирование даты "«20» июня 2025 г."
    const day = now.getDate();
    const monthNames = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    const year = now.getFullYear();
    
    document.getElementById('orderDate').textContent = `«${day}» ${monthNames[now.getMonth()]} ${year} г.`;
    document.getElementById('orderStartDate').textContent = `${day} ${monthNames[now.getMonth()]} ${year} г.`;
    document.getElementById('orderEndDate').textContent = `${tomorrow.getDate()} ${monthNames[tomorrow.getMonth()]} ${tomorrow.getFullYear()} г.`;
}

// Обновление информации о магазине
function updateShopInfo() {
    if (appData.currentShop) {
        document.getElementById('orderShopName').textContent = appData.currentShop.name;
        document.getElementById('orderShopAddress').textContent = appData.currentShop.location || 'адрес не указан';
    } else {
        // Используем магазин по умолчанию
        document.getElementById('orderShopName').textContent = '№451';
        document.getElementById('orderShopAddress').textContent = 'ул. Маршала Жукова, 13';
    }
}

// Генерация номера распоряжения
function generateOrderNumber() {
    const now = new Date();
    const shopId = appData.currentShop ? appData.currentShop.id : '451';
    const orderNum = orderCounter.toString().padStart(2, '0');
    
    const orderNumber = `${shopId}-${now.getFullYear().toString().slice(2)}-${(now.getMonth() + 1).toString().padStart(2, '0')}/${orderNum}`;
    document.getElementById('orderNumber').textContent = orderNumber;
    orderCounter++;
}

// Загрузка доступных операторов
function loadAvailableOperators() {
    const tableBody = document.getElementById('availableOperatorsList');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Фильтруем только активных операторов
    const activeOperators = appData.operators.filter(op => op.status === 'active');
    
    activeOperators.forEach(operator => {
        // Проверяем, выбран ли уже этот оператор
        const isSelected = selectedOperatorsForOrder.some(op => 
            op.id === operator.id && op.isCustom === false
        );
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="text-align: center;">
                <input type="checkbox" class="operator-checkbox" 
                       data-id="${operator.id}" 
                       ${isSelected ? 'checked' : ''}>
            </td>
            <td>${operator.name}</td>
            <td>${operator.terminal}</td>
            <td>${getOperatorTypeName(operator.type)}</td>
            <td>
                <span class="badge ${operator.status === 'active' ? 'badge-success' : 'badge-danger'}">
                    ${operator.status === 'active' ? 'Активен' : 'Неактивен'}
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Обновляем обработчики для чекбоксов
    updateOperatorCheckboxHandlers();
}

// Обновление обработчиков чекбоксов
function updateOperatorCheckboxHandlers() {
    document.querySelectorAll('.operator-checkbox').forEach(checkbox => {
        // Удаляем старые обработчики
        const newCheckbox = checkbox.cloneNode(true);
        checkbox.parentNode.replaceChild(newCheckbox, checkbox);
    });
    
    // Добавляем новые обработчики
    document.querySelectorAll('.operator-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const operatorId = parseInt(this.dataset.id);
            const operator = appData.operators.find(op => op.id === operatorId);
            
            if (this.checked) {
                // Проверяем, не добавлен ли уже этот оператор
                const alreadyAdded = selectedOperatorsForOrder.some(op => 
                    op.id === operatorId && op.isCustom === false
                );
                
                if (!alreadyAdded) {
                    // Добавляем оператора в список
                    selectedOperatorsForOrder.push({
                        id: operator.id,
                        name: operator.name,
                        terminal: operator.terminal,
                        type: operator.type,
                        position: getOperatorPosition(operator.type),
                        isCustom: false
                    });
                }
            } else {
                // Удаляем оператора из списка
                selectedOperatorsForOrder = selectedOperatorsForOrder.filter(op => 
                    !(op.id === operatorId && op.isCustom === false)
                );
            }
            
            updateSelectedOperatorsList();
        });
    });
}

// Получение названия типа оператора
function getOperatorTypeName(type) {
    const typeNames = {
        'regular': 'Обычный',
        'alcohol': 'Алкоголь',
        'admin': 'Администратор'
    };
    return typeNames[type] || type;
}

// Получение должности по типу оператора
function getOperatorPosition(type) {
    const positions = {
        'regular': 'Кассир-операционист',
        'alcohol': 'Специалист по алкогольной продукции',
        'admin': 'Администратор торгового зала'
    };
    return positions[type] || 'Сотрудник';
}

// Функция обновления списка выбранных операторов
function updateSelectedOperatorsList() {
    const container = document.getElementById('selectedOperatorsList');
    const selectedCheckboxes = document.querySelectorAll('#availableOperatorsList input[type="checkbox"]:checked');
    
    // Очищаем все, кроме первой строки (председатель)
    const rows = container.querySelectorAll('tr');
    for (let i = 1; i < rows.length; i++) {
        rows[i].remove();
    }
    
    let rowNum = 2; // Начинаем с номера 2, так как председатель уже есть
    
    // Добавляем только что созданных пользовательских операторов
    customOperators.forEach((operator, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="border: 1px solid #000; padding: 8px; text-align: center; height: 50px;">${rowNum}</td>
            <td style="border: 1px solid #000; padding: 8px;">
                <strong>${operator.position || 'Оператор'}:</strong><br>
                ${operator.name}
                ${operator.note ? `<div style="font-size: 12px; color: #666;">(${operator.note})</div>` : ''}
            </td>
            <td style="border: 1px solid #000; padding: 8px; text-align: center;">${operator.terminal}</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: center;">
                <div class="signature-placeholder" style="height: 40px; border-bottom: 1px solid #000; margin: 0 auto; width: 150px;"></div>
                <div style="font-size: 11px; margin-top: 2px;">(подпись)</div>
            </td>
        `;
        container.appendChild(row);
        rowNum++;
    });
    
    // Добавляем выбранных операторов из таблицы
    selectedCheckboxes.forEach((checkbox, index) => {
        const row = checkbox.closest('tr');
        const name = row.cells[1].textContent.trim();
        const terminal = row.cells[2].textContent.trim();
        const type = row.cells[3].textContent.trim();
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td style="border: 1px solid #000; padding: 8px; text-align: center; height: 50px;">${rowNum}</td>
            <td style="border: 1px solid #000; padding: 8px;">
                <strong>${getOperatorPositionByType(type)}:</strong><br>
                ${name}
            </td>
            <td style="border: 1px solid #000; padding: 8px; text-align: center;">${terminal}</td>
            <td style="border: 1px solid #000; padding: 8px; text-align: center;">
                <div class="signature-placeholder" style="height: 40px; border-bottom: 1px solid #000; margin: 0 auto; width: 150px;"></div>
                <div style="font-size: 11px; margin-top: 2px;">(подпись)</div>
            </td>
        `;
        container.appendChild(newRow);
        rowNum++;
    });
}

// Вспомогательная функция для определения должности по типу оператора
function getOperatorPositionByType(type) {
    const positionMap = {
        'regular': 'Оператор',
        'alcohol': 'Оператор по алкоголю',
        'admin': 'Администратор'
    };
    return positionMap[type] || 'Оператор';
}

// Функция создания ПОЛНОЙ сличительной ведомости
function createFullReconciliationDocument(inventory, format) {
    console.log('Создание ПОЛНОЙ сличительной ведомости для инвентаризации:', inventory.id);
    
    // Получаем товары по типу инвентаризации
    const products = getProductsByInventoryType(inventory.type);
    
    // Создаем детализированный CSV с товарами
    let csvContent = '\uFEFF'; // UTF-8 BOM для Excel
    
    // Заголовок документа
    csvContent += 'ПОЛНАЯ СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ\n\n';
    csvContent += `Инвентаризация №:;${inventory.id}\n`;
    csvContent += `Тип инвентаризации:;${getInventoryTypeName(inventory.type)}\n`;
    csvContent += `Дата инвентаризации:;${inventory.date}\n`;
    csvContent += `Название проведения:;${inventory.reason}\n`;
    csvContent += `Магазин:;${appData.currentShop?.name || 'Магазин #451'}\n`;
    csvContent += `Количество строк в описях:;${inventory.lines}\n\n`;
    
    // Сводные данные
    csvContent += 'СВОДНЫЕ ДАННЫЕ ИНВЕНТАРИЗАЦИИ:\n';
    csvContent += `Сумма по данным бухгалтерского учета:;${formatNumber(inventory.amount)} ₽\n`;
    csvContent += `Выявленная разница:;${formatNumber(inventory.difference)} ₽\n`;
    csvContent += `Фактическая сумма по результатам инвентаризации:;${formatNumber(inventory.amount + inventory.difference)} ₽\n`;
    
    // Процент расхождения
    const percentage = inventory.amount !== 0 ? 
        ((Math.abs(inventory.difference) / inventory.amount) * 100).toFixed(2) : '0.00';
    csvContent += `Процент расхождения:;${percentage}%\n\n`;
    
    // Заголовки таблицы товаров
    csvContent += 'ДЕТАЛИЗИРОВАННЫЙ ПЕРЕЧЕНЬ ТОВАРОВ:\n';
    csvContent += '№;Штрихкод;Наименование товара;Категория;Группа;Единица измерения;Количество по учету;Фактическое количество;Разница (+/-);Цена за единицу, ₽;Сумма по учету, ₽;Фактическая сумма, ₽;Сумма разницы, ₽\n';
    
    // Рассчитываем распределение сумм
    const totalItems = Math.min(products.length, 50); // Ограничиваем для читаемости
    const avgAmountPerItem = inventory.amount / totalItems;
    const avgDiffPerItem = inventory.difference / totalItems;
    
    let totalQuantity = 0;
    let totalActualQuantity = 0;
    let totalDiffQuantity = 0;
    let totalAmount = 0;
    let totalActualAmount = 0;
    let totalDiffAmount = 0;
    
    // Добавляем товары в таблицу
    for (let i = 0; i < totalItems; i++) {
        const product = products[i % products.length];
        const quantity = Math.floor(Math.random() * 100) + 10;
        const diffQuantity = Math.random() > 0.7 ? Math.floor(Math.random() * 10) - 5 : 0;
        const actualQuantity = quantity + diffQuantity;
        const price = product.price;
        const amount = avgAmountPerItem * (0.8 + Math.random() * 0.4);
        const diffAmount = avgDiffPerItem / totalItems;
        const actualAmount = amount + diffAmount;
        
        totalQuantity += quantity;
        totalActualQuantity += actualQuantity;
        totalDiffQuantity += diffQuantity;
        totalAmount += amount;
        totalActualAmount += actualAmount;
        totalDiffAmount += diffAmount;
        
        csvContent += `${i + 1};${product.barcode};"${product.name}";"${product.category}";"${product.group}";шт;${quantity};${actualQuantity};${diffQuantity >= 0 ? '+' : ''}${diffQuantity};${price.toFixed(2)};${amount.toFixed(2)};${actualAmount.toFixed(2)};${diffAmount.toFixed(2)}\n`;
    }
    
    // Итоги по товарам
    csvContent += '\nИТОГО ПО ТОВАРАМ:;;;;;;;;' + 
                  `${totalQuantity};${totalActualQuantity};${totalDiffQuantity >= 0 ? '+' : ''}${totalDiffQuantity};` +
                  `;${totalAmount.toFixed(2)};${totalActualAmount.toFixed(2)};${totalDiffAmount.toFixed(2)}\n\n`;
    
    // Общие итоги
    csvContent += 'ОБЩИЕ ИТОГИ ИНВЕНТАРИЗАЦИИ:\n';
    csvContent += `Общее количество товарных позиций:;${totalItems}\n`;
    csvContent += `Общая сумма по данным учета:;${formatNumber(inventory.amount)} ₽\n`;
    csvContent += `Общая выявленная разница:;${formatNumber(inventory.difference)} ₽\n`;
    csvContent += `Общая фактическая сумма:;${formatNumber(inventory.amount + inventory.difference)} ₽\n`;
    csvContent += `Процент расхождения:;${percentage}%\n\n`;
    
    // Анализ расхождений
    csvContent += 'АНАЛИЗ РАСХОЖДЕНИЙ:\n';
    if (inventory.difference > 0) {
        csvContent += `Характер расхождения:;ИЗЛИШЕК\n`;
        csvContent += `Возможные причины:;Неоприходованные поступления, ошибки в учете\n`;
        csvContent += `Рекомендуемые действия:;Проверить правильность оприходования товаров\n`;
    } else if (inventory.difference < 0) {
        csvContent += `Характер расхождения:;НЕДОСТАЧА\n`;
        csvContent += `Возможные причины:;Естественная убыль, хищения, ошибки списания\n`;
        csvContent += `Рекомендуемые действия:;Провести служебное расследование\n`;
    } else {
        csvContent += `Характер расхождения:;РАСХОЖДЕНИЙ НЕТ\n`;
        csvContent += `Рекомендуемые действия:;Принять результаты инвентаризации\n`;
    }
    csvContent += '\n';
    
    // Подписи
    csvContent += 'ПОДПИСИ:\n';
    csvContent += 'Председатель инвентаризационной комиссии:;[ФИО]\n';
    csvContent += 'Бухгалтер:;[ФИО]\n';
    csvContent += 'Материально ответственное лицо:;[ФИО]\n';
    csvContent += `Дата формирования документа:;${new Date().toLocaleDateString('ru-RU')}\n`;
    
    // В зависимости от формата
    if (format === 'print') {
        // Печать
        printFullDocument(inventory, csvContent);
    } else {
        // Скачивание файла
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Полная_сличительная_ведомость_${inventory.id}_${new Date().toISOString().slice(0,10)}.csv`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Показываем результат
            const printResult = document.getElementById('printResult');
            if (printResult) {
                printResult.style.display = 'block';
                printResult.innerHTML = `
                    <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                        <i class="fas fa-check-circle"></i> <strong>Полная сличительная ведомость успешно сформирована!</strong>
                    </div>
                    <p><strong>Тип документа:</strong> Полная сличительная ведомость</p>
                    <p><strong>Инвентаризация:</strong> #${inventory.id}</p>
                    <p><strong>Тип:</strong> ${getInventoryTypeName(inventory.type)}</p>
                    <p><strong>Количество позиций:</strong> ${totalItems}</p>
                    <div style="margin-top: 10px;">
                        <p><strong>Сумма по учету:</strong> ${formatNumber(inventory.amount)} ₽</p>
                        <p><strong>Разница:</strong> ${formatNumber(inventory.difference)} ₽</p>
                        <p><strong>Фактическая сумма:</strong> ${formatNumber(inventory.amount + inventory.difference)} ₽</p>
                    </div>
                    <div style="margin-top: 15px; padding: 10px; background-color: #e8f5e8; border-radius: 3px;">
                        <i class="fas fa-file-download"></i> Файл был автоматически скачан
                    </div>
                `;
            }
            
            showAlert('Полная сличительная ведомость скачана', 'success');
            
        }, 100);
    }
}

// Функция создания ИТОГОВОЙ сличительной ведомости
function createSummaryReconciliationDocument(inventory, format, groupBy, includeSubtotals) {
    console.log('Создание ИТОГОВОЙ сличительной ведомости для инвентаризации:', inventory.id);
    
    // Получаем товары по типу инвентаризации
    const products = getProductsByInventoryType(inventory.type);
    
    // Создаем CSV с итогами
    let csvContent = '\uFEFF'; // UTF-8 BOM для Excel
    
    // Заголовок документа
    csvContent += 'ИТОГИ СЛИЧИТЕЛЬНОЙ ВЕДОМОСТИ\n\n';
    csvContent += `Инвентаризация №:;${inventory.id}\n`;
    csvContent += `Тип инвентаризации:;${getInventoryTypeName(inventory.type)}\n`;
    csvContent += `Дата инвентаризации:;${inventory.date}\n`;
    csvContent += `Название проведения:;${inventory.reason}\n`;
    csvContent += `Магазин:;${appData.currentShop?.name || 'Магазин #451'}\n`;
    csvContent += `Количество строк в описях:;${inventory.lines}\n\n`;
    
    // Сводные данные
    csvContent += 'СВОДНЫЕ ДАННЫЕ ИНВЕНТАРИЗАЦИИ:\n';
    csvContent += `Сумма по данным бухгалтерского учета:;${formatNumber(inventory.amount)} ₽\n`;
    csvContent += `Выявленная разница:;${formatNumber(inventory.difference)} ₽\n`;
    csvContent += `Фактическая сумма по результатам инвентаризации:;${formatNumber(inventory.amount + inventory.difference)} ₽\n`;
    
    // Процент расхождения
    const percentage = inventory.amount !== 0 ? 
        ((Math.abs(inventory.difference) / inventory.amount) * 100).toFixed(2) : '0.00';
    csvContent += `Процент расхождения:;${percentage}%\n\n`;
    
    // Группируем данные
    csvContent += `ИТОГИ (группировка: ${groupBy === 'product_group' ? 'по группам товаров' : 'по виду товара'}):\n`;
    
    if (groupBy === 'product_group') {
        // Группировка по группам товаров
        csvContent += 'Группа товаров;Количество позиций;Сумма по учету, ₽;Фактическая сумма, ₽;Разница, ₽;Процент разницы\n';
        
        const groups = {};
        products.forEach(product => {
            if (!groups[product.group]) {
                groups[product.group] = {
                    count: 0,
                    amount: 0,
                    diff: 0
                };
            }
            groups[product.group].count++;
        });
        
        // Распределяем суммы по группам
        const groupKeys = Object.keys(groups);
        const avgAmountPerGroup = inventory.amount / groupKeys.length;
        const avgDiffPerGroup = inventory.difference / groupKeys.length;
        
        groupKeys.forEach((group, index) => {
            const groupData = groups[group];
            const amount = avgAmountPerGroup * (0.8 + Math.random() * 0.4);
            const diff = avgDiffPerGroup / groupKeys.length;
            const actual = amount + diff;
            const percentage = amount !== 0 ? ((diff / amount) * 100).toFixed(2) : '0.00';
            
            csvContent += `"${group}";${groupData.count};${amount.toFixed(2)};${actual.toFixed(2)};${diff.toFixed(2)};${percentage}%\n`;
            
            // Промежуточные итоги
            if (includeSubtotals && index < groupKeys.length - 1) {
                csvContent += `Промежуточный итог:;;${amount.toFixed(2)};${actual.toFixed(2)};${diff.toFixed(2)};\n`;
            }
        });
        
    } else {
        // Группировка по виду товара (категориям)
        csvContent += 'Вид товара (категория);Количество позиций;Сумма по учету, ₽;Фактическая сумма, ₽;Разница, ₽;Процент разницы\n';
        
        const categories = {};
        products.forEach(product => {
            if (!categories[product.category]) {
                categories[product.category] = {
                    count: 0,
                    amount: 0,
                    diff: 0
                };
            }
            categories[product.category].count++;
        });
        
        // Распределяем суммы по категориям
        const categoryKeys = Object.keys(categories);
        const avgAmountPerCategory = inventory.amount / categoryKeys.length;
        const avgDiffPerCategory = inventory.difference / categoryKeys.length;
        
        categoryKeys.forEach((category, index) => {
            const categoryData = categories[category];
            const amount = avgAmountPerCategory * (0.8 + Math.random() * 0.4);
            const diff = avgDiffPerCategory / categoryKeys.length;
            const actual = amount + diff;
            const percentage = amount !== 0 ? ((diff / amount) * 100).toFixed(2) : '0.00';
            
            csvContent += `"${category}";${categoryData.count};${amount.toFixed(2)};${actual.toFixed(2)};${diff.toFixed(2)};${percentage}%\n`;
            
            // Промежуточные итоги
            if (includeSubtotals && index < categoryKeys.length - 1) {
                csvContent += `Промежуточный итог:;;${amount.toFixed(2)};${actual.toFixed(2)};${diff.toFixed(2)};\n`;
            }
        });
    }
    
    // Общие итоги
    csvContent += '\nОБЩИЕ ИТОГИ:\n';
    csvContent += `Общее количество товарных позиций:;${products.length}\n`;
    csvContent += `Общая сумма по данным учета:;${formatNumber(inventory.amount)} ₽\n`;
    csvContent += `Общая выявленная разница:;${formatNumber(inventory.difference)} ₽\n`;
    csvContent += `Общая фактическая сумма:;${formatNumber(inventory.amount + inventory.difference)} ₽\n`;
    csvContent += `Процент расхождения:;${percentage}%\n\n`;
    
    // Анализ
    csvContent += 'ВЫВОДЫ И РЕКОМЕНДАЦИИ:\n';
    if (inventory.difference > 0) {
        csvContent += 'Обнаружен излишек товарно-материальных ценностей.\n';
        csvContent += 'Рекомендуется проверить правильность оприходования поступлений.\n';
    } else if (inventory.difference < 0) {
        csvContent += 'Обнаружена недостача товарно-материальных ценностей.\n';
        csvContent += 'Рекомендуется провести служебное расследование.\n';
    } else {
        csvContent += 'Расхождений между учетными и фактическими данными не обнаружено.\n';
        csvContent += 'Результаты инвентаризации могут быть приняты.\n';
    }
    csvContent += '\n';
    
    // Подписи
    csvContent += 'ПОДПИСИ:\n';
    csvContent += 'Председатель инвентаризационной комиссии:;[ФИО]\n';
    csvContent += 'Бухгалтер:;[ФИО]\n';
    csvContent += `Дата формирования отчета:;${new Date().toLocaleDateString('ru-RU')}\n`;
    
    // В зависимости от формата
    if (format === 'print') {
        // Печать
        printSummaryDocument(inventory, csvContent);
    } else {
        // Скачивание файла
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Итоги_сличительной_ведомости_${inventory.id}_${new Date().toISOString().slice(0,10)}.csv`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Показываем результат
            const printResult = document.getElementById('printResult');
            if (printResult) {
                printResult.style.display = 'block';
                printResult.innerHTML = `
                    <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                        <i class="fas fa-check-circle"></i> <strong>Итоги сличительной ведомости успешно сформированы!</strong>
                    </div>
                    <p><strong>Тип документа:</strong> Итоги сличительной ведомости</p>
                    <p><strong>Инвентаризация:</strong> #${inventory.id}</p>
                    <p><strong>Тип:</strong> ${getInventoryTypeName(inventory.type)}</p>
                    <p><strong>Группировка:</strong> ${groupBy === 'product_group' ? 'По группам товаров' : 'По виду товара'}</p>
                    <div style="margin-top: 10px;">
                        <p><strong>Сумма по учету:</strong> ${formatNumber(inventory.amount)} ₽</p>
                        <p><strong>Разница:</strong> ${formatNumber(inventory.difference)} ₽</p>
                        <p><strong>Фактическая сумма:</strong> ${formatNumber(inventory.amount + inventory.difference)} ₽</p>
                    </div>
                    <div style="margin-top: 15px; padding: 10px; background-color: #e8f5e8; border-radius: 3px;">
                        <i class="fas fa-file-download"></i> Файл был автоматически скачан
                    </div>
                `;
            }
            
            showAlert('Итоги сличительной ведомости скачаны', 'success');
            
        }, 100);
    }
}
// Функция печати полного документа
function printFullDocument(inventory, csvContent) {
    const printWindow = window.open('', '_blank');
    
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>Полная сличительная ведомость #${inventory.id}</title>
            <style>
                body { font-family: Arial; margin: 20px; }
                h1 { text-align: center; color: #2c3e50; }
                h2 { color: #34495e; margin-top: 30px; }
                ...header { text-align: center; margin-bottom: 30px; }
                ...info { margin-bottom: 20px; }
                ...info p { margin: 5px 0; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 12px; }
                th, td { border: 1px solid #000; padding: 6px; text-align: left; }
                th { background-color: #f2f2f2; font-weight: bold; }
                ...total { font-weight: bold; background-color: #e8f5e8; }
                ...summary { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
                @media print {
                    body { margin: 0; font-size: 11px; }
                    ...no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>ПОЛНАЯ СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ</h1>
                <h2>по результатам инвентаризации №${inventory.id}</h2>
            </div>
            
            <div class="info">
                <p><strong>Тип инвентаризации:</strong> ${getInventoryTypeName(inventory.type)}</p>
                <p><strong>Дата проведения:</strong> ${inventory.date}</p>
                <p><strong>Магазин:</strong> ${appData.currentShop?.name || 'Магазин #451'}</p>
                <p><strong>Название:</strong> ${inventory.reason}</p>
            </div>
            
            <div class="summary">
                <h3>Сводные данные:</h3>
                <p><strong>Сумма по учету:</strong> ${formatNumber(inventory.amount)} ₽</p>
                <p><strong>Выявленная разница:</strong> ${formatNumber(inventory.difference)} ₽</p>
                <p><strong>Фактическая сумма:</strong> ${formatNumber(inventory.amount + inventory.difference)} ₽</p>
                <p><strong>Процент расхождения:</strong> ${inventory.amount !== 0 ? 
                    ((Math.abs(inventory.difference) / inventory.amount) * 100).toFixed(2) : '0.00'}%</p>
            </div>
            
            <h3>Детализированный перечень товаров:</h3>
            <p><em>Детализация содержит ${Math.min(getProductsByInventoryType(inventory.type).length, 50)} позиций товаров</em></p>
            
            <p style="margin-top: 30px; font-size: 11px; color: #666;">
                Полный список товаров доступен в электронной версии документа (CSV файл).
            </p>
            
            <div class="no-print" style="margin-top: 30px; text-align: center;">
                <button onclick="window.print()" style="padding: 10px 20px; background: #007bff; color: white; border: none; cursor: pointer;">
                    Печать документа
                </button>
                <button onclick="window.close()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; cursor: pointer; margin-left: 10px;">
                    Закрыть окно
                </button>
            </div>
            
            <div style="margin-top: 50px; font-size: 10px; color: #999; border-top: 1px solid #ddd; padding-top: 10px;">
                <p>Сформировано: ${new Date().toLocaleString('ru-RU')}</p>
                <p>Система управления инвентаризацией</p>
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
    }, 1000);
}

// Функция печати итогового документа
function printSummaryDocument(inventory, csvContent) {
    const printWindow = window.open('', '_blank');
    
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>Итоги сличительной ведомости #${inventory.id}</title>
            <style>
                body { font-family: Arial; margin: 20px; }
                h1 { text-align: center; color: #2c3e50; }
                h2 { color: #34495e; margin-top: 30px; }
                ...header { text-align: center; margin-bottom: 30px; }
                ...info { margin-bottom: 20px; }
                ...info p { margin: 5px 0; }
                ...summary { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
                ...conclusion { background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0; }
                @media print {
                    body { margin: 0; }
                    ...no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>ИТОГИ СЛИЧИТЕЛЬНОЙ ВЕДОМОСТИ</h1>
                <h2>по результатам инвентаризации №${inventory.id}</h2>
            </div>
            
            <div class="info">
                <p><strong>Тип инвентаризации:</strong> ${getInventoryTypeName(inventory.type)}</p>
                <p><strong>Дата проведения:</strong> ${inventory.date}</p>
                <p><strong>Магазин:</strong> ${appData.currentShop?.name || 'Магазин #451'}</p>
                <p><strong>Название:</strong> ${inventory.reason}</p>
                <p><strong>Количество строк в описях:</strong> ${inventory.lines}</p>
            </div>
            
            <div class="summary">
                <h3>Результаты инвентаризации:</h3>
                <p><strong>Сумма по данным бухгалтерского учета:</strong> ${formatNumber(inventory.amount)} ₽</p>
                <p><strong>Выявленная разница:</strong> ${formatNumber(inventory.difference)} ₽</p>
                <p><strong>Фактическая сумма:</strong> ${formatNumber(inventory.amount + inventory.difference)} ₽</p>
                <p><strong>Процент расхождения:</strong> ${inventory.amount !== 0 ? 
                    ((Math.abs(inventory.difference) / inventory.amount) * 100).toFixed(2) : '0.00'}%</p>
            </div>
            
            <div class="conclusion">
                <h3>Заключение инвентаризационной комиссии:</h3>
                ${inventory.difference > 0 ? 
                    '<p>Обнаружен <strong>ИЗЛИШЕК</strong> товарно-материальных ценностей.</p>' : 
                    inventory.difference < 0 ? 
                    '<p>Обнаружена <strong>НЕДОСТАЧА</strong> товарно-материальных ценностей.</p>' : 
                    '<p>Расхождений между учетными и фактическими данными <strong>НЕ ОБНАРУЖЕНО</strong>.</p>'
                }
                ${inventory.difference !== 0 ? 
                    '<p>Рекомендуется провести анализ причин расхождения и принять соответствующие меры.</p>' : 
                    '<p>Результаты инвентаризации могут быть приняты без замечаний.</p>'
                }
            </div>
            
            <div style="margin-top: 50px;">
                <p><strong>Председатель инвентаризационной комиссии:</strong></p>
                <p style="margin-top: 40px;">_________________ [ФИО]</p>
                
                <p style="margin-top: 30px;"><strong>Бухгалтер:</strong></p>
                <p style="margin-top: 40px;">_________________ [ФИО]</p>
            </div>
            
            <div class="no-print" style="margin-top: 30px; text-align: center;">
                <button onclick="window.print()" style="padding: 10px 20px; background: #007bff; color: white; border: none; cursor: pointer;">
                    Печать документа
                </button>
                <button onclick="window.close()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; cursor: pointer; margin-left: 10px;">
                    Закрыть окно
                </button>
            </div>
            
            <div style="margin-top: 50px; font-size: 10px; color: #999; border-top: 1px solid #ddd; padding-top: 10px;">
                <p>Сформировано: ${new Date().toLocaleString('ru-RU')}</p>
                <p>Система управления инвентаризацией</p>
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
    }, 1000);
}






// Глобальный обработчик для кнопки "Сформировать документ"
document.addEventListener('click', function(e) {
    if (e.target && (e.target.id === 'confirmPrintForAccountant' || 
                     e.target.closest('#confirmPrintForAccountant'))) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Кнопка "Сформировать документ" нажата');
        
        // Получаем значения из формы
        const printInventoryIdInput = document.getElementById('printInventoryId');
        const inventoryId = printInventoryIdInput?.dataset.inventoryId || 
                           printInventoryIdInput?.value.replace('Инвентаризация #', '') || 
                           '451000209';
        
        const inventoryType = document.getElementById('printInventoryType')?.value || 'alcohol';
        const printType = document.getElementById('printType')?.value || 'full';
        const printFormat = document.getElementById('printFormat')?.value || 'excel';
        const groupBy = document.getElementById('groupBy')?.value || 'product_group';
        const includeSubtotals = document.getElementById('includeSubtotals')?.checked || false;
        
        console.log('Параметры печати:', { 
            inventoryId, 
            inventoryType, 
            printType, 
            printFormat,
            groupBy,
            includeSubtotals 
        });
        
        // Находим инвентаризацию
        const inventory = appData.inventories.find(inv => 
            inv.id === inventoryId || inv.id.toString() === inventoryId.toString()
        );
        
        if (!inventory) {
            console.error('Инвентаризация не найдена:', inventoryId);
            showAlert('Ошибка: инвентаризация не найдена', 'danger');
            return;
        }
        
        console.log('Используем инвентаризацию:', inventory);
        
        // Показываем индикатор загрузки
        const printLoading = document.getElementById('printLoading');
        const printResult = document.getElementById('printResult');
        
        if (printLoading) {
            printLoading.style.display = 'block';
            printLoading.innerHTML = `
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                </div>
                <p style="margin-top: 10px;">Идет формирование документа...</p>
            `;
        }
        
        if (printResult) {
            printResult.style.display = 'none';
        }
        
        // Имитируем загрузку
        setTimeout(() => {
            if (printLoading) printLoading.style.display = 'none';
            
            try {
                // Создаем документ в зависимости от выбранного типа
                if (printType === 'full') {
                    // ПОЛНАЯ сличительная ведомость
                    createFullReconciliationDocument(inventory, printFormat);
                } else {
                    // ТОЛЬКО ИТОГИ сличительной ведомости
                    createSummaryReconciliationDocument(inventory, printFormat, groupBy, includeSubtotals);
                }
                
            } catch (error) {
                console.error('Ошибка при создании документа:', error);
                
                if (printResult) {
                    printResult.style.display = 'block';
                    printResult.innerHTML = `
                        <div style="background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px;">
                            <i class="fas fa-exclamation-circle"></i> <strong>Ошибка при формировании документа</strong>
                            <p style="margin-top: 10px;">${error.message}</p>
                        </div>
                    `;
                }
                
                showAlert('Ошибка при формировании документа', 'danger');
            }
            
        }, 1500);
    }
});
// Также добавьте обработчик для клика вне модального окна
window.addEventListener('click', function(e) {
    if (e.target.id === 'printForAccountantModal') {
        const modal = document.getElementById('printForAccountantModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
});



// Инициализируем при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем данные при старте
    loadTerminalDataFromStorage();
    
    // Инициализируем отладку
    
    
    console.log(' Приложение инициализировано');
});


// КОМПЛЕКСНОЕ РЕШЕНИЕ - УБИРАЕМ ВСЕ ДУБЛИРОВАНИЯ
function fixDuplicateHandlers() {
    console.log(' УСТРАНЕНИЕ ДУБЛИРОВАНИЯ ОБРАБОТЧИКОВ');
    
    // 1. Полностью заменяем кнопку добавления товара
    const confirmAddItemBtn = document.getElementById('confirmAddItem');
    if (confirmAddItemBtn) {
        const newBtn = confirmAddItemBtn.cloneNode(true);
        confirmAddItemBtn.parentNode.replaceChild(newBtn, confirmAddItemBtn);
        
        // Добавляем ОДИН обработчик
        document.getElementById('confirmAddItem').addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(' ЕДИНСТВЕННЫЙ обработчик confirmAddItem');
            addItemToInventory();
        });
    }
    
    // 2. Полностью заменяем кнопку открытия модалки
    const addItemBtn = document.getElementById('addItemBtn');
    if (addItemBtn) {
        const newBtn = addItemBtn.cloneNode(true);
        addItemBtn.parentNode.replaceChild(newBtn, addItemBtn);
        
        // Добавляем ОДИН обработчик
        document.getElementById('addItemBtn').addEventListener('click', function() {
            console.log(' ЕДИНСТВЕННЫЙ обработчик addItemBtn');
            document.getElementById('addItemModal').style.display = 'flex';
        });
    }
    
    console.log(' Дублирование устранено');
}

// Вызовите при загрузке
document.addEventListener('DOMContentLoaded', fixDuplicateHandlers);
    

// Aliases injected during split
const generateOperationData = generateOperationsData;
const executeOperationExport = executeOperationsExport;
