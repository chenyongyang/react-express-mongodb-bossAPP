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
        res.cookie('userid', user._id, {maxAge: 1000*60})
        const data = { username, type, id: user._id } // 返回数据不包含密码，先做一层处理
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
        res.cookie('userid', user._id, {maxAge: 1000*60})
        res.send({
          code: 0,
          data: {
            user
          }
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

module.exports = router;
