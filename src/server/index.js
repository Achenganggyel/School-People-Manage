// 服务器接口需要的api

const app = require('express')
const mysql = require('mysql')

// 数据库配置及连接
var conn = mysql.createConnection({      //创建mysql实例
  host: '127.0.0.1',
  user: 'root',
  password : '123456',
  database:'people_manage'
})
conn.connect()

// 连接数据库
//const conn = mysql.createConnection(models.mysql)

// 老师管理表
var teacher_db = "SELECT * FROM teachermanage"
conn.query(teacher_db,function(err,result){
  if(err){
    console.log('[SELECT ERROR]:',err.message)
  }
  let data_0 = new Array
  if(result){
    console.log('teacher数据库查询成功',result)  //数据库查询结果返回到result中
    for(let i=0;i<result.length;i++){
      data.push(result[i])
    }
    back(data_0)
  }
})
app.get('/teachermanage',function(req,res){
  res.json(data_0) //服务器响应请求
})

//学生管理表
var student_db = "SELECT * FROM studentmanage"
conn.query(student_db,function(err,result){
  if(err){
    console.log('[SELECT ERROR]:',err.message)
  }
  let data_1 = new Array
  if(result){
    console.log('student数据库查询成功',result)  //数据库查询结果返回到result中
    for(let i=0;i<result.length;i++){
      data_1.push(result[i])
    }
    back(data_1)
  }
})
app.get('/studentmanage',function(req,res){
  res.json(data_1)
})

//其他职工管理表
var stuff_db = "SELECT * FROM stuffmanage"
conn.query(stuff_db,function(err,result){
  if(err){
    console.log('[SELECT ERROR]:',err.message)
  }
  let data_2 = new Array
  if(result){
    console.log('stuff数据库查询成功',result)  //数据库查询结果返回到result中
    for(let i=0;i<result.length;i++){
      data_2.push(result[i])
    }
    back(data_2)
  }
})
app.get('/stuffmanage',function(req,res){
  res.json(data_2)
})

//流动人员
var mobile_db = "SELECT * FROM mobilemanage"
conn.query(mobile_db,function(err,result){
  if(err){
    console.log('[SELECT ERROR]:',err.message)
  }
  let data_3 = new Array
  if(result){
    console.log('mobile数据库查询成功',result)  //数据库查询结果返回到result中
    for(let i=0;i<result.length;i++){
      data_3.push(result[i])
    }
    back(data_3)
  }
})
app.get('/mobilemanage',function(req,res){
  res.json(data_3)
})

conn.end()
app.listen(3000,function () {    //监听3000端口
  console.log('Server running at 3000 port');
});


const jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1', msg: '操作失败'
    })
  } else {
    res.json(
      ret
    )
  }
}
