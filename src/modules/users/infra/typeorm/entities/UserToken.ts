import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm'

@Entity('user_tokens')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  user_id: string

  @Column('varchar')
  @Generated('uuid')
  token: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default User
