import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import User from '../../../../User/Infra/typeorm/entities/User';

// eslint-disable-next-line no-shadow
export enum Gender {
  MALE = 'M',
  FEMALE = 'F'
}
@Entity('dogs')
export default class Dogs {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string;

    @Column({
      type: 'enum',
      enum: Gender,
      default: Gender.MALE,
    })
    gender: string;

    @Column()
    size: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    history: string;

    @Column()
    avatar: string;

    @Column()
    castrated: boolean;

    @Column()
    vaccinated: boolean;
}
