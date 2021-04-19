let a = require('./index1')

let b = require('./index1')

//仅在模块第一次被使用时执行一次
console.log(a)
console.log(b)
console.log(a === b)
