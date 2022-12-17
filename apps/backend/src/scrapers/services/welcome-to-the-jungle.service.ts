import { Injectable } from '@nestjs/common';
import { WttjCrawlerService } from '@joca/wttj-crawler';
import { SORT_BY_VALUES } from '@joca/wttj-crawler/constants';
import { WttjOutput } from '@joca/wttj-crawler/wttj-output';
import { Offer } from '../../resources/offer/entities/offer.entity';
import { OfferService } from '../../resources/offer/services/offer.service';

@Injectable()
export class WelcomeToTheJungleService {
  constructor(
    private readonly wttjCrawler: WttjCrawlerService,
    private readonly offerService: OfferService,
  ) {}

  async crawlAll() {
    const crawler = await this.wttjCrawler.main({
      nbPages: 2,
      sortBy: SORT_BY_VALUES.MOST_RECENT,
    });

    let offers: WttjOutput[] = [];
    crawler.subject.subscribe(async (offer) => {
      offers.push(offer);
      if (offers.length > 50) {
        await this.insertIntoDb(offers);
        offers = [];
      }
    });

    await crawler.run.then(async () => {
      if (offers.length) {
        await this.insertIntoDb(offers);
      }
    });
  }

  async insertIntoDb(offers: WttjOutput[]) {
    const data: Offer[] = [];

    for (const offer of offers) {
      data.push({
        url: offer.url,
        reference: offer.reference,
      });
    }

    return this.offerService.bulkCreate(data).then(console.log);
  }
}
