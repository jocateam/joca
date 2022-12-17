import { Test, TestingModule } from '@nestjs/testing';
import { WelcomeToTheJungleService } from './welcome-to-the-jungle.service';
import { WttjCrawlerModule } from '@joca/wttj-crawler';
import { ScrapersModule } from '../scrapers.module';
import { OfferModule } from '../../resources/offer/offer.module';
import { SharedModule } from '../../shared/shared.module';
import { ConfigModule } from '@nestjs/config';

// Set 5 minutes timeout
jest.setTimeout(60 * 5 * 1000);

describe('Wttj scraper', () => {
  let service: WelcomeToTheJungleService;

  beforeEach(async () => {
    console.log("dirnme:", __dirname);
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        WttjCrawlerModule,
        ScrapersModule,
        OfferModule,
        SharedModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [__dirname.concat('/../../../.env.test')],
        }),
      ],
    }).compile();

    service = module.get<WelcomeToTheJungleService>(WelcomeToTheJungleService);
  });

  it('should log the offers', async () => {
    await service.crawlAll();
  });
});
