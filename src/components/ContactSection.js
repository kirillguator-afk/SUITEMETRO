
export function renderContactSection(contacts) {
    const items = [
        { 
            label: 'Написать нам', 
            val: contacts.telegram, 
            icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
            link: `https://t.me/${contacts.telegram.replace('@', '')}`
        },
        { 
            label: 'Позвонить', 
            val: contacts.phone, 
            icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
            link: `tel:${contacts.phone.replace(/[^0-9+]/g, '')}`
        },
        { 
            label: 'Наш адрес', 
            val: contacts.location, 
            icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
            link: '#'
        }
    ];

    return `
        <section class="px-6 py-4">
            <h2 class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 ml-1">Контакты</h2>
            <div class="grid grid-cols-1 gap-3">
                ${items.map(item => `
                    <a href="${item.link}" class="glass-card p-4 rounded-2xl flex items-center active:scale-[0.98] transition-transform">
                        <div class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${item.icon}"></path>
                            </svg>
                        </div>
                        <div>
                            <p class="text-[10px] text-slate-500 font-medium uppercase">${item.label}</p>
                            <p class="text-sm text-slate-200 font-semibold">${item.val}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-auto text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </a>
                `).join('')}
            </div>
        </section>
    `;
}
