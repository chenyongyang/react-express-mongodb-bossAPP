const express = require('express');
const router = express.Router();
const md5 = require('blueimp-md5')

const { UserModel } = require('../db/models')
// const filter = { password: 0, __v: 0 } // 查询时过滤出指定的属性

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// 注册路由
router.post('/register', (req, res) => {
  // 获取请求参数
  const { username, password, type } = req.body
  // 处理，如果用户已存在，则返回错误提示信息；如果不存在，则保存到数据库中
  UserModel.findOne({username}, (err, user) => {
    if (user){ // 如果返回有数据，说明存在
      res.send({
        code: 1,
        msg: '该用户已经存在'
      })
    }else { // 保存到数据库中
      new UserModel({username, password: md5(password), type}).save((err, user) => {
        // 生成一个cookie，并交给浏览器保存
        res.cookie('userid', user._id, {maxAge: 1000*60*60*60})
        const data = { username, type, _id: user._id } // 返回数据不包含密码，先做一层处理
        res.send({
          code: 0,
          data
        })
      })
    }
  })
  // 返回响应数据
})

// 登录路由
router.post('/login', (req, res) => {
  // 获取请求参数
  const { username, password } = req.body
  
  UserModel.findOne({ username }, (err, user) => {
    if (user) { // 如果返回有数据，说明存在
      if(user.password === md5(password)) {
        // 登录成功，生成一个cookie
        res.cookie('userid', user._id, {maxAge: 1000*60*60*60})
        const data = user
        res.send({
          code: 0,
          data
        })
      }else {
        res.send({
          code: 1,
          msg: '密码不正确'
        })
      }
    } else {
      res.send({
        code: 1,
        msg: '用户名不存在，请先注册'
      })
    }
  })
})

// 更新数据库中对应的数据
router.post('/update', (req, res) => {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid
  if(!userid){ // 不存在，说明没有登录，自然不能更新用户信息
    return res.send({code: 1, msg: '请先登录'})
  }
  // 若存在，则根据userid来更新对应的user文档数据
  const user = req.body // 这里是前台传过来要更新的信息
  UserModel.findByIdAndUpdate({_id: userid}, user, (err, oldUser) => {
    if (!oldUser) {
      // 根据cookie的userid找不到对应的用户，说明这个cookie是无效的，应该通知浏览器删除这个cookies
      // 实现：后台通过响应告诉浏览器删除
      res.clearCookie('userid')
      // 返回一个提示信息
      res.send({code: 1, msg: '请先登录'})
    } else {
      // 需要前台返回更新后的用户信息
      // 在node端，展开运算符不可用
      // 准备一个返回的user数据对象
      const { _id, username, type } = oldUser
      const data = Object.assign(user, { _id, username, type })
      res.send({code: 0, data})
    }
  })  
})

// 获取用户信息的路由（根据cookie中的userid）
router.get('/user', (req, res) => {
  // 从请求的cookie得到userid
  const userid = req.cookies.userid
  if(!userid){
    return res.send({
      code: 1,
      msg: '请先登录'
    })
  }
  // 根据userid查询对应的user
  UserModel.findOne({_id: userid}, (err, user) => {
    res.send({
      code: 0,
      data: {
        user
      }
    })
  })
})

module.exports = router;
