
import { renderReviewsSection } from './ReviewsSection.js';

export function renderShopDetails(shop, state) {
    if (!shop) return '';

    const getLink = (val) => {
        if (!val) return null;
        return val.startsWith('http') ? val : `https://t.me/${val.replace('@', '')}`;
    };

    const actions = [
        { id: 'admin', label: 'Администратор', val: shop.admin, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', color: 'emerald' },
        { id: 'chat', label: 'Общий Чат', val: shop.chat, icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z', color: 'sky' },
        { id: 'bot', label: 'Бот Продаж', val: shop.bot, icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z', color: 'indigo' }
    ];

    return `
        <div class="px-5 py-4 animate-fade-in">
            <!-- Shop Banner Header -->
            <div class="flex flex-col items-center mb-10 pt-6">
                <div class="relative">
                    <div class="absolute inset-0 bg-emerald-500 blur-2xl opacity-20"></div>
                    <div class="w-24 h-24 rounded-[2.5rem] bg-slate-900 border border-white/10 flex items-center justify-center mb-6 relative z-10">
                        <span class="text-4xl font-black text-emerald-500">${shop.name.charAt(0)}</span>
                    </div>
                </div>
                <h2 class="text-3xl font-black text-white italic tracking-tight mb-2">${shop.name}</h2>
                <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    <p class="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold">Node Verified by MTR</p>
                </div>
            </div>

            <!-- Quick Links -->
            <div class="grid grid-cols-3 gap-3 mb-10">
                ${actions.filter(a => a.val).map((action, idx) => `
                    <a href="${getLink(action.val)}" target="_blank" class="glass-card flex flex-col items-center p-4 rounded-3xl active:scale-90 transition-all animate-reveal stagger-${idx+1}">
                        <div class="w-12 h-12 rounded-2xl bg-${action.color}-500/10 flex items-center justify-center text-${action.color}-400 mb-3 border border-${action.color}-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${action.icon}"></path>
                            </svg>
                        </div>
                        <span class="text-[9px] font-black text-slate-400 uppercase tracking-tighter text-center line-clamp-1">${action.label}</span>
                    </a>
                `).join('')}
            </div>

            <!-- Reviews Dynamic Section -->
            <div class="animate-reveal stagger-4">
                <div class="flex items-center justify-between mb-4 px-2">
                    <h3 class="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Latest Reviews</h3>
                    <span class="text-[9px] text-emerald-500 font-bold px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">Live Sync</span>
                </div>
                ${renderReviewsSection(state)}
            </div>

            <div class="mt-8 pt-4 border-t border-white/5">
                <button onclick="store.navigateTo('home')" class="w-full py-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] hover:text-white transition-colors">
                    ← Back to Network
                </button>
            </div>
        </div>
    `;
}
