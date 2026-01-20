        function initNavigation() {
            const navTabs = document.querySelectorAll('.nav-tabs li');
            
            navTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    navTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    const navId = this.getAttribute('data-nav');
                    document.querySelectorAll('.page-content').forEach(content => {
                        content.style.display = 'none';
                    });
                    
                    document.getElementById(`${navId}-content`).style.display = 'block';
                    
                    switch(navId) {
                        case 'dashboard':
                            loadDashboard();
                            break;
                        case 'inventories':
                            loadInventories();
                            break;
                        case 'shops':
                            loadShops();
                            break;
                        case 'operators':
                            loadOperators();
                            break;
                        case 'reports':
                            loadReports();
                            break;
                        case 'settings':
                            loadSettings();
                            break;
                    }
                });
            });
        }

        // Инициализация бокового меню
        function initSidebarMenu() {
            const sidebarItems = document.querySelectorAll('.sidebar-menu li');
            
            sidebarItems.forEach(item => {
                item.addEventListener('click', function() {
                    sidebarItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    
                    const action = this.getAttribute('data-sidebar');
                    executeSidebarAction(action);
                });
            });
        }

        // Выполнение действий бокового меню
        function executeSidebarAction(action) {
            switch(action) {
                case 'dashboard':
                    showNavTab('dashboard');
                    loadDashboard();
                    break;
                case 'create-inventory':
                    document.getElementById('createInventoryModal').style.display = 'flex';
                    break;
                case 'upload-inventories':
                    document.getElementById('uploadInventoriesModal').style.display = 'flex';
                    fillInventorySelect();
                    break;
                case 'check-documents':
                    checkDocuments();
                    break;
                case 'history':
                    showNavTab('dashboard');
                    document.querySelector('.tab[data-tab="history"]').click();
                    break;
                case 'help':
                    showAlert('Открыт раздел помощи', 'info');
                    break;
            }
        }

        // Показать вкладку навигации
        function showNavTab(tabId) {
            document.querySelectorAll('.nav-tabs li').forEach(tab => tab.classList.remove('active'));
            document.querySelector(`.nav-tabs li[data-nav="${tabId}"]`).classList.add('active');
            
            document.querySelectorAll('.page-content').forEach(content => {
                content.style.display = 'none';
            });
            
            document.getElementById(`${tabId}-content`).style.display = 'block';
        }

        // Инициализация панели управления
