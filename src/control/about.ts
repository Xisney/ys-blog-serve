import { getRepository } from 'typeorm'
import { About } from '../entity/about'
import { baseAboutId } from '../consts'

const aboutRep = getRepository(About)

export function getAboutContent() {
  return aboutRep.findOneBy({ id: baseAboutId })
}

export async function updateAboutContent(content: string) {
  let target = await getAboutContent()
  if (!target) {
    target = new About()
    target.id = baseAboutId
  }

  target.content = content
  await aboutRep.save(target)
}
