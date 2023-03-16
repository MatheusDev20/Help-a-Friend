/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import User from './user';

@Entity('pets')
export default class Pets {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    name: string;

  @Column()
    gender: string;

  @Column()
    size: string;

  @Column()
    user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
    user: User;

  @Column({ nullable: true })
    pet_photos: string;

  @Column()
    history: string;

  @Column()
    castrated: boolean;

  @Column()
    vaccinated: boolean;

  @Column()
    city: string;

  @Column()
    uf: string;

  @Column()
    pet_location: string;

  @Column()
    pet_owner_email: string;

  @Column()
    specie: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updateAt: Date;
}
