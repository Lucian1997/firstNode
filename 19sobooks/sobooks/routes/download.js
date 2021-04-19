let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('download')
});

router.get('/:filename', function(req, res, next) {
  let localPath = `./public/images/${req.params.filename}`
  res.download(localPath)
});

module.exports = router;
