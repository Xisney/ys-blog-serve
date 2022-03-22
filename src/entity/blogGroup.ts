import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BlogGroup {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  label: string
}
