import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../user/user.entity';
import { BadRequestException, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../shared/constants';
import { Repository } from 'typeorm';
import { RegisterUserCommand } from './register-user.command';
import { UserService } from '../../user/user.service';
import { genSalt } from 'bcrypt';
import { ToolsService } from '../../../shared/services/tools.service';

@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler
  implements ICommandHandler<RegisterUserCommand, User | null>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly _repository: Repository<User>,
    private readonly _userService: UserService,
    private readonly _toolsService: ToolsService
  ) {}

  async execute(command: RegisterUserCommand): Promise<User | null> {
    const isUnique = await this._userService.isUniqueUser(command.email);

    if (isUnique) {
      const tokenValidityDate = new Date();
      tokenValidityDate.setMonth(tokenValidityDate.getMonth() + 6);

      const user = this._repository.create({
        email: command.email,
        firstname: command.firstname,
        lastname: command.lastname,
        password: command.password,
        salt: await genSalt(),
        token: this._toolsService.generateToken(12),
        tokenValidityDate,
      });

      return this._repository
        .insert(user)
        .then((res) => this._userService.getUserById(res.identifiers[0].id));
    } else {
      throw new BadRequestException('Not unique user');
    }
  }
}
