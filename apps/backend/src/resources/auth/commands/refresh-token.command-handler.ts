import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from './refresh-token.command';
import { Repository } from 'typeorm';
import { User } from '../../user/user.entity';
import { HttpStatus, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../../shared/constants';
import { HttpException } from '../../../shared/exceptions/http.exception';
import { INVALID_TOKEN } from '../../../shared/constants/errors';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler
  implements ICommandHandler<RefreshTokenCommand, string>
{
  constructor(
    @Inject(USER_REPOSITORY) private readonly _repository: Repository<User>,
    private readonly _jwtService: JwtService
  ) {}

  async execute(command: RefreshTokenCommand): Promise<string> {
    const user = await this._repository
      .findOneByOrFail({
        token: command.refreshToken,
      })
      .catch((e) => {
        throw new HttpException(INVALID_TOKEN, [], HttpStatus.UNAUTHORIZED, e);
      });

    return this._jwtService
      .verifyAsync(command.jwt, { ignoreExpiration: true })
      .then(() => {
        if (user && user.tokenValidityDate > new Date()) {
          return this._jwtService.signAsync(
            instanceToPlain(user, { groups: ['login'] })
          );
        }

        return Promise.reject();
      })
      .catch((e) => {
        throw new HttpException(INVALID_TOKEN, [], HttpStatus.UNAUTHORIZED, e);
      });
  }
}
