import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class About {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  aboutSite: string
  
  @Column()
  aboutSelf: string
}
