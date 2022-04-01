import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { BlogGroup } from './blogGroup'
import { BlogTag } from './blogTag'

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column('text')
  content: string

  @Column('datetime')
  publishTime: Date

  @Column()
  description: string

  @Column()
  isDraft: boolean

  @Column()
  viewCount: number

  @ManyToOne(() => BlogGroup, blogGroup => blogGroup.blogs)
  group: BlogGroup

  @ManyToMany(() => BlogTag)
  @JoinTable()
  tags: BlogTag[]
}
