/* eslint-disable no-shadow */
import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import User from './user';

@Entity('pets')
export default class Pets {
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
  pet_photos: string

  @Column()
  history: string;

  @Column()
  castrated: boolean;

  @Column()
  vaccinated: boolean;
}
