import { Offer } from '../offer.entity';

export class CreateOneOfferCommand {
  constructor(private readonly _offer: Offer) {}

  get offer(): Offer {
    return this._offer;
  }
}
