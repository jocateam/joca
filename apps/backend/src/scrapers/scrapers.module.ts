import { Module } from '@nestjs/common';
import { WelcomeToTheJungleService } from './services/welcome-to-the-jungle.service';
import { WelcomeToTheJungleCron } from './crons/welcome-to-the-jungle.cron';
import { WttjCrawlerModule } from '@joca/wttj-crawler';
import { OfferModule } from '../resources/offer/offer.module';

@Module({
  imports: [WelcomeToTheJungleCron, WttjCrawlerModule, OfferModule],
  providers: [WelcomeToTheJungleService],
  exports: [WelcomeToTheJungleService],
})
export class ScrapersModule {}
