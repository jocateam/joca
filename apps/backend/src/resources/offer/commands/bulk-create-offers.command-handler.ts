import { Offer } from '../offer.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BulkCreateOffersCommand } from './bulk-create-offers.command';
import { Inject } from '@nestjs/common';
import { OFFER_REPOSITORY } from '../../../shared/constants';
import { InsertResult, Repository } from 'typeorm';
import { SourceService } from '../../source/source.service';
import { Source } from '../../source/source.entity';
import { Company } from '../../company/company.entity';
import { CompanyService } from '../../company/company.service';

@CommandHandler(BulkCreateOffersCommand)
export class BulkCreateOffersCommandHandler
  implements ICommandHandler<BulkCreateOffersCommand, InsertResult>
{
  constructor(
    @Inject(OFFER_REPOSITORY) private readonly _repository: Repository<Offer>,
    private readonly _sourceService: SourceService,
    private readonly _companyService: CompanyService
  ) {}

  async execute(command: BulkCreateOffersCommand): Promise<InsertResult> {
    const companies: Company[] = [];
    const sources: Source[] = await this._sourceService.getAll();

    const offers: Offer[] = [];
    for (const offer of command.offers) {
      let source;
      let company;
      if (offer.source) {
        source = sources.find((s) => s.name === offer.source);
      }
      if (
        offer.company &&
        !companies.find((c) => c.name === offer.company.name)
      ) {
        company = await this._companyService.findOrCreate(offer.company);
        companies.push(company);
      } else if (offer.company) {
        company = companies.find((c) => c.name === offer.source);
      }

      offers.push(
        this._repository.create({
          ...offer,
          source,
          company,
          location: undefined,
        })
      );
    }

    return this._repository.insert(offers);
  }
}
