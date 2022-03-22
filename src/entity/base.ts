import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Base {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  notice: string

  @Column()
  viewCount: number

  @Column()
  runTime: number
}
