import { Controller, Get } from '@nestjs/common';
import { OfferService } from '../services/offer.service';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get()
  findAll() {
    return this.offerService.findAll();
  }
}
