import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common';
import { DATA_SOURCE } from '../../shared/constants';
import { Offer } from '../../resources/offer/entities/offer.entity';
import { ConfigService } from '@nestjs/config';

export const databaseProviders: Provider[] = [
  {
    provide: DATA_SOURCE,
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 3306),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS', ''),
        database: configService.get('DB_NAME'),
        entities: [Offer],
        synchronize: configService.get('DB_SYNC', '0') == 1,
        logging: configService.get('DEBUG', '0') == 1,
        debug: configService.get('SQL_DEBUG', '0') == 1,
        dropSchema: configService.get('DB_DROP', '0') == 1,
      });

      return dataSource.initialize();
    },
    inject: [ConfigService]
  },
];
