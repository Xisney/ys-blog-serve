import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BlogGroup {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  label: string
}
