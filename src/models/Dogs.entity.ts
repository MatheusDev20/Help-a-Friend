import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import User from './User.entity';

@Entity('dogs')
export default class Dogs {
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

    @Column()
    history: string;

    @Column()
    castrated: boolean;

    @Column()
    vaccinated: boolean;
}
