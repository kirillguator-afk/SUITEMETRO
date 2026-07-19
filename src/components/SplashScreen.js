
export function renderSplashScreen() {
    return `
        <div id="splash" class="fixed inset-0 z-[100] bg-[#0f172a] flex flex-col items-center justify-center transition-opacity duration-700">
            <div class="relative">
                <div class="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse"></div>
                <div class="w-24 h-24 green-gradient rounded-[2rem] flex items-center justify-center relative z-10 splash-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                    </svg>
                </div>
            </div>
            <div class="mt-8 flex flex-col items-center">
                <h2 class="text-white text-xl font-bold tracking-[0.2em] mb-2">MTR GREEN</h2>
                <div class="w-12 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                    <div class="h-full bg-emerald-500 w-full -translate-x-full animate-[shimmer_1.5s_infinite] origin-left" style="animation: loadingBar 2s ease-in-out infinite;"></div>
                </div>
            </div>
            <style>
                @keyframes loadingBar {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(0); }
                    100% { transform: translateX(100%); }
                }
            </style>
        </div>
    `;
}
