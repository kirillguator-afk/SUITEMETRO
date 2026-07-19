
import { store } from './store.js';
import { renderHeader } from './components/Header.js';
import { renderShopSection } from './components/ShopSection.js';
import { renderShopDetails } from './components/ShopDetails.js';
import { renderSplashScreen } from './components/SplashScreen.js';
import { renderAdminPanel } from './components/AdminPanel.js';

const app = document.getElementById('app');

window.navigateToShop = (id) => {
    const tg = window.Telegram?.WebApp;
    if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
    const content = document.querySelector('.view-wrapper');
    if (content) content.style.opacity = '0';
    setTimeout(() => store.navigateTo('details', id), 200);
};

window.openAdmin = () => {
    store.navigateTo('mpanel');
};

window.store = store;

function initTelegram() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        tg.setHeaderColor('#020617');
        
        tg.BackButton.onClick(() => {
            const content = document.querySelector('.view-wrapper');
            if (content) content.style.opacity = '0';
            setTimeout(() => store.navigateTo('home'), 200);
        });
    }
}

function render() {
    if (store.state.isAppLoading) {
        if (!document.getElementById('splash')) app.innerHTML = renderSplashScreen();
        return;
    }

    let content = '';
    if (store.state.currentView === 'home') {
        content = `
            ${renderHeader(store.config)}
            ${store.state.isAdmin ? `
                <div class="px-5 mb-4">
                    <button onclick="window.openAdmin()" class="w-full p-4 glass-card rounded-2xl flex items-center justify-center gap-3 border-emerald-500/30 text-emerald-500 font-bold text-xs uppercase tracking-widest active:scale-95 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                        Открыть M-PANEL
                    </button>
                </div>
            ` : ''}
            ${renderShopSection(store.trustedShops)}
        `;
    } else if (store.state.currentView === 'details') {
        const shop = store.trustedShops.find(s => s.id === store.state.selectedShopId);
        content = renderShopDetails(shop, store.state);
    } else if (store.state.currentView === 'mpanel') {
        content = renderAdminPanel(store.trustedShops);
        setTimeout(() => window.initAdminEvents(), 0);
    }

    app.innerHTML = `
        <div class="mesh-bg"></div>
        <div class="view-wrapper min-h-screen transition-opacity duration-300 ease-in-out overflow-y-auto">
            <div class="max-w-md mx-auto w-full pb-10">
                ${content}
            </div>
        </div>
    `;
}

async function startApp() {
    initTelegram();
    render();
    const bar = document.getElementById('loader-bar');
    const percent = document.getElementById('loader-percent');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;
        if (bar) bar.style.width = `${progress}%`;
        if (percent) percent.innerText = Math.floor(progress);
        if (progress === 100) {
            clearInterval(interval);
            finishLoading();
        }
    }, 100);
}

function finishLoading() {
    const splash = document.getElementById('splash');
    const tg = window.Telegram?.WebApp;
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('heavy');
    if (splash) {
        splash.classList.add('exit');
        setTimeout(() => {
            store.setState({ isAppLoading: false });
            document.body.style.overflow = 'auto';
        }, 800);
    }
}

store.subscribe(render);
startApp();
