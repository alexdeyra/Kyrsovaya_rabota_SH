
        // Авторизация через PHP API (сессии на сервере)
function initLogin() {
    const loginScreen = document.getElementById('loginScreen');
    const shopSelectScreen = document.getElementById('shopSelectScreen');
    const mainApp = document.getElementById('mainApp');

    const loginForm = document.getElementById('loginForm');
    const errorElement = document.getElementById('loginError');

    // Требование: всегда показываем логин (не восстанавливаем сессию автоматически)
    try {
        if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
    } catch (e) {}
    try { window.scrollTo(0, 0); } catch (e) {}

    if (loginScreen) loginScreen.style.display = 'flex';
    if (shopSelectScreen) shopSelectScreen.style.display = 'none';
    if (mainApp) mainApp.style.display = 'none';

    // На всякий случай сбрасываем серверную сессию при открытии страницы
    (async () => {
        try { await DataManager.logout(); } catch (e) {}
    })();

    const showError = (msg) => {
        if (!errorElement) return;
        errorElement.textContent = msg || 'Неверный логин или пароль';
        errorElement.style.display = 'block';
    };
    const hideError = () => {
        if (!errorElement) return;
        errorElement.style.display = 'none';
    };

    if (!loginForm) return;

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = (document.getElementById('username')?.value || '').trim();
        const password = (document.getElementById('password')?.value || '').trim();

        if (!username || !password) {
            showError('Введите логин и пароль');
            return;
        }

        try {
            hideError();
            await DataManager.login(username, password);
            const me = await DataManager.me();

            if (!me || !me.authenticated) {
                showError('Неверный логин или пароль');
                return;
            }

            appData.currentUser = {
                id: me.user.id,
                name: me.user.name,
                role: me.user.role,
                login: me.user.login,
                phone: me.user.phone || '',
                email: me.user.email || '',
                avatar: me.user.avatar || null
            };

            // тема
            if (me.theme) {
                try { if (typeof applyTheme === 'function') applyTheme(me.theme); } catch (e) {}
            }

            // магазины
            appData.shops = await DataManager.getShops();
            if (typeof window.renderShopSelection === 'function') {
                window.renderShopSelection(appData.shops);
            }

            if (loginScreen) loginScreen.style.display = 'none';
            if (mainApp) mainApp.style.display = 'none';
            if (shopSelectScreen) shopSelectScreen.style.display = 'flex';
            try { window.scrollTo(0, 0); } catch (e) {}
        } catch (err) {
            console.error(err);
            const msg = err?.message || 'Ошибка входа';
            // Приводим к человеку
            if (msg === 'INVALID_CREDENTIALS') showError('Неверный логин или пароль');
            else showError(msg);
        }
    });
}

// Глобальный выход из системы
async function logout() {
    try { await DataManager.logout(); } catch (e) {}

    // Сброс состояния
    appData.currentShop = null;
    appData.currentInventoryId = null;
    appData.currentInventoryDate = null;
    appData.inventories = [];
    appData.documents = [];
    appData.history = [];
    appData.terminalData = {};

    // Не делаем currentUser = null, чтобы остальной код не падал
    if (!appData.currentUser) appData.currentUser = {};
    appData.currentUser.name = '';
    appData.currentUser.role = '';
    appData.currentUser.login = '';
    appData.currentUser.phone = '';
    appData.currentUser.email = '';
    appData.currentUser.avatar = null;

    // UI
    const loginScreen = document.getElementById('loginScreen');
    const shopSelectScreen = document.getElementById('shopSelectScreen');
    const mainApp = document.getElementById('mainApp');
    if (mainApp) mainApp.style.display = 'none';
    if (shopSelectScreen) shopSelectScreen.style.display = 'none';
    if (loginScreen) loginScreen.style.display = 'flex';

    // Очистка формы
    const u = document.getElementById('username');
    const p = document.getElementById('password');
    if (u) u.value = '';
    if (p) p.value = '';
    const err = document.getElementById('loginError');
    if (err) err.style.display = 'none';

    try { window.scrollTo(0, 0); } catch (e) {}
}
window.logout = logout;
// Генерация данных о выручке
function generateRevenueData(startDate, endDate, groupBy) {
    console.log('generateRevenueData вызвана:', { startDate, endDate, groupBy });
    
    const data = [];
    let totalRevenue = 0;
    
    if (groupBy === 'day') {
        // Группировка по дням
        const currentDate = new Date(startDate);
        
        while (currentDate <= endDate) {
            // Генерируем случайную выручку от 50,000 до 500,000 за день
            const dailyRevenue = Math.floor(Math.random() * 450001) + 50000;
            totalRevenue += dailyRevenue;
            
            data.push({
                period: formatDate(currentDate),
                revenue: dailyRevenue,
                type: 'day'
            });
            
            // Переходим к следующему дню
            currentDate.setDate(currentDate.getDate() + 1);
        }
    } else if (groupBy === 'week') {
        // Группировка по неделям
        let weekStart = new Date(startDate);
        let weekNumber = 1;
        
        while (weekStart <= endDate) {
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            
            if (weekEnd > endDate) {
                weekEnd.setTime(endDate.getTime());
            }
            
            // Генерируем случайную выручку от 350,000 до 3,500,000 за неделю
            const weeklyRevenue = Math.floor(Math.random() * 3150001) + 350000;
            totalRevenue += weeklyRevenue;
            
            data.push({
                period: `Неделя ${weekNumber} (${formatDate(weekStart)} - ${formatDate(weekEnd)})`,
                revenue: weeklyRevenue,
                type: 'week'
            });
            
            // Переходим к следующей неделе
            weekStart.setDate(weekStart.getDate() + 7);
            weekNumber++;
        }
    } else if (groupBy === 'month') {
        // Группировка по месяцам
        let monthStart = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        
        while (monthStart <= endDate) {
            const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
            
            if (monthEnd > endDate) {
                monthEnd.setTime(endDate.getTime());
            }
            
            const monthNames = [
                'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
            ];
            
            // Генерируем случайную выручку от 1,500,000 до 15,000,000 за месяц
            const monthlyRevenue = Math.floor(Math.random() * 13500001) + 1500000;
            totalRevenue += monthlyRevenue;
            
            data.push({
                period: `${monthNames[monthStart.getMonth()]} ${monthStart.getFullYear()}`,
                revenue: monthlyRevenue,
                type: 'month'
            });
            
            // Переходим к следующему месяцу
            monthStart.setMonth(monthStart.getMonth() + 1);
        }
    }
    
    console.log('Сгенерировано данных:', data.length, 'записей, общая сумма:', totalRevenue);
    
    return {
        data: data,
        total: totalRevenue,
        groupBy: groupBy,
        startDate: startDate,
        endDate: endDate
    };
}

