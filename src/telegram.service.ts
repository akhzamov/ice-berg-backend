import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';


@Injectable()
export class TelegramService {
    constructor(private readonly httpService: HttpService) { }

    async sendMessage(messageObj: any): Promise<any> {
        const message = `🆕 Новый лид:

👤 Имя: ${messageObj.name}

📞 Телефон номер: ${messageObj.phone}

⚙️ Категория: ${messageObj.category}
`;
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

        try {
            const response = await lastValueFrom(
                this.httpService.post<any>(url, {
                    chat_id: process.env.TELEGRAM_CHAT_ID,
                    text: message,
                }).pipe(
                    catchError((error: AxiosError) => {
                        console.error('Error sending to Telegram:', error);
                        throw new InternalServerErrorException('Error sending to Telegram', error.message);
                    })
                )
            );

            console.log('Telegram response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Exception in sendMessage:', error);
            throw new InternalServerErrorException('Error sending to Telegram', error.message);
        }
    }
}
