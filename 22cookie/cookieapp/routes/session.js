var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//设置session
router.get('/setSession', (req, res) => {
  //登录之后要能够快速获取user的姓名，vip等级，是否登录
  req.session.isLogin = 'true'
  req.session.username = 'xiaoming'
  req.session.vipLevel = 5
  //重置session的有效时间
  // req.session.cookie.maxAge = 10000
  res.send('登录状态已设置到session中')
})

router.get('/getSession', (req, res) => {
  console.log(req.session);
  if (req.session.isLogin === 'true') {
    res.send(`欢迎等级为${req.session.vipLevel}的${req.session.username}<a href="/session/loginOut">退出登录</a>`)
  }else {
    res.send('尚未登录')
  }
})

//销毁session的路由
router.get('/loginOut', (req, res) => {
  req.session.destroy(err => {
    console.log('销毁session完毕');
  })
  res.send('成功退出登录')
})

module.exports = router;
