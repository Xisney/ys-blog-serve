import { mailNotice } from '../mail'
import { getRepository } from 'typeorm'
import { Comment } from '../entity/comment'

const commentRep = getRepository(Comment)

export async function submitComment(data: Comment, isAdmin: boolean) {
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
  target.isAdmin = isAdmin

  if (target.parentId === 0) {
    mailNotice(target)
  } else {
    const parentEmail = await commentRep.findOneBy({ id: target.parentId })
    if (parentEmail) {
      mailNotice(parentEmail, target)
    }
  }

  const c = await commentRep.save(target)
  return { id: c.id, publishTime: c.publishTime, isAdmin }
}

export function getComment() {
  return commentRep.find()
}

export async function removeComment(id: number) {
  const target = await commentRep.findOneBy({ id })

  if (!target) throw 'id 异常'

  if (target.parentId === 0) {
    const allComments = await commentRep.find()
    const targets = allComments.filter(v => v.parentId === id).map(v => v.id)
    await commentRep.delete([...targets, id])
  } else {
    await commentRep.delete(id)
  }
}
