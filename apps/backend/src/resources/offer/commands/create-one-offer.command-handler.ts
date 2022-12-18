import { Offer } from '../offer.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { OFFER_REPOSITORY } from '../../../shared/constants';
import { InsertResult, Repository } from 'typeorm';
import { CreateOneOfferCommand } from './create-one-offer.command';

@CommandHandler(CreateOneOfferCommand)
export class CreateOneOfferCommandHandler
  implements ICommandHandler<CreateOneOfferCommand, InsertResult>
{
  constructor(
    @Inject(OFFER_REPOSITORY) private readonly _repository: Repository<Offer>
  ) {}

  execute(command: CreateOneOfferCommand): Promise<InsertResult> {
    return this._repository.insert(command.offer);
  }
}