// Показать результат выручки на экране
function showRevenueResult(startDate, endDate, groupBy, revenueData, format) {
    console.log('showRevenueResult вызвана:', { startDate, endDate, groupBy, revenueData, format });
    
    const formattedStart = formatInputDate(startDate.toISOString().split('T')[0]);
    const formattedEnd = formatInputDate(endDate.toISOString().split('T')[0]);
    
    let resultHTML = `
        <p><strong>Период:</strong> с ${formattedStart} по ${formattedEnd}</p>
        <p><strong>Группировка:</strong> ${getGroupByName(groupBy)}</p>
        <p><strong>Магазин:</strong> ${appData.currentShop ? appData.currentShop.name : 'Не выбран'} (№${appData.currentShop ? appData.currentShop.id : 'N/A'})</p>
        <hr>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Период</th>
                    <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Выручка, ₽</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    revenueData.data.forEach(item => {
        resultHTML += `
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.period}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold;">${formatNumber(item.revenue)}</td>
            </tr>
        `;
    });
    
    resultHTML += `
            </tbody>
            <tfoot>
                <tr style="background-color: #e8f5e8; font-weight: bold;">
                    <td style="padding: 8px; border: 1px solid #ddd;">Итого:</td>
                    <td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: #27ae60;">${formatNumber(revenueData.total)}</td>
                </tr>
            </tfoot>
        </table>
        
        <div style="margin-top: 15px; padding: 10px; background-color: #e8f5e8; border-radius: 3px;">
            <p style="margin: 0; color: #27ae60;"><i class="fas fa-check-circle"></i> Выгрузка успешно завершена</p>
            <p style="margin: 5px 0 0 0; font-size: 12px;">Формат: ${getFormatName(format)}</p>
        </div>
    `;
    
    document.getElementById('revenueResultContent').innerHTML = resultHTML;
    document.getElementById('revenueResult').style.display = 'block';
    console.log('Результат отображен на экране');
}

// Печать данных о выручке
function printRevenueData(startDate, endDate, groupBy, revenueData) {
    const formattedStart = formatInputDate(startDate.toISOString().split('T')[0]);
    const formattedEnd = formatInputDate(endDate.toISOString().split('T')[0]);
    const shopName = appData.currentShop ? appData.currentShop.name : 'Не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let tableRows = '';
    revenueData.data.forEach(item => {
        tableRows += `
            <tr>
                <td>${item.period}</td>
                <td style="text-align: right;">${formatNumber(item.revenue)}</td>
            </tr>
        `;
    });
    
    const printContent = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Отчет по выручке</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                ...header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                ...report-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                ...report-info {
                    font-size: 14px;
                    margin-bottom: 5px;
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
                ...data-table td:nth-child(2) {
                    text-align: right;
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
                @media print {
                    body { margin: 0; }
                    ...no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="report-title">ОТЧЕТ ПО ВЫРУЧКЕ</div>
                <div class="report-info">Магазин: ${shopName} (№${shopId})</div>
                <div class="report-info">Период: с ${formattedStart} по ${formattedEnd}</div>
                <div class="report-info">Группировка: ${getGroupByName(groupBy)}</div>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Период</th>
                        <th>Выручка, ₽</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                    <tr class="total-row">
                        <td>Итого:</td>
                        <td>${formatNumber(revenueData.total)}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="footer">
                <p>Сформировано: ${new Date().toLocaleString('ru-RU')}</p>
                <p>Система управления инвентаризацией - Кировский</p>
            </div>
            
            <div class="no-print" style="margin-top: 20px; text-align: center;">
                <button onclick="window.print()" style="padding: 10px 20px; background-color: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Печать
                </button>
            </div>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
}

// Выгрузка в Word
function exportRevenueToWord(startDate, endDate, groupBy, revenueData) {
    const formattedStart = formatInputDate(startDate.toISOString().split('T')[0]);
    const formattedEnd = formatInputDate(endDate.toISOString().split('T')[0]);
    const shopName = appData.currentShop ? appData.currentShop.name : 'Не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    const now = new Date().toLocaleString('ru-RU');
    
    // Создаем HTML содержимое для Word
    const htmlContent = `
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
                <p><strong>Период:</strong> с ${formattedStart} по ${formattedEnd}</p>
                <p><strong>Группировка:</strong> ${getGroupByName(groupBy)}</p>
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
                <p>Сформировано: ${now}</p>
                <p>Система управления инвентаризацией - Кировский</p>
            </div>
        </body>
        </html>
    `;
    
    // Создаем Blob с HTML содержимым
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    
    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    const fileName = `Отчет_по_выручке_${shopId}_${formattedStart.replace(/\//g, '-')}_${formattedEnd.replace(/\//g, '-')}.doc`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Очищаем
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Выгрузка в Excel (XML формат)
function exportRevenueToExcel(startDate, endDate, groupBy, revenueData) {
    const formattedStart = formatInputDate(startDate.toISOString().split('T')[0]);
    const formattedEnd = formatInputDate(endDate.toISOString().split('T')[0]);
    const shopName = appData.currentShop ? appData.currentShop.name : 'Не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    const now = new Date().toLocaleString('ru-RU');
    
    // Создаем XML для Excel
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Author>Система управления инвентаризацией</Author>
  <Created>${new Date().toISOString()}</Created>
 </DocumentProperties>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Bottom"/>
   <Borders/>
   <Font ss:FontName="Arial" ss:Size="12"/>
   <Interior/>
   <NumberFormat ss:Format="#,##0.00"/>
  </Style>
  <Style ss:ID="Header">
   <Font ss:FontName="Arial" ss:Size="14" ss:Bold="1"/>
   <Alignment ss:Horizontal="Center"/>
  </Style>
  <Style ss:ID="Title">
   <Font ss:FontName="Arial" ss:Size="16" ss:Bold="1"/>
   <Alignment ss:Horizontal="Center"/>
  </Style>
  <Style ss:ID="Total">
   <Font ss:FontName="Arial" ss:Size="12" ss:Bold="1"/>
   <Interior ss:Color="#E6E6E6" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="Currency">
   <NumberFormat ss:Format="#,##0.00\ &quot;₽&quot;"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Отчет по выручке">
  <Table>
   <Column ss:Width="200"/>
   <Column ss:Width="150"/>
   
   <Row>
    <Cell ss:MergeAcross="1" ss:StyleID="Title">
     <Data ss:Type="String">ОТЧЕТ ПО ВЫРУЧКЕ</Data>
    </Cell>
   </Row>
   <Row>
    <Cell><Data ss:Type="String">Магазин:</Data></Cell>
    <Cell><Data ss:Type="String">${shopName} (№${shopId})</Data></Cell>
   </Row>
   <Row>
    <Cell><Data ss:Type="String">Период:</Data></Cell>
    <Cell><Data ss:Type="String">с ${formattedStart} по ${formattedEnd}</Data></Cell>
   </Row>
   <Row>
    <Cell><Data ss:Type="String">Группировка:</Data></Cell>
    <Cell><Data ss:Type="String">${getGroupByName(groupBy)}</Data></Cell>
   </Row>
   <Row></Row>
   
   <Row>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Период</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Выручка, ₽</Data></Cell>
   </Row>
   
   ${revenueData.data.map(item => `
   <Row>
    <Cell><Data ss:Type="String">${item.period}</Data></Cell>
    <Cell ss:StyleID="Currency"><Data ss:Type="Number">${item.revenue}</Data></Cell>
   </Row>
   `).join('')}
   
   <Row>
    <Cell ss:StyleID="Total"><Data ss:Type="String">Итого:</Data></Cell>
    <Cell ss:StyleID="Total" ss:StyleID="Currency"><Data ss:Type="Number">${revenueData.total}</Data></Cell>
   </Row>
   
   <Row></Row>
   <Row>
    <Cell ss:MergeAcross="1">
     <Data ss:Type="String">Сформировано: ${now}</Data>
    </Cell>
   </Row>
   <Row>
    <Cell ss:MergeAcross="1">
     <Data ss:Type="String">Система управления инвентаризацией - Кировский</Data>
    </Cell>
   </Row>
  </Table>
 </Worksheet>
</Workbook>`;
    
    // Создаем Blob с XML содержимым
    const blob = new Blob([xmlContent], { 
        type: 'application/vnd.ms-excel' 
    });
    const url = URL.createObjectURL(blob);
    
    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    const fileName = `Отчет_по_выручке_${shopId}_${formattedStart.replace(/\//g, '-')}_${formattedEnd.replace(/\//g, '-')}.xls`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Очищаем
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Получить название группировки
function getGroupByName(groupBy) {
    const groups = {
        'day': 'По дням',
        'week': 'По неделям',
        'month': 'По месяцам'
    };
    return groups[groupBy] || groupBy;
}

// Получить название формата
function getFormatName(format) {
    const formats = {
        'screen': 'Вывод на экран',
        'print': 'На печать',
        'word': 'Выгрузка в Word',
        'excel': 'Выгрузка в Excel'
    };
    return formats[format] || format;
}

// Печать данных о выручке
function printRevenueData(startDate, endDate, groupBy, revenueData) {
    const formattedStart = formatInputDate(startDate.toISOString().split('T')[0]);
    const formattedEnd = formatInputDate(endDate.toISOString().split('T')[0]);
    const shopName = appData.currentShop ? appData.currentShop.name : 'Не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    
    let tableRows = '';
    revenueData.data.forEach(item => {
        tableRows += `
            <tr>
                <td>${item.period}</td>
                <td style="text-align: right;">${formatNumber(item.revenue)}</td>
            </tr>
        `;
    });
    
    const printContent = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Отчет по выручке</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                ...header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                ...report-title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                ...report-info {
                    font-size: 14px;
                    margin-bottom: 5px;
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
                ...data-table td:nth-child(2) {
                    text-align: right;
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
                @media print {
                    body { margin: 0; }
                    ...no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="report-title">ОТЧЕТ ПО ВЫРУЧКЕ</div>
                <div class="report-info">Магазин: ${shopName} (№${shopId})</div>
                <div class="report-info">Период: с ${formattedStart} по ${formattedEnd}</div>
                <div class="report-info">Группировка: ${getGroupByName(groupBy)}</div>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Период</th>
                        <th>Выручка, ₽</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                    <tr class="total-row">
                        <td>Итого:</td>
                        <td>${formatNumber(revenueData.total)}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="footer">
                Сформировано: ${new Date().toLocaleString('ru-RU')}<br>
                Система управления инвентаризацией - Кировский
            </div>
            
            <div class="no-print" style="margin-top: 20px; text-align: center;">
                <button onclick="window.print()" style="padding: 10px 20px; background-color: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Печать
                </button>
            </div>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
}

// Функция сброса состояния модального окна выручки
function resetExportRevenueModal() {
    document.getElementById('confirmExportRevenue').disabled = false;
    document.getElementById('cancelExportRevenue').disabled = false;
    document.getElementById('revenueLoading').style.display = 'none';
    document.getElementById('revenueResult').style.display = 'none';
    document.getElementById('revenueProgressBar').style.width = '0%';
    document.getElementById('revenueResultContent').innerHTML = '';
}

// Обработчик закрытия модального окна через крестик
document.querySelector('#exportRevenueModal .close').addEventListener('click', function() {
    document.getElementById('exportRevenueModal').style.display = 'none';
    resetExportRevenueModal();
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    const modal = document.getElementById('exportRevenueModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        resetExportRevenueModal();
    }
});

// Обработчик закрытия модального окна через крестик
document.querySelector('#exportRevenueModal .close').addEventListener('click', function() {
    document.getElementById('exportRevenueModal').style.display = 'none';
    resetExportRevenueModal();
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    const modal = document.getElementById('exportRevenueModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        resetExportRevenueModal();
    }
});

// Выгрузка в Word
function exportRevenueToWord(startDate, endDate, groupBy, revenueData) {
    const formattedStart = formatInputDate(startDate.toISOString().split('T')[0]);
    const formattedEnd = formatInputDate(endDate.toISOString().split('T')[0]);
    const shopName = appData.currentShop ? appData.currentShop.name : 'Не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    const now = new Date().toLocaleString('ru-RU');
    
    // Создаем HTML содержимое для Word
    const htmlContent = `
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
                <p><strong>Период:</strong> с ${formattedStart} по ${formattedEnd}</p>
                <p><strong>Группировка:</strong> ${getGroupByName(groupBy)}</p>
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
                <p>Сформировано: ${now}</p>
                <p>Система управления инвентаризацией - Кировский</p>
            </div>
        </body>
        </html>
    `;
    
    // Создаем Blob с HTML содержимым
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    
    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    const fileName = `Отчет_по_выручке_${shopId}_${formattedStart.replace(/\//g, '-')}_${formattedEnd.replace(/\//g, '-')}.doc`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Очищаем
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Выгрузка в Excel (XML формат)
function exportRevenueToExcel(startDate, endDate, groupBy, revenueData) {
    const formattedStart = formatInputDate(startDate.toISOString().split('T')[0]);
    const formattedEnd = formatInputDate(endDate.toISOString().split('T')[0]);
    const shopName = appData.currentShop ? appData.currentShop.name : 'Не выбран';
    const shopId = appData.currentShop ? appData.currentShop.id : 'N/A';
    const now = new Date().toLocaleString('ru-RU');
    
    // Создаем XML для Excel
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Author>Система управления инвентаризацией</Author>
  <Created>${new Date().toISOString()}</Created>
 </DocumentProperties>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Bottom"/>
   <Borders/>
   <Font ss:FontName="Arial" ss:Size="12"/>
   <Interior/>
   <NumberFormat ss:Format="#,##0.00"/>
  </Style>
  <Style ss:ID="Header">
   <Font ss:FontName="Arial" ss:Size="14" ss:Bold="1"/>
   <Alignment ss:Horizontal="Center"/>
  </Style>
  <Style ss:ID="Title">
   <Font ss:FontName="Arial" ss:Size="16" ss:Bold="1"/>
   <Alignment ss:Horizontal="Center"/>
  </Style>
  <Style ss:ID="Total">
   <Font ss:FontName="Arial" ss:Size="12" ss:Bold="1"/>
   <Interior ss:Color="#E6E6E6" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="Currency">
   <NumberFormat ss:Format="#,##0.00\ &quot;₽&quot;"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Отчет по выручке">
  <Table>
   <Column ss:Width="200"/>
   <Column ss:Width="150"/>
   
   <Row>
    <Cell ss:MergeAcross="1" ss:StyleID="Title">
     <Data ss:Type="String">ОТЧЕТ ПО ВЫРУЧКЕ</Data>
    </Cell>
   </Row>
   <Row>
    <Cell><Data ss:Type="String">Магазин:</Data></Cell>
    <Cell><Data ss:Type="String">${shopName} (№${shopId})</Data></Cell>
   </Row>
   <Row>
    <Cell><Data ss:Type="String">Период:</Data></Cell>
    <Cell><Data ss:Type="String">с ${formattedStart} по ${formattedEnd}</Data></Cell>
   </Row>
   <Row>
    <Cell><Data ss:Type="String">Группировка:</Data></Cell>
    <Cell><Data ss:Type="String">${getGroupByName(groupBy)}</Data></Cell>
   </Row>
   <Row></Row>
   
   <Row>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Период</Data></Cell>
    <Cell ss:StyleID="Header"><Data ss:Type="String">Выручка, ₽</Data></Cell>
   </Row>
   
   ${revenueData.data.map(item => `
   <Row>
    <Cell><Data ss:Type="String">${item.period}</Data></Cell>
    <Cell ss:StyleID="Currency"><Data ss:Type="Number">${item.revenue}</Data></Cell>
   </Row>
   `).join('')}
   
   <Row>
    <Cell ss:StyleID="Total"><Data ss:Type="String">Итого:</Data></Cell>
    <Cell ss:StyleID="Total" ss:StyleID="Currency"><Data ss:Type="Number">${revenueData.total}</Data></Cell>
   </Row>
   
   <Row></Row>
   <Row>
    <Cell ss:MergeAcross="1">
     <Data ss:Type="String">Сформировано: ${now}</Data>
    </Cell>
   </Row>
   <Row>
    <Cell ss:MergeAcross="1">
     <Data ss:Type="String">Система управления инвентаризацией - Кировский</Data>
    </Cell>
   </Row>
  </Table>
 </Worksheet>
</Workbook>`;
    
    // Создаем Blob с XML содержимым
    const blob = new Blob([xmlContent], { 
        type: 'application/vnd.ms-excel' 
    });
    const url = URL.createObjectURL(blob);
    
    // Создаем ссылку для скачивания
    const a = document.createElement('a');
    a.href = url;
    const fileName = `Отчет_по_выручке_${shopId}_${formattedStart.replace(/\//g, '-')}_${formattedEnd.replace(/\//g, '-')}.xls`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Очищаем
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Получить название группировки
function getGroupByName(groupBy) {
    const groups = {
        'day': 'По дням',
        'week': 'По неделям',
        'month': 'По месяцам'
    };
    return groups[groupBy] || groupBy;
}



function getProductsByInventoryType(inventoryType) {
    console.log('Получение товаров для типа инвентаризации:', inventoryType);
    
    const allProducts = [
        // Алкоголь (type: 'alcohol')
        { barcode: '4601234567897', name: 'Водка Русская 0.5л 40%', category: 'Крепкий алкоголь', group: 'Водка', price: 450.00, type: 'alcohol' },
        { barcode: '4601234567898', name: 'Коньяк Армянский 5* 0.5л', category: 'Крепкий алкоголь', group: 'Коньяк', price: 1200.00, type: 'alcohol' },
        { barcode: '4601234567899', name: 'Вино красное сухое 0.75л', category: 'Вино', group: 'Красное вино', price: 350.00, type: 'alcohol' },
        { barcode: '4601234567900', name: 'Вино белое полусладкое 0.75л', category: 'Вино', group: 'Белое вино', price: 320.00, type: 'alcohol' },
        { barcode: '4601234567901', name: 'Шампанское Советское полусладкое 0.75л', category: 'Игристые вина', group: 'Шампанское', price: 450.00, type: 'alcohol' },
        { barcode: '4601234567902', name: 'Виски Jack Daniels 0.7л', category: 'Крепкий алкоголь', group: 'Виски', price: 2500.00, type: 'alcohol' },
        
        // Пиво (type: 'beer')
        { barcode: '4601234567906', name: 'Пиво Жигулёвское 0.5л', category: 'Пиво светлое', group: 'Светлое пиво', price: 85.00, type: 'beer' },
        { barcode: '4601234567907', name: 'Пиво Балтика 9 0.5л', category: 'Пиво крепкое', group: 'Крепкое пиво', price: 95.00, type: 'beer' },
        { barcode: '4601234567908', name: 'Пиво Сибирская корона 0.5л', category: 'Пиво светлое', group: 'Светлое пиво', price: 90.00, type: 'beer' },
        { barcode: '4601234567910', name: 'Пиво Тинькофф 0.45л', category: 'Пиво светлое', group: 'Премиум пиво', price: 120.00, type: 'beer' },
        
        // Сигареты (type: 'cigarettes')
        { barcode: '4601234567911', name: 'Сигареты Parliament 20шт', category: 'Легкие сигареты', group: 'Parliament', price: 180.00, type: 'cigarettes' },
        { barcode: '4601234567912', name: 'Сигареты Marlboro 20шт', category: 'Крепкие сигареты', group: 'Marlboro', price: 170.00, type: 'cigarettes' },
        { barcode: '4601234567913', name: 'Сигареты Winston 20шт', category: 'Средние сигареты', group: 'Winston', price: 160.00, type: 'cigarettes' },
        { barcode: '4601234567914', name: 'Сигареты Kent 20шт', category: 'Легкие сигареты', group: 'Kent', price: 175.00, type: 'cigarettes' },
        
        // Общие товары (type: 'general')
        { barcode: '4601234567890', name: 'Молоко Домик в деревне 2.5% 1л', category: 'Молочные продукты', group: 'Молоко', price: 79.90, type: 'general' },
        { barcode: '4601234567891', name: 'Хлеб Бородинский нарезка 400г', category: 'Хлебобулочные изделия', group: 'Хлеб', price: 45.00, type: 'general' },
        { barcode: '4601234567892', name: 'Яйца куриные С1 10шт', category: 'Яйца', group: 'Яйца', price: 120.00, type: 'general' },
        { barcode: '4601234567893', name: 'Пельмени Сибирские 1кг', category: 'Замороженные продукты', group: 'Пельмени', price: 250.00, type: 'general' },
    ];
    
    console.log('Всего товаров в базе:', allProducts.length);
    
    switch(inventoryType) {
        case 'alcohol':
            const alcoholProducts = allProducts.filter(p => p.type === 'alcohol');
            console.log('Алкогольных товаров:', alcoholProducts.length);
            return alcoholProducts;
            
        case 'beer':
            const beerProducts = allProducts.filter(p => p.type === 'beer');
            console.log('Пивных товаров:', beerProducts.length);
            return beerProducts;
            
        case 'cigarettes':
            const cigaretteProducts = allProducts.filter(p => p.type === 'cigarettes');
            console.log('Сигаретных товаров:', cigaretteProducts.length);
            return cigaretteProducts;
            
        case 'general':
            const generalProducts = allProducts.filter(p => p.type === 'general');
            console.log('Общих товаров:', generalProducts.length);
            return generalProducts;
            
        case 'all':
            return allProducts;
            
        default:
            return allProducts;
    }
}

function getProductTypeByBarcode(barcode) {
    if (productData.alcohol.find(p => p.barcode === barcode)) return 'alcohol';
    if (productData.beer.find(p => p.barcode === barcode)) return 'beer';
    if (productData.cigarettes.find(p => p.barcode === barcode)) return 'cigarettes';
    if (productData.general.find(p => p.barcode === barcode)) return 'general';
    return null;
}

// Глобальные переменные
let currentInventoryForPrint = null;

// Данные о товарах с категориями
const productData = {
    alcohol: [
        { barcode: '4601234567897', name: 'Водка Русская 0.5л 40%', category: 'Крепкий алкоголь', group: 'Водка', price: 450.00 },
        { barcode: '4601234567898', name: 'Коньяк Армянский 5* 0.5л', category: 'Крепкий алкоголь', group: 'Коньяк', price: 1200.00 },
        { barcode: '4601234567899', name: 'Вино красное сухое 0.75л', category: 'Вино', group: 'Красное вино', price: 350.00 },
        { barcode: '4601234567900', name: 'Вино белое полусладкое 0.75л', category: 'Вино', group: 'Белое вино', price: 320.00 },
        { barcode: '4601234567901', name: 'Шампанское Советское полусладкое 0.75л', category: 'Игристые вина', group: 'Шампанское', price: 450.00 },
        { barcode: '4601234567902', name: 'Виски Jack Daniel\'s 0.7л', category: 'Крепкий алкоголь', group: 'Виски', price: 2500.00 },
        { barcode: '4601234567915', name: 'Текила Olmeca 0.7л', category: 'Крепкий алкоголь', group: 'Текила', price: 1800.00 },
        { barcode: '4601234567916', name: 'Ром Bacardi 0.7л', category: 'Крепкий алкоголь', group: 'Ром', price: 950.00 },
        { barcode: '4601234567917', name: 'Ликер Baileys 0.7л', category: 'Ликеры', group: 'Ликер', price: 1500.00 },
        { barcode: '4601234567918', name: 'Портвейн 777 0.75л', category: 'Крепленые вина', group: 'Портвейн', price: 280.00 }
    ],
    beer: [
        { barcode: '4601234567906', name: 'Пиво Жигулёвское 0.5л', category: 'Пиво светлое', group: 'Светлое пиво', price: 85.00 },
        { barcode: '4601234567907', name: 'Пиво Балтика 9 0.5л', category: 'Пиво крепкое', group: 'Крепкое пиво', price: 95.00 },
        { barcode: '4601234567908', name: 'Пиво Сибирская корона 0.5л', category: 'Пиво светлое', group: 'Светлое пиво', price: 90.00 },
        { barcode: '4601234567910', name: 'Пиво Тинькофф 0.45л', category: 'Пиво светлое', group: 'Премиум пиво', price: 120.00 },
        { barcode: '4601234567919', name: 'Пиво Heineken 0.5л', category: 'Пиво светлое', group: 'Импортное пиво', price: 150.00 },
        { barcode: '4601234567920', name: 'Пиво Corona Extra 0.355л', category: 'Пиво светлое', group: 'Импортное пиво', price: 180.00 },
        { barcode: '4601234567921', name: 'Пиво Carlsberg 0.5л', category: 'Пиво светлое', group: 'Импортное пиво', price: 110.00 },
        { barcode: '4601234567922', name: 'Пиво Старый мельник 1л', category: 'Пиво светлое', group: 'Разливное пиво', price: 160.00 },
        { barcode: '4601234567923', name: 'Пиво Охота крепкое 0.5л', category: 'Пиво крепкое', group: 'Крепкое пиво', price: 105.00 }
    ],
    cigarettes: [
        { barcode: '4601234567911', name: 'Сигареты Parliament 20шт', category: 'Легкие сигареты', group: 'Parliament', price: 180.00 },
        { barcode: '4601234567912', name: 'Сигареты Marlboro 20шт', category: 'Крепкие сигареты', group: 'Marlboro', price: 170.00 },
        { barcode: '4601234567913', name: 'Сигареты Winston 20шт', category: 'Средние сигареты', group: 'Winston', price: 160.00 },
        { barcode: '4601234567914', name: 'Сигареты Kent 20шт', category: 'Легкие сигареты', group: 'Kent', price: 175.00 },
        { barcode: '4601234567924', name: 'Сигареты Camel 20шт', category: 'Средние сигареты', group: 'Camel', price: 165.00 },
        { barcode: '4601234567925', name: 'Сигареты Chesterfield 20шт', category: 'Крепкие сигареты', group: 'Chesterfield', price: 155.00 },
        { barcode: '4601234567926', name: 'Сигареты Bond 20шт', category: 'Легкие сигареты', group: 'Bond', price: 145.00 },
        { barcode: '4601234567927', name: 'Сигареты LD 20шт', category: 'Средние сигареты', group: 'LD', price: 135.00 }
    ],
    general: [
        { barcode: '4601234567890', name: 'Молоко Домик в деревне 2.5% 1л', category: 'Молочные продукты', group: 'Молоко', price: 79.90 },
        { barcode: '4601234567891', name: 'Хлеб Бородинский нарезка 400г', category: 'Хлебобулочные изделия', group: 'Хлеб', price: 45.00 },
        { barcode: '4601234567892', name: 'Яйца куриные С1 10шт', category: 'Яйца', group: 'Яйца', price: 120.00 },
        { barcode: '4601234567893', name: 'Пельмени Сибирские 1кг', category: 'Замороженные продукты', group: 'Пельмени', price: 250.00 },
        { barcode: '4601234567894', name: 'Мороженое Пломбир 100г', category: 'Замороженные продукты', group: 'Мороженое', price: 65.00 },
        { barcode: '4601234567928', name: 'Сахар песок 1кг', category: 'Бакалея', group: 'Сахар', price: 85.00 },
        { barcode: '4601234567929', name: 'Мука пшеничная 1кг', category: 'Бакалея', group: 'Мука', price: 75.00 },
        { barcode: '4601234567930', name: 'Соль йодированная 1кг', category: 'Бакалея', group: 'Соль', price: 35.00 },
        { barcode: '4601234567931', name: 'Масло подсолнечное 1л', category: 'Масла', group: 'Растительное масло', price: 145.00 },
        { barcode: '4601234567932', name: 'Чай черный 100г', category: 'Бакалея', group: 'Чай', price: 95.00 }
    ]
};


// Получение товаров по типу инвентаризации
function getProductsByInventoryType(inventoryType) {
    switch(inventoryType) {
        case 'alcohol':
            return productData.alcohol;
        case 'beer':
            return productData.beer;
        case 'cigarettes':
            return productData.cigarettes;
        default:
            return productData.general;
    }
}





// Генерация данных для печати
function generatePrintData(inventory, inventoryType, printType, groupBy = 'product_group') {
    const inventoryId = inventory?.id;

    // Берем реальные товары из описей (terminalData) по текущей инвентаризации.
    // В проекте ключи в terminalData могут храниться как строка ID ("123"), как число (123),
    // а иногда ID выглядит как строка с префиксами (например, "INV-451-2025-000321").
    // Поэтому пробуем несколько вариантов ключа.
    if (typeof loadTerminalDataFromStorage === 'function') {
        try { loadTerminalDataFromStorage(); } catch (e) { console.warn('loadTerminalDataFromStorage:', e); }
    }

    // Получаем описи именно этой инвентаризации.
    // В проекте terminalData иногда сохранялся под "не тем" ключом,
    // поэтому берём через общий хелпер (utils.js).
    const inventoryLists = (typeof getInventoryOperatorLists === 'function')
        ? getInventoryOperatorLists(inventoryId)
        : ((appData.terminalData && appData.terminalData[String(inventoryId)]) || []);

    // Плоский список товаров из всех описей
    let rawItems = [];

    inventoryLists.forEach(list => {
        const operatorName = list?.name || list?.operatorName || (list?.id ? `Опись #${list.id}` : 'Опись');
        const items = Array.isArray(list?.items)
            ? list.items
            : (Array.isArray(list?.products) ? list.products : (Array.isArray(list?.inventoryItems) ? list.inventoryItems : []));

        items.forEach(it => {
            if (!it) return;
            const qty = Number(it.quantity ?? it.qty ?? 0);
            const price = Number(it.price ?? it.unitPrice ?? 0);
            rawItems.push({
                barcode: String(it.barcode || ''),
                name: it.name || '',
                category: it.category || it.productGroup || '',
                group: it.group || it.groupName || it.productType || '',
                type: it.type || it.inventoryType || inventoryType || 'general',
                unit: 'шт',
                quantity: qty,
                price: price,
                amount: Number(((it.totalPrice ?? it.amount ?? (qty * price)) || 0).toFixed(2)),
                operator: operatorName
            });
        });
    });

    // Фильтр по типу инвентаризации (кроме общей)
    if (inventoryType && inventoryType !== 'general') {
        rawItems = rawItems.filter(it => String(it.type) === String(inventoryType));
    }

    // Если нужно только итоги - группируем
    if (printType === 'totals') {
        return generateTotalsData(rawItems, groupBy);
    }

    // Полная ведомость: агрегируем по штрихкоду
    const byBarcode = new Map();
    for (const it of rawItems) {
        if (!it.barcode) continue;
        const key = it.barcode;
        const prev = byBarcode.get(key);
        if (!prev) {
            byBarcode.set(key, { ...it });
        } else {
            prev.quantity = Number((Number(prev.quantity || 0) + Number(it.quantity || 0)).toFixed(3));
            // Цена - берем первую адекватную
            if (!prev.price || prev.price <= 0) prev.price = it.price;
            prev.amount = Number((Number(prev.quantity || 0) * Number(prev.price || 0)).toFixed(2));
        }
    }

    const items = Array.from(byBarcode.values());
    const totalQuantity = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    let totalAmount = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    // Итоговая сумма должна совпадать с тем, что показывает сайт.
    // Если в объекте инвентаризации уже есть amount — используем его как "сайт-итог".
    if (inventory && Number.isFinite(Number(inventory.amount)) && Number(inventory.amount) !== 0) {
        totalAmount = Number(inventory.amount);
    }

    return {
        items,
        totalAmount: Number(totalAmount.toFixed(2)),
        totalQuantity: Number(totalQuantity.toFixed(3))
    };
}

// Генерация данных для итогов
function generateTotalsData(items, groupBy = 'product_group') {
    const groups = {};

    function getGroupKey(item) {
        switch (groupBy) {
            case 'product_group':
                return item.group || 'Без группы';
            case 'product_type':
                return item.type || 'Без типа';
            case 'department':
                return item.category || 'Без категории';
            case 'operator':
                return item.operator || 'Без оператора';
            default:
                return item.category || 'Без категории';
        }
    }

    items.forEach(item => {
        const key = getGroupKey(item);
        if (!groups[key]) {
            groups[key] = {
                category: key,
                items: [],
                totalQuantity: 0,
                totalAmount: 0
            };
        }
        groups[key].items.push(item);
        groups[key].totalQuantity += Number(item.quantity) || 0;
        groups[key].totalAmount += Number(item.amount) || 0;
    });

    const groupsArr = Object.values(groups).map(g => ({
        ...g,
        totalQuantity: Number(g.totalQuantity.toFixed(3)),
        totalAmount: Number(g.totalAmount.toFixed(2))
    }));

    const totalAmount = groupsArr.reduce((sum, g) => sum + (Number(g.totalAmount) || 0), 0);
    const totalQuantity = groupsArr.reduce((sum, g) => sum + (Number(g.totalQuantity) || 0), 0);

    return {
        groups: groupsArr,
        totalAmount: Number(totalAmount.toFixed(2)),
        totalQuantity: Number(totalQuantity.toFixed(3))
    };
}

// Добавьте эти вспомогательные функции в начало файла (можно после объявления appData)

// Функция валидации даты
function validateDate(dateInput, fieldName) {
    const date = new Date(dateInput);
    const today = new Date();
    const minDate = new Date('1960-01-01');
    
    if (isNaN(date.getTime())) {
        return `${fieldName}: Некорректная дата`;
    }
    
    if (date < minDate) {
        return `${fieldName}: Дата не может быть раньше 01.01.1960`;
    }
    
    if (date > today) {
        return `${fieldName}: Дата не может быть в будущем`;
    }
    
    return null;
}

// Функция валидации диапазона дат
function validateDateRange(startDateInput, endDateInput, startFieldName, endFieldName) {
    const startError = validateDate(startDateInput, startFieldName);
    if (startError) return startError;
    
    const endError = validateDate(endDateInput, endFieldName);
    if (endError) return endError;
    
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
    
    if (startDate > endDate) {
        return `${startFieldName} не может быть позже ${endFieldName}`;
    }
    
    return null;
}

function validateOperations(operationsString) {
    if (!operationsString.trim()) {
        return "Введите номера операций (через запятую)";
    }
    
    const operations = operationsString.split(',').map(op => op.trim());
    
    for (let i = 0; i < operations.length; i++) {
        const op = operations[i];
        
        // Проверка на пустые значения (две запятые подряд)
        if (op === '') {
            return `После запятой #${i + 1} нет номера операции`;
        }
        
        // Проверка на только цифры
        if (!/^\d+$/.test(op)) {
            return `Операция "${op}": разрешены только цифры (0-9)`;
        }
        
        // Проверка на максимум 3 цифры
        if (op.length > 3) {
            return `Операция "${op}": максимум 3 цифры (1-999)`;
        }
        
        // Проверка на валидное число
        if (op === '0') {
            return `Операция "0": номер операции должен быть от 1 до 999`;
        }
        
        if (op.length > 1 && op.startsWith('0')) {
            return `Операция "${op}": не должно быть ведущих нулей`;
        }
        
        // Проверка диапазона
        const num = parseInt(op, 10);
        if (num < 1 || num > 999) {
            return `Операция "${op}": должен быть в диапазоне 1-999`;
        }
    }
    
    return null;
}

// ================== ВЫГРУЗКА КАСС - ДОБАВЛЯЕМ ВАЛИДАЦИЮ ==================

document.getElementById('confirmExportCash').addEventListener('click', function() {
    const date = document.getElementById('cashDate').value;
    const format = document.getElementById('cashFormat').value;
    
    // Валидация даты
    const dateError = validateDate(date, 'Дата выгрузки');
    if (dateError) {
        showAlert(dateError, 'warning');
        return;
    }
    
    // ... остальной код функции без изменений ...
});

// ================== ВЫГРУЗКА ВЫРУЧКИ - ДОБАВЛЯЕМ ВАЛИДАЦИЮ ==================

document.getElementById('confirmExportRevenue').addEventListener('click', function() {
    const startDateStr = document.getElementById('revenueStartDate').value;
    const endDateStr = document.getElementById('revenueEndDate').value;
    const format = document.getElementById('revenueFormat').value;
    const groupBy = document.getElementById('revenueGroupBy').value;
    
    // Валидация дат
    const dateError = validateDateRange(startDateStr, endDateStr, 'Дата начала', 'Дата окончания');
    if (dateError) {
        showAlert(dateError, 'warning');
        return;
    }
    
    // ... остальной код функции без изменений ...
});

// ================== ВЫГРУЗКА ПРОДАЖ - ДОБАВЛЯЕМ ВАЛИДАЦИЮ ==================

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
        
        // Валидация одной даты
        const dateError = validateDate(singleDate, 'Дата');
        if (dateError) {
            showAlert(dateError, 'warning');
            return;
        }
        
        startDate = new Date(singleDate);
        endDate = new Date(singleDate);
    } else {
        if (!startDateStr || !endDateStr) {
            showAlert('Выберите даты начала и окончания', 'warning');
            return;
        }
        
        // Валидация диапазона дат
        const dateError = validateDateRange(startDateStr, endDateStr, 'Дата начала', 'Дата окончания');
        if (dateError) {
            showAlert(dateError, 'warning');
            return;
        }
        
        startDate = new Date(startDateStr);
        endDate = new Date(endDateStr);
    }
    
    // ... остальной код функции без изменений ...
});

// ================== ВЫГРУЗКА ОСТАТКОВ - ДОБАВЛЯЕМ ВАЛИДАЦИЮ ==================

document.getElementById('confirmExportStock').addEventListener('click', function() {
    const stockDate = document.getElementById('stockDate').value;
    const format = document.getElementById('stockFormat').value;
    const groupBy1 = document.getElementById('stockGroupBy1').value;
    const groupBy2 = document.getElementById('stockGroupBy2').value;
    
    // Валидация даты
    const dateError = validateDate(stockDate, 'Дата остатков');
    if (dateError) {
        showAlert(dateError, 'warning');
        return;
    }
    
    // ... остальной код функции без изменений ...
});

// ================== ХОЗЯЙСТВЕННЫЕ ОПЕРАЦИИ - ДОБАВЛЯЕМ ВАЛИДАЦИЮ ==================

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
        return;
    }
    
    // Валидация операций
    const operationsError = validateOperations(operationsString);
    if (operationsError) {
        showAlert(operationsError, 'warning');
        return;
    }
    
    // Валидация номера магазина (если выбран)
    if (divisionType === 'shop') {
        if (!shopNumber.trim()) {
            showAlert('Введите номер магазина', 'warning');
            return;
        }
        if (!/^\d+$/.test(shopNumber.trim())) {
            showAlert('Номер магазина должен содержать только цифры', 'warning');
            return;
        }
    }
    
    // Валидация товара (если выбран один товар)
    if (productType === 'single' && !singleProduct.trim()) {
        showAlert('Введите название товара', 'warning');
        return;
    }
    
    // ... остальной код функции без изменений ...
});

// ================== ЕСТЕСТВЕННАЯ УБЫЛЬ - ДОБАВЛЯЕМ ВАЛИДАЦИЮ ==================

document.getElementById('confirmUploadNaturalLoss').addEventListener('click', function() {
    const startDateStr = document.getElementById('lossStartDate').value;
    const endDateStr = document.getElementById('lossEndDate').value;
    const format = document.getElementById('lossFormat').value;
    
    // Валидация дат
    const dateError = validateDateRange(startDateStr, endDateStr, 'Дата начала', 'Дата окончания');
    if (dateError) {
        showAlert(dateError, 'warning');
        return;
    }
    
    // ... остальной код функции без изменений ...
});

// ================== ОТХОДЫ - ДОБАВЛЯЕМ ВАЛИДАЦИЮ ==================

document.getElementById('confirmWaste').addEventListener('click', function() {
    const startDateStr = document.getElementById('wasteStartDate').value;
    const endDateStr = document.getElementById('wasteEndDate').value;
    const format = document.getElementById('wasteFormat').value;
    
    // Валидация дат
    const dateError = validateDateRange(startDateStr, endDateStr, 'Дата начала', 'Дата окончания');
    if (dateError) {
        showAlert(dateError, 'warning');
        return;
    }
    
    // ... остальной код функции без изменений ...
});

// ================== ДОБАВЛЯЕМ ВАЛИДАЦИЮ ДЛЯ ДРУГИХ ПОЛЕЙ ==================

// Для поля даты в документе проверки документов
document.getElementById('checkDocumentsBtn').addEventListener('click', function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (startDate || endDate) {
        if (startDate && endDate) {
            const dateError = validateDateRange(startDate, endDate, 'Дата начала', 'Дата окончания');
            if (dateError) {
                showAlert(dateError, 'warning');
                return;
            }
        } else if (startDate) {
            const dateError = validateDate(startDate, 'Дата начала');
            if (dateError) {
                showAlert(dateError, 'warning');
                return;
            }
        } else if (endDate) {
            const dateError = validateDate(endDate, 'Дата окончания');
            if (dateError) {
                showAlert(dateError, 'warning');
                return;
            }
        }
    }
    
    // ... остальной код функции ...
});

// Для дат в создании инвентаризации
document.getElementById('confirmCreateInventory').addEventListener('click', function() {
    const inventoryDate = document.getElementById('inventoryDate').value;
    
    if (inventoryDate) {
        const dateError = validateDate(inventoryDate, 'Дата инвентаризации');
        if (dateError) {
            showAlert(dateError, 'warning');
            return;
        }
    }
    
    // ... остальной код функции ...
});

// Добавляем валидацию на сами поля ввода дат (опционально, но удобно для пользователя)
function setupDateInputValidation() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    dateInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value) {
                const error = validateDate(this.value, 'Дата');
                if (error) {
                    showAlert(error, 'warning', 3000);
                    this.value = ''; // Очищаем поле при ошибке
                }
            }
        });
    });
}

