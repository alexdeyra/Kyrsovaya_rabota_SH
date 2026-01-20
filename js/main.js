// ЕДИНСТВЕННАЯ точка входа. Здесь нет логики страниц — только безопасный вызов init-функций.

function safeCall(fnName) {
  try {
    const fn = window[fnName];
    if (typeof fn === 'function') {
      fn();
    } else {
      console.warn(`⚠️ init не найден: ${fnName}`);
    }
  } catch (e) {
    console.error(`❌ Ошибка в ${fnName}:`, e);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Основные экраны/навигация
  safeCall('initLogin');
  safeCall('initShopSelection');
  safeCall('initUserMenu');
  safeCall('initNavigation');
  safeCall('initSidebarMenu');
  safeCall('initDashboard');

  // Модальные окна и страницы
  safeCall('initModals');
  safeCall('initReportModals');
  safeCall('initPrintForAccountant');
  safeCall('initPrintModalEvents');
  safeCall('initInventoryManagement');
  safeCall('initDocumentChecking');
  safeCall('initHistorySearch');
  safeCall('initSettings');
  safeCall('initShopsPage');
  safeCall('initReportsPage');
  safeCall('initSettingsPage');
  safeCall('initChangePassword');

  // UI/качество жизни
  safeCall('initThemeToggle');
  safeCall('initFullScreenModals');
  safeCall('initPhoneMask');

  // Управление товарами/описями
  safeCall('initItemManagement');
  safeCall('initItemInputValidation');
  safeCall('initEditItemFunctionality');
  safeCall('initEditItemHandlers');
  safeCall('initAddItemValidation');
  safeCall('initBarcodeValidation');
  safeCall('initQuantityValidation');

  // Валидация полей дат/операций (если есть)
  safeCall('setupDateInputValidation');

  // Данные из хранилища
  safeCall('loadTerminalDataFromStorage');
  safeCall('loadInventoryData');
  safeCall('loadProfileFromStorage');

  console.log('✅ Приложение инициализировано (main.js)');
});
