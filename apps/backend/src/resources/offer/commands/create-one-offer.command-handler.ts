import { Offer } from '../offer.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { OFFER_REPOSITORY } from '../../../shared/constants';
import { InsertResult, Repository } from 'typeorm';
import { CreateOneOfferCommand } from './create-one-offer.command';
import { SourceService } from '../../source/source.service';
import { CompanyService } from '../../company/company.service';

@CommandHandler(CreateOneOfferCommand)
export class CreateOneOfferCommandHandler
  implements ICommandHandler<CreateOneOfferCommand, InsertResult>
{
  constructor(
    @Inject(OFFER_REPOSITORY) private readonly _repository: Repository<Offer>,
    private readonly _sourceService: SourceService,
    private readonly _companyService: CompanyService
  ) {}

  async execute(command: CreateOneOfferCommand): Promise<InsertResult> {
    // TODO get the company (or create it)
    const [source, company] = await Promise.all([
      this._sourceService.getSourceByName(command.source),
      this._companyService.findOrCreate(command.company),
    ]);

    const offer = this._repository.create({
      reference: command.reference,
      title: command.title,
      url: command.url,
      requirements: command.requirements,
      description: command.description,
      source,
      company,
    });
    console.debug(command, offer);
    return this._repository.insert(offer);
  }
}
