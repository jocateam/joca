import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Source } from './source.entity';
import { GetSourceByNameQuery } from './queries/get-source-by-name.query';
import { GetAllSourcesQuery } from './queries/get-all-sources.query';

@Injectable()
export class SourceService {
  constructor(private readonly _queryBus: QueryBus) {}

  public getAll(): Promise<Source[]> {
    return this._queryBus.execute(new GetAllSourcesQuery());
  }

  public getSourceByName(name: string): Promise<Source> {
    return this._queryBus.execute(new GetSourceByNameQuery(name));
  }
}
