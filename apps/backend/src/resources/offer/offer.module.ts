import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { offerProviders } from './providers/offer.providers';
import { SharedModule } from '../../shared/shared.module';
import { GetAllOffersQueryHandler } from './queries/get-all-offers.query-handler';
import { BulkCreateOffersCommandHandler } from './commands/bulk-create-offers.command-handler';
import { CreateOneOfferCommandHandler } from './commands/create-one-offer.command-handler';

const QueryHandlers = [GetAllOffersQueryHandler];
const CommandHandlers = [
  BulkCreateOffersCommandHandler,
  CreateOneOfferCommandHandler,
];

@Module({
  imports: [SharedModule],
  controllers: [OfferController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...offerProviders,
    OfferService,
  ],
  exports: [OfferService],
})
export class OfferModule {}
