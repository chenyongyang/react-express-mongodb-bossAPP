// 包含n个操作数据库集合数据的Model模块
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/bossapp')

const conn = mongoose.connection

conn.on('connected', () => {
    console.log('数据库连接成功')
})

// 2、定义出对应特定的集合的Model并向外暴露
// 描述文档结构
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: { type: String, required: true },
    type: { type: String, required: true },
    header: { type: String},
    post: { type: String},
    info: { type: String},
    company: { type: String},
    salary: { type: String}
})
// 定义Model，目的是可以操作集合
const UserModel = mongoose.model('user', userSchema)
// 向外暴露Model
exports.UserModel = UserModel
