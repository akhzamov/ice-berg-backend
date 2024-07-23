import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('lead')
export class LeadController {
    constructor(private readonly telegramService: TelegramService) { }

    @Post()
    async createLead(@Body() body: any) {
        try {
            await this.telegramService.sendMessage(body);
            return { message: 'Lead created and sent to Telegram' };
        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
