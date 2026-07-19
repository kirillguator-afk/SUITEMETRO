
export const store = {
    config: {
        shopName: "MTR GREEN",
        description: "Trusted Platform Ecosystem",
        contacts: {
            telegram: "@mtr_green_admin",
            phone: "+7 (999) 000-00-00",
            location: "Network Access Only",
            channel: "mtr_green_reviews"
        }
    },
    trustedShops: [
        { id: 'yakuza', name: 'YAKUZA', admin: 'Yakuzzaa27', reviews: 'https://t.me/+QzHJQ9FImBQxNzdi', reviewChannelId: '-1002142468305', color: 'emerald' },
        { id: 'kolyan', name: 'KOLYAN', admin: 'Kolyan_0420', reviewChannelId: 'kolyan_node', color: 'green' },
        { id: 'felix', name: 'FELIXXX', bot: 'boxi_Fill1_bot', reviewChannelId: 'felix_node', color: 'teal' },
        { id: 'b13', name: 'B 13', admin: 'No_Name_hap', reviews: 'https://t.me/+JGqo0wDUWxFmMTIy', reviewChannelId: 'b13_node', color: 'amber' },
        { id: 'antibiotik', name: 'АНТИБИОТИК', admin: 'AntiBiotiK35', reviews: 'https://telegram.me/+zZeT9yS_KKZmZWQ6', reviewChannelId: 'antibiotik_node', color: 'rose' }
    ],
    state: {
        isAppLoading: true,
        isReviewsLoading: false,
        currentView: 'home', // 'home' | 'details' | 'mpanel'
        selectedShopId: null,
        reviews: [],
        error: null,
        isAdmin: true // По умолчанию true для теста, в боте проверяется через initData
    },
    
    listeners: [],
    subscribe(callback) { this.listeners.push(callback); },
    notify() { this.listeners.forEach(cb => cb(this.state)); },
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    },

    async navigateTo(view, shopId = null) {
        this.setState({ currentView: view, selectedShopId: shopId, reviews: [], error: null });
        const tg = window.Telegram?.WebApp;
        if (tg) {
            if (view !== 'home') tg.BackButton.show();
            else tg.BackButton.hide();
        }
        if (view === 'details') this.loadShopReviews(shopId);
    },

    async loadShopReviews(shopId) {
        this.setState({ isReviewsLoading: true });
        try {
            const { TelegramService } = await import('./services/api.js');
            const shop = this.trustedShops.find(s => s.id === shopId);
            const reviews = await TelegramService.fetchReviewsForShop(shopId, shop.reviewChannelId);
            this.setState({ reviews, isReviewsLoading: false });
        } catch (err) {
            this.setState({ error: "Ошибка загрузки", isReviewsLoading: false });
        }
    }
};
