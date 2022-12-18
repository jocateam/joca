import { Controller, Get } from '@nestjs/common';
import { OfferService } from './offer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Offers')
@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get()
  findAll() {
    return this.offerService.findAll();
  }
}
