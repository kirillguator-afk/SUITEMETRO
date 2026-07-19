
/**
 * TelegramService - Усовершенствованная логика с поддержкой ручной выгрузки
 */
export class TelegramService {
    static TOKEN = '8944669647:AAFyco_C0F-xv2InKGndHBmaGHBIIZmvQ_w';
    static BASE_URL = `https://api.telegram.org/bot${this.TOKEN}`;

    /**
     * Получает отзывы (Смешивает API канала и ручные отзывы из локального хранилища)
     */
    static async fetchReviewsForShop(shopId, channelId) {
        try {
            await new Promise(resolve => setTimeout(resolve, 800)); // Имитация сети

            // 1. Получаем "ручные" отзывы из локальной БД/Хранилища
            const manualReviews = JSON.parse(localStorage.getItem(`manual_reviews_${shopId}`) || '[]');

            // 2. Получаем отзывы из Telegram канала (имитация парсинга последних сообщений)
            const channelReviews = await this._getRawMessages(channelId);
            
            const mappedChannel = channelReviews.map(msg => ({
                id: msg.message_id,
                author: msg.author_signature || "Покупатель",
                text: msg.text || msg.caption || "",
                date: this._formatTelegramDate(msg.date),
                rating: this._estimateRating(msg.text || ""),
                verified: true
            }));

            // Объединяем (Сначала ручные, потом из канала)
            return [...manualReviews, ...mappedChannel];

        } catch (error) {
            console.error("Sync Error:", error);
            throw new Error("Ошибка синхронизации данных");
        }
    }

    /**
     * Метод для "пересылки" (сохранения) отзыва из M-Panel
     */
    static async saveManualReview(shopId, reviewData) {
        // В реальном мире здесь: fetch('YOUR_BACKEND/save', { method: 'POST', ... })
        const existing = JSON.parse(localStorage.getItem(`manual_reviews_${shopId}`) || '[]');
        
        const newReview = {
            id: Date.now(),
            author: reviewData.author,
            text: reviewData.text,
            rating: parseInt(reviewData.rating),
            date: "Только что (M-Panel)",
            verified: true,
            isManual: true
        };

        existing.unshift(newReview);
        localStorage.setItem(`manual_reviews_${shopId}`, JSON.stringify(existing));
        return true;
    }

    static async _getRawMessages(channelId) {
        // Базовый набор для YAKUZA и других
        return [
            {
                message_id: 101,
                author_signature: "User_Sync",
                text: "YAKUZA — лучший сервис в сети! 💚🍫",
                date: Math.floor(Date.now() / 1000) - 3600
            }
        ];
    }

    static _formatTelegramDate(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
        return date.toLocaleDateString('ru-RU');
    }

    static _estimateRating(text) {
        return text.includes('лучший') || text.includes('10/10') ? 5 : 4;
    }
}
