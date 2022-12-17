import { Inject, Injectable } from '@nestjs/common';
import { OFFER_REPOSITORY } from '../../../shared/constants';
import { Repository } from 'typeorm';
import { Offer } from '../entities/offer.entity';

@Injectable()
export class OfferService {
  constructor(
    @Inject(OFFER_REPOSITORY)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  findAll() {
    return this.offerRepository.find();
  }

  create(offer: Offer) {
    return this.bulkCreate([offer]);
  }

  bulkCreate(offers: Offer[]) {
    return this.offerRepository.insert(offers);
  }
}
