import { Provider } from '@nestjs/common';
import { COMPANY_REPOSITORY, DATA_SOURCE } from '../../../shared/constants';
import { DataSource } from 'typeorm';
import { Company } from '../company.entity';

export const companyProviders: Provider[] = [
  {
    provide: COMPANY_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Company),
    inject: [DATA_SOURCE],
  },
];
