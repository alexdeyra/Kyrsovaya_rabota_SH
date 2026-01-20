        function initReportModals() {
		
		// Добавьте этот код в initReportModals() или в общую функцию инициализации модальных окон
window.addEventListener('click', function(event) {
    const modal = document.getElementById('exportCashModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        // Сбрасываем состояние при закрытии
        document.getElementById('confirmExportCash').disabled = false;
        document.getElementById('cancelExportCash').disabled = false;
        document.getElementById('cashLoading').style.display = 'none';
        document.getElementById('cashResult').style.display = 'none';
        document.getElementById('cashProgressBar').style.width = '0%';
    }
});
		
            // Инициализация модального окна выгрузки данных по кассам
document.getElementById('exportCashBtn').addEventListener('click', function() {
    document.getElementById('exportCashModal').style.display = 'flex';
    // Установка текущей даты по умолчанию
    const today = new Date();
    document.getElementById('cashDate').valueAsDate = today;
    
    // Скрываем блоки результата и загрузки
    document.getElementById('cashResult').style.display = 'none';
    document.getElementById('cashLoading').style.display = 'none';
    
    // Сбрасываем прогресс бар
    document.getElementById('cashProgressBar').style.width = '0%';
});

document.getElementById('cancelExportCash').addEventListener('click', function() {
    document.getElementById('exportCashModal').style.display = 'none';
});

document.getElementById('confirmExportCash').addEventListener('click', function() {
    const date = document.getElementById('cashDate').value;
    const format = document.getElementById('cashFormat').value;
    
    if (!date) {
        showAlert('Выберите дату выгрузки', 'warning');
        return;
    }
    
    // Скрываем кнопку "Выгрузить" и показываем индикатор загрузки
    document.getElementById('confirmExportCash').disabled = true;
    document.getElementById('cancelExportCash').disabled = true;
    document.getElementById('cashLoading').style.display = 'block';
    
    // Генерируем случайную сумму от 200,000 до 1,000,000
    const randomAmount = Math.floor(Math.random() * 800001) + 200000; // 200,000 - 1,000,000
    
    // Форматируем сумму
    const formattedAmount = formatNumber(randomAmount);
    
    // Получаем название формата
    const formatNames = {
        'screen': 'Вывод на экран',
        'print': 'На печать',
        'wordpad': 'Выгрузка в WordPad',
        'excel': 'Выгрузка в Excel'
    };
    const formatName = formatNames[format] || format;
    
    // Имитируем загрузку в течение 15 секунд
    let progress = 0;
    const progressBar = document.getElementById('cashProgressBar');
    const progressInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // Скрываем индикатор загрузки
            document.getElementById('cashLoading').style.display = 'none';
            
            // Показываем результат
            const resultContent = document.getElementById('cashResultContent');
            resultContent.innerHTML = `
                <p><strong>Дата выгрузки:</strong> ${formatInputDate(date)}</p>
                <p><strong>Формат:</strong> ${formatName}</p>
                <p><strong>Общая сумма по кассам:</strong> <span style="font-weight: bold; color: #2ecc71;">${formattedAmount} ₽</span></p>
                <div style="margin-top: 15px; padding: 10px; background-color: #e8f5e8; border-radius: 3px;">
                    <p style="margin: 0; color: #27ae60;"><i class="fas fa-check-circle"></i> Выгрузка успешно завершена</p>
                </div>
            `;
            
            document.getElementById('cashResult').style.display = 'block';
            
            // Восстанавливаем кнопки
            document.getElementById('confirmExportCash').disabled = false;
            document.getElementById('cancelExportCash').disabled = false;
            
            // В зависимости от формата выполняем соответствующее действие
            switch(format) {
                case 'screen':
                    // Уже показано на экране
                    break;
                    
                case 'print':
                    // Печать данных
                    printCashData(date, randomAmount);
                    break;
                    
                case 'wordpad':
                    // Выгрузка в WordPad
                    exportToWordPad(date, randomAmount);
                    break;
                    
                case 'excel':
                    // Выгрузка в Excel
                    exportToExcel(date, randomAmount);
                    break;
            }
            
            // Показываем уведомление об успешной выгрузке
            showAlert(`Выгрузка данных по кассам на ${formatInputDate(date)} завершена. Сумма: ${formattedAmount} ₽`, 'success');
        }
    }, 150); // 100% за 15 секунд (150ms × 100 = 15000ms = 15 секунд)
});


// Функция для проверки, подходит ли товар для данного типа инвентаризации
function validateProductForInventory(productType, inventoryType) {
    console.log(`🔍 Проверка: товар типа "${productType}" для инвентаризации "${inventoryType}"`);
    
    // Сопоставление типов
    const inventoryAllowedTypes = {
        'general': ['general', 'alcohol', 'beer', 'cigarettes'], // Общая инвентаризация принимает все
        'alcohol': ['alcohol'], // Только алкоголь
        'beer': ['beer'], // Только пиво
        'cigarettes': ['cigarettes'] // Только сигареты
    };
    
    const allowedTypes = inventoryAllowedTypes[inventoryType] || ['general'];
    const isValid = allowedTypes.includes(productType);
    
    console.log(`📋 Разрешённые типы для ${inventoryType}:`, allowedTypes);
    console.log(`✅ Результат проверки: ${isValid ? 'ПРОШЁЛ' : 'НЕ ПРОШЁЛ'}`);
    
    return isValid;
}

// Функция для получения текста ошибки
function getInventoryTypeError(productType, inventoryType) {
    const typeNames = {
        'general': 'общей инвентаризации',
        'alcohol': 'алкогольной инвентаризации',
        'beer': 'инвентаризации пива',
        'cigarettes': 'инвентаризации сигарет'
    };
    
    const productTypeNames = {
        'general': 'обычный товар',
        'alcohol': 'алкогольный товар',
        'beer': 'пиво',
        'cigarettes': 'сигареты'
    };
    
    return `Товар (${productTypeNames[productType] || productType}) не может быть добавлен в ${typeNames[inventoryType] || inventoryType}.`;
}

// Функция для печати данных
function printCashData(date, amount) {
    const formattedDate = formatInputDate(date);
    const formattedAmount = formatNumber(amount);
    
    const printContent = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Отчет по кассам</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                ...header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                ...report-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                ...report-date {
                    font-size: 16px;
                    color: #666;
                }
                ...data-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                ...data-table th, .data-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                ...data-table th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                ...total-row {
                    font-weight: bold;
                    background-color: #f8f8f8;
                }
                ...footer {
                    margin-top: 30px;
                    font-size: 12px;
                    color: #888;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="report-title">ОТЧЕТ ПО КАССАМ</div>
                <div class="report-date">Дата выгрузки: ${formattedDate}</div>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Касса</th>
                        <th>Сумма, ₽</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Основная касса</td>
                        <td>${formatNumber(amount * 0.6)}</td>
                        <td>Активна</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Резервная касса</td>
                        <td>${formatNumber(amount * 0.25)}</td>
                        <td>Активна</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Касса самообслуживания</td>
                        <td>${formatNumber(amount * 0.15)}</td>
                        <td>Активна</td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="2">Итого:</td>
                        <td>${formattedAmount}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            
            <div class="footer">
                Сформировано: ${new Date().toLocaleString('ru-RU')}<br>
                Система управления инвентаризацией - Кировский
            </div>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Даем время на загрузку содержимого
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

// Функция для выгрузки в WordPad (RTF формат с поддержкой русского)
function exportToWordPad(date, amount) {
    const formattedDate = formatInputDate(date);
    const formattedAmount = formatNumber(amount);
    
    // Создаем RTF-документ с правильной кодировкой для русского
    const rtfContent = `{\\rtf1\\ansi\\ansicpg1251\\deff0\\nouicompat\\deflang1049
{\\fonttbl{\\f0\\fnil\\fcharset204 Arial;}}
{\\colortbl;\\red0\\green0\\blue0;\\red0\\green0\\blue255;\\red0\\green128\\blue0;}
\\paperw11906\\paperh16838
\\margl1134\\margr1134\\margt1134\\margb1134
\\sectd
\\pard\\plain\\f0\\fs28\\qc\\b \\u1054\\u1058\\u1063\\u1045\\u1058 \\u1055\\u1054 \\u1050\\u1040\\u1057\\u1057\\u1040\\u1052\\par
\\pard\\plain\\f0\\fs20\\qc \\u1044\\u1072\\u1090\\u1072 \\u1074\\u1099\\u1075\\u1088\\u1091\\u1079\\u1082\\u1080\\u58 ${formattedDate}\\par
\\pard\\plain\\f0\\fs20\\qc \\par
\\trowd\\trgaph0
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx2000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx4000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx6000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx8000
\\pard\\plain\\f0\\fs18\\b\\cell \\u8470\\cell \\u1050\\u1072\\u1089\\u1089\\u1072\\cell \\u1057\\u1091\\u1084\\u1084\\u1072\\u44 \\u838\\cell \\u1057\\u1090\\u1072\\u1090\\u1091\\u1089\\row
\\trowd\\trgaph0
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx2000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx4000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx6000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx8000
\\pard\\plain\\f0\\fs18\\cell 1\\cell \\u1054\\u1089\\u1085\\u1086\\u1074\\u1085\\u1072\\u1103 \\u1082\\u1072\\u1089\\u1089\\u1072\\cell ${formatNumber(amount * 0.6)}\\cell \\u1040\\u1082\\u1090\\u1080\\u1074\\u1085\\u1072\\row
\\trowd\\trgaph0
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx2000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx4000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx6000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx8000
\\pard\\plain\\f0\\fs18\\cell 2\\cell \\u1056\\u1077\\u1079\\u1077\\u1088\\u1074\\u1085\\u1072\\u1103 \\u1082\\u1072\\u1089\\u1089\\u1072\\cell ${formatNumber(amount * 0.25)}\\cell \\u1040\\u1082\\u1090\\u1080\\u1074\\u1085\\u1072\\row
\\trowd\\trgaph0
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx2000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx4000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx6000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx8000
\\pard\\plain\\f0\\fs18\\cell 3\\cell \\u1050\\u1072\\u1089\\u1089\\u1072 \\u1089\\u1072\\u1084\\u1086\\u1086\\u1073\\u1089\\u1083\\u1091\\u1078\\u1080\\u1074\\u1072\\u1085\\u1080\\u1103\\cell ${formatNumber(amount * 0.15)}\\cell \\u1040\\u1082\\u1090\\u1080\\u1074\\u1085\\u1072\\row
\\trowd\\trgaph0
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx2000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx4000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx6000
\\clbrdrt\\brdrw10\\brdrs\\clbrdrl\\brdrw10\\brdrs\\clbrdrb\\brdrw10\\brdrs\\clbrdrr\\brdrw10\\brdrs\\cellx8000
\\pard\\plain\\f0\\fs18\\b\\cell \\cell \\u1048\\u1090\\u1086\\u1075\\u1086\\u58\\cell ${formattedAmount}\\cell \\row
\\pard\\plain\\f0\\fs16\\par
\\u1057\\u1092\\u1086\\u1088\\u1084\\u1080\\u1088\\u1086\\u1074\\u1072\\u1085\\u1086\\u58 ${new Date().toLocaleString('ru-RU')}\\par
\\u1057\\u1080\\u1089\\u1090\\u1077\\u1084\\u1072 \\u1091\\u1087\\u1088\\u1072\\u1074\\u1083\\u1077\\u1085\\u1080\\u1103 \\u1080\\u1085\\u1074\\u1077\\u1085\\u1090\\u1072\\u1080\\u1088\\u1080\\u1079\\u1072\\u1094\\u1080\\u1077\\u1081 - \\u1050\\u1080\\u1088\\u1086\\u1074\\u1089\\u1082\\u1080\\u1081\\par
}`;
    
    // Создаем Blob с RTF содержимым
    const blob = new Blob([rtfContent], { type: 'application/rtf' });
    const url = URL.createObjectURL(blob);
    
    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    a.download = `Отчет_по_кассам_${formattedDate.replace(/\//g, '-')}.rtf`;
    document.body.appendChild(a);
    a.click();
    
    // Очищаем
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Функция для выгрузки в Excel (CSV формат с поддержкой русского)
function exportToExcel(date, amount) {
    const formattedDate = formatInputDate(date);
    const formattedAmount = formatNumber(amount);
    
    // Создаем CSV содержимое с BOM для правильной кодировки UTF-8
    const csvContent = '\uFEFF' + // UTF-8 BOM
                      `Отчет по кассам\n` +
                      `Дата выгрузки: ${formattedDate}\n\n` +
                      `№;Касса;Сумма, ₽;Статус\n` +
                      `1;Основная касса;${formatNumber(amount * 0.6)};Активна\n` +
                      `2;Резервная касса;${formatNumber(amount * 0.25)};Активна\n` +
                      `3;Касса самообслуживания;${formatNumber(amount * 0.15)};Активна\n` +
                      `;Итого:;${formattedAmount};\n\n` +
                      `Сформировано: ${new Date().toLocaleString('ru-RU')}\n` +
                      `Система управления инвентаризацией - Кировский`;
    
    // Создаем Blob с CSV содержимым и правильной кодировкой
    const blob = new Blob([csvContent], { 
        type: 'text/csv;charset=utf-8;' 
    });
    const url = URL.createObjectURL(blob);
    
    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    a.download = `Отчет_по_кассам_${formattedDate.replace(/\//g, '-')}.csv`;
    document.body.appendChild(a);
    a.click();
    
    // Очищаем
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Форматирование даты из формата input[type="date"] в DD/MM/YYYY
function formatInputDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Обработчик закрытия модального окна через крестик
document.querySelector('#exportCashModal .close').addEventListener('click', function() {
    document.getElementById('exportCashModal').style.display = 'none';
    resetExportCashModal();
});

// Обработчик закрытия модального окна через кнопку "Отмена"
document.getElementById('cancelExportCash').addEventListener('click', function() {
    document.getElementById('exportCashModal').style.display = 'none';
    resetExportCashModal();
});

// Функция сброса состояния модального окна
function resetExportCashModal() {
    document.getElementById('confirmExportCash').disabled = false;
    document.getElementById('cancelExportCash').disabled = false;
    document.getElementById('cashLoading').style.display = 'none';
    document.getElementById('cashResult').style.display = 'none';
    document.getElementById('cashProgressBar').style.width = '0%';
    document.getElementById('cashResultContent').innerHTML = '';
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    const modal = document.getElementById('exportCashModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        resetExportCashModal();
    }
});
            
          // ================== ВЫГРУЗКА ВЫРУЧКИ - ИСПРАВЛЕННАЯ ВЕРСИЯ ==================

// Инициализация модального окна выгрузки данных по выручке
document.getElementById('exportRevenueBtn').addEventListener('click', function() {
    document.getElementById('exportRevenueModal').style.display = 'flex';
    
    // Установка дат по умолчанию (последние 7 дней)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);
    
    document.getElementById('revenueStartDate').valueAsDate = startDate;
    document.getElementById('revenueEndDate').valueAsDate = endDate;
    
    // Скрываем блоки результата и загрузки
    document.getElementById('revenueResult').style.display = 'none';
    document.getElementById('revenueLoading').style.display = 'none';
    
    // Сбрасываем прогресс бар
    document.getElementById('revenueProgressBar').style.width = '0%';
});

// Отмена выгрузки
document.getElementById('cancelExportRevenue').addEventListener('click', function() {
    document.getElementById('exportRevenueModal').style.display = 'none';
    resetExportRevenueModal();
});

// Основная функция выгрузки
document.getElementById('confirmExportRevenue').addEventListener('click', function() {
    const startDateStr = document.getElementById('revenueStartDate').value;
    const endDateStr = document.getElementById('revenueEndDate').value;
    const format = document.getElementById('revenueFormat').value;
    const groupBy = document.getElementById('revenueGroupBy').value;
    
    if (!startDateStr || !endDateStr) {
        showAlert('Выберите даты начала и окончания', 'warning');
        return;
    }
    
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    
    if (startDate > endDate) {
        showAlert('Дата начала не может быть позже даты окончания', 'warning');
        return;
    }
    
    // Блокируем кнопки и показываем загрузку
    document.getElementById('confirmExportRevenue').disabled = true;
    document.getElementById('cancelExportRevenue').disabled = true;
    document.getElementById('revenueLoading').style.display = 'block';
    document.getElementById('revenueResult').style.display = 'none';
    
    // Имитация загрузки
    let progress = 0;
    const progressBar = document.getElementById('revenueProgressBar');
    progressBar.style.width = '0%';
    
    const progressInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            try {
                // Генерируем данные
                const revenueData = generateRevenueDataSimple(startDate, endDate, groupBy);
                
                // Показываем результат
                showRevenueResultSimple(startDate, endDate, groupBy, revenueData, format);
                
                // Выполняем выгрузку в выбранном формате
                executeRevenueExport(format, startDate, endDate, groupBy, revenueData);
                
                // Восстанавливаем кнопки
                document.getElementById('confirmExportRevenue').disabled = false;
                document.getElementById('cancelExportRevenue').disabled = false;
                
                // Уведомление
                showAlert(`Выгрузка данных по выручке завершена`, 'success');
                
            } catch (error) {
                console.error('Ошибка:', error);
                document.getElementById('confirmExportRevenue').disabled = false;
                document.getElementById('cancelExportRevenue').disabled = false;
                document.getElementById('revenueLoading').style.display = 'none';
                showAlert('Ошибка при выгрузке', 'danger');
            }
        }
    }, 150);
});

