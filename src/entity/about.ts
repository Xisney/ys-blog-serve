import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class About {
  @PrimaryColumn()
  id: number

  @Column('text')
  content: string
}
