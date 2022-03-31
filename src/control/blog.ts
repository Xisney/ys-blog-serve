import { getRepository } from 'typeorm'
import { Blog } from '../entity/blog'
import { groupRep } from './blogGroup'
import { tagRep } from './blogTag'

const blogRep = getRepository(Blog)

export function getBlogs() {
  return blogRep.find({
    select: [
      'id',
      'title',
      'description',
      'publishTime',
      'viewCount',
      'group',
      'tags',
    ],
    relations: ['group', 'tags'],
  })
}

export function getDraftBlogs() {
  return blogRep.find({
    select: [
      'id',
      'title',
      'description',
      'publishTime',
      'viewCount',
      'group',
      'tags',
    ],
    where: { isDraft: true },
    relations: ['group', 'tags'],
  })
}

export async function updateBlog(data: Omit<Blog, 'id'>, id?: number) {
  let target: Blog | null
  if (id) {
    target = await blogRep.findOneBy({ id })
    if (!target) return
  } else {
    target = new Blog()
  }

  const dataKv = Object.entries(data)
  for (let i = 0; i < dataKv.length; i++) {
    const [k, v] = dataKv[i]
    switch (k) {
      case 'group':
        const g = await groupRep.findOneBy({ id: v as number })
        if (!g) throw '无效分组id'
        target[k] = g
        break
      case 'tags':
        const ts = []
        // @ts-ignore
        for (let i of v) {
          const tag = await tagRep.findOneBy({ id: i })
          if (!tag) throw '无效标签id'
          ts.push(tag)
        }
        target[k] = ts
        break
      default:
        // @ts-ignore
        target[k] = v
    }
  }
  target.publishTime = new Date()

  await blogRep.save(target)
}

export async function deleteBlog(id: number) {
  await blogRep.delete(id)
}

export async function getBlogContent(id: number) {
  const target = await blogRep.findOneBy({ id })
  if (!target) throw 'id错误'

  return target.content
}