// Простая генерация данных
function generateRevenueDataSimple(startDate, endDate, groupBy) {
    const data = [];
    let total = 0;
    
    if (groupBy === 'day') {
        let current = new Date(startDate);
        while (current <= endDate) {
            const revenue = Math.floor(Math.random() * 450000) + 50000;
            data.push({
                period: current.toLocaleDateString('ru-RU'),
                revenue: revenue
            });
            total += revenue;
            current.setDate(current.getDate() + 1);
        }
    } else if (groupBy === 'week') {
        let weekStart = new Date(startDate);
        let weekNum = 1;
        while (weekStart <= endDate) {
            const revenue = Math.floor(Math.random() * 3150000) + 350000;
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            data.push({
                period: `Неделя ${weekNum} (${weekStart.toLocaleDateString('ru-RU')} - ${weekEnd.toLocaleDateString('ru-RU')})`,
                revenue: revenue
            });
            total += revenue;
            weekStart.setDate(weekStart.getDate() + 7);
            weekNum++;
        }
    } else if (groupBy === 'month') {
        let monthStart = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        const monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
        
        while (monthStart <= endDate) {
            const revenue = Math.floor(Math.random() * 13500000) + 1500000;
            data.push({
                period: `${monthNames[monthStart.getMonth()]} ${monthStart.getFullYear()}`,
                revenue: revenue
            });
            total += revenue;
            monthStart.setMonth(monthStart.getMonth() + 1);
        }
    }
    
    return { data: data, total: total };
}

// Показать результат
function showRevenueResultSimple(startDate, endDate, groupBy, revenueData, format) {
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let html = `
        <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
        <p><strong>Период:</strong> ${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}</p>
        <p><strong>Группировка:</strong> ${groupBy === 'day' ? 'По дням' : groupBy === 'week' ? 'По неделям' : 'По месяцам'}</p>
        <p><strong>Формат:</strong> ${format === 'screen' ? 'На экран' : format === 'print' ? 'На печать' : format === 'word' ? 'В Word' : 'В Excel'}</p>
        <hr>
        <table style="width:100%; border-collapse:collapse;">
            <thead>
                <tr style="background:#f2f2f2;">
                    <th style="padding:8px; border:1px solid #ddd;">Период</th>
                    <th style="padding:8px; border:1px solid #ddd; text-align:right;">Выручка</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    revenueData.data.forEach(item => {
        html += `
            <tr>
                <td style="padding:8px; border:1px solid #ddd;">${item.period}</td>
                <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.revenue)} ₽</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
            <tfoot>
                <tr style="background:#e8f5e8; font-weight:bold;">
                    <td style="padding:8px; border:1px solid #ddd;">Итого:</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(revenueData.total)} ₽</td>
                </tr>
            </tfoot>
        </table>
        <div style="margin-top:15px; padding:10px; background:#e8f5e8; border-radius:5px;">
            <p style="margin:0; color:#27ae60;"><i class="fas fa-check-circle"></i> Выгрузка завершена</p>
        </div>
    `;
    
    document.getElementById('revenueResultContent').innerHTML = html;
    document.getElementById('revenueLoading').style.display = 'none';
    document.getElementById('revenueResult').style.display = 'block';
}

// Выполнить выгрузку в нужном формате
function executeRevenueExport(format, startDate, endDate, groupBy, revenueData) {
    if (format === 'screen') return; // Уже показано
    
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    if (format === 'print') {
        // Простая печать
        const printContent = `
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Отчет по выручке</title>
                <style>
                    body { font-family:Arial; margin:20px; }
                    h1 { text-align:center; }
                    table { width:100%; border-collapse:collapse; margin-top:20px; }
                    th, td { border:1px solid #000; padding:8px; }
                    th { background:#eee; }
                    ...total { font-weight:bold; background:#e8f5e8; }
                </style>
            </head>
            <body>
                <h1>ОТЧЕТ ПО ВЫРУЧКЕ</h1>
                <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
                <p><strong>Период:</strong> ${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}</p>
                <p><strong>Группировка:</strong> ${groupBy === 'day' ? 'По дням' : groupBy === 'week' ? 'По неделям' : 'По месяцам'}</p>
                <table>
                    <tr><th>Период</th><th>Выручка</th></tr>
                    ${revenueData.data.map(item => `<tr><td>${item.period}</td><td>${formatNumber(item.revenue)} ₽</td></tr>`).join('')}
                    <tr class="total"><td>Итого:</td><td>${formatNumber(revenueData.total)} ₽</td></tr>
                </table>
                <p style="margin-top:30px; font-size:12px; color:#666;">
                    Сформировано: ${new Date().toLocaleString('ru-RU')}<br>
                    Система управления инвентаризацией
                </p>
            </body>
            </html>
        `;
        
        const win = window.open('', '_blank');
        win.document.write(printContent);
        win.document.close();
        win.print();
        
    } else if (format === 'word') {
        // Выгрузка в Word (HTML с русской кодировкой)
        const wordContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Отчет по выручке</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 2cm; }
                    h1 { text-align: center; color: #2c3e50; }
                    ...info { margin-bottom: 20px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    ...total { font-weight: bold; background-color: #e8f5e8; }
                    ...footer { margin-top: 40px; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <h1>ОТЧЕТ ПО ВЫРУЧКЕ</h1>
                
                <div class="info">
                    <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
                    <p><strong>Период:</strong> ${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}</p>
                    <p><strong>Группировка:</strong> ${groupBy === 'day' ? 'По дням' : groupBy === 'week' ? 'По неделям' : 'По месяцам'}</p>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Период</th>
                            <th>Выручка, ₽</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${revenueData.data.map(item => `
                            <tr>
                                <td>${item.period}</td>
                                <td>${formatNumber(item.revenue)}</td>
                            </tr>
                        `).join('')}
                        <tr class="total">
                            <td>Итого:</td>
                            <td>${formatNumber(revenueData.total)}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="footer">
                    <p>Сформировано: ${new Date().toLocaleString('ru-RU')}</p>
                    <p>Система управления инвентаризацией - Кировский</p>
                </div>
            </body>
            </html>
        `;
        
        // Создаем Blob с BOM для правильной кодировки UTF-8
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]); // UTF-8 BOM
        const blobContent = [bom, wordContent];
        const blob = new Blob(blobContent, { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `Отчет_по_выручке_${shopId}_${startDate.toISOString().slice(0,10)}_${endDate.toISOString().slice(0,10)}.doc`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        
    } else if (format === 'excel') {
        // Выгрузка в Excel (CSV с BOM)
        let excelContent = '\uFEFF'; // UTF-8 BOM для Excel
        
        excelContent += 'ОТЧЕТ ПО ВЫРУЧКЕ\r\n\r\n';
        excelContent += `Магазин;${shopName} (№${shopId})\r\n`;
        excelContent += `Период;${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}\r\n`;
        excelContent += `Группировка;${groupBy === 'day' ? 'По дням' : groupBy === 'week' ? 'По неделям' : 'По месяцам'}\r\n\r\n`;
        excelContent += 'Период;Выручка, ₽\r\n';
        
        revenueData.data.forEach(item => {
            excelContent += `${item.period};${formatNumber(item.revenue)}\r\n`;
        });
        
        excelContent += `\r\nИтого;${formatNumber(revenueData.total)}\r\n\r\n`;
        excelContent += `Сформировано;${new Date().toLocaleString('ru-RU')}\r\n`;
        excelContent += 'Система;Система управления инвентаризацией - Кировский';
        
        const blob = new Blob([excelContent], { 
            type: 'text/csv;charset=utf-8;' 
        });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `Отчет_по_выручке_${shopId}_${startDate.toISOString().slice(0,10)}_${endDate.toISOString().slice(0,10)}.csv`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }
}

// Сброс состояния
function resetExportRevenueModal() {
    document.getElementById('confirmExportRevenue').disabled = false;
    document.getElementById('cancelExportRevenue').disabled = false;
    document.getElementById('revenueLoading').style.display = 'none';
    document.getElementById('revenueResult').style.display = 'none';
    document.getElementById('revenueProgressBar').style.width = '0%';
}

// Закрытие по крестику
document.querySelector('#exportRevenueModal .close').addEventListener('click', function() {
    document.getElementById('exportRevenueModal').style.display = 'none';
    resetExportRevenueModal();
});

// Закрытие по клику вне окна
window.addEventListener('click', function(e) {
    if (e.target.id === 'exportRevenueModal') {
        document.getElementById('exportRevenueModal').style.display = 'none';
        resetExportRevenueModal();
    }
});
            
            // ================== ВЫГРУЗКА ПРОДАЖ - НОВАЯ ВЕРСИЯ ==================

// Инициализация модального окна выгрузки данных по продажам
document.getElementById('exportSalesBtn').addEventListener('click', function() {
    document.getElementById('exportSalesModal').style.display = 'flex';
    
    // Установка текущей даты по умолчанию
    const today = new Date();
    document.getElementById('salesSingleDate').valueAsDate = today;
    document.getElementById('salesStartDate').valueAsDate = today;
    document.getElementById('salesEndDate').valueAsDate = today;
    
    // Скрываем блоки результата и загрузки
    document.getElementById('salesResult').style.display = 'none';
    document.getElementById('salesLoading').style.display = 'none';
    
    // Сбрасываем прогресс бар
    document.getElementById('salesProgressBar').style.width = '0%';
});

// Переключение между одним днем и периодом
document.getElementById('salesPeriodType').addEventListener('change', function() {
    const isSingle = this.value === 'single';
    document.getElementById('singleDateGroup').style.display = isSingle ? 'block' : 'none';
    document.getElementById('rangeDateGroup').style.display = isSingle ? 'none' : 'block';
});

// Отмена выгрузки
document.getElementById('cancelExportSales').addEventListener('click', function() {
    document.getElementById('exportSalesModal').style.display = 'none';
    resetExportSalesModal();
});

// Основная функция выгрузки продаж
document.getElementById('confirmExportSales').addEventListener('click', function() {
    const periodType = document.getElementById('salesPeriodType').value;
    const singleDate = document.getElementById('salesSingleDate').value;
    const startDateStr = document.getElementById('salesStartDate').value;
    const endDateStr = document.getElementById('salesEndDate').value;
    const format = document.getElementById('salesFormat').value;
    const groupBy1 = document.getElementById('salesGroupBy1').value;
    const groupBy2 = document.getElementById('salesGroupBy2').value;
    const groupBy3 = document.getElementById('salesGroupBy3').value;
    
    let startDate, endDate;
    
    // Определяем даты в зависимости от типа периода
    if (periodType === 'single') {
        if (!singleDate) {
            showAlert('Выберите дату', 'warning');
            return;
        }
        startDate = new Date(singleDate);
        endDate = new Date(singleDate);
    } else {
        if (!startDateStr || !endDateStr) {
            showAlert('Выберите даты начала и окончания', 'warning');
            return;
        }
        startDate = new Date(startDateStr);
        endDate = new Date(endDateStr);
        
        if (startDate > endDate) {
            showAlert('Дата начала не может быть позже даты окончания', 'warning');
            return;
        }
    }
    
    // Блокируем кнопки и показываем загрузку
    document.getElementById('confirmExportSales').disabled = true;
    document.getElementById('cancelExportSales').disabled = true;
    document.getElementById('salesLoading').style.display = 'block';
    document.getElementById('salesResult').style.display = 'none';
    
    // Имитация загрузки
    let progress = 0;
    const progressBar = document.getElementById('salesProgressBar');
    progressBar.style.width = '0%';
    
    const progressInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            try {
                // Генерируем данные о продажах
                const salesData = generateSalesData(startDate, endDate, groupBy1, groupBy2, groupBy3);
                
                // Показываем результат
                showSalesResult(startDate, endDate, periodType, groupBy1, groupBy2, groupBy3, salesData, format);
                
                // Выполняем выгрузку в выбранном формате
                executeSalesExport(format, startDate, endDate, periodType, groupBy1, groupBy2, groupBy3, salesData);
                
                // Восстанавливаем кнопки
                document.getElementById('confirmExportSales').disabled = false;
                document.getElementById('cancelExportSales').disabled = false;
                
                // Уведомление
                showAlert(`Выгрузка данных по продажам завершена`, 'success');
                
            } catch (error) {
                console.error('Ошибка:', error);
                document.getElementById('confirmExportSales').disabled = false;
                document.getElementById('cancelExportSales').disabled = false;
                document.getElementById('salesLoading').style.display = 'none';
                showAlert('Ошибка при выгрузке', 'danger');
            }
        }
    }, 150);
});

