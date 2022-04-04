import { getRepository } from 'typeorm'
import { Blog } from '../entity/blog'
import { groupRep } from './blogGroup'
import { tagRep } from './blogTag'
import { updateBaseInfo } from './base'

const blogRep = getRepository(Blog)

export async function getBlogs() {
  const target = await blogRep.find({
    select: [
      'id',
      'title',
      'description',
      'publishTime',
      'viewCount',
      'group',
      'tags',
      'isDraft',
    ],
    where: { isDraft: false },
    relations: ['group', 'tags'],
  })
  return target
}

interface ArchiveData {
  archiveTime: string
  blogs: {
    id: number
    publishTime: Date
    title: string
    group: any
    tags: any
  }[]
}

function getArchiveTime(t: any) {
  const d = new Date(t)
  return `${d.getFullYear()}年${d.getMonth() + 1}月`
}

export async function getBlogArchive() {
  const target = await blogRep.find({
    select: ['id', 'title', 'publishTime', 'group', 'tags'],
    relations: ['group', 'tags'],
    where: { isDraft: false },
  })
  return target.reduce<ArchiveData[]>(
    (pre, { id, title, publishTime, group, tags }) => {
      const archiveTime = getArchiveTime(publishTime)
      const blog = { id, title, publishTime, group, tags }

      const item = pre.find(v => v.archiveTime === archiveTime)

      if (item) {
        item.blogs.push(blog)
      } else {
        pre.push({ archiveTime, blogs: [blog] })
      }

      return pre
    },
    []
  )
}

export async function getBlogsCount() {
  const [_, num] = await blogRep.findAndCount({ where: { isDraft: false } })
  return num
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
  return target.id
}

export async function deleteBlog(id: number) {
  await blogRep.delete(id)
}

export async function getBlogContent(id: number) {
  const target = await blogRep.findOneBy({ id })
  if (!target) throw 'id错误'

  return target.content
}

export async function getClientBlog(id: number) {
  const target = await blogRep.findOne({
    where: { id, isDraft: false },
    select: ['content', 'title', 'group', 'publishTime', 'viewCount', 'id'],
    relations: ['group'],
  })
  if (!target) throw '没有这篇文章'

  // 此处不需要await，非必要事务，减少接口阻塞
  updateViewCount(id)
  return target
}

async function updateViewCount(id: number) {
  const target = await blogRep.findOneBy({ id })

  if (!target) return

  target.viewCount += 1

  await Promise.all([blogRep.save(target), updateBaseInfo('viewCount')])
}
