import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'

@Entity()
export class NavigationGroup {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string
}

@Entity()
export class Navigation {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  iconUrl: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  url: string

  @OneToOne(() => NavigationGroup)
  @JoinColumn()
  navgationGroup: NavigationGroup
}
