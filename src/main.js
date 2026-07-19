
import { store } from './store.js';
import { renderHeader } from './components/Header.js';
import { renderShopSection } from './components/ShopSection.js';
import { renderShopDetails } from './components/ShopDetails.js';
import { renderSplashScreen } from './components/SplashScreen.js';

const app = document.getElementById('app');

// Глобальная функция для вызова из HTML
window.navigateToShop = (id) => {
    const tg = window.Telegram?.WebApp;
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
    store.navigateTo('details', id);
};

function initTelegram() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        
        tg.BackButton.onClick(() => {
            store.navigateTo('home');
        });
    }
}

function render() {
    if (store.state.isAppLoading) {
        app.innerHTML = renderSplashScreen();
        return;
    }

    if (store.state.currentView === 'home') {
        app.innerHTML = `
            <div class="flex-1 max-w-md mx-auto w-full pb-10">
                ${renderHeader(store.config)}
                ${renderShopSection(store.trustedShops)}
                <footer class="p-8 text-center opacity-30 mt-4">
                    <p class="text-[9px] font-black tracking-[0.3em] uppercase italic">
                        Premium Network Protocol
                    </p>
                </footer>
            </div>
        `;
    } else {
        const shop = store.trustedShops.find(s => s.id === store.state.selectedShopId);
        app.innerHTML = `
            <div class="flex-1 max-w-md mx-auto w-full pb-10">
                ${renderShopDetails(shop)}
            </div>
        `;
    }
}

async function startApp() {
    initTelegram();
    render();

    await new Promise(resolve => setTimeout(resolve, 2000));

    const splash = document.getElementById('splash');
    if (splash) {
        splash.style.opacity = '0';
        setTimeout(() => {
            store.setState({ isAppLoading: false });
        }, 700);
    }
}

store.subscribe(render);
startApp();
