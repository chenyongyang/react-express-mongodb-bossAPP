/* 
    包含n个action creator
    异步action
    同步action
*/
import { reqRegister, reqLogin, reqUpdateUser, reqUser } from '../api'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER
} from '../redux/action-types'

// 每一个action-types都对应一个同步action
// 授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// 错误提示的同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
// 接收用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
// 重置用户的同步action
const resetUser = (msg) => ({ type: RESET_USER, data: msg })

// 注册异步action
export const register = (user) => {
    const { username, password, repassword, type } = user
    // 做表单的前台验证
    if(!username){
        return errorMsg('请输入用户名')
    } else if (password !== repassword) {
        return errorMsg('两次密码不一致')
    } else if (!password) {
        return errorMsg('请输入密码')
    } else if (!type) {
        return errorMsg('请勾选类型')
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
    const { username, password } = user
    // 做表单的前台验证
    if (!username) {
        return errorMsg('请输入用户名')
    } else if (!password) {
        return errorMsg('请输入密码')
    }
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

// 更新用户信息的异步action
export const updateUser = (user) => {
    // 这里可以先做一些前台的表单验证
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if(result.code === 0) { // 更新成功
            dispatch(receiveUser(result.data)) // 分发同步action
        } else { // 更新失败
            dispatch(resetUser(result.msg))
        }
    }
}

// 获取用户信息的异步action
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if(result.code === 0){
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg))
        }
    }
}