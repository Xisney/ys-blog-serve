export const port = 3001

export const api_prefix = '/api/blog/'

export function getApiPath(path: string) {
  return api_prefix + path
}

// 计算运行时间的起始点
export const startTime = 1648543395332

// 用于基本信息数据表，数据id
export const baseInfoId = 1

// 用于关于数据表，数据id
export const baseAboutId = 1

const admins = [['1837534886@qq.com', 'youcanbeadmin']]

export function isPassLogin(email: string, psw: string) {
  if (email && psw) {
    return admins.findIndex(([u, p]) => u === email && psw === p) !== -1
  }
  return false
}

const successCode = 0
const errorCode = -1
// 成功响应结果
export function getSuccessObj(data: any) {
  return { code: successCode, data }
}

export function getErrorObj(data: any = '服务异常') {
  return { code: errorCode, data }
}
