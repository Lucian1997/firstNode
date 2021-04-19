var express = require('express');
var crypto = require('crypto')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/setcookie', function (req,res) {
  //基础设置cookie，有效期默认一个会话
  // res.cookie("isLogin", "true")
  // res.cookie("isLogin", "true", {maxAge: 30000, httpOnly: true})
  //设置加密操作
  res.cookie("isLogin", "true", {signed: true})
  res.send('cookie设置成功')
})

router.get('/admin', (req, res) => {
  console.log(req.cookies);
  if (req.cookies.isLogin === 'true') {
    res.send('登陆成功')
  }else {
    res.send('登陆失败')
  }
})

router.get('/adminSecret', (req, res) => {
  if (req.signedCookies.isLogin === 'true') {
    res.send('登陆成功,加密cookie')
  }else {
    res.send('登陆失败,加密cookie')
  }
})

//加密原理解析
router.get('/secret', (req, res) => {
  //需要加密的字符串
  let password = '123456'
  password = password +'lyc'
  //使用的加密算法
  let sf = crypto.createHash('md5')
  //对字符串进行加密
  sf.update(password)
  //加密的二进制数据以字符串的形式显示
  let content = sf.digest('hex')
  res.send(content)
})

let secretCookie = {

}

function setSecretCookie(str, secretStr) {
  secretCookie[secretStr] = str
}

function getSecretCookie(secretStr) {
  return secretCookie[secretStr]
}

function secret(str) {
  //需要加密的字符串
  let password = str
  password = password +'lyc'
  //使用的加密算法
  let sf = crypto.createHash('md5')
  //对字符串进行加密
  sf.update(password)
  //加密的二进制数据以字符串的形式显示
  let secretStr = sf.digest('hex')
  return secretStr
}

//自定义加密cookie
router.get('/appSecret', (req, res) => {
  let secretStr = secret('true')
  res.cookie('register', secretStr)
  //设置将加密的密文和明文内容放置在某个位置
  setSecretCookie('true', secretStr)
  res.send('cookie加密成功')
})

//获取自己加密的cookie值
router.get('/getAppSecret', (req, res) => {
  //获取加密后的密文
  let secretStr = req.cookies.register
  let content = getSecretCookie(secretStr)
  res.send(`解密后register的内容：${content}`)
})

module.exports = router;
