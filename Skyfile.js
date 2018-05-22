/* global sneaky */
sneaky('ay', function () {
  this.description = 'Deploy to dev environment'
  this.user = 'root'
  this.host = '47.74.252.32'
  this.path = '~/server/front/'
  this.filter = `
+ dist**
+ server**
+ yarn.lock
+ package.json
- *
`
  this.after('yarn && pm2 restart app')
  this.overwrite = true
  this.nochdir = true
})