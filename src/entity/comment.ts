import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Comment, comment => comment.creator)
  comments: Comment[]
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Comment, comment => comment.id)
  parentId: number

  @Column()
  content: string

  @Column('datetime')
  publishTime: Date

  @ManyToOne(() => CommentCreator, creator => creator.comments)
  creator: CommentCreator
}
