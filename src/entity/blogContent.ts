import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class BlogContent {
  @PrimaryColumn()
  id: number

  @Column()
  content: string
}
