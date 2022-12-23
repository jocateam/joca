import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllOffersQuery } from './get-all-offers.query';
import { Repository } from 'typeorm';
import { Offer } from '../offer.entity';
import { Inject } from '@nestjs/common';
import { OFFER_REPOSITORY } from '../../../shared/constants';

@QueryHandler(GetAllOffersQuery)
export class GetAllOffersQueryHandler
  implements IQueryHandler<GetAllOffersQuery, Offer[]>
{
  constructor(
    @Inject(OFFER_REPOSITORY) private readonly _repository: Repository<Offer>
  ) {}

  execute(): Promise<Offer[]> {
    return this._repository.find({
      relations: ['source', 'company'],
    });
  }
}
