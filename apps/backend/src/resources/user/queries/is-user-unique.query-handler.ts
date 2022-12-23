import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../user.entity';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../shared/constants';
import { Repository } from 'typeorm';
import { IsUserUniqueQuery } from './is-user-unique.query';

@QueryHandler(IsUserUniqueQuery)
export class IsUserUniqueQueryHandler
  implements IQueryHandler<IsUserUniqueQuery, boolean>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly _repository: Repository<User>
  ) {}

  execute(query: IsUserUniqueQuery): Promise<boolean> {
    return this._repository
      .findOneBy({
        email: query.email,
      })
      .then((user) => !user);
  }
}
