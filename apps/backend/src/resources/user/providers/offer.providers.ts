import { Provider } from '@nestjs/common';
import { DATA_SOURCE, USER_REPOSITORY } from '../../../shared/constants';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';

export const userProviders: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
