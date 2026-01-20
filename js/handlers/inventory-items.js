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

async function saveEditedItem() {
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
        
        // Нормализуем штрихкод: только цифры и максимум 13 (EAN-13)
        const barcodeRaw = (barcodeInput.value || '').trim();
        const barcode = String(barcodeRaw).replace(/\D+/g, '').slice(0, 13);
        if (barcodeInput.value !== barcode) barcodeInput.value = barcode;
        const name = nameInput.value.trim();
        const quantityStr = quantityInput.value.trim();
        const itemIndex = indexInput.value;
        
        console.log(' Данные для сохранения:', { barcode, name, quantityStr, itemIndex });
        
        // ==============================
        // ВАЛИДАЦИЯ
        // ==============================
        const errors = [];
        
        if (!barcode) errors.push('Введите штрихкод товара');
        if (barcode && barcode.length !== 13) errors.push('Штрихкод должен содержать ровно 13 цифр');
        
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
        
        if (quantity > 1000) {
            showAlert('Нельзя указать больше 1000 шт одного вида товара. Максимум: 1000.', 'warning');
            throw new Error('Количество > 1000');
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
            console.log('🔄 Штрихкод изменен, ищем новый товар...');

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

            // Ищем товар в базе и проверяем совместимость типа
            const productInfo = (typeof findProductByBarcode === 'function')
                ? findProductByBarcode(barcode, inventoryType)
                : null;

            if (!productInfo) {
                showAlert('База товаров недоступна. Невозможно изменить штрихкод.', 'error');
                throw new Error('findProductByBarcode недоступна');
            }

            if (productInfo.errorMessage || productInfo.isValidForInventory === false) {
                showAlert(productInfo.errorMessage || 'Этот товар не подходит для данной инвентаризации', 'error');
                throw new Error('Товар не подходит для инвентаризации');
            }

            // Обновляем атрибуты товара
            price = (Number(productInfo.price) > 0) ? Number(productInfo.price) : (price || 100.00);
            category = productInfo.category || category || '';
            group = productInfo.group || group || '';

            // Обновляем тип товара и признак случайного
            const newType = productInfo.type || inventoryType || 'general';
            items[index].type = newType;
            items[index].inventoryType = inventoryType;
            items[index].isRandom = !!productInfo.isRandom;

            console.log('✅ Товар найден/сгенерирован:', productInfo.name, 'тип:', newType, 'цена:', price);
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
                // Ограничение: максимум 1000 шт одного товара
                const mergedQty = (items[duplicateItemIndex].quantity || 0) + quantity;
                if (mergedQty > 1000) {
                    showAlert('Нельзя объединить товары: итоговое количество превысит 1000 шт. Уменьшите количество.', 'warning');
                    throw new Error('Объединение > 1000');
                }

                // Объединяем количество
                items[duplicateItemIndex].quantity = mergedQty;
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
        
        // ==============================
        // СЕРВЕРНОЕ СОХРАНЕНИЕ (MySQL)
        // ==============================
        const itemId = items[index]?.id;
        if (!itemId) {
            throw new Error('У товара нет ID. Перезайдите в инвентаризацию и повторите.');
        }

        // Сохраняем на сервер (штрихкод EAN-13 и количество)
        await DataManager.updateItem(itemId, {
            barcode,
            quantity: Number(parseFloat(quantity.toFixed(3)))
        });

        // Перезагружаем актуальные данные с сервера, чтобы не было рассинхрона
        await loadTerminalDataFromStorage();

        const invId = appData.currentInventoryId;
        const sheetId = appData.currentInventoryItem?.id;
        const sheets = appData.terminalData?.[invId] || [];
        const sheet = sheets.find(s => String(s.id) === String(sheetId));
        if (sheet) {
            appData.currentInventoryItem = sheet;
            appData.currentInventoryItems = sheet.items || [];
        }

        // Обновляем интерфейс
        if (typeof updateInventoryItemsTable === 'function') updateInventoryItemsTable();

        // Обновляем показатели описи (строки/количество) в реальном времени
        const linesEl = document.getElementById('inventoryItemLinesFull');
        const qtyEl = document.getElementById('inventoryItemTotalQuantityFull');
        if (linesEl) linesEl.textContent = String((appData.currentInventoryItem?.lines ?? 0));
        if (qtyEl) qtyEl.textContent = Number(appData.currentInventoryItem?.quantity ?? 0).toFixed(3);

        if (typeof updateInventoryOperatorsTableFull === 'function') {
            try { updateInventoryOperatorsTableFull(invId); } catch (_) {}
        }

        // Закрываем модальное окно
        document.getElementById('editItemModal').style.display = 'none';

        showAlert('Товар успешно обновлен', 'success');

        // Локальная статистика (если используется)
        try { updateOperatorStatistics(appData.currentInventoryItem.id); } catch (_) {}
        
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
        const digitsOnly = barcode.replace(/\D/g, '').slice(0, 13);
        if (this.value !== digitsOnly) this.value = digitsOnly;

        // Ищем товар только когда введено ровно 13 цифр
        if (digitsOnly.length === 13) {
            const productInfo = findProductByBarcode(digitsOnly, (appData.currentInventoryType || 'general'));
            
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
document.getElementById('editItemModal')?.addEventListener('show', function() {
    console.log(' Модальное окно редактирования открыто, переинициализируем обработчики');
    setTimeout(() => {
        initEditItemHandlers();
    }, 100);
});








// ===== СТАБИЛЬНОЕ ОТКРЫТИЕ МОДАЛКИ 'Добавить товар' =====
function openAddItemModal() {
    console.log('🟢 Нажата кнопка: Добавить товар');

    // appData — глобальный объект состояния. В некоторых сборках он может быть
    // доступен как глобальная переменная, а в некоторых — как window.appData.
    if (typeof appData === 'undefined' && !window.appData) {
        console.warn('appData не найден');
        return;
    }

    const state = (typeof appData !== 'undefined') ? appData : window.appData;

    if (!state.currentInventoryItem) {
        // В некоторых сценариях currentInventoryItem может ещё не быть установлен
        // (например, если окно открыли из другого места). Не молчим.
        if (typeof showAlert === 'function') {
            showAlert('Сначала откройте опись (список товаров)', 'warning');
        } else {
            alert('Сначала откройте опись (список товаров)');
        }
        return;
    }

    const modal = document.getElementById('addItemModal');
    if (!modal) {
        console.warn('addItemModal не найден в DOM');
        return;
    }

    modal.style.display = 'flex';
    if (typeof clearAddItemForm === 'function') clearAddItemForm();

    setTimeout(() => {
        document.getElementById('itemBarcode')?.focus();
    }, 50);
}

function bindAddItemDelegationOnce() {
    if (window.__addItemDelegationBound) return;
    window.__addItemDelegationBound = true;

    // Делегирование: работает даже если кнопку пересоздали через innerHTML
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('#addItemBtn');
        if (!btn) return;
        e.preventDefault();
        openAddItemModal();
    });
}

function bindAddItemButtonDirect() {
    const btn = document.getElementById('addItemBtn');
    if (btn) btn.onclick = openAddItemModal;
}

function bindConfirmAddItemDirect() {
    const btn = document.getElementById('confirmAddItem');
    if (!btn) return;

    btn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        try {
            if (typeof addItemToInventory === 'function') {
                addItemToInventory();
            } else if (typeof addItemDirectly === 'function') {
                addItemDirectly();
            } else {
                throw new Error('Функция добавления товара не найдена');
            }
        } catch (err) {
            console.error('Ошибка добавления товара:', err);
            if (typeof showAlert === 'function') {
                showAlert('Ошибка добавления товара: ' + err.message, 'error');
            }
        }
    };
}

