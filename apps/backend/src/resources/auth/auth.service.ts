import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterUserQuery } from './queries/register-user.query';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly _queryBus: QueryBus) {}

  register(registerDto: RegisterDto) {
    this._queryBus.execute(
      new RegisterUserQuery(
        registerDto.email,
        registerDto.firstname,
        registerDto.lastname,
        registerDto.password
      )
    );
  }
}
