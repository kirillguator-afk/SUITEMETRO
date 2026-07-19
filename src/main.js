
import { store } from './store.js';
import { TelegramService } from './services/api.js';
import { renderHeader } from './components/Header.js';
import { renderContactSection } from './components/ContactSection.js';
import { renderReviewsSection } from './components/ReviewsSection.js';

const app = document.getElementById('app');

/**
 * Инициализация Telegram WebApp
 */
function initTelegram() {
    if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        
        // Настройка цветов темы из Telegram
        document.body.style.backgroundColor = tg.backgroundColor || '#0f172a';
        
        // Главная кнопка TG
        tg.MainButton.text = "Связаться в Telegram";
        tg.MainButton.textColor = "#ffffff";
        tg.MainButton.color = "#10b981";
        tg.MainButton.show();
        tg.MainButton.onClick(() => {
            window.open(`https://t.me/${store.config.contacts.telegram.replace('@', '')}`, '_blank');
        });
    }
}

/**
 * Основной цикл рендеринга
 */
function render() {
    app.innerHTML = `
        <div class="flex-1 max-w-md mx-auto w-full">
            ${renderHeader(store.config)}
            ${renderContactSection(store.config.contacts)}
            ${renderReviewsSection(store.state)}
            
            <footer class="p-6 text-center">
                <p class="text-[10px] text-slate-600 font-medium tracking-widest uppercase italic">
                    Powered by Nexus Prime • 2024
                </p>
            </footer>
        </div>
    `;
}

/**
 * Загрузка данных
 */
async function loadData() {
    try {
        const reviews = await TelegramService.fetchReviews();
        store.setState({ reviews, isLoading: false });
    } catch (error) {
        store.setState({ error: error.message, isLoading: false });
    }
}

// Подписка на изменения стора для реактивности
store.subscribe(render);

// Запуск
initTelegram();
render();
loadData();
