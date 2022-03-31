import './connect'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import {
  port,
  getApiPath,
  getErrorObj,
  getSuccessObj,
  startTime,
} from './consts'

import { updateBaseInfo, getBaseData } from './control/base'
import {
  getBlogGroup,
  removeBlogGroup,
  updateBlogGroup,
} from './control/blogGroup'
import { getBlogTag, removeBlogTag, updateBlogTag } from './control/blogTag'
import {
  getBlogContent,
  getBlogs,
  getDraftBlogs,
  updateBlog,
} from './control/blog'

const app = express()

app.use(cors())

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
    await updateBaseInfo('notice', req.body.data)
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
    const newId = await updateBlogGroup(label, id)
    if (newId !== undefined) {
      res.json(getSuccessObj(newId))
    } else {
      res.json(getSuccessObj('更新分组完成'))
    }
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
    const newId = await updateBlogTag(label, id)
    if (newId !== undefined) {
      res.json(getSuccessObj(newId))
    } else {
      res.json(getSuccessObj('更新分组完成'))
    }
  } catch (e) {
    res.json(getErrorObj(e))
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
app.get(getApiPath('blogList'), async (req, res) => {
  try {
    const datalist = await getBlogs()
    res.json(getSuccessObj(datalist))
  } catch (e) {
    res.json(getErrorObj())
  }
})

app.get(getApiPath('blogDraftList'), async (req, res) => {
  try {
    const datalist = await getDraftBlogs()
    res.json(getSuccessObj(datalist))
  } catch (e) {
    res.json(getErrorObj())
  }
})

/* 文章内容获取 */
app.post(getApiPath('blogContent'), async (req, res) => {
  try {
    const { id } = req.body
    if (id === undefined) throw 'id无效'
    const content = await getBlogContent(id)
    res.json(getSuccessObj(content))
  } catch (e) {
    res.json(getErrorObj(e))
  }
})

/* 文章数据更新 */
app.post(getApiPath('updateBlog'), async (req, res) => {
  try {
    const { id, ...data } = req.body
    await updateBlog(data, id)
    res.json(getSuccessObj('文章数据更新成功'))
  } catch (e) {
    res.json(getErrorObj(e))
  }
})

app.listen(port, () => {
  console.log('服务启动成功')
})
