var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
  // 1、获取请求参数
  const { username, password } = req.body
  // 2、处理
  if(username === 'admin'){
    // 3、返回响应数据
    res.send({code: 1, msg: '该用户已存在'})
  }else {
    res.send({code: 0, data: {id: 'abc', username, password}})
  }
})

module.exports = router;
