import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { NavigationGroup, Navigation } from './entity/navigation'
import { Comment } from './entity/comment'
import { Blog } from './entity/blog'
import { BlogTag } from './entity/blogTag'
import { BlogGroup } from './entity/blogGroup'
import { Base } from './entity/base'
import { About } from './entity/about'

export const AppDataSource = createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '253977',
  database: 'test',
  // synchronize: true,
  // dropSchema: true,
  logging: false,
  entities: [
    NavigationGroup,
    Navigation,
    Comment,
    Blog,
    BlogGroup,
    BlogTag,
    Base,
    About,
  ],
  migrations: [],
  subscribers: [],
})
