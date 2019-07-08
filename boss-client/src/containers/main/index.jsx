import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie' // 可以操作前端cookie的对象
import { NavBar } from 'antd-mobile'

import BossInfo from '../boss-info'
import StaffInfo from '../staff-info'
import Boss from '../boss'
import Staff from '../staff'
import Personal from '../personal'
import Message from '../message'
import NotFound from '../../components/not-found'

import { getRedirectTo } from '../../utils'

import { getUser } from '../../redux/actions'

import Footer from '../../components/footer'

class Main extends Component {

    navList = [ // 包含所有导航组件的相关信息
        {
            path: '/boss',
            component: Boss,
            title: '大神列表',
            icon: 'staff',
            text: '大神'
        },
        {
            path: '/staff',
            component: Staff,
            title: '老板列表',
            icon: 'boss',
            text: '老板'
        },
        {
            path: '/message',
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息'
        },
        {
            path: '/personal',
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人'
        }   
    ]

    componentDidMount() {
        // 登录过（cookie中有userid），但redux管理的user中没有_id，发请求获取对应的user
        const userid = Cookies.get('userid')
        const { _id } = this.props.user
        if(userid && !_id){
            // 发送异步请求，获取user
            this.props.getUser()
        }
    }
    render() {
        /* 
            需要判断的东西就两个：cookie中的userid、redux中的_id
        */
        // 读取cookie中的userid
        const userid = Cookies.get('userid')
        // 如果没有，自动重定向到登录页面
        if(!userid){
            return <Redirect to='/login'/>
        }
        // 如果有，自动读取redux中的user状态
        const { user } = this.props
        // if(!user._id){
        //     return null
        // }else {
        // 如果有_id，显示对应的界面，但是有下面这种特殊情况
        // 如果请求根路径，就得根据type和header来计算出一个重定向的路由路径，并自动重定向
        if (user._id) {
            let path = this.props.location.pathname
            if(path === '/'){
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={path} />
            }
        }

        const { navList } = this
        const path = this.props.location.pathname // 请求的路径
        const currentNav = navList.find(nav => nav.path === path) // 得到当前的nav，可能没有

        if (currentNav) {
            if(user.type === 'boss'){
                this.navList[1].hide = true
            }else {
                this.navList[0].hide = true
            }
        }

        return (
            <div>
                {currentNav ? <NavBar>{currentNav.title}</NavBar>:null}
                <Switch>
                    {
                        navList.map(nav => <Route path={nav.path} component={nav.component} key={nav.path} />)
                    }
                    <Route path="/bossinfo" component={BossInfo} />
                    <Route path="/staffinfo" component={StaffInfo} />
                    <Route component={NotFound} />
                </Switch>
                {currentNav ? <Footer navList={navList}/> : null}
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    { getUser }
)(Main)

/* 
1、实现自动登录
  - componentDidMount()
    - 登录过（cookie中有userid），但页面刷新或关闭了（redux管理的user状态被清空了，没有_id），时发请求获取对应的user
  - render()
    - 如果cookie中没有userid，直接重定向到login
    - 判断redux管理的user中是否有_id，如果没有，暂时不做任何显示；如果有，说明当前已经登录，显示对应的页面
      - 请求了根路径，那就根据type和header来计算出一个重定向的路由路径，并自动重定向
*/