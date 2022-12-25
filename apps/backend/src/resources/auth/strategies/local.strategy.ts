import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserWithJwtDto } from '../dtos/user-with-jwt.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {
    console.log('on local strategy');
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserWithJwtDto> {
    const user = await this.authService.login({ email, password });
    return {
      access_token: this.jwtService.sign({ ...user }),
      ...user,
    };
  }
}
