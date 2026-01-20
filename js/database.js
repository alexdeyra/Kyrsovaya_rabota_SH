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
            { name: 'Хлеб пшеничный нарезной 500 г', category: 'Хлеб', group: 'Хлебобулочные', price: 55.00, type: 'general' },
            { name: 'Батон нарезной 400 г', category: 'Хлеб', group: 'Хлебобулочные', price: 49.00, type: 'general' },
            { name: 'Молоко 2.5% 1 л', category: 'Молочные', group: 'Молочка', price: 89.00, type: 'general' },
            { name: 'Кефир 2.5% 1 л', category: 'Молочные', group: 'Молочка', price: 92.00, type: 'general' },
            { name: 'Сметана 20% 300 г', category: 'Молочные', group: 'Молочка', price: 119.00, type: 'general' },
            { name: 'Сыр твёрдый 200 г', category: 'Молочные', group: 'Сыры', price: 219.00, type: 'general' },
            { name: 'Яйцо куриное С1 10 шт', category: 'Бакалея', group: 'Яйца', price: 109.00, type: 'general' },
            { name: 'Сахар-песок 1 кг', category: 'Бакалея', group: 'Сахар', price: 89.00, type: 'general' },
            { name: 'Соль пищевая 1 кг', category: 'Бакалея', group: 'Соль', price: 29.00, type: 'general' },
            { name: 'Рис круглозёрный 900 г', category: 'Бакалея', group: 'Крупы', price: 119.00, type: 'general' },
            { name: 'Гречка 900 г', category: 'Бакалея', group: 'Крупы', price: 139.00, type: 'general' },
            { name: 'Макароны 450 г', category: 'Бакалея', group: 'Макароны', price: 69.00, type: 'general' },
            { name: 'Масло подсолнечное 1 л', category: 'Бакалея', group: 'Масла', price: 149.00, type: 'general' },
            { name: 'Кетчуп 500 г', category: 'Соусы', group: 'Соусы', price: 119.00, type: 'general' },
            { name: 'Майонез 400 г', category: 'Соусы', group: 'Соусы', price: 109.00, type: 'general' },
            { name: 'Чай чёрный 100 пакетиков', category: 'Чай/кофе', group: 'Чай', price: 199.00, type: 'general' },
            { name: 'Кофе растворимый 95 г', category: 'Чай/кофе', group: 'Кофе', price: 329.00, type: 'general' },
            { name: 'Вода питьевая 1.5 л', category: 'Напитки', group: 'Вода', price: 49.00, type: 'general' },
            { name: 'Сок яблочный 1 л', category: 'Напитки', group: 'Соки', price: 129.00, type: 'general' },
            { name: 'Печенье овсяное 300 г', category: 'Сладости', group: 'Печенье', price: 99.00, type: 'general' },
            { name: 'Шоколад молочный 90 г', category: 'Сладости', group: 'Шоколад', price: 89.00, type: 'general' },
            { name: 'Конфеты карамель 250 г', category: 'Сладости', group: 'Конфеты', price: 159.00, type: 'general' },
            { name: 'Колбаса варёная 400 г', category: 'Мясо', group: 'Колбасы', price: 239.00, type: 'general' },
            { name: 'Сосиски молочные 450 г', category: 'Мясо', group: 'Сосиски', price: 249.00, type: 'general' },
            { name: 'Куриное филе охлаждённое 1 кг', category: 'Мясо', group: 'Птица', price: 379.00, type: 'general' },
            { name: 'Стиральный порошок 2.4 кг', category: 'Бытовая химия', group: 'Стирка', price: 499.00, type: 'general' },
            { name: 'Средство для мытья посуды 450 мл', category: 'Бытовая химия', group: 'Мытьё посуды', price: 159.00, type: 'general' },
            { name: 'Туалетная бумага 8 рулонов', category: 'Бытовые товары', group: 'Бумажные товары', price: 179.00, type: 'general' },
            { name: 'Салфетки бумажные 100 шт', category: 'Бытовые товары', group: 'Бумажные товары', price: 79.00, type: 'general' },
            { name: 'Зубная паста 100 мл', category: 'Гигиена', group: 'Уход', price: 129.00, type: 'general' },
            { name: 'Шампунь 400 мл', category: 'Гигиена', group: 'Уход', price: 219.00, type: 'general' },
            { name: 'Мыло жидкое 500 мл', category: 'Гигиена', group: 'Уход', price: 149.00, type: 'general' },
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
        // Общая инвентаризация принимает ТОЛЬКО обычные товары
        return productType === 'general';
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
// Функция для создания понятного сообщения об ошибке
function getTypeErrorMessage(productType, inventoryType) {
    const productTypeNames = {
        general: "обычный товар",
        alcohol: "алкогольный товар",
        beer: "пиво",
        cigarettes: "сигареты"
    };

    const inventoryTypeNames = {
        general: "общую инвентаризацию",
        alcohol: "алкогольную инвентаризацию",
        beer: "инвентаризацию пива",
        cigarettes: "инвентаризацию сигарет"
    };

    const allowedNames = {
        general: "только обычные товары",
        alcohol: "только алкогольные товары",
        beer: "только пиво",
        cigarettes: "только сигареты"
    };

    const productName = productTypeNames[productType] || "товар";
    const inventoryName = inventoryTypeNames[inventoryType] || "эту инвентаризацию";
    const allowed = allowedNames[inventoryType] || "товары подходящего типа";

    return `Нельзя добавить ${productName} в ${inventoryName}. Разрешено: ${allowed}.`;
}
		
		