// Генерация данных о продажах
function generateSalesData(startDate, endDate, groupBy1, groupBy2, groupBy3) {
    const data = [];
    let totalRevenue = 0;
    let totalQuantity = 0;
    
    // Примерные категории товаров
    const departments = ['Бакалея', 'Молочные продукты', 'Мясо и колбасы', 'Овощи и фрукты', 'Напитки', 'Кондитерские изделия'];
    const groups = {
        'Бакалея': ['Крупы', 'Макароны', 'Мука', 'Сахар', 'Соль', 'Масло растительное'],
        'Молочные продукты': ['Молоко', 'Кефир', 'Сметана', 'Творог', 'Сыр', 'Йогурт'],
        'Мясо и колбасы': ['Курица', 'Говядина', 'Свинина', 'Колбаса вареная', 'Колбаса сырокопченая', 'Сосиски'],
        'Овощи и фрукты': ['Картофель', 'Морковь', 'Лук', 'Яблоки', 'Бананы', 'Помидоры'],
        'Напитки': ['Вода', 'Сок', 'Газировка', 'Чай', 'Кофе'],
        'Кондитерские изделия': ['Печенье', 'Шоколад', 'Конфеты', 'Вафли', 'Торт']
    };
    
    const products = [
        { name: 'Рис круглозерный 1кг', department: 'Бакалея', group: 'Крупы', subgroup: 'Рис', price: 89.90 },
        { name: 'Гречка 1кг', department: 'Бакалея', group: 'Крупы', subgroup: 'Гречка', price: 75.50 },
        { name: 'Макароны 500г', department: 'Бакалея', group: 'Макароны', subgroup: 'Спагетти', price: 65.00 },
        { name: 'Молоко 2.5% 1л', department: 'Молочные продукты', group: 'Молоко', subgroup: 'Пастеризованное', price: 79.90 },
        { name: 'Сыр Российский 1кг', department: 'Молочные продукты', group: 'Сыр', subgroup: 'Твердый', price: 850.00 },
        { name: 'Курица тушка 1.5кг', department: 'Мясо и колбасы', group: 'Курица', subgroup: 'Охлажденная', price: 350.00 },
        { name: 'Картофель 1кг', department: 'Овощи и фрукты', group: 'Овощи', subgroup: 'Корнеплоды', price: 45.00 },
        { name: 'Яблоки 1кг', department: 'Овочи и фрукты', group: 'Фрукты', subgroup: 'Сезонные', price: 120.00 },
        { name: 'Вода минеральная 1.5л', department: 'Напитки', group: 'Вода', subgroup: 'Газированная', price: 55.00 },
        { name: 'Шоколад молочный 100г', department: 'Кондитерские изделия', group: 'Шоколад', subgroup: 'Плиточный', price: 95.00 }
    ];
    
    // Генерация данных в зависимости от группировок
    if (groupBy1 === 'whole') {
        // За весь период
        if (groupBy2 === 'totals') {
            // По итогам
            const revenue = Math.floor(Math.random() * 5000000) + 1000000;
            const quantity = Math.floor(Math.random() * 10000) + 5000;
            data.push({
                period: 'Весь период',
                revenue: revenue,
                quantity: quantity,
                avgPrice: revenue / quantity
            });
            totalRevenue = revenue;
            totalQuantity = quantity;
        } else {
            // По товарам/отделам/группам
            if (groupBy3 === 'all') {
                // По всем товарам
                products.forEach(product => {
                    const quantity = Math.floor(Math.random() * 100) + 10;
                    const revenue = quantity * product.price;
                    data.push({
                        name: product.name,
                        quantity: quantity,
                        revenue: revenue,
                        price: product.price
                    });
                    totalRevenue += revenue;
                    totalQuantity += quantity;
                });
            } else if (groupBy3 === 'departments') {
                // По отделам
                departments.forEach(dept => {
                    const quantity = Math.floor(Math.random() * 1000) + 100;
                    const revenue = Math.floor(Math.random() * 500000) + 50000;
                    data.push({
                        department: dept,
                        quantity: quantity,
                        revenue: revenue,
                        avgPrice: revenue / quantity
                    });
                    totalRevenue += revenue;
                    totalQuantity += quantity;
                });
            } else if (groupBy3 === 'groups') {
                // По группам
                const allGroups = [];
                Object.values(groups).forEach(groupList => {
                    allGroups.push(...groupList);
                });
                
                const uniqueGroups = [...new Set(allGroups)];
                uniqueGroups.forEach(group => {
                    const quantity = Math.floor(Math.random() * 500) + 50;
                    const revenue = Math.floor(Math.random() * 250000) + 25000;
                    data.push({
                        group: group,
                        quantity: quantity,
                        revenue: revenue,
                        avgPrice: revenue / quantity
                    });
                    totalRevenue += revenue;
                    totalQuantity += quantity;
                });
            } else if (groupBy3 === 'subgroups') {
                // По подгруппам
                const subgroups = ['Рис', 'Гречка', 'Спагетти', 'Пастеризованное', 'Твердый', 
                                  'Охлажденная', 'Корнеплоды', 'Сезонные', 'Газированная', 'Плиточный'];
                subgroups.forEach(subgroup => {
                    const quantity = Math.floor(Math.random() * 200) + 20;
                    const revenue = Math.floor(Math.random() * 100000) + 10000;
                    data.push({
                        subgroup: subgroup,
                        quantity: quantity,
                        revenue: revenue,
                        avgPrice: revenue / quantity
                    });
                    totalRevenue += revenue;
                    totalQuantity += quantity;
                });
            }
        }
    } else {
        // По каждому дню
        const currentDate = new Date(startDate);
        const daysData = [];
        
        while (currentDate <= endDate) {
            const dayRevenue = Math.floor(Math.random() * 500000) + 100000;
            const dayQuantity = Math.floor(Math.random() * 1000) + 500;
            
            daysData.push({
                date: currentDate.toLocaleDateString('ru-RU'),
                revenue: dayRevenue,
                quantity: dayQuantity,
                avgPrice: dayRevenue / dayQuantity
            });
            
            totalRevenue += dayRevenue;
            totalQuantity += dayQuantity;
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        data.push(...daysData);
    }
    
    return {
        data: data,
        totalRevenue: totalRevenue,
        totalQuantity: totalQuantity,
        groupBy1: groupBy1,
        groupBy2: groupBy2,
        groupBy3: groupBy3,
        startDate: startDate,
        endDate: endDate
    };
}

// Показать результат продаж
function showSalesResult(startDate, endDate, periodType, groupBy1, groupBy2, groupBy3, salesData, format) {
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let periodText = '';
    if (periodType === 'single') {
        periodText = startDate.toLocaleDateString('ru-RU');
    } else {
        periodText = `${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}`;
    }
    
    let html = `
        <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
        <p><strong>Период:</strong> ${periodText}</p>
        <p><strong>Группировка 1:</strong> ${getSalesGroup1Name(groupBy1)}</p>
        <p><strong>Группировка 2:</strong> ${getSalesGroup2Name(groupBy2)}</p>
        <p><strong>Группировка 3:</strong> ${getSalesGroup3Name(groupBy3)}</p>
        <p><strong>Формат:</strong> ${getSalesFormatName(format)}</p>
        <hr>
    `;
    
    // Заголовок таблицы в зависимости от группировок
    let tableHeader = '';
    if (groupBy1 === 'whole' && groupBy2 === 'totals') {
        tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Период</th>';
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во, шт</th>';
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Выручка, ₽</th>';
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Средняя цена, ₽</th>';
    } else if (groupBy1 === 'daily') {
        tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Дата</th>';
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во, шт</th>';
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Выручка, ₽</th>';
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Средняя цена, ₽</th>';
    } else {
        // Определяем заголовок для группировки 3
        let firstColumn = '';
        if (groupBy3 === 'all') firstColumn = 'Товар';
        else if (groupBy3 === 'departments') firstColumn = 'Отдел';
        else if (groupBy3 === 'groups') firstColumn = 'Группа';
        else if (groupBy3 === 'subgroups') firstColumn = 'Подгруппа';
        
        tableHeader = `<th style="padding:8px; border:1px solid #ddd;">${firstColumn}</th>`;
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во, шт</th>';
        tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Выручка, ₽</th>';
        if (groupBy3 === 'all') {
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Цена, ₽</th>';
        } else {
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Средняя цена, ₽</th>';
        }
    }
    
    html += `
        <table style="width:100%; border-collapse:collapse; margin-top:10px;">
            <thead>
                <tr style="background:#f2f2f2;">
                    ${tableHeader}
                </tr>
            </thead>
            <tbody>
    `;
    
    // Данные таблицы
    salesData.data.forEach(item => {
        html += '<tr>';
        
        if (groupBy1 === 'whole' && groupBy2 === 'totals') {
            html += `<td style="padding:8px; border:1px solid #ddd;">${item.period}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.revenue)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
        } else if (groupBy1 === 'daily') {
            html += `<td style="padding:8px; border:1px solid #ddd;">${item.date}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.revenue)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
        } else {
            // Определяем первую колонку в зависимости от группировки 3
            if (groupBy3 === 'all') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.name}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.revenue)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.price)}</td>`;
            } else if (groupBy3 === 'departments') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.department}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.revenue)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
            } else if (groupBy3 === 'groups') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.group}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.revenue)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
            } else if (groupBy3 === 'subgroups') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.subgroup}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.revenue)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
            }
        }
        
        html += '</tr>';
    });
    
    // Итоги
    html += `
            </tbody>
            <tfoot>
                <tr style="background:#e8f5e8; font-weight:bold;">
                    <td style="padding:8px; border:1px solid #ddd;">Итого:</td>
    `;
    
    if (groupBy1 === 'whole' && groupBy2 === 'totals') {
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(salesData.totalQuantity)}</td>`;
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(salesData.totalRevenue)} ₽</td>`;
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(salesData.totalRevenue / salesData.totalQuantity)}</td>`;
    } else if (groupBy1 === 'daily') {
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(salesData.totalQuantity)}</td>`;
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(salesData.totalRevenue)} ₽</td>`;
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(salesData.totalRevenue / salesData.totalQuantity)}</td>`;
    } else {
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(salesData.totalQuantity)}</td>`;
        html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(salesData.totalRevenue)} ₽</td>`;
        if (groupBy3 === 'all') {
            html += '<td style="padding:8px; border:1px solid #ddd; text-align:right;">-</td>';
        } else {
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(salesData.totalRevenue / salesData.totalQuantity)}</td>`;
        }
    }
    
    html += `
                </tr>
            </tfoot>
        </table>
        
        <div style="margin-top:15px; padding:10px; background:#e8f5e8; border-radius:5px;">
            <p style="margin:0; color:#27ae60;"><i class="fas fa-check-circle"></i> Выгрузка завершена</p>
        </div>
    `;
    
    document.getElementById('salesResultContent').innerHTML = html;
    document.getElementById('salesLoading').style.display = 'none';
    document.getElementById('salesResult').style.display = 'block';
}

