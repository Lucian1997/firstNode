let express = require('express');
let fs =require('fs')
let router = express.Router();
//引入上传模块
let multer = require('multer')
//上传配置
let upload = multer({
  dest: './public/upload',
  //fileSize: 1024 * 1024 * 20, //设置的大小为20m
  //files: 5, //限制上传的数量
})

router.get('/', function(req, res, next) {
  res.render('bookUpload.ejs')
});

//处理上传的post请求
//如果上传单个文件，可调用upload.single()方法，并且将表单文件的name值传入
router.post('/', upload.single('imgFile'), (req, res) => {
  //因为直接上传的文件为随机名字，我们想要重新命名
  let oldPath = req.file.destination + "/" + req.file.filename
  let newPath = req.file.destination + "/" + req.file.originalname
  fs.rename(oldPath, newPath, () => {
    console.log('改名成功');
  })
  res.send(`<h1>上传成功</h1><img src='/upload/${req.file.originalname}'>`)
})

router.get('/ajax', (req, res) => {
  res.render('upload')
})

module.exports = router;
