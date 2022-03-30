import { getRepository } from 'typeorm'
import { Blog } from '../entity/blog'

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

export async function updateBlog(data: Omit<Blog, 'id'>, id?: number) {
  let target: Blog | null
  if (id) {
    target = await blogRep.findOneBy({ id })
    if (!target) return
  } else {
    target = new Blog()
  }

  Object.entries(data).forEach(([k, v]) => {
    // @ts-ignore
    target[k] = v
  })
  await blogRep.save(target)
}

export async function deleteBlog(id: number) {
  await blogRep.delete(id)
}

export async function getBlogContent(id: number, content: string) {
  const target = await blogRep.findOneBy({ id })
  if (!target) throw 'id错误'

  target.content = content
  await blogRep.save(target)
}
