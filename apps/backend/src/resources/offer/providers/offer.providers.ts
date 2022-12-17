import { Provider } from '@nestjs/common';
import { DATA_SOURCE, OFFER_REPOSITORY } from '../../../shared/constants';
import { DataSource } from 'typeorm';
import { Offer } from '../entities/offer.entity';

export const offerProviders: Provider[] = [
  {
    provide: OFFER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Offer),
    inject: [DATA_SOURCE],
  },
];
