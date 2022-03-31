import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Blog } from './blog'

@Entity()
export class BlogGroup {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  label: string

  @OneToMany(() => Blog, blog => blog.group)
  blogs: Blog[]
}
