let mysql = require('mysql')

let options = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "ccxx545400",
  database: "mall"
}

//创建与数据库的连接
let con = mysql.createConnection(options)

//建立连接
con.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('数据库连接成功');
  }
})

//执行数据库语句
//执行查询语句
// let strSql = "select * from user"
// con.query(strSql, (err, results, fields) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(results);
//   // console.log(fields);
// })

//删除表
// let strSql2 = "drop table user"
// con.query(strSql2, (err, results, fields) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(results);
// })

//删除库
// let strSql3 = "drop database node"
// con.query(strSql3, (err, results, fields) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(results);
// })

//创建库
// let strSql4 = "create database mall"
// con.query(strSql4, (err, results, fields) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(results);
// })

//创建表
// let strSql5 = `
// CREATE TABLE \`user\` (
// \`id\`  int NOT NULL AUTO_INCREMENT ,
// \`username\`  varchar(255) NOT NULL ,
// \`password\`  varchar(255) NOT NULL ,
// \`email\`  varchar(255) NOT NULL ,
// PRIMARY KEY (\`id\`)
// );`
// con.query(strSql5, (err, results, fields) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(results);
// })

//插入数据
// let strSql6 = "insert into user (username, password, email) values ('admin', '123456', 'admin@l.com')"
// con.query(strSql6, (err, results, fields) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(results);
// })

// let strSql6 = "insert into user (username, password, email) values (?, ?, ?)"
// con.query(strSql6, ["xiaohong", "123456", "xiaohong@163.com"], (err, results, fields) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(results);
// })

