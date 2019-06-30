import { combineReducers } from 'redux'

const initUser = {
    username: '',
    type: '',
    msg: '' // 用来存储错误提示信息
}

function user(state=initUser, action) {
    switch(action.type){
        default:
            return state
    }
}


export default combineReducers({
    user
})