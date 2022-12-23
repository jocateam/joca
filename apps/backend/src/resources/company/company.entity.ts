import { Column, Entity } from 'typeorm';
import { BaseEntityAbstract } from '../../shared/abstracts/base-entity.abstract';
import { CompanyInterface } from './interfaces/company.interface';
import { CompanySizeEnum } from '../offer/interfaces/offer.interface';

@Entity()
export class Company extends BaseEntityAbstract implements CompanyInterface {
  @Column({ nullable: false, length: 255 })
  name: string;

  @Column({ nullable: true, length: 255 })
  domain?: string;

  @Column({ nullable: true, type: 'enum', enum: CompanySizeEnum })
  size?: CompanySizeEnum;
}
