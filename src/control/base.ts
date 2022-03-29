import { getRepository } from 'typeorm'
import { Base, BaseKey } from '../entity/base'
import { baseInfoId } from '../consts'

const baseRepository = getRepository(Base)

async function getBaseItem() {
  let baseData = await baseRepository.findOne({ where: { id: baseInfoId } })
  if (!baseData) {
    baseData = baseData = new Base()
    baseData.notice = ''
    baseData.viewCount = 0
    baseData.lastModify = new Date()
    baseData.id = baseInfoId
  }
  return baseData
}

export async function updateNotice(key: BaseKey, data: any) {
  let baseData = await getBaseItem()
  baseData[key] = data as never
  await baseRepository.save(baseData)
}

export function getBaseData() {
  return getBaseItem()
}
