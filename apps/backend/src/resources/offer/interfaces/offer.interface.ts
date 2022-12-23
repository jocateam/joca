import { DegreeEnum } from '../enums/degree.enum';
import { RemoteEnum } from '../enums/remote.enum';
import { ContractTypeEnum } from '../enums/contract-type.enum';
import { SourceInterface } from '../../source/interfaces/source.interface';
import { CompanyInterface } from '../../company/interfaces/company.interface';
import { LocationInterface } from '../../location/interfaces/location.interface';

export interface OfferInterface {
  id?: number;
  reference: string;
  url?: string;
  source: SourceInterface;
  title: string;
  company: CompanyInterface;
  location?: LocationInterface;
  description: string;
  contract: ContractTypeEnum;
  requirements?: string;
  experience?: number;
  remote?: RemoteEnum;
  degree?: DegreeEnum;
  uploadAt?: Date;
}

export enum CompanySizeEnum {
  Test = 'test',
}
