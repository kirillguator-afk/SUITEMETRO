
export function renderReviewsSection(state) {
    if (state.isReviewsLoading) {
        return `
            <div class="space-y-4">
                ${[1, 2].map(() => `
                    <div class="glass-card p-5 rounded-[1.5rem] animate-pulse">
                        <div class="flex justify-between mb-3">
                            <div class="h-3 w-20 bg-white/10 rounded"></div>
                            <div class="h-3 w-12 bg-white/5 rounded"></div>
                        </div>
                        <div class="space-y-2">
                            <div class="h-3 w-full bg-white/5 rounded"></div>
                            <div class="h-3 w-2/3 bg-white/5 rounded"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    if (state.reviews.length === 0) {
        return `
            <div class="glass-card p-10 rounded-[1.5rem] text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-slate-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">No feedback yet</p>
            </div>
        `;
    }

    return `
        <div class="space-y-4">
            ${state.reviews.map(review => `
                <div class="glass-card p-5 rounded-[1.5rem] border-l-2 border-l-emerald-500/30">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex flex-col">
                            <span class="text-xs font-black text-emerald-400 tracking-tight">${review.author}</span>
                            <div class="flex mt-1">
                                ${Array(5).fill(0).map((_, i) => `
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 ${i < review.rating ? 'text-amber-400' : 'text-white/10'}" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                `).join('')}
                            </div>
                        </div>
                        <span class="text-[9px] font-bold text-white/20 uppercase tracking-tighter">${review.date}</span>
                    </div>
                    <p class="text-xs text-slate-300 leading-relaxed font-medium italic">"${review.text}"</p>
                </div>
            `).join('')}
        </div>
    `;
}
