let fs = require('fs')

fs.readFile('hello.txt', {flags: 'r', encoding: 'utf-8'}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    lEvent.emit('fileSuccess', data)
    //1数据库查看所有用户详细信息
    //2统计年龄比例
    //3查看所有用户学校详细信息
  }
})

let lEvent = {
  event: {
    // fileSuccess: [fn,fn,fn]
  },
  on: function (eventName, eventFn) {
    if (this.event[eventName]) {
      this.event[eventName].push(eventFn)
    } else {
      this.event[eventName] = []
      this.event[eventName].push(eventFn)
    }
  },
  emit: function (eventName, eventMsg) {
    if (this.event[eventName]) {
      this.event[eventName].forEach(itemFn => {
        itemFn(eventMsg)
      })
    }
  }
}

lEvent.on('fileSuccess', function (eventMsg) {
  console.log('1数据库查看所有用户详细信息');
})
lEvent.on('fileSuccess', function (eventMsg) {
  console.log('2统计年龄比例');
})
lEvent.on('fileSuccess', function (eventMsg) {
  console.log('3查看所有用户学校详细信息');
})