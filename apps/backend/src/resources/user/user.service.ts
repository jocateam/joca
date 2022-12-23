import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IsUserUniqueQuery } from './queries/is-user-unique.query';

@Injectable()
export class UserService {
  constructor(private readonly _queryBus: QueryBus) {}

  public isUniqueUser(email: string): Promise<boolean> {
    return this._queryBus.execute(new IsUserUniqueQuery(email));
  }
}
