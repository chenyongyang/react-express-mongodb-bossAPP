import { combineReducers } from 'redux'
import { AUTH_SUCCESS, ERROR_MSG } from './action-types'

import { getRedirectTo } from '../utils'

const initUser = {
    username: '',
    type: '',
    msg: '', // 用来存储错误提示信息
    redirectTo: '' // 用来指示组件的路由跳转
}

const initBoss = {
    header: '',
    post: '',
    info: '',
    company: '',
    salary: ''
}
// 用新数据来覆盖旧数据的
function user(state=initUser, action) {
    switch(action.type){
        case AUTH_SUCCESS:
            // 授权成功后，指定路由到登录组件
            const { type, header } = action.data
            return { ...action.data, redirectTo: getRedirectTo(type, header)}
        case ERROR_MSG:
            return {...state, msg: action.data}
        default:
            return state
    }
}

function boss (state=initBoss, action) {
    switch(action.type){
        default:
            return state
    }
}

export default combineReducers({
    user,
    boss
})