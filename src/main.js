
import { store } from './store.js';
import { renderHeader } from './components/Header.js';
import { renderShopSection } from './components/ShopSection.js';
import { renderShopDetails } from './components/ShopDetails.js';
import { renderSplashScreen } from './components/SplashScreen.js';

const app = document.getElementById('app');

// Глобальная функция навигации
window.navigateToShop = (id) => {
    const tg = window.Telegram?.WebApp;
    if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
    
    // Эффект перехода: Сначала легкое размытие контента
    const content = document.querySelector('.view-wrapper');
    if (content) content.style.opacity = '0';
    
    setTimeout(() => {
        store.navigateTo('details', id);
    }, 200);
};

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
    // Если сплэш еще активен, не рендерим основной контент
    if (store.state.isAppLoading) {
        if (!document.getElementById('splash')) {
            app.innerHTML = renderSplashScreen();
        }
        return;
    }

    // Отрисовка вьюх с оберткой для анимации
    let content = '';
    if (store.state.currentView === 'home') {
        content = `
            ${renderHeader(store.config)}
            ${renderShopSection(store.trustedShops)}
            <footer class="p-8 text-center opacity-20">
                <p class="text-[8px] font-black tracking-[0.4em] uppercase">Encrypted Network v2.0</p>
            </footer>
        `;
    } else {
        const shop = store.trustedShops.find(s => s.id === store.state.selectedShopId);
        content = renderShopDetails(shop);
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

// Продвинутая логика загрузки
async function startApp() {
    initTelegram();
    render();

    const bar = document.getElementById('loader-bar');
    const percent = document.getElementById('loader-percent');
    let progress = 0;

    // Имитация плавной загрузки с разными шагами
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        if (bar) bar.style.width = `${progress}%`;
        if (percent) percent.innerText = Math.floor(progress);

        if (progress === 100) {
            clearInterval(interval);
            finishLoading();
        }
    }, 150);
}

function finishLoading() {
    const splash = document.getElementById('splash');
    const tg = window.Telegram?.WebApp;
    
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('heavy');
    
    if (splash) {
        splash.classList.add('exit');
        setTimeout(() => {
            store.setState({ isAppLoading: false });
            // После удаления сплэша разрешаем скролл
            document.body.style.overflow = 'auto';
        }, 1000);
    }
}

store.subscribe(render);
startApp();
