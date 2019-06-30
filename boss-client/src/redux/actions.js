/* 
    包含n个action creator
    异步action
    同步action
*/
import { reqRegister, reqLogin } from '../api'
import { AUTH_SUCCESS, ERROR_MSG } from '../redux/action-types'

// 每一个action-types都对应一个同步action
// 授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// 错误提示的同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })

// 注册异步action
export const register = (user) => {
    const { username, password, repassword, type } = user
    // 做表单的前台验证
    if(!username){
        return errorMsg('请输入用户名')
    }
    if (!password) {
        return errorMsg('请输入密码')
    }
    if (!repassword) {
        return errorMsg('请输入再次密码')
    }
    if (!type) {
        return errorMsg('请勾选身份')
    }
    if (password !== repassword) {
        return errorMsg('两次密码不一致')
    }
    return async dispatch => {
        // 发送注册的异步ajax请求
        // reqRegister(user).then(response => {
        //     const result = response.data
        // })
        const response = await reqRegister({ username, password, type })
        const result = response.data
        if(result.code === 0) { // 成功
            // 分发成功的action
            dispatch(authSuccess(result.data))
        }else { //失败
            // 分发失败的action
            dispatch(errorMsg(result.msg))
        }
    }
}

// 登录异步action
export const login = (user) => {
    return async dispatch => {
        // 发送登录的异步ajax请求
        const response = await reqLogin(user)
        const result = response.data
        if (result.code === 0) { // 成功
            dispatch(authSuccess(result.data))
        } else { //失败
            dispatch(errorMsg(result.msg))
        }
    }
}