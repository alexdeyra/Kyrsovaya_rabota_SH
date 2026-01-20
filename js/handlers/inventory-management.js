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
    
    confirmCreateInventory && confirmCreateInventory.addEventListener('click', async () => {
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
            // Создаем новую инвентаризацию на сервере
            try {
                const newInventory = await DataManager.createInventory({
                    shopId: appData.currentShop.id,
                    type: type,
                    date: formatDate(date),
                    reason: reason
                });

                // Нормализация для UI
                const inv = {
                    ...newInventory,
                    shopId: appData.currentShop.id,
                    status: newInventory.status || 'active'
                };

                appData.inventories.push(inv);
                document.getElementById('createInventoryModal').style.display = 'none';
                await loadDashboard();
                showAlert(`Инвентаризация "${reason}" успешно создана`, 'success');
            } catch (error) {
                console.error('❌ Ошибка создания инвентаризации:', error);

                let msg = (error && error.message) ? error.message : 'Не удалось создать инвентаризацию';
                if (msg === 'NOT_AUTHENTICATED') msg = 'Сессия истекла. Войдите заново.';
                if (msg === 'VALIDATION') msg = 'Проверьте обязательные поля (тип/дата/причина).';
                if (msg === 'SHOP_NOT_FOUND') msg = 'Магазин не найден в базе. Проверьте таблицу shops.';

                showAlert(msg, 'error');

                // Если сессия потеряна — возвращаем на логин
                if (msg.includes('Сессия') && typeof window.logout === 'function') {
                    try { await window.logout(); } catch (e) {}
                }
            }
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
    
    // Загрузка описи из файла в серверной версии отключена (раньше тут были демо-рандомы).
    // Ставим обработчик только один раз на весь сайт.
    const uploadBtn = document.getElementById('confirmUploadInventoryItem');
    if (uploadBtn && !window.__uploadSheetBound) {
        window.__uploadSheetBound = true;
        uploadBtn.addEventListener('click', function(e) {
            e.preventDefault?.();
            showAlert('Загрузка описи из файла пока не поддерживается. Используйте кнопку "Добавить опись".', 'warning');
            const modal = document.getElementById('uploadInventoryItemModal');
            if (modal) modal.style.display = 'none';
            const op = document.getElementById('fileOperator');
            if (op) op.value = '';
            const fi = document.getElementById('inventoryFile');
            if (fi) fi.value = '';
        });
    }
}

// Добавляем вспомогательную функцию сохранения инвентаризации (если её нет)
async function saveInventoryToStorage(inventoryId) {
    try {
        const inventory = (appData.inventories || []).find(inv => inv.id == inventoryId);
        if (inventory) {
            await DataManager.updateInventory(inventoryId, {
                date: inventory.date,
                reason: inventory.reason,
                lines: inventory.lines || 0,
                amount: inventory.amount || 0,
                difference: inventory.difference || 0,
                status: inventory.status || (inventory.isClosed ? "completed" : "active"),
                isClosed: !!inventory.isClosed
            });
            console.log("✅ Инвентаризация сохранена на сервере:", inventoryId);
            return true;
        }
    } catch (error) {
        console.error("❌ Ошибка сохранения инвентаризации на сервере:", error);
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
