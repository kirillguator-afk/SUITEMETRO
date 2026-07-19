
import { store } from './store.js';
import { TelegramService } from './services/api.js';
import { renderHeader } from './components/Header.js';
import { renderShopSection } from './components/ShopSection.js';
import { renderSplashScreen } from './components/SplashScreen.js';

const app = document.getElementById('app');

function initTelegram() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        tg.enableClosingConfirmation();
        
        // Haptic Feedback при загрузке
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('medium');
        }
    }
}

function render() {
    // Если приложение еще "загружается" в стейте, рендерим Splash
    if (store.state.isAppLoading) {
        app.innerHTML = renderSplashScreen();
        return;
    }

    app.innerHTML = `
        <div class="flex-1 max-w-md mx-auto w-full pb-10">
            ${renderHeader(store.config)}
            ${renderShopSection(store.trustedShops)}
            
            <footer class="p-8 text-center opacity-40">
                <p class="text-[9px] font-black tracking-[0.3em] uppercase">
                    MTR GREEN NETWORK © 2024
                </p>
            </footer>
        </div>
    `;
}

// Запуск анимации исчезновения сплэш-скрина
async function startApp() {
    initTelegram();
    render(); // Показываем сплэш

    // Имитируем загрузку ресурсов
    await new Promise(resolve => setTimeout(resolve, 2200));

    // Убираем сплэш через opacity для красоты
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
