var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5');
const {UserModel} = require('../db/models');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//注册的路由
router.post('/register',function (req,res) {
  //读取请求参数
  const {username,password,type} =req.body;
  console.log("后台接收前台请求:",req.body);
  //处理
    //判断用户是否已经存在
    UserModel.findOne({username},function (err,userDoc) {
      //如果user有值(已存在)
      if(userDoc){
        res.send({code:1,msg:'用户已存在!'})
      }else{
        new UserModel({username,password:md5(password),type}).save(function (err,userDoc) {
          res.cookie('userid',userDoc._id,{maxAge:1000*60*60*24});
         const data = {username,type,_id:userDoc._id};
          res.send({code:0,data})
        })
      }
    })
  //返回响应数据
})

//登录的路由
router.post('/login',function (req,res) {
  const {username,password} = req.body;

  UserModel.findOne({
    username,password:md5(password)},function (err,userDoc) {
    if (userDoc){
     // res.cookies('userid',userDoc._id,{maxAge: 1000*60*60*24})
      res.send({code:0,data:userDoc})
    }else {
      res.send({code:1,msg:'登录失败!'})
    }
  });
})

//更新用户路由
router.post('/update',function (req,res) {
  //得到请求cookie的userid
  const userid = req.cookies.userid;
  if(!userid){
    return res.send({code:1,msg:'请先登陆'});
  }
})

//更新数据库中对应的数据
UserModel.findByIdAndUpdate({_id:userid},req.body,function (err,user) {
  const {_id,username,type} = user;
  //node端 。。。不可用
  //const data = {...req.body,_id,username,type}
  //合并用户信息
  const data = Object.assign(req.body,{_id,username,type})
  //assign(obj1,obj2,obj3,...)//将多个指定的对象进行合并
  res.send({code:0,data})
})
module.exports = router;