// Вспомогательные функции для названий группировок
function getSalesGroup1Name(group) {
    return group === 'whole' ? 'За весь период' : 'По каждому дню';
}

function getSalesGroup2Name(group) {
    return group === 'products' ? 'По товарам' : 'По итогам';
}

function getSalesGroup3Name(group) {
    const names = {
        'all': 'По всем товарам',
        'departments': 'По отделам',
        'groups': 'По группам',
        'subgroups': 'По подгруппам'
    };
    return names[group] || group;
}

function getSalesFormatName(format) {
    const names = {
        'screen': 'Вывод на экран',
        'print': 'На печать',
        'word': 'Выгрузка в Word',
        'excel': 'Выгрузка в Excel'
    };
    return names[format] || format;
}

// Выполнить выгрузку продаж в нужном формате
function executeSalesExport(format, startDate, endDate, periodType, groupBy1, groupBy2, groupBy3, salesData) {
    if (format === 'screen') return; // Уже показано
    
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let periodText = '';
    if (periodType === 'single') {
        periodText = startDate.toLocaleDateString('ru-RU');
    } else {
        periodText = `${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}`;
    }
    
    // Подготовка данных для выгрузки
    let fileContent = '\uFEFF'; // UTF-8 BOM
    
    fileContent += 'ОТЧЕТ ПО ПРОДАЖАМ\r\n\r\n';
    fileContent += `Магазин: ${shopName} (№${shopId})\r\n`;
    fileContent += `Период: ${periodText}\r\n`;
    fileContent += `Группировка 1: ${getSalesGroup1Name(groupBy1)}\r\n`;
    fileContent += `Группировка 2: ${getSalesGroup2Name(groupBy2)}\r\n`;
    fileContent += `Группировка 3: ${getSalesGroup3Name(groupBy3)}\r\n\r\n`;
    
    // Заголовки столбцов
    let headers = '';
    if (groupBy1 === 'whole' && groupBy2 === 'totals') {
        headers = 'Период;Количество, шт;Выручка, ₽;Средняя цена, ₽\r\n';
    } else if (groupBy1 === 'daily') {
        headers = 'Дата;Количество, шт;Выручка, ₽;Средняя цена, ₽\r\n';
    } else {
        if (groupBy3 === 'all') {
            headers = 'Товар;Количество, шт;Выручка, ₽;Цена, ₽\r\n';
        } else if (groupBy3 === 'departments') {
            headers = 'Отдел;Количество, шт;Выручка, ₽;Средняя цена, ₽\r\n';
        } else if (groupBy3 === 'groups') {
            headers = 'Группа;Количество, шт;Выручка, ₽;Средняя цена, ₽\r\n';
        } else if (groupBy3 === 'subgroups') {
            headers = 'Подгруппа;Количество, шт;Выручка, ₽;Средняя цена, ₽\r\n';
        }
    }
    
    fileContent += headers;
    
    // Данные
    salesData.data.forEach(item => {
        if (groupBy1 === 'whole' && groupBy2 === 'totals') {
            fileContent += `${item.period};${item.quantity};${formatNumber(item.revenue)};${formatNumber(item.avgPrice)}\r\n`;
        } else if (groupBy1 === 'daily') {
            fileContent += `${item.date};${item.quantity};${formatNumber(item.revenue)};${formatNumber(item.avgPrice)}\r\n`;
        } else {
            if (groupBy3 === 'all') {
                fileContent += `${item.name};${item.quantity};${formatNumber(item.revenue)};${formatNumber(item.price)}\r\n`;
            } else if (groupBy3 === 'departments') {
                fileContent += `${item.department};${item.quantity};${formatNumber(item.revenue)};${formatNumber(item.avgPrice)}\r\n`;
            } else if (groupBy3 === 'groups') {
                fileContent += `${item.group};${item.quantity};${formatNumber(item.revenue)};${formatNumber(item.avgPrice)}\r\n`;
            } else if (groupBy3 === 'subgroups') {
                fileContent += `${item.subgroup};${item.quantity};${formatNumber(item.revenue)};${formatNumber(item.avgPrice)}\r\n`;
            }
        }
    });
    
    fileContent += `\r\nИтого;${salesData.totalQuantity};${formatNumber(salesData.totalRevenue)}\r\n\r\n`;
    fileContent += `Сформировано: ${new Date().toLocaleString('ru-RU')}\r\n`;
    fileContent += 'Система управления инвентаризацией - Кировский';
    
    // Создание файла
    let mimeType, fileExt;
    if (format === 'print') {
        // Для печати открываем новое окно
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Отчет по продажам</title>
                <style>
                    body { font-family: Arial; margin: 20px; }
                    h1 { text-align: center; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #000; padding: 8px; }
                    th { background: #eee; }
                    ...total { font-weight: bold; background: #e8f5e8; }
                </style>
            </head>
            <body>
                <h1>ОТЧЕТ ПО ПРОДАЖАМ</h1>
                <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
                <p><strong>Период:</strong> ${periodText}</p>
                <p><strong>Группировка 1:</strong> ${getSalesGroup1Name(groupBy1)}</p>
                <p><strong>Группировка 2:</strong> ${getSalesGroup2Name(groupBy2)}</p>
                <p><strong>Группировка 3:</strong> ${getSalesGroup3Name(groupBy3)}</p>
                ${document.getElementById('salesResultContent').innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        return;
    } else if (format === 'word') {
        mimeType = 'application/msword';
        fileExt = 'doc';
    } else if (format === 'excel') {
        mimeType = 'text/csv;charset=utf-8';
        fileExt = 'csv';
    }
    
    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Отчет_по_продажам_${shopId}_${startDate.toISOString().slice(0,10)}_${format === 'single' ? '' : endDate.toISOString().slice(0,10)}.${fileExt}`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Сброс состояния модального окна продаж
function resetExportSalesModal() {
    document.getElementById('confirmExportSales').disabled = false;
    document.getElementById('cancelExportSales').disabled = false;
    document.getElementById('salesLoading').style.display = 'none';
    document.getElementById('salesResult').style.display = 'none';
    document.getElementById('salesProgressBar').style.width = '0%';
}

// Закрытие по крестику
document.querySelector('#exportSalesModal .close').addEventListener('click', function() {
    document.getElementById('exportSalesModal').style.display = 'none';
    resetExportSalesModal();
});

// Закрытие по клику вне окна
window.addEventListener('click', function(e) {
    if (e.target.id === 'exportSalesModal') {
        document.getElementById('exportSalesModal').style.display = 'none';
        resetExportSalesModal();
    }
});
            
            // ================== ВЫГРУЗКА ОСТАТКОВ - НОВАЯ ВЕРСИЯ ==================

// Инициализация модального окна выгрузки данных по остаткам
document.getElementById('exportStockBtn').addEventListener('click', function() {
    document.getElementById('exportStockModal').style.display = 'flex';
    
    // Установка текущей даты по умолчанию
    const today = new Date();
    document.getElementById('stockDate').valueAsDate = today;
    
    // Скрываем блоки результата и загрузки
    document.getElementById('stockResult').style.display = 'none';
    document.getElementById('stockLoading').style.display = 'none';
    
    // Сбрасываем прогресс бар
    document.getElementById('stockProgressBar').style.width = '0%';
});

// Отмена выгрузки
document.getElementById('cancelExportStock').addEventListener('click', function() {
    document.getElementById('exportStockModal').style.display = 'none';
    resetExportStockModal();
});

// Основная функция выгрузки остатков
document.getElementById('confirmExportStock').addEventListener('click', function() {
    const stockDate = document.getElementById('stockDate').value;
    const format = document.getElementById('stockFormat').value;
    const groupBy1 = document.getElementById('stockGroupBy1').value;
    const groupBy2 = document.getElementById('stockGroupBy2').value;
    
    if (!stockDate) {
        showAlert('Выберите дату', 'warning');
        return;
    }
    
    const date = new Date(stockDate);
    
    // Блокируем кнопки и показываем загрузку
    document.getElementById('confirmExportStock').disabled = true;
    document.getElementById('cancelExportStock').disabled = true;
    document.getElementById('stockLoading').style.display = 'block';
    document.getElementById('stockResult').style.display = 'none';
    
    // Имитация загрузки
    let progress = 0;
    const progressBar = document.getElementById('stockProgressBar');
    progressBar.style.width = '0%';
    
    const progressInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            try {
                // Генерируем данные об остатках
                const stockData = generateStockData(date, groupBy1, groupBy2);
                
                // Показываем результат
                showStockResult(date, groupBy1, groupBy2, stockData, format);
                
                // Выполняем выгрузку в выбранном формате
                executeStockExport(format, date, groupBy1, groupBy2, stockData);
                
                // Восстанавливаем кнопки
                document.getElementById('confirmExportStock').disabled = false;
                document.getElementById('cancelExportStock').disabled = false;
                
                // Уведомление
                showAlert(`Выгрузка данных по остаткам на ${date.toLocaleDateString('ru-RU')} завершена`, 'success');
                
            } catch (error) {
                console.error('Ошибка:', error);
                document.getElementById('confirmExportStock').disabled = false;
                document.getElementById('cancelExportStock').disabled = false;
                document.getElementById('stockLoading').style.display = 'none';
                showAlert('Ошибка при выгрузке', 'danger');
            }
        }
    }, 150);
});

// Генерация данных об остатках
function generateStockData(date, groupBy1, groupBy2) {
    const data = [];
    let totalQuantity = 0;
    let totalAmount = 0;
    
    // Примерные категории товаров для остатков
    const departments = ['Бакалея', 'Молочные продукты', 'Мясо и колбасы', 'Овощи и фрукты', 'Напитки', 'Кондитерские изделия'];
    const groups = {
        'Бакалея': ['Крупы', 'Макароны', 'Мука', 'Сахар', 'Соль', 'Масло растительное'],
        'Молочные продукты': ['Молоко', 'Кефир', 'Сметана', 'Творог', 'Сыр', 'Йогурт'],
        'Мясо и колбасы': ['Курица', 'Говядина', 'Свинина', 'Колбаса вареная', 'Колбаса сырокопченая', 'Сосиски'],
        'Овощи и фрукты': ['Картофель', 'Морковь', 'Лук', 'Яблоки', 'Бананы', 'Помидоры'],
        'Напитки': ['Вода', 'Сок', 'Газировка', 'Чай', 'Кофе'],
        'Кондитерские изделия': ['Печенье', 'Шоколад', 'Конфеты', 'Вафли', 'Торт']
    };
    
    const products = [
        { name: 'Рис круглозерный 1кг', department: 'Бакалея', group: 'Крупы', subgroup: 'Рис', price: 89.90, unit: 'шт' },
        { name: 'Гречка 1кг', department: 'Бакалея', group: 'Крупы', subgroup: 'Гречка', price: 75.50, unit: 'шт' },
        { name: 'Макароны 500г', department: 'Бакалея', group: 'Макароны', subgroup: 'Спагетти', price: 65.00, unit: 'шт' },
        { name: 'Молоко 2.5% 1л', department: 'Молочные продукты', group: 'Молоко', subgroup: 'Пастеризованное', price: 79.90, unit: 'шт' },
        { name: 'Сыр Российский 1кг', department: 'Молочные продукты', group: 'Сыр', subgroup: 'Твердый', price: 850.00, unit: 'кг' },
        { name: 'Курица тушка 1.5кг', department: 'Мясо и колбасы', group: 'Курица', subgroup: 'Охлажденная', price: 350.00, unit: 'шт' },
        { name: 'Картофель 1кг', department: 'Овощи и фрукты', group: 'Овощи', subgroup: 'Корнеплоды', price: 45.00, unit: 'кг' },
        { name: 'Яблоки 1кг', department: 'Овочи и фрукты', group: 'Фрукты', subgroup: 'Сезонные', price: 120.00, unit: 'кг' },
        { name: 'Вода минеральная 1.5л', department: 'Напитки', group: 'Вода', subgroup: 'Газированная', price: 55.00, unit: 'шт' },
        { name: 'Шоколад молочный 100г', department: 'Кондитерские изделия', group: 'Шоколад', subgroup: 'Плиточный', price: 95.00, unit: 'шт' }
    ];
    
    // Генерация данных в зависимости от группировок
    if (groupBy1 === 'totals') {
        // Итоги
        if (groupBy2 === 'all') {
            // Общий итог
            const quantity = Math.floor(Math.random() * 10000) + 5000;
            const amount = Math.floor(Math.random() * 5000000) + 1000000;
            data.push({
                type: 'Общий остаток',
                quantity: quantity,
                amount: amount,
                avgPrice: amount / quantity
            });
            totalQuantity = quantity;
            totalAmount = amount;
        } else if (groupBy2 === 'departments') {
            // Итоги по отделам
            departments.forEach(dept => {
                const quantity = Math.floor(Math.random() * 1000) + 100;
                const amount = Math.floor(Math.random() * 500000) + 50000;
                data.push({
                    department: dept,
                    quantity: quantity,
                    amount: amount,
                    avgPrice: amount / quantity
                });
                totalQuantity += quantity;
                totalAmount += amount;
            });
        } else if (groupBy2 === 'groups') {
            // Итоги по группам
            const allGroups = [];
            Object.values(groups).forEach(groupList => {
                allGroups.push(...groupList);
            });
            
            const uniqueGroups = [...new Set(allGroups)];
            uniqueGroups.forEach(group => {
                const quantity = Math.floor(Math.random() * 500) + 50;
                const amount = Math.floor(Math.random() * 250000) + 25000;
                data.push({
                    group: group,
                    quantity: quantity,
                    amount: amount,
                    avgPrice: amount / quantity
                });
                totalQuantity += quantity;
                totalAmount += amount;
            });
        } else if (groupBy2 === 'subgroups') {
            // Итоги по подгруппам
            const subgroups = ['Рис', 'Гречка', 'Спагетти', 'Пастеризованное', 'Твердый', 
                              'Охлажденная', 'Корнеплоды', 'Сезонные', 'Газированная', 'Плиточный'];
            subgroups.forEach(subgroup => {
                const quantity = Math.floor(Math.random() * 200) + 20;
                const amount = Math.floor(Math.random() * 100000) + 10000;
                data.push({
                    subgroup: subgroup,
                    quantity: quantity,
                    amount: amount,
                    avgPrice: amount / quantity
                });
                totalQuantity += quantity;
                totalAmount += amount;
            });
        }
    } else {
        // По товарам
        if (groupBy2 === 'all') {
            // Все товары
            products.forEach(product => {
                const quantity = Math.floor(Math.random() * 100) + 10;
                const amount = quantity * product.price;
                data.push({
                    name: product.name,
                    unit: product.unit,
                    quantity: quantity,
                    price: product.price,
                    amount: amount
                });
                totalQuantity += quantity;
                totalAmount += amount;
            });
        } else if (groupBy2 === 'departments') {
            // По отделам (детализация по товарам внутри отделов)
            departments.forEach(dept => {
                const deptProducts = products.filter(p => p.department === dept);
                deptProducts.forEach(product => {
                    const quantity = Math.floor(Math.random() * 50) + 5;
                    const amount = quantity * product.price;
                    data.push({
                        department: dept,
                        name: product.name,
                        unit: product.unit,
                        quantity: quantity,
                        price: product.price,
                        amount: amount
                    });
                    totalQuantity += quantity;
                    totalAmount += amount;
                });
            });
        } else if (groupBy2 === 'groups') {
            // По группам (детализация по товарам внутри групп)
            const allGroups = [];
            Object.entries(groups).forEach(([dept, groupList]) => {
                groupList.forEach(group => {
                    const groupProducts = products.filter(p => p.department === dept && p.group === group);
                    groupProducts.forEach(product => {
                        const quantity = Math.floor(Math.random() * 30) + 3;
                        const amount = quantity * product.price;
                        data.push({
                            group: group,
                            name: product.name,
                            unit: product.unit,
                            quantity: quantity,
                            price: product.price,
                            amount: amount
                        });
                        totalQuantity += quantity;
                        totalAmount += amount;
                    });
                });
            });
        } else if (groupBy2 === 'subgroups') {
            // По подгруппам (детализация по товарам внутри подгрупп)
            const subgroupsMap = {
                'Рис': ['Рис круглозерный 1кг'],
                'Гречка': ['Гречка 1кг'],
                'Спагетти': ['Макароны 500г'],
                'Пастеризованное': ['Молоко 2.5% 1л'],
                'Твердый': ['Сыр Российский 1кг'],
                'Охлажденная': ['Курица тушка 1.5кг'],
                'Корнеплоды': ['Картофель 1кг'],
                'Сезонные': ['Яблоки 1кг'],
                'Газированная': ['Вода минеральная 1.5л'],
                'Плиточный': ['Шоколад молочный 100г']
            };
            
            Object.entries(subgroupsMap).forEach(([subgroup, productNames]) => {
                productNames.forEach(productName => {
                    const product = products.find(p => p.name === productName);
                    if (product) {
                        const quantity = Math.floor(Math.random() * 20) + 2;
                        const amount = quantity * product.price;
                        data.push({
                            subgroup: subgroup,
                            name: product.name,
                            unit: product.unit,
                            quantity: quantity,
                            price: product.price,
                            amount: amount
                        });
                        totalQuantity += quantity;
                        totalAmount += amount;
                    }
                });
            });
        }
    }
    
    return {
        data: data,
        totalQuantity: totalQuantity,
        totalAmount: totalAmount,
        groupBy1: groupBy1,
        groupBy2: groupBy2,
        date: date
    };
}

// Показать результат остатков
function showStockResult(date, groupBy1, groupBy2, stockData, format) {
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let html = `
        <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
        <p><strong>На утро даты:</strong> ${date.toLocaleDateString('ru-RU')}</p>
        <p><strong>Группировка 1:</strong> ${getStockGroup1Name(groupBy1)}</p>
        <p><strong>Группировка 2:</strong> ${getStockGroup2Name(groupBy2)}</p>
        <p><strong>Формат:</strong> ${getStockFormatName(format)}</p>
        <hr>
    `;
    
    // Заголовок таблицы в зависимости от группировок
    let tableHeader = '';
    if (groupBy1 === 'totals') {
        if (groupBy2 === 'all') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Тип</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Средняя цена, ₽</th>';
        } else if (groupBy2 === 'departments') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Отдел</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Средняя цена, ₽</th>';
        } else if (groupBy2 === 'groups') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Группа</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Средняя цена, ₽</th>';
        } else if (groupBy2 === 'subgroups') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Подгруппа</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Средняя цена, ₽</th>';
        }
    } else {
        // По товарам
        if (groupBy2 === 'all') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Товар</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd;">Ед.</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Цена, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
        } else if (groupBy2 === 'departments') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Отдел</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd;">Товар</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd;">Ед.</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Цена, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
        } else if (groupBy2 === 'groups') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Группа</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd;">Товар</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd;">Ед.</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Цена, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
        } else if (groupBy2 === 'subgroups') {
            tableHeader = '<th style="padding:8px; border:1px solid #ddd;">Подгруппа</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd;">Товар</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd;">Ед.</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Цена, ₽</th>';
            tableHeader += '<th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>';
        }
    }
    
    html += `
        <table style="width:100%; border-collapse:collapse; margin-top:10px;">
            <thead>
                <tr style="background:#f2f2f2;">
                    ${tableHeader}
                </tr>
            </thead>
            <tbody>
    `;
    
    // Данные таблицы
    stockData.data.forEach(item => {
        html += '<tr>';
        
        if (groupBy1 === 'totals') {
            if (groupBy2 === 'all') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.type}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
            } else if (groupBy2 === 'departments') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.department}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
            } else if (groupBy2 === 'groups') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.group}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
            } else if (groupBy2 === 'subgroups') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.subgroup}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.avgPrice)}</td>`;
            }
        } else {
            // По товарам
            if (groupBy2 === 'all') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.name}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.unit}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.price)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
            } else if (groupBy2 === 'departments') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.department}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.name}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.unit}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.price)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
            } else if (groupBy2 === 'groups') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.group}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.name}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.unit}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.price)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
            } else if (groupBy2 === 'subgroups') {
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.subgroup}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.name}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd;">${item.unit}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.price)}</td>`;
                html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>`;
            }
        }
        
        html += '</tr>';
    });
    
    // Итоги
    html += `
            </tbody>
            <tfoot>
                <tr style="background:#e8f5e8; font-weight:bold;">
    `;
    
    if (groupBy1 === 'totals') {
        if (groupBy2 === 'all') {
            html += `<td style="padding:8px; border:1px solid #ddd;">Итого:</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(stockData.totalQuantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(stockData.totalAmount)} ₽</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(stockData.totalAmount / stockData.totalQuantity)}</td>`;
        } else {
            html += `<td style="padding:8px; border:1px solid #ddd;" colspan="2">Итого:</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(stockData.totalQuantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(stockData.totalAmount)} ₽</td>`;
        }
    } else {
        // По товарам
        if (groupBy2 === 'all') {
            html += `<td style="padding:8px; border:1px solid #ddd;" colspan="3">Итого:</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(stockData.totalQuantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(stockData.totalAmount)} ₽</td>`;
        } else if (groupBy2 === 'departments') {
            html += `<td style="padding:8px; border:1px solid #ddd;" colspan="4">Итого:</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(stockData.totalQuantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(stockData.totalAmount)} ₽</td>`;
        } else if (groupBy2 === 'groups') {
            html += `<td style="padding:8px; border:1px solid #ddd;" colspan="4">Итого:</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(stockData.totalQuantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(stockData.totalAmount)} ₽</td>`;
        } else if (groupBy2 === 'subgroups') {
            html += `<td style="padding:8px; border:1px solid #ddd;" colspan="4">Итого:</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(stockData.totalQuantity)}</td>`;
            html += `<td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(stockData.totalAmount)} ₽</td>`;
        }
    }
    
    html += `
                </tr>
            </tfoot>
        </table>
        
        <div style="margin-top:15px; padding:10px; background:#e8f5e8; border-radius:5px;">
            <p style="margin:0; color:#27ae60;"><i class="fas fa-check-circle"></i> Выгрузка завершена</p>
        </div>
    `;
    
    document.getElementById('stockResultContent').innerHTML = html;
    document.getElementById('stockLoading').style.display = 'none';
    document.getElementById('stockResult').style.display = 'block';
}

// Вспомогательные функции для названий группировок
function getStockGroup1Name(group) {
    return group === 'products' ? 'По товарам' : 'Итоги';
}

function getStockGroup2Name(group) {
    const names = {
        'all': 'По всем товарам',
        'departments': 'По отделам',
        'groups': 'По группам',
        'subgroups': 'По подгруппам'
    };
    return names[group] || group;
}

function getStockFormatName(format) {
    const names = {
        'screen': 'Вывод на экран',
        'print': 'На печать',
        'wordpad': 'Выгрузка в WordPad',
        'excel': 'Выгрузка в Excel'
    };
    return names[format] || format;
}

// Выполнить выгрузку остатков в нужном формате
function executeStockExport(format, date, groupBy1, groupBy2, stockData) {
    if (format === 'screen') return; // Уже показано
    
    const shopName = appData.currentShop ? appData.currentShop.name : 'Магазин не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    // Подготовка данных для выгрузки
    let fileContent = '\uFEFF'; // UTF-8 BOM
    
    fileContent += 'ОТЧЕТ ПО ОСТАТКАМ\r\n\r\n';
    fileContent += `Магазин: ${shopName} (№${shopId})\r\n`;
    fileContent += `На утро даты: ${date.toLocaleDateString('ru-RU')}\r\n`;
    fileContent += `Группировка 1: ${getStockGroup1Name(groupBy1)}\r\n`;
    fileContent += `Группировка 2: ${getStockGroup2Name(groupBy2)}\r\n\r\n`;
    
    // Заголовки столбцов
    let headers = '';
    if (groupBy1 === 'totals') {
        if (groupBy2 === 'all') {
            headers = 'Тип;Количество;Сумма, ₽;Средняя цена, ₽\r\n';
        } else if (groupBy2 === 'departments') {
            headers = 'Отдел;Количество;Сумма, ₽;Средняя цена, ₽\r\n';
        } else if (groupBy2 === 'groups') {
            headers = 'Группа;Количество;Сумма, ₽;Средняя цена, ₽\r\n';
        } else if (groupBy2 === 'subgroups') {
            headers = 'Подгруппа;Количество;Сумма, ₽;Средняя цена, ₽\r\n';
        }
    } else {
        // По товарам
        if (groupBy2 === 'all') {
            headers = 'Товар;Ед.изм.;Количество;Цена, ₽;Сумма, ₽\r\n';
        } else if (groupBy2 === 'departments') {
            headers = 'Отдел;Товар;Ед.изм.;Количество;Цена, ₽;Сумма, ₽\r\n';
        } else if (groupBy2 === 'groups') {
            headers = 'Группа;Товар;Ед.изм.;Количество;Цена, ₽;Сумма, ₽\r\n';
        } else if (groupBy2 === 'subgroups') {
            headers = 'Подгруппа;Товар;Ед.изм.;Количество;Цена, ₽;Сумма, ₽\r\n';
        }
    }
    
    fileContent += headers;
    
    // Данные
    stockData.data.forEach(item => {
        if (groupBy1 === 'totals') {
            if (groupBy2 === 'all') {
                fileContent += `${item.type};${item.quantity};${formatNumber(item.amount)};${formatNumber(item.avgPrice)}\r\n`;
            } else if (groupBy2 === 'departments') {
                fileContent += `${item.department};${item.quantity};${formatNumber(item.amount)};${formatNumber(item.avgPrice)}\r\n`;
            } else if (groupBy2 === 'groups') {
                fileContent += `${item.group};${item.quantity};${formatNumber(item.amount)};${formatNumber(item.avgPrice)}\r\n`;
            } else if (groupBy2 === 'subgroups') {
                fileContent += `${item.subgroup};${item.quantity};${formatNumber(item.amount)};${formatNumber(item.avgPrice)}\r\n`;
            }
        } else {
            // По товарам
            if (groupBy2 === 'all') {
                fileContent += `${item.name};${item.unit};${item.quantity};${formatNumber(item.price)};${formatNumber(item.amount)}\r\n`;
            } else if (groupBy2 === 'departments') {
                fileContent += `${item.department};${item.name};${item.unit};${item.quantity};${formatNumber(item.price)};${formatNumber(item.amount)}\r\n`;
            } else if (groupBy2 === 'groups') {
                fileContent += `${item.group};${item.name};${item.unit};${item.quantity};${formatNumber(item.price)};${formatNumber(item.amount)}\r\n`;
            } else if (groupBy2 === 'subgroups') {
                fileContent += `${item.subgroup};${item.name};${item.unit};${item.quantity};${formatNumber(item.price)};${formatNumber(item.amount)}\r\n`;
            }
        }
    });
    
    fileContent += `\r\nИтого;${stockData.totalQuantity};${formatNumber(stockData.totalAmount)}\r\n\r\n`;
    fileContent += `Сформировано: ${new Date().toLocaleString('ru-RU')}\r\n`;
    fileContent += 'Система управления инвентаризацией - Кировский';
    
    // Создание файла
    let mimeType, fileExt;
    
    if (format === 'print') {
        // Для печати открываем новое окно
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Отчет по остаткам</title>
                <style>
                    body { font-family: Arial; margin: 20px; }
                    h1 { text-align: center; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #000; padding: 8px; }
                    th { background: #eee; }
                    ...total { font-weight: bold; background: #e8f5e8; }
                </style>
            </head>
            <body>
                <h1>ОТЧЕТ ПО ОСТАТКАМ</h1>
                <p><strong>Магазин:</strong> ${shopName} (№${shopId})</p>
                <p><strong>На утро даты:</strong> ${date.toLocaleDateString('ru-RU')}</p>
                <p><strong>Группировка 1:</strong> ${getStockGroup1Name(groupBy1)}</p>
                <p><strong>Группировка 2:</strong> ${getStockGroup2Name(groupBy2)}</p>
                ${document.getElementById('stockResultContent').innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        return;
    } else if (format === 'wordpad') {
        // Для WordPad - текстовый файл с табуляцией
        let txtContent = 'ОТЧЕТ ПО ОСТАТКАМ\n\n';
        txtContent += `Магазин: ${shopName} (№${shopId})\n`;
        txtContent += `На утро даты: ${date.toLocaleDateString('ru-RU')}\n`;
        txtContent += `Группировка 1: ${getStockGroup1Name(groupBy1)}\n`;
        txtContent += `Группировка 2: ${getStockGroup2Name(groupBy2)}\n\n`;
        
        // Данные с табуляцией
        stockData.data.forEach(item => {
            if (groupBy1 === 'totals') {
                if (groupBy2 === 'all') {
                    txtContent += `${item.type}\t${item.quantity}\t${formatNumber(item.amount)} ₽\t${formatNumber(item.avgPrice)} ₽\n`;
                } else if (groupBy2 === 'departments') {
                    txtContent += `${item.department}\t${item.quantity}\t${formatNumber(item.amount)} ₽\t${formatNumber(item.avgPrice)} ₽\n`;
                } else if (groupBy2 === 'groups') {
                    txtContent += `${item.group}\t${item.quantity}\t${formatNumber(item.amount)} ₽\t${formatNumber(item.avgPrice)} ₽\n`;
                } else if (groupBy2 === 'subgroups') {
                    txtContent += `${item.subgroup}\t${item.quantity}\t${formatNumber(item.amount)} ₽\t${formatNumber(item.avgPrice)} ₽\n`;
                }
            } else {
                if (groupBy2 === 'all') {
                    txtContent += `${item.name}\t${item.unit}\t${item.quantity}\t${formatNumber(item.price)} ₽\t${formatNumber(item.amount)} ₽\n`;
                } else if (groupBy2 === 'departments') {
                    txtContent += `${item.department} - ${item.name}\t${item.unit}\t${item.quantity}\t${formatNumber(item.price)} ₽\t${formatNumber(item.amount)} ₽\n`;
                } else if (groupBy2 === 'groups') {
                    txtContent += `${item.group} - ${item.name}\t${item.unit}\t${item.quantity}\t${formatNumber(item.price)} ₽\t${formatNumber(item.amount)} ₽\n`;
                } else if (groupBy2 === 'subgroups') {
                    txtContent += `${item.subgroup} - ${item.name}\t${item.unit}\t${item.quantity}\t${formatNumber(item.price)} ₽\t${formatNumber(item.amount)} ₽\n`;
                }
            }
        });
        
        txtContent += `\nИтого:\t${stockData.totalQuantity}\t${formatNumber(stockData.totalAmount)} ₽\n\n`;
        txtContent += `Сформировано: ${new Date().toLocaleString('ru-RU')}\n`;
        txtContent += 'Система управления инвентаризацией - Кировский';
        
        fileContent = txtContent;
        mimeType = 'text/plain;charset=utf-8';
        fileExt = 'txt';
    } else if (format === 'excel') {
        mimeType = 'text/csv;charset=utf-8';
        fileExt = 'csv';
    }
    
    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Отчет_по_остаткам_${shopId}_${date.toISOString().slice(0,10)}.${fileExt}`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Сброс состояния модального окна остатков
