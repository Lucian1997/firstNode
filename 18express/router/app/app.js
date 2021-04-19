let express = require('express')

let app = express()

//1.字符串的路由模式
app.get('/', (req, res) => {
  res.send('这是首页')
})

//2.类字符串的正则模式
//例如：匹配2个路径abcd或者acd
app.get('/ab?cd', (req, res) => {
  res.send('这是abcd或者acd')
})
//例如路径： /ab+cd /abcd /abbcd /abbbbbcd

//例如路径： /ab*cd，必须以a开头，cd结尾，中间可以任意内容

//3.正则匹配路径模式
app.get(/\/a\d{10,}/, (req, res) => {
  res.send('新闻页面')
})

//动态路由
app.get('/news/:categoryid/:newsid', (req, res, next) => {
  req.lHost = '127.0.0.1'
  next()
},(req, res)=> {
  res.send(`分类ID：${req.params.categoryid}，新闻ID：${req.params.newsid}，主机地址：${req.lHost}`)
})

module.exports = app

// app.listen(8080,()=> {
//   console.log('express已启动:', 'http://127.0.0.1:8080');
// })

