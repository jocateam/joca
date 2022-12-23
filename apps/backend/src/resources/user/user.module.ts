import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './providers/offer.providers';
import { GetUserByIdQueryHandler } from './queries/get-user-by-id.query-handler';
import { SharedModule } from '../../shared/shared.module';
import { IsUserUniqueQueryHandler } from './queries/is-user-unique.query-handler';

const QueryHandlers = [GetUserByIdQueryHandler, IsUserUniqueQueryHandler];

@Module({
  controllers: [UserController],
  imports: [SharedModule],
  providers: [...QueryHandlers, ...userProviders, UserService],
  exports: [...QueryHandlers, ...userProviders, UserService],
})
export class UserModule {}
