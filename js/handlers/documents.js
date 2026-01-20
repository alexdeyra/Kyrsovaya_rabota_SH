        function initDocumentChecking() {
            document.getElementById('checkDocumentsBtn').addEventListener('click', function() {
                const startDate = document.getElementById('startDate').value;
                const endDate = document.getElementById('endDate').value;
                
                if (!startDate || !endDate) {
                    showAlert('Укажите диапазон дат для проверки', 'warning');
                    return;
                }
                
                const start = new Date(startDate);
                const end = new Date(endDate);
                
                if (start > end) {
                    showAlert('Дата начала не может быть позже даты окончания', 'warning');
                    return;
                }
                
                // Проверяем документы в выбранном диапазоне
                const shopDocuments = appData.documents.filter(doc => doc.shopId === appData.currentShop.id);
                const docsToCheck = shopDocuments.filter(doc => {
                    const docDateParts = doc.date.split('/');
                    const docDate = new Date(`${docDateParts[2]}-${docDateParts[1]}-${docDateParts[0]}`);
                    return docDate >= start && docDate <= end;
                });
                
                if (docsToCheck.length === 0) {
                    showAlert(`Документов за период с ${formatDate(startDate)} по ${formatDate(endDate)} не найдено`, 'warning');
                    return;
                }
                
                // Подсчитываем открытые документы
                const openDocuments = docsToCheck.filter(doc => doc.status === 'open');
                
                // Формируем отчет о проверке
                const resultContainer = document.getElementById('documents-result');
                const statusContainer = document.getElementById('documents-status');
                
                resultContainer.style.display = 'block';
                statusContainer.innerHTML = '';
                
                if (openDocuments.length === 0) {
                    statusContainer.innerHTML = '<div class="alert alert-success">Все документы закрыты</div>';
                } else {
                    statusContainer.innerHTML = `
                        <div class="alert alert-warning">
                            <i class="fas fa-exclamation-triangle"></i> Найдено ${openDocuments.length} открытых документов
                        </div>
                        <p>Открытые документы:</p>
                        <ul>
                            ${openDocuments.map(doc => `<li>${doc.type} №${doc.number} от ${doc.date} (${formatNumber(doc.amount)} ₽)</li>`).join('')}
                        </ul>
                    `;
                }
                
                // Обновляем таблицу документов
                loadDocumentsTable();
                
                showAlert(`Проверка документов завершена. Найдено ${openDocuments.length} открытых документов.`, 
                          openDocuments.length > 0 ? 'warning' : 'success');
            });
        }

        // Загрузка таблицы истории
        function loadHistoryTable() {
            const tbody = document.getElementById('history-table').querySelector('tbody');
            tbody.innerHTML = '';
            
            const shopHistory = appData.history.filter(item => item.shopId === appData.currentShop.id);
            
            shopHistory.forEach(item => {
                const row = document.createElement('tr');
                
                row.appendChild(createCell(item.date));
                row.appendChild(createCell(item.name));
                row.appendChild(createCell(`${formatNumber(item.amount)} ₽`));
                
                const diffCell = document.createElement('td');
                const diffBadge = document.createElement('span');
                diffBadge.className = 'badge badge-danger';
                diffBadge.textContent = `${formatNumber(item.difference)} ₽`;
                diffCell.appendChild(diffBadge);
                row.appendChild(diffCell);
                
                const statusCell = document.createElement('td');
                const statusBadge = document.createElement('span');
                statusBadge.className = 'badge badge-success';
                statusBadge.textContent = 'Завершено';
                statusCell.appendChild(statusBadge);
                row.appendChild(statusCell);
                
                row.appendChild(createCell(item.responsible));
                
                tbody.appendChild(row);
            });
        }

        // Обновление сводных данных
        function updateSummaryData() {
            const shopInventories = appData.inventories.filter(inv => inv.shopId === appData.currentShop.id);
            const totalDiff = shopInventories.reduce((sum, inv) => sum + inv.difference, 0);
            document.getElementById('total-diff').textContent = `${formatNumber(totalDiff)} ₽`;
        }

        // Инициализация модальных окон
