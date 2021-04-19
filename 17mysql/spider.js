let mysql = require('mysql')
let axios = require('axios')
let cheerio = require('cheerio')

let page = 60
let count = 1
let options = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "ccxx545400",
  database: "book"
}
let con = mysql.createConnection(options)
con.connect()

//获取第N个页面所有书籍的链接
async function getPageUrl(num) {
  let httpUrl = `https://sobooks.cc/page/${num}`
  let res = await axios.get(httpUrl)
  // console.log(res.data);
  let $ = cheerio.load(res.data)
  $("#cardslist .card-item .thumb-img>a").each((index, element) => {
    let href = $(element).attr('href')
    //console.log(href);
    //根据地址访问书籍详情页面
    getBookInfo(href)
  })
}

async function getBookInfo(href) {
  let res = await axios.get(href)
  let $ = cheerio.load(res.data)
  //书籍图片
  let bookimg = $('.article-content .bookpic img').attr('src')
  //书籍名称
  let bookname = $('.article-content .bookinfo li:nth-child(1)').text()
  bookname = bookname.substring(3, bookname.length)
  //书籍作者
  let author = $('.article-content .bookinfo li:nth-child(2)').text()
  author = author.substring(3, author.length)
  //浏览次数
  // let viewcount = $('.article-content .bookinfo li:nth-child(3)').text()
  // viewcount = viewcount.substring(3, viewcount.length - 1)
  //标签
  let tag = $('.article-content .bookinfo li:nth-child(4)').text()
  tag = tag.substring(3, tag.length)
  //时间
  let pubtime = $('.article-content .bookinfo li:nth-child(5)').text()
  pubtime = pubtime.substring(3, pubtime.length)
  //得分
  let score = $('.article-content .bookinfo li:nth-child(6) b').attr('class')
  score = score[score.length - 1]
  //出版社
  // let pubcompany = $('.article-content .bookinfo li:nth-child(7)').text()
  // pubcompany = pubcompany.substring(3, pubcompany.length)
  //分类
  let category = $("#mute-category > a").text().trim()
  //简介
  let brief = $(".article-content").html()
  //书籍链接
  let bookurl = href
  //下载
  let download = $("body > section > div.content-wrap > div > article > table > tbody > tr:nth-child(3) > td > a:nth-child(3)").attr('href').split("?url=")[1]

  let arr = [bookimg,bookname,author,tag,pubtime,score,category,brief,bookurl,download]
  // console.log(arr);
  //插入数据库
  let strSql = "insert into book (bookimg,bookname,author,tag,pubtime,score,category,brief,bookurl,download) values (?,?,?,?,?,?,?,?,?,?)"
  await con.query(strSql, arr, (err, results, fields) => {
    console.log(err);
    console.log(results);
  })
}

//getPageUrl(page)
for (let i = 0; i < 100; i++) {
  page ++
  getPageUrl(page)
}
// getBookInfo('https://sobooks.cc/books/15973.html')
