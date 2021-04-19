let express = require('express')
let sqlQuery = require('./lSql.js')
//使用模板渲染页面
let ejs = require('ejs')

let app = express()
//将模板引擎与express应用相关联
app.set('views', 'views')
app.set('view engine', 'ejs')
app.engine('ejs', ejs.__express)


app.get('/', async (req, res) => {
  //插入变量
  let options = {
    title: 'lBook首页',
    articleTitle: '<h1>文章标题</h1>'
  }
  res.render('index', options)
})

app.get('/tj', async (req, res) => {
  //条件
  let options = {
    username: '小明',
    gender: '男'
  }
  res.render('condition.ejs', options)
})

app.get('/xh', async (req, res) => {
  //循环
  let stars = ["黎明", "郭富城", "刘德华", "张学友"]
  let options = {
    stars
  }
  res.render('xh.ejs', options)
})

module.exports = app