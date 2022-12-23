import { CreateCompanyDto } from '../../company/dtos/create-company.dto';

export class CreateOfferDto {
  reference: string;
  title: string;
  url: string;
  source: string;
  company: CreateCompanyDto;
  requirements: string;
  location: string;
  description: string;
}
