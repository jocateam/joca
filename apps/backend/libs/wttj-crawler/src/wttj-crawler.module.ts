import { Module } from '@nestjs/common';
import { WttjCrawlerService } from './wttj-crawler.service';

@Module({
  providers: [WttjCrawlerService],
  exports: [WttjCrawlerService],
})
export class WttjCrawlerModule {}
