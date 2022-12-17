import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database.module';
import { ToolsService } from './services/tools.service';

@Module({
  imports: [DatabaseModule],
  exports: [DatabaseModule, ToolsService],
  providers: [ToolsService]
})
export class SharedModule {}
