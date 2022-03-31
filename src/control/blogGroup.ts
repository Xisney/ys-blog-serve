import { getRepository } from 'typeorm'
import { BlogGroup } from '../entity/blogGroup'

export const groupRep = getRepository(BlogGroup)

export function getBlogGroup() {
  return groupRep.find()
}

export async function updateBlogGroup(label: string, id?: number) {
  if (id) {
    const target = await groupRep.findOne({ where: { id } })
    if (!target) return
    target.label = label
    await groupRep.save(target)
  } else {
    const group = new BlogGroup()
    group.label = label
    await groupRep.save(group)
    return group.id
  }
}

export async function removeBlogGroup(id: number) {
  await groupRep.delete(id)
}
