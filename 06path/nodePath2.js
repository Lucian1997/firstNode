let path = require('path')

//获取当前执行文件的目录
console.log(__dirname);

//获取当前的执行文件
console.log(__filename);

console.log(path.extname(__filename));

//解析路径，（根路径、目录、文件名、扩展名、文件名称）
console.log(path.parse(__filename));