import * as nodemailer from 'nodemailer'
import Mail = require('nodemailer/lib/mailer')
import { Comment } from './entity/comment'

const transporterConfig = {
  host: 'smtp.qq.com',
  secure: true,
  auth: {
    user: 2105642104,
    pass: 'jsugrryhaxtddife',
  },
}

const myEmail = '站长 <1837534886@qq.com>'

// @ts-ignore
const transporter = nodemailer.createTransport(transporterConfig)

async function mailNotice(origin: Comment, reply?: Comment) {
  const mailContent: Mail.Options = {
    from: 'YS博客系统 <2105642104@qq.com>',
    subject: 'YS博客系统留言通知',
  }
  let html = ''

  if (reply) {
    html = `你(${origin.nickname})的留言原内容为: <strong><i>${origin.content}</i></strong/><br/>
    用户 ${reply.nickname} 回复了: <strong><i>${reply.content}</i></strong><br/>`

    if (!reply.isAdmin && !origin.isAdmin) {
      mailContent.cc = myEmail
    }

    mailContent.to = `${origin.nickname} <${origin.email}>`
  } else {
    if (origin.isAdmin) return

    html = `用户(${origin.nickname})留言了: <strong><i>${origin.content}</i></strong><br/>`
    mailContent.to = myEmail
  }

  html += '<a href="http://47.107.76.201/comment">去看看吗？</a>'
  mailContent.html = html

  await transporter.sendMail(mailContent)
}

export { mailNotice }
