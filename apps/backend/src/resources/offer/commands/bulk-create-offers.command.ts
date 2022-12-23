import { CreateOfferDto } from '../dtos/create-offer.dto';

export class BulkCreateOffersCommand {
  constructor(private readonly _offers: CreateOfferDto[]) {}

  get offers(): CreateOfferDto[] {
    return [...this._offers];
  }
}
