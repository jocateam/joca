import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OfferModule } from './resources/offer/offer.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScrapersModule } from './scrapers/scrapers.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './resources/auth/auth.module';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [__dirname.concat(`/../../../apps/backend/.env`)],
    }),
    OfferModule,
    ScheduleModule.forRoot(),
    ScrapersModule,
    SharedModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
