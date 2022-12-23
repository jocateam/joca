import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoginUserQueryHandler } from './queries/login-user.query-handler';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../../shared/shared.module';
import { RegisterUserQueryHandler } from './queries/register-user.query-handler';

const QueryHandlers = [LoginUserQueryHandler, RegisterUserQueryHandler];

@Module({
  controllers: [AuthController],
  imports: [UserModule, SharedModule],
  providers: [AuthService, ...QueryHandlers],
})
export class AuthModule {}
