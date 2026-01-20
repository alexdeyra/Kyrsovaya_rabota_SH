
        // Расширенные данные приложения
        // appData используется во многих файлах как глобальный объект состояния.
        // Важно: часть обработчиков проверяет наличие именно window.appData.
        const appData = {
            currentShop: null,
            currentUser: {
        name: "",
        role: "",
        login: "",
        phone: "",
        email: "",
        avatar: null
    },
	currentInventoryId: null,
	currentInventoryDate: null,
	isFullScreenView: false,
	
			
            inventories: [],
            documents: [],
            history: [],
            shops: [],
            problemShops: [],
            currentInventoryItem: null,
			currentInventoryItems: [],

            // Данные «терминала» (описи) по инвентаризациям: { [inventoryId]: Operator[] }
            // Многие экраны ожидают, что объект существует всегда.
            terminalData: {}
			
        };

        // Экспортируем в window для совместимости со всем кодом проекта
        // (часть логики обращается к window.appData).
        window.appData = appData;
		
		
		


