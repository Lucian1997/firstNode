let url =require('url')

console.log(url);

let httpUrl = 'https://www.bilibili.com:2233/video/BV1i7411G7kW?p=9&spm_id_from=pageDriver#ab'
let urlObj = url.parse(httpUrl)
console.log(urlObj);

let targetUrl = 'http://www.baidu.com/'
let sonUrl = './home/about.html'
let newUrl = url.resolve(targetUrl, sonUrl)
console.log(newUrl);