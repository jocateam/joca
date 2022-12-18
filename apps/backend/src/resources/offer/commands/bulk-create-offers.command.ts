import { Offer } from '../offer.entity';

export class BulkCreateOffersCommand {
  constructor(private readonly _offers: Offer[]) {}

  get offers(): Offer[] {
    return [...this._offers];
  }
}
