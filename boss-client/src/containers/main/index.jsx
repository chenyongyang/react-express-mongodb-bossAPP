import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import BossInfo from '../boss-info'
import StaffInfo from '../staff-info'

class Main extends Component {
    render() {
        // 信息完善页是main下的子路由，那么路由的跳转就要由main来判断控制
        // 检查用户是否登录，如果没有，自动重定向到登录界面
        // 那为什么不用cookie来校验登录呢？原因是cookie被前台手动删了
        const { user } = this.props
        if(!user._id){
            const path = '/login'
            return <Redirect to={path} />
        }
        return (
            <div>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo} />
                    <Route path="/staffinfo" component={StaffInfo} />
                </Switch>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user})
)(Main)