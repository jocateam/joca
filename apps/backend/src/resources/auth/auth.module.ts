import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoginUserQueryHandler } from './queries/login-user.query-handler';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../../shared/shared.module';
import { RegisterUserCommandHandler } from './commands/register-user.command-handler';
import { RefreshTokenCommandHandler } from './commands/refresh-token.command-handler';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

const CommandHandlers = [
  RefreshTokenCommandHandler,
  RegisterUserCommandHandler,
];
const QueryHandlers = [LoginUserQueryHandler];

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY') || 'example@123',
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION_TIME') || '1d',
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    SharedModule,
    UserModule,
  ],
  providers: [
    AuthService,
    ...CommandHandlers,
    LocalStrategy,
    JwtStrategy,
    ...QueryHandlers,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
