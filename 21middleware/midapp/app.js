var express = require('express');
var path = require('path');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//路由
let router1 = require('./routes/mall')
let api = require('./routes/api')
app.use('/mall', router1)
app.use('/api', api)

//添加中间件
app.use(function (req, res,next) {
  console.log('访问任何页面，此函数都会被调用');
  res.addNum = function(a, b) {
    return a + b
  }
  next();
})

//query中间件
app.use(function (req, res,next) {
  let splitResult = req.url.split('?')
  if (splitResult.length > 1) {
    //提取？后面的字符串
    let queryStr = splitResult[1]
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
    req.lQuery = query
    next()
  }else {
    next()
  }
})

app.get('/', (req, res) => {
  console.log(req.lQuery);
  let num = res.addNum(7, 8)
  res.send('这是首页' + num)
})
module.exports = app;
