import { DegreeEnum } from '../enums/degree.enum';
import { RemoteEnum } from '../enums/remote.enum';
import { ContractTypeEnum } from '../enums/contract-type.enum';

export interface OfferInterface {
  id: number;
  reference: string;
  url?: string;
  source: Source;
  title: string;
  company: Company;
  location?: Location;
  description: string;
  contract: ContractTypeEnum;
  requirements: string;
  experience: number;
  remote: RemoteEnum;
  degree: DegreeEnum;
  uploadAt: Date;
}

export interface Source {
  id: number;
  name: string;
  url: string;
}

export interface Company {
  id: number;
  name: string;
  size?: CompanySizeEnum;
  domain?: string;
}

export interface Location {
  id: number;
  name: string;
  country?: Location;
  latitude?: number;
  longitude?: number;
}

export enum CompanySizeEnum {}