function resetExportStockModal() {
    document.getElementById('confirmExportStock').disabled = false;
    document.getElementById('cancelExportStock').disabled = false;
    document.getElementById('stockLoading').style.display = 'none';
    document.getElementById('stockResult').style.display = 'none';
    document.getElementById('stockProgressBar').style.width = '0%';
}

// Закрытие по крестику
document.querySelector('#exportStockModal .close').addEventListener('click', function() {
    document.getElementById('exportStockModal').style.display = 'none';
    resetExportStockModal();
});

// Закрытие по клику вне окна
window.addEventListener('click', function(e) {
    if (e.target.id === 'exportStockModal') {
        document.getElementById('exportStockModal').style.display = 'none';
        resetExportStockModal();
    }
});
            
            // ================== ХОЗЯЙСТВЕННЫЕ ОПЕРАЦИИ - НОВАЯ ВЕРСИЯ ==================

// Инициализация модального окна выполнения хозяйственных операций
document.getElementById('executeOperationsBtn').addEventListener('click', function() {
    document.getElementById('executeOperationsModal').style.display = 'flex';
    
    // Установка дат по умолчанию (последние 30 дней)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
    
    document.getElementById('operationStartDate').valueAsDate = startDate;
    document.getElementById('operationEndDate').valueAsDate = endDate;
    
    // Сброс полей
    document.getElementById('operationShopNumber').value = appData.currentShop ? appData.currentShop.id : '';
    document.getElementById('operationNumbers').value = '';
    document.getElementById('operationSingleProduct').value = '';
    document.getElementById('operationPrintTotalsOnly').checked = false;
    
    // Скрываем блоки результата и загрузки
    document.getElementById('operationResult').style.display = 'none';
    document.getElementById('operationLoading').style.display = 'none';
    
    // Сбрасываем прогресс бар
    document.getElementById('operationProgressBar').style.width = '0%';
});

