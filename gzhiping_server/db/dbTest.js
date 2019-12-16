const md5 = require('blueimp-md5')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gzhipin_test')

const conn = mongoose.connection
conn.on('connected',function () {
    console.log("数据库连接成功!!!")
})

const userSchema = mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required: true},
    type:{type:String,required:true},
    header: {type:String}
})

const UserModel = mongoose.model('user',userSchema)

//通过Model实例save()添加数据
function testSave(){
    const userModel = new UserModel({
        username: 'Time',
        password: md5('456'),
        type:'danshen'
    })
    userModel.save(function (err,userDoc) {
        console.log('save()',err,userDoc)
    })
}
// testSave()
//通过Model的find()/findOne()查询多个或一个数据
function testFind() {
    UserModel.find(function (err,users) {
        console.log('find()',err,users);
    })
}
testFind();

function testFindOne() {
    UserModel.findOne(function (err,users) {
        console.log('findOne()',err,users);
    })
}
// testFindOne();
//通过Model的findByIdAndUpdate()更新某个数据
function testUpdate(){
    UserModel.findByIdAndUpdate({_id:'5de66281674f251038053fd4'},{username:'liqian'},function(err,user){
            console.log("findByIdAndUpdate()",err,user)
        })
}
// testUpdate();
//通过Model的remove()删除匹配的数据
function testRemove() {
    UserModel.remove({_id:'5de66281674f251038053fd4'},function(err,user){
        console.log('testRemove()',err,user)
    })
}
testRemove();