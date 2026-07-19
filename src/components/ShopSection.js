
export function renderShopSection(shops) {
    return `
        <section class="px-5 py-4">
            <div class="flex items-center gap-3 mb-8 ml-1 animate-reveal stagger-1 opacity-0">
                <div class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_12px_#10b981]"></div>
                <h2 class="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Nodes Available</h2>
            </div>
            
            <div class="grid grid-cols-1 gap-4">
                ${shops.map((shop, index) => `
                    <button onclick="window.navigateToShop('${shop.id}')" class="glass-card active-scale w-full rounded-[2rem] p-6 flex items-center justify-between animate-reveal stagger-${index + 1} opacity-0">
                        <div class="flex items-center gap-5">
                            <div class="w-12 h-12 rounded-2xl bg-slate-900/50 flex items-center justify-center border border-emerald-500/10 group-active:border-emerald-500/50 transition-colors">
                                <span class="text-emerald-500 font-black text-xl">${shop.name.charAt(0)}</span>
                            </div>
                            <div class="text-left">
                                <h3 class="text-lg font-bold text-white tracking-tight">${shop.name}</h3>
                                <p class="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Verified Partner</p>
                            </div>
                        </div>
                        <div class="w-10 h-10 rounded-full bg-emerald-500/5 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                        </div>
                    </button>
                `).join('')}
            </div>
        </section>
    `;
}
