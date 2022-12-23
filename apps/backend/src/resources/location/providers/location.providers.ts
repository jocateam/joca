import { Provider } from '@nestjs/common';
import { DATA_SOURCE, LOCATION_REPOSITORY } from '../../../shared/constants';
import { DataSource } from 'typeorm';
import { Location } from '../location.entity';

export const locationProviders: Provider[] = [
  {
    provide: LOCATION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Location),
    inject: [DATA_SOURCE],
  },
];
