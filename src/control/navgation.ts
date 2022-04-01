import { getRepository } from 'typeorm'
import { Navigation, NavigationGroup } from '../entity/navigation'

const navRep = getRepository(Navigation)
const navGroupRep = getRepository(NavigationGroup)

export function getNavigation() {
  return navGroupRep.find({ relations: ['navItems'] })
}

export async function getNavigationGroup() {
  const data = await navGroupRep.find({ relations: ['navItems'] })
  return data.map(({ id, name, navItems }) => ({
    id,
    label: name,
    count: navItems.length,
  }))
}

export async function updateNavGroup(name: string, id?: number) {
  if (id) {
    const target = await navGroupRep.findOneBy({ id })
    if (!target) return
    target.name = name
    await navGroupRep.save(target)
  } else {
    const group = new NavigationGroup()
    group.name = name
    await navGroupRep.save(group)
    return group.id
  }
}

export async function removeNavGroup(id: number) {
  await navGroupRep.delete(id)
}
