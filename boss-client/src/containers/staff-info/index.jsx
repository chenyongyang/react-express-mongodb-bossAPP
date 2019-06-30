// 大神信息的路由容器组件
// 判断为容器组件，就可以引入react-redux了
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    NavBar,
    InputItem,
    Button
} from 'antd-mobile'

import HeaderSelector from '../../components/header-selector'

class StaffInfo extends Component {
    render() {
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector />
                <InputItem placeholder='请输入求职岗位'>求职岗位:</InputItem>
                <InputItem placeholder='请输入个人介绍'>个人介绍:</InputItem>
                <Button type="primary">保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({

    }),
    {}
)(StaffInfo)