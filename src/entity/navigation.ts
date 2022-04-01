import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'

@Entity()
export class NavigationGroup {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Navigation, navigation => navigation.navgationGroup)
  navItems: Navigation[]
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

  @ManyToOne(() => NavigationGroup, navigationGroup => navigationGroup.navItems)
  navgationGroup: NavigationGroup
}