// Переключение между номером магазина и ракурсом
document.getElementById('operationDivisionType').addEventListener('change', function() {
    const isShop = this.value === 'shop';
    document.getElementById('shopNumberGroup').style.display = isShop ? 'block' : 'none';
    document.getElementById('perspectiveGroup').style.display = isShop ? 'none' : 'block';
});

// Переключение между всеми товарами и одним товаром
document.getElementById('operationProductType').addEventListener('change', function() {
    const isSingle = this.value === 'single';
    document.getElementById('singleProductGroup').style.display = isSingle ? 'block' : 'none';
});

// Отмена выполнения
document.getElementById('cancelExecuteOperations').addEventListener('click', function() {
    document.getElementById('executeOperationsModal').style.display = 'none';
    resetExecuteOperationsModal();
});

document.getElementById('confirmExecuteOperations').addEventListener('click', function() {
    // Существующие проверки...
    const divisionType = document.getElementById('operationDivisionType').value;
    const shopNumber = document.getElementById('operationShopNumber').value;
    const perspective = document.getElementById('operationPerspective').value;
    const startDateStr = document.getElementById('operationStartDate').value;
    const endDateStr = document.getElementById('operationEndDate').value;
    const operationsString = document.getElementById('operationNumbers').value;
    const productType = document.getElementById('operationProductType').value;
    const singleProduct = document.getElementById('operationSingleProduct').value;
    const format = document.getElementById('operationFormat').value;
    const printTotalsOnly = document.getElementById('operationPrintTotalsOnly').checked;
    
    // Валидация дат
    const dateError = validateDateRange(startDateStr, endDateStr, 'Дата начала периода', 'Дата окончания периода');
    if (dateError) {
        showAlert(dateError, 'warning');
        return; // Важно: останавливаем выполнение
    }
    
    // Валидация операций
    const operationsError = validateOperations(operationsString);
    if (operationsError) {
        showAlert(operationsError, 'warning');
        return; // Важно: останавливаем выполнение
    }
    
    // Валидация номера магазина (если выбран)
    if (divisionType === 'shop') {
        if (!shopNumber.trim()) {
            showAlert('Введите номер магазина', 'warning');
            return; // Важно: останавливаем выполнение
        }
        if (!/^\d+$/.test(shopNumber.trim())) {
            showAlert('Номер магазина должен содержать только цифры', 'warning');
            return; // Важно: останавливаем выполнение
        }
    }
    
    // Валидация товара (если выбран один товар)
    if (productType === 'single' && !singleProduct.trim()) {
        showAlert('Введите название товара', 'warning');
        return; // Важно: останавливаем выполнение
    }
    
    // Блокируем кнопки и показываем загрузку
    document.getElementById('confirmExecuteOperations').disabled = true;
    document.getElementById('cancelExecuteOperations').disabled = true;
    document.getElementById('operationLoading').style.display = 'block';
    document.getElementById('operationResult').style.display = 'none';
    
    // Имитация загрузки
    let progress = 0;
    const progressBar = document.getElementById('operationProgressBar');
    progressBar.style.width = '0%';
    
    const progressInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            try {
                // Генерируем данные (подразделение берем из формы)
                const divisionType = document.getElementById('operationDivisionType')?.value || 'shop';
                const shopNumber = document.getElementById('operationShopNumber')?.value?.trim() || '';
                const perspective = document.getElementById('operationPerspective')?.value || 'all';

                const operationData = generateOperationsData(
                    divisionType,
                    shopNumber,
                    perspective,
                    startDateStr,
                    endDateStr,
                    operationsString,
                    productType,
                    singleProduct,
                    printTotalsOnly
                );
                
                // Показываем результат
                showOperationsResult(operationData);
                
                // Выполняем выгрузку в выбранном формате
                executeOperationsExport(format, operationData);
                
                // Восстанавливаем кнопки
                document.getElementById('confirmExecuteOperations').disabled = false;
                document.getElementById('cancelExecuteOperations').disabled = false;
                
                // Уведомление
                showAlert(`Выполнение хозяйственных операций завершено`, 'success');
                
            } catch (error) {
                console.error('Ошибка:', error);
                document.getElementById('confirmExecuteOperations').disabled = false;
                document.getElementById('cancelExecuteOperations').disabled = false;
                document.getElementById('operationLoading').style.display = 'none';
                showAlert('Ошибка при выполнении операций', 'danger');
            }
        }
    }, 150);
});

