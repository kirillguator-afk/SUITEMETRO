
export function renderShopDetails(shop) {
    if (!shop) return '';

    const getLink = (val) => {
        if (!val) return null;
        return val.startsWith('http') ? val : `https://t.me/${val.replace('@', '')}`;
    };

    const actions = [
        { id: 'admin', label: 'Администратор', val: shop.admin, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', color: 'emerald' },
        { id: 'chat', label: 'Общий Чат', val: shop.chat, icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z', color: 'sky' },
        { id: 'bot', label: 'Бот Продаж', val: shop.bot, icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z', color: 'indigo' },
        { id: 'reviews', label: 'Отзывы', val: shop.reviews, icon: 'M5 13l4 4L19 7', color: 'amber' }
    ];

    return `
        <div class="px-5 py-4 animate-fade-in">
            <div class="flex flex-col items-center mb-8 pt-4">
                <div class="w-20 h-20 rounded-[2.5rem] bg-slate-800 border-2 border-emerald-500/30 flex items-center justify-center mb-4 shadow-2xl shadow-emerald-500/10">
                    <span class="text-3xl font-black text-emerald-400">${shop.name.charAt(0)}</span>
                </div>
                <h2 class="text-2xl font-black text-white italic tracking-tight">${shop.name}</h2>
                <p class="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Официальный партнер</p>
            </div>

            <div class="space-y-3">
                ${actions.filter(a => a.val).map((action, idx) => `
                    <a href="${getLink(action.val)}" target="_blank" class="glass-card flex items-center p-4 rounded-2xl hover:bg-slate-800/60 active:scale-[0.98] transition-all animate-fade-in-up stagger-${idx+1}">
                        <div class="w-12 h-12 rounded-xl bg-${action.color}-500/10 flex items-center justify-center text-${action.color}-400 mr-4 border border-${action.color}-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${action.icon}"></path>
                            </svg>
                        </div>
                        <div class="flex-1">
                            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">${action.label}</p>
                            <p class="text-sm font-semibold text-slate-200">Перейти по ссылке</p>
                        </div>
                        <div class="text-slate-600">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </div>
                    </a>
                `).join('')}
            </div>

            <button onclick="store.navigateTo('home')" class="w-full mt-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-[0.3em] hover:text-white transition-colors">
                Вернуться к списку
            </button>
        </div>
    `;
}
