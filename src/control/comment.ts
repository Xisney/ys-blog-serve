import { getRepository } from 'typeorm'
import { Comment } from '../entity/comment'

const commentRep = getRepository(Comment)

export async function submitComment(data: Comment) {
  const target = new Comment()

  Object.entries(data).forEach(([k, v]) => {
    switch (k) {
      case 'parentId':
        target.parentId = v || 0
        break
      default:
        // @ts-ignore
        target[k] = v
    }
  })

  target.publishTime = new Date()

  const c = await commentRep.save(target)
  return { id: c.id, publishTime: c.publishTime }
}

export function getComment() {
  return commentRep.find()
}
