import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../../user/user.entity';
import { HttpStatus, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../shared/constants';
import { Repository } from 'typeorm';
import { LoginUserQuery } from './login-user.query';
import { hash } from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { UserInterface } from '../../user/interfaces/user.interface';
import { HttpException } from '../../../shared/exceptions/http.exception';
import { INVALID_CREDENTIALS } from '../../../shared/constants/errors';

@QueryHandler(LoginUserQuery)
export class LoginUserQueryHandler
  implements IQueryHandler<LoginUserQuery, UserInterface>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly _repository: Repository<User>
  ) {}

  async execute(query: LoginUserQuery): Promise<UserInterface> {
    return this._repository
      .findOneByOrFail({ email: query.email })
      .then(async (user) => {
        if ((await hash(query.password, user.salt)) === user.password) {
          return instanceToPlain(user, { groups: ['login'] }) as UserInterface;
        }
        return Promise.reject();
      })
      .catch((e) => {
        throw new HttpException(
          INVALID_CREDENTIALS,
          [],
          HttpStatus.UNAUTHORIZED,
          e
        );
      });
  }
}