function initItemManagement() {
    console.log(' ИНИЦИАЛИЗАЦИЯ УПРАВЛЕНИЯ ТОВАРАМИ');
    // Кнопка добавления товара (стабильный биндинг)
    bindAddItemDelegationOnce();
    bindAddItemButtonDirect();
    bindConfirmAddItemDirect();
    
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

        // Удаление товара (SERVER)
        // Раньше удаление было только в интерфейсе, поэтому после добавления новой позиции
        // происходила перезагрузка с сервера и "удалённые" возвращались.
        async function deleteItem(index) {
            const list = appData.currentInventoryItems || [];
            const item = list[index];
            if (!item) return;

            const confirmText = `Вы уверены, что хотите удалить этот товар?\n\n` +
                `Штрихкод: ${item.barcode || '—'}\n` +
                `Название: ${item.name || '—'}\n` +
                `Количество: ${item.quantity ?? 0}`;

            if (!confirm(confirmText)) return;

            try {
                // Если есть id строки — удаляем в БД
                if (item.id && typeof DataManager !== 'undefined' && typeof DataManager.deleteItem === 'function') {
                    await DataManager.deleteItem(item.id);

                    // Подтягиваем актуальные данные с сервера
                    await loadTerminalDataFromStorage();

                    const invId = appData.currentInventoryId;
                    const sheetId = appData.currentInventoryItem?.id;
                    const sheets = (appData.terminalData && invId) ? (appData.terminalData[invId] || []) : [];
                    const freshSheet = sheets.find(s => String(s.id) === String(sheetId));

                    if (freshSheet) {
                        appData.currentInventoryItem = freshSheet;
                        appData.currentInventoryItems = freshSheet.items || [];
                    } else {
                        appData.currentInventoryItems = [];
                    }
                } else {
                    // Фоллбек (старые данные без id)
                    list.splice(index, 1);
                    appData.currentInventoryItems = list;
                }

                // Перерисовка (без повторного открытия)
                if (typeof updateInventoryItemsTable === 'function') {
                    updateInventoryItemsTable();
                }
                const _linesEl = document.getElementById('inventoryItemLinesFull');
                const _qtyEl = document.getElementById('inventoryItemTotalQuantityFull');
                if (appData.currentInventoryItem) {
                    if (_linesEl) _linesEl.textContent = String(appData.currentInventoryItem.lines || 0);
                    if (_qtyEl) _qtyEl.textContent = Number(appData.currentInventoryItem.quantity || 0).toFixed(3);
                }
                if (typeof updateInventoryOperatorsTableFull === 'function') {
                    try { updateInventoryOperatorsTableFull(appData.currentInventoryId); } catch(_) {}
                }
                showAlert('Товар успешно удален', 'success');
            } catch (e) {
                console.error('❌ Ошибка удаления товара:', e);
                showAlert(e?.message || 'Ошибка удаления товара', 'error');
            }
        }

        function saveInventoryItems() {
            console.log('💾 СОХРАНЕНИЕ ИЗМЕНЕНИЙ В ОПИСИ');

            if (!appData.currentInventoryItem) {
                showAlert('Нет активной описи для сохранения', 'warning');
                return;
            }

            // Пересчёт итогов
            const totalQuantity = (appData.currentInventoryItems || []).reduce(
                (sum, item) => sum + (Number(item?.quantity) || 0),
                0
            );
            const totalLines = (appData.currentInventoryItems || []).length;
            const totalAmount = (appData.currentInventoryItems || []).reduce(
                (sum, item) => sum + (Number(item?.totalPrice) || (Number(item?.price) || 0) * (Number(item?.quantity) || 0)),
                0
            );

            appData.currentInventoryItem.quantity = totalQuantity;
            appData.currentInventoryItem.lines = totalLines;
            appData.currentInventoryItem.amount = totalAmount;
            appData.currentInventoryItem.items = [...(appData.currentInventoryItems || [])];

            // Сохраняем изменения
            if (typeof saveTerminalDataToStorage === 'function') {
                saveTerminalDataToStorage();
            }

            // Обновляем отображение (если функция существует)
            if (typeof updateInventoryItemsTable === 'function') {
                updateInventoryItemsTable();
            }

            showAlert('Изменения в описи сохранены', 'success');
            console.log('✅ Изменения сохранены');
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
                // Основной путь: addItemToInventory (использует базу и проверки)
                if (typeof addItemToInventory === 'function') return addItemToInventory();

                // Фоллбек, если что-то вырезали/не загрузилось
                console.warn(' addItemToInventory не найдена — использую запасной метод');
                return addItemDirectly();
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

// ОСНОВНАЯ ФУНКЦИЯ ДОБАВЛЕНИЯ ТОВАРА (как в исходной логике проекта)
// Использует базу товаров (database.js) и проверку соответствия типу инвентаризации.
async function addItemToInventory() {
    console.log('➕ addItemToInventory (SERVER)');

    const barcodeInput = document.getElementById('itemBarcode');
    const quantityInput = document.getElementById('itemQuantity');

    if (!barcodeInput || !quantityInput) {
        showAlert('Ошибка формы: не найдены поля', 'error');
        return;
    }

    const barcode = (barcodeInput.value || '').trim();
    const quantityStr = (quantityInput.value || '').trim();

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

    if (!/^\d+$/.test(barcode)) {
        showAlert('Штрихкод должен содержать только цифры', 'warning');
        barcodeInput.focus();
        barcodeInput.select?.();
        return;
    }

    if (barcode.length !== 13) {
        showAlert('Штрихкод должен содержать ровно 13 цифр', 'warning');
        barcodeInput.focus();
        barcodeInput.select?.();
        return;
    }

    const quantity = parseFloat(quantityStr.replace(',', '.'));
    if (!Number.isFinite(quantity) || quantity <= 0) {
        showAlert('Введите корректное количество (больше 0)', 'warning');
        quantityInput.focus();
        quantityInput.select?.();
        return;
    }

    const dec = (quantityStr.replace(',', '.').split('.')[1] || '').length;
    if (dec > 3) {
        showAlert('Количество не может содержать более 3 знаков после запятой', 'warning');
        quantityInput.focus();
        quantityInput.select?.();
        return;
    }

    if (quantity > 1000) {
        showAlert('Нельзя добавить больше 1000 шт одного вида товара. Максимум: 1000.', 'warning');
        quantityInput.value = '1000';
        quantityInput.focus();
        quantityInput.select?.();
        return;
    }

    if (!appData.currentInventoryItem) {
        showAlert('Сначала откройте опись', 'error');
        return;
    }

    // Если инвентаризация закрыта — блокируем добавление
    if (appData.currentInventoryId) {
        const inv = appData.inventories?.find(i => i.id == appData.currentInventoryId);
        if (inv && inv.isClosed) {
            showAlert('Невозможно добавить товар. Инвентаризация закрыта!', 'error');
            document.getElementById('addItemModal').style.display = 'none';
            return;
        }
    }

    const sheetId = appData.currentInventoryItem.id;

    try {
        await DataManager.addItem(sheetId, barcode, Number(quantity.toFixed(3)));

        // Обновляем данные с сервера
        await loadTerminalDataFromStorage();

        // Перепривязываем текущую опись и список товаров
        const invId = appData.currentInventoryId;
        const sheets = appData.terminalData?.[invId] || [];
        const sheet = sheets.find(s => String(s.id) === String(sheetId));
        if (sheet) {
            appData.currentInventoryItem = sheet;
            appData.currentInventoryItems = sheet.items || [];
        }

        // Обновляем показатели по описи (строки/количество) в реальном времени
        const linesEl = document.getElementById('inventoryItemLinesFull');
        const qtyEl = document.getElementById('inventoryItemTotalQuantityFull');
        if (linesEl) linesEl.textContent = String((appData.currentInventoryItem?.lines ?? 0));
        if (qtyEl) qtyEl.textContent = Number(appData.currentInventoryItem?.quantity ?? 0).toFixed(3);

        // Обновляем список описей/операторов, если он открыт
        if (typeof updateInventoryOperatorsTableFull === 'function') {
            try { updateInventoryOperatorsTableFull(invId); } catch(_) {}
        }

        if (typeof updateInventoryItemsTable === 'function') updateInventoryItemsTable();

        document.getElementById('addItemModal').style.display = 'none';
        clearAddItemForm();

        showAlert('Товар добавлен', 'success');
    } catch (e) {
        console.error('Ошибка добавления товара:', e);
        showAlert(e.message || 'Ошибка добавления товара', 'error');
    }
}

function isItemAllowedForInventoryType(itemType, inventoryType) {
    console.log(' Проверка типа товара:', { itemType, inventoryType });
    
    // Создаем карту соответствия
    const allowedTypes = {
        'alcohol': ['водка', 'вино', 'коньяк', 'виски', 'шампанское', 'ликёр', 'ром', 'джин', 'текила', 'наливка', 'настойка', 'алкоголь'],
        'beer': ['пиво', 'эль', 'лагер', 'стаут', 'портер', 'сидр', 'медовуха'],
        'cigarettes': ['сигареты', 'сигары', 'сигариллы', 'табак', 'папиросы', 'курительные']
    };
    
    // Если инвентаризация общая - разрешаем только обычные товары
    if (inventoryType === 'general') {
        const t = (itemType || '').toLowerCase();
        // Явные спец-типы запрещаем
        if (t === 'alcohol' || t === 'beer' || t === 'cigarettes') return false;
        if (t.includes('алкоголь') || t.includes('пиво') || t.includes('сигар')) return false;
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
document.getElementById('confirmAddInventoryItem')?.addEventListener('click', async function() {
    console.log('🆕 СОЗДАНИЕ НОВОЙ ОПИСИ (SERVER)');

    const nameInput = document.getElementById('itemName');
    if (!nameInput) return;

    const name = (nameInput.value || '').trim();
    if (!name) {
        showAlert('Введите название описи', 'warning');
        nameInput.focus();
        return;
    }

    const inventoryId = appData.currentInventoryId;
    if (!inventoryId) {
        showAlert('Не выбрана инвентаризация', 'error');
        return;
    }

    let date = new Date().toLocaleDateString('ru-RU');
    const dateElement = document.getElementById('inventoryDateTextFull');
    if (dateElement && dateElement.textContent) date = dateElement.textContent;

    try {
        await DataManager.createSheet(inventoryId, name, date);
        // Обновляем данные инвентаризации с сервера
        await loadTerminalDataFromStorage();
        updateInventoryOperatorsTableFull(inventoryId);
        showAlert(`Опись "${name}" успешно создана`, 'success');
        document.getElementById('addInventoryItemModal').style.display = 'none';
        nameInput.value = '';
    } catch (e) {
        console.error('Ошибка создания описи:', e);
        showAlert(e.message || 'Ошибка создания описи', 'error');
    }
});



function updateInventoryTable() {
    const tableBody = document.querySelector('#inventory-table tbody');
    if (!tableBody) return;
    
    
}

function attachInventoryItemEvents() {
    // Пока оставьте пустой
}

// Загрузка описи из файла в этой серверной версии НЕ реализована.
// Раньше здесь генерировались демо-данные (в т.ч. случайные lines/quantity), из-за чего
// в пустых описях могли появляться "рандомные" цифры. Теперь показываем понятное сообщение.
(function bindUploadSheetNotSupportedOnce() {
    const btn = document.getElementById('confirmUploadInventoryItem');
    if (!btn) return;
    if (window.__uploadSheetBound) return;
    window.__uploadSheetBound = true;

    btn.addEventListener('click', function(e) {
        e.preventDefault?.();
        showAlert('Загрузка описи из файла пока не поддерживается. Используйте кнопку "Добавить опись".', 'warning');
        const modal = document.getElementById('uploadInventoryItemModal');
        if (modal) modal.style.display = 'none';
        const op = document.getElementById('fileOperator');
        if (op) op.value = '';
        const fi = document.getElementById('inventoryFile');
        if (fi) fi.value = '';
    });
})();

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

async function updateInventoryOperatorsTableFull(inventoryId) {
    console.log(' ОБНОВЛЕНИЕ ТАБЛИЦЫ ОПИСЕЙ');
    
    const tableBody = document.querySelector('#inventory-operators-table-full tbody');
    if (!tableBody) {
        console.error(' Таблица не найдена');
        return;
    }
    
    inventoryId = inventoryId || appData.currentInventoryId;

    // ВСЕГДА загружаем актуальные данные с сервера
    await loadTerminalDataFromStorage();
    console.log(' Данные загружены с сервера');
    
    // Получаем описи для данной инвентаризации
    const operators = (appData.terminalData && inventoryId) ? (appData.terminalData[inventoryId] || []) : [];
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
        
        // ВАЖНО: порядок столбцов должен совпадать с заголовком таблицы:
        // ID | Дата | Название | ...
        row.innerHTML = `
            <td><code>${operator.id}</code></td>
            <td>${displayDate}</td>
            <td><strong>${operator.name}</strong></td>
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

// Закрытие описи (серверное). Раньше закрытие было только "в памяти", из-за чего после обновления страницы опись снова становилась открытой.
async function closeInventoryOperator(operatorId, inventoryId) {
    console.log(' ЗАКРЫТИЕ ОПИСИ (сервер):', { operatorId, inventoryId });

    const inventory = (appData.inventories || []).find(inv => inv.id == inventoryId);
    if (!inventory) {
        showAlert('Ошибка: инвентаризация не найдена', 'error');
        return;
    }

    if (inventory.isClosed) {
        showAlert('Невозможно закрыть опись. Вся инвентаризация уже закрыта!', 'error');
        return;
    }

    const operators = (appData.terminalData && appData.terminalData[inventoryId]) ? appData.terminalData[inventoryId] : [];
    const operator = operators.find(op => op.id === operatorId);
    if (!operator) {
        showAlert('Ошибка: опись не найдена', 'error');
        return;
    }

    if ((!operator.items || operator.items.length === 0) && !confirm('В этой описи нет товаров. Всё равно закрыть?')) {
        return;
    }

    if (!confirm(`Закрыть опись "${operator.name}"?\n\nПосле закрытия редактирование описи будет невозможно.`)) {
        return;
    }

    try {
        // Закрываем опись в БД
        await DataManager.closeSheet(operatorId);

        // Перетягиваем актуальные данные (статус/итоги)
        await loadTerminalDataFromStorage();

        // Обновляем таблицу
        updateInventoryOperatorsTableFull(inventoryId);

        showAlert(`Опись "${operator.name}" успешно закрыта`, 'success');

        // Проверяем, можно ли закрыть всю инвентаризацию
        checkInventoryClosureStatus(inventoryId);
    } catch (e) {
        console.error('❌ Ошибка закрытия описи:', e);
        showAlert(e.message || 'Не удалось закрыть опись. Проверьте сервер и базу.', 'error');
    }
}

// Функция проверки статуса закрытия всей инвентаризации
async function checkInventoryClosureStatus(inventoryId) {
    console.log(' ПРОВЕРКА СТАТУСА ЗАКРЫТИЯ ИНВЕНТАРИЗАЦИИ');
    
    // Загружаем актуальные данные
    try { await loadTerminalDataFromStorage(); } catch (e) {}
    
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

// Удаление описи (серверное). Раньше удаление происходило только в интерфейсе, поэтому после добавления/обновления описи "возвращались".
async function deleteInventoryItem(itemId, inventoryId) {
    const sheetId = Number(itemId);
    const invId = Number(inventoryId);

    if (!sheetId || !invId) {
        showAlert('Ошибка: не указаны идентификаторы', 'error');
        return;
    }

    const inventory = (appData.inventories || []).find(inv => Number(inv.id) === invId);
    if (inventory && inventory.isClosed) {
        showAlert('Нельзя удалить опись. Инвентаризация уже закрыта.', 'error');
        return;
    }

    try {
        // Удаляем опись и её товары в БД
        await DataManager.deleteSheet(sheetId);

        // Перезагружаем актуальные данные и обновляем UI
        await loadTerminalDataFromStorage();
        updateInventoryOperatorsTableFull(invId);

        showAlert('Опись успешно удалена', 'success');
    } catch (e) {
        console.error('❌ Ошибка удаления описи:', e);
        showAlert(e.message || 'Не удалось удалить опись. Проверьте сервер и базу.', 'error');
    }
}

// (cleanup) Удален лишний закрывающий фрагмент обработчика, который ломал синтаксис.

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
    
    // Навешиваем/обновляем обработчики кнопок модального окна
    if (typeof initPrintModalEvents === 'function') {
        initPrintModalEvents();
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
            
            const invEl = document.getElementById('printInventoryId');
            const inventoryId = (invEl?.dataset?.inventoryId)
                ? String(invEl.dataset.inventoryId)
                : (invEl?.value ? String(invEl.value).replace('Инвентаризация #', '') : '');
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

// Завершение инвентаризации (серверная логика)
// ВАЖНО: по требованию пользователя итоговый результат (difference) = сумма описи (фактическая сумма по товарам).
async function completeInventory(inventoryId) {
    console.log('🔒 ПОПЫТКА ЗАКРЫТИЯ ИНВЕНТАРИЗАЦИИ:', inventoryId);

    const invId = Number(inventoryId);
    const invIndex = (appData.inventories || []).findIndex(inv => Number(inv.id) === invId);
    if (invIndex < 0) {
        showAlert('Ошибка: инвентаризация не найдена', 'error');
        return;
    }

    // Всегда тянем актуальные данные с сервера
    try { await loadTerminalDataFromStorage(); } catch (e) { console.warn('loadTerminalDataFromStorage failed', e); }

    // Обновим саму инвентаризацию с сервера (чтобы не было ложного "закрыта")
    try {
        const full = await DataManager.getInventoryFull(invId);
        if (full && full.inventory) {
            appData.inventories[invIndex] = { ...appData.inventories[invIndex], ...full.inventory };
        }
    } catch (e) {
        console.warn('Не удалось обновить инвентаризацию с сервера', e);
    }

    const inventory = appData.inventories[invIndex];

    if (inventory.isClosed) {
        showAlert(`Инвентаризация #${invId} уже закрыта. Разница: ${formatNumber(Number(inventory.difference) || 0)} ₽`, 'info');
        return;
    }

    const operators = (typeof getInventoryOperatorLists === 'function')
        ? getInventoryOperatorLists(invId)
        : (appData.terminalData && Array.isArray(appData.terminalData[invId]) ? appData.terminalData[invId] : []);

    const unclosed = (operators || []).filter(op => !(op.closed || op.isClosed));

    if (unclosed.length > 0) {
        const message = `Нельзя закрыть инвентаризацию #${invId}, есть ${unclosed.length} незакрытых описей.\n\n` +
            unclosed.map((op, i) => `${i + 1}. "${op.name || op.operatorName || 'Опись'}" (ID: ${op.id})`).join('\n') +
            `\n\nНажмите OK, чтобы закрыть их автоматически и продолжить.\nНажмите Отмена, чтобы отменить.`;

        if (!confirm(message)) {
            showAlert('Закрытие инвентаризации отменено', 'warning');
            return;
        }
    }

    await proceedWithInventoryCompletion(inventory, operators);
}

// Функция закрытия инвентаризации на сервере
async function proceedWithInventoryCompletion(inventory, operators) {
    const invId = Number(inventory.id);

    // Считаем сумму по товарам для отображения в подтверждении
    let totalItems = 0;
    let totalAmount = 0;

    if (Array.isArray(operators)) {
        for (const op of operators) {
            const items = Array.isArray(op.items) ? op.items : [];
            for (const it of items) {
                totalItems += 1;
                const q = Number(it.quantity) || 0;
                const p = Number(it.price) || 0;
                totalAmount += (q * p);
            }
        }
    }

    totalAmount = Math.round(totalAmount * 100) / 100;

    // Требование: итоговый результат = сумма описи
    const calculatedDifference = totalAmount;

    const confirmationMessage = `Подтверждение закрытия инвентаризации #${invId}\n\n` +
        `Тип: ${getInventoryTypeName(inventory.type) || inventory.type}\n` +
        `Название: ${inventory.reason || ''}\n` +
        `Дата: ${inventory.date || ''}\n\n` +
        `Итоги:\n` +
        `• Описей: ${(operators || []).length}\n` +
        `• Товаров: ${totalItems}\n` +
        `• Сумма: ${formatNumber(totalAmount)} ₽\n` +
        `• РЕЗУЛЬТАТ: ${formatNumber(calculatedDifference)} ₽\n\n` +
        `Закрыть инвентаризацию?`;

    if (!confirm(confirmationMessage)) {
        showAlert('Закрытие инвентаризации отменено', 'warning');
        return;
    }

    try {
        // Закрываем на сервере (сервер сам закрывает все описи и пересчитывает суммы)
        const updated = await DataManager.closeInventory(invId, { closeSheets: true });

        // Обновляем локальное состояние по ответу сервера
        const idx = (appData.inventories || []).findIndex(x => Number(x.id) === invId);
        if (idx >= 0 && updated) {
            appData.inventories[idx] = { ...appData.inventories[idx], ...updated };
        }

        // Перетягиваем актуальные описи/товары (на случай изменений статусов)
        try { await loadTerminalDataFromStorage(); } catch (e) {}

        // Обновляем дашборд
        if (typeof loadDashboard === 'function') {
            await loadDashboard();
        } else {
            // fallback
            if (appData.currentShop && appData.currentShop.id) {
                appData.inventories = await DataManager.getInventoriesByShop(appData.currentShop.id);
            }
        }

        const diff = (updated && typeof updated.difference !== 'undefined') ? Number(updated.difference) : calculatedDifference;
        showAlert(`✅ Инвентаризация #${invId} успешно закрыта! Результат: ${formatNumber(diff || 0)} ₽`, 'success');

    } catch (e) {
        console.error('❌ Ошибка закрытия инвентаризации:', e);
        showAlert(e.message || 'Не удалось закрыть инвентаризацию. Проверьте сервер и базу.', 'error');
    }
}

// Вспомогательные функции
// В проекте есть utils.js, но этот файл исторически определял эти функции и мог переопределять глобальные.
// Делаем реализации безопасными, чтобы не ломать другие экраны, которые передают строки/таймстампы.
function generateId() {
    // 9 цифр (как в utils.js) — меньше сюрпризов, чем base36
    return Math.floor(100000000 + Math.random() * 900000000).toString();
}

function formatDate(input) {
    if (!input) return '';

    // Если уже DD/MM/YYYY — возвращаем как есть
    if (typeof input === 'string' && input.includes('/')) return input;

    const date = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
}



function saveHistoryToStorage() {
    try {
        // History persistence is server-side in OSP build (no localStorage).
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
        async function deleteInventory(inventoryId) {
            if (!confirm('Вы уверены, что хотите удалить эту инвентаризацию?')) return;

            try {
                await DataManager.deleteInventory(inventoryId);
                appData.inventories = appData.inventories.filter(inv => inv.id !== inventoryId);
                await loadDashboard();
                showAlert(`Инвентаризация #${inventoryId} удалена`, 'success');
            } catch (e) {
                console.error(e);
                showAlert(e.message || 'Не удалось удалить инвентаризацию', 'error');
            }
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
