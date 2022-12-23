import { Provider } from '@nestjs/common';
import { DATA_SOURCE, SOURCE_REPOSITORY } from '../../../shared/constants';
import { DataSource } from 'typeorm';
import { Source } from '../source.entity';

export const sourceProviders: Provider[] = [
  {
    provide: SOURCE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Source),
    inject: [DATA_SOURCE],
  },
];
