
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
        {
            id: 'yakuza',
            name: 'YAKUZA',
            admin: 'Yakuzzaa27',
            chat: 'https://t.me/+UtnbRA0g0wg5ZTQ6',
            bot: 'Yakuzashp27bot',
            reviews: 'https://t.me/+QzHJQ9FImBQxNzdi',
            reviewChannelId: '-1002142468305', // Пример реального Chat ID канала YAKUZA
            color: 'emerald'
        },
        {
            id: 'kolyan',
            name: 'KOLYAN',
            admin: 'Kolyan_0420',
            chat: 'https://t.me/+F-x6Sr9uGkZmZGJh',
            reviewChannelId: 'kolyan_reviews',
            color: 'green'
        },
        {
            id: 'felix',
            name: 'FELIXXX',
            chat: 'https://t.me/+0Xt2CWMvSygyMTcx',
            bot: 'boxi_Fill1_bot',
            reviewChannelId: 'felix_reviews',
            color: 'teal'
        },
        {
            id: 'b13',
            name: 'B 13',
            admin: 'No_Name_hap',
            chat: 'https://t.me/+7WMtiC8037Y4N2Iy',
            bot: 'hapaus_bot',
            reviews: 'https://t.me/+JGqo0wDUWxFmMTIy',
            reviewChannelId: 'b13_reviews',
            color: 'amber'
        },
        {
            id: 'antibiotik',
            name: 'АНТИБИОТИК',
            admin: 'AntiBiotiK35',
            chat: 'https://t.me/+5Cgpn1ycdP9hMDQ6',
            reviews: 'https://telegram.me/+zZeT9yS_KKZmZWQ6',
            reviewChannelId: 'antibiotik_reviews',
            color: 'rose'
        }
    ],
    state: {
        isAppLoading: true,
        isReviewsLoading: false,
        currentView: 'home', 
        selectedShopId: null,
        reviews: [],
        error: null
    },
    
    listeners: [],
    subscribe(callback) {
        this.listeners.push(callback);
    },
    notify() {
        this.listeners.forEach(cb => cb(this.state));
    },
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    },

    async navigateTo(view, shopId = null) {
        this.setState({ currentView: view, selectedShopId: shopId, reviews: [], error: null });
        
        const tg = window.Telegram?.WebApp;
        if (tg) {
            if (view === 'details') {
                tg.BackButton.show();
                this.loadShopReviews(shopId);
            } else {
                tg.BackButton.hide();
            }
        }
    },

    async loadShopReviews(shopId) {
        const shop = this.trustedShops.find(s => s.id === shopId);
        if (!shop) return;

        this.setState({ isReviewsLoading: true });
        
        try {
            const { TelegramService } = await import('./services/api.js');
            // Передаем реальный ID канала для бота
            const reviews = await TelegramService.fetchReviewsForShop(shop.reviewChannelId);
            this.setState({ reviews, isReviewsLoading: false });
        } catch (err) {
            console.error("Store error:", err);
            this.setState({ 
                error: "Канал временно недоступен", 
                isReviewsLoading: false,
                reviews: [] 
            });
        }
    }
};
