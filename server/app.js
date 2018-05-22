const Koa = require('koa')
const fs = require('fs')
const staticSrv = require('koa-static-server')

const indexHtml = fs.readFileSync('./dist/index.html', 'utf8')
console.log(indexHtml)
const app = new Koa()

app.use(staticSrv({rootDir: 'dist/static', rootPath: '/static'}))
app.use(ctx => {
  ctx.type = 'html'
  ctx.body = indexHtml
})

app.listen(8000)
