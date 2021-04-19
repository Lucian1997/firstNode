let express = require('express');
let router = express.Router();
let sqlQuery = require('../lSql.js')

//进入详情页面，必须登录
//1.引入cookie，session相关模块
//2.引入一个判断是否登录的中间件
function isLoginMid(req, res, next) {
  if (req.session.username === undefined) {
    res.render('info', {
      title: "未登录",
      content: "尚未登录，请进入登录页面登录",
      href: "/login",
      hrefText: "登录页"
    })
  }else {
    //已登录进入正常页面
    next()
  }
}
//3.登录界面
router.get('/:bookid', isLoginMid, async (req, res) => {
  let strSql = "SELECT * FROM book WHERE id = ?"
  let bookid = req.params.bookid
  let result = await sqlQuery(strSql, [bookid])
  let options = {
    book: result[0],
    category: await getCategory()
  }
  res.render('bookInfo.ejs', options)
})


async function getCategory() {
  //获取所有分类
  let sqlStr = "SELECT * FROM category"
  let result = await sqlQuery(sqlStr)
  return Array.from(result)
}

module.exports = router;
