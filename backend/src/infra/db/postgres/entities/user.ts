/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn,
} from 'typeorm';

@Entity('users')
class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  petPreference: string

  @Column()
  admin: boolean

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Users;
