import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BlogTag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  label: string
}
