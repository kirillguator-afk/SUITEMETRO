
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
            reviewChannelId: 'yakuza_main_node', 
            color: 'emerald'
        },
        {
            id: 'kolyan',
            name: 'KOLYAN',
            admin: 'Kolyan_0420',
            chat: 'https://t.me/+F-x6Sr9uGkZmZGJh',
            reviewChannelId: 'kolyan_node',
            color: 'green'
        },
        {
            id: 'felix',
            name: 'FELIXXX',
            chat: 'https://t.me/+0Xt2CWMvSygyMTcx',
            bot: 'boxi_Fill1_bot',
            reviewChannelId: 'felix_node',
            color: 'teal'
        },
        {
            id: 'b13',
            name: 'B 13',
            admin: 'No_Name_hap',
            chat: 'https://t.me/+7WMtiC8037Y4N2Iy',
            bot: 'hapaus_bot',
            reviews: 'https://t.me/+JGqo0wDUWxFmMTIy',
            reviewChannelId: 'b13_node',
            color: 'amber'
        },
        {
            id: 'antibiotik',
            name: 'АНТИБИОТИК',
            admin: 'AntiBiotiK35',
            chat: 'https://t.me/+5Cgpn1ycdP9hMDQ6',
            reviews: 'https://telegram.me/+zZeT9yS_KKZmZWQ6',
            reviewChannelId: 'antibiotik_node',
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
        this.setState({ currentView: view, selectedShopId: shopId, reviews: [] });
        
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

        this.setState({ isReviewsLoading: true, error: null });
        
        try {
            const { TelegramService } = await import('./services/api.js');
            const reviews = await TelegramService.fetchReviewsForShop(shop.reviewChannelId);
            this.setState({ reviews, isReviewsLoading: false });
        } catch (err) {
            this.setState({ error: "API Sync Offline", isReviewsLoading: false });
        }
    }
};
