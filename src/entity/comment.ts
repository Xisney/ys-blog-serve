import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'

@Entity()
export class CommentCreator {
  @PrimaryGeneratedColumn()
  id: number

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

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Comment, comment => comment.id)
  parentId: string

  @Column()
  content: string

  @Column('datetime')
  publishTime: Date

  @OneToOne(() => CommentCreator)
  @JoinColumn()
  creator: CommentCreator
}
