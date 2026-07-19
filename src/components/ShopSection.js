
export function renderShopSection(shops) {
    return `
        <section class="px-5 py-4 animate-fade-in">
            <div class="flex items-center gap-2 mb-6 ml-1">
                <div class="w-1.5 h-4 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <h2 class="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Магазины партнеры</h2>
            </div>
            
            <div class="grid grid-cols-1 gap-3">
                ${shops.map((shop, index) => `
                    <button onclick="window.navigateToShop('${shop.id}')" class="glass-card w-full rounded-2xl p-5 flex items-center justify-between animate-fade-in-up stagger-${index + 1} opacity-0 hover:bg-slate-800/40 transition-all active:scale-[0.97]">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/5">
                                <span class="text-emerald-500 font-black text-lg">${shop.name.charAt(0)}</span>
                            </div>
                            <h3 class="text-base font-bold text-white tracking-wide">${shop.name}</h3>
                        </div>
                        <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                    </button>
                `).join('')}
            </div>
        </section>
    `;
}
