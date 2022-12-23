import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSourceByNameQuery } from './get-source-by-name.query';
import { Repository } from 'typeorm';
import { Source } from '../source.entity';
import { Inject } from '@nestjs/common';
import { SOURCE_REPOSITORY } from '../../../shared/constants';

@QueryHandler(GetSourceByNameQuery)
export class GetSourceByNameQueryHandler
  implements IQueryHandler<GetSourceByNameQuery, Source | null>
{
  constructor(
    @Inject(SOURCE_REPOSITORY) private readonly _repository: Repository<Source>
  ) {}

  execute(query: GetSourceByNameQuery): Promise<Source | null> {
    return this._repository.findOneBy({ name: query.name });
  }
}
