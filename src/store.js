
export const store = {
    config: {
        shopName: "MTR GREEN",
        description: "Экологичные решения и премиальный сервис",
        contacts: {
            telegram: "@mtr_green_admin",
            phone: "+7 (999) 000-00-00",
            location: "г. Москва, ул. Примерная, 12",
            channel: "mtr_green_reviews"
        }
    },
    state: {
        isLoading: true,
        reviews: [],
        error: null
    },
    
    // Подписчики на обновление состояния
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
