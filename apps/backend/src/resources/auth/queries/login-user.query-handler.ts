import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../../user/user.entity';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../shared/constants';
import { Repository } from 'typeorm';
import { LoginUserQuery } from './login-user.query';
import { hash } from 'typeorm/util/StringUtils';

@QueryHandler(LoginUserQuery)
export class LoginUserQueryHandler
  implements IQueryHandler<LoginUserQuery, User | null>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly _repository: Repository<User>
  ) {}

  execute(query: LoginUserQuery): Promise<User | null> {
    return this._repository.findOneBy({
      email: query.email,
      password: hash(query.password),
    });
  }
}
