import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from './commands/register-user.command';
import { RegisterDto } from './dtos/register.dto';
import { RefreshTokenCommand } from './commands/refresh-token.command';
import { LoginUserQuery } from './queries/login-user.query';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus
  ) {}

  public login(loginDto: LoginDto) {
    return this._queryBus.execute(
      new LoginUserQuery(loginDto.email, loginDto.password)
    );
  }

  public register(registerDto: RegisterDto) {
    return this._commandBus.execute(
      new RegisterUserCommand(
        registerDto.email,
        registerDto.firstname,
        registerDto.lastname,
        registerDto.password
      )
    );
  }

  public refresh(refreshToken: string, jwt: string) {
    return this._commandBus.execute(new RefreshTokenCommand(refreshToken, jwt));
  }
}
