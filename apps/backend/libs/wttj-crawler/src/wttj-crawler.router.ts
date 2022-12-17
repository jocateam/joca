import {
  createPuppeteerRouter,
} from 'crawlee';
import { BASE_URL } from '@joca/wttj-crawler/constants';
import { Subject } from 'rxjs';
import { WttjOutput } from '@joca/wttj-crawler/wttj-output';

export class WttjCrawlerRouter {
  private router;
  private offers: number[] = [];
  private nbPages = 1;
  private currentPage = 1;

  public offers$: Subject<WttjOutput> = new Subject<WttjOutput>();

  constructor() {
    this.router = createPuppeteerRouter();
  }

  public getRouter() {
    return this.router;
  }

  public setAlreadyScrapedOffers(offers: number[]) {
    this.offers = offers;
    return this;
  }

  public setNbPages(nbPages: number) {
    this.nbPages = nbPages;
    return this;
  }

  public initRouter() {
    this.router.addDefaultHandler(
      async ({ parseWithCheerio, crawler, log, page }) => {
        await this.listingHandler({ parseWithCheerio, crawler, log });

        if (this.currentPage < this.nbPages || this.nbPages === 0) {
          await new Promise(() => {
            return page.click(
              '.ais-Pagination-list .ais-Pagination-item--nextPage > a',
            );
          }).then((res) => {
            console.log('RESRRERESRESRES', res);
            return new Promise((resolve) => {
              setTimeout(async () => {
                resolve(
                  await this.listingHandler({
                    parseWithCheerio,
                    crawler,
                    log,
                  }),
                );
              }, 2000);
            });
          });
        }
      },
    );

    this.router.addHandler('details', async ({ request, parseWithCheerio }) => {
      const $ = await parseWithCheerio();

      const regex = /\s/g;

      const jobTitle = $('[data-testid=job-summary-job-title]').text().trim();

      if (!jobTitle) {
        return;
      }

      const jobSummary = $('ul[data-testid=job-summary-job-metas]').find('li');
      const job = new Map<string, string>();
      let location = '';
      for (const info of jobSummary) {
        const elem = $(info);

        const key = convertToCamelCase(
          elem.find('> span:first-child i').attr('name') as string,
        );

        switch (key) {
          case 'clock':
            job.set(
              'startDate',
              elem.find('> span:last-child > time').attr('datetime') as string,
            );
            break;
          case 'suitcase':
            job.set(
              'experience',
              elem.find('> span:last-child').text().trim().replace(regex, ' '),
            );
            break;
          case 'location':
            location = elem
              .find('> span:last-child')
              .text()
              .trim()
              .replace(regex, ' ');
            break;
          default:
            job.set(
              key,
              elem.find('> span:last-child').text().trim().replace(regex, ' '),
            );
            break;
        }
      }

      const descriptions = $('[data-testid=job-section-description] > div > *');
      let jobDescription = '';
      for (const desc of descriptions) {
        const elem = $(desc);
        jobDescription += `${elem.text().trim().replace(regex, ' ')}\n`;
      }

      const requirements = $('[data-testid=job-section-experience] > div > *');
      let profileRequirements = '';
      for (const requ of requirements) {
        const elem = $(requ);
        profileRequirements += `${elem.text().trim().replace(regex, ' ')}\n`;
      }

      const companyName = $('[data-testid=job-summary-organization-title]')
        .text()
        .trim();
      const companySummary = $(
        'ul[data-testid=job-summary-organization-metas]',
      ).find('li');
      const company = new Map<string, string>();
      for (const info of companySummary) {
        const elem = $(info);

        const key = convertToCamelCase(
          elem.find('> span:first-child i').attr('name') as string,
        );

        company.set(
          key,
          elem.find('> span:last-child').text().trim().replace(regex, ' '),
        );
      }

      const { reference } = request.userData;

      this.offers$.next({
        reference,
        url: request.loadedUrl ?? '',
        jobTitle,
        companyName,
        location,
        jobDescription,
        profileRequirements,
        company,
        job,
      });
    });

    return this;
  }

  private async listingHandler({ parseWithCheerio, crawler, log }: any) {
    let $: any;

    await new Promise((resolve) => {
      const interval = setInterval(async () => {
        $ = await parseWithCheerio();
        const offers = $('.ais-Hits-list').find('li.ais-Hits-list-item');

        if (offers.length > 0) {
          resolve(offers);
          clearInterval(interval);
        }
      }, 1000);
    })
      .then((offers) => {
        return offers as any;
      })
      .then(async (offers) => {
        log.info('Currently scraping...');
        for (const offer of offers) {
          const elem = $(offer);
          const offerId = Number(
            elem.find('[data-objectid]').first().attr('data-objectid') ?? 0,
          );

          if (!this.offers.includes(offerId)) {
            this.offers.push(offerId);

            const href = elem.find('header a').attr('href') as string;
            crawler.addRequests([
              {
                url: BASE_URL.concat(href),
                label: 'details',
                userData: {
                  reference: offerId.toString(),
                },
              },
            ]);
          }
        }
      });
  }
}

const convertToCamelCase = (str: string) =>
  str
    .split('_')
    .map((v, i) => (i > 0 ? v.charAt(0).toUpperCase() + v.slice(1) : v))
    .join('');
