
export function renderSplashScreen() {
    return `
        <div id="splash" class="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out">
            <div class="mesh-bg"></div>
            
            <div class="relative group">
                <!-- Внешнее свечение -->
                <div class="absolute inset-0 bg-emerald-500 blur-[60px] opacity-20 animate-pulse"></div>
                
                <!-- Логотип с эффектом сканирования -->
                <div class="w-28 h-28 green-gradient rounded-[2.5rem] flex items-center justify-center relative z-10 overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                    <div class="scan-line"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-white relative z-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                    </svg>
                </div>
            </div>

            <div class="mt-12 flex flex-col items-center relative z-10">
                <h2 class="text-white text-2xl font-black tracking-[0.4em] mb-4 italic translate-y-4 opacity-0 animate-[reveal_0.8s_0.3s_forwards]">
                    MTR GREEN
                </h2>
                
                <!-- Прогресс-бар -->
                <div class="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                    <div id="loader-bar" class="absolute inset-y-0 left-0 bg-emerald-500 w-0 transition-all duration-300 shadow-[0_0_10px_#10b981]"></div>
                </div>
                
                <!-- Счетчик -->
                <div class="mt-4 font-mono text-[10px] text-emerald-500/60 tracking-widest uppercase">
                    System Core: <span id="loader-percent">0</span>%
                </div>
            </div>

            <div class="absolute bottom-10 text-[8px] text-white/20 tracking-[0.5em] uppercase">
                Secure Connection Established
            </div>
        </div>
    `;
}
