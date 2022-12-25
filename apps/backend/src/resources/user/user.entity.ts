import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { UserInterface } from './interfaces/user.interface';
import { BaseEntityAbstract } from '../../shared/abstracts/base-entity.abstract';
import { Exclude, Expose } from 'class-transformer';
import { hash } from 'bcrypt';

@Entity()
export class User extends BaseEntityAbstract implements UserInterface {
  @Column()
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, this.salt);
    }
  }

  @Exclude({ toPlainOnly: true })
  @Column()
  salt: string;

  @Expose({ groups: ['login'] })
  @Column({ length: 12 })
  token: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  tokenValidityDate: Date;
}
