// data-manager.js (OSP / Server Storage)
// В этой версии проекта НЕТ localStorage. Данные живут в MySQL через PHP API.

// Требование: этот файл должен грузиться после js/api-client.js

const DataManager = {
  async me() {
    return API.get('me.php');
  },
  async login(username, password) {
    return API.post('auth_login.php', { username, password });
  },
  async logout() {
    return API.post('auth_logout.php', {});
  },

  async getShops() {
    const r = await API.get('shops.php');
    return r.shops || [];
  },

  async getInventoriesByShop(shopId) {
    const r = await API.get('inventories.php?shop_id=' + encodeURIComponent(shopId));
    return (r.inventories || []).map(inv => ({ ...inv, shopId }));
  },

  async createInventory({ shopId, type, date, reason }) {
    const r = await API.post('inventories.php', { shopId, type, date, reason });
    return r.inventory;
  },

  async getInventoryFull(inventoryId) {
    const r = await API.get('inventory.php?id=' + encodeURIComponent(inventoryId));
    return r;
  },

  async updateInventory(inventoryId, patch) {
    const r = await API.post('inventory.php?id=' + encodeURIComponent(inventoryId), { action: 'update', ...patch });
    return r;
  },

  async closeInventory(inventoryId, { closeSheets = true } = {}) {
    const r = await API.post('inventory.php?id=' + encodeURIComponent(inventoryId), { action: 'close', closeSheets: !!closeSheets });
    return r.inventory || r;
  },

  async createSheet(inventoryId, name, date) {
    const r = await API.post('sheets.php', { inventoryId, name, date });
    return r.sheet;
  },

  async closeSheet(sheetId) {
    return API.post('sheet.php', { action: 'close', id: sheetId });
  },

  async deleteSheet(sheetId) {
    return API.post('sheet.php', { action: 'delete', id: sheetId });
  },

  async addItem(sheetId, barcode, quantity) {
    const r = await API.post('items.php', { sheetId, barcode, quantity });
    return r;
  },

  async updateItem(id, { barcode, quantity }) {
    return API.post('item.php', { action: 'update', id, barcode, quantity });
  },

  async deleteItem(id) {
    return API.post('item.php', { action: 'delete', id });
  },

  async findProduct(barcode, inventoryType) {
    const r = await API.get('products.php?barcode=' + encodeURIComponent(barcode) + '&inventoryType=' + encodeURIComponent(inventoryType || 'general'));
    return r;
  },

  async getProfile() {
    const r = await API.get('profile.php');
    return r.profile;
  },

  async saveProfile(profile) {
    // Сохраняем только поддерживаемые поля профиля
    const payload = {
      name: profile?.name ?? '',
      phone: profile?.phone ?? '',
      email: profile?.email ?? '',
      avatar: profile?.avatar ?? null,
    };
    return API.post('profile.php', payload);
  },

  async uploadAvatar(file) {
    const fd = new FormData();
    fd.append('avatar', file);

    const res = await fetch('api/avatar_upload.php', {
      method: 'POST',
      body: fd,
      credentials: 'include',
      cache: 'no-store'
    });

    let data = null;
    try { data = await res.json(); } catch (e) { throw new Error('Некорректный ответ сервера'); }

    if (!res.ok || !data || data.ok === false) {
      const msg = (data && (data.message || data.error)) ? (data.message || data.error) : 'Ошибка загрузки аватара';
      throw new Error(msg);
    }

    return data.avatar || null;
  },

  async deleteAvatar() {
    const res = await fetch('api/avatar_delete.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({}),
      credentials: 'include',
      cache: 'no-store'
    });

    let data = null;
    try { data = await res.json(); } catch (e) { throw new Error('Некорректный ответ сервера'); }

    if (!res.ok || !data || data.ok === false) {
      const msg = (data && (data.message || data.error)) ? (data.message || data.error) : 'Ошибка удаления аватара';
      throw new Error(msg);
    }

    return true;
  },

  async getTheme() {
    const r = await API.get('theme.php');
    return r.theme || 'light';
  },

  async setTheme(theme) {
    return API.post('theme.php', { theme });
  },

  async getDocumentsByShop(shopId, { start = '', end = '' } = {}) {
    const qs = new URLSearchParams();
    qs.set('shop_id', shopId);
    if (start) qs.set('start', start);
    if (end) qs.set('end', end);
    const r = await API.get('documents.php?' + qs.toString());
    return r.documents || [];
  },

  async getHistoryByShop(shopId) {
    const r = await API.get('history.php?shop_id=' + encodeURIComponent(shopId));
    return r.history || [];
  },

  async changePassword(currentPassword, newPassword) {
    return API.post('password.php', { currentPassword, newPassword });
  },

  async deleteInventory(inventoryId) {
    return API.post('inventory.php?id=' + encodeURIComponent(inventoryId), { action: 'delete', id: inventoryId });
  },

  downloadReconciliationExcel(inventoryId, mode = 'full') {
    API.download('documents/reconciliation.php?inventory_id=' + encodeURIComponent(inventoryId) + '&mode=' + encodeURIComponent(mode) + '&format=csv');
  }
};

