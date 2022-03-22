import './connect'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { port } from './consts'

const app = express()

app.use(bodyParser.json())

app.listen(port, () => {
  console.log('服务启动成功')
})
