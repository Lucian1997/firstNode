let express = require('express')
let sqlQuery = require('./lSql.js')
let app = express()

app.get('/', async (req, res) => {
  //数据库book表里前28的书获取出来
  let strSql = 'SELECT id,bookname,bookimg,author,category FROM book LIMIT 0,28'
  let result = await sqlQuery(strSql)
  // console.log(result);
  // let resJson = JSON.stringify(Array.from(result))
  // res.send(resJson)
  res.json(Array.from(result))
})

app.get('/xiaoshuowenxue', async (req, res) => {
  let strSql = "SELECT id,bookname,bookimg,author,category FROM book WHERE category = '小说文学' LIMIT 0,28"
  let result = await sqlQuery(strSql)
  res.json(Array.from(result))
})

app.get('/books/:bookid', async (req, res) => {
  let strSql = "SELECT * FROM book WHERE id = ?"
  let bookid = req.params.bookid
  let result = await sqlQuery(strSql, [bookid])
  res.json(Array.from(result))
})

module.exports = app