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
// Инициализация обработчиков для модального окна редактирования
function initEditItemModalHandlers() {
    // Кнопка отмены редактирования
    document.getElementById("cancelEditItem")?.addEventListener("click", function() {
        const modal = document.getElementById("editItemModal");
        if (modal) modal.style.display = "none";
    });

    // Кнопка сохранения изменений
    document.getElementById("confirmEditItem")?.addEventListener("click", saveEditedItem);

    // Обработка Enter в поле штрихкода
    document.getElementById("editItemBarcode")?.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("editItemQuantity")?.focus();
        }
    });

    // Обработка Enter в поле количества
    document.getElementById("editItemQuantity")?.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            saveEditedItem();
        }
    });
}

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
async function deleteInventoryItemFromList(itemIndex) {
    // Защита от множественного вызова
    if (isDeleting) {
        console.log(' Удаление уже в процессе');
        showAlert('Удаление уже выполняется, подождите...', 'warning');
        return;
    }

    console.log('🗑️ УДАЛЕНИЕ ТОВАРА (SERVER)');
    console.log(' Индекс для удаления:', itemIndex);

    // Проверяем наличие данных
    if (!appData.currentInventoryItem || !appData.currentInventoryItem.items) {
        console.error('❌ Нет данных о товарах');
        showAlert('Ошибка: нет данных о товарах', 'error');
        return;
    }

    const items = appData.currentInventoryItem.items;

    // Проверяем корректность индекса
    if (itemIndex < 0 || itemIndex >= items.length) {
        console.error('❌ Неверный индекс:', itemIndex);
        showAlert('Ошибка: товар не найден', 'error');
        return;
    }

    const itemToDelete = items[itemIndex];
    console.log(' Товар для удаления:', itemToDelete);

    // Показываем подтверждение
    const confirmMessage = `Удалить товар?

Название: ${itemToDelete.name || 'Без названия'}
Штрихкод: ${itemToDelete.barcode || 'Не указан'}
Количество: ${itemToDelete.quantity || 0}
Сумма: ${formatNumber((itemToDelete.quantity || 0) * (itemToDelete.price || 0))} ₽
`;

    if (!confirm(confirmMessage)) {
        console.log(' Пользователь отменил удаление');
        return;
    }

    isDeleting = true;

    try {
        console.log(' Удаление товара...');
        const deletedItemName = itemToDelete.name || 'Товар';

        // Удаляем в БД, если есть идентификатор строки
        if (itemToDelete.id && typeof DataManager !== 'undefined' && typeof DataManager.deleteItem === 'function') {
            await DataManager.deleteItem(itemToDelete.id);

            // Перезагружаем данные с сервера, чтобы удалённые позиции не возвращались
            await loadTerminalDataFromStorage();

            // Обновляем текущую опись ссылкой на свежие данные
            const invId = appData.currentInventoryId;
            const currentSheetId = appData.currentInventoryItem?.id;
            const sheets = (appData.terminalData && invId) ? (appData.terminalData[invId] || []) : [];
            const freshSheet = sheets.find(s => String(s.id) === String(currentSheetId));

            if (freshSheet) {
                appData.currentInventoryItem = freshSheet;
                appData.currentInventoryItems = freshSheet.items || [];
            }
        } else {
            // Фоллбек (на случай старых данных без id)
            items.splice(itemIndex, 1);
            appData.currentInventoryItems = items;
        }

        // Обновляем интерфейс
        updateInventoryItemsTable();

        // Обновляем статистику описи (если функция есть)
        if (typeof updateOperatorStatistics === 'function' && appData.currentInventoryItem?.id) {
            updateOperatorStatistics(appData.currentInventoryItem.id);
        }

        showAlert(`Товар "${deletedItemName}" успешно удален`, 'success');
        console.log('✅ Товар успешно удалён');

    } catch (error) {
        console.error('❌ Ошибка при удалении товара:', error);
        showAlert(`Ошибка при удалении товара: ${error?.message || 'Неизвестная ошибка'}`, 'error');
    } finally {
        isDeleting = false;
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
        // Жесткое ограничение: только 13 цифр (EAN-13)
        try {
            barcodeInput.setAttribute('maxlength', '13');
            barcodeInput.setAttribute('inputmode', 'numeric');
            barcodeInput.setAttribute('pattern', '\\d{13}');
        } catch (_) {}

        // Добавляем новый обработчик с нормализацией
        barcodeInput.oninput = function() {
            const sanitized = String(this.value || '').replace(/\D+/g, '').slice(0, 13);
            if (this.value !== sanitized) this.value = sanitized;
            handleBarcodeChangeInEdit(sanitized);
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


// ====== FIXES V16: edit item server save + strict barcode + live stats ======

// 1) В редактировании штрихкод: только 13 цифр, автозаполнение как в добавлении
function handleBarcodeChangeInEdit(rawBarcode) {
    const barcodeInput = document.getElementById('editItemBarcode');
    const nameInput = document.getElementById('editItemName');
    const infoEl = document.getElementById('editProductInfo');

    const clean = (String(rawBarcode || '')).replace(/\D/g, '').slice(0, 13);
    if (barcodeInput && barcodeInput.value !== clean) barcodeInput.value = clean;

    // Сбрасываем подсветку
    if (barcodeInput) barcodeInput.classList.remove('is-valid', 'is-invalid');

    if (!clean) {
        if (nameInput) {
            nameInput.value = '';
            nameInput.style.backgroundColor = '#f8f9fa';
        }
        if (infoEl) {
            infoEl.innerHTML = '';
        }
        return;
    }

    // Валидируем длину 13
    if (clean.length !== 13) {
        if (barcodeInput) barcodeInput.classList.add('is-invalid');
        if (infoEl) {
            infoEl.innerHTML = `
                <div class="alert alert-warning">
                    <p><strong>Штрихкод должен содержать 13 цифр.</strong></p>
                    <small class="text-muted">Сейчас введено: ${clean.length}</small>
                </div>
            `;
        }
        // Не ищем товар, пока не введены все 13 цифр
        return;
    }

    if (barcodeInput) barcodeInput.classList.add('is-valid');

    // Определяем тип инвентаризации
    let inventoryType = 'general';
    try {
        if (appData?.currentInventoryItem?.inventoryType) {
            inventoryType = appData.currentInventoryItem.inventoryType;
        } else if (appData?.currentInventoryId) {
            const inv = (appData.inventories || []).find(i => String(i.id) === String(appData.currentInventoryId));
            if (inv?.type) inventoryType = inv.type;
        }
    } catch (_) {}

    // Ищем товар (как в добавлении): локальная база + генерация, если не найден
    let productInfo = null;
    try {
        if (typeof findProductByBarcode === 'function') {
            productInfo = findProductByBarcode(clean, inventoryType);
        }
    } catch (e) {
        console.warn('findProductByBarcode error:', e);
    }

    if (productInfo) {
        if (nameInput) {
            nameInput.value = productInfo.name || '';
            nameInput.style.backgroundColor = '#e8f4fd';
        }
        if (infoEl) {
            const status = productInfo.foundInDb ? 'В базе данных' : 'Сгенерирован';
            const badge = productInfo.isRandom ? '<span class="badge bg-warning text-dark">Авто</span>' : '<span class="badge bg-success">База</span>';
            infoEl.innerHTML = `
                <div class="alert alert-success">
                    <p><strong>Товар:</strong> ${productInfo.name || '—'} ${badge}</p>
                    <p><strong>Категория:</strong> ${productInfo.category || 'Не указана'}</p>
                    <p><strong>Цена:</strong> ${typeof formatNumber === 'function' ? formatNumber(productInfo.price || 0) : (productInfo.price || 0)} ₽</p>
                    <p><strong>Статус:</strong> ${status}</p>
                    <small class="text-muted">Данные подставлены по штрихкоду</small>
                </div>
            `;
        }
    } else {
        if (nameInput) {
            nameInput.value = '';
            nameInput.style.backgroundColor = '#f8f9fa';
        }
        if (infoEl) {
            infoEl.innerHTML = `
                <div class="alert alert-secondary">
                    <p>Товар не найден.</p>
                </div>
            `;
        }
    }
}

// 2) Сохранение редактирования товара — через API (чтобы изменения реально сохранялись)
(function initEditItemServerSave() {
    const btn = document.getElementById('confirmEditItem');
    if (!btn || !btn.parentNode) return;

    // Убираем ВСЕ старые обработчики (их в проекте было несколько)
    const cleanBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(cleanBtn, btn);

    cleanBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        e.stopPropagation();

        try {
            const barcodeEl = document.getElementById('editItemBarcode');
            const qtyEl = document.getElementById('editItemQuantity');
            const idxEl = document.getElementById('editItemIndex');

            if (!appData?.currentInventoryItem) {
                throw new Error('Сначала выберите опись');
            }

            const sheetId = appData.currentInventoryItem.id;
            const rawBarcode = (barcodeEl?.value || '');
            const barcode = String(rawBarcode).replace(/\D/g, '').slice(0, 13);
            if (barcodeEl && barcodeEl.value !== barcode) barcodeEl.value = barcode;

            if (barcode.length !== 13) {
                throw new Error('Штрихкод должен содержать ровно 13 цифр');
            }

            const qtyRaw = (qtyEl?.value || '').toString().replace(',', '.');
            const qty = parseFloat(qtyRaw);
            if (!Number.isFinite(qty) || qty <= 0) {
                throw new Error('Введите корректное количество (больше 0)');
            }

            const itemIndex = parseInt((idxEl?.value || '-1'), 10);
            if (!Number.isFinite(itemIndex) || itemIndex < 0) {
                throw new Error('Неверный индекс товара');
            }

            const list = appData.currentInventoryItems || appData.currentInventoryItem.items || [];
            const item = list[itemIndex];
            if (!item || !item.id) {
                throw new Error('Не удалось определить запись товара для обновления');
            }

            if (typeof DataManager === 'undefined' || typeof DataManager.updateItem !== 'function') {
                throw new Error('API обновления товара недоступно');
            }

            // Обновляем на сервере (сервер сам подставит name/price/category по штрихкоду)
            await DataManager.updateItem(item.id, { barcode, quantity: Number(qty.toFixed(3)) });

            // Перезагружаем данные (чтобы строки/кол-во обновились в реальном времени)
            if (typeof loadTerminalDataFromStorage === 'function') {
                await loadTerminalDataFromStorage();
            }

            // Перепривязываем текущую опись
            const invId = appData.currentInventoryId;
            const sheets = appData.terminalData?.[invId] || [];
            const freshSheet = sheets.find(s => String(s.id) === String(sheetId));
            if (freshSheet) {
                appData.currentInventoryItem = freshSheet;
                appData.currentInventoryItems = freshSheet.items || [];
            }

            if (typeof updateInventoryItemsTable === 'function') {
                updateInventoryItemsTable();
            }

            if (typeof updateInventoryOperatorsTableFull === 'function') {
                try { updateInventoryOperatorsTableFull(invId); } catch(_) {}
            }

            // Обновляем шапку описи (строки/количество) сразу
            const linesEl = document.getElementById('inventoryItemLinesFull');
            const qtySumEl = document.getElementById('inventoryItemTotalQuantityFull');
            if (freshSheet) {
                if (linesEl) linesEl.textContent = String(freshSheet.lines || 0);
                if (qtySumEl) qtySumEl.textContent = Number(freshSheet.quantity || 0).toFixed(3);
            }

            // Закрываем модалку
            const modal = document.getElementById('editItemModal');
            if (modal) modal.style.display = 'none';

            if (typeof showAlert === 'function') {
                showAlert('Товар обновлён', 'success');
            }
        } catch (err) {
            console.error('❌ Ошибка сохранения редактирования товара:', err);
            if (typeof showAlert === 'function') {
                showAlert(err?.message || 'Ошибка сохранения товара', 'error');
            } else {
                alert(err?.message || 'Ошибка сохранения товара');
            }
        }
    });

    // Санитайзер штрихкода в модалке редактирования
    const editBarcode = document.getElementById('editItemBarcode');
    if (editBarcode) {
        editBarcode.addEventListener('input', function() {
            handleBarcodeChangeInEdit(this.value);
        });
    }
})();
