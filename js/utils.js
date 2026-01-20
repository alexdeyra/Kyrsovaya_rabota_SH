// Общие утилиты проекта (глобальные функции)
// Важно: сайт подключает скрипты обычными <script>, поэтому функции здесь доступны через window.

/**
 * Форматирование числа с разделителями тысяч (RU), по умолчанию 2 знака после запятой.
 * Безопасно обрабатывает null/undefined/NaN.
 */
function formatNumber(value, fractionDigits = 2) {
  const num = Number(value);
  if (!Number.isFinite(num)) return '0,00';

  const digits = Number.isFinite(Number(fractionDigits)) ? Number(fractionDigits) : 2;
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(num);
}

/**
 * Форматирование даты в DD/MM/YYYY.
 * Принимает Date, строку (ISO или DD/MM/YYYY) или число (timestamp).
 */
function formatDate(input) {
  if (!input) return '';

  // Если уже DD/MM/YYYY или похожий формат со слешами — возвращаем как есть
  if (typeof input === 'string' && input.includes('/')) return input;

  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
}

// Нормализация ID (инвентаризаций/описей):
// - строка/число -> строковый id
// - также возвращаем "цифровой" id (если есть)
function normalizeId(id) {
  const str = (id === null || id === undefined) ? '' : String(id);
  const num = parseInt(str.replace(/\D/g, ''), 10);
  return {
    str,
    num: Number.isFinite(num) ? num : null
  };
}

// Получить все описи (operator-листы) для конкретной инвентаризации,
// даже если terminalData был сохранён под «не тем» ключом.
function getInventoryOperatorLists(inventoryId) {
  const { str: idStr, num: idNum } = normalizeId(inventoryId);
  const td = (window.appData && window.appData.terminalData) ? window.appData.terminalData : {};

  // 1) Быстрые варианты: по прямому ключу
  const direct = td[inventoryId] || td[idStr] || (idNum !== null ? td[idNum] : null);
  let lists = Array.isArray(direct) ? direct : [];

  // 2) Если по ключу не нашли — сканируем все значения terminalData
  if (!lists.length) {
    const values = Object.values(td);
    const out = [];
    for (const val of values) {
      if (!Array.isArray(val)) continue;
      for (const entry of val) {
        if (!entry || typeof entry !== 'object') continue;
        // Признаки «описи»: есть inventoryId и массив items/products
        const invId = entry.inventoryId ?? entry.inventoryID ?? entry.inventory ?? entry.invId;
        const hasItemsField = Array.isArray(entry.items) || Array.isArray(entry.products) || Array.isArray(entry.inventoryItems);
        if (!invId || !hasItemsField) continue;

        const { str: eStr, num: eNum } = normalizeId(invId);
        const match = (eStr && idStr && eStr === idStr) || (idNum !== null && eNum !== null && eNum === idNum);
        if (match) out.push(entry);
      }
    }
    lists = out;
  }

  return lists;
}

/**
 * Создать <td> с текстом.
 */
function createCell(text) {
  const cell = document.createElement('td');
  cell.textContent = text ?? '';
  return cell;
}

/**
 * Генерация ID (9 цифр), как в исходной логике.
 */
function generateId() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}
