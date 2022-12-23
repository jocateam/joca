import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntityAbstract } from '../../shared/abstracts/base-entity.abstract';
import { OfferInterface } from './interfaces/offer.interface';
import { ContractTypeEnum } from './enums/contract-type.enum';
import { DegreeEnum } from './enums/degree.enum';
import { RemoteEnum } from './enums/remote.enum';
import { Source } from '../source/source.entity';
import { Company } from '../company/company.entity';
import { Location } from '../location/location.entity';

@Entity()
export class Offer extends BaseEntityAbstract implements OfferInterface {
  @Column({ nullable: false, length: 255 })
  reference: string;

  @Column({ nullable: false, length: 512 })
  url: string;

  @ManyToOne(() => Company)
  company: Company;

  @ManyToOne(() => Source)
  source: Source;

  contract: ContractTypeEnum;
  degree: DegreeEnum;
  description: string;
  experience: number;
  location: Location;
  remote: RemoteEnum;
  requirements: string;
  title: string;
  uploadAt: Date;
}