// Генерация данных об операциях
function generateOperationsData(divisionType, shopNumber, perspective, startDate, endDate, operationNumbers, productType, singleProduct, printTotalsOnly) {
    // Нормализуем даты (из input обычно приходят строки)
    startDate = normalizeToDate(startDate);
    endDate = normalizeToDate(endDate);
    // Если даты перепутаны — меняем местами
    if (endDate.getTime() < startDate.getTime()) {
        const tmp = startDate;
        startDate = endDate;
        endDate = tmp;
    }

    // operationNumbers может прийти строкой из формы (например "101, 102 103")
    // или числом. Нормализуем до массива строк.
    function normalizeOperationNumbers(val) {
        if (Array.isArray(val)) {
            return val.map(v => String(v).trim()).filter(Boolean);
        }
        if (val === null || val === undefined) return [];
        if (typeof val === 'number') return [String(val)];
        const str = String(val).trim();
        if (!str) return [];
        // Разделители: запятая/точка с запятой/пробел/перевод строки
        return str
            .split(/[\s,;]+/)
            .map(s => s.trim())
            .filter(Boolean);
    }

    const opList = normalizeOperationNumbers(operationNumbers);
    // Если ничего не ввели — формируем пустой отчёт, но без падения.
    if (!opList.length) {
        return {
            divisionInfo: divisionType === 'shop' ? `Магазин №${shopNumber}` : (perspective || 'Все подразделения'),
            period: `${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}`,
            operationNumbers: '',
            productType,
            printTotalsOnly,
            data: [],
            totals: { operations: 0, quantity: 0, amount: 0 }
        };
    }
    const data = [];
    let totalOperations = 0;
    let totalAmount = 0;
    let totalQuantity = 0;
    
    // Определяем подразделение
    let divisionInfo = '';
    if (divisionType === 'shop') {
        divisionInfo = `Магазин №${shopNumber}`;
    } else {
        const perspectiveNames = {
            'all': 'Все подразделения',
            'north': 'Северный округ',
            'south': 'Южный округ',
            'center': 'Центральный округ',
            'east': 'Восточный округ'
        };
        divisionInfo = perspectiveNames[perspective] || perspective;
    }
    
    // Примерные товары для операций
    const allProducts = [
	...productData.alcohol,
    ...productData.beer,
    ...productData.cigarettes,
    ...productData.general,
        'Рис круглозерный 1кг', 'Гречка 1кг', 'Макароны 500г', 'Молоко 2.5% 1л',
        'Сыр Российский 1кг', 'Курица тушка 1.5кг', 'Картофель 1кг', 'Яблоки 1кг',
        'Вода минеральная 1.5л', 'Шоколад молочный 100г', 'Чай черный 100г',
        'Кофе молотый 250г', 'Сахар 1кг', 'Соль 1кг', 'Масло подсолнечное 1л'
    ];
    
    // Определяем товары для отчета
    let products = [];
    if (productType === 'single') {
        products = [singleProduct];
    } else {
        products = allProducts;
    }
    
    // Генерируем данные для каждой операции
    opList.forEach(opNumber => {
        // Для каждой операции создаем записи по товарам или итоги
        if (printTotalsOnly) {
            // Только итоги по операции
            const opQuantity = Math.floor(Math.random() * 1000) + 100;
            const opAmount = Math.floor(Math.random() * 500000) + 50000;
            
            data.push({
                operation: opNumber,
                type: 'Итог операции',
                product: '-',
                quantity: opQuantity,
                amount: opAmount,
                unit: 'шт',
                price: opAmount / opQuantity,
                date: getRandomDate(startDate, endDate).toLocaleDateString('ru-RU')
            });
            
            totalOperations++;
            totalQuantity += opQuantity;
            totalAmount += opAmount;
        } else {
            // Детализация по товарам
            products.forEach(product => {
                const quantity = Math.floor(Math.random() * 100) + 10;
                const price = Math.floor(Math.random() * 500) + 50;
                const amount = quantity * price;
                const unit = product.includes('кг') || product.includes('л') ? 'кг/л' : 'шт';
                
                data.push({
                    operation: opNumber,
                    type: 'Хоз. операция',
                    product: product,
                    quantity: quantity,
                    amount: amount,
                    unit: unit,
                    price: price,
                    date: getRandomDate(startDate, endDate).toLocaleDateString('ru-RU')
                });
                
                totalOperations++;
                totalQuantity += quantity;
                totalAmount += amount;
            });
        }
    });
    
    return {
        data: data,
        divisionInfo: divisionInfo,
        period: `${startDate.toLocaleDateString('ru-RU')} - ${endDate.toLocaleDateString('ru-RU')}`,
        operationNumbers: opList.join(', '),
        productType: productType === 'single' ? `Товар: ${singleProduct}` : 'Все товары',
        printTotalsOnly: printTotalsOnly,
        totals: {
            operations: totalOperations,
            quantity: totalQuantity,
            amount: totalAmount
        }
    };
}

// Нормализация даты из разных форматов (Date | timestamp | "YYYY-MM-DD" | "DD.MM.YYYY" | "DD/MM/YYYY")
function normalizeToDate(value) {
    if (value instanceof Date) return value;
    if (typeof value === 'number') {
        const d = new Date(value);
        return isNaN(d.getTime()) ? new Date() : d;
    }
    if (value === null || value === undefined) return new Date();

    const str = String(value).trim();
    if (!str) return new Date();

    // DD.MM.YYYY или DD/MM/YYYY
    const m = str.match(/^\s*(\d{1,2})[./-](\d{1,2})[./-](\d{4})\s*$/);
    if (m) {
        const day = parseInt(m[1], 10);
        const month = parseInt(m[2], 10) - 1;
        const year = parseInt(m[3], 10);
        const d = new Date(year, month, day);
        return isNaN(d.getTime()) ? new Date() : d;
    }

    // ISO / прочие форматы
    const d = new Date(str);
    return isNaN(d.getTime()) ? new Date() : d;
}

// Вспомогательная функция для получения случайной даты в диапазоне
function getRandomDate(start, end) {
    const s = normalizeToDate(start);
    const e = normalizeToDate(end);
    const sTime = s.getTime();
    const eTime = e.getTime();
    if (!isFinite(sTime) || !isFinite(eTime)) return new Date();
    const min = Math.min(sTime, eTime);
    const max = Math.max(sTime, eTime);
    return new Date(min + Math.random() * (max - min));
}

// Показать результат операций
function showOperationsResult(operationsData) {
    let html = `
        <p><strong>Подразделение:</strong> ${operationsData.divisionInfo}</p>
        <p><strong>Период:</strong> ${operationsData.period}</p>
        <p><strong>Операции:</strong> ${operationsData.operationNumbers}</p>
        <p><strong>Товары:</strong> ${operationsData.productType}</p>
        <p><strong>Режим:</strong> ${operationsData.printTotalsOnly ? 'Только итоги' : 'Полная детализация'}</p>
        <hr>
    `;
    
    if (operationsData.printTotalsOnly) {
        // Только итоги
        html += `
            <table style="width:100%; border-collapse:collapse; margin-top:10px;">
                <thead>
                    <tr style="background:#f2f2f2;">
                        <th style="padding:8px; border:1px solid #ddd;">Операция</th>
                        <th style="padding:8px; border:1px solid #ddd;">Тип</th>
                        <th style="padding:8px; border:1px solid #ddd;">Дата</th>
                        <th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>
                        <th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>
                        <th style="padding:8px; border:1px solid #ddd; text-align:right;">Ср. цена, ₽</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        operationsData.data.forEach(item => {
            html += `
                <tr>
                    <td style="padding:8px; border:1px solid #ddd;">${item.operation}</td>
                    <td style="padding:8px; border:1px solid #ddd;">${item.type}</td>
                    <td style="padding:8px; border:1px solid #ddd;">${item.date}</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)} ${item.unit}</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.price)}</td>
                </tr>
            `;
        });
    } else {
        // Полная детализация
        html += `
            <table style="width:100%; border-collapse:collapse; margin-top:10px;">
                <thead>
                    <tr style="background:#f2f2f2;">
                        <th style="padding:8px; border:1px solid #ddd;">Операция</th>
                        <th style="padding:8px; border:1px solid #ddd;">Товар</th>
                        <th style="padding:8px; border:1px solid #ddd;">Ед.</th>
                        <th style="padding:8px; border:1px solid #ddd;">Дата</th>
                        <th style="padding:8px; border:1px solid #ddd; text-align:right;">Кол-во</th>
                        <th style="padding:8px; border:1px solid #ddd; text-align:right;">Цена, ₽</th>
                        <th style="padding:8px; border:1px solid #ddd; text-align:right;">Сумма, ₽</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        operationsData.data.forEach(item => {
            html += `
                <tr>
                    <td style="padding:8px; border:1px solid #ddd;">${item.operation}</td>
                    <td style="padding:8px; border:1px solid #ddd;">${item.product}</td>
                    <td style="padding:8px; border:1px solid #ddd;">${item.unit}</td>
                    <td style="padding:8px; border:1px solid #ddd;">${item.date}</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.quantity)}</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.price)}</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(item.amount)}</td>
                </tr>
            `;
        });
    }
    
    html += `
            </tbody>
            <tfoot>
                <tr style="background:#e8f5e8; font-weight:bold;">
                    <td style="padding:8px; border:1px solid #ddd;" colspan="${operationsData.printTotalsOnly ? '3' : '4'}">Итого:</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(operationsData.totals.quantity)} ${operationsData.printTotalsOnly ? 'шт' : ''}</td>
    `;
    
    if (operationsData.printTotalsOnly) {
        html += `
                    <td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(operationsData.totals.amount)}</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">${formatNumber(operationsData.totals.amount / operationsData.totals.quantity)}</td>
        `;
    } else {
        html += `
                    <td style="padding:8px; border:1px solid #ddd; text-align:right;">-</td>
                    <td style="padding:8px; border:1px solid #ddd; text-align:right; color:#27ae60;">${formatNumber(operationsData.totals.amount)}</td>
        `;
    }
    
    html += `
                </tr>
            </tfoot>
        </table>
        
        <div style="margin-top:15px; padding:10px; background:#e8f5e8; border-radius:5px;">
            <p style="margin:0; color:#27ae60;"><i class="fas fa-check-circle"></i> Операции выполнены успешно</p>
            <p style="margin:5px 0 0 0; font-size:12px;">Выполнено операций: ${operationsData.totals.operations}</p>
        </div>
    `;
    
    document.getElementById('operationResultContent').innerHTML = html;
    document.getElementById('operationLoading').style.display = 'none';
    document.getElementById('operationResult').style.display = 'block';
}

