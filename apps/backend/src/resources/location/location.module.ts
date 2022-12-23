import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { locationProviders } from './providers/location.providers';

@Module({
  imports: [SharedModule],
  providers: [...locationProviders],
})
export class LocationModule {}
