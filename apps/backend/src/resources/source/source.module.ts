import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { sourceProviders } from './providers/source.providers';
import { GetSourceByNameQueryHandler } from './queries/get-source-by-name.query-handler';
import { SourceService } from './source.service';

const QueryHandlers = [GetSourceByNameQueryHandler];

@Module({
  imports: [SharedModule],
  providers: [...QueryHandlers, ...sourceProviders, SourceService],
  exports: [...QueryHandlers, ...sourceProviders, SourceService],
})
export class SourceModule {}
