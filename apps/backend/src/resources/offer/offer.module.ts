import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { offerProviders } from './providers/offer.providers';
import { SharedModule } from '../../shared/shared.module';
import { GetAllOffersQueryHandler } from './queries/get-all-offers.query-handler';
import { BulkCreateOffersCommandHandler } from './commands/bulk-create-offers.command-handler';
import { CreateOneOfferCommandHandler } from './commands/create-one-offer.command-handler';
import { SourceModule } from '../source/source.module';
import { CompanyModule } from '../company/company.module';

const CommandHandlers = [
  BulkCreateOffersCommandHandler,
  CreateOneOfferCommandHandler,
];
const QueryHandlers = [GetAllOffersQueryHandler];

@Module({
  imports: [CompanyModule, SharedModule, SourceModule],
  controllers: [OfferController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...offerProviders,
    OfferService,
  ],
  exports: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...offerProviders,
    OfferService,
  ],
})
export class OfferModule {}
