import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  parentId: number

  @Column()
  content: string

  @Column('datetime')
  publishTime: Date

  @Column()
  nickname: string

  @Column()
  avatar: string

  @Column()
  email: string

  @Column()
  homepage: string

  @Column()
  isAdmin: boolean
}
