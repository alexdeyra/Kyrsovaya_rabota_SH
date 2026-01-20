        function initHistorySearch() {
            const searchInput = document.getElementById('historySearch');
            const searchButton = document.querySelector('#history-tab .search-box button');
            
            searchButton.addEventListener('click', function() {
                const searchTerm = searchInput.value.toLowerCase();
                
                if (!searchTerm) {
                    loadHistoryTable();
                    return;
                }
                
                const filteredHistory = appData.history.filter(item => 
                    item.name.toLowerCase().includes(searchTerm) || 
                    item.responsible.toLowerCase().includes(searchTerm) ||
                    item.date.includes(searchTerm)
                );
                
                const tbody = document.getElementById('history-table').querySelector('tbody');
                tbody.innerHTML = '';
                
                filteredHistory.forEach(item => {
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
            });
        }

        // Инициализация раздела настроек
