import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadController } from './lead.controller';
import { TelegramService } from './telegram.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env'
  }), HttpModule],
  controllers: [AppController, LeadController],
  providers: [AppService, TelegramService],
})
export class AppModule { }
