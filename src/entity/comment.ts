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
  id: string

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
  id: string

  @ManyToOne(() => Comment, comment => comment.id)
  parentId: string

  @Column()
  content: string

  @Column()
  publishTime: number

  @OneToOne(() => CommentCreator)
  @JoinColumn()
  creator: CommentCreator
}
