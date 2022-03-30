import { getRepository } from 'typeorm'
import { BlogTag } from '../entity/blogTag'

const tagRep = getRepository(BlogTag)

export function getBlogTag() {
  return tagRep.find()
}

export async function updateBlogTag(label: string, id?: number) {
  if (id) {
    const target = await tagRep.findOne({ where: { id } })
    if (!target) throw 'id错误'
    target.label = label
    await tagRep.save(target)
  } else {
    const group = new BlogTag()
    group.label = label
    await tagRep.save(group)
    return group.id
  }
}

export async function removeBlogTag(id: number) {
  await tagRep.delete(id)
}
