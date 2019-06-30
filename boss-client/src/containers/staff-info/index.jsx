// 求职者信息的路由容器组件
import React, { Component } from 'react'
import { connect } from 'react-redux'

class StaffInfo extends Component {
    render() {
        return (
            <div>
                求职者信息完善页面
            </div>
        )
    }
}

export default connect(
    state => ({

    }),
    {}
)(StaffInfo)