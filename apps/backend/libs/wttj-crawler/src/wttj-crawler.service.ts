import { Injectable } from '@nestjs/common';
import { BASE_URL, GMAP_API_KEY } from '@joca/wttj-crawler/constants';
import { PuppeteerCrawler, purgeDefaultStorages } from 'crawlee';
import { WttjCrawlerRouter } from '@joca/wttj-crawler/wttj-crawler.router';
import { WttjInputs } from '@joca/wttj-crawler/wttj-inputs';
import { validateInputs } from '@joca/wttj-crawler/inputs';

@Injectable()
export class WttjCrawlerService {
  async main(inputs: WttjInputs) {
    const { nbPages, query, sortBy, city, country, remote, level } =
      await validateInputs(inputs);

    const location = [];
    if (city) {
      location.push(city);
    }
    if (country) {
      location.push(country);
    }

    let radius: number | string = '';
    let aroundLatLng = '';
    if (city) {
      radius = 20000;

      const getJSON = async (url: string) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      };

      const data = await getJSON(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          city
        )}&key=${GMAP_API_KEY}`
      ).catch((error) => {
        console.error(error);
      });
      const coord = data.results[0].geometry.location as {
        lat: number;
        lng: number;
      };

      aroundLatLng = encodeURIComponent(`${coord.lat},${coord.lng}`);
    }

    const refinementList = [];
    for (const rem of remote) {
      refinementList.push(encodeURI(`refinementList[remote][]=${rem}`));
    }

    const experienceLevel = [];
    if (level) {
      experienceLevel.push(
        `${encodeURI(`range[experience_level_minimum][min]=${level.min}`)}`
      );
      experienceLevel.push(
        `${encodeURI(`range[experience_level_minimum][max]=${level.max}`)}`
      );
    }

    const startUrls = [];
    startUrls.push(
      `${BASE_URL}/en/jobs?page=1&groupBy=job&sortBy=${sortBy}&aroundQuery=${encodeURI(
        location.join(', ')
      )}` +
        `&aroundLatLng=${aroundLatLng}&aroundRadius=${radius}&query=${query}&${refinementList.join(
          '&'
        )}&${experienceLevel.join('&')}`
    );

    // TODO get offers in db (only references)
    const crawlerRouter = new WttjCrawlerRouter()
      .setAlreadyScrapedOffers([])
      .setNbPages(nbPages)
      .initRouter();
    const crawler = new PuppeteerCrawler({
      requestHandler: crawlerRouter.getRouter(),
      maxRequestRetries: 10,
      headless: true,
    });

    return {
      subject: crawlerRouter.offers$,
      run: crawler.run(startUrls).then(async (res) => {
        crawlerRouter.offers$.complete();
        await purgeDefaultStorages();
        return res;
      }),
    };
  }
}
