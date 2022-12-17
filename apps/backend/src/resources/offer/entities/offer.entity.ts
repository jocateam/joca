import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryColumn({
    insert: false,
    update: false,
    type: 'int',
    unsigned: true,
    generated: 'increment',
  })
  id?: number;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  reference: string;

  @Column({ type: 'varchar', nullable: false, length: 512 })
  url: string;
}
