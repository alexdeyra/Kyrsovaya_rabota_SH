// Страница настроек: связывает профиль и смену пароля.
// Важно: этот модуль НЕ дублирует обработчики модалки пароля — этим занимается initChangePassword().

(function () {
  function initSettingsPage() {
    // Профиль
    if (typeof window.initProfileManagement === 'function') {
      window.initProfileManagement();
    }

    // Смена пароля
    if (typeof window.initChangePassword === 'function') {
      window.initChangePassword();
    }
  }

  // Экспортируем в глобальную область, т.к. проект использует safeCall('...')
  window.initSettingsPage = initSettingsPage;
})();
