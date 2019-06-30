// 封装ajax请求的函数模块，返回值是promise对象
import axios from 'axios'

export default function ajax (url, data={}, type='GET') {
    if(type === 'GET') {
        // 拼接请求参数串
        // data: {username: cyy, password: 123}
        // ?username=cyy&password=123
        let paramStr = ''
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&'
        })
        if(paramStr){
            paramStr = paramStr.substring(0, paramStr.length-1)
        }
        return axios.get(url + '?' + paramStr)
    }else {
        return axios.post(url, data)
    }
}