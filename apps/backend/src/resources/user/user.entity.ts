import { Column, Entity } from 'typeorm';
import { UserInterface } from './interfaces/user.interface';
import { BaseEntityAbstract } from '../../shared/abstracts/base-entity.abstract';

@Entity()
export class User extends BaseEntityAbstract implements UserInterface {
  @Column()
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;
}
