// 包含了n个请求接口的函数模块，函数返回值是promise
import ajax from './ajax'

// 注册接口
export const reqRegister = (user) => ajax('/register', user, 'POST')

// 请求接口
export const reqLogin = ({ username, password }) => ajax('/login', { username, password }, 'POST')

// 更新用户接口
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')