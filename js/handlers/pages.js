        function initSettings() {
            // В демо-версии просто показываем уведомление при переходе
        }

// Утилита: создать ячейку таблицы
function createCell(text) {
    const td = document.createElement('td');
    td.textContent = (text === undefined || text === null) ? '' : String(text);
    return td;
}


        // Инициализация страницы магазинов
        function initShopsPage() {
            document.getElementById('searchShopBtnMain')?.addEventListener('click', searchShopsMain);
            document.getElementById('sortByDateBtn')?.addEventListener('click', sortShopsByDate);
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
    // Обработчик изменения аватара (сохранение на сервере, не base64)
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    const avatarUpload = document.getElementById('avatarUpload');
    const removeAvatarBtn = document.getElementById('removeAvatarBtn');
    const avatarPreview = document.getElementById('avatarPreview');

    // Защита от двойной привязки обработчиков
    if (avatarUpload && avatarUpload.dataset && avatarUpload.dataset.kirBound === '1') {
        return;
    }
    if (avatarUpload && avatarUpload.dataset) avatarUpload.dataset.kirBound = '1';

    const openPicker = () => {
        if (avatarUpload) avatarUpload.click();
    };

    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', openPicker);
    }
    if (avatarPreview) {
        avatarPreview.addEventListener('click', openPicker);
    }

    if (avatarUpload) {
        avatarUpload.addEventListener('change', async function (e) {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            if (file.size > 5 * 1024 * 1024) { // 5MB лимит
                showAlert('Файл слишком большой. Максимальный размер 5MB', 'warning');
                e.target.value = '';
                return;
            }

            if (!file.type || !file.type.startsWith('image/')) {
                showAlert('Пожалуйста, выберите изображение', 'warning');
                e.target.value = '';
                return;
            }

            try {
                // загрузка на сервер
                const url = await DataManager.uploadAvatar(file);
                appData.currentUser.avatar = url;

                if (typeof updateAvatarDisplay === 'function') updateAvatarDisplay();
                if (typeof updateAvatarPreview === 'function') updateAvatarPreview();

                if (removeAvatarBtn) {
                    removeAvatarBtn.style.display = 'inline-block';
                }

                // сохраняем профиль (на случай, если где-то обновляются другие поля)
                try { await saveProfileToStorage(); } catch (e2) {}

                showAlert('Аватар успешно обновлен', 'success');
            } catch (err) {
                console.error('Ошибка загрузки аватара:', err);
                showAlert(err?.message || 'Не удалось загрузить аватар', 'error');
                e.target.value = '';
            }
        });
    }

    if (removeAvatarBtn) {
        removeAvatarBtn.addEventListener('click', async function () {
            try {
                await DataManager.deleteAvatar();
                appData.currentUser.avatar = null;

                if (avatarUpload) avatarUpload.value = '';

                if (typeof updateAvatarDisplay === 'function') updateAvatarDisplay();
                if (typeof updateAvatarPreview === 'function') updateAvatarPreview();

                removeAvatarBtn.style.display = 'none';
                try { await saveProfileToStorage(); } catch (e2) {}

                showAlert('Аватар удален', 'success');
            } catch (err) {
                console.error('Ошибка удаления аватара:', err);
                showAlert(err?.message || 'Не удалось удалить аватар', 'error');
            }
        });

        // первичное состояние кнопки
        removeAvatarBtn.style.display = appData.currentUser.avatar ? 'inline-block' : 'none';
    }
}

// Загрузка профиля из localStorage
async function loadProfileFromStorage() {
    try {
        const profile = await DataManager.getProfile();
        if (profile) {
            appData.currentUser = { ...appData.currentUser, ...profile };
            updateProfileDisplay();
        }
    } catch (error) {
        console.error('Ошибка загрузки профиля с сервера:', error);
    }
}

// Сохранение профиля в localStorage
async function saveProfileToStorage() {
    try {
        await DataManager.saveProfile(appData.currentUser);
    } catch (error) {
        console.error('Ошибка сохранения профиля на сервере:', error);
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
async function saveInventoriesToFile() {
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
    await loadTerminalDataFromStorage();
    
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
    // Сохраняем профиль на сервере
    saveProfileToStorage();
}

// Загрузка профиля из localStorage
async function loadProfileFromStorage() {
    try {
        const profile = await DataManager.getProfile();
        if (profile) {
            appData.currentUser = { ...appData.currentUser, ...profile };
            updateProfileDisplay();
        }
    } catch (error) {
        console.error('Ошибка загрузки профиля с сервера:', error);
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
