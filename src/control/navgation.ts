import { getRepository } from 'typeorm'
import {
  Navigation,
  NavigationGroup,
  UpdateNavData,
} from '../entity/navigation'

const navRep = getRepository(Navigation)
const navGroupRep = getRepository(NavigationGroup)

export function getNavigation() {
  return navGroupRep.find({ relations: ['navItems'] })
}

export async function updateNavgation(data: UpdateNavData, id?: number) {
  let target: Navigation | null
  if (id) {
    target = await navRep.findOneBy({ id })
  } else {
    target = new Navigation()
  }

  if (!target) throw 'id错误'

  const dataKv = Object.entries(data)

  for (let i = 0; i < dataKv.length; i++) {
    const [k, v] = dataKv[i]

    switch (k) {
      case 'navgationGroup':
        const group = await navGroupRep.findOneBy({ id: v })
        if (!group) throw '分组id异常'
        target.navgationGroup = group
        break
      default:
        // @ts-ignore
        target[k] = v || ''
    }
  }

  await navRep.save(target)
}

export async function removeNav(id: number) {
  await navRep.delete(id)
}

export async function getNavigationGroup() {
  const data = await navGroupRep.find({ relations: ['navItems'] })
  return data.map(({ id, label, navItems }) => ({
    id,
    label,
    count: navItems.length,
  }))
}

export async function updateNavGroup(label: string, id?: number) {
  if (id) {
    const target = await navGroupRep.findOneBy({ id })
    if (!target) return
    target.label = label
    await navGroupRep.save(target)
  } else {
    const group = new NavigationGroup()
    group.label = label
    await navGroupRep.save(group)
    return group.id
  }
}

export async function removeNavGroup(id: number) {
  const target = await navGroupRep.findOne({
    where: { id },
    relations: ['navItems'],
  })

  if (!target) throw 'id无效'

  if (target.navItems.length !== 0) throw '分组下包含导航，拒绝删除'

  await navGroupRep.delete(id)
}
