import { combineReducers } from 'redux'


function a (state=1, action){
    return state
}

function b (state=2, action){
    return state
}

export default combineReducers({
    a,
    b
})