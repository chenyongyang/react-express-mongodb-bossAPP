const md5 = require('blueimp-md5')
// 连接数据库
const mongoose = require('mongoose')
// 连接指定数据库
mongoose.connect('mongodb://localhost:27017/boss-test', {useNewUrlParser: true})
// 获取连接对象
const conn = mongoose.connection
// 绑定连接完成的监听
conn.on('connected', () => {
  console.log('数据库连接成功')
})

// mongodb有两个概念：文档和集合
// 定义schema 描述文档结构
const userSchema = mongoose.Schema({ // 指定文档结构：属性名、属性名类型、是否是必须的、默认值
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  header: {type: String}
})
// 定义model
const UserModel = mongoose.model('user', userSchema) // 确定了集合名称为users

// 通过model或其实例对集合数据进行CRUD操作
// 1、通过Model实例的save()方法添加数据
function testsave () {
  // 创建UserModel实例
  const userModel = new UserModel({username: 'cyj', password: md5('123'), type: 'boss'})
  // 调用save
  userModel.save((err, user) => {
    console.log('save()', err, user)
  })
}
// testsave()

// 2、通过Model的find()或findOne()查询多个或查询一个
function testfind () {
  // 查询多个，查到的是包含所有匹配文档对象的数组，如果没有匹配就是[]
  UserModel.find((err, users) => {
    console.log('find()', err, users)
  })
  // 查询一个，查到的是匹配的文档对象，如果没有匹配就是null
  UserModel.findOne({username: 'cyy'}, (err, user) => {
    console.log('findone()', err, user)
  })
}
// testfind()

// 3、通过Model的findByIdAndUpdate()更新某个数据
function testUpdate(){
  UserModel.findByIdAndUpdate({ _id: "5d175da7f2260c3ef88f2adf"}, {username: '陈泳键'}, (err, oldUser) => {
    console.log("findByIdAndUpdate()", err, oldUser)
  })
}
// testUpdate()
// 4、通过Model的remove()删除匹配的数据
function testRemove(){
  UserModel.remove({username: '陈泳键'}, (err, doc) => {
    console.log(err, doc)
  })
}

testRemove()