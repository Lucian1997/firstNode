//1.数组不能进行二级制的操作
//2.JS数组不像其他java、python等语言效率高
//3.buffer内存空间开辟出固定大小的内存

//将字符串转成buffer对象
let str = 'HelloWorld'
let buf = Buffer.from(str)
console.log(buf)

//输出buffer内容
console.log(buf.toString())

//开辟一个空的buffer(缓存区)
let buf1 = Buffer.alloc(10)
buf1[0] = 255
console.log(buf1)

let buf2 =Buffer.allocUnsafe(10)
console.log(buf2)