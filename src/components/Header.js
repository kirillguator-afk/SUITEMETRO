
export function renderHeader(config) {
    return `
        <header class="p-6 pt-8 text-center flex flex-col items-center">
            <div class="w-20 h-20 green-gradient rounded-3xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
            </div>
            <h1 class="text-2xl font-bold text-white tracking-tight">${config.shopName}</h1>
            <p class="text-slate-400 text-sm mt-1">${config.description}</p>
            <div class="mt-4 flex gap-2">
                <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20 flex items-center">
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
                    Онлайн
                </span>
            </div>
        </header>
    `;
}
