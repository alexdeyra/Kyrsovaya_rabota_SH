        function initShopSelection() {
            const shopList = document.querySelector('.shop-list');
            const selectShopBtn = document.getElementById('selectShopBtn');
            const shopSearchInput = document.getElementById('shopSearchInput');
            const searchShopBtn = document.getElementById('searchShopBtn');
            if (!shopList || !selectShopBtn) return;

            // Функция рендера доступна глобально, чтобы её мог вызвать initLogin после загрузки магазинов.
            function displayShops(shops) {
                shopList.innerHTML = '';
                selectShopBtn.disabled = true;
                appData.currentShop = null;

                (shops || []).forEach(shop => {
                    const shopItem = document.createElement('div');
                    shopItem.className = 'shop-item';
                    shopItem.setAttribute('data-shop-id', shop.id);

                    const shopName = document.createElement('h3');
                    shopName.textContent = shop.name;

                    const shopLocation = document.createElement('p');
                    shopLocation.textContent = shop.location;

                    const lastInventory = document.createElement('p');
                    lastInventory.textContent = `Последняя инвентаризация: ${shop.lastInventory || '—'}`;
                    lastInventory.style.fontSize = '12px';
                    lastInventory.style.marginTop = '5px';

                    shopItem.appendChild(shopName);
                    shopItem.appendChild(shopLocation);
                    shopItem.appendChild(lastInventory);

                    shopItem.addEventListener('click', function() {
                        document.querySelectorAll('.shop-item').forEach(i => i.classList.remove('active'));
                        this.classList.add('active');
                        selectShopBtn.disabled = false;

                        appData.currentShop = {
                            id: shop.id,
                            name: shop.name,
                            location: shop.location,
                            lastInventory: shop.lastInventory || null,
                            status: shop.status || null
                        };
                    });

                    shopList.appendChild(shopItem);
                });

                if (!shops || shops.length === 0) {
                    const empty = document.createElement('div');
                    empty.style.padding = '12px';
                    empty.style.opacity = '0.8';
                    empty.textContent = 'Магазины не найдены. Проверьте базу и установочный SQL.';
                    shopList.appendChild(empty);
                }
            }

            window.renderShopSelection = (shops) => displayShops(shops);

            async function ensureShopsLoaded() {
                if (appData.shops && appData.shops.length) return;
                try {
                    appData.shops = await DataManager.getShops();
                } catch (e) {
                    console.warn('Не удалось загрузить магазины:', e);
                    appData.shops = [];
                }
                displayShops(appData.shops);
            }

            // Поиск магазинов
            function searchShops() {
                const searchTerm = (shopSearchInput?.value || '').toLowerCase();
                const filteredShops = (appData.shops || []).filter(shop =>
                    (shop.name || '').toLowerCase().includes(searchTerm) ||
                    (shop.location || '').toLowerCase().includes(searchTerm) ||
                    String(shop.id || '').includes(searchTerm)
                );
                displayShops(filteredShops);
            }

            shopSearchInput && shopSearchInput.addEventListener('input', searchShops);
            searchShopBtn && searchShopBtn.addEventListener('click', searchShops);

            selectShopBtn.addEventListener('click', async function() {
                if (!appData.currentShop) return;

                document.getElementById('shopSelectScreen').style.display = 'none';
                document.getElementById('mainApp').style.display = 'block';

                // Обновляем отображение профиля (включая шапку)
                if (typeof updateProfileDisplay === 'function') updateProfileDisplay();

                await loadDashboard();
            });

            // На инициализации: если пользователь уже вошёл (сессия восстановилась), магазины уже могут быть загружены.
            ensureShopsLoaded();
        }