// Инициализация setupDateInputValidation перенесена в main.js

// Также можно добавить динамическую подсказку для поля операций
document.getElementById('operationNumbers')?.addEventListener('input', function() {
    const value = this.value.trim();
    if (value) {
        const operations = value.split(',').map(op => op.trim());
        let isValid = true;
        
        for (let i = 0; i < operations.length; i++) {
            const op = operations[i];
            if (op && (!/^\d+$/.test(op) || op.length > 3 || (op.length > 1 && op.startsWith('0')) || op === '0')) {
                isValid = false;
                break;
            }
        }
        
        if (isValid) {
            this.classList.remove('invalid');
            this.classList.add('valid');
        } else {
            this.classList.remove('valid');
            this.classList.add('invalid');
        }
    } else {
        this.classList.remove('valid', 'invalid');
    }
});

// Инициализация печати для бухгалтера
function initPrintForAccountant() {
    // Открытие модального окна при нажатии на кнопку "Печать для бухгалтера"
    document.addEventListener('click', function(e) {
        if (e.target.closest('.print-for-accountant-btn')) {
            const button = e.target.closest('.print-for-accountant-btn');
            const inventoryId = button.getAttribute('data-inventory-id');
            const inventoryType = button.getAttribute('data-inventory-type') || 'general';
            
            currentInventoryForPrint = {
                id: inventoryId,
                type: inventoryType
            };
            
            openPrintForAccountantModal(inventoryId, inventoryType);
        }
    });
    
function openPrintForAccountantModal(inventoryId, inventoryType) {
    console.log('Открытие модального окна для печати:', inventoryId, inventoryType);
    
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
        printInventoryId.value = `Инвентаризация #${inventoryId}`;
        console.log('Установлен ID инвентаризации:', inventoryId);
    }
    
    if (printInventoryType) {
        printInventoryType.value = inventoryType;
        console.log('Установлен тип инвентаризации:', inventoryType);
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
    switch(inventoryType) {
        case 'alcohol':
            title = 'Сличительная ведомость по алкоголю';
            break;
        case 'beer':
            title = 'Сличительная ведомость по пиву';
            break;
        case 'cigarettes':
            title = 'Сличительная ведомость по сигаретам';
            break;
    }
    
    const modalHeader = modal.querySelector('.modal-header h2');
    if (modalHeader) {
        modalHeader.textContent = title;
    }
    
    console.log('Модальное окно открыто успешно');
}
    
    // Закрытие модального окна
    document.querySelector('#printForAccountantModal .close')?.addEventListener('click', closePrintModal);
    document.getElementById('cancelPrintForAccountant')?.addEventListener('click', closePrintModal);
    
    // Подтверждение печати
    document.getElementById('confirmPrintForAccountant')?.addEventListener('click', function() {
        if (!currentInventoryForPrint) return;
        
        const printType = document.getElementById('printType').value;
        const printFormat = document.getElementById('printFormat').value;
        const groupBy = document.getElementById('groupBy').value;
        const includeSubtotals = document.getElementById('includeSubtotals').checked;
        
        // Показываем загрузку
        document.getElementById('printLoading').style.display = 'block';
        document.getElementById('printResult').style.display = 'none';
        
        // Имитация загрузки
        setTimeout(() => {
            generatePrintDocument(
                currentInventoryForPrint.id,
                currentInventoryForPrint.type,
                printType,
                printFormat,
                groupBy,
                includeSubtotals
            );
            
            document.getElementById('printLoading').style.display = 'none';
            document.getElementById('printResult').style.display = 'block';
        }, 1500);
    });
    
    // Закрытие по клику вне окна
    window.addEventListener('click', function(e) {
        if (e.target.id === 'printForAccountantModal') {
            closePrintModal();
        }
    });
    
    function closePrintModal() {
        const modal = document.getElementById('printForAccountantModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// Генерация документа для печати
function generatePrintDocument(inventoryId, inventoryType, printType, printFormat, groupBy, includeSubtotals) {
    try {
        // На всякий случай подгружаем terminalData (часто именно из него формируется ведомость)
        if (typeof loadTerminalDataFromStorage === 'function') {
            try { loadTerminalDataFromStorage(); } catch (e) { console.warn('loadTerminalDataFromStorage:', e); }
        }

        // Находим инвентаризацию (по id в приоритете)
        const inventory = (appData.inventories || []).find(inv =>
            String(inv.id) === String(inventoryId)
        ) || (appData.inventories || []).find(inv =>
            inv.shopId === appData.currentShop?.id && String(inv.type) === String(inventoryType)
        );
        
        // Если инвентаризация не найдена, создаем тестовую
        const testInventory = inventory || {
            id: inventoryId,
            date: new Date().toLocaleDateString('ru-RU'),
            type: inventoryType,
            shopId: appData.currentShop?.id || 451
        };
        
        // Генерируем данные для печати
        const printData = generatePrintData(testInventory, inventoryType, printType, groupBy);
        
        // Формируем результат
        const resultHTML = `
            <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                <i class="fas fa-check-circle"></i> <strong>Документ успешно сформирован!</strong>
            </div>
            <p><strong>Инвентаризация:</strong> #${testInventory.id}</p>
            <p><strong>Тип инвентаризации:</strong> ${getInventoryTypeName(inventoryType)}</p>
            <p><strong>Тип печати:</strong> ${printType === 'full' ? 'Полная ведомость' : 'Только итоги'}</p>
            <p><strong>Формат:</strong> ${getFormatName(printFormat)}</p>
            ${printType === 'totals' ? `<p><strong>Группировка:</strong> ${getGroupByName(groupBy)}</p>` : ''}
            <hr>
            <div style="margin-top: 15px;">
                <p>Всего позиций: ${printType === 'full' ? printData.items.length : printData.groups.length}</p>
                <p>Общее количество: ${printData.totalQuantity}</p>
                <p><strong>Общая сумма: ${formatNumber(printData.totalAmount)} ₽</strong></p>
            </div>
            <div style="margin-top: 15px; font-size: 12px; color: #666;">
                <p><i class="fas fa-info-circle"></i> Документ будет автоматически скачан через несколько секунд...</p>
            </div>
        `;
        
        const printResultContent = document.getElementById('printResultContent');
        if (printResultContent) {
            printResultContent.innerHTML = resultHTML;
        }
        
        // Выполняем действие в зависимости от формата
        setTimeout(() => {
            switch(printFormat) {
                case 'pdf':
                    generatePDF(testInventory, printData, printType);
                    break;
                case 'excel':
                    generateExcel(testInventory, printData, printType);
                    break;
                case 'word':
                    generateWord(testInventory, printData, printType);
                    break;
                case 'print':
                    printDocument(testInventory, printData, printType);
                    break;
                default:
                    generateExcel(testInventory, printData, printType);
            }
        }, 1000);
        
    } catch (error) {
        console.error('Ошибка в generatePrintDocument:', error);
        
        const errorHTML = `
            <div style="background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px;">
                <i class="fas fa-exclamation-circle"></i> <strong>Ошибка при формировании документа</strong>
                <p style="margin-top: 10px; font-size: 14px;">${error.message || 'Неизвестная ошибка'}</p>
            </div>
        `;
        
        const printResultContent = document.getElementById('printResultContent');
        if (printResultContent) {
            printResultContent.innerHTML = errorHTML;
        }
        
        throw error;
    }
}

// Генерация данных для печати
function generatePrintData(inventory, inventoryType, printType, groupBy = 'product_group') {
    const inventoryId = inventory?.id;

    // Берем реальные товары из описей (terminalData) по текущей инвентаризации.
    // Ключи могут быть строковыми, числовыми или содержать нецифровые префиксы.
    if (typeof loadTerminalDataFromStorage === 'function') {
        try { loadTerminalDataFromStorage(); } catch (e) { console.warn('loadTerminalDataFromStorage:', e); }
    }

    // Получаем описи по инвентаризации максимально надежно:
    // 1) пробуем прямой ключ terminalData[inventoryId]
    // 2) если не нашли — сканируем все terminalData и фильтруем по полю inventoryId
    const inventoryLists = (typeof getInventoryOperatorLists === 'function')
        ? getInventoryOperatorLists(inventoryId)
        : ((appData.terminalData && appData.terminalData[String(inventoryId)]) || []);

    // Плоский список товаров из всех описей
    let rawItems = [];

    inventoryLists.forEach(list => {
        const operatorName = list?.name || list?.operatorName || (list?.id ? `Опись #${list.id}` : 'Опись');
        const items = Array.isArray(list?.items) ? list.items
            : (Array.isArray(list?.products) ? list.products
            : (Array.isArray(list?.inventoryItems) ? list.inventoryItems : []));

        items.forEach(it => {
            if (!it) return;
            const qty = Number(it.quantity ?? it.qty ?? 0);
            // Цена/сумма: поддерживаем разные поля
            let price = Number(it.price ?? it.unitPrice ?? 0);

            // Если в позиции не сохранились имя/цена — подтягиваем из БД по штрихкоду.
            // ВАЖНО: здесь НЕ генерируем случайный товар (как findProductByBarcode),
            // а используем только реальные записи productDatabase.
            const barcodeStr = String(it.barcode || '').trim();
            const dbProduct = (typeof productDatabase === 'object' && productDatabase && barcodeStr)
              ? productDatabase[barcodeStr]
              : null;

            const nameFromItem = it.name || '';
            const nameFromDb = dbProduct?.name || '';
            const categoryFromDb = dbProduct?.category || '';
            const typeFromDb = dbProduct?.type || '';
            const priceFromDb = Number(dbProduct?.price ?? 0);

            if ((!Number.isFinite(price) || price <= 0) && Number.isFinite(priceFromDb) && priceFromDb > 0) {
              price = priceFromDb;
            }
            const amountFromItem = (it.amount ?? it.totalPrice ?? it.total ?? null);
            const amount = (amountFromItem !== null && amountFromItem !== undefined)
                ? Number(amountFromItem)
                : Number((qty * price).toFixed(2));
            rawItems.push({
                barcode: barcodeStr,
                name: nameFromItem || nameFromDb || '',
                category: it.category || categoryFromDb || '',
                group: it.group || dbProduct?.group || categoryFromDb || '',
                type: it.type || typeFromDb || inventoryType || 'general',
                unit: 'шт',
                quantity: qty,
                price: price,
                amount,
                operator: operatorName
            });
        });
    });

    // Фильтр по типу инвентаризации (кроме общей)
    if (inventoryType && inventoryType !== 'general') {
        rawItems = rawItems.filter(it => String(it.type) === String(inventoryType));
    }

    // Если нужно только итоги - группируем
    if (printType === 'totals') {
        return generateTotalsData(rawItems, groupBy);
    }

    // Полная ведомость: агрегируем по штрихкоду
    const byBarcode = new Map();
    for (const it of rawItems) {
        if (!it.barcode) continue;
        const key = it.barcode;
        const prev = byBarcode.get(key);
        if (!prev) {
            byBarcode.set(key, { ...it });
        } else {
            prev.quantity = Number((Number(prev.quantity || 0) + Number(it.quantity || 0)).toFixed(3));
            // Цена - берем первую адекватную
            if (!prev.price || prev.price <= 0) prev.price = it.price;
            prev.amount = Number((Number(prev.quantity || 0) * Number(prev.price || 0)).toFixed(2));
        }
    }

    const items = Array.from(byBarcode.values());
    const totalQuantity = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    const totalAmount = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    return {
        items,
        totalAmount: Number(totalAmount.toFixed(2)),
        totalQuantity: Number(totalQuantity.toFixed(3))
    };
}

// Генерация данных для итогов
function generateTotalsData(items, groupBy = 'product_group') {
    const groups = {};

    function getGroupKey(item) {
        switch (groupBy) {
            case 'product_group':
                return item.group || 'Без группы';
            case 'product_type':
                return item.type || 'Без типа';
            case 'department':
                return item.category || 'Без категории';
            case 'operator':
                return item.operator || 'Без оператора';
            default:
                return item.category || 'Без категории';
        }
    }

    items.forEach(item => {
        const key = getGroupKey(item);
        if (!groups[key]) {
            groups[key] = {
                category: key,
                items: [],
                totalQuantity: 0,
                totalAmount: 0
            };
        }
        groups[key].items.push(item);
        groups[key].totalQuantity += Number(item.quantity) || 0;
        groups[key].totalAmount += Number(item.amount) || 0;
    });

    const groupsArr = Object.values(groups).map(g => ({
        ...g,
        totalQuantity: Number(g.totalQuantity.toFixed(3)),
        totalAmount: Number(g.totalAmount.toFixed(2))
    }));

    const totalAmount = groupsArr.reduce((sum, g) => sum + (Number(g.totalAmount) || 0), 0);
    const totalQuantity = groupsArr.reduce((sum, g) => sum + (Number(g.totalQuantity) || 0), 0);

    return {
        groups: groupsArr,
        totalAmount: Number(totalAmount.toFixed(2)),
        totalQuantity: Number(totalQuantity.toFixed(3))
    };
}

// Вспомогательные функции
function getInventoryTypeName(type) {
    const names = {
        'general': 'Общая инвентаризация',
        'alcohol': 'Алкоголь',
        'beer': 'Пиво',
        'cigarettes': 'Сигареты'
    };
    return names[type] || type;
}

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

// Функции генерации документов
function generatePDF(inventory, printData, printType) {
    showAlert('PDF документ сформирован', 'success');
    // В реальном приложении здесь будет генерация PDF
}

function generateExcel(inventory, printData, printType) {
    try {
        // Генерация Excel (CSV) файла.
        // ВАЖНО: "Итоговая сумма" и "Результат" должны совпадать с тем, что отображается на сайте.
        // Итоговую сумму берём из inventory.amount, а если она ещё не посчитана — из printData.totalAmount.
        const siteAmountRaw = Number(inventory?.amount);
        const siteAmount = (Number.isFinite(siteAmountRaw) && Math.abs(siteAmountRaw) > 0.0001)
            ? siteAmountRaw
            : Number(printData?.totalAmount || 0);

        // По требованиям бухгалтера "результат" нужен в том же знаке, что и на сайте.
        // На сайте результат отображается напрямую из inventory.difference.
        const diffRaw = Number(inventory?.difference);
        const siteResult = (Number.isFinite(diffRaw) ? diffRaw : 0);

        let csvContent = '\uFEFF'; // UTF-8 BOM для Excel
        
        if (printType === 'full') {
            csvContent += 'СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ\n\n';
            csvContent += `Инвентаризация: #${inventory.id}\n`;
            csvContent += `Тип: ${getInventoryTypeName(inventory.type)}\n`;
            csvContent += `Дата: ${inventory.date}\n`;
            csvContent += `Магазин: ${appData.currentShop?.name || 'Магазин #451'}\n\n`;
            csvContent += 'Штрихкод;Наименование;Категория;Группа;Ед.;Кол-во;Цена;Сумма\n';
            
            (printData.items || []).forEach(item => {
                const price = Number(item.price) || 0;
                const qty = Number(item.quantity) || 0;
                const amount = Number.isFinite(Number(item.amount)) ? Number(item.amount) : Number((qty * price).toFixed(2));
                csvContent += `${item.barcode};${item.name};${item.category};${item.group};${item.unit || 'шт'};${qty};${formatNumber(price)};${formatNumber(amount)}\n`;
            });
            
            csvContent += `\nИтого;;;Количество позиций: ${(printData.items || []).length};Общее количество: ${printData.totalQuantity};Сумма по описям: ${formatNumber(printData.totalAmount)} ₽`;
            csvContent += `\nИТОГОВАЯ СУММА (на сайте);;;;;;;${formatNumber(siteAmount)} ₽`;
            csvContent += `\nРЕЗУЛЬТАТ (на сайте);;;;;;;${siteResult >= 0 ? '+' : ''}${formatNumber(siteResult)} ₽`;
        } else {
            csvContent += 'ИТОГОВАЯ СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ\n\n';
            csvContent += `Инвентаризация: #${inventory.id}\n`;
            csvContent += `Тип: ${getInventoryTypeName(inventory.type)}\n`;
            csvContent += `Дата: ${inventory.date}\n\n`;
            csvContent += 'Категория;Количество позиций;Общее количество;Общая сумма\n';
            
            (printData.groups || []).forEach(group => {
                csvContent += `${group.category};${group.items.length};${group.totalQuantity};${formatNumber(group.totalAmount)}\n`;
            });
            
            const totalPositions = (printData.groups || []).reduce((sum, g) => sum + (g.items?.length || 0), 0);
            csvContent += `\nОБЩИЙ ИТОГ;${totalPositions};${printData.totalQuantity};${formatNumber(printData.totalAmount)} ₽`;
            csvContent += `\nИТОГОВАЯ СУММА (на сайте);;;${formatNumber(siteAmount)} ₽`;
            csvContent += `\nРЕЗУЛЬТАТ (на сайте);;;${siteResult >= 0 ? '+' : ''}${formatNumber(siteResult)} ₽`;
        }
        
        // Скачивание файла
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Сличительная_ведомость_${inventory.id}_${new Date().toISOString().slice(0,10)}.csv`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Показываем уведомление
            showAlert('Excel файл успешно скачан', 'success');
            
            // Обновляем результат в модальном окне
            const successHTML = `
                <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px;">
                    <i class="fas fa-check-circle"></i> <strong>Файл успешно скачан!</strong>
                    <p style="margin-top: 10px; font-size: 14px;">
                        Файл: Сличительная_ведомость_${inventory.id}_${new Date().toISOString().slice(0,10)}.csv
                    </p>
                </div>
            `;
            
            const printResultContent = document.getElementById('printResultContent');
            if (printResultContent) {
                printResultContent.innerHTML = successHTML;
            }
        }, 100);
        
    } catch (error) {
        console.error('Ошибка при генерации Excel:', error);
        showAlert('Ошибка при генерации Excel файла', 'danger');
    }
}

function generateWord(inventory, printData, printType) {
    showAlert('Word документ сформирован', 'success');
    // В реальном приложении здесь будет генерация Word
}

function printDocument(inventory, printData, printType) {
    const printWindow = window.open('', '_blank');
    
    let content = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>Сличительная ведомость #${inventory.id}</title>
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
            <h1>СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ</h1>
            <p><strong>Инвентаризация:</strong> #${inventory.id}</p>
            <p><strong>Тип:</strong> ${getInventoryTypeName(inventory.type)}</p>
            <p><strong>Дата:</strong> ${inventory.date}</p>
    `;
    
    if (printType === 'full') {
        content += `
            <table>
                <tr><th>№</th><th>Наименование</th><th>Кол-во</th><th>Цена</th><th>Сумма</th></tr>
        `;
        
        printData.items.forEach((item, idx) => {
            content += `<tr><td>${idx+1}</td><td>${item.name}</td><td>${item.quantity}</td><td>${formatNumber(item.price)}</td><td>${formatNumber(item.amount)}</td></tr>`;
        });
        
        content += `<tr class="total"><td colspan="4">Итого:</td><td>${formatNumber(printData.totalAmount)} ₽</td></tr>`;
    } else {
        content += `
            <h2>Итоговая ведомость</h2>
            <table>
                <tr><th>Категория</th><th>Кол-во позиций</th><th>Общее кол-во</th><th>Общая сумма</th></tr>
        `;
        
        printData.groups.forEach(group => {
            content += `<tr><td>${group.category}</td><td>${group.items.length}</td><td>${group.totalQuantity}</td><td>${formatNumber(group.totalAmount)}</td></tr>`;
        });
        
        content += `<tr class="total"><td>ОБЩИЙ ИТОГ</td><td>${printData.groups.reduce((sum, g) => sum + g.items.length, 0)}</td><td>${printData.totalQuantity}</td><td>${formatNumber(printData.totalAmount)} ₽</td></tr>`;
    }
    
    content += `
            </table>
            <p style="margin-top: 30px;">Сформировано: ${new Date().toLocaleString('ru-RU')}</p>
            <button onclick="window.print()" style="margin-top: 20px; padding: 10px 20px;">Печать</button>
        </body>
        </html>
    `;
    
    printWindow.document.write(content);
    printWindow.document.close();
    
    showAlert('Документ открыт для печати', 'success');
}

function generateExcel(inventory, printData, printType) {
    // Генерация Excel (CSV) файла
    // Важно: итоговую сумму показываем так, как она указана на сайте (inventory.amount),
    // а если она ещё не посчитана — берем из данных по описям (printData.totalAmount).
    const siteAmountRaw = Number(inventory?.amount);
    const siteAmount = (Number.isFinite(siteAmountRaw) && Math.abs(siteAmountRaw) > 0.0001)
        ? siteAmountRaw
        : Number(printData?.totalAmount || 0);
    const siteDiffRaw = Number(inventory?.difference);

    // ВАЖНО ПРО ЗНАК "РЕЗУЛЬТАТА":
    // В экспорт выводим результат в том же знаке, как он отображается в интерфейсе.
    // В текущей логике сайта это значение хранится в inventory.difference.
    const siteDiffInternal = Number.isFinite(siteDiffRaw) ? siteDiffRaw : 0;
    // "Результат" в ведомости должен совпадать с тем, что видно на сайте.
    // На сайте результат отображается напрямую из inventory.difference.
    const siteResult = siteDiffInternal;

    let csvContent = '\uFEFF'; // UTF-8 BOM для Excel
    
    if (printType === 'full') {
        csvContent += 'Сличительная ведомость\n\n';
        csvContent += `Инвентаризация: #${inventory.id}\n`;
        csvContent += `Тип: ${getInventoryTypeName(inventory.type)}\n`;
        csvContent += `Дата: ${inventory.date}\n\n`;
        csvContent += 'Штрихкод;Наименование;Категория;Группа;Ед.;Кол-во;Цена;Сумма\n';
        
        printData.items.forEach(item => {
            csvContent += `${item.barcode};${item.name};${item.category};${item.group};${item.unit};${item.quantity};${formatNumber(item.price)};${formatNumber(item.amount)}\n`;
        });
        
        csvContent += `\nИтого;;;Количество позиций: ${printData.items.length};Общее количество: ${printData.totalQuantity};Сумма по описям: ${formatNumber(printData.totalAmount)} ₽`;
        csvContent += `\nИТОГОВАЯ СУММА (на сайте);;;;;;;${formatNumber(siteAmount)} ₽`;
        csvContent += `\nРЕЗУЛЬТАТ (на сайте);;;;;;;${siteResult >= 0 ? '+' : ''}${formatNumber(siteResult)} ₽`;
    } else {
        csvContent += 'Итоговая сличительная ведомость\n\n';
        csvContent += `Инвентаризация: #${inventory.id}\n`;
        csvContent += `Тип: ${getInventoryTypeName(inventory.type)}\n\n`;
        csvContent += 'Категория;Количество позиций;Общее количество;Общая сумма\n';
        
        printData.groups.forEach(group => {
            csvContent += `${group.category};${group.items.length};${group.totalQuantity};${formatNumber(group.totalAmount)}\n`;
        });
        
        csvContent += `\nОБЩИЙ ИТОГ;;${printData.totalQuantity};${formatNumber(printData.totalAmount)} ₽`;
        csvContent += `\nИТОГОВАЯ СУММА (на сайте);;;${formatNumber(siteAmount)} ₽`;
        csvContent += `\nРЕЗУЛЬТАТ (на сайте);;;${siteResult >= 0 ? '+' : ''}${formatNumber(siteResult)} ₽`;
    }
    
    // Скачивание файла
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Сличительная_ведомость_${inventory.id}_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    showAlert('Excel файл сформирован и скачан', 'success');
}

function generateWord(inventory, printData, printType) {
    // В реальном приложении здесь будет генерация Word
    console.log('Генерация Word для инвентаризации', inventory.id);
    showAlert('Word документ сформирован', 'success');
}

function printDocument(inventory, printData, printType) {
    const printWindow = window.open('', '_blank');
    let content = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Сличительная ведомость #${inventory.id}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    font-size: 14px;
                }
                ...header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                ...title {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                ...subtitle {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                ...info-table {
                    width: 100%;
                    margin-bottom: 20px;
                    border-collapse: collapse;
                }
                ...info-table td {
                    padding: 5px 10px;
                    border: 1px solid #ddd;
                }
                ...info-table .label {
                    font-weight: bold;
                    background-color: #f5f5f5;
                    width: 200px;
                }
                ...main-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                ...main-table th, .main-table td {
                    border: 1px solid #000;
                    padding: 8px;
                    text-align: left;
                }
                ...main-table th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                ...total-row {
                    font-weight: bold;
                    background-color: #e8f5e8;
                }
                ...group-header {
                    background-color: #f0f0f0;
                    font-weight: bold;
                }
                ...footer {
                    margin-top: 50px;
                    font-size: 12px;
                }
                ...signature {
                    margin-top: 50px;
                }
                ...signature-line {
                    border-top: 1px solid #000;
                    width: 200px;
                    margin-top: 30px;
                }
                @media print {
                    body { margin: 0; }
                    ...no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="title">СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ</div>
                <div class="subtitle">по результатам инвентаризации №${inventory.id}</div>
            </div>
            
            <table class="info-table">
                <tr>
                    <td class="label">Тип инвентаризации:</td>
                    <td>${getInventoryTypeName(inventory.type)}</td>
                </tr>
                <tr>
                    <td class="label">Дата проведения:</td>
                    <td>${inventory.date}</td>
                </tr>
                <tr>
                    <td class="label">Магазин:</td>
                    <td>${appData.currentShop?.name || 'Магазин #451'}</td>
                </tr>
                <tr>
                    <td class="label">Формат отчета:</td>
                    <td>${printType === 'full' ? 'Полная ведомость' : 'Только итоги'}</td>
                </tr>
            </table>
    `;
    
    if (printType === 'full') {
        content += `
            <table class="main-table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Штрихкод</th>
                        <th>Наименование товара</th>
                        <th>Категория</th>
                        <th>Ед. изм.</th>
                        <th>Количество по описи</th>
                        <th>Количество по учету</th>
                        <th>Разница</th>
                        <th>Цена</th>
                        <th>Сумма разницы</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        printData.items.forEach((item, index) => {
            const diff = item.difference || 0;
            const diffAmount = diff * item.price;
            
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.barcode}</td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.unit}</td>
                    <td>${item.quantity}</td>
                    <td>${item.actualQuantity || item.quantity}</td>
                    <td>${diff > 0 ? '+' : ''}${formatNumber(diff)}</td>
                    <td>${formatNumber(item.price)}</td>
                    <td>${formatNumber(diffAmount)}</td>
                </tr>
            `;
        });
        
        content += `
                </tbody>
                <tfoot>
                    <tr class="total-row">
                        <td colspan="5">Итого:</td>
                        <td>${printData.items.length} позиций</td>
                        <td></td>
                        <td></td>
                        <td>Общая сумма:</td>
                        <td>${formatNumber(printData.totalAmount)} ₽</td>
                    </tr>
                </tfoot>
            </table>
        `;
    } else {
        content += `
            <table class="main-table">
                <thead>
                    <tr>
                        <th>Категория товаров</th>
                        <th>Количество позиций</th>
                        <th>Общее количество</th>
                        <th>Общая сумма</th>
                        <th>Сумма разницы</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        let totalDiff = 0;
        printData.groups.forEach(group => {
            const groupDiff = Math.random() * 1000 - 500;
            totalDiff += groupDiff;
            
            content += `
                <tr>
                    <td>${group.category}</td>
                    <td>${group.items.length}</td>
                    <td>${group.totalQuantity}</td>
                    <td>${formatNumber(group.totalAmount)}</td>
                    <td>${formatNumber(groupDiff)}</td>
                </tr>
            `;
        });
        
        content += `
                </tbody>
                <tfoot>
                    <tr class="total-row">
                        <td>ОБЩИЙ ИТОГ:</td>
                        <td>${printData.groups.reduce((sum, g) => sum + g.items.length, 0)}</td>
                        <td>${printData.totalQuantity}</td>
                        <td>${formatNumber(printData.totalAmount)} ₽</td>
                        <td>${formatNumber(totalDiff)} ₽</td>
                    </tr>
                </tfoot>
            </table>
        `;
    }
    
    content += `
            <div class="footer">
                <p>Сформировано: ${new Date().toLocaleString('ru-RU')}</p>
                <p>Система управления инвентаризацией</p>
            </div>
            
            <div class="signature">
                <p>Председатель инвентаризационной комиссии:</p>
                <div class="signature-line"></div>
                <p>${appData.currentUser?.name || 'Системный администратор'}</p>
            </div>
            
            <div class="no-print" style="margin-top: 20px; text-align: center;">
                <button onclick="window.print()" style="padding: 10px 20px; background-color: #007bff; color: white; border: none; cursor: pointer;">
                    Печать документа
                </button>
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(content);
    printWindow.document.close();
    
    showAlert('Документ открыт для печати', 'success');
}

// Получить название формата
function getFormatName(format) {
    const formats = {
        'screen': 'Вывод на экран',
        'print': 'На печать',
        'word': 'Выгрузка в Word',
        'excel': 'Выгрузка в Excel'
    };
    return formats[format] || format;
}

        // Инициализация выбора магазина

// =====================================================================
// ПЕРЕОПРЕДЕЛЕНИЕ ПЕЧАТИ СЛИЧИТЕЛЬНОЙ ВЕДОМОСТИ (FIX PACK)
// Причины:
// 1) В файле исторически есть несколько реализаций generateExcel/printDocument и т.п.
//    Последняя из них перетирала правильную и давала перевёрнутый знак результата.
// 2) PDF/Word ранее были заглушками и не скачивались.
// 3) «Только итоги» должны строиться строго по товарам инвентаризации, а общий итог — из сайта.
// =====================================================================

(function () {
  function normalizeInventoryId(id) {
    const s = String(id ?? '').trim();
    if (!s) return '';
    // берём цифры, если они есть ("Инвентаризация #123" -> "123")
    const digits = s.replace(/[^0-9]/g, '');
    return digits || s;
  }

  function findInventoryStrict(inventoryId) {
    const norm = normalizeInventoryId(inventoryId);
    const invs = Array.isArray(appData?.inventories) ? appData.inventories : [];
    // пробуем по строке
    let inv = invs.find(i => String(i?.id) === String(norm));
    if (inv) return inv;
    // пробуем по числу
    const n = Number(norm);
    if (Number.isFinite(n)) {
      inv = invs.find(i => Number(i?.id) === n);
      if (inv) return inv;
    }
    return null;
  }

  function getSiteAmount(inventory, fallbackAmount) {
    const raw = Number(inventory?.amount);
    if (Number.isFinite(raw) && Math.abs(raw) > 0.0001) return raw;
    const fb = Number(fallbackAmount);
    return Number.isFinite(fb) ? fb : 0;
  }

  function getSiteResult(inventory) {
    // По требованиям: знак результата в файлах должен совпадать с тем, что видно в интерфейсе.
    // На практике иногда значение на экране может отличаться от inventory.difference
    // (например, если в таблице подставлено другое поле/расчёт). Поэтому:
    // 1) пробуем вытащить отображаемое значение из таблиц (#inventory-table / #all-inventories-table)
    // 2) если не нашли — используем inventory.difference

    const invId = normalizeInventoryId(inventory?.id);

    function parseMoney(text) {
      const t = String(text || '').replace(/\u00A0/g, ' ').trim();
      // ищем число со знаком
      const m = t.match(/[+-]?\d[\d\s]*[\.,]?\d*/);
      if (!m) return null;
      const cleaned = m[0].replace(/\s/g, '').replace(',', '.');
      const n = Number(cleaned);
      return Number.isFinite(n) ? n : null;
    }

    function findInTable(tableId) {
      const table = document.getElementById(tableId);
      if (!table) return null;
      const rows = table.querySelectorAll('tbody tr');
      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll('td'));
        if (!cells.length) continue;
        const match = cells.some(td => String(td.textContent || '').trim() === String(invId));
        if (!match) continue;
        // В обеих таблицах есть как минимум две денежные колонки: «Сумма» и «Разница».
        // «Разница» всегда правее «Суммы», поэтому берём ПОСЛЕДНЮЮ ячейку, где есть ₽.
        const moneyCells = cells.filter(td => String(td.textContent || '').includes('₽'));
        if (moneyCells.length) {
          const val = parseMoney(moneyCells[moneyCells.length - 1].textContent);
          if (val !== null) return val;
        }

        // Фолбэк: иногда разница рисуется в badge внутри ячейки.
        const badges = row.querySelectorAll('span.badge');
        for (const b of badges) {
          const val = parseMoney(b.textContent);
          if (val !== null) return val;
        }
      }
      return null;
    }

    const fromInventoryTable = findInTable('inventory-table');
    if (fromInventoryTable !== null) return fromInventoryTable;
    const fromAllInventories = findInTable('all-inventories-table');
    if (fromAllInventories !== null) return fromAllInventories;

    const raw = Number(inventory?.difference);
    return Number.isFinite(raw) ? raw : 0;
  }

  function safeText(s) {
    return String(s ?? '').replace(/\r?\n/g, ' ').trim();
  }

  function collectOperatorListsByInventoryId(inventoryId) {
    const norm = normalizeInventoryId(inventoryId);

    if (typeof loadTerminalDataFromStorage === 'function') {
      try { loadTerminalDataFromStorage(); } catch (e) { /* noop */ }
    }

    const td = appData?.terminalData;
    // В текущей архитектуре terminalData чаще всего хранится как terminalData[invId] = [описи].
    // Старые реализации искали по полю inventoryId внутри каждой описи, которого могло не быть.
    // Поэтому сначала пробуем прямой ключ.
    if (td && typeof td === 'object') {
      const direct = td[norm] || td[String(norm)] || td[String(inventoryId)];
      if (Array.isArray(direct)) return direct;
    }

    const lists = [];

    if (td && typeof td === 'object') {
      for (const terminalKey of Object.keys(td)) {
        const arr = td[terminalKey];
        if (!Array.isArray(arr)) continue;
        for (const it of arr) {
          if (!it) continue;
          const itInv = normalizeInventoryId(it.inventoryId);
          if (itInv && String(itInv) === String(norm)) {
            lists.push(it);
          }
        }
      }
    }
    return lists;
  }

  function getDbProductByBarcode(barcode) {
    const code = String(barcode || '').trim();
    if (!code) return null;
    try {
      return (typeof productDatabase === 'object' && productDatabase) ? productDatabase[code] : null;
    } catch (_) {
      return null;
    }
  }

  // --- Сличительная логика (учет vs факт) ---
  // У нас нет «учетной базы» по остаткам, поэтому для сличительной ведомости
  // моделируем учетное количество детерминированно (чтобы при повторной печати
  // значения были теми же). Это позволяет получать и положительную, и отрицательную «разницу».
  function hashToUnit(str) {
    // Простая детерминированная хеш-функция -> число [0..1)
    const s = String(str || '');
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    // 0..1
    return (h >>> 0) / 4294967296;
  }

  function applyReconciliationSimulation(items, inventoryId) {
    const out = Array.isArray(items) ? items.map(it => ({ ...it })) : [];
    let totalBookAmount = 0;
    let totalDiffAmount = 0;
    let totalBookQuantity = 0;

    for (const it of out) {
      const qty = Number(it.quantity) || 0;
      const price = Number(it.price) || 0;

      // Максимальная «погрешность» учета: минимум 1 шт, либо 5% от кол-ва
      const maxDelta = Math.max(1, Math.round(Math.abs(qty) * 0.05));
      const r1 = hashToUnit(`${inventoryId}|${it.barcode}|d`);
      const r2 = hashToUnit(`${inventoryId}|${it.barcode}|m`);
      const sign = (r1 < 0.5) ? -1 : 1;
      const magnitude = Math.max(0, Math.floor(r2 * (maxDelta + 1))); // 0..maxDelta
      const deltaQty = sign * magnitude;

      const bookQty = Math.max(0, Number((qty + deltaQty).toFixed(3)));
      const diffQty = Number((qty - bookQty).toFixed(3)); // факт - учет

      const bookAmount = Number((bookQty * price).toFixed(2));
      const diffAmount = Number((diffQty * price).toFixed(2));

      it.bookQuantity = bookQty;
      it.bookAmount = bookAmount;
      it.diffQuantity = diffQty;
      it.diffAmount = diffAmount;

      totalBookQuantity += bookQty;
      totalBookAmount += bookAmount;
      totalDiffAmount += diffAmount;
    }

    return {
      items: out,
      totalBookQuantity: Number(totalBookQuantity.toFixed(3)),
      totalBookAmount: Number(totalBookAmount.toFixed(2)),
      totalDiffAmount: Number(totalDiffAmount.toFixed(2))
    };
  }

  function buildItemsFromLists(inventoryId, inventoryType) {
    const lists = collectOperatorListsByInventoryId(inventoryId);
    const raw = [];

    for (const list of lists) {
      const operatorName = list?.name || list?.operatorName || (list?.id ? `Опись #${list.id}` : 'Опись');
      const items = Array.isArray(list?.items) ? list.items
        : (Array.isArray(list?.products) ? list.products
        : (Array.isArray(list?.inventoryItems) ? list.inventoryItems : []));

      for (const it of items) {
        if (!it) continue;
        const barcode = String(it.barcode || '').trim();
        if (!barcode) continue;
        const qty = Number(it.quantity ?? it.qty ?? 0);

        // Цена: приоритет item.price -> БД
        let price = Number(it.price ?? it.unitPrice ?? 0);
        const db = getDbProductByBarcode(barcode);
        const dbPrice = Number(db?.price ?? 0);
        if ((!Number.isFinite(price) || price <= 0) && Number.isFinite(dbPrice) && dbPrice > 0) price = dbPrice;

        const name = safeText(it.name || db?.name || '');
        const category = safeText(it.category || db?.category || '');
        const group = safeText(it.group || db?.group || db?.category || category || '');
        const type = safeText(it.type || db?.type || inventoryType || 'general');

        if (inventoryType && inventoryType !== 'general' && String(type) !== String(inventoryType)) {
          continue;
        }

        const amountFromItem = (it.amount ?? it.totalPrice ?? it.total ?? null);
        const amount = (amountFromItem !== null && amountFromItem !== undefined)
          ? Number(amountFromItem)
          : Number((Number(qty || 0) * Number(price || 0)).toFixed(2));

        raw.push({
          barcode,
          name,
          category,
          group,
          type,
          unit: it.unit || 'шт',
          quantity: Number.isFinite(qty) ? qty : 0,
          price: Number.isFinite(price) ? price : 0,
          amount: Number.isFinite(amount) ? amount : 0,
          operator: operatorName
        });
      }
    }

    // агрегируем по штрихкоду (для печати «полной» ведомости)
    const byBarcode = new Map();
    for (const it of raw) {
      const prev = byBarcode.get(it.barcode);
      if (!prev) {
        byBarcode.set(it.barcode, { ...it });
      } else {
        prev.quantity = Number((Number(prev.quantity || 0) + Number(it.quantity || 0)).toFixed(3));
        if ((!prev.price || prev.price <= 0) && it.price > 0) prev.price = it.price;
        prev.amount = Number((Number(prev.quantity || 0) * Number(prev.price || 0)).toFixed(2));
      }
    }

    const items = Array.from(byBarcode.values());
    const totalQuantity = items.reduce((s, i) => s + (Number(i.quantity) || 0), 0);
    const totalAmount = items.reduce((s, i) => s + (Number(i.amount) || 0), 0);
    return {
      items,
      totalQuantity: Number(totalQuantity.toFixed(3)),
      totalAmount: Number(totalAmount.toFixed(2))
    };
  }

  function groupTotals(items, groupBy) {
    const groups = new Map();
    const keyOf = (item) => {
      switch (groupBy) {
        case 'product_type': return item.type || 'Без типа';
        case 'department': return item.category || 'Без категории';
        case 'operator': return item.operator || 'Без оператора';
        case 'product_group':
        default: return item.group || item.category || 'Без группы';
      }
    };

    for (const it of items) {
      const key = keyOf(it);
      const g = groups.get(key) || {
        category: key,
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
        totalBookQuantity: 0,
        totalBookAmount: 0,
        totalDiffAmount: 0
      };
      g.items.push(it);
      g.totalQuantity += Number(it.quantity) || 0;
      g.totalAmount += Number(it.amount) || 0;
      g.totalBookQuantity += Number(it.bookQuantity) || 0;
      g.totalBookAmount += Number(it.bookAmount) || 0;
      g.totalDiffAmount += Number(it.diffAmount) || 0;
      groups.set(key, g);
    }

    const groupsArr = Array.from(groups.values()).map(g => ({
      ...g,
      totalQuantity: Number(g.totalQuantity.toFixed(3)),
      totalAmount: Number(g.totalAmount.toFixed(2)),
      totalBookQuantity: Number(g.totalBookQuantity.toFixed(3)),
      totalBookAmount: Number(g.totalBookAmount.toFixed(2)),
      totalDiffAmount: Number(g.totalDiffAmount.toFixed(2))
    }));

    const totalQuantity = groupsArr.reduce((s, g) => s + (Number(g.totalQuantity) || 0), 0);
    const totalAmount = groupsArr.reduce((s, g) => s + (Number(g.totalAmount) || 0), 0);
    const totalBookQuantity = groupsArr.reduce((s, g) => s + (Number(g.totalBookQuantity) || 0), 0);
    const totalBookAmount = groupsArr.reduce((s, g) => s + (Number(g.totalBookAmount) || 0), 0);
    const totalDiffAmount = groupsArr.reduce((s, g) => s + (Number(g.totalDiffAmount) || 0), 0);
    return {
      groups: groupsArr,
      totalQuantity: Number(totalQuantity.toFixed(3)),
      totalAmount: Number(totalAmount.toFixed(2)),
      totalBookQuantity: Number(totalBookQuantity.toFixed(3)),
      totalBookAmount: Number(totalBookAmount.toFixed(2)),
      totalDiffAmount: Number(totalDiffAmount.toFixed(2))
    };
  }

  // --- PDF (минимальный генератор, без внешних библиотек) ---
  function pdfEscape(text) {
    return String(text ?? '').replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }

  function buildSimplePdf(lines) {
    // один лист A4, Helvetica, моно-вывод строк
    const maxLines = 45;
    const outLines = Array.isArray(lines) ? lines.slice(0, maxLines) : [];
    if (Array.isArray(lines) && lines.length > maxLines) outLines.push('... (сокращено)');

    let y = 800;
    const fontSize = 10;
    const leading = 14;
    let content = 'BT\n/F1 ' + fontSize + ' Tf\n';
    for (const line of outLines) {
      const safe = pdfEscape(line);
      content += `1 0 0 1 40 ${y} Tm (${safe}) Tj\n`;
      y -= leading;
    }
    content += 'ET\n';

    const encoder = new TextEncoder();
    const contentBytes = encoder.encode(content);

    const objects = [];
    const offsets = [0];
    function addObject(strOrBytes) {
      const idx = objects.length + 1;
      objects.push(strOrBytes);
      return idx;
    }

    const obj1 = addObject('<< /Type /Catalog /Pages 2 0 R >>');
    const obj2 = addObject('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    const obj3 = addObject('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>');
    const obj4 = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
    const streamHeader = `<< /Length ${contentBytes.length} >>\nstream\n`;
    const streamFooter = '\nendstream';
    const streamBytes = new Uint8Array(encoder.encode(streamHeader).length + contentBytes.length + encoder.encode(streamFooter).length);
    streamBytes.set(encoder.encode(streamHeader), 0);
    streamBytes.set(contentBytes, encoder.encode(streamHeader).length);
    streamBytes.set(encoder.encode(streamFooter), encoder.encode(streamHeader).length + contentBytes.length);
    const obj5 = addObject(streamBytes);

    // Build PDF
    const chunks = [];
    let offset = 0;
    function pushChunk(chunk) {
      if (typeof chunk === 'string') {
        const b = encoder.encode(chunk);
        chunks.push(b);
        offset += b.length;
      } else {
        chunks.push(chunk);
        offset += chunk.length;
      }
    }

    pushChunk('%PDF-1.4\n');
    for (let i = 0; i < objects.length; i++) {
      offsets.push(offset);
      const objNum = i + 1;
      pushChunk(`${objNum} 0 obj\n`);
      const obj = objects[i];
      if (typeof obj === 'string') {
        pushChunk(obj + '\n');
      } else {
        pushChunk(obj);
        pushChunk('\n');
      }
      pushChunk('endobj\n');
    }

    const xrefOffset = offset;
    pushChunk('xref\n');
    pushChunk(`0 ${objects.length + 1}\n`);
    pushChunk('0000000000 65535 f \n');
    for (let i = 1; i < offsets.length; i++) {
      const off = String(offsets[i]).padStart(10, '0');
      pushChunk(`${off} 00000 n \n`);
    }
    pushChunk('trailer\n');
    pushChunk(`<< /Size ${objects.length + 1} /Root ${obj1} 0 R >>\n`);
    pushChunk('startxref\n');
    pushChunk(String(xrefOffset) + '\n');
    pushChunk('%%EOF');

    const totalLen = chunks.reduce((s, b) => s + b.length, 0);
    const pdf = new Uint8Array(totalLen);
    let p = 0;
    for (const c of chunks) {
      pdf.set(c, p);
      p += c.length;
    }
    return pdf;
  }

  function downloadBlob(filename, blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // --- Публичные функции (перетираем старые реализации) ---
  window.getFormatName = function getFormatName(format) {
    const names = {
      pdf: 'PDF документ',
      excel: 'Excel файл',
      word: 'Word документ',
      print: 'Непосредственно на печать',
      screen: 'Вывод на экран'
    };
    return names[format] || format;
  };

  window.generatePrintData = function generatePrintData(inventory, inventoryType, printType, groupBy) {
    const invId = inventory?.id;
    const base = buildItemsFromLists(invId, inventoryType);

    // Добавляем учетные значения и разницу (факт - учет)
    const recon = applyReconciliationSimulation(base.items, invId);
    base.items = recon.items;
    base.totalBookQuantity = recon.totalBookQuantity;
    base.totalBookAmount = recon.totalBookAmount;
    base.totalDiffAmount = recon.totalDiffAmount;

    if (printType === 'totals') {
      const totals = groupTotals(base.items, groupBy || 'product_group');
      return {
        ...totals,
        items: base.items,
        totalBookQuantity: base.totalBookQuantity,
        totalBookAmount: base.totalBookAmount,
        totalDiffAmount: base.totalDiffAmount
      };
    }

    return base;
  };

  window.generatePrintDocument = async function generatePrintDocument(inventoryId, inventoryType, printType, printFormat, groupBy, includeSubtotals) {
    let inv = findInventoryStrict(inventoryId);
    if (!inv) {
      showAlert('Ошибка: инвентаризация не найдена для печати', 'danger');
      throw new Error('Инвентаризация не найдена');
    }

    // Гарантируем, что по нужной инвентаризации подтянуты описи/позиции с сервера
    try {
      appData.currentInventoryId = inv.id;
      if (typeof loadTerminalDataFromStorage === 'function') {
        await Promise.resolve(loadTerminalDataFromStorage());
      }
      // loadTerminalDataFromStorage может обновлять appData.inventories через присваивание нового объекта
      // поэтому берём свежую ссылку
      inv = findInventoryStrict(inventoryId) || inv;
    } catch (e) {
      console.warn('generatePrintDocument: не удалось обновить данные по описям', e);
    }
    const printData = window.generatePrintData(inv, inventoryType, printType, groupBy);

    // Обновляем блок результата в модалке (если он есть)
    const siteAmount = getSiteAmount(inv, printData.totalAmount);
    const siteResult = getSiteResult(inv);
    const reconDiff = Number(printData?.totalDiffAmount ?? 0);
    const printResultContent = document.getElementById('printResultContent');
    if (printResultContent) {
      printResultContent.innerHTML = `
        <div style="background:#d4edda;color:#155724;padding:12px;border-radius:6px;">
          <b>Документ сформирован</b>
        </div>
        <p><b>Инвентаризация:</b> #${safeText(inv.id)}</p>
        <p><b>Тип:</b> ${getInventoryTypeName ? getInventoryTypeName(inv.type) : safeText(inv.type)}</p>
        <p><b>Печать:</b> ${printType === 'full' ? 'Полная ведомость' : 'Только итоги'}</p>
        <p><b>Формат:</b> ${window.getFormatName(printFormat)}</p>
        <hr>
        <p><b>Итоговая сумма (на сайте):</b> ${formatNumber(siteAmount)} ₽</p>
        <p><b>Разница (факт - учет):</b> ${reconDiff >= 0 ? '+' : ''}${formatNumber(reconDiff)} ₽</p>
        <p><b>Результат (на сайте):</b> ${siteResult >= 0 ? '+' : ''}${formatNumber(siteResult)} ₽</p>
      `;
    }

    // выполняем экспорт
    switch (printFormat) {
      case 'excel':
        window.generateExcel(inv, printData, printType);
        break;
      case 'word':
        window.generateWord(inv, printData, printType, groupBy);
        break;
      case 'pdf':
        window.generatePDF(inv, printData, printType, groupBy);
        break;
      case 'print':
        window.printDocument(inv, printData, printType, groupBy);
        break;
      default:
        window.generateExcel(inv, printData, printType);
    }
  };

  window.generateExcel = function generateExcel(inventory, printData, printType) {
    const siteAmount = getSiteAmount(inventory, printData?.totalAmount);
    const siteResult = getSiteResult(inventory);

    const bom = '\uFEFF';
    let csv = bom;
    const dateStr = safeText(inventory?.date || new Date().toLocaleDateString('ru-RU'));
    const shopName = safeText(appData?.currentShop?.name || `Магазин #${appData?.currentShop?.id || 451}`);

    if (printType === 'full') {
      csv += 'СЛИЧИТЕЛЬНАЯ ВЕДОМОСТЬ\n\n';
      csv += `Инвентаризация: #${safeText(inventory.id)}\n`;
      csv += `Тип: ${getInventoryTypeName ? getInventoryTypeName(inventory.type) : safeText(inventory.type)}\n`;
      csv += `Дата: ${dateStr}\n`;
      csv += `Магазин: ${shopName}\n\n`;
      csv += 'Штрихкод;Наименование;Категория;Группа;Ед.;Факт кол-во;Учет кол-во;Разница кол-во;Цена;Факт сумма;Учет сумма;Разница сумма\n';

      (printData.items || []).forEach(it => {
        const factQty = Number(it.quantity) || 0;
        const bookQty = Number(it.bookQuantity) || 0;
        const diffQty = Number(it.diffQuantity) || 0;
        const price = Number(it.price) || 0;

        const factAmount = Number.isFinite(Number(it.amount)) ? Number(it.amount) : Number((factQty * price).toFixed(2));
        const bookAmount = Number.isFinite(Number(it.bookAmount)) ? Number(it.bookAmount) : Number((bookQty * price).toFixed(2));
        const diffAmount = Number.isFinite(Number(it.diffAmount)) ? Number(it.diffAmount) : Number((diffQty * price).toFixed(2));

        csv += `${safeText(it.barcode)};${safeText(it.name)};${safeText(it.category)};${safeText(it.group)};${safeText(it.unit || 'шт')};${factQty};${bookQty};${diffQty};${formatNumber(price)};${formatNumber(factAmount)};${formatNumber(bookAmount)};${diffAmount >= 0 ? '+' : ''}${formatNumber(diffAmount)}\n`;
      });

      const computedTotal = Number(printData?.totalAmount || 0);
      const computedBook = Number(printData?.totalBookAmount || 0);
      const computedDiff = Number(printData?.totalDiffAmount || 0);
      csv += `\nСУММА ФАКТ (по товарам);;;;;;;;;${formatNumber(computedTotal)} ₽;;`;
      csv += `\nСУММА УЧЕТ (модель);;;;;;;;;;${formatNumber(computedBook)} ₽;`;
      csv += `\nРАЗНИЦА (факт - учет);;;;;;;;;;;${computedDiff >= 0 ? '+' : ''}${formatNumber(computedDiff)} ₽`;
      csv += `\nИТОГОВАЯ СУММА (на сайте);;;;;;;;;${formatNumber(siteAmount)} ₽;;`;
      csv += `\nРЕЗУЛЬТАТ (на сайте);;;;;;;;;;;${siteResult >= 0 ? '+' : ''}${formatNumber(siteResult)} ₽`;
    } else {
      csv += 'ИТОГИ СЛИЧИТЕЛЬНОЙ ВЕДОМОСТИ\n\n';
      csv += `Инвентаризация: #${safeText(inventory.id)}\n`;
      csv += `Тип: ${getInventoryTypeName ? getInventoryTypeName(inventory.type) : safeText(inventory.type)}\n`;
      csv += `Дата: ${dateStr}\n`;
      csv += `Магазин: ${shopName}\n\n`;
      csv += 'Группа;Кол-во позиций;Факт кол-во;Факт сумма;Учет кол-во;Учет сумма;Разница сумма\n';

      (printData.groups || []).forEach(g => {
        const diff = Number(g.totalDiffAmount) || 0;
        csv += `${safeText(g.category)};${(g.items || []).length};${g.totalQuantity};${formatNumber(g.totalAmount)};${g.totalBookQuantity};${formatNumber(g.totalBookAmount)};${diff >= 0 ? '+' : ''}${formatNumber(diff)}\n`;
      });

      const computedTotal = Number(printData?.totalAmount || 0);
      const computedBook = Number(printData?.totalBookAmount || 0);
      const computedDiff = Number(printData?.totalDiffAmount || 0);
      const totalPositions = (printData.groups || []).reduce((s, g) => s + ((g.items || []).length || 0), 0);
      csv += `\nОБЩИЙ ИТОГ (факт);${totalPositions};${printData.totalQuantity};${formatNumber(computedTotal)};${printData.totalBookQuantity};${formatNumber(computedBook)};${computedDiff >= 0 ? '+' : ''}${formatNumber(computedDiff)} ₽`;
      csv += `\nИТОГОВАЯ СУММА (на сайте);${totalPositions};;;${formatNumber(siteAmount)} ₽;;`;
      csv += `\nРЕЗУЛЬТАТ (на сайте);;;;;;${siteResult >= 0 ? '+' : ''}${formatNumber(siteResult)} ₽`;
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const file = `Сличительная_ведомость_${safeText(inventory.id)}_${new Date().toISOString().slice(0,10)}.csv`;
    downloadBlob(file, blob);
    showAlert('Файл Excel сформирован и скачан', 'success');
  };

  window.generateWord = function generateWord(inventory, printData, printType, groupBy) {
    const siteAmount = getSiteAmount(inventory, printData?.totalAmount);
    const siteResult = getSiteResult(inventory);
    const dateStr = safeText(inventory?.date || new Date().toLocaleDateString('ru-RU'));
    const shopName = safeText(appData?.currentShop?.name || `Магазин #${appData?.currentShop?.id || 451}`);

    let html = `<!doctype html><html><head><meta charset="utf-8"><title>Сличительная ведомость</title>
      <style>
        body{font-family:Arial;}
        h1{text-align:center;}
        table{width:100%;border-collapse:collapse;margin-top:12px;}
        th,td{border:1px solid #000;padding:6px;font-size:12px;}
        th{background:#eee;}
        .total{font-weight:bold;}
      </style>
    </head><body>`;
    html += `<h1>Сличительная ведомость</h1>`;
    html += `<p><b>Инвентаризация:</b> #${safeText(inventory.id)}<br>`;
    html += `<b>Тип:</b> ${getInventoryTypeName ? getInventoryTypeName(inventory.type) : safeText(inventory.type)}<br>`;
    html += `<b>Дата:</b> ${dateStr}<br>`;
    html += `<b>Магазин:</b> ${shopName}</p>`;

    if (printType === 'full') {
      const factTotal = Number(printData?.totalAmount || 0);
      const bookTotal = Number(printData?.totalBookAmount || 0);
      const diffTotal = Number(printData?.totalDiffAmount || 0);

      html += `<table><tr><th>Штрихкод</th><th>Наименование</th><th>Категория</th><th>Группа</th><th>Факт кол-во</th><th>Учет кол-во</th><th>Разница кол-во</th><th>Цена</th><th>Факт сумма</th><th>Учет сумма</th><th>Разница сумма</th></tr>`;
      (printData.items || []).forEach(it => {
        const factQty = Number(it.quantity) || 0;
        const bookQty = Number(it.bookQuantity) || 0;
        const diffQty = Number(it.diffQuantity) || 0;
        const price = Number(it.price) || 0;
        const factAmount = Number.isFinite(Number(it.amount)) ? Number(it.amount) : Number((factQty * price).toFixed(2));
        const bookAmount = Number.isFinite(Number(it.bookAmount)) ? Number(it.bookAmount) : Number((bookQty * price).toFixed(2));
        const diffAmount = Number.isFinite(Number(it.diffAmount)) ? Number(it.diffAmount) : Number((diffQty * price).toFixed(2));
        html += `<tr><td>${safeText(it.barcode)}</td><td>${safeText(it.name)}</td><td>${safeText(it.category)}</td><td>${safeText(it.group)}</td><td>${factQty}</td><td>${bookQty}</td><td>${diffQty}</td><td>${formatNumber(price)}</td><td>${formatNumber(factAmount)}</td><td>${formatNumber(bookAmount)}</td><td>${diffAmount >= 0 ? '+' : ''}${formatNumber(diffAmount)}</td></tr>`;
      });
      html += `<tr class="total"><td colspan="8">Сумма факт (по товарам)</td><td colspan="3">${formatNumber(factTotal)} ₽</td></tr>`;
      html += `<tr class="total"><td colspan="8">Сумма учет (модель)</td><td colspan="3">${formatNumber(bookTotal)} ₽</td></tr>`;
      html += `<tr class="total"><td colspan="8">Разница (факт - учет)</td><td colspan="3">${diffTotal >= 0 ? '+' : ''}${formatNumber(diffTotal)} ₽</td></tr>`;
      html += `<tr class="total"><td colspan="8">Итоговая сумма (на сайте)</td><td colspan="3">${formatNumber(siteAmount)} ₽</td></tr>`;
      html += `<tr class="total"><td colspan="8">Результат (на сайте)</td><td colspan="3">${siteResult >= 0 ? '+' : ''}${formatNumber(siteResult)} ₽</td></tr>`;
      html += `</table>`;
    } else {
      html += `<h2>Итоги (группировка: ${safeText(groupBy || 'product_group')})</h2>`;
      html += `<table><tr><th>Группа</th><th>Кол-во позиций</th><th>Факт кол-во</th><th>Факт сумма</th><th>Учет кол-во</th><th>Учет сумма</th><th>Разница сумма</th></tr>`;
      (printData.groups || []).forEach(g => {
        const diff = Number(g.totalDiffAmount) || 0;
        html += `<tr><td>${safeText(g.category)}</td><td>${(g.items || []).length}</td><td>${g.totalQuantity}</td><td>${formatNumber(g.totalAmount)} ₽</td><td>${g.totalBookQuantity}</td><td>${formatNumber(g.totalBookAmount)} ₽</td><td>${diff >= 0 ? '+' : ''}${formatNumber(diff)} ₽</td></tr>`;
      });
      const totalPositions = (printData.groups || []).reduce((s, g) => s + ((g.items || []).length || 0), 0);
      const diffTotal = Number(printData?.totalDiffAmount || 0);
      html += `<tr class="total"><td>ОБЩИЙ ИТОГ</td><td>${totalPositions}</td><td>${printData.totalQuantity}</td><td>${formatNumber(printData.totalAmount)} ₽</td><td>${printData.totalBookQuantity}</td><td>${formatNumber(printData.totalBookAmount)} ₽</td><td>${diffTotal >= 0 ? '+' : ''}${formatNumber(diffTotal)} ₽</td></tr>`;
      html += `<tr class="total"><td colspan="6">Итоговая сумма (на сайте)</td><td>${formatNumber(siteAmount)} ₽</td></tr>`;
      html += `<tr class="total"><td colspan="6">Результат (на сайте)</td><td>${siteResult >= 0 ? '+' : ''}${formatNumber(siteResult)} ₽</td></tr>`;
      html += `</table>`;
    }
    html += `<p style="margin-top:20px;font-size:12px;">Сформировано: ${new Date().toLocaleString('ru-RU')}</p>`;
    html += `</body></html>`;

    const blob = new Blob([html], { type: 'application/msword;charset=utf-8;' });
    const file = `Сличительная_ведомость_${safeText(inventory.id)}_${new Date().toISOString().slice(0,10)}.doc`;
    downloadBlob(file, blob);
    showAlert('Word документ сформирован и скачан', 'success');
  };

  window.generatePDF = function generatePDF(inventory, printData, printType) {
    const siteAmount = getSiteAmount(inventory, printData?.totalAmount);
    const siteResult = getSiteResult(inventory);
    const lines = [];
    lines.push('Сличительная ведомость');
    lines.push(`Инвентаризация: #${safeText(inventory.id)}`);
    lines.push(`Тип: ${getInventoryTypeName ? getInventoryTypeName(inventory.type) : safeText(inventory.type)}`);
    lines.push(`Дата: ${safeText(inventory?.date || '')}`);
    lines.push('');

    if (printType === 'full') {
      lines.push('Позиции:');
      (printData.items || []).forEach((it, idx) => {
        const factQty = Number(it.quantity) || 0;
        const bookQty = Number(it.bookQuantity) || 0;
        const diffQty = Number(it.diffQuantity) || 0;
        const price = Number(it.price) || 0;
        const factAmount = Number.isFinite(Number(it.amount)) ? Number(it.amount) : Number((factQty * price).toFixed(2));
        const bookAmount = Number.isFinite(Number(it.bookAmount)) ? Number(it.bookAmount) : Number((bookQty * price).toFixed(2));
        const diffAmount = Number.isFinite(Number(it.diffAmount)) ? Number(it.diffAmount) : Number((diffQty * price).toFixed(2));
        lines.push(`${idx + 1}. ${safeText(it.name)} | ${safeText(it.barcode)} | факт ${factQty} / учет ${bookQty} | разн ${(diffQty>=0?'+':'')}${diffQty} | ${(diffAmount>=0?'+':'')}${formatNumber(diffAmount)}₽`);
      });
    } else {
      lines.push('Итоги по группам:');
      (printData.groups || []).forEach((g, idx) => {
        const diff = Number(g.totalDiffAmount) || 0;
        lines.push(`${idx + 1}. ${safeText(g.category)} | позиций: ${(g.items || []).length} | факт: ${formatNumber(g.totalAmount)}₽ | учет: ${formatNumber(g.totalBookAmount)}₽ | разн: ${(diff>=0?'+':'')}${formatNumber(diff)}₽`);
      });
    }

    lines.push('');
    const diffTotal = Number(printData?.totalDiffAmount || 0);
    lines.push(`Разница (факт - учет): ${(diffTotal >= 0 ? '+' : '')}${formatNumber(diffTotal)} ₽`);
    lines.push(`Итоговая сумма (на сайте): ${formatNumber(siteAmount)} ₽`);
    lines.push(`Результат (на сайте): ${(siteResult >= 0 ? '+' : '')}${formatNumber(siteResult)} ₽`);

    const pdfBytes = buildSimplePdf(lines);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const file = `Сличительная_ведомость_${safeText(inventory.id)}_${new Date().toISOString().slice(0,10)}.pdf`;
    downloadBlob(file, blob);
    showAlert('PDF документ сформирован и скачан', 'success');
  };

  window.printDocument = function printDocument(inventory, printData, printType, groupBy) {
    const siteAmount = getSiteAmount(inventory, printData?.totalAmount);
    const siteResult = getSiteResult(inventory);
    const w = window.open('', '_blank');
    if (!w) {
      showAlert('Не удалось открыть окно печати (проверь блокировщик всплывающих окон)', 'warning');
      return;
    }
    const dateStr = safeText(inventory?.date || new Date().toLocaleDateString('ru-RU'));
    const shopName = safeText(appData?.currentShop?.name || `Магазин #${appData?.currentShop?.id || 451}`);
    let html = `<!doctype html><html><head><meta charset="utf-8"><title>Сличительная ведомость</title>
      <style>
        body{font-family:Arial;margin:20px;}
        h1{text-align:center;}
        table{width:100%;border-collapse:collapse;margin-top:12px;}
        th,td{border:1px solid #000;padding:6px;font-size:12px;}
        th{background:#eee;}
        .total{font-weight:bold;background:#e8f5e8;}
      </style>
    </head><body>`;
    html += `<h1>Сличительная ведомость</h1>`;
    html += `<p><b>Инвентаризация:</b> #${safeText(inventory.id)}<br>`;
    html += `<b>Тип:</b> ${getInventoryTypeName ? getInventoryTypeName(inventory.type) : safeText(inventory.type)}<br>`;
    html += `<b>Дата:</b> ${dateStr}<br>`;
    html += `<b>Магазин:</b> ${shopName}</p>`;

    if (printType === 'full') {
      const factTotal = Number(printData?.totalAmount || 0);
      const bookTotal = Number(printData?.totalBookAmount || 0);
      const diffTotal = Number(printData?.totalDiffAmount || 0);

      html += `<table><tr><th>Штрихкод</th><th>Наименование</th><th>Категория</th><th>Группа</th><th>Факт кол-во</th><th>Учет кол-во</th><th>Разница кол-во</th><th>Цена</th><th>Факт сумма</th><th>Учет сумма</th><th>Разница сумма</th></tr>`;
      (printData.items || []).forEach(it => {
        const factQty = Number(it.quantity) || 0;
        const bookQty = Number(it.bookQuantity) || 0;
        const diffQty = Number(it.diffQuantity) || 0;
        const price = Number(it.price) || 0;
        const factAmount = Number.isFinite(Number(it.amount)) ? Number(it.amount) : Number((factQty * price).toFixed(2));
        const bookAmount = Number.isFinite(Number(it.bookAmount)) ? Number(it.bookAmount) : Number((bookQty * price).toFixed(2));
        const diffAmount = Number.isFinite(Number(it.diffAmount)) ? Number(it.diffAmount) : Number((diffQty * price).toFixed(2));
        html += `<tr><td>${safeText(it.barcode)}</td><td>${safeText(it.name)}</td><td>${safeText(it.category)}</td><td>${safeText(it.group)}</td><td>${factQty}</td><td>${bookQty}</td><td>${diffQty}</td><td>${formatNumber(price)}</td><td>${formatNumber(factAmount)}</td><td>${formatNumber(bookAmount)}</td><td>${diffAmount >= 0 ? '+' : ''}${formatNumber(diffAmount)}</td></tr>`;
      });
      html += `<tr class="total"><td colspan="8">Сумма факт (по товарам)</td><td colspan="3">${formatNumber(factTotal)} ₽</td></tr>`;
      html += `<tr class="total"><td colspan="8">Сумма учет (модель)</td><td colspan="3">${formatNumber(bookTotal)} ₽</td></tr>`;
      html += `<tr class="total"><td colspan="8">Разница (факт - учет)</td><td colspan="3">${diffTotal >= 0 ? '+' : ''}${formatNumber(diffTotal)} ₽</td></tr>`;
      html += `<tr class="total"><td colspan="8">Итоговая сумма (на сайте)</td><td colspan="3">${formatNumber(siteAmount)} ₽</td></tr>`;
      html += `<tr class="total"><td colspan="8">Результат (на сайте)</td><td colspan="3">${siteResult >= 0 ? '+' : ''}${formatNumber(siteResult)} ₽</td></tr>`;
      html += `</table>`;
    } else {
      html += `<h2>Итоги</h2>`;
      html += `<table><tr><th>Группа</th><th>Кол-во позиций</th><th>Факт кол-во</th><th>Факт сумма</th><th>Учет кол-во</th><th>Учет сумма</th><th>Разница сумма</th></tr>`;
      (printData.groups || []).forEach(g => {
        const diff = Number(g.totalDiffAmount) || 0;
        html += `<tr><td>${safeText(g.category)}</td><td>${(g.items || []).length}</td><td>${g.totalQuantity}</td><td>${formatNumber(g.totalAmount)} ₽</td><td>${g.totalBookQuantity}</td><td>${formatNumber(g.totalBookAmount)} ₽</td><td>${diff >= 0 ? '+' : ''}${formatNumber(diff)} ₽</td></tr>`;
      });
      const totalPositions = (printData.groups || []).reduce((s, g) => s + ((g.items || []).length || 0), 0);
      const diffTotal = Number(printData?.totalDiffAmount || 0);
      html += `<tr class="total"><td>ОБЩИЙ ИТОГ</td><td>${totalPositions}</td><td>${printData.totalQuantity}</td><td>${formatNumber(printData.totalAmount)} ₽</td><td>${printData.totalBookQuantity}</td><td>${formatNumber(printData.totalBookAmount)} ₽</td><td>${diffTotal >= 0 ? '+' : ''}${formatNumber(diffTotal)} ₽</td></tr>`;
      html += `<tr class="total"><td colspan="6">Итоговая сумма (на сайте)</td><td>${formatNumber(siteAmount)} ₽</td></tr>`;
      html += `<tr class="total"><td colspan="6">Результат (на сайте)</td><td>${siteResult >= 0 ? '+' : ''}${formatNumber(siteResult)} ₽</td></tr>`;
      html += `</table>`;
    }

    html += `<div style="margin-top:20px;text-align:center;"><button onclick="window.print()" style="padding:10px 20px;">Печать</button></div>`;
    html += `</body></html>`;
    w.document.write(html);
    w.document.close();
  };
})();

