import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../../user/user.entity';
import { BadRequestException, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../shared/constants';
import { Repository } from 'typeorm';
import { hash } from 'typeorm/util/StringUtils';
import { RegisterUserQuery } from './register-user.query';
import { UserService } from '../../user/user.service';

@QueryHandler(RegisterUserQuery)
export class RegisterUserQueryHandler
  implements IQueryHandler<RegisterUserQuery, User | null>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly _repository: Repository<User>,
    private readonly _userService: UserService
  ) {}

  async execute(query: RegisterUserQuery): Promise<User | null> {
    // test if unique
    const isUnique = await this._userService.isUniqueUser(query.email);
    // insert
    if (isUnique) {
      return this._repository
        .insert({
          email: query.email,
          firstname: query.firstname,
          lastname: query.lastname,
          password: hash(query.password),
        })
        .then((res) => {
          // this._userService.getUserById(new GetUserByIdQuery(res.identifiers[0]));
          return null;
        });
    } else {
      throw new BadRequestException('Not unique user');
    }
  }
}
