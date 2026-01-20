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


