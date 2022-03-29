import { getRepository } from 'typeorm'
import { Blog } from '@src/entity/blog'
import { BlogContent } from '@src/entity/blogContent'

const blogRep = getRepository(Blog)
const blogContentRep = getRepository(BlogContent)

export function getBlogs() {
  return blogRep.find()
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

export function getBlogContent(id: number) {
  return blogContentRep.findOneBy({ id })
}
