let fs = require('fs')

fs.unlink('test.txt', () => {
  console.log('成功删除!');
})