// Выполнить выгрузку операций в нужном формате
function executeOperationsExport(format, operationsData) {
    // Подготовка данных для выгрузки
    let fileContent = '\uFEFF'; // UTF-8 BOM
    
    fileContent += 'ХОЗЯЙСТВЕННЫЕ ОПЕРАЦИИ\r\n\r\n';
    fileContent += `Подразделение: ${operationsData.divisionInfo}\r\n`;
    fileContent += `Период: ${operationsData.period}\r\n`;
    fileContent += `Операции: ${operationsData.operationNumbers}\r\n`;
    fileContent += `Товары: ${operationsData.productType}\r\n`;
    fileContent += `Режим: ${operationsData.printTotalsOnly ? 'Только итоги' : 'Полная детализация'}\r\n\r\n`;
    
    // Заголовки столбцов
    let headers = '';
    if (operationsData.printTotalsOnly) {
        headers = 'Операция;Тип;Дата;Количество;Сумма, ₽;Средняя цена, ₽\r\n';
    } else {
        headers = 'Операция;Товар;Ед.изм.;Дата;Количество;Цена, ₽;Сумма, ₽\r\n';
    }
    
    fileContent += headers;
    
    // Данные
    operationsData.data.forEach(item => {
        if (operationsData.printTotalsOnly) {
            fileContent += `${item.operation};${item.type};${item.date};${item.quantity} ${item.unit};${formatNumber(item.amount)};${formatNumber(item.price)}\r\n`;
        } else {
            fileContent += `${item.operation};${item.product};${item.unit};${item.date};${item.quantity};${formatNumber(item.price)};${formatNumber(item.amount)}\r\n`;
        }
    });
    
    fileContent += `\r\nИтого;${operationsData.totals.quantity};${formatNumber(operationsData.totals.amount)}\r\n\r\n`;
    fileContent += `Сформировано: ${new Date().toLocaleString('ru-RU')}\r\n`;
    fileContent += 'Система управления инвентаризацией - Кировский';
    
    // Создание файла
    let mimeType, fileExt;
    
    if (format === 'excel') {
        mimeType = 'text/csv;charset=utf-8';
        fileExt = 'csv';
    } else if (format === 'wordpad') {
        // Для WordPad - текстовый файл с табуляцией
        let txtContent = 'ХОЗЯЙСТВЕННЫЕ ОПЕРАЦИИ\n\n';
        txtContent += `Подразделение: ${operationsData.divisionInfo}\n`;
        txtContent += `Период: ${operationsData.period}\n`;
        txtContent += `Операции: ${operationsData.operationNumbers}\n`;
        txtContent += `Товары: ${operationsData.productType}\n`;
        txtContent += `Режим: ${operationsData.printTotalsOnly ? 'Только итоги' : 'Полная детализация'}\n\n`;
        
        // Данные с табуляцией
        if (operationsData.printTotalsOnly) {
            txtContent += 'Операция\tТип\tДата\tКоличество\tСумма, ₽\tСредняя цена, ₽\n';
            operationsData.data.forEach(item => {
                txtContent += `${item.operation}\t${item.type}\t${item.date}\t${item.quantity} ${item.unit}\t${formatNumber(item.amount)}\t${formatNumber(item.price)}\n`;
            });
        } else {
            txtContent += 'Операция\tТовар\tЕд.изм.\tДата\tКоличество\tЦена, ₽\tСумма, ₽\n';
            operationsData.data.forEach(item => {
                txtContent += `${item.operation}\t${item.product}\t${item.unit}\t${item.date}\t${item.quantity}\t${formatNumber(item.price)}\t${formatNumber(item.amount)}\n`;
            });
        }
        
        txtContent += `\nИтого:\t${operationsData.totals.quantity}\t${formatNumber(operationsData.totals.amount)}\n\n`;
        txtContent += `Сформировано: ${new Date().toLocaleString('ru-RU')}\n`;
        txtContent += 'Система управления инвентаризацией - Кировский';
        
        fileContent = txtContent;
        mimeType = 'text/plain;charset=utf-8';
        fileExt = 'txt';
    }
    
    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // Формируем имя файла
    let fileName = 'Хоз_операции_';
    if (operationsData.divisionInfo.includes('Магазин')) {
        fileName += operationsData.divisionInfo.replace('Магазин №', 'Магазин');
    } else {
        fileName += operationsData.divisionInfo.replace(/\s+/g, '_');
    }
    fileName += '_' + operationsData.period.replace(/\s+/g, '_').replace(/-/g, '_');
    fileName += '.' + fileExt;
    
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Сброс состояния модального окна операций
function resetExecuteOperationsModal() {
    document.getElementById('confirmExecuteOperations').disabled = false;
    document.getElementById('cancelExecuteOperations').disabled = false;
    document.getElementById('operationLoading').style.display = 'none';
    document.getElementById('operationResult').style.display = 'none';
    document.getElementById('operationProgressBar').style.width = '0%';
}

// Закрытие по крестику
document.querySelector('#executeOperationsModal .close').addEventListener('click', function() {
    document.getElementById('executeOperationsModal').style.display = 'none';
    resetExecuteOperationsModal();
});

// Закрытие по клику вне окна
window.addEventListener('click', function(e) {
    if (e.target.id === 'executeOperationsModal') {
        document.getElementById('executeOperationsModal').style.display = 'none';
        resetExecuteOperationsModal();
    }
});
            
	            // -------------------------
	            // Естественная убыль (выгрузка)
	            // -------------------------
	            function reportsDownloadTextFile(fileName, content, mimeType) {
	                const blob = new Blob([content], { type: mimeType || 'text/plain;charset=utf-8' });
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
	            }

	            function reportsGetProductsPool() {
	                try {
	                    if (typeof productDatabase !== 'undefined' && productDatabase) {
	                        return Object.entries(productDatabase).map(([barcode, p]) => ({
	                            barcode,
	                            name: p.name,
	                            price: Number(p.price) || 0,
	                            category: p.category || '',
	                            type: p.type || 'general'
	                        }));
	                    }
	                } catch (e) {}
	                // Фолбек, если базы нет
	                return [
	                    { barcode: '0000000000000', name: 'Товар (не найден в базе)', price: 0, category: '', type: 'general' }
	                ];
	            }

	            function reportsBuildCsv(headers, rows) {
	                const esc = (v) => {
	                    const s = (v === null || v === undefined) ? '' : String(v);
	                    if (/[";\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
	                    return s;
	                };
	                const lines = [];
	                lines.push(headers.map(esc).join(';'));
	                rows.forEach(r => lines.push(r.map(esc).join(';')));
	                // BOM для Excel
	                return '\uFEFF' + lines.join('\n');
	            }

	            function reportsGenerateNaturalLossRows(startDate, endDate) {
	                const pool = reportsGetProductsPool();
	                const rows = [];
	                const count = Math.min(120, Math.max(25, Math.floor(Math.random() * 90) + 25));
	                for (let i = 0; i < count; i++) {
	                    const p = pool[Math.floor(Math.random() * pool.length)];
	                    const qty = Math.floor(Math.random() * 30) + 1;
	                    const norm = (Math.random() * 1.8 + 0.1); // 0.1% - 1.9%
	                    const amount = (Number(p.price) || 0) * qty;
	                    rows.push({
	                        date: startDate,
	                        product: p.name,
	                        barcode: p.barcode,
	                        qty,
	                        norm: norm.toFixed(2) + '%',
	                        price: Number(p.price) || 0,
	                        amount
	                    });
	                }
	                return rows;
	            }

	            (function initNaturalLossModal() {
	                const openBtn = document.getElementById('uploadNaturalLossBtn');
	                const modal = document.getElementById('uploadNaturalLossModal');
	                if (!openBtn || !modal) return;

	                const startEl = document.getElementById('lossStartDate');
	                const endEl = document.getElementById('lossEndDate');
	                const formatEl = document.getElementById('lossFormat');
	                const confirmBtn = document.getElementById('confirmUploadNaturalLoss');
	                const cancelBtn = document.getElementById('cancelUploadNaturalLoss');
	                const loading = document.getElementById('lossLoading');
	                const result = document.getElementById('lossResult');
	                const resultContent = document.getElementById('lossResultContent');
	                const progressBar = document.getElementById('lossProgressBar');

	                function reset() {
	                    if (loading) loading.style.display = 'none';
	                    if (result) result.style.display = 'none';
	                    if (progressBar) progressBar.style.width = '0%';
	                    if (confirmBtn) confirmBtn.disabled = false;
	                    if (cancelBtn) cancelBtn.disabled = false;
	                }

	                openBtn.addEventListener('click', function() {
	                    modal.style.display = 'flex';
	                    const today = new Date();
	                    if (startEl) startEl.valueAsDate = today;
	                    if (endEl) endEl.valueAsDate = today;
	                    reset();
	                });

	                const closeEl = modal.querySelector('.close');
	                closeEl?.addEventListener('click', function() {
	                    modal.style.display = 'none';
	                    reset();
	                });

	                window.addEventListener('click', function(e) {
	                    if (e.target === modal) {
	                        modal.style.display = 'none';
	                        reset();
	                    }
	                });

	                cancelBtn?.addEventListener('click', function() {
	                    modal.style.display = 'none';
	                    reset();
	                });

	                confirmBtn?.addEventListener('click', function() {
	                    const startDate = startEl ? startEl.value : '';
	                    const endDate = endEl ? endEl.value : '';
	                    const format = formatEl ? formatEl.value : 'wordpad';
	
	                    if (!startDate || !endDate) {
	                        showAlert('Выберите период (дата начала и дата окончания)', 'warning');
	                        return;
	                    }
	
	                    confirmBtn.disabled = true;
	                    cancelBtn && (cancelBtn.disabled = true);
	                    result && (result.style.display = 'none');
	                    loading && (loading.style.display = 'block');

	                    let p = 0;
	                    const t = setInterval(function() {
	                        p += 12 + Math.floor(Math.random() * 10);
	                        if (p > 100) p = 100;
	                        progressBar && (progressBar.style.width = p + '%');
	
	                        if (p >= 100) {
	                            clearInterval(t);
	                            loading && (loading.style.display = 'none');
	
	                            const rows = reportsGenerateNaturalLossRows(startDate, endDate);
	                            const totalAmount = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);
	
	                            // Экспорт
	                            const ts = new Date().toISOString().slice(0, 10).replace(/-/g, '');
	                            if (format === 'excel') {
	                                const headers = ['Дата', 'Товар', 'Штрихкод', 'Норма', 'Кол-во', 'Цена', 'Сумма'];
	                                const csvRows = rows.map(r => [r.date, r.product, r.barcode, r.norm, r.qty, (Number(r.price) || 0), (Number(r.amount) || 0)]);
	                                const csv = reportsBuildCsv(headers, csvRows);
	                                reportsDownloadTextFile(`Естественная_убыль_${ts}.csv`, csv, 'text/csv;charset=utf-8');
	                            } else {
	                                let txt = 'ЕСТЕСТВЕННАЯ УБЫЛЬ\n\n';
	                                txt += `Период: ${startDate} — ${endDate}\n`;
	                                txt += `Строк: ${rows.length}\n`;
	                                txt += `Итого (сумма): ${formatNumber(totalAmount)}\n\n`;
	                                txt += 'Дата\tТовар\tШтрихкод\tНорма\tКол-во\tЦена\tСумма\n';
	                                rows.forEach(r => {
	                                    txt += `${r.date}\t${r.product}\t${r.barcode}\t${r.norm}\t${r.qty}\t${formatNumber(r.price)}\t${formatNumber(r.amount)}\n`;
	                                });
	                                reportsDownloadTextFile(`Естественная_убыль_${ts}.txt`, txt, 'text/plain;charset=utf-8');
	                            }

	                            if (resultContent) {
	                                const lines = [
	                                    'Период: ' + startDate + ' — ' + endDate,
	                                    'Формат: ' + String(format).toUpperCase(),
	                                    'Статус: готово',
	                                    'Строк выгружено: ' + rows.length,
	                                    'Итого сумма: ' + formatNumber(totalAmount)
	                                ];
	                                resultContent.innerHTML = '<ul style="margin:0; padding-left: 18px;">' +
	                                    lines.map(function(x) { return '<li>' + x + '</li>'; }).join('') +
	                                    '</ul>';
	                            }
	                            result && (result.style.display = 'block');
	
	                            showAlert('Выгрузка данных по естественной убыли успешно сформирована', 'success');
	                            confirmBtn.disabled = false;
	                            cancelBtn && (cancelBtn.disabled = false);
	                        }
	                    }, 180);
	                });
	            })();

	            // -------------------------
	            // Отходы (выгрузка)
	            // -------------------------
	            function reportsGenerateWasteRows(startDate, endDate) {
	                const pool = reportsGetProductsPool();
	                const rows = [];
	                const count = Math.min(120, Math.max(25, Math.floor(Math.random() * 90) + 25));
	                for (let i = 0; i < count; i++) {
	                    const p = pool[Math.floor(Math.random() * pool.length)];
	                    const qty = Math.floor(Math.random() * 15) + 1;
	                    const amount = (Number(p.price) || 0) * qty;
	                    rows.push({
	                        date: startDate,
	                        product: p.name,
	                        barcode: p.barcode,
	                        qty,
	                        price: Number(p.price) || 0,
	                        amount
	                    });
	                }
	                return rows;
	            }

	            (function initWasteModal() {
	                const openBtn = document.getElementById('wasteBtn');
	                const modal = document.getElementById('wasteModal');
	                if (!openBtn || !modal) return;

	                const startEl = document.getElementById('wasteStartDate');
	                const endEl = document.getElementById('wasteEndDate');
	                const formatEl = document.getElementById('wasteFormat');
	                const confirmBtn = document.getElementById('confirmWaste');
	                const cancelBtn = document.getElementById('cancelWaste');
	                const loading = document.getElementById('wasteLoading');
	                const result = document.getElementById('wasteResult');
	                const resultContent = document.getElementById('wasteResultContent');
	                const progressBar = document.getElementById('wasteProgressBar');

	                function reset() {
	                    if (loading) loading.style.display = 'none';
	                    if (result) result.style.display = 'none';
	                    if (progressBar) progressBar.style.width = '0%';
	                    if (confirmBtn) confirmBtn.disabled = false;
	                    if (cancelBtn) cancelBtn.disabled = false;
	                }

	                openBtn.addEventListener('click', function() {
	                    modal.style.display = 'flex';
	                    const today = new Date();
	                    if (startEl) startEl.valueAsDate = today;
	                    if (endEl) endEl.valueAsDate = today;
	                    reset();
	                });

	                const closeEl = modal.querySelector('.close');
	                closeEl?.addEventListener('click', function() {
	                    modal.style.display = 'none';
	                    reset();
	                });

	                window.addEventListener('click', function(e) {
	                    if (e.target === modal) {
	                        modal.style.display = 'none';
	                        reset();
	                    }
	                });

	                cancelBtn?.addEventListener('click', function() {
	                    modal.style.display = 'none';
	                    reset();
	                });

	                confirmBtn?.addEventListener('click', function() {
	                    const startDate = startEl ? startEl.value : '';
	                    const endDate = endEl ? endEl.value : '';
	                    const format = formatEl ? formatEl.value : 'wordpad';
	
	                    if (!startDate || !endDate) {
	                        showAlert('Выберите период (дата начала и дата окончания)', 'warning');
	                        return;
	                    }
	
	                    confirmBtn.disabled = true;
	                    cancelBtn && (cancelBtn.disabled = true);
	                    result && (result.style.display = 'none');
	                    loading && (loading.style.display = 'block');
	
	                    let p = 0;
	                    const t = setInterval(function() {
	                        p += 12 + Math.floor(Math.random() * 10);
	                        if (p > 100) p = 100;
	                        progressBar && (progressBar.style.width = p + '%');
	
	                        if (p >= 100) {
	                            clearInterval(t);
	                            loading && (loading.style.display = 'none');
	
	                            const rows = reportsGenerateWasteRows(startDate, endDate);
	                            const totalAmount = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);
	
	                            const ts = new Date().toISOString().slice(0, 10).replace(/-/g, '');
	                            if (format === 'excel') {
	                                const headers = ['Дата', 'Товар', 'Штрихкод', 'Кол-во', 'Цена', 'Сумма'];
	                                const csvRows = rows.map(r => [r.date, r.product, r.barcode, r.qty, (Number(r.price) || 0), (Number(r.amount) || 0)]);
	                                const csv = reportsBuildCsv(headers, csvRows);
	                                reportsDownloadTextFile(`Отходы_${ts}.csv`, csv, 'text/csv;charset=utf-8');
	                            } else {
	                                let txt = 'ОТХОДЫ\n\n';
	                                txt += `Период: ${startDate} — ${endDate}\n`;
	                                txt += `Строк: ${rows.length}\n`;
	                                txt += `Итого (сумма): ${formatNumber(totalAmount)}\n\n`;
	                                txt += 'Дата\tТовар\tШтрихкод\tКол-во\tЦена\tСумма\n';
	                                rows.forEach(r => {
	                                    txt += `${r.date}\t${r.product}\t${r.barcode}\t${r.qty}\t${formatNumber(r.price)}\t${formatNumber(r.amount)}\n`;
	                                });
	                                reportsDownloadTextFile(`Отходы_${ts}.txt`, txt, 'text/plain;charset=utf-8');
	                            }
	
	                            if (resultContent) {
	                                const lines = [
	                                    'Период: ' + startDate + ' — ' + endDate,
	                                    'Формат: ' + String(format).toUpperCase(),
	                                    'Статус: готово',
	                                    'Строк выгружено: ' + rows.length,
	                                    'Итого сумма: ' + formatNumber(totalAmount)
	                                ];
	                                resultContent.innerHTML = '<ul style="margin:0; padding-left: 18px;">' +
	                                    lines.map(function(x) { return '<li>' + x + '</li>'; }).join('') +
	                                    '</ul>';
	                            }
	                            result && (result.style.display = 'block');
	
	                            showAlert('Выгрузка данных по отходам успешно сформирована', 'success');
	                            confirmBtn.disabled = false;
	                            cancelBtn && (cancelBtn.disabled = false);
	                        }
	                    }, 180);
	                });
	            })();

        }

        // Инициализация экрана входа
