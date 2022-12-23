import { Injectable } from '@nestjs/common';
import { WttjCrawlerService } from '@joca/wttj-crawler';
import { SORT_BY_VALUES } from '@joca/wttj-crawler/constants';
import { WttjOutput } from '@joca/wttj-crawler/wttj-output';
import { OfferService } from '../../resources/offer/offer.service';
import { CreateOfferDto } from '../../resources/offer/dtos/create-offer.dto';

@Injectable()
export class WelcomeToTheJungleService {
  constructor(
    private readonly wttjCrawler: WttjCrawlerService,
    private readonly offerService: OfferService
  ) {}

  async crawlAll() {
    const crawler = await this.wttjCrawler.main({
      nbPages: 1,
      sortBy: SORT_BY_VALUES.MOST_RECENT,
    });

    let offers: WttjOutput[] = [];
    crawler.subject.subscribe((offer) => {
      offers.push(offer);
      if (offers.length > 20) {
        this.insertIntoDb([...offers]).then();
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
    const data: CreateOfferDto[] = [];

    for (const offer of offers) {
      data.push({
        url: offer.url,
        reference: offer.reference,
        source: 'Welcome to the jungle',
        title: offer.jobTitle,
        company: {
          name: offer.companyName,
        },
        requirements: offer.profileRequirements,
        location: offer.location,
        description: offer.jobDescription,
      });
    }

    return this.offerService.bulkCreate(data).then(console.log);
  }
}
