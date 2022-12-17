import { Module } from '@nestjs/common';
import { OfferService } from './services/offer.service';
import { OfferController } from './controllers/offer.controller';
import { offerProviders } from './providers/offer.providers';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [OfferController],
  providers: [...offerProviders, OfferService],
  exports: [OfferService],
})
export class OfferModule {}
