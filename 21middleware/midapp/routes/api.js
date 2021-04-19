let express = require('express')
let sqlQuery = require('../public/javascripts/lSql')
//实例化路由模块，此路由相当于一个小的app实例
//提供前端AJAX请求的接口
let api = express.Router()

//允许前端跨域请求的中间件
api.use(function (req,res,next) {
  res.append('Access-Control-Allow-Origin', "*")
  res.append('Access-Control-Allow-Content-Type', "*")
  next()
})

//提供什么分类下的，第N页的数据
api.get('/book/:categoryid/page/:pageid', async (req, res) => {
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
  res.json(options)
})

async function getCategory() {
  //获取所有分类
  let sqlStr = "SELECT * FROM category"
  let result = await sqlQuery(sqlStr)
  return Array.from(result)
}

module.exports = api