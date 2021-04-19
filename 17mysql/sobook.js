let mysql = require('mysql')

let options = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "ccxx545400",
  database: "book"
}

//创建与数据库的连接
let con = mysql.createConnection(options)

function sqlQuery(strSql, arr) {
  return new Promise((resolve, reject) => {
    con.query(strSql, arr, (err,results)=> {
      if (err) {
        reject(err)
      }else {
        resolve(results)
      }
    })
  })
}
async function getBookList(page) {
  let strSql = `select * from book limit ?,20`
  let offsetIndex =(page - 1) * 20
  let result = await sqlQuery(strSql, [offsetIndex])
  console.log(result);
  return result
}

module.exports = getBookList()