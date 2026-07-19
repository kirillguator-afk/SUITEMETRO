
export function renderReviewsSection(state) {
    if (state.isLoading) {
        return `
            <section class="px-6 py-4 mb-8">
                <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 ml-1">Отзывы из канала</h2>
                <div class="space-y-3">
                    ${[1, 2].map(() => `
                        <div class="glass-card p-4 rounded-2xl animate-pulse">
                            <div class="h-4 w-24 bg-slate-700 rounded mb-2 shimmer"></div>
                            <div class="h-3 w-full bg-slate-800 rounded mb-1 shimmer"></div>
                            <div class="h-3 w-2/3 bg-slate-800 rounded shimmer"></div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }

    if (state.error) {
        return `<div class="px-6 py-4 text-rose-400 text-sm text-center">${state.error}</div>`;
    }

    return `
        <section class="px-6 py-4 mb-8">
            <div class="flex items-center justify-between mb-3 ml-1">
                <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Отзывы клиентов</h2>
                <span class="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-medium">LIVE</span>
            </div>
            <div class="space-y-3">
                ${state.reviews.map(review => `
                    <div class="glass-card p-4 rounded-2xl review-card">
                        <div class="flex justify-between items-start mb-2">
                            <span class="font-bold text-sm text-emerald-400">${review.author}</span>
                            <span class="text-[10px] text-slate-500">${review.date}</span>
                        </div>
                        <div class="flex mb-2">
                            ${Array(5).fill(0).map((_, i) => `
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ${i < review.rating ? 'text-amber-400' : 'text-slate-600'}" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            `).join('')}
                        </div>
                        <p class="text-sm text-slate-300 leading-relaxed">${review.text}</p>
                    </div>
                `).join('')}
            </div>
            <button class="w-full mt-4 py-3 bg-slate-800 text-slate-400 text-xs font-semibold rounded-xl active:bg-slate-700 transition-colors">
                СМОТРЕТЬ ВСЕ В КАНАЛЕ
            </button>
        </section>
    `;
}
