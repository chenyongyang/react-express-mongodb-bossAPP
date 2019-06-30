// 老板信息的路由容器组件

import React, { Component } from 'react'
import { connect } from 'react-redux'

class BossInfo extends Component {
    render() {
        return (
            <div>
                老板信息完善页面
            </div>
        )
    }
}

export default connect(
    state => ({

    }),
    {}
)(BossInfo)