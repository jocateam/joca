import { CompanySizeEnum } from '../../offer/interfaces/offer.interface';

export interface CompanyInterface {
  id?: number;
  name: string;
  size?: CompanySizeEnum;
  domain?: string;
}
