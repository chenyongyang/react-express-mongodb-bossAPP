export function getRedirectTo(type, header) {
    let path = ''
    if (type === 'boss') {
        path = '/boss'
    } else {
        path = '/staff'
    }
    if (!header) { // 没有值，返回信息完善界面的path
        path += 'info'
    }
    return path
}