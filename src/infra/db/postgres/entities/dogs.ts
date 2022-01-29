/* eslint-disable no-shadow */
import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import User from './user';

// export enum Gender {
//   MALE = 'M',
//   FEMALE = 'F'
// }
// export enum Size {
//   GRANDE = 'Grande',
//   PEQUENO = 'Pequeno',
//   MEDIO = 'Medio'
// }

@Entity('dogs')
export default class Dogs {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  size: string

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  photos: string;

  @Column()
  dog_photos: string

  @Column()
  history: string;

  @Column()
  castrated: boolean;

  @Column()
  vaccinated: boolean;
}
