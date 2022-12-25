import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from './refresh-token.command';
import { Repository } from 'typeorm';
import { User } from '../../user/user.entity';
import { BadRequestException, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../shared/constants';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler
  implements ICommandHandler<RefreshTokenCommand, string>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly _repository: Repository<User>
  ) {}

  async execute(command: RefreshTokenCommand): Promise<string> {
    const user = await this._repository.findOneBy({
      token: command.refreshToken,
    });

    // if user and jwt ok
    if (user && user.tokenValidityDate > new Date()) {
      return Promise.resolve('');
    }

    throw new BadRequestException('Bad token');
  }
}
