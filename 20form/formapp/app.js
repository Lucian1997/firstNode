let express = require('express')
let path = require('path')
let sqlQuery = require('./lSql.js')

let app = express()

//view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
//解析post提交的数据
app.use(express.urlencoded())

//搜索首页
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/search', (req, res) => {
  //提取？后面的字符串
  let queryStr = req.url.split('?')[1]
  //分割键值
  let keyValueArr = queryStr.split('&')
  //设置一个query对象，将键值对以对象的属性形式进行保存
  let query = {}
  keyValueArr.forEach((item, i) => {
    //对键值对进行分割提取
    let key = item.split('=')[0]
    let value = item.split('=')[1]
    query[key] = value
  })
  res.send('搜索页面')
})

app.get('/search1', async (req, res) => {
  //使用express自带的get获取数据方式
  //express在req对象上直接封装好了query的属性
  console.log(req.query);
  //根据req.query.searchKey查找书
  let strSql = `SELECT * FROM book where bookname like '%${req.query.searchKey}%'`
  let result = await sqlQuery(strSql)
  res.json(Array.from((result ? result : ['查询不到此信息'])))
})

app.get('/ajax', (req, res) => {
  res.render('ajax')
})

//获取POST提交的请求
app.post('/search1', (req, res) => {
  // console.log(req.query);
  //post提交的数据不在query属性上，在body属性上，而且需要app.use(express.urlencoded())解析
  console.log(req.body);
  res.send("post提交数据")
})

//登录页
app.get('/login', (req, res) => {
  res.render('login')
})

//处理登录请求
app.post('/login', async (req, res) => {
  //获取用户名和密码
  let username = req.body.username
  let password = req.body.password
  //查询数据库是否有此用户名和密码
  let sqlStr = "SELECT * FROM user WHERE username = ? and password = ?"
  let result = await sqlQuery(sqlStr, [username, password])
  if (result.length === 0 ){
    res.send('登陆失败')
  }else {
    res.send('登陆成功')
  }
})

module.exports = app;
