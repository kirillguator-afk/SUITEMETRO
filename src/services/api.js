
/**
 * Сервис для взаимодействия с Telegram Bot API
 */
export class TelegramService {
    static TOKEN = '8944669647:AAFyco_C0F-xv2InKGndHBmaGHBIIZmvQ_w';
    static BASE_URL = `https://api.telegram.org/bot${this.TOKEN}`;

    /**
     * Получает отзывы из канала.
     * Для работы с приватными каналами (+QzHJQ9...) бот должен быть администратором.
     */
    static async fetchReviewsForShop(channelId) {
        try {
            // Имитация высоконагруженного запроса к API для сохранения визуального стиля
            await new Promise(resolve => setTimeout(resolve, 1800));

            // Данные специфичные для YAKUZA (имитация выгрузки из канала +QzHJQ9FImBQxNzdi)
            if (channelId.includes('yakuza')) {
                return [
                    { 
                        author: "Vadim_27", 
                        text: "YAKUZA как всегда на высоте. Забрал шоколад, качество пушка! 10/10 🍫", 
                        rating: 5, 
                        date: "14:20",
                        verified: true 
                    },
                    { 
                        author: "Green_Dragon", 
                        text: "Бот выдал моментально. Админу респект за оперативность.", 
                        rating: 5, 
                        date: "Вчера",
                        verified: true
                    },
                    { 
                        author: "User_Unknown", 
                        text: "Все ровно, место подобрано отлично. Будем работать.", 
                        rating: 5, 
                        date: "2 дня назад",
                        verified: false
                    }
                ];
            }

            // Fallback для остальных
            return this.generateDefaultReviews();
        } catch (error) {
            console.error("Telegram API Connection Error:", error);
            throw new Error("API Sync Failed");
        }
    }

    static generateDefaultReviews() {
        return [
            { author: "Buyer_1", text: "Все отлично, спасибо!", rating: 5, date: "Сегодня", verified: true },
            { author: "Client_X", text: "Нормальный сервис, быстро ответили.", rating: 4, date: "Вчера", verified: false }
        ];
    }
}
