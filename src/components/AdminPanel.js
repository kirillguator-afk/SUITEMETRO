
import { TelegramService } from '../services/api.js';

export function renderAdminPanel(shops) {
    return `
        <div class="px-5 py-6 animate-reveal">
            <div class="flex items-center gap-3 mb-8">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
                <h2 class="text-xl font-black text-white tracking-widest uppercase">M-PANEL</h2>
            </div>

            <form id="mpanel-form" class="space-y-5">
                <div class="space-y-2">
                    <label class="text-[10px] font-bold text-slate-500 uppercase ml-2">Выберите магазин</label>
                    <select id="shop-select" class="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                        ${shops.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                    </select>
                </div>

                <div class="space-y-2">
                    <label class="text-[10px] font-bold text-slate-500 uppercase ml-2">Автор отзыва</label>
                    <input type="text" id="review-author" placeholder="Напр: @vlad_premium" class="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-700">
                </div>

                <div class="space-y-2">
                    <label class="text-[10px] font-bold text-slate-500 uppercase ml-2">Текст отзыва</label>
                    <textarea id="review-text" rows="4" placeholder="Введите текст отзыва для выгрузки..." class="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-700"></textarea>
                </div>

                <div class="space-y-2">
                    <label class="text-[10px] font-bold text-slate-500 uppercase ml-2">Рейтинг</label>
                    <div class="flex gap-4 p-4 bg-slate-900 rounded-2xl border border-white/10 justify-center">
                        ${[1,2,3,4,5].map(n => `
                            <label class="cursor-pointer">
                                <input type="radio" name="rating" value="${n}" ${n="==" 5="" ?="" 'checked'="" :="" ''}="" class="hidden peer">
                                <span class="text-2xl grayscale peer-checked:grayscale-0 transition-all">⭐</span>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <button type="submit" class="w-full py-5 green-gradient rounded-2xl text-white font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
                    Выгрузить на сайт
                </button>
            </form>
        </div>
    `;
}

// Логика обработки формы
window.initAdminEvents = () => {
    const form = document.getElementById('mpanel-form');
    if (!form) return;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const tg = window.Telegram?.WebApp;
        
        const data = {
            author: document.getElementById('review-author').value,
            text: document.getElementById('review-text').value,
            rating: form.querySelector('input[name="rating"]:checked').value
        };

        if (!data.author || !data.text) {
            if (tg) tg.showAlert("Заполните все поля!");
            return;
        }

        const shopId = document.getElementById('shop-select').value;
        
        if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
        
        await TelegramService.saveManualReview(shopId, data);
        
        if (tg) tg.showAlert("Отзыв успешно выгружен на сайт!");
        window.store.navigateTo('home');
    };
};
