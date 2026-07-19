
/**
 * Отрисовка секции отзывов с премиальным дизайном
 */
export function renderReviewsSection(state) {
    if (state.isReviewsLoading) {
        return `
            <div class="space-y-4">
                ${[1, 2, 3].map(() => `
                    <div class="glass-card p-5 rounded-[2rem] animate-pulse border border-white/5">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 rounded-full bg-white/5 shimmer"></div>
                            <div class="space-y-2">
                                <div class="h-3 w-24 bg-white/10 rounded shimmer"></div>
                                <div class="h-2 w-16 bg-white/5 rounded shimmer"></div>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="h-3 w-full bg-white/5 rounded shimmer"></div>
                            <div class="h-3 w-4/5 bg-white/5 rounded shimmer"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (state.reviews.length === 0) {
        return `
            <div class="glass-card p-12 rounded-[2.5rem] text-center border-dashed border-white/10">
                <div class="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                    </svg>
                </div>
                <p class="text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">История отзывов пуста</p>
            </div>
        `;
    }

    return `
        <div class="space-y-4">
            ${state.reviews.map((review, idx) => `
                <div class="glass-card p-5 rounded-[2rem] relative overflow-hidden border-l-4 border-l-emerald-500/50 animate-reveal" style="animation-delay: ${idx * 0.1}s">
                    <!-- Декоративный фон для верифицированных -->
                    ${review.verified ? '<div class="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 blur-2xl rounded-full"></div>' : ''}
                    
                    <div class="flex justify-between items-start mb-4 relative z-10">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center text-[10px] font-black text-emerald-500">
                                ${review.author.substring(0, 2).toUpperCase()}
                            </div>
                            <div class="flex flex-col">
                                <div class="flex items-center gap-1.5">
                                    <span class="text-sm font-bold text-white tracking-tight">${review.author}</span>
                                    ${review.verified ? `
                                        <svg class="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                        </svg>
                                    ` : ''}
                                </div>
                                <div class="flex gap-0.5">
                                    ${Array(5).fill(0).map((_, i) => `
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 ${i < review.rating ? 'text-amber-400' : 'text-white/10'}" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                        <span class="text-[9px] font-bold text-slate-500 uppercase bg-white/5 px-2 py-1 rounded-lg">${review.date}</span>
                    </div>
                    
                    <p class="text-xs text-slate-300 leading-relaxed italic relative z-10 pl-1">
                        "${review.text}"
                    </p>
                </div>
            `).join('')}
            
            <button class="w-full py-4 rounded-2xl border border-white/5 bg-white/5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-white/10 active:scale-95 transition-all">
                Показать больше отзывов
            </button>
        </div>
    `;
}
