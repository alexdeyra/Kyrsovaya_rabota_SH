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
        saveProfileToStorage(appData.currentUser);
        
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
async function saveProfileToStorage(profileData) {
    try {
        await DataManager.saveProfile(profileData || appData.currentUser);
        console.log('Профиль сохранен на сервере');
    } catch (e) {
        console.error('Ошибка сохранения профиля на сервере:', e);
    }
}

// Функция валидации email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


// Открытие модалки смены пароля. Сама смена пароля реализована в js/handlers/password.js (через DataManager).
function showChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (!modal) {
        if (typeof showAlert === 'function') {
            showAlert('Ошибка: модальное окно смены пароля не найдено', 'error');
        }
        return;
    }

    const currentPasswordInput = document.getElementById('currentPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmNewPasswordInput = document.getElementById('confirmNewPassword');
    const passwordError = document.getElementById('passwordError');

    if (currentPasswordInput) currentPasswordInput.value = '';
    if (newPasswordInput) newPasswordInput.value = '';
    if (confirmNewPasswordInput) confirmNewPasswordInput.value = '';
    if (passwordError) {
        passwordError.innerHTML = '';
        passwordError.style.display = 'none';
        passwordError.className = 'password-error';
    }

    modal.style.display = 'flex';
}

        // Инициализация переключения темы
