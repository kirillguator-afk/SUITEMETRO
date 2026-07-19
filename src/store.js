
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
            name: 'Y A K Y Z A 💚🍫',
            admin: 'Yakuzzaa27',
            chat: 'https://t.me/+UtnbRA0g0wg5ZTQ6',
            bot: 'Yakuzashp27bot',
            reviews: 'https://t.me/+QzHJQ9FImBQxNzdi',
            color: 'emerald'
        },
        {
            id: 'kolyan',
            name: 'K O L Y A N 💚',
            admin: 'Kolyan_0420',
            chat: 'https://t.me/+F-x6Sr9uGkZmZGJh',
            color: 'green'
        },
        {
            id: 'felix',
            name: 'F E L I X X X 💚',
            chat: 'https://t.me/+0Xt2CWMvSygyMTcx',
            bot: 'boxi_Fill1_bot',
            color: 'teal'
        },
        {
            id: 'b13',
            name: 'B 13 🍫',
            admin: 'No_Name_hap',
            chat: 'https://t.me/+7WMtiC8037Y4N2Iy',
            bot: 'hapaus_bot',
            reviews: 'https://t.me/+JGqo0wDUWxFmMTIy',
            color: 'amber'
        },
        {
            id: 'antibiotik',
            name: 'АНТИБИОТИК ❤️',
            admin: 'AntiBiotiK35',
            chat: 'https://t.me/+5Cgpn1ycdP9hMDQ6',
            reviews: 'https://telegram.me/+zZeT9yS_KKZmZWQ6',
            color: 'rose'
        }
    ],
    state: {
        isAppLoading: true,
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
    }
};
