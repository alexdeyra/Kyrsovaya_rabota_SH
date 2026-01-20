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

        // Загрузка данных на панель управления (сервер)
        async function loadDashboard() {
            console.log('📥 Обновление панели управления...');

            if (!appData.currentShop || !appData.currentShop.id) {
                console.warn('⚠️ Магазин не выбран');
                return;
            }

            try {
                // Инвентаризации
                const inventories = await DataManager.getInventoriesByShop(appData.currentShop.id);
                // Нормализация статуса
                appData.inventories = (inventories || []).map(inv => ({
                    ...inv,
                    status: inv.status || (inv.isClosed ? 'completed' : 'active')
                }));

                // История и документы
                appData.history = await DataManager.getHistoryByShop(appData.currentShop.id);
                appData.documents = await DataManager.getDocumentsByShop(appData.currentShop.id);
            } catch (e) {
                console.error('❌ Ошибка загрузки данных:', e);
                showAlert && showAlert('Ошибка загрузки данных. Проверьте подключение к базе.', 'error');
            }

            // Обновляем UI
            updateTotalDifference();
            loadInventoriesTable();
            loadHistoryTable();
            loadDocumentsTable();

            console.log('✅ Панель управления обновлена');
        }
        window.loadDashboard = loadDashboard;


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
    
    // Без демо-данных: если список пуст — просто показываем пустую таблицу
    if (!Array.isArray(appData.inventories)) appData.inventories = [];
    
    const shopInventories = appData.inventories.filter(inv => inv.shopId === appData.currentShop.id);

    if (shopInventories.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 8;
        cell.style.opacity = '0.75';
        cell.style.padding = '14px';
        cell.textContent = 'Инвентаризаций пока нет. Создайте первую через «Создать инвентаризацию». '; 
        row.appendChild(cell);
        tbody.appendChild(row);
        return;
    }
    
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

async function viewInventoryFull(inventoryId) {
    console.log('🔍 ОТКРЫТИЕ ПРОСМОТРА ИНВЕНТАРИЗАЦИИ');
    
    // Устанавливаем текущую инвентаризацию
    appData.currentInventoryId = Number(inventoryId);
    
    // Загружаем актуальные данные с сервера
    try {
        await loadTerminalDataFromStorage();
    } catch (e) {
        console.warn('Не удалось загрузить данные инвентаризации с сервера', e);
    }
    
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
            const fullModal = document.getElementById('viewInventoryItemsFullScreen');
            if (fullModal) {
                fullModal.style.display = 'block';

                // Закрытие по крестику (в текущей верстке это .close без id)
                const closeBtn = fullModal.querySelector('.close');
                if (closeBtn) {
                    closeBtn.onclick = function() {
                        fullModal.style.display = 'none';
                    };
                }

                // Кнопка сохранения (делаем через onclick, чтобы не плодить дубли)
                const saveBtn = document.getElementById('saveInventoryItemsBtn');
                if (saveBtn) {
                    saveBtn.onclick = function() {
                        saveInventoryItems();
                    };
                }
            }

            
            
            
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
