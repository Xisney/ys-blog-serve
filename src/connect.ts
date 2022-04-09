import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { NavigationGroup, Navigation } from './entity/navigation'
import { Comment } from './entity/comment'
import { Blog } from './entity/blog'
import { BlogTag } from './entity/blogTag'
import { BlogGroup } from './entity/blogGroup'
import { Base } from './entity/base'
import { About } from './entity/about'

const prod = {
  password: 't*l*zMK,h1S!',
  database: 'blog',
}

const dev = {
  password: '253977',
  database: 'test',
}

const config = process.env.NODE_ENV === 'dev' ? dev : prod

export const AppDataSource = createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  ...config,
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
