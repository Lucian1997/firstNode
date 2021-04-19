var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sessionRouter = require('./routes/session');

var app = express();

// view engine setup
//express视图设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//epxress中间件
app.use(session({
  secret: '12ji_o3j19sa091',
  resave: true, //强制保存session
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 //设置session的有效期为一周
  },
  saveUninitialized: true //是否保存初始化的session
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

//路由匹配
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/session', sessionRouter)

// catch 404 and forward to error handler
//设置404中间件
app.use(function(req, res, next) {
  res.render('404.ejs')
  // next(createError(404));
});

// error handler
//处理错误中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
