import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Source } from './source.entity';
import { GetSourceByNameQuery } from './queries/get-source-by-name.query';

@Injectable()
export class SourceService {
  constructor(private readonly _queryBus: QueryBus) {}

  public getSourceByName(name: string): Promise<Source> {
    return this._queryBus.execute(new GetSourceByNameQuery(name));
  }
}
