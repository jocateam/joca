import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './providers/offer.providers';
import { GetUserByIdQueryHandler } from './queries/get-user-by-id.query-handler';
import { SharedModule } from '../../shared/shared.module';

const QueryHandlers = [GetUserByIdQueryHandler];
// const CommandHandlers = [];

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [
    // ...CommandHandlers,
    ...QueryHandlers,
    ...userProviders,
    UserService,
  ],
})
export class UserModule {}
