import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntityAbstract } from '../../shared/abstracts/base-entity.abstract';
import { LocationInterface } from './interfaces/location.interface';

@Entity()
export class Location extends BaseEntityAbstract implements LocationInterface {
  @Column({ nullable: false, length: 255 })
  name: string;

  @ManyToOne(() => Location, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  country?: Location;

  @Column({ type: 'decimal', nullable: true })
  latitude: number;
  longitude: number;
}
