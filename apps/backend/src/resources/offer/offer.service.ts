import { Injectable } from '@nestjs/common';
import { Offer } from './offer.entity';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllOffersQuery } from './queries/get-all-offers.query';
import { BulkCreateOffersCommand } from './commands/bulk-create-offers.command';
import { CreateOneOfferCommand } from './commands/create-one-offer.command';

@Injectable()
export class OfferService {
  constructor(private readonly _queryBus: QueryBus) {}

  findAll() {
    return this._queryBus.execute(new GetAllOffersQuery());
  }

  create(offer: Offer) {
    return this._queryBus.execute(new CreateOneOfferCommand(offer));
  }

  bulkCreate(offers: Offer[]) {
    return this._queryBus.execute(new BulkCreateOffersCommand(offers));
  }
}
