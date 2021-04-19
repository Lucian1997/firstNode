let express = require('express');
let router = express.Router();
let sqlQuery = require('../lSql.js')
let crypto = require('crypto')

router.get('/', (req, res) => {
  res.render('bookLogin')
})

router.post('/', async (req, res) => {
  // console.log(req.body);
  //根据提交的账号和密码判断是否是正确的账号密码
  let strSql = "SELECT * FROM user WHERE username = ? and password = ?"
  let arr = [req.body.username, secret(req.body.password)]
  let result = await sqlQuery(strSql, arr)
  if (result.length != 0) {
    //登陆成功
    let user = result[0]
    req.session.username = user.username
    res.render('info', {
      title: '登陆成功',
      content: '账号密码正确，即将进入lBook',
      href: '/',
      hrefText: '立即前往'
    })
  }else {
    res.render('info', {
      title: '登陆失败',
      content: '账号或密码错误，即将返回登录页面',
      href: '/login',
      hrefText: '立即前往'
    })
  }
})

router.post('/register', async (req, res) => {
  //获取表单提交的用户名、密码、邮箱
  let username = req.body.username
  let password = secret(req.body.password)
  let email = req.body.email
  //判断邮箱是否已注册，如果已注册，将不再注册
  let strSql = 'SELECT * FROM user WHERE email = ?'
  let result = await sqlQuery(strSql, [email])
  if (result.length != 0) {
    //邮箱已注册
    res.render('info', {
      title: '注册失败',
      content: '该邮箱已被注册过，可直接登录或找回密码',
      href: '/login',
      hrefText: '回到登录页面'
    })
  }else {
    //此邮箱尚未注册，可注册
    strSql = 'INSERT INTO user (email,username,password) VALUES (?,?,?)'
    await sqlQuery(strSql, [email, username, password])
    res.render('info', {
      title: '注册成功',
      content: '注册成功请登录，即将进入登录页面',
      href: '/login',
      hrefText: '登录页'
    })
  }
})

function secret(str) {
  //使用的加密算法
  let sf = crypto.createHash('md5')
  //对字符串进行加密(加盐)
  sf.update(str +'lyc')
  //加密的二进制数据以字符串的形式显示
  let secretStr = sf.digest('hex')
  return secretStr
}

module.exports = router;
