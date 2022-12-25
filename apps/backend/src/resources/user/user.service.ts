import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IsUserUniqueQuery } from './queries/is-user-unique.query';
import { GetUserByIdQuery } from './queries/get-user-by-id.query';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly _queryBus: QueryBus) {}

  public isUniqueUser(email: string): Promise<boolean> {
    return this._queryBus.execute(new IsUserUniqueQuery(email));
  }

  public getUserById(userId: number): Promise<User | null> {
    return this._queryBus.execute(new GetUserByIdQuery(userId));
  }
}
