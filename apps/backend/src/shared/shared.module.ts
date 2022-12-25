import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database.module';
import { ToolsService } from './services/tools.service';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [DatabaseModule, CqrsModule],
  providers: [ToolsService],
  exports: [CqrsModule, DatabaseModule, ToolsService],
})
export class SharedModule {}
