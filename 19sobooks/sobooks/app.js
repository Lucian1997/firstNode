let express = require('express')
let path = require('path')
let sqlQuery = require('./lSql.js')
let cookieParser = require('cookie-parser')
let session = require('express-session')

//使用模板渲染页面
let ejs = require('ejs')

let app = express()

//将模板引擎与express应用相关联
app.set('views', 'views')
app.set('view engine', 'ejs')
app.engine('ejs', ejs.__express)
//设置静态目录
app.use(express.static(path.join(__dirname, 'public')))
//中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//session配置
app.use(session({
  secret: '12ji_o3j19sa091',
  resave: true, //强制保存session
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 //设置session的有效期为一周
  },
  saveUninitialized: true //是否保存初始化的session
}))
app.use(cookieParser('secret'));


//引入路由
let loginRouter = require('./routes/login')
let bookRouter = require('./routes/books')
let uploadRouter = require('./routes/upload')
let downloadRouter = require('./routes/download')
app.use('/books', bookRouter)
app.use('/login', loginRouter)
app.use('/upload', uploadRouter)
app.use('/download', downloadRouter)



app.get('/', (req, res) => {
  res.redirect('/index/1')
})

app.get(`/index/:pageid`, async (req, res) => {
  let page = req.params.pageid ? parseInt(req.params.pageid) : 1
  let strSql = "SELECT id,bookname,bookimg,author,category FROM book LIMIT ?,28"
  let result = await sqlQuery(strSql, [page])
  //获取总页数
  let strSql1 = `SELECT count(id) as num FROM book`
  let result1 = await sqlQuery(strSql1)
  let pageAll = Math.ceil(result1[0].num / 28)
  let startPage = (page - 4) < 1 ? 1 : page - 4
  let endPage = (page + 5) > pageAll ? pageAll : page + 5
  let options = {
    books: Array.from(result),
    category: await getCategory(),
    pageAll: pageAll,
    currentPage: page,
    startPage: startPage,
    endPage: endPage
  }
  res.render('bookHome.ejs', options)
})

//设置搜索的路由
app.get('/search/:searchKey/page/:pageid', async (req, res) => {
  let strSql = `SELECT id,bookname,bookimg,author,category FROM book WHERE bookname like '%${req.params.searchKey}%' or author like '%${req.params.searchKey}%' LIMIT 0,28`
  let result = await sqlQuery(strSql)
  //获取总页数
  let strSql1 = `SELECT count(id) as num FROM book WHERE bookname like '%${req.params.searchKey}%' or author like '%${req.params.searchKey}%'`
  let result1 = await sqlQuery(strSql1)
  let pageAll = Math.ceil(result1[0].num / 28)
  let startPage = (parseInt(req.params.pageid) - 4) < 1 ? 1 : (parseInt(req.params.pageid) - 4)
  let endPage = (parseInt(req.params.pageid) + 5) > pageAll ? pageAll : (parseInt(req.params.pageid) + 5)
  let options = {
    books: Array.from(result),
    category: await getCategory(),
    pageAll: pageAll,
    currentPage: parseInt(req.params.pageid),
    searchKey: req.params.searchKey,
    startPage: startPage,
    endPage: endPage
  }
  res.render('bookSearch.ejs', options)
})

async function getCategory() {
  //获取所有分类
  let sqlStr = "SELECT * FROM category"
  let result = await sqlQuery(sqlStr)
  return Array.from(result)
}

//分页页面
app.get('/category/:categoryid/page/:pageid', async (req, res) => {
  let strSql = "SELECT id,bookname,bookimg,author,category FROM book WHERE category in (SELECT category FROM category WHERE id = ?) LIMIT ?,28"
  let pageid = (parseInt(req.params.pageid) - 1) * 28
  let categoryid = req.params.categoryid
  let result = await sqlQuery(strSql, [categoryid, pageid])
  //获取总页数
  let strSql1 = "SELECT count(id) as num FROM book WHERE category in (SELECT category FROM category WHERE id = ?)"
  let result1 = await sqlQuery(strSql1, [categoryid])
  let pageAll = Math.ceil(result1[0].num / 28)
  let startPage = (parseInt(req.params.pageid) - 4) < 1 ? 1 : (parseInt(req.params.pageid) - 4)
  let endPage = (parseInt(req.params.pageid) + 5) > pageAll ? pageAll : (parseInt(req.params.pageid) + 5)
  let options = {
    books: Array.from(result),
    category: await getCategory(),
    pageAll: pageAll,
    currentPage: parseInt(req.params.pageid),
    categoryid: parseInt(categoryid),
    startPage: startPage,
    endPage: endPage
  }
  res.render('bookIndex.ejs', options)
})

//销毁session的路由
app.get('/loginOut', (req, res) => {
  req.session.destroy(err => {
    console.log('销毁session完毕');
  })
  res.send('成功退出登录')
})

module.exports = app