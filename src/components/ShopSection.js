
export function renderShopSection(shops) {
    const getLink = (val, type) => {
        if (!val) return null;
        if (val.startsWith('http')) return val;
        return `https://t.me/${val.replace('@', '')}`;
    };

    const renderAction = (val, label, icon, colorClass) => {
        const link = getLink(val);
        if (!link) return '';
        return `
            <a href="${link}" target="_blank" class="action-btn flex flex-col items-center gap-1">
                <div class="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-${colorClass}-400 border-${colorClass}-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        ${icon}
                    </svg>
                </div>
                <span class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">${label}</span>
            </a>
        `;
    };

    return `
        <section class="px-5 py-4">
            <div class="flex items-center gap-2 mb-6 ml-1">
                <div class="w-1 h-4 bg-emerald-500 rounded-full"></div>
                <h2 class="text-sm font-bold text-slate-200 uppercase tracking-widest italic">Доверенные Люди</h2>
            </div>
            
            <div class="space-y-4">
                ${shops.map((shop, index) => `
                    <div class="glass-card rounded-3xl p-5 animate-fade-in-up stagger-${index + 1} opacity-0">
                        <div class="flex justify-between items-start mb-5">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <h3 class="text-lg font-black text-white tracking-tight italic">${shop.name}</h3>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-4 gap-2">
                            ${renderAction(shop.admin, 'Главный', '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">', 'emerald')}
                            ${renderAction(shop.chat, 'Чат', '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z">', 'sky')}
                            ${renderAction(shop.bot, 'Бот', '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z">', 'indigo')}
                            ${renderAction(shop.reviews, 'Отзывы', '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">', 'amber')}
                        </path></path></path></path></div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}
