import { Module } from '@nestjs/common';
import { databaseProviders } from '../../app/providers/db.providers';
import { ToolsService } from '../services/tools.service';

@Module({
  providers: [...databaseProviders, ToolsService],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
