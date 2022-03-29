import { Column, Entity, PrimaryColumn } from 'typeorm'

export type BaseKey = 'id' | 'notice' | 'viewCount' | 'lastModify'

@Entity()
export class Base {
  @PrimaryColumn()
  id: number

  @Column()
  notice: string

  @Column()
  viewCount: number

  @Column('datetime')
  lastModify: Date
}
