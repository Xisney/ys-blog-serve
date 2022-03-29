import './connect'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import {
  port,
  getApiPath,
  getErrorObj,
  getSuccessObj,
  startTime,
} from './consts'

import { updateNotice, getBaseData } from './control/base'
import {
  getBlogGroup,
  removeBlogGroup,
  updateBlogGroup,
} from './control/blogGroup'
import { getBlogTag, removeBlogTag, updateBlogTag } from './control/blogTag'

const app = express()

app.use(bodyParser.json())

/* 管理端首页，分组信息获取，标签数据，获取文章分布数据 */
// app.get(getApiPath(''), (req, res) => {})

/* 网站基本信息获取 */
app.get(getApiPath('baseInfo'), async (req, res) => {
  try {
    const baseData = await getBaseData()
    res.json(getSuccessObj({ ...baseData, startTime: startTime }))
  } catch (e) {
    res.json(getErrorObj())
  }
})

/* admin 修改公告 */
app.post(getApiPath('updateNotice'), async (req, res) => {
  try {
    await updateNotice('notice', req.body.data)
    res.json(getSuccessObj('更新公告成功'))
  } catch (e) {
    res.json(getErrorObj())
  }
})

/* 分组与标签数据获取 */
app.get(getApiPath('groupAndTags'), async (req, res) => {
  try {
    const [groups, tags] = await Promise.all([getBlogGroup(), getBlogTag()])
    res.json(getSuccessObj({ groups, tags }))
  } catch (e) {
    res.json(getErrorObj())
  }
})

/* 分组数据更新 */
app.post(getApiPath('updateGroup'), async (req, res) => {
  try {
    const { id, label } = req.body
    await updateBlogGroup(label, id)
    res.json(getSuccessObj('更新分组完成'))
  } catch (e) {
    res.json(getErrorObj())
  }
})

/* 分组数据删除 */
app.post(getApiPath('removeGroup'), async (req, res) => {
  try {
    const { id } = req.body
    await removeBlogGroup(id)
    res.json(getSuccessObj('成功移除分组'))
  } catch (e) {
    res.json(getErrorObj())
  }
})

/* 标签数据更新 */
app.post(getApiPath('updateTag'), async (req, res) => {
  try {
    const { id, label } = req.body
    await updateBlogTag(label, id)
    res.json(getSuccessObj('更新分组完成'))
  } catch (e) {
    res.json(getErrorObj())
  }
})

/* 标签数据删除 */
app.post(getApiPath('removeTag'), async (req, res) => {
  try {
    const { id } = req.body
    await removeBlogTag(id)
    res.json(getSuccessObj('成功移除标签'))
  } catch (e) {
    res.json(getErrorObj())
  }
})

/* 文章数据获取 */

/* 文章数据更新 */
app.post(getApiPath('updateBlog'), (req, res) => {})

app.listen(port, () => {
  console.log('服务启动成功')
})
