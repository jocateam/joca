import { Offer } from '../offer.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BulkCreateOffersCommand } from './bulk-create-offers.command';
import { Inject } from '@nestjs/common';
import { OFFER_REPOSITORY } from '../../../shared/constants';
import { InsertResult, Repository } from 'typeorm';

@CommandHandler(BulkCreateOffersCommand)
export class BulkCreateOffersCommandHandler
  implements ICommandHandler<BulkCreateOffersCommand, InsertResult>
{
  constructor(
    @Inject(OFFER_REPOSITORY) private readonly _repository: Repository<Offer>
  ) {}

  execute(command: BulkCreateOffersCommand): Promise<InsertResult> {
    return this._repository.insert(command.offers);
  }
}
