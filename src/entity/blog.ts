import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { BlogGroup } from './blogGroup'
import { BlogTag } from './blogTag'

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @Column('datetime')
  publishTime: Date

  @Column()
  description: string

  @Column()
  viewCount: number

  @OneToOne(() => BlogGroup)
  @JoinColumn()
  group: BlogGroup

  @OneToMany(() => BlogTag, tag => tag.blog)
  tags: BlogTag[]
}
