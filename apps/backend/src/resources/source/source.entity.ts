import { BaseEntityAbstract } from '../../shared/abstracts/base-entity.abstract';
import { SourceInterface } from './interfaces/source.interface';
import { Column, Entity } from 'typeorm';

@Entity()
export class Source extends BaseEntityAbstract implements SourceInterface {
  @Column({ nullable: false, length: 255, unique: true })
  name: string;

  @Column({ nullable: true, length: 512 })
  url?: string;
}
