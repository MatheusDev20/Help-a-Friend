/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
import {
  Entity, Column, CreateDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('forgot_password_token')
class ForgotPasswordToken {
  @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
      user_email: string;

    @Column()
      token: string;

    @CreateDateColumn()
      requested_at: Date;
}

export default ForgotPasswordToken;
