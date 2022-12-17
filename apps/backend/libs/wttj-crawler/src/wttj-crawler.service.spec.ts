import { Test, TestingModule } from '@nestjs/testing';
import { WttjCrawlerService } from './wttj-crawler.service';

describe('WttjCrawlerService', () => {
  let service: WttjCrawlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WttjCrawlerService],
    }).compile();

    service = module.get<WttjCrawlerService>(WttjCrawlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
