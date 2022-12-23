import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllSourcesQuery } from './get-all-sources.query';
import { Source } from '../source.entity';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { SOURCE_REPOSITORY } from '../../../shared/constants';

@QueryHandler(GetAllSourcesQuery)
export class GetAllSourcesQueryHandler
  implements IQueryHandler<GetAllSourcesQuery, Source[]>
{
  constructor(
    @Inject(SOURCE_REPOSITORY) private readonly _repository: Repository<Source>
  ) {}

  execute(): Promise<Source[]> {
    return this._repository.find();
  }
}
