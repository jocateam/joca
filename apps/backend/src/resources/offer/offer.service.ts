import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllOffersQuery } from './queries/get-all-offers.query';
import { BulkCreateOffersCommand } from './commands/bulk-create-offers.command';
import { CreateOneOfferCommand } from './commands/create-one-offer.command';
import { CreateOfferDto } from './dtos/create-offer.dto';

@Injectable()
export class OfferService {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus
  ) {}

  findAll() {
    return this._queryBus.execute(new GetAllOffersQuery());
  }

  create(createOfferDto: CreateOfferDto) {
    return this._commandBus.execute(
      new CreateOneOfferCommand(
        createOfferDto.title,
        createOfferDto.reference,
        createOfferDto.url,
        createOfferDto.source,
        {
          name: createOfferDto.company.name,
          domain: createOfferDto.company.domain,
        },
        createOfferDto.requirements,
        createOfferDto.location,
        createOfferDto.description
      )
    );
  }

  bulkCreate(createOfferDtos: CreateOfferDto[]) {
    return this._commandBus.execute(
      new BulkCreateOffersCommand(createOfferDtos)
    );
  }
}
