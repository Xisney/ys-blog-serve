import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Blog } from './blog'

@Entity()
export class BlogTag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  label: string

  @ManyToOne(() => Blog, blog => blog.tags)
  blog: Blog
}
