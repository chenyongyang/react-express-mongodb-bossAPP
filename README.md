- 项目描述
- 项目功能界面
- 技术选型
	- 前台技术
		- react
		- react-router-dom
		- redux
		- antd-mobile
  - 后台技术
		- node
		- express
		- mongodb
		- mongoose
		- socket.io
  - 前后台交互
		- ajax axios async await
		- API接口 postman
  - 模块化
		- es6
		- babel
  - 项目构建/工程化
		- webpack
		- react-create-app
		- eslint
  - 其他相关库
		- blueimp-md5
		- js-cookie
		- rc-queue-anim动画效果
- 前端路由
  - 注册
	- 登录
	- 主界面

组件的按需打包
- cnpm install --save-dev babel-plugin-import react-app-rewired

让项目支持像sass less这种css预处理器
- 在test中添加less的后缀
- 在添加less-loader

当cookie被前台手动删除时，在显示某些组件时还需要权限判断，这个时候怎么做？
- 存储登录的标志性id在redux中，通过判断id是否存在来判断是否登录了