// ===== Совместимость со старым кодом (часть обработчиков вызывает эти функции напрямую) =====

async function loadTerminalDataFromStorage() {
  // Если инвентаризация выбрана — подтягиваем описи/товары с сервера
  try {
    const invId = appData.currentInventoryId;
    if (!invId) return;
    const r = await DataManager.getInventoryFull(invId);
    // terminalData хранится как массив описей (sheets) по id инвентаризации
    appData.terminalData = appData.terminalData || {};
    const mappedSheets = (r.sheets || []).map(s => ({
      id: s.id,
      inventoryId: invId,
      terminalId: s.id, // для совместимости интерфейса (терминал)
      operatorName: s.name,
      operator: s.name,
      name: s.name,
      date: s.date,
      // Если опись пустая, значения должны быть 0 (без демо-рандомов)
      lines: Number(s.lines) || 0,
      quantity: Number(s.quantity) || 0,
      status: s.status,
      isClosed: !!s.closed,
      closed: !!s.closed,
      items: (s.items || []).map(it => ({
        id: it.id,
        barcode: it.barcode,
        name: it.name,
        price: it.price,
        category: it.category,
        type: it.type,
        quantity: it.quantity,
        totalPrice: it.totalPrice,
        addedDate: it.addedDate,
      }))
    }));

    // terminalData хранит описи по id инвентаризации
    appData.terminalData[invId] = mappedSheets;

    // В некоторых частях интерфейса (full-screen просмотр) используются inventory.items.
    // Чтобы данные не "возвращались" и не жили только в памяти, держим их синхронизированными.
    const invList = appData.inventories || [];
    const invPos = invList.findIndex(x => String(x.id) === String(invId));
    if (invPos >= 0) {
      invList[invPos].items = mappedSheets;
    }

    // Обновляем данные инвентаризации в appData.inventories
    const inv = r.inventory;
    const idx = (appData.inventories || []).findIndex(x => x.id == inv.id);
    if (idx >= 0) {
      appData.inventories[idx] = { ...appData.inventories[idx], ...inv };
    }
  } catch (e) {
    console.warn('loadTerminalDataFromStorage:', e);
  }
}

function saveTerminalDataToStorage() {
  // Больше не используется (серверное хранение). Оставлено, чтобы старый код не падал.
}

function loadInventoryData() {
  // Не используем localStorage. Состояние живёт в appData.
}

function saveInventoryData() {
  // Не используем localStorage.
}

async function loadProfileFromStorage() {
  try {
    const p = await DataManager.getProfile();
    if (!p) return;
    appData.currentUser = {
      ...appData.currentUser,
      name: p.name || appData.currentUser.name,
      phone: p.phone || '',
      email: p.email || '',
      avatar: p.avatar || null,
      role: p.role || appData.currentUser.role,
      login: p.login || appData.currentUser.login,
    };
  } catch (e) {
    console.warn('loadProfileFromStorage:', e);
  }
}

async function saveProfileToStorage(profileData) {
  try {
    await DataManager.saveProfile(profileData);
  } catch (e) {
    console.warn('saveProfileToStorage:', e);
  }
}

async function loadThemeFromStorage() {
  try {
    const theme = await DataManager.getTheme();
    if (typeof applyTheme === 'function') applyTheme(theme);
  } catch (e) {
    console.warn('loadThemeFromStorage:', e);
  }
}

async function saveThemeToStorage(theme) {
  try {
    await DataManager.setTheme(theme);
  } catch (e) {
    console.warn('saveThemeToStorage:', e);
  }
}
